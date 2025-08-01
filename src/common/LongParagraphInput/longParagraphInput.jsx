import React, { useState, useEffect, useCallback } from "react";

const LongParagraphInput = ({
  placeholder,
  heightLine =0.2,
  setInputValue,
  inputValue = "",
  hideError = () => {},
}) => {
  const [value, setValue] = useState(inputValue);

  useEffect(() => {
    setValue(inputValue);
  }, [inputValue]);

  const handleChange = useCallback(
    (e) => {
      const newValue = e.target.value;

      const tempTextarea = document.createElement("textarea");
      tempTextarea.style.lineHeight = `${heightLine}`;
      tempTextarea.style.boxSizing = "border-box";
      tempTextarea.style.whiteSpace = "pre-wrap";
      tempTextarea.value = newValue;

      document.body.appendChild(tempTextarea);

      const lineHeight = 20;
      const padding = 5 * 2;
      const contentHeight = tempTextarea.scrollHeight - padding;
      const lines = Math.ceil(contentHeight / lineHeight);

      document.body.removeChild(tempTextarea);

      if (lines <= 8) {
        setValue(newValue);
        setInputValue(newValue);
        hideError("");
        console.log(newValue)
      }
    },
    [heightLine, setInputValue, hideError]
  );

  return (
    <textarea
      placeholder={placeholder}
      className="z-3 bg-[#ffffff] h-full w-full text-[15px] rounded-[12px] px-[25.7px] pt-[16.6px] outline-[2px] outline-[#000000]/21"
      value={value}
      onChange={handleChange}
    />
  );
};

export default LongParagraphInput;
