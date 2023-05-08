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
		id: 2,
		title: 'Buy Coin',
		icon: <FaCoins />,
		path: '/buy-coin',
		subItems: [],
		isSubMenu: false,
	},
	{
		id: 3,
		title: 'Mining',
		icon: <GiMining />,
		path: '/mining',
		subItems: [],
		isSubMenu: false,
	},
	{
		id: 4,
		title: 'Assets',
		icon: <BsCashCoin />,
		path: '/assets',
		subItems: [],
		isSubMenu: false,
	},
	{
		id: 9,
		title: 'Exchange',
		icon: <FcCurrencyExchange />,
		path: '/exchange',
		subItems: [],
		isSubMenu: false,
	},
	{
		id: 5,
		title: 'Referral',
		icon: <VscReferences />,
		path: '/referral',
		subItems: [],
		isSubMenu: false,
	},
	{
		id: 6,
		title: 'NFT',
		icon: <SiNativescript />,
		path: '/coming-soon',
		subItems: [],
		isSubMenu: true,
	},
	{
		id: 10,
		title: 'NFT Marketplace',
		icon: <SiNativescript />,
		path: '/coming-soon',
	},
	{
		id: 11,
		title: 'Buy NFT',
		icon: <SiNativescript />,
		path: '/coming-soon',
	},
	{
		id: 7,
		title: 'Play Game',
		icon: <BiGame />,
		path: '/coming-soon',
		subItems: [],
		isSubMenu: false,
	},
	{
		id: 12,
		title: 'Auction',
		icon: <RiAuctionLine />,
		path: '/coming-soon',
	},
	{
		id: 8,
		title: 'Market',
		icon: <SiMarketo />,
		path: '/coming-soon',
		subItems: [],
		isSubMenu: false,
	},
	{
		id: 13,
		title: 'Clint to Counter C2C',
		icon: <FiUsers />,
		path: '/coming-soon',
	},
	{
		id: 14,
		title: 'KYC',
		icon: <MdOutlineVerifiedUser />,
		path: '/coming-soon',
	},
	{
		id: 15,
		title: 'Settings',
		icon: <AiFillSetting />,
		path: '/coming-soon',
	},
];

export default menuItems;
