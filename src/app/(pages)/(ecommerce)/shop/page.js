"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/app/components/ProductCard";
import useProductsStore from "@/app/store/productsStore";
import FilterBar from "@/app/components/FilterBar";
import InfiniteScroll from "react-infinite-scroll-component";

const ShopContent = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || ""; // Extract query from the URL

  const { fetchProductDetails, limit, filteredProducts, allProducts } =
    useProductsStore((state) => ({
      filteredProducts: state.filteredProducts,
      allProducts: state.allProducts,
      fetchProductDetails: state.fetchProductDetails,
      limit: state.limit,
    }));

  const [hasMore, setHasMore] = useState(true);
  const [fetchComplete, setFetchComplete] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      await fetchProductDetails({ query, limit });
      setFetchComplete(true);
    };
    fetchProducts();
  }, [query, limit]);

  const fetchMoreProducts = async () => {
    const newLimit = limit + 10; // Increase limit to load more products
    await fetchProductDetails({ query, limit: newLimit });

    if (filteredProducts.length >= allProducts.length) {
      setHasMore(false); // Disable further fetching if all products are loaded
    }
  };

  return (
    <div className="flex gap-8 mt-36 relative ">
      <FilterBar
        currentState={fetchProductDetails}
        products={filteredProducts}
      />
      {fetchComplete && filteredProducts.length === 0 ? (
        <div>No products found</div>
      ) : (
        <InfiniteScroll
          dataLength={filteredProducts.length}
          next={fetchMoreProducts}
          hasMore={hasMore}
          loader={
            <span className="border-white mt-4 text-center h-6 w-6 animate-spin rounded-full border-2 border-t-primary1"></span>
          }
          // endMessage={<p>No more products to load</p>}
        >
          <div className="flex flex-col gap-3 items-center relative">
            <div className="flex flex-wrap gap-x-[10px] gap-y-4 p-3 w-fit h-fit">
              {filteredProducts.map((product) => (
                <ProductCard
                  category={product.category_name}
                  salePrice={product.sale_price}
                  globalPrice={product.global_price}
                  productName={product.name}
                  width={"w-[210px] max-w-[210px] min-w-[180px]"}
                  key={product._id}
                  href={`/product/${product._id}`}
                  isThrift={product.condition}
                  productId={product._id}
                />
              ))}
            </div>
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

const Shop = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
};

export default Shop;
