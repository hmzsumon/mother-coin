/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from './../assets/images/logo/logo.png';
import LogoWhite from './../assets/images/logo/logo-white.png';

const navItems = [
	{
		id: 1,
		title: 'Home',
		path: '/',
	},
	{
		id: 2,
		title: 'About Us',
		path: '/about-us',
	},

	{
		id: 4,
		title: 'Contact Us',
		path: '/contact-us',
	},
];

function Header() {
	const location = useLocation();
	const referral_id = location.search.split('=')[1];
	const { isAuthenticated } = useSelector((state) => state.auth);
	/* for sticky header */
	const [headerFix, setheaderFix] = React.useState(false);
	useEffect(() => {
		window.addEventListener('scroll', () => {
			setheaderFix(window.scrollY > 50);
		});
	}, []);

	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<>
			<header className='py-2 site-header mo-left header header-transparent style-1'>
				<div
					className={`sticky-header main-bar-wraper  navbar-expand-lg  ${
						headerFix ? 'is-fixed ' : ''
					}`}
				>
					<div
						className='clearfix main-bar'
						style={{
							padding: '0 1.5rem',
						}}
					>
						<div className='flex items-center justify-between'>
							<div className='md:flex-1 '>
								<div className='logo-header'>
									<Link to={'/'} className='logo-dark'>
										<img src={Logo} alt='' className='' />
									</Link>
									<Link to={'/'} className='logo-light'>
										<img src={LogoWhite} alt='' className=' w-44' />
									</Link>
								</div>
							</div>
							<div className='hidden mr-5 space-x-4 md:flex'>
								{navItems.map((item) => (
									<NavLink
										key={item.id}
										to={item.path}
										className={
											({ isActive }) =>
												isActive
													? 'text-[#9467FE]'
													: `${headerFix ? 'text-gray-800' : 'text-white'}` // eslint-disable-line no-nested-ternary
										}
									>
										{item.title}
									</NavLink>
								))}
							</div>
							{isAuthenticated ? (
								<Link to='/dashboard' className='text-xs text-white '>
									Dashboard
								</Link>
							) : (
								<div className=' extra-nav'>
									<div className='extra-cell'>
										<Link
											to='/login'
											className='text-white btn btn-outline-primary'
										>
											Login
										</Link>
										<Link
											to={`/register?referral_id=${
												referral_id ? referral_id : '6455d0825980054ef4c43d2c'
											}`}
											className='text-white btn btn-outline-primary'
										>
											Sign Up
										</Link>
									</div>
								</div>
							)}
							<div>
								<button
									type='button'
									className={`navbar-toggler  navicon  ${
										sidebarOpen ? 'open' : 'collapsed'
									}`}
									onClick={() => setSidebarOpen(!sidebarOpen)}
								>
									<span></span>
									<span></span>
									<span></span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</header>
			{/* Mobile Menu */}
			<div
				className={` h-full fixed mobile_menu md:hidden transition duration-300 ease-in-out  top-0 w-9/12 ${
					sidebarOpen ? 'active-mobile-menu' : 'mobile-menu'
				} `}
			>
				<div className='flex flex-col px-4 pt-4 '>
					<Link to='/'>
						<p className='inline-flex items-center p-2 mr-4 '>
							<img src={Logo} alt='logo' className='' />
						</p>
					</Link>
					<div className='flex flex-col items-start justify-start gap-2 '>
						{navItems.map((item) => (
							<NavLink
								key={item.id}
								to={item.path}
								className={({ isActive }) =>
									`border-b pb-2 w-full  ${
										isActive ? 'text-[#9467FE]' : 'text-[#1c2e9e]'
									}`
								}
								onClick={() => setSidebarOpen(false)}
							>
								{item.title}
							</NavLink>
						))}
					</div>
					<div className='flex mt-10 '>
						<div className='flex gap-2 mx-auto'>
							<li className='flex items-center justify-center w-10 h-10 border rounded-md '>
								<a
									target='_blank'
									className='fab fa-facebook-f'
									rel='noreferrer'
									href='https://www.facebook.com/'
								></a>
							</li>{' '}
							<li className='flex items-center justify-center w-10 h-10 border rounded-md '>
								<a
									target='_blank'
									className='fab fa-twitter'
									rel='noreferrer'
									href='https://twitter.com/'
								></a>
							</li>{' '}
							<li className='flex items-center justify-center w-10 h-10 border rounded-md '>
								<a
									target='_blank'
									className='fab fa-linkedin-in'
									rel='noreferrer'
									href='https://www.linkedin.com/'
								></a>
							</li>{' '}
							<li className='flex items-center justify-center w-10 h-10 border rounded-md '>
								<a
									target='_blank'
									className='fab fa-instagram'
									rel='noreferrer'
									href='https://www.instagram.com/'
								></a>
							</li>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default Header;
