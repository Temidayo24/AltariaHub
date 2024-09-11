import React from 'react'

const Button = ({text, isSubmitting}) => {
  return (
      <button
        type="submit"
        className="bg-primary1 flex items-center justify-center w-full mt-3 text-white h-[45px] rounded-lg hover:opacity-button"
      >
        {isSubmitting ? (
          <span className="border-white h-6 w-6 animate-spin rounded-full border-2 border-t-primary1"></span>
        ) : (
          <span className="font-[400] text-[14px]">{text}</span>
        )}
      </button>
  );
}

export default Button