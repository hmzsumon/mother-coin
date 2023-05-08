import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalVideo from 'react-modal-video';

//Images
import Shape1 from './../assets/images/home-banner/shape1.png';
import Shape3 from './../assets/images/home-banner/shape3.png';

import about2 from './../assets/images/about/about-2.jpg';
import about3 from './../assets/images/about/about-3.jpg';
import about4 from './../assets/images/about/about-4.jpg';
import about1 from './../assets/images/about/about-1.jpg';

import PageHeader from '../layouts/PageHeader';
import PageLayout from '../layouts/PageLayout';

const ImageBox = ({ image, changeClass }) => {
	return (
		<div className='col-6'>
			<div className={`image-box ${changeClass}`}>
				<img src={image} alt='' />
			</div>
		</div>
	);
};

function AboutUs() {
	const nav = useNavigate();
	const formDetails = (e) => {
		e.preventDefault();
		nav('/contact-us');
	};
	const [isOpen, setOpen] = useState(false);
	return (
		<PageLayout>
			<div className='page-content'>
				<PageHeader pageTitle='About Us' />
				<section className='content-inner about-sec bg-primary-light'>
					<div className='container'>
						<div className='row about-bx2 style-1 align-items-center'>
							<div className='col-lg-6'>
								<div className='dz-media'>
									<div className='row align-items-end'>
										<ImageBox image={about4} changeClass='image-box-1' />
										<ImageBox image={about2} changeClass='image-box-2' />
									</div>
									<div className='row'>
										<ImageBox image={about3} changeClass='image-box-3' />
										<ImageBox image={about1} changeClass='image-box-4' />
									</div>
								</div>
							</div>
							<div className='col-lg-6 about-content ps-lg-5 m-b30'>
								<div className='section-head'>
									<h2 className='title'>
										Mother Coin (MCN) Is An Open Source Peer-to-Peer Digital
										Currency, Favored By Blockchain Worldwide.
									</h2>
								</div>
							</div>
						</div>
					</div>
					<img className='bg-shape1' src={Shape1} alt='' />
					<img className='bg-shape2' src={Shape3} alt='' />
					<img className='bg-shape3' src={Shape3} alt='' />
					<img className='bg-shape4' src={Shape3} alt='' />
				</section>
			</div>
			<ModalVideo
				channel='youtube'
				autoplay
				isOpen={isOpen}
				videoId='cfmQFW1DpA0'
				onClose={() => setOpen(false)}
			/>
		</PageLayout>
	);
}
export default AboutUs;
