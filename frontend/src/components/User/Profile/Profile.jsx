import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Layout from '../Layout/Layout';
import { useSelector } from 'react-redux';
import { useUpdateAddressMutation } from '../../../features/auth/authApi';
import { FadeLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
	const navigate = useNavigate();
	const [updateAddress, { isLoading, isError, isSuccess, error }] =
		useUpdateAddressMutation();
	const { user } = useSelector((state) => state.auth);

	const [address, setAddress] = useState('');
	const [state, setState] = useState('');
	const [city, setCity] = useState('');
	const [zip, setZip] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!address || !state || !city || !zip) {
			return toast.error('Please fill all the fields');
		}
		updateAddress({ address, state, city, zip });
	};

	useEffect(() => {
		if (isError) {
			toast.error(error.data.message);
		}
		if (isSuccess) {
			toast.success('Address Updated Successfully');
			navigate('/dashboard');
		}
	}, [isSuccess, isError, error, navigate]);
	return (
		<Layout>
			{isLoading ? (
				<div className='flex items-center justify-center w-full h-[65vh]'>
					<FadeLoader color={'#fbbf24'} />
				</div>
			) : (
				<div className=''>
					<div className=' mx-auto p-2  rounded bg-slate-800 mt-10'>
						<div className=''>
							<h1 className='text-sm text-center my-4 font-bold text-gray-100'>
								Details
							</h1>

							<div className='border p-3'>
								<div className=' text-xs space-y-1'>
									<h2 className='text-center text-xs italic text-indigo-600'>
										Personal Information:
									</h2>
									<div className=' grid grid-cols-2 list-none'>
										<li className='grid grid-cols-2 '>
											<span>Full Name</span>
											<span>:</span>
										</li>
										<li>{user?.name}</li>
									</div>

									<div className=' grid grid-cols-2 list-none'>
										<li className='grid grid-cols-2 '>
											<span>Phone</span>
											<span>:</span>
										</li>
										<li>
											{user?.phone ? user?.phone : 'Not Provided by User'}
										</li>
									</div>
									<div className=' grid grid-cols-2 list-none'>
										<li className='grid grid-cols-2 '>
											<span>Email</span>
											<span>:</span>
										</li>
										<li>
											{user?.email ? user?.email : 'Not Provided by User'}
										</li>
									</div>
								</div>

								<hr className='my-2 border-slate-700' />

								<div className='text-xs space-y-3'>
									<h2 className='text-center text-xs italic text-green-500'>
										Address:
									</h2>
									<div className=' grid grid-cols-2 list-none'>
										<li className='grid  grid-cols-2 '>
											<span>Country</span>
											<span>:</span>
										</li>

										<li>
											{user?.address?.country
												? user?.address?.country
												: 'Not Provided by User'}
										</li>
									</div>

									<div className=' grid grid-cols-2 list-none'>
										<li className='grid grid-cols-2 '>
											<span>Address</span>
											<span>:</span>
										</li>

										<li className=' text-[.6rem]'>
											{user?.address?.address_line1 ? (
												user?.address?.address_line1
											) : (
												<>
													<div>
														<input
															type='text'
															className='w-full px-2 py-1  text-sm font-semibold text-gray-100 bg-transparent border rounded-md focus:outline-none'
															placeholder='Address'
															value={address}
															onChange={(e) => setAddress(e.target.value)}
														/>
													</div>
												</>
											)}
										</li>
									</div>

									<div className=' grid grid-cols-2 list-none'>
										<li className='grid  grid-cols-2 '>
											<span>State</span>
											<span>:</span>
										</li>

										<li>
											{user?.address?.state ? (
												user?.address?.state
											) : (
												<>
													<div>
														<input
															type='text'
															className='w-full px-2 py-1  text-sm font-semibold text-gray-100 bg-transparent border rounded-md focus:outline-none'
															placeholder='State'
															value={state}
															onChange={(e) => setState(e.target.value)}
														/>
													</div>
												</>
											)}
										</li>
									</div>
									<div className=' grid grid-cols-2 list-none'>
										<li className='grid  grid-cols-2 '>
											<span>City</span>
											<span>:</span>
										</li>

										<li>
											{user?.address?.city ? (
												user?.address?.city
											) : (
												<>
													<div>
														<input
															type='text'
															className='w-full px-2 py-1  text-sm font-semibold text-gray-100 bg-transparent border rounded-md focus:outline-none'
															placeholder='City'
															value={city}
															onChange={(e) => setCity(e.target.value)}
														/>
													</div>
												</>
											)}
										</li>
									</div>
									<div className=' grid grid-cols-2 list-none'>
										<li className='grid  grid-cols-2 '>
											<span>Zip</span>
											<span>:</span>
										</li>
										<li>
											{user?.address?.postcode ? (
												user?.address?.postcode
											) : (
												<>
													<div>
														<input
															type='text'
															className='w-full px-2 py-1  text-sm font-semibold text-gray-100 bg-transparent border rounded-md focus:outline-none'
															placeholder='Zip'
															value={zip}
															onChange={(e) => setZip(e.target.value)}
														/>
													</div>
												</>
											)}
										</li>
									</div>
								</div>

								<hr className='my-2 border-slate-700' />

								{/* <div className='text-xs space-y-1'>
								<h2 className='text-center text-xs italic text-orange-500'>
									Permanent Address:
								</h2>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2 '>
										<span>Address Line 1</span>
										<span>:</span>
									</li>

									<li className=' text-[.6rem]'>{permanentAddress}</li>
								</div>
								{presentAddress2 && (
									<div className=' grid grid-cols-2 list-none'>
										<li className='grid grid-cols-2 '>
											<span>Address Line 2</span>
											<span>:</span>
										</li>
										<li className='text-[.6rem]'>{permanentAddress2}</li>
									</div>
								)}
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid  grid-cols-2 '>
										<span>Country</span>
										<span>:</span>
									</li>

									<li>{permanentCountry}</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid  grid-cols-2 '>
										<span>State</span>
										<span>:</span>
									</li>

									<li>{permanentState}</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid  grid-cols-2 '>
										<span>City</span>
										<span>:</span>
									</li>

									<li>{permanentCity}</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid  grid-cols-2 '>
										<span>Zip</span>
										<span>:</span>
									</li>
									<li>3000</li>
								</div>
							</div> */}
							</div>
							{user?.address?.is_full === false && (
								<button
									className='w-full py-2 mt-4 text-sm font-bold text-white uppercase bg-blue-500 rounded focus:outline-none hover:bg-blue-600 hover:shadow-none'
									onClick={handleSubmit}
								>
									Submit
								</button>
							)}
						</div>
					</div>
				</div>
			)}
		</Layout>
	);
};

export default Profile;
