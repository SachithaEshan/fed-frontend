import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
//import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSelector } from "react-redux";


function navbar(props){
    
    const cart = useSelector((state) => state.cart.value);
    const savedItems = useSelector((state) => state.savedItems.value);

    const getCartQuantity = () => {
      let count = 0;
      cart.forEach((item) => {
        count += item.quantity;
      });
      return count;
    };

    return(
        <>
        <nav className="flex justify-between items-center p-8 mx-4">
            <div className="flex gap-x-16">
                <Link className="text-3xl font-semibold" to="/">Mebius</Link>
            
            <div className="flex gap-4 items-center">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            </div>
            </div>
            <div className="flex gap-4 items-center">
                <div>
                    <Link to="shop/cart" className="flex relative gap-4 items-center">
                    <p className="text-lg">{getCartQuantity()}</p>
                    <div className="flex gap-2 items-center">
                        <ShoppingCart/>
                        Cart
                    </div>
                    </Link>
                </div>
                <div>
                    <Link to="/saved" className="flex relative gap-4 items-center">
                    <p className="text-lg">{savedItems.length}</p>
                    <div className="flex gap-2 items-center">
                        <Heart/>
                        Saved
                    </div>
                    </Link>
                </div>
                <SignedOut>
                   <div className="flex gap-4 items-center">
                   <Link to="/sign-in" className="text-primary">
                       Sign In
                    </Link>
                    <Link to="/sign-up" className="text-primary">
                     Sign Up
                   </Link>
                 </div>
                </SignedOut>

                <SignedIn>
                 <UserButton/>
                 <Link to="/account">Account</Link>
                </SignedIn>

                
        
      </div>
              {/* <Avatar>
             <AvatarImage src />
                <AvatarFallback>{props.alter}</AvatarFallback>
            </Avatar> */}

            
        </nav>

        </>

    );
}

export default navbar;

















