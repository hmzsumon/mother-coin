import React from 'react';
import { BsArrowLeftSquare } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Carousel from '../Dashboard/Carousel';

const EarnOffer = () => {
	const navigate = useNavigate();

	// go back to previous page
	const goBack = () => {
		navigate(-1);
	};

	return (
		<Layout>
			<div className=''>
				<Carousel />
			</div>
		</Layout>
	);
};

export default EarnOffer;
