import React, { useState } from 'react';
import PageLayout from '../layouts/PageLayout';
import PageHeader from '../layouts/PageHeader';
import TextField from '@mui/material/TextField';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLoginMutation } from '../features/auth/authApi';
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Login = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [login, { data, isError, isLoading, isSuccess, error }] =
		useLoginMutation();
	const { user } = data || {};

	const { isAuthenticated, user: s_user } = useSelector((state) => state.auth);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordShown, setPasswordShown] = useState(false);
	// Password toggle handler
	const togglePassword = () => {
		// When the handler is invoked
		// inverse the boolean state of passwordShown
		setPasswordShown(!passwordShown);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		login({ email, password });
	};

	const redirect = location.search
		? location.search.split('=')[1]
		: s_user?.role === 'admin' || s_user?.role === 'manager'
		? 'admin-dashboard'
		: 'dashboard';

	useEffect(() => {
		if (isAuthenticated) {
			navigate(`/${redirect}`);
		}
		if (isError) {
			toast.error(error.data.message);
			if (error.status === 405) {
				navigate(`/email-verify?email=${email}`);
			}
		}
		if (isSuccess) {
			toast.success('Login successful');
			if (user.role === 'admin' || user?.role === 'manager') {
				navigate('/admin-dashboard');
			} else {
				navigate('/dashboard');
			}
		}
	}, [
		isError,
		isSuccess,
		error,
		navigate,
		user,
		isAuthenticated,
		redirect,
		email,
	]);
	return (
		<PageLayout>
			<div className='page-content '>
				<PageHeader pageTitle='Login' />
				<section className='px-4 content-inner bg-primary-light'>
					<div className='p-6 mx-auto bg-white rounded shadow-lg md:w-7/12'>
						<form className='dzForm' onSubmit={handleSubmit}>
							<div className='dzFormMsg'></div>
							<input
								type='hidden'
								className='form-control'
								name='dzToDo'
								value='Contact'
							/>

							<div className='row'>
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

								<div className='grid items-center gap-4 md:grid-cols-2'>
									<button
										name='submit'
										type='submit'
										value='Submit'
										className='btn btn-primary'
									>
										<span className='text-gray-500 '>
											{isLoading ? (
												<BeatLoader size={8} color={'#fff'} />
											) : (
												'Login Now'
											)}
										</span>
									</button>
									<div>
										<p className='text-center'>
											Don't have an account?{' '}
											<Link
												to='/register?referral_id=6455d0825980054ef4c43d2c'
												className='text-primary'
											>
												Sign Up
											</Link>
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

export default Login;
