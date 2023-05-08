import React from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

const MenuItem = ({ index, item, handleOpen, open }) => {
	return (
		<div>
			<li
				className='flex items-center justify-between space-x-2 bg-stone-900 px-2 py-1 rounded-md hover:bg-stone-800 transition duration-300 ease-in-out text-s cursor-pointer'
				onClick={() => handleOpen(index, item.id)}
			>
				<div className='flex items-center space-x-2'>
					{item.icon}
					<p className='text-sm text-gray-100'>{item.title}</p>
				</div>
				<MdKeyboardArrowDown
					className={`text-gray-100 ${open ? 'transform rotate-180' : ''}`}
				/>
			</li>
		</div>
	);
};

export default MenuItem;
