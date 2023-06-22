import React from 'react';
import { RiDownload2Fill, RiUpload2Fill } from 'react-icons/ri';
import { BiTransferAlt } from 'react-icons/bi';
import { SiConvertio } from 'react-icons/si';
import { Link } from 'react-router-dom';

const menuItems = [
	{
		id: 1,
		title: 'Deposit',
		icon: <RiDownload2Fill />,
		path: '/user/deposit',
	},
	{
		id: 2,
		title: 'Withdraw',
		icon: <RiUpload2Fill />,
		path: '/user/withdraw',
	},
	{
		id: 3,
		title: 'Transfer',
		icon: <BiTransferAlt />,
		path: '/user/transfer',
	},
	{
		id: 4,
		title: 'Convert',
		icon: <SiConvertio />,
		path: '/user/convert',
	},
];

const AssetsMenu = ({ user }) => {
	return (
		<div>
			<div className='space-y-4 rounded-md '>
				<div className='grid grid-cols-4 gap-4'>
					{menuItems.map((item) => (
						<Link to={item.path} key={item.id} className='space-y-4 '>
							<li className='flex flex-col items-center py-2 rounded-sm cursor-pointer bg-stone-900'>
								{item.icon}
								<p className='text-sm text-gray-100'>{item.title}</p>
							</li>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default AssetsMenu;
