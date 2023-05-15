import React from 'react';
import { NavLink } from 'react-router-dom';

// import { useGetUsdxDetailsQuery } from '../../features/usdx/usdxApi';

const EarnCard = ({ user }) => {
	return (
		<div className='p-4 space-y-4 bg-stone-900 teal-600rounded-md'>
			<div className='flex items-center '>
				<p className='text-xs font-semibold text-gray-100'>Airdrop</p>
			</div>

			<div className='flex items-center space-x-3'>
				<h1 className='text-xs text-white '>
					{user?.b_balance
						? Number(user?.b_balance).toFixed(2)
						: Number(0).toFixed(2)}
					$
				</h1>
			</div>
			<div className='grid grid-cols-2 gap-4 text-[0.6rem] md:text-sm'>
				<NavLink
					to='/usdx-withdraw'
					className='px-3 py-2 font-bold text-center text-gray-100 bg-yellow-600 rounded-sm'
				>
					Transfer
				</NavLink>
				<button
					className='px-3 py-2 font-bold text-center text-gray-100 bg-yellow-600 rounded-sm disabled:cursor-not-allowed '
					disabled
				>
					Task
				</button>
			</div>
		</div>
	);
};

export default EarnCard;
