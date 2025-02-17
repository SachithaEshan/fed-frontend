import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cartSlice";
import { Heart } from "lucide-react";
import { toggleSavedItem } from "@/lib/features/savedItemsSlice";
import { useUser } from "@clerk/clerk-react";
import { toast } from "sonner";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

function ProductCard({ _id, name, price, image, description, stock, inventory }) {
  const dispatch = useDispatch();
  const { isSignedIn } = useUser();
  const savedItems = useSelector((state) => state.savedItems.value);
  const isSaved = savedItems.some(item => item._id === _id);

  // Calculate actual stock value from either inventory or stock
  const actualStock = stock || inventory || 0;

  const handleClick = () => {
    dispatch(
      addToCart({
        _id,
        name,
        price,
        image,
        description,
        stock: actualStock,
      })
    );
  };

  const handleSave = (e) => {
    e.stopPropagation(); // Prevent the click from triggering the Link
    if (!isSignedIn) {
      toast.error("Please sign in to save items");
      return;
    }

    dispatch(
      toggleSavedItem({
        _id,
        name,
        price,
        image,
        description,
        stock: actualStock,
      })
    );
  };

  return (
    <Card className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
      <div className="relative p-4 h-80 rounded-lg bg-card">
        
        <button
          onClick={handleSave}
          className="absolute top-6 right-6 p-2 rounded-full transition-colors bg-white/80 hover:bg-white"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isSaved ? "fill-red-500 stroke-red-500" : "stroke-gray-600"
            }`}
          />
        </button>
        <Link to={`/shop/${_id}`} className="block">
          <img
            src={image}
            alt={name}
            className="object-contain w-full h-full"
          />
        </Link>
      </div>
      <div className="flex justify-between items-center px-4 mt-4">
        <h2 className="text-2xl font-semibold">{name}</h2>
        <span className="block text-lg font-medium">${price}</span>
      </div>
      <div className="px-4 mt-2">
        <p className="text-sm">{description}</p>
        <p className={`text-sm mt-1 ${actualStock < 10 ? 'text-red-500' : 'text-gray-500'}`}>
          {actualStock === 0 ? 'Out of Stock' : `${actualStock} in stock`}
        </p>
      </div>
      <div className="p-4 mt-1">
        <Button 
          className="w-full" 
          onClick={handleClick}
          disabled={actualStock === 0}
        >
          {actualStock === 0 ? 'Out of Stock' : 'Add To Cart'}
        </Button>
      </div>
    </Card>
  );
}

ProductCard.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  stock: PropTypes.number,
  inventory: PropTypes.number,
};

ProductCard.defaultProps = {
  stock: 0,
  inventory: 0,
};

export default ProductCard;
