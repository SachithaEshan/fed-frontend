import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/lib/features/cartSlice";
import { toggleSavedItem, fetchSavedItems, removeItemFromDb, saveItemToDb } from "@/lib/features/savedItemsSlice";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Heart } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";
import Navigation from "@/components/Navigation";
import PropTypes from 'prop-types';

function ProductDetails({ _id, name, price, image, description }) {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { isSignedIn } = useUser();
  const savedItems = useSelector((state) => state.savedItems.value);
  const isSaved = savedItems.some(item => item._id === _id);
  
  // Check if this product is saved
  //const isSaved = savedItems.some(item => item._id === productId);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const response = await fetch(`https://fed-storefront-backend-sachitha.onrender.com/Api/products/${productId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      return response.json();
    },
  });
  
  if (isLoading) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="animate-pulse">
          <div className="mb-4 w-1/4 h-8 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="w-1/2 h-8 bg-gray-200 rounded"></div>
              <div className="w-1/4 h-4 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="w-1/3 h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <p className="text-red-500">Error loading product: {error.message}</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.inventory === 0) {
      toast.error("This product is out of stock");
      return;
    }
    dispatch(addToCart(product));
    toast.success("Added to cart!");
  };

  const handleSave = async (e) => {
    e.stopPropagation();
    if (!isSignedIn) {
      toast.error("Please sign in to save items");
      return;
    }

    const item = {
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      inventory: product.inventory
    };

    try {
      if (isSaved) {
        await dispatch(removeItemFromDb(product._id)).unwrap();
        toast.success("Removed from saved items");
      } else {
        await dispatch(saveItemToDb(item)).unwrap();
        toast.success("Added to saved items");
      }
      
      dispatch(toggleSavedItem(item));
      dispatch(fetchSavedItems());
    } catch (error) {
      console.error('Error updating saved items:', error);
      toast.error(isSaved ? 
        "Failed to remove from saved items" : 
        "Failed to add to saved items"
      );
    }
  };

  //   dispatch(toggleSavedItem({
  //     ...product,
  //     inventory:  product.inventory || 0
  //   }));
  //   toast.success(isSaved ? "Removed from saved items" : "Added to saved items");
  // };

  return (
    <>
      <Navigation />
      <div className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Product Image */}
          <div className="overflow-hidden p-4 bg-white rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="object-contain w-full h-auto max-h-[400px] mx-auto"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold sm:text-4xl">{product.name}</h1>
              <Button
                // variant="ghost"
                // size="icon"
                onClick={handleSave}
                className='rounded-full transition-colors bg-white/80 hover:bg-white'
              >
                <Heart className={`w-6 h-6 sm:w-7 sm:h-7 transition-colors ${
              isSaved ? "fill-red-500 stroke-red-500" : "stroke-gray-600"
            }`} />
              </Button>
            </div>
            
            <p className="text-xl font-semibold sm:text-2xl">${product.price}</p>
            
            <Separator />
            
            <div>
              <h2 className="mb-2 text-lg font-semibold sm:text-xl">Description</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div>
              <p className={`text-sm ${product.inventory < 10 ? 'text-red-500' : 'text-gray-500'}`}>
                {product.inventory === 0 ? 'Out of Stock' : `${product.inventory} in stock`}
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button 
                size="lg" 
                onClick={handleAddToCart}
                disabled={product.inventory === 0}
                className="flex-1"
              >
                <ShoppingCart className="mr-2" />
                {product.inventory === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

ProductDetails.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
  description: PropTypes.string,
  inventory: PropTypes.number
};

export default ProductDetails;