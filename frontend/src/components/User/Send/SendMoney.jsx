import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { TextField } from '@mui/material';
import GoBack from '../../../global/GoBack';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
	useGetUserByPhoneQuery,
	useSendMoneyMutation,
} from '../../../features/auth/authApi';
import { toast } from 'react-toastify';
import ButtonLoader from '../../../global/ButtonLoader';

const SendMoney = () => {
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);
	const [sendMoney, { isError, isLoading, error, isSuccess }] =
		useSendMoneyMutation();
	const [amount, setAmount] = useState(0);
	const [phone, setPhone] = useState('');
	const [find, setFind] = useState(false);

	const {
		data,
		isError: isFindError,
		isLoading: findLoading,
		isSuccess: findSuccess,
		error: findError,
	} = useGetUserByPhoneQuery(phone, { skip: !find });
	const { user: findUser } = data || {};

	// handle select method

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!user?.is_active) {
			toast.warning('Please active your account first');
			return;
		}
		if (!findUser?.is_active) {
			toast.warning('Receiver account is not active');
			return;
		}
		if (findUser?._id === user?._id) {
			toast.warning('You can not send money to yourself');
			return;
		}

		sendMoney({ amount, phone });
	};
	useEffect(() => {
		if (isSuccess) {
			toast.success('Convert Successfull');
			navigate('/user-dashboard');
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
								Your current balance is : {user?.balance}
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
											Amount
										</label>
										<input
											type='number'
											className='w-full px-3 py-2 mt-2 text-sm font-semibold text-gray-100 bg-transparent border rounded-md focus:outline-none'
											placeholder='Enter amount'
											value={amount}
											onChange={(e) => setAmount(e.target.value)}
										/>
									</div>
									<p className=' text-[0.5rem] text-yellow-500 text-center mt-1'>
										Minimum amount is 50${' '}
									</p>
								</div>

								{findLoading ? (
									<div className='flex justify-center'>
										<ButtonLoader />
									</div>
								) : (
									<div>
										{isFindError && (
											<div className='py-2 my-2 border rounded-md border-slate-600'>
												<p className='text-xs text-center text-red-500'>
													{findError?.data?.message}! Please try again.
												</p>
											</div>
										)}
										{findSuccess ? (
											<div className='space-y-4 '>
												<div className='px-2 py-2 my-2 text-xs border rounded-md border-slate-600'>
													<h2 className='mb-2 text-xs text-center text-green-500 '>
														Receiver Info
													</h2>
													<div className='grid grid-cols-2 text-gray-400 list-none '>
														<li className='grid grid-cols-2 '>
															<span>Name</span>
															<span>:</span>
														</li>
														<li>
															<span>{findUser?.name}</span>
														</li>
													</div>
													<div className='grid grid-cols-2 text-gray-400 list-none'>
														<li className='grid grid-cols-2 '>
															<span>Phone</span>
															<span>:</span>
														</li>
														<li>
															<span>{findUser?.phone}</span>
														</li>
													</div>
												</div>

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
														Minimum amount is &#8354; 50{' '}
													</p>
												</div>
											</div>
										) : (
											<button
												className={`w-full text-white bg-yellow-500 py-1 rounded text-center disabled:cursor-not-allowed disabled:opacity-50`}
												onClick={() => setFind(true)}
											>
												Find
											</button>
										)}
									</div>
								)}

								<button
									className={`w-full bg-green-500 py-1 rounded text-center disabled:cursor-not-allowed disabled:opacity-50 text-white`}
									disabled={amount < 50 || !user?.is_active}
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

export default SendMoney;
