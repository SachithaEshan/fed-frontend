//import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
//import App from './App.jsx';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import HomePage from "./pages/home/home.page";
import SignInPage from "./pages/sign-in.page";
import SignUpPage from "./pages/sign-up.page";
import CartPage from "./pages/cart.page";
import RootLayout from './layouts/rootLayout/root.layout';
import AccountPage from './pages/account.page';
import CheckoutPage from './pages/checkout.page';
import PaymentPage from './pages/payment.page';
import CompletePage from './pages/complete.page';
import AdminProductCreatePage from './pages/admin.product.create.page';
import SavedItemsPage from './pages/saved.items.page';
import Protected from "@/layouts/Protected";
import AdminProtected from "@/layouts/AdminProtected";
import MainLayout from "./layouts/main.layout";
import ShopPage from "./pages/shop/Shop";
import ProductDetails from "./pages/shop/product/ProductDetails";
import OrdersPage from "./pages/orders.page";
//import AdminProductsPage from "./pages/admin.products.page";
import AdminProductEditPage from "./pages/admin.product.edit.page";
import AdminDashboardPage from "./pages/admin.dashboard.page";
import AdminCategoriesPage from "./pages/admin.categories.page";

import { store } from "@/lib/store";
import { Provider } from "react-redux";
import { ClerkProvider } from '@clerk/clerk-react'


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

// createRoot(document.getElementById('root')).render(
//   //<StrictMode>
//     {/* {App()} */}
//   <Provider store={store}>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/sign-in" element={<SignInPage />} />
//         <Route path="/sign-up" element={<SignUpPage />} />
//       </Routes>
//     </BrowserRouter>
//   </Provider>
//   //</StrictMode>,
// );

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
        <Routes>
            <Route element={<RootLayout />}>
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                {/* The Protected layout can be used to wrap routes that needs to be logged in to access */}
                <Route element={<Protected />}>
                  <Route path="/saved" element={<SavedItemsPage />} />
                  <Route path="/shop/cart" element={<CartPage />} />
                  <Route path="/shop/checkout" element={<CheckoutPage />} />
                  <Route path="/shop/payment" element={<PaymentPage />} />
                  <Route path="/shop/complete/:orderId" element={<CompletePage />} />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/orders" element={<OrdersPage />} />

                  {/* The AdminProtected layout can be used to wrap routes that needs to be logged in as admin to access */}
                  <Route element={<AdminProtected />}>
                    <Route
                      path="/admin/products/create"
                      element={<AdminProductCreatePage />}
                    />
                    <Route path="/admin" element={<AdminDashboardPage />} />
                     {/* <Route path="admin/products" element={<AdminProductsPage />} /> */}
                     <Route path="admin/products/edit/:id" element={<AdminProductEditPage />} />
                     <Route path="/admin/categories" element={<AdminCategoriesPage />} />
                  </Route>
                </Route>
              </Route>
            </Route>

            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/:productId" element={<ProductDetails />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </ClerkProvider>
);