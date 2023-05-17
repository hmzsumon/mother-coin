import React from 'react';
import './assets/css/style.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

import Profile from './components/User/Profile/Profile';
import PrivetRoute from './route/PrivetRoute';
import MyDeposits from './components/User/Deposit/MyDeposits';
import NotFound from './pages/NotFound';
import UserDashboard from './components/User/Dashboard/UserDashboard';
import DepositList from './components/Admin/Deposit/DepositList';
import NotAccess from './pages/NotAccess';
import Lottery from './components/User/Lottery/Lottery';
import Wallets from './components/User/Wallets/Wallets';
import Draws from './components/User/Draw/Draws';
import Referral from './components/User/Rferral/Rferral';

import EmailVerification from './components/User/Verification/EmailVerification';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './components/Admin/Dashboard/Dashboard';

import DepositSubMit from './components/User/Deposit/DepositSubMit';
import DepositDetails from './components/User/Deposit/DepositDetails';
import EditDeposit from './components/Admin/Deposit/EditDeposit';
import LuckyBoxes from './components/User/Lottery/LuckyBoxes';
import Transactions from './components/User/History/Transactions';
import MyLotteries from './components/User/Lottery/MyLotteries';
import AdminDraw from './components/Admin/Lottery/AdminDraw';
import AdminLotteries from './components/Admin/Lottery/AdminLotteries';

import Convert from './components/User/Convert/Convert';
import SendMoney from './components/User/Send/SendMoney';
import NewWithdraw from './components/User/Withdraw/NewWithdraw';
import MyTeams from './components/User/Team/MyTeams';
import MyWithdraws from './components/User/Withdraw/MyWithdraws';
import Withdraws from './components/Admin/Withdraw/Withdraws';
import Users from './components/Admin/Users/Users';
import Support from './components/User/Support/Support';

import UserDetails from './components/Admin/Users/UserDetails';
import More from './components/User/More/More';
import WithdrawDetails from './components/User/Withdraw/WithdrawDetails';
import ForgotPassword from './components/User/ResetPass/ForgotPassword';
import PasswordReset from './components/User/ResetPass/PasswordReset';
import EditWithdraw from './components/Admin/Withdraw/EditWithdraw';

import PrizeChart from './components/User/Lottery/PrizeChart';
import Shares from './components/User/Share/Shares';
import MyShareCard from './components/User/MyShareCard/MyShareCard';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ComingSoon from './global/ComingSoon';
import BuyCoin from './components/User/Deposit/BuyCoin';
import Assets from './components/User/Assets/Assets';
import Trade from './components/User/Trade/Trade';
import Mining from './components/User/Mining/Mining';
import Receive from './components/User/Receive/Receive';
import PriceList from './components/Admin/Price/PriceList';
import CreatePrice from './components/Admin/Price/CreatePrice';
import SendMusd from './components/User/Send/SendMusd';
import Security from './components/User/Security/Security';

const App = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/1xLuck24/admin' element={<AdminLogin />} />
				<Route path='/register' element={<Signup />} />
				<Route path='/email-verify' element={<EmailVerification />} />
				<Route path='/forgot-password' element={<ForgotPassword />} />
				<Route path='/password/reset/:token' element={<PasswordReset />} />
				{/* Admin Route */}
				<Route element={<PrivetRoute isAdmin={true} />}>
					<Route path='/admin-dashboard' element={<AdminDashboard />} />

					<Route path='/admin/deposits' element={<DepositList />} />
					<Route path='/admin/deposit/edit/:id' element={<EditDeposit />} />

					<Route path='/admin/lotteries' element={<AdminLotteries />} />
					<Route path='/admin/draw' element={<AdminDraw />} />

					<Route path='/admin/withdraw' element={<Withdraws />} />
					<Route path='/admin/withdraw/edit/:id' element={<EditWithdraw />} />

					<Route path='/admin/users' element={<Users />} />
					<Route path='/admin/user/details/:id' element={<UserDetails />} />

					<Route path='/admin/price-list' element={<PriceList />} />
					<Route path='/create-price' element={<CreatePrice />} />
				</Route>
				{/* User Route */}
				<Route element={<PrivetRoute />}>
					<Route path='/dashboard' element={<UserDashboard />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/coming-soon' element={<ComingSoon />} />

					<Route path='/lottery' element={<Lottery />} />
					<Route path='/lucky-boxes' element={<LuckyBoxes />} />
					<Route path='/my-tickets' element={<MyLotteries />} />
					<Route path='/prize-chart' element={<PrizeChart />} />

					<Route path='/wallets' element={<Wallets />} />
					<Route path='/draws' element={<Draws />} />
					<Route path='/referral' element={<Referral />} />

					<Route path='/buy-coin' element={<BuyCoin />} />
					<Route path='/deposit-submit' element={<DepositSubMit />} />
					<Route path='/my-deposits' element={<MyDeposits />} />
					<Route path='/deposit/:id' element={<DepositDetails />} />

					<Route path='/transactions' element={<Transactions />} />
					<Route path='/convert' element={<Convert />} />
					<Route path='/send' element={<SendMoney />} />
					<Route path='/send/musd' element={<SendMusd />} />

					<Route path='/new-withdraw' element={<NewWithdraw />} />
					<Route path='/my-withdraws' element={<MyWithdraws />} />
					<Route path='/withdraw/:id' element={<WithdrawDetails />} />

					<Route path='/my-teams' element={<MyTeams />} />

					<Route path='/support' element={<Support />} />

					<Route path='/shares' element={<Shares />} />
					<Route path='/my-card' element={<MyShareCard />} />

					<Route path='/more' element={<More />} />

					<Route path='/assets' element={<Assets />} />
					<Route path='/exchange' element={<Trade />} />
					<Route path='/mining' element={<Mining />} />
					<Route path='/receive' element={<Receive />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/security' element={<Security />} />
				</Route>
				{/* Not Found Page */}

				<Route path='/not-access' element={<NotAccess />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
			<ToastContainer />
		</>
	);
};

export default App;
