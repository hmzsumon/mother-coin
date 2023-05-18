import React from 'react';
import Layout from '../Layout/Layout';
import { useSelector } from 'react-redux';
import CopyToClipboardButton from '../../../global/CopyToClipboardButton';
import {
	FacebookShareButton,
	WhatsappShareButton,
	FacebookMessengerShareButton,
	WhatsappIcon,
	FacebookIcon,
	FacebookMessengerIcon,
} from 'react-share';

const Referral = () => {
	const { user } = useSelector((state) => state.auth);
	const host = window.location.host;
	const link = `${host}/register?referral_id=${user?._id}`;
	return (
		<Layout>
			<div className='px-2 py-4 bg-slate-800'>
				<div className=' grid gap-4 md:grid-cols-2'>
					<div className=''>
						<h2 className='my-2 text-2xl text-center md:text-left font-semibold '>
							Referral
						</h2>
						<p className='text-[0.6rem] my-1  text-blue-600  font-semibold text-center md:text-sm'>
							{link}
						</p>
						<div className='w-full'>
							<CopyToClipboardButton text={link} btnText='Copy' />
						</div>
					</div>
					<div>
						<h2 className='my-2 text-2xl text-center sm:text-left md:text-left font-semibold '>
							How To Use
						</h2>
						<div>
							<div className='mx-auto w-6/12 md:w-full'>
								<p className=' text-xs '>
									Are Your Referral Code in 3 Easy Stapes
								</p>
								<p className='text-[0.6rem]  text-blue-600  font-semibold  md:text-sm'>
									1. Copy Your Referral Link
								</p>
								<p className='text-[0.6rem]  text-blue-600  font-semibold  md:text-sm'>
									2. Invited Your Friends Get 5 Mother Coin For Each Friend
								</p>
								<p className='text-[0.6rem]  text-blue-600  font-semibold  md:text-sm'>
									3. Get Reward Rewards Deposit rate 5%
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Referral;

/* <FacebookButton url={link} appId={'738486964369603'}>
	<FacebookCount url={link} />
	{' Share ' + link}
</FacebookButton>; */
