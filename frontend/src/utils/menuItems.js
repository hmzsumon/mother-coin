import {
	MdOutlineDashboardCustomize,
	MdOutlineVerifiedUser,
} from 'react-icons/md';
import { FaCoins } from 'react-icons/fa';
import { GiMining } from 'react-icons/gi';
import { BsCashCoin } from 'react-icons/bs';
import { VscReferences } from 'react-icons/vsc';
import { SiNativescript } from 'react-icons/si';
import { FcCurrencyExchange } from 'react-icons/fc';
import { SiMarketo } from 'react-icons/si';
import { BiGame } from 'react-icons/bi';
import { RiAuctionLine } from 'react-icons/ri';
import { FiUsers } from 'react-icons/fi';
import { AiFillSetting } from 'react-icons/ai';

const menuItems = [
	{
		id: 1,
		title: 'Public Account',
		icon: <MdOutlineDashboardCustomize />,
		path: '/coming-soon',
		subItems: [],
		isSubMenu: false,
	},
	{
		id: 2,
		title: 'Reward Center',
		icon: <FaCoins />,
		path: '/coming-soon',
		subItems: [],
		isSubMenu: false,
	},
	{
		id: 5,
		title: 'My Referral',
		icon: <VscReferences />,
		path: '/coming-soon',
		subItems: [],
		isSubMenu: false,
	},
	{
		id: 6,
		title: 'Announcement',
		icon: <SiMarketo />,
		path: '/coming-soon',
	},
	{
		id: 7,
		title: 'Create New Account',
		icon: <GiMining />,
		path: '/coming-soon',
	},

	{
		id: 8,
		title: 'Mother Community',
		icon: <BsCashCoin />,
		path: '/coming-soon',
	},
	{
		id: 14,
		title: 'KYC',
		icon: <MdOutlineVerifiedUser />,
		path: '/coming-soon',
	},
	{
		id: 9,
		title: 'Earn & Offer',
		icon: <BiGame />,
		path: '/coming-soon',
	},
	{
		id: 15,
		title: 'Settings',
		icon: <AiFillSetting />,
		path: '/coming-soon',
	},
	{
		id: 3,
		title: 'Security',
		icon: <SiNativescript />,
		path: '/coming-soon',
	},
	{
		id: 4,
		title: 'Support',
		icon: <FiUsers />,
		path: '/coming-soon',
	},
];

export default menuItems;
