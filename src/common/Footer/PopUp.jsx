import React, { useEffect, useRef } from "react";

function Popup({ message, onClose }) {
  const popupRef = useRef(null);

  // بستن با کلیک روی بیرون پاپ‌آپ
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        ref={popupRef}
        className="bg-[#D9F0FF] max-h-[80vh] w-[90%] max-w-[600px] p-6 rounded-lg overflow-y-auto shadow-lg"
      >
        <button
          className="absolute top-4 left-4 text-xl font-bold text-gray-600"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="text-right  space-y-4 popup-content [&_h2]:text-xl [&_h2]:font-bold [&_h3]:text-lg [&_h3]:font-semibold [&_p]:text-sm">
          {message}
        </div>
      </div>
    </div>
  );
}

export default Popup;
