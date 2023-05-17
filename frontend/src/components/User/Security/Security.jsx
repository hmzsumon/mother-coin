import { Box, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { useUpdatePasswordMutation } from '../../../features/auth/authApi';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const Security = () => {
	const navigate = useNavigate();
	const [updatePassword, { isLoading, isSuccess, isError, error }] =
		useUpdatePasswordMutation();

	// captcha
	const [oldPassword, setOldPassword] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	// form State

	const handleSubmit = (e) => {
		e.preventDefault();
		const myForm = new FormData();
		myForm.append('oldPassword', oldPassword);
		myForm.append('newPassword', password);
		myForm.append('confirmPassword', confirmPassword);
		updatePassword(myForm);
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success('Password Updated Successfully');
			navigate('/dashboard');
		}
		if (isError) {
			toast.error(error.data.message);
		}
	}, [isSuccess, isError, error, navigate]);

	return (
		<ThemeProvider theme={darkTheme}>
			<Layout>
				<div>
					<div className='px-4 py-24 sign-up-wrapper '>
						<Box
							className='flex flex-col gap-4 bg-slate-800 p-4 rounded-md mx-auto'
							noValidate
							autoComplete='off'
						>
							<h2 className='my-4 text-2xl text-center '>Update Password</h2>

							<Box
								component='form'
								className='flex flex-col w-full gap-4 mx-auto rounded-md'
								noValidate
								autoComplete='off'
								onSubmit={handleSubmit}
							>
								<div className=' py-1 space-y-3'>
									<TextField
										id='name'
										type='password'
										label='Old Password'
										variant='outlined'
										fullWidth
										autoComplete='off'
										size='small'
										value={oldPassword}
										onChange={(e) => setOldPassword(e.target.value)}
									/>

									<TextField
										id='name'
										type='password'
										label='New Password'
										variant='outlined'
										fullWidth
										autoComplete='off'
										size='small'
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>

									<TextField
										id='name'
										type='password'
										label='Confirm Password'
										variant='outlined'
										fullWidth
										autoComplete='off'
										size='small'
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
									/>
								</div>
								<button
									className='bg-[#ffeb3b] hover:bg-[#c5b104] disabled:cursor-not-allowed font-semibold text-slate-700 py-2 rounded-md'
									disabled={isLoading}
								>
									{isLoading ? <BeatLoader color='#000' size={10} /> : 'Submit'}
								</button>
							</Box>
						</Box>
					</div>
				</div>
			</Layout>
		</ThemeProvider>
	);
};

export default Security;
