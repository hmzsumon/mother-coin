import React from 'react';
import { NavLink } from 'react-router-dom';

// import { useGetUsdxDetailsQuery } from '../../features/usdx/usdxApi';

const WalletCard02 = ({ user }) => {
	return (
		<div className='p-4 space-y-4 bg-stone-900 teal-600rounded-md'>
			<div className='flex items-center '>
				<span className='text-xs font-semibold text-gray-100'>
					Mother USD (MUSD)
				</span>
			</div>

			<div className='flex items-center space-x-3'>
				<h1 className='text-white '>
					{user?.musd_balance
						? Number(user?.musd_balance).toFixed(2)
						: Number(0).toFixed(2)}
					$
				</h1>
			</div>
			<div className='grid grid-cols-3 gap-4 text-[0.6rem] md:text-sm'>
				<NavLink
					to='/buy-coin'
					state={{ coin: 'musd' }}
					className='px-3 py-2 font-bold text-center text-gray-100 bg-yellow-600 rounded-sm'
				>
					Buy MUSD
				</NavLink>

				<NavLink
					to='/send/musd'
					state={{ coin: 'musd' }}
					className='px-3 py-2 font-bold text-center text-gray-100 bg-yellow-600 rounded-sm disabled:cursor-not-allowed '
					disabled
				>
					Send
				</NavLink>

				<NavLink
					to='/receive'
					state={'musd-address'}
					className='w-full px-3 py-2 font-bold text-center text-gray-100 bg-yellow-600 rounded-sm'
				>
					Receive
				</NavLink>
			</div>
		</div>
	);
};

export default WalletCard02;
