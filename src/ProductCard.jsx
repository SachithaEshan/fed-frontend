import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "./lib/features/cartSlice";
import { Heart } from "lucide-react";
import { toggleSavedItem } from "./lib/features/savedItemsSlice";
import { useUser } from "@clerk/clerk-react";
import { toast } from "sonner";
import PropTypes from 'prop-types';

function ProductCard(props) {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const { isSignedIn, user } = useUser();
  const savedItems = useSelector((state) => state.savedItems.value);
  const isSaved = savedItems.some(item => item._id === props._id);

  const handleClick = (e) => {
    dispatch(
      addToCart({
        _id: props._id,
        name: props.name,
        price: props.price,
        image: props.image,
        description: props.description,
      })
    );
  };

  const handleSave = () => {
    if (!isSignedIn) {
      toast.error("Please sign in to save items");
      return;
    }

    dispatch(
      toggleSavedItem({
        _id: props._id,
        name: props.name,
        price: props.price,
        image: props.image,
        description: props.description,
      })
    );
  };

  return (
    <Card>
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
        <img src={props.image} className="block" />
      </div>
      <div className="flex justify-between items-center px-4 mt-4">
        <h2 className="text-2xl font-semibold">{props.name}</h2>
        <span className="block text-lg font-medium">${props.price}</span>
      </div>
      <div className="px-4 mt-2">
        <p className="text-sm">{props.description}</p>
      </div>
      <div className="p-4 mt-1">
        <Button className="w-full" onClick={handleClick}>
          Add To Cart
        </Button>
      </div>
    </Card>
  );
}

ProductCard.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ProductCard;