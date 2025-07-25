import jalaali from "jalaali-js";
import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import Loading from "../../common/Loading/Loading";
import { AvgScores } from "./AvgScores";
import { CheckBoxes } from "./CheckBoxes";
import { CreationDate } from "./CreationDate";
import { Filter } from "./Filter";
import { FromToInputs } from "./FromToInputs";
import { GenreAndTag } from "./GenreAndTag";
import { KeyWord } from "./KeyWord";
import { SelectedGenreAndTag } from "./SelectedGenreAndTag";
import { SelectedTagCategory } from "./SelectedTagCategory";
import { SharedStateProvider } from "./SharedStateProvider";
import { TagCategory } from "./TagCategory";
import { Writer } from "./Writer";
import { SelectMenu } from "./SelectMenu";

const persianToEnglishDigits = (str) => {
  return str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
};
const convertShamsiToGregorian = (shamsiDateStr) => {
  const normalized = persianToEnglishDigits(shamsiDateStr); // convert digits
  const [jy, jm, jd] = normalized.split("/").map(Number); // convert to numbers
  const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd); // convert to Gregorian
  return `${gy}-${String(gm).padStart(2, "0")}-${String(gd).padStart(2, "0")}`;
};
export function SearchFilters({
  loading2,
  setLoading2,
  setShowingBooks,
  setTotalPages,
  setcurrentpage,
  itemsPerPage,
  setNextPageLink,
  setPrevPageLink,
  showingBooks,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisibleFilters, setIsVisibleFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [tagCategories, setTagCategories] = useState([]);
  const [selectedTagCategories, setSelectedTagCategories] = useState([]);
  const [showingTags, setShowingTags] = useState([]);
  const [showingSelectedTags, setShowingSelectedTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [allSelectedTags, setAllSelectedTags] = useState([]);
  const [fromValueChapter, setFromValueChapter] = useState("1");
  const [toValueChapter, setToValueChapter] = useState("9999");
  const [fromValueFav, setFromValueFav] = useState("1");
  const [toValueFav, setToValueFav] = useState("99999");
  const [fromValueScorer, setFromValueScorer] = useState("1");
  const [toValueScorer, setToValueScorer] = useState("99999");
  const [searchKey, setSearchKey] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [showingBooksSearchWord, setShowingBooksSearchWord] = useState("");
  const [isBlankSearchWord, setIsBlankSearchWord] = useState(false);
  const filterNum = (filters || []).length;
  const genreIds = useRef([]);
  const tagIds = useRef([]);

  function handleAdvancedSearch() {
    const Query = filters.reduce((acc, filter, i) => {
      if (filter.includes("ژانر: ")) {
        genreIds.current = [
          ...genreIds.current,
          String(
            selectedGenres.find(
              (genre) => genre.title === filter.replace("ژانر: ", "")
            ).id
          ),
        ];
      }
      if (filter.includes("تگ: ")) {
        tagIds.current = [
          ...tagIds.current,
          String(
            allSelectedTags.find(
              (tag) => tag.title === filter.replace("تگ: ", "")
            ).id
          ),
        ];
      }
      if (filter.includes("تعداد فصل ها: از")) {
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return (
          acc +
          "&chapter_count_min=" +
          filter.replace("تعداد فصل ها: از ", "").replace(" فصل", "")
        );
      } else if (filter.includes("تعداد فصل ها: تا")) {
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return (
          acc +
          "&chapter_count_max=" +
          filter.replace("تعداد فصل ها: تا ", "").replace(" فصل", "")
        );
      } else if (filter.includes("تعداد فصل ها: ")) {
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return (
          acc +
          "&chapter_count_min=" +
          filter.replace("تعداد فصل ها: ", "").replace(" فصل", "") +
          "&chapter_count_max=" +
          filter.replace("تعداد فصل ها: ", "").replace(" فصل", "")
        );
      }
      if (filter.includes("تعداد پسندیده ها: از")) {
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return (
          acc +
          "&favorite_count_min=" +
          filter.replace("تعداد پسندیده ها: از ", "").replace(" نفر", "")
        );
      } else if (filter.includes("تعداد پسندیده ها: تا")) {
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return (
          acc +
          "&favorite_count_max=" +
          filter.replace("تعداد پسندیده ها: تا ", "").replace(" نفر", "")
        );
      } else if (filter.includes("تعداد پسندیده ها: ")) {
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return (
          acc +
          "&favorite_count_min=" +
          filter.replace("تعداد پسندیده ها: ", "").replace(" نفر", "") +
          "&favorite_count_max=" +
          filter.replace("تعداد پسندیده ها: ", "").replace(" نفر", "")
        );
      }
      if (filter.includes("تعداد امتیازدهندگان: از")) {
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return (
          acc +
          "&number_rating_min=" +
          filter.replace("تعداد امتیازدهندگان: از ", "").replace(" نفر", "")
        );
      } else if (filter.includes("تعداد امتیازدهندگان: تا")) {
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return (
          acc +
          "&number_rating_max=" +
          filter.replace("تعداد امتیازدهندگان: تا ", "").replace(" نفر", "")
        );
      } else if (filter.includes("تعداد امتیازدهندگان: ")) {
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return (
          acc +
          "&number_rating_min=" +
          filter.replace("تعداد امتیازدهندگان: ", "").replace(" نفر", "") +
          "&number_rating_max=" +
          filter.replace("تعداد امتیازدهندگان: ", "").replace(" نفر", "")
        );
      }
      if (filter.includes("میانگین امتیاز: از")) {
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return acc + "&rating_min=" + filter.replace("میانگین امتیاز: از ", "");
      } else if (filter.includes("میانگین امتیاز: تا")) {
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return acc + "&rating_max=" + filter.replace("میانگین امتیاز: تا ", "");
      } else if (filter.includes("میانگین امتیاز: ")) {
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return (
          acc +
          "&rating_min=" +
          filter.replace("میانگین امتیاز: ", "") +
          "&rating_max=" +
          filter.replace("میانگین امتیاز: ", "")
        );
      }
      if (filter.includes("وضعیت: ")) {
        const newStr = filter.replace("وضعیت: ", "");
        const status =
          newStr === "متوقف شده"
            ? "H"
            : newStr === "به اتمام رسیده"
              ? "C"
              : newStr === "در حال تالیف"
                ? "O"
                : null;
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return acc + "&status=" + status;
      }
      if (filter.includes("نویسنده: ")) {
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return acc + "&user=" + filter.replace("نویسنده: ", "");
      }
      if (filter.includes("کلید: ")) {
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return acc + "&description=" + filter.replace("کلید: ", "");
      }
      if (filter.includes("تاریخ ایجاد: از")) {
        const miladi = convertShamsiToGregorian(
          filter.replace("تاریخ ایجاد: از ", "")
        );
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return acc + "&date_after=" + miladi;
      } else if (filter.includes("تاریخ ایجاد: تا")) {
        const miladi = convertShamsiToGregorian(
          filter.replace("تاریخ ایجاد: تا ", "")
        );
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return acc + "&date_before=" + miladi;
      } else if (filter.includes("تاریخ ایجاد: ")) {
        const miladi = convertShamsiToGregorian(
          filter.replace("تاریخ ایجاد: ", "")
        );
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return acc + "&date_after=" + miladi + "&date_before=" + miladi;
      }
      if (filter.includes("مرتب سازی براساس: ")) {
        const newStr = filter.replace("مرتب سازی براساس: ", "");
        const status =
          newStr === "تازه ترین"
            ? "updated_at"
            : newStr === "محبوب ترین"
              ? "-avg_rating"
              : newStr === "حروف الفبا"
                ? "name"
                : newStr === "تعداد فصل ها"
                  ? "chapter_count"
                  : null;
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return acc + "&ordering=" + status;
      }
      if (filters.length === i + 1 && genreIds.current.length !== 0) {
        acc = acc + "&genre_or=" + genreIds.current.join(",");
      }
      if (filters.length === i + 1 && tagIds.current.length !== 0) {
        acc = acc + "&tag_or=" + tagIds.current.join(",");
      }
      return acc;
    }, `?search=${showingBooksSearchWord}`);

    const fetchAdvancedSearchBook = async () => {
      try {
        setLoading2(true);
        const response = await fetch(
          `http://127.0.0.1:8000/advance/${Query}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          setLoading2(false);
          throw new Error("مشکلی پیش اومد...دوباره تلاش کنید");
        } else {
          const data = await response.json();
          setcurrentpage(1);
          setTotalPages(Math.ceil(data.count / itemsPerPage));
          setNextPageLink(data.next?.replace("http://127.0.0.1:8000/", ""));
          setPrevPageLink(
            data.previous?.replace("http://127.0.0.1:8000/", "")
          );
          setShowingBooks(data.results);
        }
      } catch (err) {
        setTimeout(() => {
          Swal.fire({
            title: `${err.message}`,
            icon: "error",
            confirmButtonText: "باشه",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }, 100);
      }
    };
    fetchAdvancedSearchBook();
  }

  function handleSimpleSearch() {
    const Query = filters.reduce((acc, filter, i) => {
      if (filter.includes("ژانر: ")) {
        genreIds.current = [
          ...genreIds.current,
          String(
            selectedGenres.find(
              (genre) => genre.title === filter.replace("ژانر: ", "")
            ).id
          ),
        ];
      }
      if (filter.includes("تگ: ")) {
        tagIds.current = [
          ...tagIds.current,
          String(
            allSelectedTags.find(
              (tag) => tag.title === filter.replace("تگ: ", "")
            ).id
          ),
        ];
      }
      if (filter.includes("تعداد فصل ها: از")) {
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return (
          acc +
          "&chapter_count_min=" +
          filter.replace("تعداد فصل ها: از ", "").replace(" فصل", "")
        );
      } else if (filter.includes("تعداد فصل ها: تا")) {
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return (
          acc +
          "&chapter_count_max=" +
          filter.replace("تعداد فصل ها: تا ", "").replace(" فصل", "")
        );
      } else if (filter.includes("تعداد فصل ها: ")) {
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return (
          acc +
          "&chapter_count_min=" +
          filter.replace("تعداد فصل ها: ", "").replace(" فصل", "") +
          "&chapter_count_max=" +
          filter.replace("تعداد فصل ها: ", "").replace(" فصل", "")
        );
      }
      if (filter.includes("تعداد پسندیده ها: از")) {
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return (
          acc +
          "&favorite_count_min=" +
          filter.replace("تعداد پسندیده ها: از ", "").replace(" نفر", "")
        );
      } else if (filter.includes("تعداد پسندیده ها: تا")) {
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return (
          acc +
          "&favorite_count_max=" +
          filter.replace("تعداد پسندیده ها: تا ", "").replace(" نفر", "")
        );
      } else if (filter.includes("تعداد پسندیده ها: ")) {
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return (
          acc +
          "&favorite_count_min=" +
          filter.replace("تعداد پسندیده ها: ", "").replace(" نفر", "") +
          "&favorite_count_max=" +
          filter.replace("تعداد پسندیده ها: ", "").replace(" نفر", "")
        );
      }
      if (filter.includes("تعداد امتیازدهندگان: از")) {
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return (
          acc +
          "&number_rating_min=" +
          filter.replace("تعداد امتیازدهندگان: از ", "").replace(" نفر", "")
        );
      } else if (filter.includes("تعداد امتیازدهندگان: تا")) {
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return (
          acc +
          "&number_rating_max=" +
          filter.replace("تعداد امتیازدهندگان: تا ", "").replace(" نفر", "")
        );
      } else if (filter.includes("تعداد امتیازدهندگان: ")) {
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return (
          acc +
          "&number_rating_min=" +
          filter.replace("تعداد امتیازدهندگان: ", "").replace(" نفر", "") +
          "&number_rating_max=" +
          filter.replace("تعداد امتیازدهندگان: ", "").replace(" نفر", "")
        );
      }
      if (filter.includes("میانگین امتیاز: از")) {
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return acc + "&rating_min=" + filter.replace("میانگین امتیاز: از ", "");
      } else if (filter.includes("میانگین امتیاز: تا")) {
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return acc + "&rating_max=" + filter.replace("میانگین امتیاز: تا ", "");
      } else if (filter.includes("میانگین امتیاز: ")) {
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return (
          acc +
          "&rating_min=" +
          filter.replace("میانگین امتیاز: ", "") +
          "&rating_max=" +
          filter.replace("میانگین امتیاز: ", "")
        );
      }
      if (filter.includes("وضعیت: ")) {
        const newStr = filter.replace("وضعیت: ", "");
        const status =
          newStr === "متوقف شده"
            ? "H"
            : newStr === "به اتمام رسیده"
              ? "C"
              : newStr === "در حال تالیف"
                ? "O"
                : null;
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return acc + "&status=" + status;
      }
      if (filter.includes("نویسنده: ")) {
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return acc + "&user=" + filter.replace("نویسنده: ", "");
      }
      if (filter.includes("کلید: ")) {
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return acc + "&description=" + filter.replace("کلید: ", "");
      }
      if (filter.includes("تاریخ ایجاد: از")) {
        const miladi = convertShamsiToGregorian(
          filter.replace("تاریخ ایجاد: از ", "")
        );
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return acc + "&date_after=" + miladi;
      } else if (filter.includes("تاریخ ایجاد: تا")) {
        const miladi = convertShamsiToGregorian(
          filter.replace("تاریخ ایجاد: تا ", "")
        );
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return acc + "&date_before=" + miladi;
      } else if (filter.includes("تاریخ ایجاد: ")) {
        const miladi = convertShamsiToGregorian(
          filter.replace("تاریخ ایجاد: ", "")
        );
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return acc + "&date_after=" + miladi + "&date_before=" + miladi;
      }
      if (filter.includes("مرتب سازی براساس: ")) {
        const newStr = filter.replace("مرتب سازی براساس: ", "");
        const status =
          newStr === "تازه ترین"
            ? "updated_at"
            : newStr === "محبوب ترین"
              ? "-avg_rating"
              : newStr === "حروف الفبا"
                ? "name"
                : newStr === "تعداد فصل ها"
                  ? "chapter_count"
                  : null;
        if (filters.length === i + 1 && genreIds.current.length !== 0) {
          acc = acc + "&genre_or=" + genreIds.current.join(",");
        }
        if (filters.length === i + 1 && tagIds.current.length !== 0) {
          acc = acc + "&tag_or=" + tagIds.current.join(",");
        }
        return acc + "&ordering=" + status;
      }
      if (filters.length === i + 1 && genreIds.current.length !== 0) {
        acc = acc + "&genre_or=" + genreIds.current.join(",");
      }
      if (filters.length === i + 1 && tagIds.current.length !== 0) {
        acc = acc + "&tag_or=" + tagIds.current.join(",");
      }
      return acc;
    }, `?search=${searchWord}`);
    const Query2 = filters.reduce((acc, filter) => {
      if (filter.includes("مرتب سازی براساس: ")) {
        const newStr = filter.replace("مرتب سازی براساس: ", "");
        const status =
          newStr === "تازه ترین"
            ? "updated_at"
            : newStr === "محبوب ترین"
              ? "-avg_rating"
              : newStr === "حروف الفبا"
                ? "name"
                : newStr === "تعداد فصل ها"
                  ? "chapter_count"
                  : null;
        return acc + "&ordering=" + status;
      }
      return acc;
    }, `?search=${searchWord}`);
    const fetchSimpleSearchBook = async () => {
      try {
        if (searchWord.trim() !== "") {
          setLoading2(true);
          console.log(Query);
          const response = isVisibleFilters
            ? await fetch(`http://127.0.0.1:8000/advance/${Query}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              })
            : await fetch(`http://127.0.0.1:8000/advance/${Query2}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              });
          if (!response.ok) {
            setLoading2(false);
            throw new Error("مشکلی پیش اومد...دوباره تلاش کنید");
          } else {
            const data = await response.json();
            setIsVisibleFilters(false);
            setShowingBooksSearchWord(searchWord);
            setcurrentpage(1);
            setTotalPages(Math.ceil(data.count / itemsPerPage));
            setNextPageLink(data.next?.replace("http://127.0.0.1:8000/", ""));
            setPrevPageLink(
              data.previous?.replace("http://127.0.0.1:8000/", "")
            );
            setShowingBooks(data.results);
          }
        } else setIsBlankSearchWord(true);
      } catch (err) {
        setTimeout(() => {
          Swal.fire({
            title: `${err.message}`,
            icon: "error",
            confirmButtonText: "باشه",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }, 100);
      }
    };
    fetchSimpleSearchBook();
  }

  useEffect(() => {
    const fetchGenresAndTags = async () => {
      setLoading(true);
      const response = await fetch(`http://127.0.0.1:8000/tag/genres/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response2 = await fetch(
        `http://127.0.0.1:8000/tag/tag-categories/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      const data2 = await response2.json();
      setGenres(data.genres);
      setTagCategories(data2.tag_categories);
      const alllTags = data2.tag_categories.reduce((acc, tagCategory) => {
        return [...acc, ...tagCategory.tags];
      }, []);
      setShowingTags(alllTags);
      setAllTags(alllTags);
    };
    try {
      fetchGenresAndTags();
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedTagCategories.length === 0) {
      if (searchKey.trim() === "") {
        setShowingTags(allTags);
        setShowingSelectedTags(allSelectedTags);
      } else {
        setShowingTags(
          allTags.filter(
            (searchingTag) =>
              searchingTag.title.includes(searchKey.trim()) ||
              searchingTag.description.includes(searchKey.trim())
          )
        );
        setShowingSelectedTags(
          allSelectedTags.filter(
            (searchingSelectedTag) =>
              searchingSelectedTag.title.includes(searchKey.trim()) ||
              searchingSelectedTag.description.includes(searchKey.trim())
          )
        );
      }
    } else {
      setShowingTags(
        selectedTagCategories
          .reduce((acc, tagCategory) => {
            return [...acc, ...tagCategory.tags];
          }, [])
          .filter((searchingTag) =>
            allTags.some(
              (unselected) =>
                (searchingTag.title.includes(searchKey.trim()) ||
                  searchingTag.description.includes(searchKey.trim())) &&
                unselected.title === searchingTag.title
            )
          )
      );
      setShowingSelectedTags(
        selectedTagCategories
          .reduce((acc, tagCategory) => {
            return [...acc, ...tagCategory.tags];
          }, [])
          .filter((searchingSelectedTag) =>
            allSelectedTags.some(
              (selected) =>
                (searchingSelectedTag.title.includes(searchKey.trim()) ||
                  searchingSelectedTag.description.includes(
                    searchKey.trim()
                  )) &&
                selected.title === searchingSelectedTag.title
            )
          )
      );
    }
  }, [selectedTagCategories, allTags, allSelectedTags, searchKey]);

  return (
    <div className="flex flex-col items-center w-full">
      <form
        className="mb-[37px] w-full lg:w-fit"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex sm:gap-[26px] gap-[5px] w-full lg:w-fit">
          <button
            onClick={() => setIsVisibleFilters(!isVisibleFilters)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="!py-[12px] px-[15px] sm:!px-[28px] !rounded-[20px] !w-fit !h-fit !mb-0 !ml-0 !mr-0 shadow-2xl btn"
          >
            <span className="span-btn hidden sm:block !text-[16px] !font-[400] text-nowrap">
              جستجوی پیشرفته
            </span>
            {isHovered ? (
              <img
                src="/images/filter.png"
                alt="filter"
                className="min-w-[30px] max-w-[30px] min-h-[30px] max-h-[30px] sm:hidden"
              />
            ) : (
              <img
                src="/images/filter3.png"
                alt="filter"
                className="min-w-[30px] max-w-[30px] min-h-[30px] max-h-[30px] sm:hidden"
              />
            )}
          </button>
          <div className="relative flex w-full lg:w-fit">
            <input
              value={searchWord}
              onChange={(e) => {
                setSearchWord(e.target.value);
                setIsBlankSearchWord(false);
              }}
              onBlur={() => setIsBlankSearchWord(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSimpleSearch();
                  tagIds.current = [];
                  genreIds.current = [];
                }
              }}
              className="lg:w-[693px] w-full h-[49px] py-[12.5px] pr-[26px] pl-[50px] bg-white rounded-[20px] outline-[2px] outline-[#000000]/21 shadow-lg shadow-[#000000]/25 focus:shadow-none focus:outline-[3px] focus:outline-[#2663cd] placeholder:text-[16px] placeholder:font-[300] placeholder:text-[#265073]"
              placeholder="نام کتاب"
            />
            <img
              src="/images/search.png"
              alt="search"
              className="absolute left-[14px] top-[12px]"
            />
            {isBlankSearchWord ? (
              <p className="text-red-500 absolute mt-[55px] mr-[25px]">
                این فیلد خالی است.لطفا چیزی بنویسید...
              </p>
            ) : null}
          </div>
        </div>
      </form>
      <SharedStateProvider>
        <div
          className={`flex flex-col w-full bg-[#A4C0ED] rounded-[20px] border-[2px] border-[#000000]/21 px-[10px] sm:px-[55px] pt-[30px] pb-[50px] mb-[37px] ${isVisibleFilters ? "visible" : "hidden"}`}
        >
          <div className="flex flex-col gap-[17px] w-full">
            <div className="flex justify-between items-center">
              <div className="flex gap-[3px] items-center">
                <img
                  src="/images/filter.png"
                  alt="filter"
                  className="min-w-[30px] max-w-[30px] min-h-[30px] max-h-[30px]"
                />
                <h2 className="text-[20px] font-[300] ">
                  فیلترها ({filterNum})
                </h2>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mx-0 gap-[11px] mb-[20px]">
              {filters?.map((filter, i) => (
                <Filter
                  key={i}
                  filterName={filter}
                  deleteFilter={setFilters}
                  filters={filters}
                  unselectedGenres={genres}
                  setUnselectedGenres={setGenres}
                  selectedGenres={selectedGenres}
                  deleteSelectedGenres={setSelectedGenres}
                  allUnselectedTags={allTags}
                  setAllUnselectedTags={setAllTags}
                  allSelectedTags={allSelectedTags}
                  deleteAllSelectedTags={setAllSelectedTags}
                  setFromValueChapter={setFromValueChapter}
                  setFromValueFav={setFromValueFav}
                  setFromValueScorer={setFromValueScorer}
                  setToValueChapter={setToValueChapter}
                  setToValueFav={setToValueFav}
                  setToValueScorer={setToValueScorer}
                />
              ))}
            </div>
          </div>
          <h2 className="border-t-[1px] border-000000] pt-[20px] text-[20px] font-[300]  mb-[17px]">
            ژانرها:
          </h2>
          <div
            className={`${!(selectedGenres.length === 0 && genres.length === 0) ? "grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-[25px] gap-y-[33px] overflow-y-scroll max-h-[155px]" : "scrollbar-opacity-0"} sm:mx-[30px] p-[20px] bg-[#FFF] rounded-[15px] border-[2px] border-[#000000]/21 mb-[50px]`}
          >
            {loading ? (
              <Loading />
            ) : (
              selectedGenres.map((genre) => (
                <div key={genre.id} className="flex flex-col items-center">
                  <SharedStateProvider>
                    <SelectedGenreAndTag
                      Obj={genre}
                      deleteFilter={setFilters}
                      filters={filters}
                      selected={selectedGenres}
                      addSelected={setSelectedGenres}
                      unselected={genres}
                      deleteUnselected={setGenres}
                    />
                  </SharedStateProvider>
                </div>
              ))
            )}
            {loading
              ? null
              : genres.map((genre) => (
                  <div key={genre.id} className="flex flex-col items-center">
                    <SharedStateProvider>
                      <GenreAndTag
                        Obj={genre}
                        addFilter={setFilters}
                        filters={filters}
                        selected={selectedGenres}
                        addSelected={setSelectedGenres}
                        unselected={genres}
                        deleteUnselected={setGenres}
                      />
                    </SharedStateProvider>
                  </div>
                ))}
            {genres.length === 0 && selectedGenres.length === 0 ? (
              <p className="text-[18px] mx-auto text-red-500">
                مشکلی در اتصال به اینترنت بوجود آمد
              </p>
            ) : null}
          </div>
          <h2 className="text-[20px] font-[300]  mb-[17px]">
            دسته بندی تگ ها:
          </h2>
          <div
            className={`${!(tagCategories.length === 0 && selectedTagCategories.length === 0) ? "grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-[25px] gap-y-[33px] overflow-y-scroll max-h-[155px]" : "scrollbar-opacity-0"} sm:mx-[30px] p-[20px] bg-[#FFF] rounded-[15px] border-[2px] border-[#000000]/21 mb-[17px]`}
          >
            {loading
              ? null
              : selectedTagCategories.map((tagCategory) => (
                  <SelectedTagCategory
                    key={tagCategory.id}
                    Obj={tagCategory}
                    selected={selectedTagCategories}
                    addSelected={setSelectedTagCategories}
                    unselected={tagCategories}
                    deleteUnselected={setTagCategories}
                  />
                ))}
            {loading ? (
              <Loading />
            ) : (
              tagCategories.map((tagCategory) => (
                <TagCategory
                  key={tagCategory.id}
                  Obj={tagCategory}
                  selected={selectedTagCategories}
                  addSelected={setSelectedTagCategories}
                  unselected={tagCategories}
                  deleteUnselected={setTagCategories}
                />
              ))
            )}
            {tagCategories.length === 0 &&
            selectedTagCategories.length === 0 ? (
              <p className="text-[18px] mx-auto text-red-500">
                مشکلی در اتصال به اینترنت بوجود آمد
              </p>
            ) : null}
          </div>
          <h2 className="text-[20px] font-[300] mb-[17px]">جستجوی تگ ها:</h2>
          <input
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            className="p-[12px] mb-[17px] w-full sm:w-[calc(100%-60px)] mx-auto bg-white text-[16px] font-[300] max-h-[40px] rounded-[6px] outline-[2px] outline-[#000000]/21 focus:outline-[3px] focus:outline-[#2663cd] placeholder:text-[16px] placeholder:font-[300] placeholder:text-[#265073]"
            placeholder="تگ مورد نظر خود را اینجا جستجو کنید..."
          ></input>
          <div
            className={`${!(showingTags.length === 0 && showingSelectedTags.length === 0) ? "grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-[25px] gap-y-[33px] overflow-y-scroll max-h-[155px]" : "scrollbar-opacity-0"} sm:mx-[30px] p-[20px] bg-[#FFF] rounded-[15px] border-[2px] border-[#000000]/21 mb-[50px]`}
          >
            {loading
              ? null
              : showingSelectedTags.map((tag) => (
                  <SelectedGenreAndTag
                    Obj={tag}
                    key={tag.id}
                    deleteFilter={setFilters}
                    filters={filters}
                    selected={showingSelectedTags}
                    addSelected={setShowingSelectedTags}
                    unselected={showingTags}
                    deleteUnselected={setShowingTags}
                    allSelected={allSelectedTags}
                    addAllSelected={setAllSelectedTags}
                    allUnselected={allTags}
                    deleteAllUnselected={setAllTags}
                  />
                ))}
            {loading ? (
              <Loading />
            ) : (
              showingTags.map((tag) => (
                <GenreAndTag
                  Obj={tag}
                  key={tag.id}
                  addFilter={setFilters}
                  filters={filters}
                  selected={showingSelectedTags}
                  addSelected={setShowingSelectedTags}
                  unselected={showingTags}
                  deleteUnselected={setShowingTags}
                  allSelected={allSelectedTags}
                  addAllSelected={setAllSelectedTags}
                  allUnselected={allTags}
                  deleteAllUnselected={setAllTags}
                />
              ))
            )}
            {showingTags.length === 0 && showingSelectedTags.length === 0 ? (
              <p className="text-[18px] mx-auto text-red-500">
                موردی برای نمایش وجود ندارد
              </p>
            ) : null}
          </div>
          <div className="flex flex-col lg:flex-row justify-between gap-[50px] sm:w-[calc(100%-30px)] mb-[50px]">
            <div className="flex flex-col gap-[17px] w-full lg:w-1/3">
              <h2 className="text-[20px] font-[300]">تعداد فصل ها:</h2>
              <FromToInputs
                maxValue={"9999"}
                valueLength={4}
                setFilters={setFilters}
                filterPattern={"chapter"}
                fromValue={fromValueChapter}
                toValue={toValueChapter}
                setFromValue={setFromValueChapter}
                setToValue={setToValueChapter}
              />
            </div>
            <div className="flex flex-col gap-[17px] w-full lg:w-1/3">
              <h2 className="text-[20px] font-[300] ">تعداد پسندیدگان:</h2>
              <FromToInputs
                maxValue={"99999"}
                valueLength={5}
                setFilters={setFilters}
                filterPattern={"fav"}
                fromValue={fromValueFav}
                toValue={toValueFav}
                setFromValue={setFromValueFav}
                setToValue={setToValueFav}
              />
            </div>
            <div className="flex flex-col gap-[17px] w-full lg:w-1/3">
              <h2 className="text-[20px] font-[300] ">تعداد امتیازدهندگان:</h2>
              <FromToInputs
                maxValue={"99999"}
                valueLength={5}
                setFilters={setFilters}
                filterPattern={"scorer"}
                fromValue={fromValueScorer}
                toValue={toValueScorer}
                setFromValue={setFromValueScorer}
                setToValue={setToValueScorer}
              />
            </div>
          </div>
          <div className="flex gap-[50px] flex-col lg:flex-row justify-between sm:w-[calc(100%-30px)] 2xl:w-[calc(100%-60px)] items-center mb-[50px]">
            <AvgScores setFilters={setFilters} />
            <CheckBoxes addFilter={setFilters} filters={filters} />
            <Writer setFilters={setFilters} />
          </div>
          <div className="flex flex-col lg:flex-row items-center sm:w-[calc(100%-30px)] 2xl:w-[calc(100%-60px)] gap-[50px] mt-[25px] mb-[60px]">
            <KeyWord setFilters={setFilters} />
            <CreationDate setFilters={setFilters} />
          </div>
          <button
            onClick={() => {
              handleAdvancedSearch();
              tagIds.current = [];
              genreIds.current = [];
            }}
            className="btn !w-fit !h-fit !mb-0 px-[26px] py-[12px] !rounded-[20px] border-[2px] border-[#000000]/21 active:border-0"
          >
            <span className="span-btn !text-[16px] !font-[400]">
              اعمال تمامی فیلترها
            </span>
          </button>
        </div>
        <SelectMenu
          setFilters={setFilters}
          loading={loading2}
          showingBooks={showingBooks}
        />
      </SharedStateProvider>
    </div>
  );
}
