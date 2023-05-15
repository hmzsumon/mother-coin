import React from 'react';
import { formatDate } from '../../../utils/functions';

const ApproveDetails = ({ deposit }) => {
	return (
		<div className='my-4 text-xs'>
			<h2 className='my-2 text-sm italic text-center text-green-500 '>
				Approved Info
			</h2>
			<div className='px-3 py-2 space-y-1 border'>
				{/* Withdraw Date */}
				<div className='grid grid-cols-2 list-none '>
					<li className='grid grid-cols-2 '>
						<span>Approved At</span>
						<span>:</span>
					</li>
					<li>{formatDate(deposit?.approvedAt) || 'Not Approved Yet'}</li>
				</div>
				<div className='grid grid-cols-2 list-none '>
					<li className='grid grid-cols-2 '>
						<span>Approved By</span>
						<span>:</span>
					</li>
					<li>{deposit?.approved_by ? deposit?.approved_by : 'Admin'}</li>
				</div>

				{deposit?.method === 'bank' && (
					<>
						<div className='grid grid-cols-2'>
							<p>Bank Name:</p>
							<p>{deposit?.bank.bank_name}</p>
						</div>
						{/* Branch name */}
						<div className='grid grid-cols-2'>
							<p>Branch Name:</p>
							<p>{deposit?.bank.branch_name}</p>
						</div>
						{/* Swift Code */}

						<div className='grid grid-cols-2'>
							<p>Swift Code:</p>
							<p>{deposit?.bank.swift_code}</p>
						</div>

						<div className='grid grid-cols-2'>
							<p>Account Name:</p>
							<p>{deposit?.bank.account_name}</p>
						</div>
						<div className='grid grid-cols-2'>
							<p>Account Number:</p>
							<p>{deposit?.bank.account_number}</p>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default ApproveDetails;
