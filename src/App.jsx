import Hero from "./Hero1";
import Navbar from "./Navbar";
import Products from "./Products";





function App() {
  const name= "Eshan";
  const cartCount=4;
  const alter="ES";

  return (
    <div>
      <Navbar name={name} cartCount={cartCount} alter={alter}/>
      <Hero/>
      <Products/>
    </div>
  );
}

export default App;
