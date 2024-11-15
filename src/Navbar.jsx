
import { ShoppingCart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


function navbar(props){
    

    return(
        <>
        <nav className="flex items-center justify-between p-8 mx-4">
            <div className="flex gap-x-16">
                <a className="font-semibold text-3xl" to="/home">Mebius</a>
            
            <div className="flex items-center gap-4">
                <a to="/home">Home</a>
                <a to="/shop">Shop</a>
            </div>
            </div>
            <div className="flex items-center gap-4">
                <div>
                    <a href="/cart" className="items-center gap-4 relative flex">
                    <p className="text-lg">{props.cartCount}</p>
                    <div className="items-center gap-2 flex">
                        <ShoppingCart/>
                        Cart
                    </div>
                    </a>
                </div>
                {props.name ?(
                 <p>Hi,{props.name}!</p>
                ):(
                    <div>
                        <a href="/signin">Sign In</a> | <a href="/signup">Sign Up</a> 
                    </div>
                )
                  
              }
              <Avatar>
             <AvatarImage src />
                <AvatarFallback>{props.alter}</AvatarFallback>
            </Avatar>

            </div>
        </nav>

        </>

    );
}

export default navbar;

















