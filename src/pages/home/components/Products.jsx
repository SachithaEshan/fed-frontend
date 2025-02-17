import { Separator } from "@/components/ui/separator";
import ProductCards from "../components/ProductCards";
import Tab from "./Tab";
import { useState, useMemo } from "react";
import { useGetCategoriesQuery, useGetProductsQuery } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

function Products() {
  // const products = [
  //   {
  //     categoryId: "1",
  //     image: "/assets/products/airpods-max.png",
  //     _id: "1",
  //     name: "AirPods Max",
  //     price: 549.0,
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
  //   },
  //   {
  //     categoryId: "3",
  //     image: "/assets/products/echo-dot.png",
  //     _id: "2",
  //     name: "Echo Dot",
  //     price: 99.0,
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
  //   },
  //   {
  //     categoryId: "2",
  //     image: "/assets/products/pixel-buds.png",
  //     _id: "3",
  //     name: "Galaxy Pixel Buds",
  //     price: 99.0,
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
  //   },
  //   {
  //     categoryId: "1",
  //     image: "/assets/products/quietcomfort.png",
  //     _id: "4",
  //     name: "Bose QuiteComfort",
  //     price: 249.0,
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
  //   },
  //   {
  //     categoryId: "3",
  //     image: "/assets/products/soundlink.png",
  //     _id: "5",
  //     name: "Bose SoundLink",
  //     price: 119.0,
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
  //   },
  //   {
  //     categoryId: "5",
  //     image: "/assets/products/apple-watch.png",
  //     _id: "6",
  //     name: "Apple Watch 9",
  //     price: 699.0,
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
  //   },
  //   {
  //     categoryId: "4",
  //     image: "/assets/products/iphone-15.png",
  //     _id: "7",
  //     name: "Apple Iphone 15",
  //     price: 1299.0,
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
  //   },
  //   {
  //     categoryId: "4",
  //     image: "/assets/products/pixel-8.png",
  //     _id: "8",
  //     name: "Galaxy Pixel 8",
  //     price: 549.0,
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
  //   },
  // ];

  // const categories = [
  //   { _id: "ALL", name: "All" },
  //   { _id: "1", name: "Headphones" },
  //   { _id: "2", name: "Earbuds" },
  //   { _id: "3", name: "Speakers" },
  //   { _id: "4", name: "Mobile Phones" },
  //   { _id: "5", name: "Smart Watches" },
  // ];

  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productsError,
  } = useGetProductsQuery();

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    error: categoriesError,
  } = useGetCategoriesQuery();

  const [selectedCategoryId, setSelectedCategoryId] = useState("ALL");
  const [sortOrder, setSortOrder] = useState(null); // null, 'asc', or 'desc'

  const handleTabClick = (_id) => {
    setSelectedCategoryId(_id);
    setSortOrder(null); // Reset sorting when switching categories
  };

  const handleSort = (order) => {
    setSortOrder(order);
  };

  // Memoize the processed products
  const processedProducts = useMemo(() => {
    if (!products) return [];
    
    // First filter
    const filtered = selectedCategoryId === "ALL"
      ? products
      : products.filter((product) => product.categoryId === selectedCategoryId);
    
    // Then sort if needed
    if (!sortOrder) return filtered;
    
    return [...filtered].sort((a, b) => 
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
  }, [products, selectedCategoryId, sortOrder]);

  // Ensure "All" category is at the beginning
  const sortedCategories = useMemo(() => {
    if (!categories) return [];
    const cats = categories.filter(cat => cat._id !== "ALL");
    return [{ _id: "ALL", name: "All" }, ...cats];
  }, [categories]);

  if (isProductsLoading || isCategoriesLoading) {
    return (
      <section className="px-8 py-8">
        <h2 className="text-4xl font-bold">Our Top Products</h2>
    
        <Separator className="mt-2" />
        <div className="flex gap-4 items-center mt-4">
          <Skeleton className="h-16" />
        </div>
        <div className="grid grid-cols-4 gap-4 mt-4">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>
      </section>
    );
  }

  if (isProductsError || isCategoriesError) {
    return (
      <section className="px-8 py-8">
        <h2 className="text-4xl font-bold">Our Top Products</h2>
    
        <Separator className="mt-2" />
        <div className="flex gap-4 items-center mt-4"></div>
        <div className="mt-4">
          <p className="text-red-500">
            {isProductsError && productsError?.message}
            {isProductsError && isCategoriesError && " | "}
            {isCategoriesError && categoriesError?.message}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-8 py-8">
      <h2 className="text-4xl font-bold">Our Top Products</h2>
      <Separator className="mt-2" />
      <div className="flex justify-between items-center p-8 mx-4">
        <div className="flex gap-4 items-center mt-4">
          {sortedCategories.map((category) => (
            <Tab
              key={category._id}
              _id={category._id}
              selectedCategoryId={selectedCategoryId}
              name={category.name}
              onTabClick={handleTabClick}
            />
          ))}
        </div>
        <div className="flex gap-2 text-black w-fit">
          <button
            onClick={() => handleSort("asc")}
            className={`border-2 px-2 py-1 rounded-md ${
              sortOrder === "asc" ? "border-black" : "border-[#edeef1]"
            }`}
          >
            Sort By Ascending
          </button>
          <button
            onClick={() => handleSort("desc")}
            className={`border-2 px-2 py-1 rounded-md ${
              sortOrder === "desc" ? "border-black" : "border-[#edeef1]"
            }`}
          >
            Sort By Descending
          </button>
        </div>
      </div>
      <ProductCards products={processedProducts} />
    </section>
  );
}

export default Products;
