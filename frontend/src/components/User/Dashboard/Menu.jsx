import React from 'react';
import { FaQuestion, FaHandHoldingUsd } from 'react-icons/fa';
import { FcOnlineSupport } from 'react-icons/fc';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { GrTransaction } from 'react-icons/gr';
import { BiArrowToTop } from 'react-icons/bi';
import { GiProfit } from 'react-icons/gi';

import { BsFillCreditCard2BackFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const menuItems = [
	{ id: 1, name: 'Referral', icon: <AiOutlineShareAlt />, link: '/referral' },
	{
		id: 9,
		name: 'Buy Coin',
		icon: <AiOutlineShareAlt />,
		link: '/coming-soon',
	},
	{ id: 3, name: 'Loan', icon: <FaHandHoldingUsd />, link: '/coming-soon' },

	{
		id: 4,
		name: 'History',
		icon: <GrTransaction />,
		link: '/transactions',
	},
	{ id: 2, name: 'Top-up', icon: <BiArrowToTop />, link: '/coming-soon' },
	{ id: 5, name: 'Support', icon: <FcOnlineSupport />, link: '/support' },
	{
		id: 6,
		name: 'FAQ',
		icon: <FaQuestion />,
		link: '/coming-soon',
	},
	{
		id: 7,
		name: 'Virtual Card',
		icon: <BsFillCreditCard2BackFill />,
		link: '/coming-soon',
	},
	{ id: 8, name: 'Airdrop', icon: <GiProfit />, link: '/coming-soon' },
	{
		id: 11,
		name: 'Mining',
		icon: <GiProfit />,
		link: '/coming-soon',
	},
	{
		id: 12,
		name: 'Launch',
		icon: <GiProfit />,
		link: '/coming-soon',
	},
	{
		id: 13,
		name: 'Chart',
		icon: <GiProfit />,
		link: '/coming-soon',
	},
];

const Menu = () => {
	return (
		<div className='rounded-lg bg-stone-900 '>
			<div className='grid grid-cols-4 gap-6 p-2 '>
				{menuItems.map((item) => (
					<Link to={item.link} key={item.id}>
						<li className='flex flex-col items-center py-4 space-y-2 text-gray-100 rounded-md cursor-pointer hover:bg-slate-800'>
							<span className='text-xl text-white'>{item.icon}</span>
							<span className='text-[0.7rem] md:text-sm italic'>
								{item.name}
							</span>
						</li>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Menu;
