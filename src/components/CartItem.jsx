import { Card } from "@/components/ui/card";
import { useSelector , useDispatch} from "react-redux";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react"
//import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom";
import { removeItem, incrementQuantity, decrementQuantity } from "@/lib/features/cartSlice";


//function CartItem({ item }) {
//   return (
//     <Card className="p-4">
//       <div className="flex items-center space-x-4">
//         <img
//           src={item.product.image || "/placeholder.svg"}
//           alt={item.product.name}
//           className="object-cover w-16 h-16 rounded"
//         />
//         <div className="flex-1">
//           <p className="font-medium">{item.product.name}</p>
//           <p className="text-muted-foreground">${item.product.price}</p>
//           <p className="text-sm">Quantity: {item.quantity}</p>
//         </div>
//       </div>
//     </Card>
//   );


 
//}

//export default CartItem;

// my old code 

        
        export default function CartItem() {
          const dispatch = useDispatch(); 
          const cartItems = useSelector((state) => state.cart.value);
          const subtotal = cartItems.reduce((acc, item) => acc + Number.parseFloat(item.product.price) * item.quantity, 0);
          const tax = subtotal * 0.1; // Assuming 10% tax
          const total = subtotal + tax;
        //   const cart = useSelector((state)=>state.cart.value);
            //console.log(cart);
        
          return (
            <div className="container px-4 py-8 mx-auto">
              <h1 className="flex items-center mb-8 text-3xl font-bold">
                <ShoppingCart className="mr-2" />
                Your Cart
              </h1>
              <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-2">
                  {cartItems.map((item) => (
                    <Card key={item.product._id} className="mb-4">
                      <CardContent className="p-4">
                        <div className="flex items-center">
                          <div className="overflow-hidden relative mr-4 w-24 h-24 rounded-lg">
                            <img
                              src={item.product.image || "/placeholder.svg"}
                              alt={item.product.name}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="flex-grow">
                            <h2 className="text-xl font-semibold">{item.product.name}</h2>
                            <p className="mt-1 text-sm text-gray-500">{item.product.description}</p>
                            <div className="flex justify-between items-center mt-2">
                              <p className="font-bold">${item.product.price}</p>
                              <div className="flex gap-2 items-center">
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  onClick={() => dispatch(decrementQuantity(item.product._id))}
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="w-4 h-4" />
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  onClick={() => dispatch(incrementQuantity(item.product._id))}
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end p-4">
                    <Button variant="outline" size="sm" onClick={() => dispatch(removeItem(item.product._id))}>
                      <Trash2 className="mr-2 w-4 h-4" />
                      Remove
                    </Button>
                  </CardFooter>
                </Card>
                  ))}
                </div>
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
                      <Button className="w-full" asChild >
                      <Link to="/shop/checkout">Proceed to Checkout </Link> 
                      </Button>
                      
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </div>
          );
        }
    
    
   