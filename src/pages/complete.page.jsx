import { useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
//import Navigation from "@/components/Navigation";

function CompletePage() {
  const { orderId } = useParams();
  const { getToken } = useAuth();
  
  console.log('Current orderId from params:', orderId);

  // Redirect if no orderId
  if (!orderId) {
    return <Navigate to="/" replace />;
  }

  const { data: order, isLoading, error } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      try {
        const token = await getToken();
        console.log('Fetching order with ID:', orderId);
        
        const response = await fetch(`https://fed-storefront-backend-sachitha.onrender.com/Api/orders/${orderId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `Failed to fetch order: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response data:', data);
        
        if (!data || !data.items || !Array.isArray(data.items)) {
          throw new Error('Invalid order data structure');
        }
        return data;
      } catch (error) {
        console.error('Error in query function:', error);
        throw error;
      }
    },
    enabled: !!orderId,
    retry: 1
  });

  if (isLoading) {
    return (
      <>
        {/* <Navigation /> */}
        <div className="container px-4 py-8 mx-auto">
          <div className="animate-pulse">
            <div className="mb-4 w-1/4 h-8 bg-gray-200 rounded"></div>
            <div className="space-y-3">
              <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
              <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error || !order) {
    return (
      <>
        {/* <Navigation /> */}
        <div className="container px-4 py-8 mx-auto">
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-red-600">
              {error?.message || "Could not load order details. Please try again later."}
            </p>
          </div>
        </div>
      </>
    );
  }

  // Safely render order details only if we have valid data
  return (
    <>
      {/* <Navigation /> */}
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-8 text-3xl font-bold">Order Complete</h1>
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-xl font-semibold">Order Details</h2>
          <div className="space-y-4">
            <p>Order ID: {order._id}</p>
            {order.items && Array.isArray(order.items) && (
              <div className="pt-4 border-t">
                <h3 className="mb-2 font-medium">Items:</h3>
                {order.items.map((item) => (
                  <div key={item.product?._id} className="flex justify-between py-2">
                    <span>{item.product?.name} x {item.quantity}</span>
                    <span>${((item.product?.price || 0) * (item.quantity || 0)).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}
            {order.shippingAddress && (
              <div className="pt-4 border-t">
                <h3 className="mb-2 font-medium">Shipping Address:</h3>
                <p>{order.shippingAddress.line_1}</p>
                {order.shippingAddress.line_2 && <p>{order.shippingAddress.line_2}</p>}
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip_code}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CompletePage;