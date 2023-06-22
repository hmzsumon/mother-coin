import React from 'react';

const MyAssets = ({ user }) => {
	return (
		<div>
			<div className='p-4 space-y-4 rounded-md bg-stone-900'>
				<div className='flex items-center '>
					<span className='text-xl font-semibold text-gray-100'>
						Total Assets
					</span>
				</div>
				<div className='flex items-center min-h-[80px] space-x-1'>
					<h2 className='text-2xl'>
						<span className='mx-1 font-bold text-green-500'>
							$
							{user?.usd_balance
								? Number(user?.usd_balance).toFixed(2)
								: Number(0).toFixed(2)}{' '}
							<span className='text-sm'>(MUSD)</span>
						</span>
					</h2>
				</div>
			</div>
		</div>
	);
};

export default MyAssets;
