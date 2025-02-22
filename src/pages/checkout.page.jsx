// import{ Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { useSelector } from "react-redux";
// import { useCreateOrderMutation } from "@/lib/api";
// import { useNavigate } from "react-router-dom";
// import {useUser} from "@clerk/clerk-react";
// import ShippingAddressForm from "@/components/ShippingAddressForm";
// import CartItem from "@/components/CartItem";
// import {Navigate} from "react-router-dom";

// function checkoutPage() {

//     const cart = useSelector((state) => state.cart.value);
//     const [createOrder, {isLoading,isError,data}] = useCreateOrderMutation();
//     console.log(cart);

//     const navigate = useNavigate();
//     //const {isLoaded : isAuthLoaded, isSignedIn, user} = useUser();

//     // if (!isAuthLoaded) {
//     //     return null;
//     // }
//     // console.log(user);

//     if (cart.length === 0) {
//         return <Navigate to="/" />;
//       }

//     // return(
//     //     <main className="px-8">
//     //         <h2 className="text-4xl font-bold">Checkout Page</h2>
//     //         <div>
//     //             {cart.map((item,index)=>(
//     //                 <div key={index}>
//     //                     <p>{item.product.name}</p>
//     //                     <p>{item.product.price}</p>
//     //                     <p>{item.quantity}</p>
//     //                 </div>    
//     //             ))}

//     //         </div>
//     //         <div className="mt-4">
//     //             <h1 className="text-3xl font-semibold">Enter Shipping Address</h1>
//     //             <ShippingAddressForm cart={cart}/>
//     //         </div>

//             {/* <div className="mt-4">
//             <Button type="button" onClick={() => {
//                 createOrder({
//                     items:cart,
                    
//                 });
                
//                 navigate("/shop/payment")
//             }}> 
//             Proceed Payment
//             </Button>
//             </div> old one */}
//     //    
    
//     return (
//         <main className="px-8">
//           <h2 className="text-4xl font-bold">Checkout Page</h2>
//           <div className="mt-4">
//             <h3 className="text-3xl font-semibold">Order Details</h3>
//             <div className="grid grid-cols-4 gap-x-4 mt-2">
//             <div>
//                 {cart.map((item,index)=>(
//                     <div key={index}>
//                         <p>{item.product.name}</p>
//                         <p>{item.product.price}</p>
//                         <p>{item.quantity}</p>
//                     </div>    
//                 ))}

//             </div>
//             </div>
//           </div>
//           <div className="mt-4">
//             <h3 className="text-3xl font-semibold">Enter Shipping Address</h3>
//             <div className="mt-2 w-1/2">
//               <ShippingAddressForm cart={cart} />
//             </div>
//           </div>
//         </main>
//       );
// }

// export default checkoutPage;

import { Link, useNavigate, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useCreateOrderMutation } from "@/lib/api";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart } from "lucide-react";
import ShippingAddressForm from "@/components/ShippingAddressForm";

export default function CheckoutPage() {
  const cart = useSelector((state) => state.cart.value);
  const [createOrder, { isLoading, isError, data }] = useCreateOrderMutation();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return <Navigate to="/" />;
  }

  // Calculate subtotal, tax, and total
  const subtotal = cart.reduce((acc, item) => acc + Number(item.product.price) * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <div className="container px-4 py-6 mx-auto min-h-screen md:py-8 lg:py-12">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="flex gap-2 items-center text-2xl font-bold md:text-3xl">
          <ShoppingCart className="w-6 h-6 md:h-8 md:w-8" />
          Checkout
        </h1>
      </div>

      {/* Layout */}
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
        {/* Cart Items */}
        <div className="space-y-4 lg:col-span-8">
          {cart.map((item) => (
            <Card key={item.product._id} className="overflow-hidden">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                  {/* Product Image */}
                  <div className="overflow-hidden relative w-full bg-gray-100 rounded-md sm:w-32 md:w-40 aspect-square">
                    <img
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-col flex-1">
                    <h3 className="mb-2 text-lg font-semibold md:text-xl">
                      {item.product.name}
                    </h3>
                    <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                      {item.product.description}
                    </p>
                    <div className="flex gap-4 items-center">
                      <span className="text-lg font-semibold">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500">
                        (${item.product.price} each)
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm md:text-base">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm md:text-base">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-base font-bold md:text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-4">
                {/* <Button className="w-full" size="lg" onClick={() => navigate("/shop/payment")}>Proceed to Payment</Button> */}
                <Button variant="outline" className="mt-2 w-full" size="lg" asChild>
                  <Link to="/shop">Continue Shopping</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Shipping Address Section */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <ShippingAddressForm cart={cart} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}



