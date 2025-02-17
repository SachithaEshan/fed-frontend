import { useUser } from "@clerk/clerk-react";
import { useSelector } from "react-redux";
import ProductCards from "./home/components/ProductCards";

const SavedItemsPage = () => {
  const { user } = useUser();
  const savedItems = useSelector((state) => state.savedItems.value);
  
  console.log("Saved Items:", savedItems); // Debug log

  // Transform saved items to match the product structure expected by ProductCards
  const formattedProducts = savedItems.map(item => {
    console.log("Individual item:", item); // Debug log
    return {
      ...item,
      _id: item._id,
      name: item.name,
      price: parseFloat(item.price),
      description: item.description,
      image: item.image,
      stock: item.stock || item.inventory || 0,
      inStock: (item.stock > 0 || item.inventory > 0)
    };
  });

  console.log("Formatted Products:", formattedProducts); // Debug log

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Saved Items</h1>
      
      {savedItems?.length === 0 ? (
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