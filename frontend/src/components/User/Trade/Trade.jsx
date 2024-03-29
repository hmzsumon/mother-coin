import React from 'react';
// import { useGetPricesQuery } from '../../features/prices/priceApi';
import Layout from '../Layout/Layout';
import FadeLoader from 'react-spinners/FadeLoader';

import BuySell from './BuySell';

const Trade = () => {
	// const { data, isLoading } = useGetPricesQuery();
	// const { currentPrice } = data || {};
	const currentPrice = 0;
	const isLoading = false;
	return (
		<Layout>
			<div className='h-[60vh] pt-10'>
				<div className='w-full mx-auto '>
					{isLoading ? (
						<div className='flex items-center justify-center mt-44 '>
							<FadeLoader color={'#fbbf24'} />
						</div>
					) : (
						<div className='p-2 pt-2 pb-10 rounded-lg bg-slate-800 '>
							<BuySell currentPrice={currentPrice} />
						</div>
					)}
				</div>
			</div>
		</Layout>
	);
};

export default Trade;
