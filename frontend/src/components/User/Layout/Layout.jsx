import React from 'react';
import Header from '../Header/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import menuItems from '../../../utils/menuItems';
import SideMenu from './SideMenu';
import { FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../../features/auth/authApi';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import Navbar from './Navbar';

import Top from './Top';
const darkTheme = createTheme({
	// change the theme bg color to red
	palette: {
		mode: 'dark',
	},
});
const Layout = ({ children }) => {
	const navigate = useNavigate();
	const [logout, { isSuccess }] = useLogoutMutation();
	const { user } = useSelector((state) => state.auth);
	let menuRef = useRef();

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (menuRef.current.contains(event.target)) {
				setOpen(true);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	});

	useEffect(() => {
		if (isSuccess) {
			navigate('/');
		}
	}, [isSuccess, navigate]);
	const [open, setOpen] = React.useState(true);

	const handleOpen = () => {
		setOpen(!open);
	};
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<div className='relative flex flex-col min-h-screen bg-stone-950 md:bg-stone-900 '>
				<Header handleOpen={handleOpen} />
				{/* Start Mobile Menu */}
				<div
					className={`bg-stone-900 inset-y-0 w-[200px] md:hidden h-ins duration-300 ${
						open ? '-translate-x-[100%]' : '-translate-x-0'
					} top-[63px] absolute z-index-menu`}
				>
					<div>
						<div className='px-2 my-3'>
							<Top user={user} />
							<div className=' ml-7  space-x-2 text-[0.5rem]'>
								{user?.is_kyc ? (
									<button className='px-2 py-1 text-green-500 rounded-sm bg-stone-800'>
										Verify
									</button>
								) : (
									<button className='px-2 py-1 text-red-500 rounded-sm bg-stone-800'>
										Not Verify (KYC)
									</button>
								)}
							</div>
						</div>
						<hr />
						<ul className='px-2 mt-4 space-y-3'>
							{menuItems.map((item) => (
								<Link to={item.path} key={item.id} className='space-y-4 '>
									<li className='flex items-center my-3 space-x-2 cursor-pointer'>
										{item.icon}
										<p className='text-sm text-gray-100'>{item.title}</p>
									</li>
								</Link>
							))}
						</ul>
						<div className='flex items-center justify-center w-full mx-auto my-3 '>
							<button
								className='flex items-center px-2 py-1 space-x-3 rounded-sm bg-stone-800'
								onClick={() => logout()}
							>
								<p className='text-sm text-gray-100'>Logout</p>
								<FiLogOut />
							</button>
						</div>
					</div>
				</div>
				{/* End Mobile Menu */}
				<div ref={menuRef} className='grid grid-cols-5 gap-4 md:p-6'>
					<div className='hidden col-span-1 px-3 pt-4 rounded-sm md:block bg-stone-950'>
						<SideMenu />
					</div>

					<div className='w-full col-span-5 px-3 py-4 rounded-sm md:col-span-4 bg-stone-950'>
						{children}
					</div>
					<Navbar />
				</div>
			</div>
		</ThemeProvider>
	);
};

export default Layout;
