import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // بستن منو با کلیک بیرون
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <div className="md:hidden relative z-50">
      {/* آیکون همبرگر */}
      <button
        className="p-2 text-black hover:text-blue-600 transition"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* منوی موبایل */}
      <div
        ref={menuRef}
        className={`absolute right-0 top-[60px] w-52 bg-white shadow-xl rounded-xl overflow-hidden transform origin-top transition-all duration-300 ease-out ${
          isMenuOpen ? "scale-100 opacity-100 pointer-events-auto" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <ul className="divide-y divide-gray-200 text-right text-gray-800">
          <li>
            <Link
              to="/contact"
              className="block px-5 py-3 hover:bg-blue-100 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              تماس با ما
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="block px-5 py-3 hover:bg-blue-100 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              درباره ما
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className="block px-5 py-3 hover:bg-blue-100 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              خدمات
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="block px-5 py-3 hover:bg-blue-100 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              ورود
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;