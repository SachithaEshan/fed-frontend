import { useSelector , useDispatch} from "react-redux";
import { ShoppingCart, Trash2 } from "lucide-react"
//import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom";
import { removeItem } from "@/lib/features/cartSlice";
import CartItem from "@/components/CartItem";


  function CartPage( ) {

//     const cart = useSelector((state)=>state.cart.value);
//     console.log(cart);
    
    // const cartItems = [
    //   {
    //     product: {
    //       _id: "67a713dacc4fef252063aa0f",
    //       name: "Bose QuiteComfort",
    //       price: "249.00",
    //       image: "/assets/products/quietcomfort.png",
    //       description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
    //     },
    //     quantity: 1,
    //   },
    // ];
    
    // export default function CartPage() {
    //   const dispatch = useDispatch(); 
    //   const cartItems = useSelector((state) => state.cart.value);
    //   const subtotal = cartItems.reduce((acc, item) => acc + Number.parseFloat(item.product.price) * item.quantity, 0);
    //   const tax = subtotal * 0.1; // Assuming 10% tax
    //   const total = subtotal + tax;
    // //   const cart = useSelector((state)=>state.cart.value);
    //     //console.log(cart);
    
    //   return (
    //     <div className="container px-4 py-8 mx-auto">
    //       <h1 className="flex items-center mb-8 text-3xl font-bold">
    //         <ShoppingCart className="mr-2" />
    //         Your Cart
    //       </h1>
    //       <div className="grid gap-8 md:grid-cols-3">
    //         <div className="md:col-span-2">
    //           {cartItems.map((item) => (
    //             <Card key={item.product._id} className="mb-4">
    //               <CardContent className="p-4">
    //                 <div className="flex items-center">
    //                   <div className="overflow-hidden relative mr-4 w-24 h-24 rounded-lg">
    //                     <img
    //                       src={item.product.image || "/placeholder.svg"}
    //                       alt={item.product.name}
    //                       className="object-cover w-full h-full"
    //                     />
    //                   </div>
    //                   <div className="flex-grow">
    //                     <h2 className="text-xl font-semibold">{item.product.name}</h2>
    //                     <p className="mt-1 text-sm text-gray-500">{item.product.description}</p>
    //                     <div className="flex justify-between items-center mt-2">
    //                       <p className="font-bold">${item.product.price}</p>
    //                       <p>Quantity: {item.quantity}</p>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </CardContent>
    //               <CardFooter className="flex justify-end p-4">
    //             <Button variant="outline" size="sm" onClick={() => dispatch(removeItem(item.product._id))}>
    //               <Trash2 className="mr-2 w-4 h-4" />
    //               Remove
    //             </Button>
    //           </CardFooter>
    //         </Card>
    //           ))}
    //         </div>
    //         <div>
    //           <Card>
    //             <CardHeader>
    //               <CardTitle>Order Summary</CardTitle>
    //             </CardHeader>
    //             <CardContent>
    //               <div className="space-y-2">
    //                 <div className="flex justify-between">
    //                   <span>Subtotal</span>
    //                   <span>${subtotal.toFixed(2)}</span>
    //                 </div>
    //                 <div className="flex justify-between">
    //                   <span>Tax</span>
    //                   <span>${tax.toFixed(2)}</span>
    //                 </div>
    //                 <Separator className="my-2" />
    //                 <div className="flex justify-between font-bold">
    //                   <span>Total</span>
    //                   <span>${total.toFixed(2)}</span>
    //                 </div>
    //               </div>
    //             </CardContent>
    //             <CardFooter>
    //               <Button className="w-full" asChild >
    //               <Link to="/shop/checkout">Proceed to Checkout </Link> 
    //               </Button>
                  
    //             </CardFooter>
    //           </Card>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // }
    
    const cart = useSelector((state) => state.cart.value);

  return (
  //   <main className="px-8">
  //     <h2 className="text-4xl font-bold">My Cart</h2>
  //     <div className="grid grid-cols-2 gap-x-4 mt-4 w-1/2">
  //       {cart.map((item, index) => (
  //         <CartItem key={index} item={item} />
  //       ))}
  //     </div>

  //     <div className="mt-4">
  //       {cart.length > 0 ? (
  //         <Button asChild>
  //           <Link to="/shop/checkout">Proceed to Checkout</Link>
  //         </Button>
  //       ) : (
  //         <p>No items in cart</p>
  //       )}
  //     </div>
  //   </main>
  <main>
    <CartItem/>
  </main>
    );
}

export default CartPage;

    // return( <main className="px-8">
    //     <h2 className="text-4xl font-bold">My Cart</h2>
    //     <div>
    //         {JSON.stringify(cart)}
    //     </div>
    // </main>);
    
//}

