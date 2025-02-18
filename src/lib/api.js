// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
// export const Api = createApi({
//   reducerPath: "Api",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/Api/" }),
//   prepareHeaders: async (headers, { getState }) => {
//     const token = await window.Clerk.session.getToken();
//     console.log(token);

//     if (token) {
//       headers.set("Authorization", `Bearer ${token}`);
//     }

//     return headers;
//   },
const BASE_URL = 'https://fed-storefront-backend-sachitha.onrender.com/Api';

export const Api = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers, { getState }) => {
      const token = await window.Clerk?.session?.getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),


  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `products`,
    }),
    getCategories: builder.query({
      query: () => `categories`,
    }),
    getOrder: builder.query({
      query: (id) =>`orders/${id}`,
    }),
    createOrder: builder.mutation({
      query: (orderData) => {
        // Log the order data for debugging
        console.log('Sending order data:', orderData);

        const formattedOrder = {
          items: orderData.items.map(item => ({
            product: {
              _id: item.product._id,
              name: item.product.name,
              price: Number(item.product.price),
              image: item.product.image,
              description: item.product.description
            },
            quantity: item.quantity
          })),
          shippingAddress: orderData.shippingAddress
        };

        return {
          url: 'orders',
          method: 'POST',
          body: formattedOrder,
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        };
      },
      // Add better error handling
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log('Order created successfully:', data);
          return data;
        } catch (error) {
          console.error('Detailed error:', error);
          throw error;
        }
      }
    }),
    saveFavoriteItem: builder.mutation({
      query: (productData) => ({
        url: 'favorites',
        method: 'POST',
        body: productData
      }),
    }),
    removeFavoriteItem: builder.mutation({
      query: (productId) => ({
        url: `favorites/${productId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useCreateOrderMutation,
  useGetOrderQuery,
} = Api;