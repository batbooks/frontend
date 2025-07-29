import { useState, useRef, useEffect } from "react";
import { useSharedState } from "./SharedStateProvider";

export function StatusDropDown({ addFilter, filters }) {
  const { checkedNum, setCheckedNum } = useSharedState();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { id: 0, label: "در حال تالیف", value: "وضعیت: در حال تالیف" },
    { id: 1, label: "به اتمام رسیده", value: "وضعیت: به اتمام رسیده" },
    { id: 2, label: "متوقف شده", value: "وضعیت: متوقف شده" },
  ];

  const selectedOption = options.find((option) => option.id === checkedNum);

  // بستن دراپ‌دون با کلیک بیرون از آن
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);


  const handleSelect = (option) => {
    const newCheckedNum = checkedNum === option.id ? -1 : option.id;
    setCheckedNum(newCheckedNum);

    // ابتدا فیلترهای وضعیت موجود را حذف کن
    let updatedFilters = filters?.filter(
      (filter) => !filter.startsWith("وضعیت:")
    ) || [];

    // اگر گزینه‌ی جدیدی انتخاب شده، آن را اضافه کن
    if (newCheckedNum !== -1) {
      updatedFilters = [...updatedFilters, option.value];
    }
    
    addFilter(updatedFilters);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-[10px] w-full lg:w-1/2" ref={dropdownRef}>
      <h2 className="text-[17px] font-[300] ">وضعیت کتاب:</h2>
      <div className="relative ">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="h-[35px] flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm text-right focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
        >
          <span className="text-[17px] font-[400] text-gray-700 text-nowrap">
            {selectedOption ? selectedOption.label : "انتخاب کنید..."}
          </span>
          {/* آیکون فلش */}
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
              isOpen ? "transform rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl">
            <ul className="py-1">
              {options.map((option) => (
                <li
                  key={option.id}
                  onClick={() => handleSelect(option)}
                  className={`px-4 py-3 text-[15px] cursor-pointer hover:bg-gray-100 transition-colors duration-200 ${
                    checkedNum === option.id
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-gray-800"
                  }`}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}