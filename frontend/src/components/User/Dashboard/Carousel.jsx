import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import Img1 from '../../../assets/images/banner/b1.jpg';
import Img2 from '../../../assets/images/banner/b2.jpg';
import Img3 from '../../../assets/images/banner/b3.jpg';
import Img4 from '../../../assets/images/banner/b4.jpg';

const images = [Img1, Img2, Img3, Img4];

const Carousel = () => {
	const items = images.map((img) => {
		return (
			<div className='flex flex-col items-center text-white list-none cursor-pointer'>
				<img src={img} alt='' className=' w-[20rem]' />
			</div>
		);
	});

	const responsive = {
		0: {
			items: 1,
		},
		512: {
			items: 2,
		},
	};

	return (
		<div className='flex items-center px-1 py-4 rounded-md bg-stone-900'>
			<AliceCarousel
				mouseTracking
				infinite
				autoPlayInterval={1000}
				animationDuration={1500}
				disableDotsControls
				disableButtonsControls
				responsive={responsive}
				items={items}
				autoPlay
			/>
		</div>
	);
};

export default Carousel;
