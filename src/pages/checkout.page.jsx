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
//             <div className="grid grid-cols-4 mt-2 gap-x-4">
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
//             <div className="w-1/2 mt-2">
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
    <div className="container px-4 py-8 mx-auto">
      {/* Title */}
      <h1 className="flex items-center mb-8 text-3xl font-bold">
        <ShoppingCart className="mr-2" />
        Checkout
      </h1>

      {/* Grid Layout: Cart Items & Order Summary */}
      <div className="grid gap-8 md:grid-cols-3">
        {/* Cart Items Section */}
        <div className="md:col-span-2">
          <div className="grid gap-4 md:grid-cols-2">
            {cart.map((item) => (
              <Card key={item.product._id} className="mb-4">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center">
                    {/* Product Image */}
                    <div className="relative w-32 h-32 overflow-hidden rounded-lg">
                      <img
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {/* Product Name, Price & Quantity */}
                    <div className="mt-4 text-center">
                      <h2 className="text-lg font-semibold">{item.product.name}</h2>
                      <p className="font-bold">${item.product.price}</p>
                      <p>Qty: {item.quantity}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Order Summary Section */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {/* <Button className="w-full" onClick={() => navigate("/shop/payment")}>
                Proceed to Payment
              </Button> */}
            </CardFooter>
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


