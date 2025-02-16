//import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
//import App from './App.jsx';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/home.page";
import SignInPage from "./pages/sign-in.page";
import SignUpPage from "./pages/sign-up.page";
import CartPage from "./pages/cart.page";
import RootLayout from './layouts/root.layout';
import AccountPage from './pages/account.page';
import CheckoutPage from './pages/checkout.page';
import PaymentPage from './pages/payment.page';
import CompletePage from './pages/complete.page';
import AdminProductCreatePage from './pages/admin.product.create.page';
import SavedItemsPage from './pages/saved.items.page';

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

createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop/cart" element={<CartPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/shop/checkout" element={<CheckoutPage />} />
            <Route path="/shop/payment" element={<PaymentPage />} />
            <Route path="/shop/complete" element={<CompletePage />} />
            <Route path="/admin/products/create" element={<AdminProductCreatePage />} />
            <Route path="/saved" element={<SavedItemsPage />} />
          </Route>

          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </ClerkProvider>
);