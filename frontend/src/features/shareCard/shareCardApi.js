import { apiSlice } from '../api/apiSlice';

export const shareCardApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get share cards
		getShareCards: builder.query({
			query: (limit) => `/share/cards?limit=${limit}`,
			providesTags: (result) => [...(result?.shareCard?.tags ?? ['ShareCard'])],
		}),

		// buy share card
		buyShareCard: builder.mutation({
			query: (cardId) => ({
				url: `/share/card-buy/${cardId}`,
				method: 'POST',
			}),
			invalidatesTags: (result) => [
				...(result?.shareCard?.tags ?? ['ShareCard']),
			],
		}),

		// get share details
		getShareDetails: builder.query({
			query: () => `/share/card-details`,
			providesTags: (result) => [...(result?.shareCard?.tags ?? ['ShareCard'])],
		}),
	}),
});

export const {
	useGetShareCardsQuery,
	useBuyShareCardMutation,
	useGetShareDetailsQuery,
} = shareCardApi;
