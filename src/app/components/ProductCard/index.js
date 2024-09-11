import Link from "next/link";

import img from "../../../../public/images/placeholder.jpeg";
import Image from "next/image";
import useProductsStore from "@/app/store/productsStore";
import { Box, Skeleton } from "@mui/material";
import { useEffect } from "react";
const ProductCard = ({
  category,
  average,
  count,
  salePrice,
  globalPrice,
  productName,
  width,
  href,
  isThrift,
  productId,
}) => {
  const { loading, addToWishlist } = useProductsStore((state) => ({
    loading: state.loading,
    addToWishlist: state.addToWishlist,
  }));

  useEffect(() => {
    setTimeout(() => {
      loading;
    }, 2000);
  }, []);

  const handleAddToWishlist = () => {
    addToWishlist(productId);
  };

  return (
    <Box>
      {loading ? (
        <Skeleton
          variant="rectangular"
          width={220}
          height={250}
          className="rounded-lg"
        />
      ) : (
        <Link
          href={href}
          className={`h-full flex flex-col gap-2 justify-start bg-white border border-gray-200 p-3 rounded-lg text-text1 ${width}`}
        >
          <div className="h-full w-full rounded-lg relative">
            <Image
              src={img}
              alt=""
              height={9999}
              width={9999}
              className="rounded-lg relative"
              priority={true}
            />
            <div
              onClick={handleAddToWishlist}
              className="bg-white py-2 px-2 rounded-lg w-fit flex items-center gap-1 font-semibold justify-start absolute bottom-3 right-3"
            >
              <Image
                src="/svg/icons/heart.svg"
                alt=""
                width={25}
                height={25}
                priority={true}
              />
            </div>
            {isThrift === "thrift" && (
              <div className="bg-[#A9F27C] px-8 py-1 rounded-md w-fit flex items-center gap-1 font-semibold justify-center absolute top-3 left-3">
                <Image
                  src="/svg/icons/thrift.svg"
                  alt=""
                  width={20}
                  height={20}
                  priority={true}
                />
                Thrift
              </div>
            )}
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="flex justify-between gap-2 text-[11px] text-opacity-90 h-fit">
              <span className="">{category}</span>
              <span className="flex w-fit gap-[3px]">
                {/* <img src={"/svg/icons/star.svg"} /> */}
                {/* <div>
              <span>{average}</span>
              <span>({count})</span>
            </div> */}
                <span>(No Reviews)</span>
              </span>
            </div>
            <div className="flex flex-col justify-between h-[120px] gap-1">
              <span className="font-[400] text-[14px]">{productName}</span>
              <span className="font-[400] flex flex-col justify-start gap-[2px]">
                &#8358;{salePrice.toFixed(0)}{" "}
                <span className="line-through text-text1 text-opacity-60 text-sm">
                  &#8358;{globalPrice.toFixed(0)}
                </span>
              </span>
            </div>
          </div>
        </Link>
      )}
    </Box>
  );
};

export default ProductCard;
