//import"./Hero1.css";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu } from 'lucide-react';
import { useState } from 'react';

function Hero() {
    return(
        <>
       
        <section className="px-4 py-8 xl:px-16">
            <div className="grid md:grid-cols-2 rounded-md min-h-[60vh] bg-[#f4f8f9]"> 
                <div className="flex flex-col gap-y-4 justify-center p-4 md:p-8 lg:p-16">
                    <span className="block rounded-full bg-[#febc26] px-2 py-1 text-xs w-fit">
                        WEEKLY DISCOUNT 
                    </span>
                    <h1 className="text-2xl font-semibold md:text-4xl lg:text-6xl">
                        Premium Product Online shop
                    </h1>
                    <p className="text-sm md:text-base">
                        Discover top-quality products at unbeatable prices. Shop the latest trends with ease and convenience, all in one place!
                    </p>
                    <Button className="w-fit" asChild>
                        <Link to="/shop">Shop Now</Link>
                    </Button>
                </div>
                <div className="relative h-[300px] md:h-auto">
                    <img
                        src="https://fee-storefront.vercel.app/assets/hero/hero.jpg"
                        alt="Hero image"
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
        </section>
    </>
    );
}

export default Hero;