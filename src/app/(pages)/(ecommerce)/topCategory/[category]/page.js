// src/components/ProductPage.js
"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "@/app/components/ProductCard";
import useProductsStore from "@/app/store/productsStore";
import FilterBar from "@/app/components/FilterBar";
import { useParams } from "next/navigation";

const AllCategory = () => {
  const { filteredProducts, fetchProductByCategory, limit } = useProductsStore(
    (state) => ({
      filteredProducts: state.filteredProducts,
      fetchProductByCategory: state.fetchProductDetails,
      limit: state.limit,
    })
  );

  const { category } = useParams();
  const [fetchComplete, setFetchComplete] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      fetchProductByCategory({category, limit });
      setFetchComplete(true);
    };
    fetchProducts();
  }, [limit, category, fetchProductByCategory]);

  return (
    <div className="flex gap-8  mt-36">
      <FilterBar
        currentState={fetchProductByCategory}
        products={filteredProducts}
      />
      {fetchComplete && filteredProducts.length === 0 ? (
        <div>No products found</div>
      ) : (
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
      )}
    </div>
  );
};

export default AllCategory;
