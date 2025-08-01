import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

const SearchDropdown = ({ playlistId, onBookAdded }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  const wrapperRef = useRef(null);
  const debouncedQuery = useDebounce(query, 500);
  const defaultImage = "/25.png";

  const handleAddItem = async (book) => {
    try {
      const token = localStorage.getItem("access_token");
      const auth = token ? `Bearer ${token}` : "";
      const response = await fetch(
        `https://batbooks.liara.run/user/playlists/${playlistId}/books/add/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth,
          },
          body: JSON.stringify({ book: book.id }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add book");
      }

      const newBookItem = await response.json();

      // ✅ Pass full book info to parent
      onBookAdded({
        ...newBookItem,
        book: book, // full info from search result
      });

      // Optional cleanup
      setQuery("");
      setResults([]);
    } catch (err) {
      console.error(err.message);
      setTimeout(() => {
        Swal.fire({
          title: "افزودن کتاب با مشکل روبرو شد ",
          icon: "error",
          confirmButtonText: "باشه",
        });
      }, 100);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      if (!debouncedQuery) {
        setResults([]);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);
      setResults([]);

      try {
        const encodedQuery = encodeURIComponent(debouncedQuery);
        const response = await fetch(
          `https://batbooks.liara.run/book/search/${encodedQuery}/`
        );

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setResults(data.results.slice(0, 10));
      } catch (err) {
        setError("خطا در دریافت اطلاعات. لطفاً دوباره تلاش کنید.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [debouncedQuery]);

  // Close dropdown if click happens outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-lg mx-auto mb-5 rtl">
      {/* Search Input */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="جستجوی کتاب..."
          className="w-full py-2 pl-10 pr-4 text-gray-800 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Dropdown */}
      {isFocused && query.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="max-h-96 overflow-y-auto">
            {isLoading && (
              <div className="px-4 py-3 text-gray-500">در حال جستجو...</div>
            )}
            {error && <div className="px-4 py-3 text-red-500">{error}</div>}
            {!isLoading && !error && results.length === 0 && debouncedQuery && (
              <div className="px-4 py-3 text-gray-500">نتیجه‌ای یافت نشد.</div>
            )}
            {!isLoading && !error && results.length > 0 && (
              <ul>
                {results.map((book) => (
                  <li
                    key={book.id}
                    className="flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          book.image
                            ? `https://batbooks.liara.run${book.image}`
                            : defaultImage
                        }
                        alt={`Cover of ${book.name}`}
                        className="w-10 h-14 object-cover rounded-md bg-gray-200"
                      />
                      <div>
                        <span className="font-semibold text-gray-800">
                          {book.name}
                        </span>
                        <div className="text-sm text-gray-500">
                          {book.Author || "نویسنده نامشخص"}
                        </div>
                      </div>
                    </div>
                    <button
                      onMouseDown={(e) => {
                        e.preventDefault(); // prevent blur
                        handleAddItem(book);
                      }}
                      className="btn scale-75 !m-0"
                    >
                      <span className="span-btn">اضافه کردن</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
