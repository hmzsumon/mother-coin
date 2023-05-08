import React, { useState, useEffect } from 'react';
import PageLayout from '../layouts/PageLayout';
import PageHeader from '../layouts/PageHeader';
import TextField from '@mui/material/TextField';
import { Autocomplete, Box, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { countries } from '../utils/countries';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../features/auth/authApi.js';
import { toast } from 'react-toastify';

const Signup = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const referral_id = location.search.split('=')[1];
	const [register, { isLoading, isSuccess, isError, error }] =
		useRegisterMutation();

	const [fullName, setFullName] = useState('');
	const [userId, setUserId] = useState('');
	const [email, setEmail] = useState('');
	const [country, setCountry] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordShown, setPasswordShown] = useState(false);
	const [referralId, setReferralId] = useState(referral_id);
	// Password toggle handler
	const togglePassword = () => {
		// When the handler is invoked
		// inverse the boolean state of passwordShown
		setPasswordShown(!passwordShown);
	};

	// handle form submit
	const handleFormSubmit = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error('Password do not match');
			return;
		}

		const myForm = new FormData();
		myForm.append('name', fullName);
		myForm.append('user_id', userId);
		myForm.append('email', email);
		myForm.append('country', country);
		myForm.append('phone', phone);
		myForm.append('password', password);

		// for (var key of myForm.entries()) {
		// 	console.log(key[0] + ', ' + key[1]);
		// }

		register({
			body: myForm,
			referrerCode: referralId,
		});
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success('Registration Successful');
			navigate(`/email-verify?email=${email}`);
		}
		if (isError) {
			toast.error(error.data.message);
		}
	}, [isSuccess, isError, error, navigate, email]);

	return (
		<PageLayout>
			<div className='page-content '>
				<PageHeader pageTitle='Signup' />
				<section className='px-4 content-inner bg-primary-light'>
					<div className='p-6 mx-auto bg-white rounded shadow-lg md:w-7/12'>
						<form className='dzForm' onSubmit={handleFormSubmit}>
							<div className='row'>
								<div className='mb-3 col-xl-6 mb-md-4'>
									<TextField
										required
										label='Enter Full Name'
										placeholder='Enter Full Name'
										fullWidth
										type='text'
										size='small'
										value={fullName}
										onChange={(e) => setFullName(e.target.value)}
									/>
								</div>
								<div className='mb-3 col-xl-6 mb-md-4'>
									<TextField
										required
										label='Enter your User ID'
										placeholder='Enter your User ID'
										fullWidth
										type='text'
										size='small'
										value={userId}
										onChange={(e) => setUserId(e.target.value)}
									/>
								</div>
								<div className='mb-3 col-xl-6 mb-md-4'>
									<TextField
										required
										label='Enter your email'
										placeholder='Enter your email'
										fullWidth
										type='email'
										size='small'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								{/*Start Country Select */}
								<div className='mb-3 col-xl-6 mb-md-4'>
									<Autocomplete
										id='country-select-demo'
										fullWidth
										size='small'
										options={countries}
										autoHighlight
										getOptionLabel={(option) => option.label}
										onChange={(event, newValue) => {
											setCountry(newValue.label);
										}}
										renderOption={(props, option) => (
											<Box
												component='li'
												sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
												{...props}
											>
												<img
													loading='lazy'
													width='20'
													src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
													srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
													alt=''
												/>
												{option.label} ({option.code}) +{option.phone}
											</Box>
										)}
										renderInput={(params) => (
											<TextField
												{...params}
												label='Choose a country'
												inputProps={{
													...params.inputProps,
													autoComplete: 'new-password', // disable autocomplete and autofill
												}}
											/>
										)}
									/>
								</div>
								{/*End Country Select */}

								<div className='mb-3 col-xl-6 mb-md-4'>
									<TextField
										required
										label='Enter your phone number'
										placeholder='Enter your phone number'
										fullWidth
										type='text'
										size='small'
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
									/>
								</div>

								<div className='mb-3 col-xl-6 mb-md-4'>
									<TextField
										required
										label='Enter your password'
										placeholder='Enter your password'
										fullWidth
										type={passwordShown ? 'text' : 'password'}
										size='small'
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										InputProps={{
											endAdornment: (
												<InputAdornment position='end'>
													<IconButton
														aria-label='toggle password visibility'
														onClick={togglePassword}
														edge='end'
													>
														{passwordShown ? <Visibility /> : <VisibilityOff />}
													</IconButton>
												</InputAdornment>
											),
										}}
									/>
								</div>

								<div className='mb-3 col-xl-6 mb-md-4'>
									<TextField
										required
										label='Confirm your password'
										placeholder='Confirm your password'
										fullWidth
										type={passwordShown ? 'text' : 'password'}
										size='small'
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										InputProps={{
											endAdornment: (
												<InputAdornment position='end'>
													<IconButton
														aria-label='toggle password visibility'
														onClick={togglePassword}
														edge='end'
													>
														{passwordShown ? <Visibility /> : <VisibilityOff />}
													</IconButton>
												</InputAdornment>
											),
										}}
									/>
								</div>

								{/* Referral Id */}
								<div className='mb-3 col-xl-6 mb-md-4'>
									<TextField
										required
										label='Referral Id'
										fullWidth
										type='text'
										size='small'
										value={referralId}
										disabled
										onChange={(e) => setReferralId(e.target.value)}
									/>
								</div>

								<div className='grid items-center gap-4 md:grid-cols-2'>
									<button
										name='submit'
										type='submit'
										value='Submit'
										className='btn btn-primary '
									>
										<span className=' text-gray-600'>Signup Now</span>
									</button>
									<div>
										<p className='text-center'>
											Already have an account? <Link to='/login'>Login</Link>
										</p>
									</div>
								</div>
							</div>
						</form>
					</div>
				</section>
			</div>
		</PageLayout>
	);
};

export default Signup;
