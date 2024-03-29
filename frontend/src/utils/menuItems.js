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
		title: 'Dashboard',
		icon: <MdOutlineDashboardCustomize />,
		path: '/dashboard',
		subItems: [],
		isSubMenu: false,
	},

	{
		id: 5,
		title: 'My Referral',
		icon: <VscReferences />,
		path: '/referral',
		subItems: [],
		isSubMenu: false,
	},

	{
		id: 6,
		title: 'Buy History',
		icon: <FaCoins />,
		path: '/my-deposits',
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
		path: '/earn-offer',
	},
	{
		id: 15,
		title: 'Profile',
		icon: <AiFillSetting />,
		path: '/profile',
	},
	{
		id: 3,
		title: 'Security',
		icon: <SiNativescript />,
		path: '/security',
	},
	{
		id: 4,
		title: 'Support',
		icon: <FiUsers />,
		path: '/support',
	},
];

export default menuItems;
