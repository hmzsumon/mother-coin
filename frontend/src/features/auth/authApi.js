import { apiSlice } from '../api/apiSlice';
import { setUser, logoutUser } from '../auth/authSlice';

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// Register a user
		register: builder.mutation({
			query: ({ body, referrerCode }) => ({
				url: `/register?referral_id=${referrerCode}`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Users', 'User'],
		}),

		// register with referrer code
		registerWithReferrer: builder.mutation({
			query: ({ body, referrerCode }) => ({
				url: `/register?referral_id=${referrerCode}`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Users', 'User'],
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const result = await queryFulfilled;
					dispatch(setUser(result.data.user));
				} catch (error) {
					console.log(error);
				}
			},
		}),

		// Login a user
		login: builder.mutation({
			query: (body) => ({
				url: '/login',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Users', 'User'],
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const result = await queryFulfilled;
					dispatch(setUser(result.data.user));
				} catch (error) {
					console.log(error);
				}
			},
		}),

		// Logout a user
		logout: builder.mutation({
			query: () => ({
				url: '/logout',
				method: 'PUT',
			}),
			invalidatesTags: ['Users', 'User'],
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(logoutUser());
				} catch (error) {
					console.log(error);
				}
			},
		}),

		// load user
		loadUser: builder.query({
			query: () => '/load-user',
			providesTags: ['Users', 'User'],
			async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
				try {
					const result = await cacheDataLoaded;
					dispatch(setUser(result.data.user));
				} catch (error) {
					console.log(error);
				}
			},
		}),

		// verify email
		verifyEmail: builder.mutation({
			query: (body) => ({
				url: '/verify-email/with-code',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Users', 'User'],
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const result = await queryFulfilled;
					dispatch(setUser(result.data.user));
				} catch (error) {
					console.log(error);
				}
			},
		}),

		// resend email verification
		resendEmailVerification: builder.mutation({
			query: (email) => ({
				url: `/resend-email-verification-code?email=${email}`,
				method: 'POST',
			}),
		}),

		// forgot password
		forgotPassword: builder.mutation({
			query: (body) => ({
				url: '/forgot-password',
				method: 'POST',
				body,
			}),

			invalidatesTags: ['Users', 'User'],
		}),

		// reset password
		resetPassword: builder.mutation({
			query: (body) => ({
				url: `/password/reset`,
				method: 'POST',
				body,
			}),
		}),

		// update password
		updatePassword: builder.mutation({
			query: (body) => ({
				url: '/password/update',
				method: 'PUT',
				body,
			}),

			invalidatesTags: ['Users', 'User'],
		}),

		// admin login
		adminLogin: builder.mutation({
			query: (body) => ({
				url: '/admin/login',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Users', 'User'],
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(logoutUser());
				} catch (error) {
					console.log(error);
				}
			},
		}),

		// new convert
		newConvert: builder.mutation({
			query: (body) => ({
				url: '/new-convert',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Users', 'User'],
		}),

		// get user by phone
		getUserByPhone: builder.query({
			query: (address) => ({
				url: `/user?address=${address}`,
				method: 'GET',
			}),
			providesTags: ['Users', 'User'],
		}),

		// send money
		sendMoney: builder.mutation({
			query: (body) => ({
				url: '/send-money',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Users', 'User'],
		}),

		// get members
		getMembers: builder.query({
			query: () => ({
				url: '/members',
				method: 'GET',
			}),
			providesTags: ['Users', 'User'],
		}),

		// get all users
		getAllUsers: builder.query({
			query: () => ({
				url: '/all-user',
				method: 'GET',
			}),
			providesTags: ['Users', 'User'],
		}),

		// get single user by id
		getSingleUserAdmin: builder.query({
			query: (id) => ({
				url: `/single-user-admin/${id}`,
				method: 'GET',
			}),
			providesTags: ['Users', 'User'],
		}),

		// find user by address
		findUserByAddress: builder.query({
			query: (address) => ({
				url: `/find-user-by-mother-coin-address?address=${address}`,
				method: 'GET',
			}),
			providesTags: ['Users', 'User'],
		}),

		// send mother coin
		sendMotherCoin: builder.mutation({
			query: (body) => ({
				url: '/send/mc',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Users', 'User'],
		}),

		// send musd
		sendMusd: builder.mutation({
			query: (body) => ({
				url: '/send/musd',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Users', 'User'],
		}),

		// update address
		updateAddress: builder.mutation({
			query: (body) => ({
				url: '/update-address',
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['Users', 'User'],
		}),
	}),
});

export const {
	useRegisterMutation,
	useLoginMutation,
	useLogoutMutation,
	useLoadUserQuery,
	useRegisterWithReferrerMutation,
	useVerifyEmailMutation,
	useResendEmailVerificationMutation,
	useForgotPasswordMutation,
	useResetPasswordMutation,
	useUpdatePasswordMutation,
	useAdminLoginMutation,
	useNewConvertMutation,
	useGetUserByPhoneQuery,
	useSendMoneyMutation,
	useGetMembersQuery,
	useGetAllUsersQuery,
	useGetSingleUserAdminQuery,
	useFindUserByAddressQuery,
	useSendMotherCoinMutation,
	useSendMusdMutation,
	useUpdateAddressMutation,
} = authApi;
