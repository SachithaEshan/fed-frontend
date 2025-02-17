import Hero from "./pages/home/components/Hero1";
import Navbar from "./Navbar";
import Products from "./Products";
import { Toaster } from 'react-hot-toast';


function App() {
  const name= "Eshan";
  const cartCount=4;
  const alter="ES";

  return (
    <div>
      <Navbar name={name} cartCount={cartCount} alter={alter}/>
      <Hero/>
      <Products/>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
