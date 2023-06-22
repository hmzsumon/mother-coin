import React from 'react';
import { useSelector } from 'react-redux';
import Layout from '../Layout/Layout';
import qr from '../../../assets/images/qr/qrcode1.png';
import CopyToClipboardButton from '../../../global/CopyToClipboardButton';
import { useLocation } from 'react-router-dom';

const Receive2 = () => {
	const { user } = useSelector((state) => state.auth);
	const location = useLocation();
	const { state } = location;
	console.log(state);

	return (
		<Layout>
			<div className='w-11/12 px-2 py-4 mx-auto space-y-4 rounded-md bg-slate-800 '>
				<div>
					<h2 className='text-sm font-extrabold text-center text-gray-100 md:text-3xl'>
						Please Copy Your Wallet Address Below
					</h2>
				</div>

				<div>
					<div className='w-9/12 mx-auto bg-white rounded-sm md:w-6/12'>
						<img src={qr} alt='qr-code' />
					</div>
				</div>

				<div className='space-y-4 '>
					<h3 className='py-1 text-sm text-center bg-transparent border rounded'>
						<span className='font-semibold text-green-500'>
							{state === 'mother-coin-address' && user?.mother_coin_address}
							{state === 'musd-address' && user?.musd_address}
						</span>
					</h3>
					{state === 'mother-coin-address' && (
						<CopyToClipboardButton text={user?.customer_id} btnText='Copy' />
					)}
					{state === 'musd-address' && (
						<CopyToClipboardButton text={user?.musd_address} btnText='Copy' />
					)}
				</div>
			</div>
		</Layout>
	);
};

export default Receive2;
