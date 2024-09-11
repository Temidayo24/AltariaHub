"use client";
import useProductsStore from "@/app/store/productsStore";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import AddToRegistry from "@/app/components/AddToRegistry";
import { useAuthStore } from "@/app/store/authStore";
import { toast } from "react-toastify";
import useCartStore from "@/app/store/cartStore";
import EmblaCarousel from "@/app/components/Carousel";

const ProductDetails = () => {
  const { id } = useParams();

  const {
    fetchProductByID,
    product,
    selectedSection,
    productSection,
    relatedProducts,
    fetchRelatedProducts,
    addToWishlist,
    addToRegistry,
    createRegistry,
    fetchRegistry,
    registries,
  } = useProductsStore((state) => ({
    fetchProductByID: state.fetchProductByID,
    product: state.product,
    selectedSection: state.selectedSection,
    productSection: state.productSection,
    relatedProducts: state.relatedProducts,
    fetchRelatedProducts: state.fetchRelatedProducts,
    addToWishlist: state.addToWishlist,
    addToRegistry: state.addToRegistry,
    createRegistry: state.createRegistry,
    fetchRegistry: state.fetchRegistry,
    registries: state.registries,
  }));

  const {
    size,
    color,
    quantity,
    price,
    selectedProductName,
    name,
    inStock,
    selectedQuantity,
    quantityInStock,
    selectedPrice,
    selectedSize,
    selectedColor,
    selectedProperties, // Changed this line
    setSelectedProperties,
    incrementQuantity,
    decrementQuantity,
    addToCart,
    resetProductState,
  } = useCartStore((state) => ({
    size: state.size,
    color: state.color,
    price: state.price,
    inStock: state.inStock,
    quantity: state.quantity,
    quantityInStock: state.quantityInStockA,
    selectedSize: state.selectedSizeA,
    selectedPrice: state.selectedPriceA,
    selectedColor: state.selectedColorA, // Changed this line
    selectedQuantity: state.selectedQuantity,
    incrementQuantity: state.incrementQuantity,
    decrementQuantity: state.decrementQuantity,
    addToCart: state.addToCart,
    name: state.productName,
    selectedProductName: state.selectedProductNameA,
    resetProductState: state.resetProductState,
    selectedProperties: state.selectedProperties,
    setSelectedProperties: state.setSelectedProperties,
  }));

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (id) {
      fetchProductByID(id);
      resetProductState();
      fetchRelatedProducts(id);
    }
  }, [id, fetchProductByID, resetProductState, fetchRelatedProducts]);

  const handleAddToWishlist = () => {
    if (!user) {
      toast.error("You need to be logged in to add items to wishlist.");
    } else addToWishlist(id);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToRegistry = () => {
    if (!user) {
      toast.error("You need to be logged in to add items to the registry.");
    } else setIsModalOpen(true);
  };

  const images = [
    "/images/p2.jpg",
    "/images/p2.jpg",
    "/images/p2.jpg",
    "/images/p2.jpg",
  ];

  useEffect(() => {
    if (size && product.length) {
      const selectedProduct = product[0].product_properties.find(
        (prop) => prop.product_color.name === color
      );

      if (selectedProduct) {
        const sizeDetail = selectedProduct.product_dimension.find(
          (dimension) => dimension.size === size
        );
        if (sizeDetail) {
          selectedPrice(sizeDetail.price); // Set the price when a size is selected
        }
      }
    }
  }, [size, color, product, selectedPrice]);

  const handleColorChange = (color) => {
    selectedColor(color);
    const selectedProduct = product.find((p) =>
      p.product_properties.some((prop) => prop.product_color.name === color)
    );
    if (selectedProduct) {
      const colorProperty = selectedProduct.product_properties.find(
        (prop) => prop.product_color.name === color
      );
      const name = selectedProduct.name;
      selectedProductName(name);
      if (colorProperty) {
        const size = colorProperty.product_dimension.map(
          (dimension) => dimension.size
        );
        const inStock = colorProperty.product_dimension.map(
          (stock) => stock.product_in_stock
        );
        selectedSize(size);
        quantityInStock(inStock);
        selectedPrice();
      }
    }
  };

  const handleAddToCart = () => {
    const selectedProps = {
      color,
      size,
      price,
      quantity,
    };
    console.log(typeof price, typeof size);
    setSelectedProperties([...selectedProperties, selectedProps]);

    const productToAdd = {
      _id: id,
      product_name: name,
      selected_properties: [selectedProps],
    };
    addToCart(productToAdd);
  };

  const OPTIONS = { align: "start", dragFree: true, loop: true };

  return (
    <div>
      {product.map((data) => {
        const salePrice = parseFloat(data.sale_price).toFixed(2);
        const globalPrice = parseFloat(data.global_price).toFixed(2);
        const discount = ((globalPrice - price) / globalPrice) * 100;
        const discountRoundedUp = discount.toFixed(0);

        const selectedProduct = data.product_properties.find(
          (prop) => prop.product_color.name === color
        );
        const sizes = selectedProduct ? selectedProduct.product_dimension : [];

        return (
          <div className="flex flex-col gap-20  mt-36" key={data._id}>
            <div className="flex gap-7">
              <div className="w-3/5">
                <Carousel
                  useKeyboardArrows={true}
                  showThumbs={true}
                  showStatus={false}
                  showIndicators={false}
                >
                  {images.map((img, index) => (
                    <div className="w-full" key={index}>
                      <img src={img} alt="" style={{ height: "100%" }} />
                    </div>
                  ))}
                </Carousel>
              </div>
              <div className="w-2/5 flex flex-col gap-5">
                <div className="flex flex-col gap-3 border-b pb-3">
                  <div className="flex flex-col gap-1">
                    <div className="text-black font-[400] text-3xl">
                      {data.name}
                    </div>
                    <p className="text-sm">
                      Brand:{" "}
                      <Link href={"/"} className="text-blue-600 underline">
                        {data.brand}
                      </Link>
                    </p>
                  </div>
                  <div className="text-xl font-[600] flex flex-col gap">
                    <span className="text-3xl font-[600] flex items-center gap-3">
                      &#8358;
                      {price || salePrice}
                      {price && (
                        <span className="text-sm font-extralight border bg-percent p-1 rounded-md">
                          {discountRoundedUp}%
                        </span>
                      )}
                    </span>
                    <span className="font-[400] line-through text-black text-opacity-50 text-lg">
                      &#8358;{globalPrice}
                    </span>
                  </div>
                  <div className="text-black text-opacity-60">No reviews</div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-4 border-b pb-4">
                    <div className="flex flex-col gap-1">
                      <span>Select Color</span>
                      <div className="flex gap-3 font-extralight text-sm mt-2">
                        {data.product_properties.map((property, index) => (
                          <button
                            key={index}
                            className={`border-gray-400 border text-black text-opacity-50 w-fit py-1 px-2 rounded-md ${
                              color === property.product_color.name
                                ? "bg-gray-200"
                                : ""
                            }`}
                            onClick={() =>
                              handleColorChange(property.product_color.name)
                            }
                          >
                            {property.product_color.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {sizes.map((siZe, index) => (
                      <div key={index}>
                        <span className="flex flex-col gap-1">Select Size</span>
                        <div className="flex gap-3 font-extralight text-sm">
                          <button
                            className={`border-gray-400 border text-black text-opacity-50 w-fit py-1 px-2 rounded-md mt-2 ${
                              size === siZe.size ? "bg-gray-200" : ""
                            }`}
                            onClick={() => selectedSize(siZe.size)}
                          >
                            {siZe.size}
                          </button>
                        </div>
                      </div>
                    ))}

                    {data.condition === "thrift" && (
                      <div className="flex items-center gap-3 w-full bg-gray-100 text-text1 text-opacity-70 p-3 font-medium text-base rounded mb-3">
                        <img src="/svg/icons/pls_note.svg" alt="" />
                        Please note that this is a thrift item. Altaria Hub does
                        not guarantee the quality of thrift items. Purchases are
                        made at the buyer's risk.
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex">
                      <button
                        className="border border-gray-300 text-4xl rounded-l-lg w-12"
                        onClick={decrementQuantity}
                      >
                        -
                      </button>
                      <button className="border border-gray-300 text-lg w-12">
                        {quantity}
                      </button>
                      <button
                        className="border border-gray-300 text-2xl rounded-r-lg w-12"
                        onClick={incrementQuantity}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={handleAddToCart}
                      className="bg-primary1 text-white font-extralight w-full rounded-lg flex items-center justify-center gap-3 py-2.5"
                    >
                      <img
                        src="/svg/icons/cart-white.svg"
                        alt=""
                        className=""
                      />
                      Add to cart
                    </button>
                  </div>
                  <div className="flex gap-4 mt-2">
                    <button
                      onClick={handleAddToRegistry}
                      className="w-fit border border-gray-600 text-primary1 px-5 py-2 rounded-lg font-extralight flex items-center gap-2"
                    >
                      <img src="/svg/icons/registry.svg" alt="" />
                      Add to Registry
                    </button>
                    <img
                      src="/svg/icons/heart.svg"
                      alt=""
                      className="w-[30px] cursor-pointer"
                      onClick={handleAddToWishlist}
                    />
                    <img
                      src="/svg/icons/share.svg"
                      alt=""
                      className="w-[30px] cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col gap-2 border-t pt-6">
                    <p>
                      Seller's Name:{" "}
                      <span className="font-bold">
                        {data.vendor_id.business_name}
                      </span>
                    </p>
                    <p>
                      Rating:{" "}
                      <span className="text-opacity-50 text-black">
                        No Reviews
                      </span>
                    </p>
                    <p>
                      Seller Contact:{" "}
                      <Link href={"/"} className="text-blue-500 underline">
                        Click here to view seller's profile
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-10">
              <div className="flex gap-24">
                <button
                  className="flex flex-col gap-2 w-fit font-[500]"
                  onClick={() => selectedSection("description")}
                >
                  Product Description
                  {productSection === "description" && (
                    <hr className="h-2 w-full bg-black" />
                  )}
                </button>
                <button
                  className="flex flex-col gap-2 w-fit font-[500]"
                  onClick={() => selectedSection("return")}
                >
                  Return and Warranty Information
                  {productSection === "return" && (
                    <hr className="h-2 w-full bg-black" />
                  )}
                </button>
                <button
                  className="flex flex-col gap-2 w-fit font-[500]"
                  onClick={() => selectedSection("reviews")}
                >
                  Customer Reviews
                  {productSection === "reviews" && (
                    <hr className="h-2 w-full bg-black" />
                  )}
                </button>
              </div>
              {productSection === "description" ? (
                <div>{data.description}</div>
              ) : productSection === "return" ? (
                <div>No warranty information</div>
              ) : productSection === "reviews" ? (
                <div>No review</div>
              ) : null}
              {user && (
                <AddToRegistry
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  createARegistry={createRegistry}
                  addToARegistry={addToRegistry}
                  fetchARegistry={fetchRegistry}
                  registries={registries}
                  product_id={id}
                  user={user}
                />
              )}
            </div>
            {relatedProducts.length > 0 && (
              <div className="flex flex-col gap-4">
                <span className="text-2xl font-normal">Related Products</span>
                <EmblaCarousel slides={relatedProducts} options={OPTIONS} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductDetails;
