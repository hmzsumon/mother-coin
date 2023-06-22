import React from 'react';
import { NavLink } from 'react-router-dom';

const WalletCard01 = ({ user }) => {
	// console.log(user);
	return (
		<div className='p-4 space-y-4 rounded-md bg-stone-900'>
			<div className='flex items-center '>
				<span className='text-xs font-semibold text-gray-100'>
					Mother Coin (Mother)
				</span>
			</div>
			<div className='flex items-center space-x-1'>
				<h1 className='text-white '>
					{user?.mc_balance
						? Number(user?.mc_balance).toFixed(8)
						: Number(0).toFixed(8)}
				</h1>
				<span className='text-xs font-semibold text-gray-100'>
					= $
					{user?.usd_balance
						? Number(user?.usd_balance).toFixed(2)
						: Number(0).toFixed(2)}
				</span>
			</div>
			<div className='grid grid-cols-3 gap-4 text-[0.6rem] md:text-sm'>
				<NavLink
					to='/buy-coin'
					state={{ coin: 'mother' }}
					className='px-3 py-2 font-bold text-center text-gray-100 bg-yellow-600 rounded-sm'
				>
					Buy Mother
				</NavLink>
				<NavLink
					to='/send'
					state={{ coin: 'mother' }}
					className='w-full px-3 py-2 font-bold text-center text-gray-100 bg-yellow-600 rounded-sm'
				>
					Withdraw
				</NavLink>

				<NavLink
					to='/receive'
					state={'mother-coin-address'}
					className='w-full px-3 py-2 font-bold text-center text-gray-100 bg-yellow-600 rounded-sm'
				>
					Deposit
				</NavLink>
			</div>
		</div>
	);
};

export default WalletCard01;
