// import { ShoppingCart } from "lucide-react";
// import { Link } from "react-router-dom";

// import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
// import { useSelector } from "react-redux";


// function Navigation(props) {

//   const cart = useSelector((state) => state.cart.value);

//   const getCartQuantity = () => {
//     let count = 0;
//     cart.forEach((item) => {
//       count += item.quantity;
//     });
//     return count;
//   };

//   return (
//     <nav className="flex justify-between items-center px-8 py-8">
//       <div className="flex gap-x-16">
//         <Link className="text-3xl font-semibold" to="/">
//           Mebius
//         </Link>
//         <div className="flex gap-4 items-center">
//           <Link to="/">Home</Link>
//           <Link to="/shop">Shop</Link>
//         </div>
//       </div>
//       <div className="flex gap-4 items-center">
//         <div>
//           <Link to="/shop/cart" className="flex relative gap-4 items-center">
//             <p className="text-lg">{getCartQuantity()}</p>
//             <div className="flex gap-2 items-center">
//               <ShoppingCart />
//               Cart
//             </div>
//           </Link>
//         </div>

//         <SignedOut>
//           <div className="flex gap-4 items-center">
//             <Link to="/sign-in" className="text-primary">
//               Sign In
//             </Link>
//             <Link to="/sign-up" className="text-primary">
//               Sign Up
//             </Link>
//           </div>
//         </SignedOut>

//         <SignedIn>
//           <UserButton />
//           <Link to={"/account"}>Account</Link>
//         </SignedIn>



//       </div>
//     </nav>
//   );
// }

// export default Navigation;



//my old navbar
import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
//import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSelector } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { Menu } from "lucide-react";


function Navigation(props){

    const { user } = useUser();
    const cart = useSelector((state) => state.cart.value);
    const savedItems = useSelector((state) => state.savedItems.value);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const getCartQuantity = () => {
      let count = 0;
      cart.forEach((item) => {
        count += item.quantity;
      });
      return count;
    };

    return(
        <>
        <nav className="relative px-4 py-4 md:px-8 md:py-6">
            <div className="flex justify-between items-center">
                <div className="flex gap-x-4 items-center md:gap-x-16">
                    <Link className="text-2xl font-semibold md:text-3xl" to="/">Mebius</Link>
                    
                    {/* Mobile menu button */}
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 md:hidden"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className="hidden gap-6 items-center md:flex">
                    <Link to="/">Home</Link>
                    <Link to="/shop">Shop</Link>
                 </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden gap-6 items-center md:flex">
            {user?.publicMetadata?.role === "admin" && (
                <Link 
                    to="/admin"
                    className="px-4 py-2 mr-4 text-white bg-blue-600 rounded-md transition-colors hover:bg-blue-700"
                >
                    Admin Dashboard
                </Link>
            )}
                    
                    </div>
                 <div className="hidden gap-6 items-center md:flex">   
                    <Link to="/shop/cart" className="flex gap-2 items-center">
                        <span>{getCartQuantity()}</span>
                        <ShoppingCart />
                    </Link>
                    <Link to="/saved" className="flex gap-2 items-center">
                        <span>{savedItems.length}</span>
                        <Heart />
                    </Link>
                    <SignedOut>
                        <Link to="/sign-in">Sign In</Link>
                        <Link to="/sign-up">Sign Up</Link>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                        <Link to="/account">Account</Link>
                        <Link to="/orders">My Orders</Link>
                    </SignedIn>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="absolute right-0 left-0 top-full z-50 bg-white shadow-lg md:hidden">
                    <div className="flex flex-col gap-4 p-4">
                        <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        <Link to="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link>
                        <div >
            {user?.publicMetadata?.role === "admin" && (
                                        <Link to="/admin" onClick={() => setIsMenuOpen(false)}>Admin</Link>
                        
            )}
                    
                    </div>
                        <Link to="/shop/cart" onClick={() => setIsMenuOpen(false)} 
                              className="flex gap-2 items-center">
                            <span>{getCartQuantity()}</span>
                            <ShoppingCart />
                            Cart
                        </Link>
                        <Link to="/saved" onClick={() => setIsMenuOpen(false)}
                              className="flex gap-2 items-center">
                            <span>{savedItems.length}</span>
                            <Heart />
                            Saved
                        </Link>
                        <SignedOut>
                            <Link to="/sign-in" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                            <Link to="/sign-up" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                            <Link to="/account" onClick={() => setIsMenuOpen(false)}>Account</Link>
                            <Link to="/orders" onClick={() => setIsMenuOpen(false)}>My Orders</Link>
                        </SignedIn>
                    </div>
                </div>
            )}
        </nav>

        </>

    );
}

export default Navigation;

















