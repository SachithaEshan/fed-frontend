import { useUser } from "@clerk/clerk-react";
import { useSelector } from "react-redux";
import ProductCards from "../ProductCards";

const SavedItemsPage = () => {
  const { user } = useUser();
  const savedItems = useSelector((state) => state.savedItems.value);

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Saved Items</h1>
      
      {savedItems?.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-gray-500">No saved items yet</p>
        </div>
      ) : (
        <ProductCards products={savedItems} />
      )}
    </div>
  );
};

export default SavedItemsPage; 