import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BiLinkExternal } from 'react-icons/bi';

const Top = ({ user }) => {
	const balance = Number(user?.usd_balance + user?.musd_balance).toFixed(2);
	const data = [
		{
			id: 1,
			title: 'Name',
			value: user?.name,
		},
		{
			id: 2,
			title: 'Email',
			value: user?.email,
		},
		{
			id: 3,
			title: 'M-ID',
			value: user?.mother_id,
		},
		{
			id: 4,
			title: 'Balance',
			value: `$${balance} (MUSD)`,
		},
	];
	return (
		<div className='pl-1 mb-2'>
			<div className='m-2 '>
				<AiOutlineUser className='p-1 text-4xl text-gray-100 rounded-full ring-1' />
			</div>
			<div className=' text-[.6rem]'>
				{data.map((item) => (
					<div key={item.id} className='grid grid-cols-2 list-none '>
						<li className='grid grid-cols-2 '>
							<span className='text-white '>{item.title}</span>
							<span className=''>:</span>
						</li>
						<li className='-ml-10 '>
							<span>{item.value}</span>
						</li>
					</div>
				))}
				<div className='flex gap-2 list-none '>
					<li className='flex gap-2'>
						<span className='text-white '>MID Connect</span>
						<span className=''> :</span>
					</li>
					<li className=''>
						<span>
							<BiLinkExternal className='text-xs text-blue-600' />
						</span>
					</li>
				</div>
			</div>
		</div>
	);
};

export default Top;
