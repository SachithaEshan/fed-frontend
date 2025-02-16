import { Separator } from "@/components/ui/separator";
import ProductCards from "./ProductCards";
import Tab from "./Tab";
import { useState } from "react";
import { useGetCategoriesQuery, useGetProductsQuery } from "@/lib/api";
import { Skeleton } from "./components/ui/skeleton";

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

  const filteredProducts = selectedCategoryId === "ALL"
    ? products
    : products.filter((product) => product.categoryId === selectedCategoryId);

  const sortedProducts =
    sortOrder === "asc"
      ? [...filteredProducts].sort((a, b) => a.price - b.price)
      : sortOrder === "desc"
      ? [...filteredProducts].sort((a, b) => b.price - a.price)
      : filteredProducts;


      if (isProductsLoading || isCategoriesLoading) {
        return (
          <section className="px-8 py-8">
            <h2 className="text-4xl font-bold">Our Top Products</h2>
    
            <Separator className="mt-2" />
            <div className="mt-4 flex items-center gap-4">
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
            <div className="mt-4 flex items-center gap-4"></div>
            <div className="mt-4">
              <p className="text-red-500">{`${productsError.message} ${categoriesError.message}`}</p>
            </div>
          </section>
        );
      }


  return (
    <>
      <section className="px-8 py-8">
        <h2 className="text-4xl font-bold">Our Top Products</h2>
        <Separator className="mt-2" />
        <div className="flex items-center justify-between p-8 mx-4">
          <div className="mt-4 flex items-center gap-4">
        {[...categories, { _id: "ALL", name: "All" }].map((category) => (
          <Tab
            key={category._id}
            _id={category._id}
            selectedCategoryId={selectedCategoryId}
            name={category.name}
            onTabClick={handleTabClick}
          />
        ))}
        </div>
          <div className="text-black gap-2 w-fit flex">
            <button
              onClick={() => handleSort("asc")}
              className="border-2 border-[#edeef1] px-2 py-1 rounded-md"
            >
              Sort By Ascending
            </button>
            <button
              onClick={() => handleSort("desc")}
              className="border-2 border-[#edeef1] px-2 py-1 rounded-md"
            >
              Sort By Descending
            </button>
          </div>
        </div>
        <ProductCards products={sortedProducts} />
      </section>
    </>
  );
}

export default Products;
