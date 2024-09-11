import Link from 'next/link';
import React from 'react'

const Button = ({text, bgColor, path, textColor, arrowWhite}) => {
  return (
    <Link href={path} className="hover:scale-[1.05] ease-in delay-75 w-fit">
      <button
        className={`h-10 w-fit px-2 rounded-lg text-sm flex justify-center items-center gap-2 border-none ${bgColor} ${textColor}`}
      >
        {text}
        {arrowWhite ? (
          <img src="/svg/icons/arrow-right-white.svg" />
        ) : (
          <img src="/svg/icons/arrow-right-orange.svg" />
        )}
      </button>
    </Link>
  );
}

export default Button