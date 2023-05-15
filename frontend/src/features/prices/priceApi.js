import { apiSlice } from '../api/apiSlice';
import { setPrices, setCurrentPrice, setLastPrice } from './priceSlice';

export const priceApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get prices
		getPrices: builder.query({
			query: () => '/prices',
			providesTags: ['Prices'],

			async onQueryStarted({ dispatch, queryFulfilled }) {
				const result = await queryFulfilled;
				dispatch(setPrices(result.data.pxcPrices));
				dispatch(setCurrentPrice(result.data.currentPrice));
				dispatch(setLastPrice(result.data.lastPrice));
			},
		}),
		// cerate new price
		createPrice: builder.mutation({
			query: (body) => ({
				url: '/create-price',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Prices'],
		}),
	}),
});

export const { useGetPricesQuery, useCreatePriceMutation } = priceApi;
