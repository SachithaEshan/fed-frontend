import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { clearCart } from "@/lib/features/cartSlice";
import { toast } from "sonner";
//import CartItem from "@/components/CartItem";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function PaymentPage() {
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  if (cart.length === 0) {
    return <Navigate to="/" />;
  }

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const totalPrice = subtotal + tax;

  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Title */}
      <h2 className="mb-6 text-3xl font-bold text-center">Review Your Order</h2>

      {/* Grid Layout */}
      <div className="grid gap-8 md:grid-cols-3">
        {/* Order Items Section */}
        <div className="md:col-span-2">
          <div className="grid gap-4 md:grid-cols-2">
            {cart.map((item, index) => (
              <Card key={index} className="shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.product.image} // Ensure image exists in your data
                      alt={item.product.name}
                      className="object-cover w-20 h-20 rounded-lg"
                    />
                    <div>
                      <p className="text-lg font-semibold">{item.product.name}</p>
                      <p className="text-gray-600">${totalPrice.toFixed(2)}</p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Order Summary Section */}
        <div>
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Items</span>
                  <span>{cart.length}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Price</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => {
                  dispatch(clearCart());
                  toast.success("Order Placed Successfully");
                }}
              >
                Proceed to Payment
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
