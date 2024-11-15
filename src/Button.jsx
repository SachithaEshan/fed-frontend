function Button(props){

    const handleClick=(e)=>{
        console.log(e);
        console.log("clicked");
    };

    return(
        <button 
        onClick={handleClick}
        className="text-white bg-black rounded-md w-fit block font font-medium py-2 px-4">
            {props.children}
        </button>
    );
}

export default Button;