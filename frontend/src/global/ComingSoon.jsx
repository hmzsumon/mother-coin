import React from 'react';
import { BsArrowLeftSquare } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/User/Layout/Layout';

const ComingSoon = () => {
	const navigate = useNavigate();

	// go back to previous page
	const goBack = () => {
		navigate(-1);
	};

	return (
		<Layout>
			<div className='flex flex-col items-center justify-center h-screen '>
				<div className='flex flex-col items-center justify-center space-y-4'>
					<h1 className='text-2xl font-bold text-gray-100'>Coming Soon</h1>

					<button
						className='px-4 py-2 text-white bg-blue-500 rounded-md'
						onClick={goBack}
					>
						<BsArrowLeftSquare className='inline-block text-xl' /> Go Back
					</button>
				</div>
			</div>
		</Layout>
	);
};

export default ComingSoon;
