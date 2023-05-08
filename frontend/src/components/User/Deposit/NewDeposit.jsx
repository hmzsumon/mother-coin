import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import GoBack from '../../../global/GoBack';
import { useNavigate } from 'react-router-dom';

const depositMethods = [
	{
		id: 4,
		name: 'Bkash',
		icon: './images/bKash.svg',
		number: '01823538129',
		value: 'bkash',
		isActive: true,
		type: 'agent',
	},
	{
		id: 5,
		name: 'Rocket',
		icon: './images/rocket.svg',
		number: '01823538129',
		value: 'rocket',
		isActive: true,
		type: 'agent',
	},
	{
		id: 9,
		name: 'Nagad',
		icon: './images/nagad.svg',
		number: '01823538129',
		value: 'nagad',
		isActive: true,
		type: 'agent',
	},

	{
		id: 1,
		name: 'Paypal',
		icon: './images/payPal.svg',
		number: '#003087',
		value: 'paypal',
		isActive: false,
	},
	{
		id: 2,
		name: 'Visa',
		icon: './images/visa.svg',
		number: '#003087',
		value: 'visa',
		isActive: false,
	},
	{
		id: 3,
		name: 'Mastercard',
		icon: './images/mastercard.svg',
		number: '#003087',
		value: 'mastercard',
		isActive: false,
	},
];

const NewDeposit = () => {
	const navigate = useNavigate();
	const [sMethod, setSMethod] = useState(depositMethods[0]);
	const [amount, setAmount] = useState(0);
	// handle select method
	const handleSelectMethod = (method) => {
		setSMethod(method);
	};

	const handleNext = () => {
		navigate('/deposit-submit', { state: { sMethod, amount } });
		setSMethod(null);
		setAmount(0);
	};
	return (
		<Layout>
			<div className='flex items-center justify-center mx-1 '>
				<div className='w-full p-2 mx-auto space-y-4 rounded-lg md:w-11/12 bg-stone-900'>
					<h1 className='flex flex-col text-sm text-center'>
						<span className='text-white '>Buy Now!</span>
						<span className=' text-orange-500 text-[0.6rem] italic'>
							Minimum Amount: <span className='text-fuchsia-500'> 100</span>
						</span>
					</h1>
					<div>
						<div className='space-y-3 '>
							<div className='p-2 '>
								<div className='relative'>
									<label for='name' className='text-sm leading-7 text-gray-100'>
										Amount
									</label>
									<input
										type='text'
										id='name'
										name='name'
										className='w-full px-3 py-1 text-base leading-8 text-gray-100 transition-colors duration-200 ease-in-out bg-opacity-50 border border-gray-300 rounded outline-none bg-stone-900 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200'
									/>
								</div>
							</div>
							<div className='grid grid-cols-3 gap-4 '>
								{depositMethods.map((method) => {
									return (
										<button
											key={method.id}
											className={`rounded-lg border-blue-500 border-[1px] disabled:cursor-not-allowed ${
												method.id === sMethod.id
													? 'bg-fuchsia-800'
													: ' bg-white'
											} cursor-pointer  ${
												!method.isActive
													? 'hover:bg-slate-700'
													: 'hover:bg-fuchsia-800'
											}`}
											onClick={() => handleSelectMethod(method)}
											disabled={!method.isActive}
										>
											<img
												src={method.icon}
												alt={method.name}
												className='w-20 h-20 mx-auto '
											/>
											{/* <span>{method.name}</span> */}
										</button>
									);
								})}
							</div>
							<button
								className={`w-full ${
									amount <= 99 ? 'bg-slate-700' : 'bg-fuchsia-800'
								} py-1 rounded text-center disabled:cursor-not-allowed disabled:opacity-50`}
								disabled={amount <= 99}
								onClick={handleNext}
							>
								Next
							</button>
						</div>
					</div>
					<div className='flex flex-col items-center justify-center'>
						<GoBack />
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default NewDeposit;
