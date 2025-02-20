import { Card } from "@/components/ui/card";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { removeItem, incrementQuantity, decrementQuantity } from "@/lib/features/cartSlice";

export default function CartItem() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.value);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number.parseFloat(item.product.price) * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-[60vh] flex flex-col items-center justify-center">
        <ShoppingCart className="mb-4 w-16 h-16 text-gray-400" />
        <h2 className="mb-4 text-2xl font-semibold text-gray-600">Your cart is empty</h2>
        <Button asChild>
          <Link to="/shop">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container px-4 py-6 mx-auto min-h-screen md:py-8 lg:py-12">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="flex gap-2 items-center text-2xl font-bold md:text-3xl">
          <ShoppingCart className="w-6 h-6 md:h-8 md:w-8" />
          Your Cart
          <span className="text-base font-normal text-gray-500 md:text-lg">
            ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
          </span>
        </h1>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
        {/* Cart Items List */}
        <div className="space-y-4 lg:col-span-8">
          {cartItems.map((item) => (
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
                    <div className="flex-1">
                      <h3 className="mb-2 text-lg font-semibold md:text-xl">
                        {item.product.name}
                      </h3>
                      <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                        {item.product.description}
                      </p>
                    </div>

                    {/* Price and Quantity Controls */}
                    <div className="flex flex-wrap gap-4 justify-between items-center">
                      <div className="flex gap-4 items-center">
                        <span className="text-lg font-semibold">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500">
                          (${item.product.price} each)
                        </span>
                      </div>

                      <div className="flex gap-3 items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => dispatch(decrementQuantity(item.product._id))}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 font-medium text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => dispatch(incrementQuantity(item.product._id))}
                          className="w-8 h-8"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end px-4 py-3 bg-gray-50">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => dispatch(removeItem(item.product._id))}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="mr-2 w-4 h-4" />
                  Remove
                </Button>
              </CardFooter>
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
                <Button className="w-full" size="lg" asChild>
                  <Link to="/shop/checkout">Proceed to Checkout</Link>
                </Button>
                <Button
                  variant="outline"
                  className="mt-2 w-full"
                  size="lg"
                  asChild
                >
                  <Link to="/shop">Continue Shopping</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
    
   