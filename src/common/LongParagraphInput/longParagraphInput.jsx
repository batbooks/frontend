import React, { useState, useEffect, useCallback } from "react";

const LongParagraphInput = ({
  placeholder,
  heightLine = 20,
  setInputValue,
  inputValue = "",
  hideError = () => {},
}) => {
  const [value, setValue] = useState(inputValue);

  useEffect(() => {
    setValue(inputValue);
  }, [inputValue]);
  console.log(inputValue)

  const handleChange = useCallback((e) => {
  const el = e.target;
  const newValue = el.value;
  setInputValue(el.value)

  // تعداد خطوط دیده‌شده را همین تکست‌اِریا واقعی می‌دهد
  const lines = Math.ceil(el.scrollHeight / parseFloat(window.getComputedStyle(el).lineHeight));

  if (lines <= 8) {
    setValue(newValue);
    setInputValue?.(newValue);
    hideError?.("");
  } else {
    hideError?.("حداکثر ۸ خط مجاز است");
  }
}, [setInputValue, hideError]);


  return (
    <textarea
      placeholder={placeholder}
      className="z-3 bg-[#ffffff] h-full w-full text-[15px] rounded-[12px] px-[25.7px] pt-[16.6px] outline-[2px] outline-[#000000]/21"
      value={inputValue}
      onChange={handleChange}
    />
  );
};

export default LongParagraphInput;