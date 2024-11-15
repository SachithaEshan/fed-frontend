//import"./Hero1.css";

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
                    <a to="/shop" className="px-4 py-2 bg-black text-white font-medium rounded-md w-fit"> shop now</a>
                </div>
                <div className="relative">
                    <img
                    src="https://fee-storefront.vercel.app/assets/hero/hero.jpg"
                     alt="120"
                     className="w-full h-full object-cover "
                     
                    />
                </div>
            </div>
        </section>
    </>
    )
}

export default Hero;