import React from 'react';
import { Link } from 'react-router-dom';

//images
import Shape1 from './../assets/images/home-banner/shape1.png';
import Shape3 from './../assets/images/home-banner/shape3.png';

const PageHeader = ({ pageTitle, desc }) => {
	return (
		<>
			<div className='text-center dz-bnr-inr style-1'>
				<div className='container'>
					<div className='dz-bnr-inr-entry'>
						<h1>{pageTitle}</h1>
						{desc !== false && (
							<p className='text'>
								Transfer MUSD, Mother Coin, Crypto and start trading today!
							</p>
						)}
						<nav className='breadcrumb-row'>
							<ul className='breadcrumb'>
								<li className='breadcrumb-item'>
									<Link to={'/'}>Home</Link>
								</li>
								<li className='breadcrumb-item active'>{pageTitle}</li>
							</ul>
						</nav>
					</div>
				</div>
				<img className='bg-shape1' src={Shape1} alt='' />
				<img className='bg-shape2' src={Shape1} alt='' />
				<img className='bg-shape3' src={Shape3} alt='' />
				<img className='bg-shape4' src={Shape3} alt='' />
			</div>
		</>
	);
};
export default PageHeader;
