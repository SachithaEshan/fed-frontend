import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

function OrdersPage() {
  const { getToken } = useAuth();

  const { data: orders, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const token = await getToken();
      const response = await fetch("https://fed-storefront-backend-sachitha.onrender.com/Api/orders/my-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-6 text-3xl font-bold">My Orders</h1>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="w-1/4 h-6 bg-gray-200 rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                  <div className="w-1/3 h-4 bg-gray-200 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <p className="text-red-500">Error loading orders: {error.message}</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    const colors = {
      PENDING: "bg-yellow-100 text-yellow-800",
      CONFIRMED: "bg-blue-100 text-blue-800",
      SHIPPED: "bg-purple-100 text-purple-800",
      DELIVERED: "bg-green-100 text-green-800",
      CANCELLED: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">My Orders</h1>
      
      {orders?.length === 0 ? (
        <p className="py-8 text-center text-gray-500">No orders found</p>
      ) : (
        <div className="space-y-4">
          {orders?.map((order) => (
            <Card key={order._id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Order #{order._id}</CardTitle>
                  <Badge className={getStatusColor(order.orderStatus)}>
                    {order.orderStatus}
                  </Badge>
                </div>
               <p className="text-sm text-gray-500">
                   Placed on {order.createdAt ? format(new Date(order.createdAt), 'PPP') : "Unknown Date"}
                </p>
                {/* console.log(orders); */}
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {/* Order Items */}
                  <div>
                    <h3 className="mb-2 font-semibold">Items</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex gap-4">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="object-cover w-20 h-20 rounded"
                          />
                          <div>
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-gray-500">
                              Quantity: {item.quantity}
                            </p>
                            <p className="text-sm font-medium">
                              ${item.product.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Shipping Address */}
                  <div>
                    <h3 className="mb-2 font-semibold">Shipping Address</h3>
                    <div className="text-sm text-gray-600">
                      {order.addressId ? (
                        <>
                          <p>{order.addressId.line_1}</p>
                          <p>{order.addressId.line_2}</p>
                          <p>{order.addressId.city}, {order.addressId.state} {order.addressId.zip_code}</p>
                          <p>{order.addressId.phone}</p>
                        </>
                      ) : (
                        <p>No shipping address available</p>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Order Total */}
                  <div className="flex justify-between items-center font-medium">
                    <span>Total</span>
                    <span>
                      ${order.items.reduce(
                        (sum, item) => sum + item.product.price * item.quantity,
                        0
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
    //to check addressId
    
  );
}

export default OrdersPage; 