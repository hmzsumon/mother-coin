import React from 'react';
import Layout from '../Layout/Layout';
import WalletCard01 from './WalletCard01';

import { useLoadUserQuery } from '../../../features/auth/authApi';
import { FadeLoader } from 'react-spinners';
import WalletCard02 from './WalletCard02';
import MyAssets from './MyAssets';
import AssetsMenu from './Menu';

const Assets = () => {
	const { data, isLoading } = useLoadUserQuery();
	const { user } = data || {};

	return (
		<Layout>
			{isLoading ? (
				<div className='flex justify-center items-center mt-24 h-[80%]'>
					<FadeLoader color='#fff' />
				</div>
			) : (
				<div className='h-full pb-20'>
					<div className='space-y-4 '>
						<MyAssets user={user} />
						<AssetsMenu />
						<WalletCard01 user={user} />
						<WalletCard02 />
						{/* <WalletCard02 />
						<WalletCard06 />
						<WalletCard07 />
						<WalletCard08 /> */}
					</div>
				</div>
			)}
		</Layout>
	);
};

export default Assets;
