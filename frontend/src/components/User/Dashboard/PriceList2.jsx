import React from 'react';
import { Link } from 'react-router-dom';

const PriceList2 = ({
	pair,
	chance,
	currentPrice,
	totalVolume,
	isChancePositive,
}) => {
	return (
		<div className='rounded-md bg-stone-900 '>
			<div className='p-3'>
				<div className='mx-auto space-y-2 '>
					<div className='grid w-full grid-cols-4 gap-2 text-xs italic'>
						<span className=''>Pair</span>
						<span className='text-center text-[0.6rem] md:text-xs'>
							Current Price
						</span>
						<span className='text-center text-[0.6rem] md:text-xs'>
							Total Volume
						</span>
						<span className='text-center text-[0.5rem] md:text-xs'>Chance</span>
					</div>
					<div className='grid w-full grid-cols-4 gap-2 text-xs italic'>
						<span className='text-[0.6rem] text-gray-100'>
							{pair.toUpperCase()}
						</span>
						<span className='text-center text-gray-100 text-[0.6rem] md:text-xs'>
							{Number(currentPrice ? currentPrice.toFixed(8) : 0).toFixed(8)}$
						</span>
						<span className='text-center text-[0.6rem] md:text-xs text-gray-100'>
							{Number(totalVolume ? totalVolume.toFixed(2) : 0).toFixed(2)}$
						</span>
						<span className=' text-gray-100 text-center text-[0.6rem] md:text-xs'>
							{isChancePositive ? (
								<span className='text-green-500'>{chance}%</span>
							) : (
								<span className='text-red-500'>{chance}%</span>
							)}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PriceList2;
