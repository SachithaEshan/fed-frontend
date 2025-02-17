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
export const Api = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fed-storefront-backend-sachitha.onrender.com/api/",
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
      query: (body) => ({
        url: `orders`,
        method: "POST",
        body,
      }),
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