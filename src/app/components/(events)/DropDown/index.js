import Image from "next/image";
import { useState } from "react";

const CustomDropdown = ({ options, label, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelect = (value) => {
    setSelectedValue(value);
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        className="bg-transparent pr-4 pc:pr-8 flex items-center gap-1 cursor-pointer text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{label}</span>
        <Image
          src={"/svg/icons/caret-down.svg"}
          alt=""
          height={18}
          width={20}
          className=""
          priority={true}
        />
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg mt-1 z-10 max-h-40 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option}
              className="p-2 hover:bg-gray-200 cursor-pointer text-xs"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown