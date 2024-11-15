import Hero from "./Hero1";
import Navbar from "./Navbar";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import CustomAccordion from "./Accordion";
import CheckboxDisabled from "./checkbox";



function App() {
  const name= "Eshan";
  const cartCount=4;
  const alter="ES";
  const product="AirPods Max";
  //ad=accordion 
  const ad1=" Yes. It adheres to the WAI-ARIA design pattern."
  const ad2=" Yes. It comes with default styles that matches the other components&apos; aesthetic."
  const ad3="Yes. It&apos;s animated by default, but you can disable it if you prefer."

  return (
    <div>
      <Navbar name={name} cartCount={cartCount} alter={alter}/>
      <Hero/>
      <div className="p-4"> 
      
     </div>
      <div className="flex gap-x-4 p-4 ">

      <Card className="border-2 w-96 bg-gray-200 ">
        <CardHeader>
        <Badge className="w-fit">New</Badge>
           <CardTitle >{product}</CardTitle>
           <CardDescription>Card Description</CardDescription>
        </CardHeader>
       <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <div>
          <Button variant="destructive"><a href="/cart">Buy Now</a></Button>
          </div>
        </CardFooter>
        <CardFooter>
         <CheckboxDisabled product={product}/>
        </CardFooter>
      </Card>

      <Card className="border-2 w-96 bg-gray-200">
        <CardHeader>
        <Badge className="w-fit">New</Badge>
           <CardTitle>Card Title</CardTitle>
           <CardDescription>Card Description</CardDescription>
        </CardHeader>
       <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
        <Button variant="destructive"><a href="/cart">Buy Now</a></Button>
        </CardFooter>
      </Card>

      <Card className="border-2 w-96 bg-gray-200">
        <CardHeader>
        <Badge className="w-fit">New</Badge>
           <CardTitle>Card Title</CardTitle>
           <CardDescription>Card Description</CardDescription>
        </CardHeader>
       <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
        <Button variant="destructive"><a href="/cart">Buy Now</a></Button>
        </CardFooter>
      </Card>

      </div>
      <div>
      <CustomAccordion accordionOne={ad1} accordion2={ad2} accordion3={ad3}/>
      </div>
      
    </div>
  );
}

export default App;
