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
        const formattedOrder = {
          items: orderData.items.map(item => ({
            productId: item.product._id,
            quantity: item.quantity,
            price: parseFloat(item.product.price)
          })),
          shippingAddress: orderData.address, // Changed from address to shippingAddress
        };

        return {
          url: `orders`,
          method: "POST",
          body: formattedOrder,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          credentials: 'include'
        };
      },
      async onQueryStarted(args, { queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          console.log('Order created successfully:', response);
        } catch (error) {
          console.error('Order creation failed:', error);
          throw new Error('Failed to create order');
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