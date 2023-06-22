import React from 'react';
import { useSelector } from 'react-redux';
import Layout from '../Layout/Layout';

import { useLocation, useNavigate } from 'react-router-dom';

const conis = [
	{
		id: 1,
		title: 'Mother Coin',
		value: 'mother-coin-address',
	},
	{
		id: 2,
		title: 'MUSD',
		value: 'musd-address',
	},
];
const Receive = () => {
	const { user } = useSelector((state) => state.auth);
	const location = useLocation();
	const navigate = useNavigate();
	const { state } = location;
	console.log(state);

	const handleReceive = () => {
		navigate('/receive-wallet', { state: state });
	};

	return (
		<Layout>
			<div className='w-11/12 px-2 py-4 mx-auto space-y-4 rounded-md bg-slate-800 '>
				<div>
					<h2 className='text-sm font-extrabold text-center text-gray-100 md:text-3xl'>
						Please Choice Your Wallet Address Below
					</h2>
					{conis.map((coin) => (
						<div key={coin.id}>
							<button
								className='w-full px-4 py-2 mt-4 text-sm font-semibold text-white bg-yellow-500 rounded'
								onClick={handleReceive}
							>
								{coin.title}
							</button>
						</div>
					))}
				</div>
			</div>
		</Layout>
	);
};

export default Receive;
