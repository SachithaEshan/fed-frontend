import { useUser } from "@clerk/clerk-react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearSavedItems, fetchSavedItems } from "@/lib/features/savedItemsSlice";
import ProductCards from "./home/components/ProductCards";

const SavedItemsPage = () => {
  const { isSignedIn } = useUser();
  const dispatch = useDispatch();
  const savedItems = useSelector((state) => state.savedItems.value);
  const status = useSelector((state) => state.savedItems.status);
  
  useEffect(() => {
    if (isSignedIn) {
      dispatch(fetchSavedItems());
    } else {
      dispatch(clearSavedItems());
    }
  }, [isSignedIn, dispatch]);

  if (status === 'loading') {
    return (
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-6 text-2xl font-bold">Saved Items</h1>
        <div className="py-8 text-center">
          <p className="text-gray-500">Loading saved items...</p>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-6 text-2xl font-bold">Saved Items</h1>
        <div className="py-8 text-center">
          <p className="text-red-500">Error loading saved items. Please try again.</p>
        </div>
      </div>
    );
  }

  const formattedProducts = savedItems.map(item => ({
    ...item,
    price: parseFloat(item.price),
    inventory: item.inventory || 0,
    inStock: (item.inventory > 0)
  }));

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Saved Items</h1>
      
      {!isSignedIn ? (
        <div className="py-8 text-center">
          <p className="text-gray-500">Please sign in to view your saved items</p>
        </div>
      ) : savedItems?.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-gray-500">No saved items yet</p>
        </div>
      ) : (
        <ProductCards products={formattedProducts} />
      )}
    </div>
  );
};

export default SavedItemsPage; 