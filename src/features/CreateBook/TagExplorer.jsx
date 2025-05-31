import { useEffect, useState } from "react";

const TagExplorer = ({
  onSelectTags,
  onSelectGenre,
  initialGenres = [],
  initialTags = [],
}) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [genres, setGenres] = useState([]);
  const [tagCategories, setTagCategories] = useState([]);

  // مقداردهی اولیه
  useEffect(() => {
    if (initialGenres.length > 0) {
      setSelectedGenres(initialGenres);
    }
    if (initialTags.length > 0) {
      setSelectedTags(initialTags);
    }
  }, [initialGenres, initialTags]);

  // sync با والد
  useEffect(() => {
    onSelectGenre && onSelectGenre(selectedGenres);
  }, [selectedGenres]);

  useEffect(() => {
    onSelectTags && onSelectTags(selectedTags);
  }, [selectedTags]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("access_token");

        const [genreResponse, tagResponse] = await Promise.all([
          fetch(`/api/tag/genres/`),
          fetch(`/api/tag/tag-categories/`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        if (!genreResponse.ok || !tagResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const genreData = await genreResponse.json();
        const tagData = await tagResponse.json();

        setGenres(genreData.genres);
        setTagCategories(tagData.tag_categories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleGenreClick = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre.id)
        ? prev.filter((id) => id !== genre.id)
        : [...prev, genre.id]
    );
  };

  const tags = tagCategories.flatMap((category) => category.tags || []);
  const filteredTags = searchTerm
    ? tags.filter((tag) => {
        const search = searchTerm.toLowerCase();
        return (
          tag.title.toLowerCase().includes(search) ||
          tag.description.toLowerCase().includes(search)
        );
      })
    : selectedCategory
      ? tags.filter((tag) => tag.category_id === selectedCategory)
      : [];

  const toggleTag = (tag) => {
    const updated = selectedTags.some((t) => t.id === tag.id)
      ? selectedTags.filter((t) => t.id !== tag.id)
      : [...selectedTags, tag];

    setSelectedTags(updated);
  };

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md text-center">
        <p>در حال بارگذاری...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md text-center text-red-500">
        <p>خطا در بارگذاری داده‌ها: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow-md space-y-4 md:space-y-6">
      {/* Genres */}
      <div>
        <h2 dir="rtl" className="text-xl md:text-2xl font-bold mb-2">
          ژانر ها:
        </h2>
        <div dir="rtl" className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre.id}
              className={`px-2 py-1 md:px-3 text-xs md:text-sm rounded-full transition ${
                selectedGenres.includes(genre.id)
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-800 hover:bg-blue-200"
              }`}
              onClick={() => handleGenreClick(genre)}
              title={genre.description}
            >
              {genre.title}
            </button>
          ))}
        </div>
      </div>

      {/* Tag Categories */}
      <div>
        <h2 dir="rtl" className="text-lg md:text-xl font-semibold mb-2">
          دسته بندی های تگ:
        </h2>
        <div dir="rtl" className="flex flex-wrap gap-2 overflow-x-auto pb-2">
          {tagCategories.map((cat) => (
            <button
              key={cat.id}
              className={`px-3 py-1 md:px-4 md:py-2 text-sm md:text-base rounded-full border transition duration-200 whitespace-nowrap ${
                selectedCategory === cat.id
                  ? "bg-blue-600 text-white border-blue-700"
                  : "bg-white text-blue-700 border-blue-300 hover:bg-blue-100"
              }`}
              onClick={() => {
                setSelectedCategory(cat.id);
                setSearchTerm("");
              }}
              title={cat.description}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div>
        <h2 dir="rtl" className="text-lg md:text-xl font-semibold mb-2">
          جستجوی تگ ها:
        </h2>
        <input
          dir="rtl"
          type="text"
          placeholder="جستجوی تگ ها بر اساس نام یا توضیحات تگ..."
          className="w-full p-2 mb-4 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setSelectedCategory(null);
          }}
        />
      </div>

      {/* Tags */}
      <div>
        <h2 dir="rtl" className="text-lg md:text-xl font-semibold mb-2">
          تگ ها:
        </h2>
        <div
          className={`grid ${filteredTags.length === 0 ? "" : "grid-cols-1 md:grid-cols-2"} gap-4`}
        >
          {filteredTags.length === 0 && (
            <p dir="rtl" className="text-gray-500 col-span-full">
              {searchTerm || selectedCategory
                ? "نتیجه‌ای یافت نشد"
                : "لطفا دسته‌بندی را انتخاب کنید یا جستجو کنید"}
            </p>
          )}
          {filteredTags.map((tag) => (
            <button
              key={tag.id}
              className={`text-right w-full p-3 md:p-4 border rounded shadow-sm transition cursor-pointer ${
                selectedTags.some((t) => t.id === tag.id)
                  ? "bg-blue-100 border-blue-400 shadow-md"
                  : "bg-blue-50 border-blue-100 hover:shadow-md"
              }`}
              onClick={() => toggleTag(tag)}
            >
              <h3 className="font-bold text-sm md:text-base">{tag.title}</h3>
              <p className="text-xs md:text-sm text-blue-600 mt-1">
                {tag.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div>
          <h2
            dir="rtl"
            className="text-lg md:text-xl font-semibold text-blue-700 mt-4 md:mt-6 mb-2"
          >
            تگ های انتخاب شده:
          </h2>
          <div dir="rtl" className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <span
                key={tag.id}
                className="bg-blue-200 text-blue-900 px-2 py-1 md:px-3 text-xs md:text-sm rounded-full flex items-center"
              >
                {tag.title}
                <button
                  onClick={() => toggleTag(tag)}
                  className="mr-1 text-blue-700 hover:text-blue-900"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TagExplorer;
