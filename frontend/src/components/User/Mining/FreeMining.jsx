import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import ButtonLoader from '../../../global/ButtonLoader';
import { FadeLoader, PropagateLoader } from 'react-spinners';
import MiningGif from '../../../assets/images/mining.gif';

import Countdown from './Countdown';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { DialogContentText } from '@mui/material';
import {
	useGetMiningQuery,
	useStartMiningMutation,
} from '../../../features/mining/miningApi';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const FreeMing = () => {
	const [startMining, { isError, isLoading, isSuccess, error }] =
		useStartMiningMutation();

	const { data, isLoading: miningLoading } = useGetMiningQuery();
	const { mining } = data || {};
	const t_loading = false;

	// const [
	// 	transferTrxMiningProfit,
	// 	{
	// 		isError: transferIsError,
	// 		isLoading: t_loading,
	// 		isSuccess: t_isSuccess,
	// 		error: t_error,
	// 	},
	// ] = useTransferTrxMiningProfitMutation();
	const { user } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	// handle start  mining
	const handleStartMining = async () => {
		startMining();
	};

	const handleTransfer = () => {
		// transferTrxMiningProfit();
		// if (t_isSuccess) {
		// 	handleClose();
		// }
	};

	useEffect(() => {
		if (isError) {
			toast.error(error?.data?.message);
		}
		if (isSuccess) {
			toast.success('Mining started successfully');
		}
	}, [isError, isSuccess, error]);

	// useEffect(() => {
	// 	if (transferIsError) {
	// 		toast.error(t_error?.data?.message);
	// 	}
	// 	if (t_isSuccess) {
	// 		toast.success('Transfer successfully');
	// 		navigate('/all-history');
	// 	}
	// }, [transferIsError, t_isSuccess, t_error, navigate]);

	let dialogTitle = 'Transfer will be done minimum $10!';
	let content = '';
	if (!user?.is_first_deposit) {
		dialogTitle = 'You have to make you have minimum buy 15$!';
		content = (
			<div className='flex items-center justify-center space-x-2'>
				<NavLink
					to='/buy-coin'
					className='px-3 py-2 font-bold text-center text-gray-100 bg-yellow-600 rounded-sm'
				>
					Buy Mother
				</NavLink>
			</div>
		);
	} else if (mining?.mining_profit < 0.5) {
		dialogTitle = 'You have to have minimum $10 mining profit to transfer!';
	} else if (mining?.mining_profit >= 0.5) {
		dialogTitle = 'are you sure to transfer your bonus?';
		content = (
			<div className='flex items-center justify-center space-x-2'>
				<button
					className='px-3 py-2 font-bold text-center bg-yellow-500 rounded-sm text-slate-900 hover:bg-yellow-600 disabled:cursor-not-allowed'
					onClick={handleTransfer}
				>
					Confirm
				</button>
				<button
					className='px-3 py-2 font-bold text-center text-gray-800 bg-orange-500 rounded-sm disabled:cursor-not-allowed'
					onClick={handleClose}
				>
					Cancel
				</button>
			</div>
		);
	}

	return (
		<div className='p-4 space-y-4 rounded-md bg-stone-900'>
			<div className='flex items-center  gap-4  '>
				<div>
					<div className=' flex items-center'>
						<h1 className='text-xs font-bold text-gray-100'>Mining</h1>
						<div>
							<img src={MiningGif} alt='mining' className='mx-auto w-8 h-8' />
						</div>
					</div>
					<div className=''>
						{miningLoading && mining?.mining_profit !== 'undefined' ? (
							<PropagateLoader color='#fff' />
						) : (
							<Countdown profit={mining?.mining_profit} />
						)}
					</div>
				</div>
			</div>
			<div className='grid grid-cols-2 gap-4 text-[0.6rem] md:text-sm'>
				{mining ? (
					<button
						className='px-3 py-2 font-bold text-center text-white bg-yellow-500 rounded-sm hover:bg-yellow-600 disabled:cursor-not-allowed'
						disabled
					>
						Running
					</button>
				) : (
					<button
						className='px-3 py-2 font-bold text-center text-white bg-yellow-600 rounded-sm hover:bg-yellow-700 disabled:cursor-not-allowed'
						onClick={handleStartMining}
					>
						{isLoading ? (
							<ButtonLoader bgColor='bg-yellow-500' />
						) : (
							'Start Mining'
						)}
					</button>
				)}

				<button
					className='px-3 py-2 font-bold text-center text-white bg-yellow-600 rounded-sm tex disabled:cursor-not-allowed'
					disabled
				>
					Claim
				</button>
			</div>
			{/* Dialog Start */}
			{t_loading ? (
				<div className='flex items-center justify-center'>
					<FadeLoader color='#fbbf24' loading={isLoading} size={150} />
				</div>
			) : (
				<div>
					<Dialog
						open={open}
						TransitionComponent={Transition}
						keepMounted
						onClose={handleClose}
						aria-describedby='alert-dialog-slide-description'
					>
						<DialogTitle>{dialogTitle}</DialogTitle>
						<DialogContent>
							<DialogContentText id='alert-dialog-slide-description'>
								{content}
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose} sx={{ color: 'red' }}>
								Close
							</Button>
						</DialogActions>
					</Dialog>
				</div>
			)}
			{/* Dialog End */}
		</div>
	);
};

export default FreeMing;
