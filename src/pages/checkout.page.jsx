import{ Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useCreateOrderMutation } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import {useUser} from "@clerk/clerk-react";
import ShippingAddressForm from "@/components/ShippingAddressForm";



function checkoutPage() {

    const cart = useSelector((state) => state.cart.value);
    const [createOrder, {isLoading,isError,data}] = useCreateOrderMutation();
    console.log(cart);

    const navigate = useNavigate();
    //const {isLoaded : isAuthLoaded, isSignedIn, user} = useUser();

    // if (!isAuthLoaded) {
    //     return null;
    // }
    // console.log(user);

    return(
        <main className="px-8">
            <h2 className="text-4xl font-bold">Checkout Page</h2>
            <div>
                {cart.map((item,index)=>(
                    <div key={index}>
                        <p>{item.product.name}</p>
                        <p>{item.product.price}</p>
                        <p>{item.quantity}</p>
                    </div>    
                ))}

            </div>
            <div className="mt-4">
                <h1 className="text-3xl font-semibold">Enter Shipping Address</h1>
                <ShippingAddressForm cart={cart}/>
            </div>

            {/* <div className="mt-4">
            <Button type="button" onClick={() => {
                createOrder({
                    items:cart,
                    
                });
                
                navigate("/shop/payment")
            }}> 
            Proceed Payment
            </Button>
            </div> */}
        </main>
    );
}

export default checkoutPage;