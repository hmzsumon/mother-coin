import React from 'react';
import { formatDate } from '../../../utils/functions';
import GoBack from '../../../global/GoBack';

const Details = ({ deposit }) => {
	const {
		status,
		name,
		amount,
		method,
		transactionId,
		createdAt,
		wallet_address,
		coin,
	} = deposit || {};
	return (
		<div>
			<div className=''>
				<div className='p-2 mx-auto my-4 rounded bg-slate-800'>
					<div className=''>
						<h1 className='my-4 space-x-2 text-sm font-bold text-center text-gray-100'>
							<span
								className={`capitalize mr-2 ${
									status === 'pending' ? 'text-yellow-500' : 'text-green-500'
								}`}
							>
								{status}
							</span>
							Deposit Details
						</h1>
						{status === 'pending' && (
							<p className='my-1 text-xs text-center text-gray-400'>
								<span>
									Your deposit is pending. Please wait for the admin to approve.
									We will notify you once your deposit is approved.
								</span>
							</p>
						)}

						<div className='p-3 border'>
							<div className='space-y-1 text-xs '>
								<h2 className='text-xs italic text-center text-indigo-600'>
									Deposit Information:
								</h2>
								<div className='grid grid-cols-2 list-none '>
									<li className='grid grid-cols-2 '>
										<span>Full Name</span>
										<span>:</span>
									</li>
									<li>{name}</li>
								</div>

								<div className='grid grid-cols-2 list-none '>
									<li className='grid grid-cols-2 '>
										<span>Amount</span>
										<span>:</span>
									</li>
									<li>{amount}$</li>
								</div>
								<div className='grid grid-cols-2 list-none '>
									<li className='grid grid-cols-2 '>
										<span>Method</span>
										<span>:</span>
									</li>
									<li>{method}</li>
								</div>
								<div className='grid grid-cols-2 list-none '>
									<li className='grid grid-cols-2'>
										<span>Wallet Address </span>
										<span>:</span>
									</li>
									<li className='text-[0.6rem] '>{wallet_address}</li>
								</div>
								<div className='grid grid-cols-2 list-none '>
									<li className='grid grid-cols-2 '>
										<span>Transaction Id</span>
										<span>:</span>
									</li>
									<li>{transactionId}</li>
								</div>
								<div className='grid grid-cols-2 list-none '>
									<li className='grid grid-cols-2 '>
										<span>Coin</span>
										<span>:</span>
									</li>
									<li>{coin}</li>
								</div>
								<div className='grid grid-cols-2 list-none '>
									<li className='grid grid-cols-2 '>
										<span>Request At</span>
										<span>:</span>
									</li>
									<li>{formatDate(createdAt)}</li>
								</div>
							</div>
						</div>
					</div>
					<div className='flex flex-col items-center justify-center my-4'>
						<GoBack />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Details;
