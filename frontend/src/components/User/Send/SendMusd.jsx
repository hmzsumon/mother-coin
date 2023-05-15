import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { TextField } from '@mui/material';
import GoBack from '../../../global/GoBack';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
	useSendMotherCoinMutation,
	useSendMusdMutation,
} from '../../../features/auth/authApi';
import { toast } from 'react-toastify';
import ButtonLoader from '../../../global/ButtonLoader';

const SendMusd = () => {
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);
	const [sendMusd, { isError, isLoading, error, isSuccess }] =
		useSendMusdMutation();
	const [amount, setAmount] = useState(0);
	const [address, setAddress] = useState('');

	// handle select method

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!user?.is_active) {
			toast.warning('Please active your account first');
			return;
		}

		if (user?.mother_coin_address === address) {
			toast.warning('You can not send money to yourself');
			return;
		}

		sendMusd({ amount, address });
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success('Money sent successfully');
			navigate('/dashboard');
		}
		if (isError) {
			if (error.status === 901) {
				toast.warning('Please try again!');
			} else {
				toast.error(error?.data?.message);
			}
		}
	}, [isSuccess, isError, error, navigate]);

	return (
		<Layout>
			<div className='flex items-center justify-center mx-1 '>
				<div className='w-full p-2 mx-auto space-y-4 rounded-lg bg-stone-800 '>
					<div>
						<h1 className='flex flex-col text-sm text-center'>
							<span>Wallet to Wallet Send </span>
						</h1>
						<div>
							<p className='text-xs italic text-center text-green-500 '>
								Your current balance is :{user?.musd_balance}{' '}
							</p>
						</div>
					</div>
					{!user?.is_active ? (
						<p className='flex flex-col text-xs italic text-center text-yellow-500 '>
							Your account is not active. Please active your account first.
						</p>
					) : (
						<div>
							<div className='space-y-3 '>
								<div>
									<div>
										<label className='text-xs font-semibold text-slate-500'>
											Receiver MUSD Address
										</label>
										<input
											type='text'
											className='w-full px-3 py-2 mt-2 text-sm font-semibold text-gray-100 bg-transparent border rounded-md focus:outline-none'
											placeholder='Enter Receiver Address'
											value={address}
											onChange={(e) => setAddress(e.target.value)}
										/>
									</div>
								</div>

								<div>
									<div className='space-y-4 '>
										<div>
											<TextField
												id='amount'
												label='Amount'
												variant='outlined'
												type='number'
												fullWidth
												size='small'
												required
												value={amount}
												onChange={(e) => setAmount(e.target.value)}
											/>
											<p className=' text-[0.5rem] text-yellow-500 text-center mt-1'>
												Minimum amount is 1${' '}
											</p>
										</div>
									</div>
								</div>

								<button
									className={`w-full bg-green-500 py-1 rounded text-center disabled:cursor-not-allowed disabled:opacity-50 text-white`}
									disabled={amount < 10 || !user?.is_active}
									onClick={handleSubmit}
								>
									{isLoading ? <ButtonLoader /> : 'Send'}
								</button>
							</div>
						</div>
					)}

					<div className='flex flex-col items-center justify-center'>
						<GoBack />
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default SendMusd;
