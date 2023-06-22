import React from 'react';
import { AiTwotoneHome } from 'react-icons/ai';
import { GiWallet, GiMining } from 'react-icons/gi';
import { FcCurrencyExchange } from 'react-icons/fc';

import { NavLink } from 'react-router-dom';

const navItems = [
	{ id: 1, name: 'Home', icon: <AiTwotoneHome />, link: '/dashboard' },
	{ id: 3, name: 'Market', icon: <GiMining />, link: '/coming-soon' },
	{ id: 2, name: 'Tread', icon: <FcCurrencyExchange />, link: '/exchange' },

	// {
	// 	id: 4,
	// 	name: 'History',
	// 	icon: <VscHistory />,
	// 	link: '/history',
	// },
	{ id: 6, name: 'Feature', icon: <GiWallet />, link: '/coming-soon' },
	{ id: 5, name: 'Assets', icon: <GiWallet />, link: '/assets' },
];

const Navbar = () => {
	return (
		<div className='fixed inset-x-0 bottom-0 border-t bg-stone-950 border-slate-600 '>
			<nav className='flex items-center justify-between h-16 px-4'>
				{navItems.map((item) => (
					<NavLink
						to={item.link}
						key={item.id}
						className={({ isActive }) =>
							isActive ? ' text-yellow-400' : 'text-gray-400'
						}
					>
						<li className='flex flex-col items-center justify-center text-sm font-semibold list-none md:text-xl'>
							<span>{item.icon}</span>
							<span>{item.name}</span>
						</li>
					</NavLink>
				))}
			</nav>
		</div>
	);
};

export default Navbar;
