import { useState, useMemo } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";
import ProductCards from "@/pages/home/components/ProductCards";
import Tab from "@/pages/home/components/Tab";
import { fetchProducts, fetchCategories } from "@/lib/store";
import Navigation from "@/components/Navigation";

// Create a QueryClient instance
const queryClient = new QueryClient();

function ShopContent() {
  const [selectedCategoryId, setSelectedCategoryId] = useState("ALL");
  const [sortOrder, setSortOrder] = useState(null);

  // Fetch products and categories using React Query
  const { data: products, isLoading: isProductsLoading, isError: isProductsError, error: productsError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  
  const { data: categories, isLoading: isCategoriesLoading, isError: isCategoriesError, error: categoriesError } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Handle sorting and filtering of categories
  const sortedCategories = useMemo(() => {
    if (!categories) return [];
    const cats = categories.filter((cat) => cat._id !== "ALL");
    return [{ _id: "ALL", name: "All" }, ...cats];
  }, [categories]);

  // Handle filtering and sorting of products
  const processedProducts = useMemo(() => {
    if (!products) return [];
    const filtered = selectedCategoryId === "ALL"
      ? products
      : products.filter((product) => product.categoryId === selectedCategoryId);

    if (!sortOrder) return filtered;

    return [...filtered].sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
  }, [products, selectedCategoryId, sortOrder]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const handleSort = (order) => {
    setSortOrder(order === sortOrder ? null : order);
  };

  // Loading state
  if (isProductsLoading || isCategoriesLoading) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-8 text-4xl font-bold">Shop</h1>
        <div className="animate-pulse">
          <div className="mb-4 w-48 h-8 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isProductsError || isCategoriesError) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-8 text-4xl font-bold">Shop</h1>
        <div className="text-red-500">
          {isProductsError && productsError?.message}
          {isProductsError && isCategoriesError && " | "}
          {isCategoriesError && categoriesError?.message}
        </div>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <div className="container px-4 py-8 mx-auto">
        <h1 className="text-4xl font-bold">Shop</h1>
        <Separator className="my-6" />
        
        <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {sortedCategories.map((category) => (
              <Tab
                key={category._id}
                _id={category._id}
                selectedCategoryId={selectedCategoryId}
                name={category.name}
                onTabClick={handleCategoryChange}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleSort("asc")}
              className={`px-4 py-2 rounded-md transition-all ${
                sortOrder === "asc" ? "bg-primary text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Price: Low to High
            </button>
            <button
              onClick={() => handleSort("desc")}
              className={`px-4 py-2 rounded-md transition-all ${
                sortOrder === "desc" ? "bg-primary text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Price: High to Low
            </button>
          </div>
        </div>

        {processedProducts.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-gray-500">No products found.</p>
          </div>
        ) : (
          <ProductCards products={processedProducts} />
        )}
      </div>
    </>
  );
}

// Wrap ShopContent inside QueryClientProvider
function ShopPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <ShopContent />
    </QueryClientProvider>
  );
}

export default ShopPage;
