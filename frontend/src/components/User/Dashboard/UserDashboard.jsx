import React from 'react';
import Layout from '../Layout/Layout';
import WalletCard from './WalletCard';
import Menu from './Menu';
import Carousel from './Carousel';
import { useLoadUserQuery } from '../../../features/auth/authApi';
import DefaultLoader from '../../../global/DefaultLoader';
import PriceList2 from './PriceList2';
import UserInfo from './UserInfo';
import WalletCard01 from '../Assets/WalletCard01';
import WalletCard02 from '../Assets/WalletCard02';
import FreeMing from '../Mining/FreeMining';
import EarnCard from '../Earn/EarnCard';

const UserDashboard = () => {
	const { data, error, isError, isLoading } = useLoadUserQuery();
	const { user } = data || {};

	// if (isError) {
	// 	return (
	// 		<Layout>
	// 			<h1 className='text-red-500'>{error.data.message}</h1>
	// 		</Layout>
	// 	);
	// }

	return (
		<Layout>
			{isLoading ? (
				<DefaultLoader />
			) : (
				<div className='space-y-3 '>
					<Carousel />
					{/* <UserInfo user={user} /> */}

					{/* <WalletCard02 user={user} /> */}
					<EarnCard user={user} />
					<FreeMing />
					{/* <Menu /> */}

					{/* <PriceList2,,,,,,
						pair={'MRC/MUSD'}
						chance={'+24'}
						isChancePositive={true}
						currentPrice={1}
						totalVolume={0}
					/>
					<PriceList2
						pair={'gmC/MUSD'}
						chance={'-13'}
						isChancePositive={false}
						currentPrice={0.25}
						totalVolume={7450}
					/>
					<PriceList2
						pair={'trxc/MUSD'}
						chance={'-75'}
						isChancePositive={false}
						currentPrice={0.1}
						totalVolume={33970}
					/> */}
				</div>
			)}
		</Layout>
	);
};

export default UserDashboard;
