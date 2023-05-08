import React from 'react';
import Logo from '../../../assets/images/logo-white.png';

import { BsBellFill } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';
import { FaCoins } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';

const Header = ({ handleOpen }) => {
	return (
		<div className='flex flex-col px-4 py-3 space-y-6 border-b bg-stone-950 border-slate-700'>
			<div className='flex items-center justify-between'>
				<div className='flex gap-4'>
					<div className=' md:hidden'>
						<BiMenu className='text-xl text-gray-100' onClick={handleOpen} />
					</div>
					<NavLink to='/' className='flex items-center'>
						<img src={Logo} alt='logo' className='w-24' />
					</NavLink>
				</div>

				<div className='flex items-center space-x-3'>
					{/* <div className='items-center hidden gap-2 p-2 rounded md:flex bg-stone-700'>
						<FaCoins className='text-sm text-gray-100' />
						<h2 className='text-xs'>
							<span className='font-bold text-gray-100 '>Balance</span>
							<span className='font-bold text-green-500'> 0.00</span>
						</h2>
					</div> */}
					<div className='p-2 rounded bg-stone-700 '>
						<BsBellFill className='text-sm text-gray-100' />
					</div>
					<div className='flex items-center space-x-2'>
						<AiOutlineUser className='text-xl text-gray-100 ' />
						<p className='hidden text-xs md:block'>HM Zakaria</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
