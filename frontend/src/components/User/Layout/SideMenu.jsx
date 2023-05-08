import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import menuItems from '../../../utils/menuItems';
import { FiLogOut } from 'react-icons/fi';
import { useLogoutMutation } from '../../../features/auth/authApi';
import { useEffect } from 'react';

const SideMenu = () => {
	const navigate = useNavigate();
	const [logout, { isSuccess }] = useLogoutMutation();

	useEffect(() => {
		if (isSuccess) {
			navigate('/');
		}
	}, [isSuccess, navigate]);
	return (
		<div>
			<ul className='space-y-3 spa'>
				{menuItems.map((item, index) => (
					<NavLink
						key={item.id}
						to={item.path}
						className='flex items-center space-x-2 bg-stone-900 px-2 py-1 rounded-md hover:bg-stone-800 transition duration-300 ease-in-out text-s'
					>
						<li className='flex items-center list-none space-x-3'>
							{item.icon}
							<p className='text-sm text-gray-100'>{item.title}</p>
						</li>
					</NavLink>
				))}
			</ul>
			<div className=' my-3 w-full mx-auto flex items-center justify-center'>
				<button
					className=' flex items-center space-x-3 rounded-sm bg-stone-800 px-2 py-1'
					onClick={() => logout()}
				>
					<p className='text-sm text-gray-100'>Logout</p>
					<FiLogOut />
				</button>
			</div>
		</div>
	);
};

export default SideMenu;
