import React from 'react';
import { formatDate } from '../../../utils/functions';
import GoBack from '../../../global/GoBack';
import DashboardLayout from '../layouts/DashboardLayout';
import { FadeLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';
import { useGetSingleUserAdminQuery } from '../../../features/auth/authApi';

const UserDetails = () => {
	const { id } = useParams();
	const { data, isLoading } = useGetSingleUserAdminQuery(id);
	const {
		user,
		convertDetails,
		depositDetails,
		withdrawDetails,
		lotteryDetails,
		sendDetails,
	} = data || {};
	const {
		role,
		name,
		email,
		phone,
		address,
		m_balance,
		w_balance,
		b_balance,
		sponsor_bonus,
		signup_bonus,
		winning_balance,
		total_receive_amount,
		verify_code,
		email_verified,
		is_identity_verified,
		is_active,
		address_verified,
		sponsor,
		members,
		is_winner,
		lucky_box_count,
		createdAt,
		avatar,
	} = user || {};

	return (
		<DashboardLayout>
			{isLoading ? (
				<div className='flex items-center justify-center w-full h-[65vh]'>
					<FadeLoader color={'#fbbf24'} />
				</div>
			) : (
				<div className=''>
					<div className='  mx-auto p-2  rounded bg-slate-800 my-4'>
						<div className=''>
							<h1 className='text-sm text-center mt-4 space-x-2 font-bold text-gray-100'>
								<span
									className={`capitalize mr-2 ${
										!is_active ? 'text-yellow-500' : 'text-green-500'
									}`}
								>
									{is_active ? 'Active' : 'Inactive'}
								</span>
								{name} Details
							</h1>

							<h2 className='text-center '>
								{verify_code && (
									<span className='text-xs text-orange-400'>
										(Verify Code: {verify_code})
									</span>
								)}
							</h2>

							<div className=' space-y-2'>
								<div className='border p-3'>
									{/* Personal Info */}
									<div className=' text-xs space-y-1'>
										<h2 className='text-center text-xs italic text-indigo-600'>
											Personal Information
										</h2>
										<div className=' grid grid-cols-2 list-none'>
											<li className='grid grid-cols-2 '>
												<span>Full Name</span>
												<span>:</span>
											</li>
											<li>{name}</li>
										</div>

										<div className=' grid grid-cols-2 list-none'>
											<li className='grid grid-cols-2 '>
												<span>Phone</span>
												<span>:</span>
											</li>
											<li>{phone ? phone : 'No Phone Number'}</li>
										</div>
										<div className=' grid grid-cols-2 list-none'>
											<li className='grid grid-cols-2 '>
												<span>Email</span>
												<span>:</span>
											</li>
											<li>
												<span>{email} </span>
												{!email_verified && (
													<sup className='text-red-500'>No</sup>
												)}
												{email_verified && (
													<sup className='text-green-500'>Yes</sup>
												)}
											</li>
										</div>

										<div className=' grid grid-cols-2 list-none'>
											<li className='grid grid-cols-2 '>
												<span>Join At</span>
												<span>:</span>
											</li>
											<li>{formatDate(createdAt)}</li>
										</div>

										<div className=' grid grid-cols-2 list-none'>
											<li className='grid grid-cols-2 '>
												<span>Sponsor</span>
												<span>:</span>
											</li>
											<li>{sponsor?.sponsor_name}</li>
										</div>

										<div className=' grid grid-cols-2 list-none'>
											<li className='grid grid-cols-2 '>
												<span>Members</span>
												<span>:</span>
											</li>
											<li>{members?.length} </li>
										</div>
									</div>
									{/*End Personal Info */}

									<hr className='h-px my-2 bg-gray-600 border-0' />

									{/* Balance Info */}
									<div className=' text-xs space-y-1'>
										<h2 className='text-center text-xs italic text-yellow-500'>
											Wallet Information
										</h2>
										<div className=' grid grid-cols-2 list-none'>
											<li className='grid grid-cols-2 '>
												<span>Main Balance</span>
												<span>:</span>
											</li>
											<li>
												{Number(m_balance).toLocaleString('en-US', {
													style: 'currency',
													currency: 'BDT',
												})}
											</li>
										</div>
										<div className=' grid grid-cols-2 list-none'>
											<li className='grid grid-cols-2 '>
												<span>Bonus</span>
												<span>:</span>
											</li>
											<li>
												{Number(b_balance).toLocaleString('en-US', {
													style: 'currency',
													currency: 'BDT',
												})}
											</li>
										</div>
										<div className=' grid grid-cols-2 list-none'>
											<li className='grid grid-cols-2 '>
												<span>Withdraw</span>
												<span>:</span>
											</li>
											<li>
												{Number(w_balance).toLocaleString('en-US', {
													style: 'currency',
													currency: 'BDT',
												})}
											</li>
										</div>
										<div className=' grid grid-cols-2 list-none'>
											<li className='grid grid-cols-2 '>
												<span>Sponsor Bonus</span>
												<span>:</span>
											</li>
											<li>
												{Number(
													sponsor_bonus ? sponsor_bonus : 0
												).toLocaleString('en-US', {
													style: 'currency',
													currency: 'BDT',
												})}
											</li>
										</div>
										<div className=' grid grid-cols-2 list-none'>
											<li className='grid grid-cols-2 '>
												<span>SignUp Bonus</span>
												<span>:</span>
											</li>
											<li>
												{Number(signup_bonus ? signup_bonus : 0).toLocaleString(
													'en-US',
													{
														style: 'currency',
														currency: 'BDT',
													}
												)}
											</li>
										</div>

										<div className=' grid grid-cols-2 list-none'>
											<li className='grid grid-cols-2 '>
												<span>Total Wining</span>
												<span>:</span>
											</li>
											<li>
												{Number(
													winning_balance ? winning_balance : 0
												).toLocaleString('en-US', {
													style: 'currency',
													currency: 'BDT',
												})}
											</li>
										</div>

										<div className=' grid grid-cols-2 list-none'>
											<li className='grid grid-cols-2 '>
												<span>Total Received</span>
												<span>:</span>
											</li>
											<li>
												{Number(
													total_receive_amount ? total_receive_amount : 0
												).toLocaleString('en-US', {
													style: 'currency',
													currency: 'BDT',
												})}
											</li>
										</div>
										{sendDetails && (
											<div className=' grid grid-cols-2 list-none'>
												<li className='grid grid-cols-2 '>
													<span>Total Send Money</span>
													<span>:</span>
												</li>
												<li>
													{Number(
														sendDetails?.total_send_amount
													).toLocaleString('en-US', {
														style: 'currency',
														currency: 'BDT',
													})}
												</li>
											</div>
										)}

										{convertDetails && (
											<div className=' grid grid-cols-2 list-none'>
												<li className='grid grid-cols-2 '>
													<span>Total Convert</span>
													<span>:</span>
												</li>
												<li>
													{Number(convertDetails?.total_convert).toLocaleString(
														'en-US',
														{
															style: 'currency',
															currency: 'BDT',
														}
													)}
												</li>
											</div>
										)}
										{depositDetails && (
											<div className='text-green-500 grid grid-cols-2 list-none'>
												<li className='grid grid-cols-2 '>
													<span>Total Deposit</span>
													<span>:</span>
												</li>
												<li>
													{Number(depositDetails?.total_deposit).toLocaleString(
														'en-US',
														{
															style: 'currency',
															currency: 'BDT',
														}
													)}
												</li>
											</div>
										)}
										{withdrawDetails && (
											<div className=' text-yellow-500 grid grid-cols-2 list-none'>
												<li className='grid grid-cols-2 '>
													<span>Total Withdraw</span>
													<span>:</span>
												</li>
												<li>
													{Number(
														withdrawDetails?.total_withdraw
													).toLocaleString('en-US', {
														style: 'currency',
														currency: 'BDT',
													})}
												</li>
											</div>
										)}
									</div>
									{/*End balance Info */}

									<hr className='h-px my-2 bg-gray-600 border-0' />
								</div>
								{avatar && (
									<div className='border p-3'>
										<h2 className='text-xs italic text-center'>
											Profile Pic of{' '}
											<span className='text-green-500'>{name}</span>{' '}
										</h2>
										<div className='w-[50%] mx-auto my-2'>
											<img
												src={avatar?.url ? avatar?.url : ''}
												alt='screenshot'
												className=' w-full'
											/>
										</div>
									</div>
								)}
							</div>
						</div>
						<div className='flex flex-col my-4 items-center justify-center'>
							<GoBack />
						</div>
					</div>
				</div>
			)}
		</DashboardLayout>
	);
};

export default UserDetails;
