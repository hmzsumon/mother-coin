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
			<div className=''>
				<div className='px-2 py-10 mx-auto rounded-md md:grid-cols-2 md:9/12 bg-slate-800'>
					<h2 className='my-4 text-center '>
						<span className='text-[0.7rem] text-orange-500 font-semibold text-center '>
							Share your referral link to earn 10% of your friends' deposits
						</span>
					</h2>
					<div className='grid grid-cols-1 gap-2 md:grid-cols-2 '>
						<div>
							<h className='text-[0.6rem]  text-blue-600 italic font-semibold text-center md:text-sm'>
								{link}
							</h>
						</div>
						<div className='w-full'>
							<CopyToClipboardButton text={link} btnText='Copy' />
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
