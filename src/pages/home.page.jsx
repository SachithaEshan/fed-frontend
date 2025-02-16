import Hero from "./../Hero1";
import Navigation from "./../Navbar";
import Products from "./../Products";
//import { useState } from "react";
import { useSelector } from "react-redux";

function HomePage() {
  //const name = null;
  // const [cart, setCart] = useState([]);

  // const handleAddToCart = (product) => {
  //   const foundItem = cart.find((item) => item.product._id === product._id);
  //   if (foundItem) {
  //     setCart(
  //       cart.map((cartItem) =>
  //         cartItem.product._id === product._id
  //           ? { ...cartItem, quantity: cartItem.quantity + 1 }
  //           : cartItem
  //       )
  //     );
  //     return;
  //   }
  //   setCart([...cart, { product: product, quantity: 1 }]);
  // };

 

  return (
    <main>
     
      <Hero />
      <Products />
    </main>
  );
}

export default HomePage;