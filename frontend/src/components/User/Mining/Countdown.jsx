import React, { useEffect, useState } from 'react';

const Countdown = ({ profit }) => {
	const [stateProfit, setStateProfit] = useState(profit);
	let interval;

	const startTimer = () => {
		interval = setInterval(() => {
			setStateProfit((prevState) => prevState + 0.000347222222);
		}, 60000);
	};

	// componentDidMount
	useEffect(() => {
		console.log('profit', profit);
		if (profit) {
			startTimer();
		}

		return () => {
			clearInterval(interval);
		};
	});

	return (
		<>
			<h1 className='text-xs  font-bold text-gray-100 '>
				{stateProfit ? stateProfit.toFixed(12) : Number(0).toFixed(12)} (Mother)
			</h1>
		</>
	);
};

export default Countdown;
