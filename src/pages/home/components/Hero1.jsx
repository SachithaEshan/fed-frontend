//import"./Hero1.css";
import { Button } from "@/components/ui/button";

function Hero() {
    return(
        <>
       
        <section className="py-8 px-4 xl:px-16 ">
            <div className="grid md:grid-cols-2 rounded-md min-h-[60vh] bg-[#f4f8f9] "> 
                <div className="flex flex-col justify-center p-8 md:p-16 gap-y-4 ">
                    
                    <span className="block rounded-full bg-[#febc26] px-2 py-1 text-xs w-fit">WEEKLY DISCOUNT </span>
                    <h1 className="text-4xl xl:text-6xl text font-semibold">Premium Product Online shop</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius quos
                    suscipit est autem quia? Voluptatem?
                    </p>
                    <Button className="w-fit" asChild>
                     <a to="/shop">Shop Now</a>
                    </Button>
                </div>
                {/* <div className="relative">
                    <img
                    src="https://fee-storefront.vercel.app/assets/hero/hero.jpg"
                     alt="120"
                     className="w-full h-full object-cover "
                     
                    />
                </div> */}
                 <div className="hero-image-container">
                     <img
                         src="https://fee-storefront.vercel.app/assets/hero/hero.jpg"
                        alt=""
                        className="hero-image"
                  />
                 </div>
            </div>
        </section>
    </>
    );
}

export default Hero;