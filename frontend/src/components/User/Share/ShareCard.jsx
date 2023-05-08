import React, { useEffect } from 'react';
import CardNo from './CardNo';

import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import { useBuyShareCardMutation } from '../../../features/shareCard/shareCardApi';

const ShareCard = ({ share }) => {
	const [buyShareCard, { isLoading, isError, isSuccess, error }] =
		useBuyShareCardMutation();

	useEffect(() => {
		if (isError) {
			if (error.status === 901) {
				toast.warning('Please try again!');
			} else {
				toast.error(error?.data?.message);
			}
		}
		if (isSuccess) {
			toast.success('Ticket bought successfully');
		}
	}, [isError, error, isSuccess]);
	return (
		<div>
			<div className='mt-[6rem]  '>
				<div className='text-xs text-gray-100 '>
					<div className='text-xs italic font-bold text-center text-white '>
						<CardNo cardNo={share.card_no} />
					</div>
					<div className='flex items-center justify-between my-2 italic text-center text-green-500 '>
						<p> Price: &#8354; {share.price}</p>
						<p className='text-green-500 '>
							Profit: 1% of the profits of each draw.
						</p>
					</div>
				</div>
				<div className='mt-6 text-xs '>
					<button
						className='w-full py-2 italic text-gray-100 border border-blue-900 rounded-md'
						onClick={() => buyShareCard(share._id)}
						disabled={isLoading}
					>
						{isLoading ? <BeatLoader size={8} color={'#fff'} /> : 'Buy Now'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ShareCard;
