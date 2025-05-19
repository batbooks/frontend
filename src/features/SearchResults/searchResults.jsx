import { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import Navbar from "../../common/Navbar/navbar";
import Footer from "../../common/Footer/Footer";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router";
import Loading from "../../common/Loading/Loading";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Swal from "sweetalert2";

const SharedStateContext = createContext();

export default function SearchResults({ searchingItem = "book" }) {
  const [allOfThem, setAllOfThem] = useState(true);
  const [people, setPeople] = useState([]);
  const [showingBooks, setShowingBooks] = useState([1, 2]);
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentpage, setcurrentpage] = useState(1);
  const [currentpage1, setcurrentpage1] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searched, setSearched] = useState("");
  const [loading2, setLoading2] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    if (searchingItem === "book") {
      const fetchAllBooks = async () => {
        setLoading2(true);
        try {
          const response = await fetch(`/api/book/all/`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            throw new Error("مشکلی پیش اومد...دوباره تلاش کنید");
          }
          const data = await response.json();
          setShowingBooks(data);
        } catch (err) {
          setTimeout(() => {
            Swal.fire({
              title: `${err.message}`,
              icon: "error",
              confirmButtonText: "تلاش مجدد",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }, 100);
        } finally {
          setLoading2(false);
        }
      };
      fetchAllBooks();
    }
  }, [searchingItem]);

  useEffect(() => {
    if (searchingItem === "forum") {
      const fetchForums = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/forum/?page=${currentpage}`);
          if (response.ok) {
            const data = await response.json();
            setForums(data.results);
            setTotalPages(Math.ceil(data.count / itemsPerPage));
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchForums();
    }
    if (searchingItem === "people") {
      const fetchPeople = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/user/users/all/?page=${currentpage}`);
          if (response.ok) {
            const data = await response.json();
            setPeople(data.results);
            setTotalPages(Math.ceil(data.count / itemsPerPage));
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchPeople();
    }
  }, [searchingItem, currentpage]);

  const fetchPeople = async (page = 1) => {
    console.log(currentpage1);
    setLoading(true);
    setAllOfThem(false);
    console.log(page);
    if (searched.length < 3) {
      setError(" کلمه سرچ شده باید بزرگتر از سه حرف باشد ");
      setTotalPages(0);
      setPeople([]);
    }
    try {
      const response = await fetch(
        `/api/user/search/${searched}/?page=${page}`
      );
      if (response.ok) {
        const data = await response.json();
        setPeople(data.results);
        setTotalPages(Math.ceil(data.count / itemsPerPage));
      }
    } catch (err) {
      if (searched.length < 3) {
        setError(" کلمه سرچ شده باید بزرگتر از سه حرف باشد ");
      }
      console.log(error);
      setError(err.message);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = (page) => {
    setcurrentpage(page);
  };
  const handlePageChangeSearched = (page) => {
    setcurrentpage1(page);

    fetchPeople(page);
  };
  if (loading) {
    return (
      <div className="h-[100vh] grid place-items-center">
        <Loading />
      </div>
    );
  }
  return (
    <>
      <Navbar />
      <main
        dir="rtl"
        className={`flex flex-col items-center pt-[25px] pb-[60px] ${searchingItem === "book" ? "px-[50px]" : "px-[98px]"} w-[100%]`}
      >
        <h1 className="font-bold text-[#265073] text-[32px] mb-[30px]">
          {searchingItem === "book"
            ? "جستجوی کتاب"
            : searchingItem === "people"
              ? "افراد"
              : "تالار گفتگو"}
        </h1>
        <form className="mb-[37px]" onSubmit={(e) => e.preventDefault()}>
          <div className={`flex gap-[26px]`}>
            {searchingItem === "people" ? (
              <input
                onChange={(e) => {
                  setSearched(e.target.value);
                }}
                className="w-[693px] h-[49px] py-[12.5px] pr-[26px] pl-[50px] bg-white rounded-[20px] outline-[2px] outline-[#000000]/21 shadow-lg shadow-[#000000]/25 focus:shadow-none focus:outline-[3px] focus:outline-[#2663cd] placeholder:text-[16px] placeholder:font-[300] placeholder:text-[#265073]"
                placeholder="نام کاربری"
              />
            ) : searchingItem === "forum" ? (
              <input
                className="w-[693px] h-[49px] py-[12.5px] px-[26px] bg-white rounded-[20px] outline-[2px] outline-[#000000]/21 shadow-lg shadow-[#000000]/25 focus:shadow-none focus:outline-[3px] focus:outline-[#2663cd] placeholder:text-[16px] placeholder:font-[300] placeholder:text-[#265073]"
                placeholder="نام کتاب"
              />
            ) : null}

            {searchingItem === "forum" ? (
              <button className="!py-[12px] !px-[28px] !rounded-[20px] !w-fit !h-fit !mb-0 !ml-0 !mr-0 shadow-2xl btn">
                <span className="span-btn !text-[16px] !font-[400]">
                  جستجوی گفتگو
                </span>
              </button>
            ) : searchingItem === "people" ? (
              <button
                onClick={() => {
                  if (searchingItem == "people") {
                    fetchPeople();
                  }
                  setcurrentpage1(1);
                  setTotalPages(0);
                }}
                className="!py-[12px] !px-[28px] !rounded-[20px] !w-fit !h-fit !mb-0 !ml-0 !mr-0 shadow-2xl btn"
              >
                <span className="span-btn !text-[16px] !font-[400]">
                  جستجوی فرد
                </span>
              </button>
            ) : null}
          </div>
        </form>
        {searchingItem === "book" ? (
          <SearchFilters
            setLoading2={setLoading2}
            setShowingBooks={setShowingBooks}
          />
        ) : null}
        <div className="flex flex-col w-[100%]">
          {error == "" ? <div>{error} asda </div> : null}
          {searchingItem !== "book" ? (
            <h2 className="text-[16px] font-[300] mb-[31px]">نتایج جستجو</h2>
          ) : showingBooks.length === 0 ? (
            <>
              <h2 className="text-[16px] right-0 font-[300]">نتایج جستجو</h2>
              <p className="text-[24px] mx-auto">موردی یافت نشد</p>
            </>
          ) : (
            <SearchBookResults books={showingBooks} loading2={loading2} />
          )}
          {searchingItem === "forum" ? (
            <div>
              {loading && (
                <div className="text-center py-4">در حال بارگذاری...</div>
              )}
              {error && (
                <div className="text-center text-red-500 py-4">
                  خطا: {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-[25px] mb-[30px]">
                {forums.length > 0 ? (
                  forums.map((forum) => (
                    <Forum
                      key={forum.id}
                      forumId={forum.id}
                      forumName={forum.name}
                      forumDescription={forum.description}
                      createdAt={forum.created_at}
                      bookId={forum.book}
                      forumImage={forum.image}
                    />
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8 text-[#265073] text-lg">
                    {loading ? "در حال بارگذاری..." : "هیچ فرومی یافت نشد."}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-[25px] mb-[30px]">
              {people.map((person) => (
                <Person person={person} key={person.id} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && allOfThem && (
            <div className="flex justify-center gap-2 my-6 items-center">
              {console.log("useEffect")}
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentpage - 1)}
                disabled={currentpage === 1}
                className={`px-3 py-1 rounded-md ${
                  currentpage === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                قبلی
              </button>

              {/* First Page */}
              {currentpage > 3 && totalPages > 5 && (
                <>
                  <button
                    onClick={() => handlePageChange(1)}
                    className={`px-3 py-1 rounded-md ${
                      currentpage === 1
                        ? "bg-blue-700 text-white"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    1
                  </button>
                  {currentpage > 4 && <span className="px-2">...</span>}
                </>
              )}

              {/* Middle Pages */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentpage <= 3) {
                  pageNum = i + 1;
                } else if (currentpage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentpage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-1 rounded-md ${
                      currentpage === pageNum
                        ? "bg-blue-700 text-white"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* Last Page */}
              {currentpage < totalPages - 2 && totalPages > 5 && (
                <>
                  {currentpage < totalPages - 3 && (
                    <span className="px-2">...</span>
                  )}
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    className={`px-3 py-1 rounded-md ${
                      currentpage === totalPages
                        ? "bg-blue-700 text-white"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    {totalPages}
                  </button>
                </>
              )}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentpage + 1)}
                disabled={currentpage === totalPages}
                className={`px-3 py-1 rounded-md ${
                  currentpage === totalPages
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                بعدی
              </button>
            </div>
          )}
          {totalPages > 1 && !allOfThem && (
            <div className="flex justify-center gap-2 my-6 items-center">
              {console.log("searched")}
              {/* Previous Button */}
              <button
                onClick={() => {
                  handlePageChangeSearched(currentpage1 - 1);
                }}
                disabled={currentpage1 === 1}
                className={`px-3 py-1 rounded-md ${
                  currentpage1 === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                قبلی
              </button>

              {/* First Page */}
              {currentpage1 > 3 && totalPages > 5 && (
                <>
                  <button
                    onClick={() => handlePageChangeSearched(1)}
                    className={`px-3 py-1 rounded-md ${
                      currentpage1 === 1
                        ? "bg-blue-700 text-white"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    1
                  </button>
                  {currentpage1 > 4 && <span className="px-2">...</span>}
                </>
              )}

              {/* Middle Pages */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentpage1 <= 3) {
                  pageNum = i + 1;
                } else if (currentpage1 >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentpage1 - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChangeSearched(pageNum)}
                    className={`px-3 py-1 rounded-md ${
                      currentpage1 === pageNum
                        ? "bg-blue-700 text-white"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* Last Page */}
              {currentpage1 < totalPages - 2 && totalPages > 5 && (
                <>
                  {currentpage1 < totalPages - 3 && (
                    <span className="px-2">...</span>
                  )}
                  <button
                    onClick={() => handlePageChangeSearched(totalPages)}
                    className={`px-3 py-1 rounded-md ${
                      currentpage1 === totalPages
                        ? "bg-blue-700 text-white"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    {totalPages}
                  </button>
                </>
              )}

              {/* Next Button */}
              <button
                onClick={() => handlePageChangeSearched(currentpage1 + 1)}
                disabled={currentpage1 === totalPages}
                className={`px-3 py-1 rounded-md ${
                  currentpage1 === totalPages
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                بعدی
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function SearchBookResults({ books, loading2 }) {
  const [selectValue, setSelectValue] = useState("--انتخاب کنید--");
  const [isSelectOpened, setIsSelectOpened] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-[21px]">
        <h2 className="text-[16px] font-[300]">نتایج جستجو</h2>
        <div className="flex items-center gap-[10px]">
          <h2 className="text-[16px] font-[300]">مرتب سازی براساس</h2>
          <div className="relative">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsSelectOpened(!isSelectOpened);
              }}
              onBlur={(e) => {
                e.preventDefault();
                setTimeout(() => {
                  setIsSelectOpened(false);
                }, 250);
              }}
              className={`z-6 flex bg-[#ffffff] w-[147px] h-[45px] ${isSelectOpened ? "rounded-t-[12px]" : "rounded-[12px] shadow-lg shadow-[#000000]/21"} pl-[25px] pr-[5px] text-[13px] ${selectValue !== "--انتخاب کنید--" ? "text-[#000000]" : "text-[#265073]"} cursor-pointer outline-[2px] outline-[#000000]/21`}
            >
              <div className="flex items-center hover:cursor-pointer z-7 gap-[5px]">
                <img
                  src="/images/arrow.png"
                  alt="arrow"
                  className="w-[24px] h-[24px] z-8"
                ></img>
                <span className="z-8">{selectValue}</span>
              </div>
            </button>
            <ul
              className={`overflow-y-scroll flex flex-col absolute bg-[#ffffff] w-[147px] h-[90px] outline-[2px] outline-[#000000]/21 z-9 divide-y divide-[#2F4F4F]/50 rounded-b-[12px] ${isSelectOpened ? "visible" : "hidden"}`}
            >
              <li className={`min-h-[45px] grow-1 w-full z-10`}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectValue("--انتخاب کنید--");
                  }}
                  className="z-11 flex text-[15px] text-[#000000]/70 w-full h-full cursor-pointer hover:bg-[#2663cd]/90 hover:cursor-pointer active:outline-none"
                >
                  <span className="m-auto text-[#265073] z-12">
                    {"--انتخاب کنید--"}
                  </span>
                </button>
              </li>
              {["تازه ترین", "محبوب ترین"].map((option, i) => (
                <li className={`min-h-[45px] grow-1 w-full z-10`} key={i}>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectValue(`${option}`);
                    }}
                    className="z-11 flex text-[15px] text-[#000000]/70 w-full h-full cursor-pointer hover:bg-[#2663cd]/90 hover:cursor-pointer active:outline-none"
                  >
                    <span className="m-auto font-bold z-12">{`${option}`}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-[37px] gap-y-[25px] mb-[30px]">
        {loading2 ? (
          <div className="mx-auto">
            <Loading />
          </div>
        ) : (
          books.map((book) => (
            <Book
              key={book.id}
              coverImage={book.image}
              bookName={book.name}
              authorName={book.Author}
              star={book.rating}
              bookDescription={book.description}
            />
          ))
        )}
      </div>
    </div>
  );
}

function SharedStateProvider({ children }) {
  const [isVisibleDescription, setIsVisibleDescription] = useState(false);
  const [checkedNum, setCheckedNum] = useState(-1);
  const [avgScoreFrom, setAvgScoreFrom] = useState(1.0);
  const [avgScoreTo, setAvgScoreTo] = useState(5.0);
  const [writerName, setWriterName] = useState("");
  const [keyword, setKeyword] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  return (
    <SharedStateContext.Provider
      value={{
        isVisibleDescription,
        setIsVisibleDescription,
        checkedNum,
        setCheckedNum,
        avgScoreFrom,
        setAvgScoreFrom,
        avgScoreTo,
        setAvgScoreTo,
        writerName,
        setWriterName,
        keyword,
        setKeyword,
        dateFrom,
        setDateFrom,
        dateTo,
        setDateTo,
      }}
    >
      {children}
    </SharedStateContext.Provider>
  );
}

function useSharedState() {
  return useContext(SharedStateContext);
}

function SearchFilters({ setLoading2, setShowingBooks }) {
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
  const filterNum = (filters || []).length;

  function handleAdvancedSearch() {
    const fetchSearchBook = async () => {
      setLoading2(true);
      const token = localStorage.getItem("access_token");
      try {
        const Query = filters.reduce((acc, filter) => {
          if (filter.includes("ژانر: ")) {
          }
          if (filter.includes("تگ: ")) {
          }
          if (filter.includes("تعداد فصل ها: از")) {
            if (acc === "?") {
              return acc + "chapter_count_";
            }
          } else if (filter.includes("تعداد فصل ها: تا")) {
          } else if (filter.includes("تعداد فصل ها: ")) {
          }
          if (filter.includes("تعداد پسندیده ها: از")) {
          } else if (filter.includes("تعداد پسندیده ها: تا")) {
          }
          if (filter.includes("تعداد پسندیده ها: ")) {
          }
          if (filter.includes("تعداد امتیازدهندگان: از")) {
          } else if (filter.includes("تعداد امتیازدهندگان: تا")) {
          } else if (filter.includes("تعداد امتیازدهندگان: ")) {
          }
          if (filter.includes("میانگین امتیاز: از")) {
          } else if (filter.includes("میانگین امتیاز: تا")) {
          } else if (filter.includes("میانگین امتیاز: ")) {
          }
          if (filter.includes("وضعیت: ")) {
          }
          if (filter.includes("نویسنده: ")) {
          }
          if (filter.includes("کلید: ")) {
          }
          if (filter.includes("تاریخ ایجاد: از")) {
          } else if (filter.includes("تاریخ ایجاد: تا")) {
          } else if (filter.includes("تاریخ ایجاد: ")) {
          }
        }, "?");
        const response = await fetch(`/api/advance/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("مشکلی پیش اومد...دوباره تلاش کنید");
        }
        const data = await response.json();
        setShowingBooks(data);
      } catch (err) {
        setTimeout(() => {
          Swal.fire({
            title: `${err.message}`,
            icon: "error",
            confirmButtonText: "تلاش مجدد",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }, 100);
      } finally {
        setLoading2(false);
      }
    };
    fetchSearchBook();
  }

  useEffect(() => {
    const fetchGenresAndTags = async () => {
      setLoading(true);
      const response = await fetch(`/api/tag/genres/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response2 = await fetch(`/api/tag/tag-categories/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
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
      if (searchKey === "") {
        setShowingTags(allTags);
        setShowingSelectedTags(allSelectedTags);
      } else {
        setShowingTags(
          allTags.filter(
            (searchingTag) =>
              searchingTag.title.includes(searchKey) ||
              searchingTag.description.includes(searchKey)
          )
        );
        setShowingSelectedTags(
          allSelectedTags.filter(
            (searchingSelectedTag) =>
              searchingSelectedTag.title.includes(searchKey) ||
              searchingSelectedTag.description.includes(searchKey)
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
                (searchingTag.title.includes(searchKey) ||
                  searchingTag.description.includes(searchKey)) &&
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
                (searchingSelectedTag.title.includes(searchKey) ||
                  searchingSelectedTag.description.includes(searchKey)) &&
                selected.title === searchingSelectedTag.title
            )
          )
      );
    }
  }, [selectedTagCategories, allTags, allSelectedTags, searchKey]);

  return (
    <div className="flex flex-col items-center w-full">
      <form className="mb-[37px]" onSubmit={(e) => e.preventDefault()}>
        <div className={`flex gap-[26px]`}>
          <button
            onClick={() => setIsVisibleFilters(!isVisibleFilters)}
            className="!py-[12px] !px-[28px] !rounded-[20px] !w-fit !h-fit !mb-0 !ml-0 !mr-0 shadow-2xl btn"
          >
            <span className="span-btn !text-[16px] !font-[400]">
              جستجوی پیشرفته
            </span>
          </button>
          <div className="relative flex">
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAdvancedSearch();
                }
              }}
              className="w-[693px] h-[49px] py-[12.5px] pr-[26px] pl-[50px] bg-white rounded-[20px] outline-[2px] outline-[#000000]/21 shadow-lg shadow-[#000000]/25 focus:shadow-none focus:outline-[3px] focus:outline-[#2663cd] placeholder:text-[16px] placeholder:font-[300] placeholder:text-[#265073]"
              placeholder="نام کتاب"
            />
            <img
              src="/src/assets/images/search.png"
              alt="search"
              className="absolute left-[14px] top-[12px]"
            />
          </div>
        </div>
      </form>
      <SharedStateProvider>
        <div
          className={`flex flex-col w-full bg-[#A4C0ED] rounded-[20px] border-[2px] border-[#000000]/21 px-[55px] pt-[30px] pb-[50px] mb-[37px] ${isVisibleFilters ? "visible" : "hidden"}`}
        >
          <div className="flex flex-col gap-[17px] w-full">
            <div className="flex justify-between items-center">
              <div className="flex gap-[3px] items-center">
                <img
                  src="/src/assets/images/filter.png"
                  alt="filter"
                  className="min-w-[30px] max-w-[30px] min-h-[30px] max-h-[30px]"
                />
                <h2 className="text-[20px] font-[300] ">
                  فیلترها ({filterNum})
                </h2>
              </div>
              {/* <button className="group cursor-pointer relative">
                <span className="text-[16px] font-[400] text-[#2663CD]">
                  حذف همه فیلترها
                </span>
                <div className="h-[1px] w-full absolute bg-[#2663CD] bottom-1.25 collapse group-hover:visible group-active:collapse"></div>
              </button> */}
            </div>
            <div className="grid grid-cols-5 mx-0 gap-[11px] mb-[20px]">
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
            className={`${!(selectedGenres.length === 0 && genres.length === 0) ? "grid grid-cols-5 gap-x-[25px] gap-y-[33px]" : "scrollbar-opacity-0"} mx-[30px] p-[20px] bg-[#FFF] rounded-[15px] border-[2px] border-[#000000]/21 mb-[50px]`}
          >
            {loading ? (
              <Loading />
            ) : (
              selectedGenres.map((genre) => (
                <div key={genre.id} className="flex flex-col items-center">
                  <SharedStateProvider>
                    <DescriptionBubble Obj={genre} />
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
                      <DescriptionBubble Obj={genre} />
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
            className={`${!(tagCategories.length === 0 && selectedTagCategories.length === 0) ? "grid grid-cols-5 gap-x-[25px] gap-y-[33px]" : "scrollbar-opacity-0"} mx-[30px] p-[20px] bg-[#FFF] rounded-[15px] border-[2px] border-[#000000]/21 mb-[17px]`}
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
          <h2 className="text-[20px] font-[300]  mb-[17px]">جستجوی تگ ها:</h2>
          <input
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            className="p-[12px] mb-[17px] w-[calc(100%-60px)] mx-auto bg-white text-[16px] font-[300] max-h-[40px] rounded-[6px] outline-[2px] outline-[#000000]/21 focus:outline-[3px] focus:outline-[#2663cd] placeholder:text-[16px] placeholder:font-[300] placeholder:text-[#265073]"
            placeholder="تگ مورد نظر خود را اینجا جستجو کنید..."
          ></input>
          <div
            className={`${!(showingTags.length === 0 && showingSelectedTags.length === 0) ? "grid grid-cols-5 gap-x-[25px] gap-y-[33px] overflow-y-scroll max-h-[155px]" : "scrollbar-opacity-0"} mx-[30px] p-[20px] bg-[#FFF] rounded-[15px] border-[2px] border-[#000000]/21 mb-[50px]`}
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
          <div className="flex justify-between w-[calc(100%-30px)] mb-[50px]">
            <div className="flex flex-col gap-[17px]">
              <h2 className="text-[20px] font-[300] ">تعداد فصل ها:</h2>
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
            <div className="flex flex-col gap-[17px]">
              <h2 className="text-[20px] font-[300] ">
                تعداد افرادی که پسندیده اند:
              </h2>
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
            <div className="flex flex-col gap-[17px]">
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
          <div className="flex justify-between w-[calc(100%-30px)] items-center mb-[50px]">
            <AvgScores setFilters={setFilters} />
            <CheckBoxes addFilter={setFilters} filters={filters} />
            <Writer filters={filters} setFilters={setFilters} />
          </div>
          <div className="flex items-center w-[calc(100%-30px)] gap-[39px] mt-[25px] mb-[60px]">
            <KeyWord filters={filters} setFilters={setFilters} />
            <CreationDate setFilters={setFilters} />
          </div>
          <button className="btn !w-fit !h-fit !mb-0 px-[26px] py-[12px] !rounded-[20px] border-[2px] border-[#000000]/21 active:border-0">
            <span className="span-btn !text-[16px] !font-[400]">
              اعمال تمامی فیلترها
            </span>
          </button>
        </div>
      </SharedStateProvider>
    </div>
  );
}

function Filter({
  filterName,
  deleteFilter,
  filters,
  unselectedGenres,
  setUnselectedGenres,
  selectedGenres,
  deleteSelectedGenres,
  allUnselectedTags,
  setAllUnselectedTags,
  allSelectedTags,
  deleteAllSelectedTags,
  setFromValueChapter,
  setToValueChapter,
  setFromValueFav,
  setToValueFav,
  setFromValueScorer,
  setToValueScorer,
}) {
  const {
    setCheckedNum,
    setAvgScoreFrom,
    setAvgScoreTo,
    setDateFrom,
    setDateTo,
  } = useSharedState();

  return (
    <div className="overflow-hidden relative items-center shadow-lg flex justify-between text-nowrap rounded-full bg-white pr-[11px] pl-[30px] py-[6px] w-full mx-0 grow-1">
      <span className="z-1 text-[15px] font-[100]">{filterName}</span>
      <div className="bg-white h-full w-[28px] rounded-l-full z-100 absolute left-0 grid">
        <button
          onClick={() => {
            if (filterName.includes("ژانر: ")) {
              setUnselectedGenres([
                ...unselectedGenres,
                ...selectedGenres.filter((genre) =>
                  filterName.includes(genre.title)
                ),
              ]);
              deleteSelectedGenres(
                selectedGenres.filter(
                  (genre) => !filterName.includes(genre.title)
                )
              );
            }
            if (filterName.includes("تگ: ")) {
              setAllUnselectedTags([
                ...allUnselectedTags,
                ...allSelectedTags.filter((tag) =>
                  filterName.includes(tag.title)
                ),
              ]);
              deleteAllSelectedTags(
                allSelectedTags.filter((tag) => !filterName.includes(tag.title))
              );
            }
            if (filterName.includes("تعداد فصل ها: از")) {
              setFromValueChapter("1");
            } else if (filterName.includes("تعداد فصل ها: تا")) {
              setToValueChapter("9999");
            } else if (filterName.includes("تعداد فصل ها: ")) {
              setFromValueChapter("1");
              setToValueChapter("9999");
            }
            if (filterName.includes("تعداد پسندیده ها: از")) {
              setFromValueFav("1");
            } else if (filterName.includes("تعداد پسندیده ها: تا")) {
              setToValueFav("99999");
            }
            if (filterName.includes("تعداد پسندیده ها: ")) {
              setFromValueFav("1");
              setToValueFav("99999");
            }
            if (filterName.includes("تعداد امتیازدهندگان: از")) {
              setFromValueScorer("1");
            } else if (filterName.includes("تعداد امتیازدهندگان: تا")) {
              setToValueScorer("99999");
            } else if (filterName.includes("تعداد امتیازدهندگان: ")) {
              setFromValueScorer("1");
              setToValueScorer("99999");
            }
            if (filterName.includes("میانگین امتیاز: از")) {
              setAvgScoreFrom(1.0);
            } else if (filterName.includes("میانگین امتیاز: تا")) {
              setAvgScoreTo(5.0);
            } else if (filterName.includes("میانگین امتیاز: ")) {
              setAvgScoreFrom(1.0);
              setAvgScoreTo(5.0);
            }
            if (filterName.includes("وضعیت: ")) {
              setCheckedNum(-1);
            }
            if (filterName.includes("تاریخ ایجاد: از")) {
              setDateFrom("");
            } else if (filterName.includes("تاریخ ایجاد: تا")) {
              setDateTo("");
            } else if (filterName.includes("تاریخ ایجاد: ")) {
              setDateFrom("");
              setDateTo("");
            }
            deleteFilter(filters?.filter((filter) => filter != filterName));
          }}
          className="grid mx-auto my-auto rounded-full cursor-pointer h-[15px] w-[15px] hover:bg-[#E5E5E5]/70 transition-colors duration-400 active:bg-[#E5E5E5] active:duration-100"
        >
          <span className="text-black text-[17px] font-[100] translate-y-[-4px] mx-auto">
            &times;
          </span>
        </button>
      </div>
    </div>
  );
}

function GenreAndTag({
  Obj,
  addFilter = null,
  filters = null,
  selected,
  addSelected,
  unselected,
  deleteUnselected,
  allSelected = null,
  addAllSelected = null,
  allUnselected = null,
  deleteAllUnselected = null,
}) {
  const { setIsVisibleDescription } = useSharedState();

  return (
    <button
      onMouseEnter={() => setIsVisibleDescription(true)}
      onMouseLeave={() => setIsVisibleDescription(false)}
      onClick={() => {
        {
          Obj.category_id !== undefined
            ? addFilter([...(filters || []), "تگ: " + Obj.title])
            : addFilter([...(filters || []), "ژانر: " + Obj.title]);
        }
        addSelected([...selected, Obj]);
        deleteUnselected(
          unselected.filter((unselected) => unselected.title !== Obj.title)
        );
        if (allSelected !== null) {
          addAllSelected([...allSelected, Obj]);
          deleteAllUnselected(
            allUnselected.filter((unselected) => unselected.title !== Obj.title)
          );
        }
      }}
      title={Obj.description}
      className="btn !bg-[#2663CD]/80 !w-full !h-fit !mb-0 !mx-0 !rounded-[10px] py-[10px]"
    >
      <span className="span-btn !text-[14px] !font-[300]">{Obj.title}</span>
    </button>
  );
}

function SelectedGenreAndTag({
  Obj,
  deleteFilter = null,
  filters = null,
  selected,
  addSelected,
  unselected,
  deleteUnselected,
  allSelected = null,
  addAllSelected = null,
  allUnselected = null,
  deleteAllUnselected = null,
}) {
  const { setIsVisibleDescription } = useSharedState();

  return (
    <button
      onMouseEnter={() => setIsVisibleDescription(true)}
      onMouseLeave={() => setIsVisibleDescription(false)}
      onClick={() => {
        {
          Obj.category_id !== undefined
            ? deleteFilter(
                filters?.filter((filter) => filter !== "تگ: " + Obj.title)
              )
            : deleteFilter(
                filters?.filter((filter) => filter !== "ژانر: " + Obj.title)
              );
        }
        deleteUnselected([...unselected, Obj]);
        addSelected(
          selected.filter((selected) => selected.title !== Obj.title)
        );
        if (allSelected !== null) {
          deleteAllUnselected([...allUnselected, Obj]);
          addAllSelected(
            allSelected.filter((selected) => selected.title !== Obj.title)
          );
        }
      }}
      title={Obj.description}
      className="btn !bg-[#4D8AFF] !text-black hover:!text-white before:!bg-[#2663CD] !w-full !h-fit !mb-0 !mx-0 !rounded-[10px] py-[10px]"
    >
      <span className="span-btn !text-[14px] !font-[300]">{Obj.title}</span>
    </button>
  );
}

function DescriptionBubble({ Obj }) {
  const { isVisibleDescription } = useSharedState();

  return (
    <div
      className={`flex flex-col items-center -mt-[71px] z-50 ${isVisibleDescription ? "visible" : "hidden"}`}
    >
      <div className="text-nowrap bg-white flex flex-col items-center rounded-[20px] shadow-[0_10px_6px_-5px_rgba(0,0,0,0.1),10px_0_4px_-8px_rgba(0,0,0,0.1)] py-[15px] px-[30px]">
        <p className="text-[14px] font-[300]">{Obj.description}</p>
      </div>
      <div className="flex">
        <div className="h-[20px] w-[40px] bg-white">
          <div className="bg-[#fff] h-[20px] w-[40px] rounded-tl-[100%_100%] shadow-[inset_0_10px_6px_-5px_rgba(0,0,0,0.12),inset_10px_0_4px_-8px_rgba(0,0,0,0.12)]"></div>
        </div>
        <div className="h-[20px] w-[40px] bg-white">
          <div className="bg-[#fff] h-[20px] w-[40px] rounded-tr-[100%_100%] shadow-[inset_0_10px_6px_-5px_rgba(0,0,0,0.12),inset_-10px_0_4px_-8px_rgba(0,0,0,0.12)]"></div>
        </div>
      </div>
    </div>
  );
}

function TagCategory({
  Obj,
  selected,
  addSelected,
  unselected,
  deleteUnselected,
}) {
  const [isVisibleDescription, setIsVisibleDescription] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      <div
        className={`flex flex-col items-center absolute top-[-71px] ${isVisibleDescription ? "visible" : "hidden"}`}
      >
        <div className="text-nowrap bg-white flex flex-col items-center rounded-[20px] shadow-[0_10px_6px_-5px_rgba(0,0,0,0.1),10px_0_4px_-8px_rgba(0,0,0,0.1)] py-[15px] px-[30px]">
          <p className="text-[14px] font-[300]">{Obj.description}</p>
        </div>
        <div className="flex">
          <div className="h-[20px] w-[40px] bg-white">
            <div className="bg-[#fff] h-[20px] w-[40px] rounded-tl-[100%_100%] shadow-[inset_0_10px_6px_-5px_rgba(0,0,0,0.12),inset_10px_0_4px_-8px_rgba(0,0,0,0.12)]"></div>
          </div>
          <div className={`h-[20px] w-[40px] bg-white`}>
            <div
              className={`bg-[#fff] h-[20px] w-[40px] rounded-tr-[100%_100%] shadow-[inset_0_10px_6px_-5px_rgba(0,0,0,0.12),inset_-10px_0_4px_-8px_rgba(0,0,0,0.12)]`}
            ></div>
          </div>
        </div>
      </div>
      <button
        onMouseEnter={() => setIsVisibleDescription(true)}
        onMouseLeave={() => setIsVisibleDescription(false)}
        onClick={() => {
          addSelected([...selected, Obj]);
          deleteUnselected(
            unselected.filter((unselected) => unselected.title !== Obj.title)
          );
        }}
        className="btn !bg-[#2663CD]/80 !w-full !h-fit !mb-0 !mx-0 !rounded-[10px] py-[10px]"
      >
        <span className="span-btn !text-[14px] !font-[300]">{Obj.title}</span>
      </button>
    </div>
  );
}

function SelectedTagCategory({
  Obj,
  selected,
  addSelected,
  unselected,
  deleteUnselected,
}) {
  const [isVisibleDescription, setIsVisibleDescription] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      <div
        className={`flex flex-col items-center absolute top-[-71px] ${isVisibleDescription ? "visible" : "hidden"}`}
      >
        <div className="text-nowrap bg-white flex flex-col items-center rounded-[20px] shadow-[0_10px_6px_-5px_rgba(0,0,0,0.1),10px_0_4px_-8px_rgba(0,0,0,0.1)] py-[15px] px-[30px]">
          <p className="text-[14px] font-[300]">{Obj.description}</p>
        </div>
        <div className="flex">
          <div className="h-[20px] w-[40px] bg-white">
            <div className="bg-[#fff] h-[20px] w-[40px] rounded-tl-[100%_100%] shadow-[inset_0_10px_6px_-5px_rgba(0,0,0,0.12),inset_10px_0_4px_-8px_rgba(0,0,0,0.12)]"></div>
          </div>
          <div className={`h-[20px] w-[40px] bg-white`}>
            <div
              className={`bg-[#fff] h-[20px] w-[40px] rounded-tr-[100%_100%] shadow-[inset_0_10px_6px_-5px_rgba(0,0,0,0.12),inset_-10px_0_4px_-8px_rgba(0,0,0,0.12)]`}
            ></div>
          </div>
        </div>
      </div>
      <button
        onMouseEnter={() => setIsVisibleDescription(true)}
        onMouseLeave={() => setIsVisibleDescription(false)}
        onClick={() => {
          deleteUnselected([...unselected, Obj]);
          addSelected(
            selected.filter((selected) => selected.title !== Obj.title)
          );
        }}
        title={Obj.description}
        className="btn !bg-[#4D8AFF] !text-black hover:!text-white before:!bg-[#2663CD] !w-full !h-fit !mb-0 !mx-0 !rounded-[10px] py-[10px]"
      >
        <span className="span-btn !text-[14px] !font-[300]">{Obj.title}</span>
      </button>
    </div>
  );
}

function AvgScores({ setFilters }) {
  const { avgScoreFrom, setAvgScoreFrom, avgScoreTo, setAvgScoreTo } =
    useSharedState();

  return (
    <div className="flex flex-col gap-[17px]">
      <h2 className="text-[20px] font-[300] ">میانگین امتیازات کتاب:</h2>
      <div className="flex justify-between mr-[30px] gap-[76px]">
        <div className="gap-[9px] flex items-center">
          <span className="text-[20px] font-[300] ">از:</span>
          <div className="flex items-center gap-[9px] relative group">
            <div className="flex-col absolute mb-[-5px] hidden group-hover:flex group-focus-within:group-hover:hidden">
              <div className="flex flex-col items-center mb-[-4px]">
                <button
                  onClick={() => {
                    if (avgScoreFrom < avgScoreTo - 0.1) {
                      if (
                        (avgScoreFrom + 0.1).toFixed(1) ===
                        avgScoreTo.toFixed(1)
                      ) {
                        setFilters((filters) =>
                          filters?.filter(
                            (filter) =>
                              !filter.includes("میانگین امتیاز: از") &&
                              !filter.includes("میانگین امتیاز: تا")
                          )
                        );
                        setFilters((filters) => [
                          ...(filters || []),
                          `میانگین امتیاز: ${(avgScoreFrom + 0.1).toFixed(1)}`,
                        ]);
                      } else {
                        setFilters((filters) =>
                          filters?.filter(
                            (filter) => !filter.includes("میانگین امتیاز: از")
                          )
                        );
                        setFilters((filters) => [
                          ...(filters || []),
                          `میانگین امتیاز: از ${(avgScoreFrom + 0.1).toFixed(1)}`,
                        ]);
                      }
                      setAvgScoreFrom(avgScoreFrom + 0.1);
                    }
                  }}
                  className="rounded-full flex cursor-pointer z-2 w-[12.5px] h-[12.5px] mb-[-20px]"
                ></button>
                <img
                  src="/src/assets/images/plus2.png"
                  alt="plus"
                  className="w-[25px] h-[25px]"
                />
              </div>
              <div className="flex flex-col items-center">
                <button
                  onClick={() => {
                    if (avgScoreFrom > 1) {
                      if (avgScoreFrom.toFixed(1) === avgScoreTo.toFixed(1)) {
                        setFilters((filters) =>
                          filters?.filter(
                            (filter) => !filter.includes("میانگین امتیاز: ")
                          )
                        );
                        if (!(avgScoreTo <= 5.05 && avgScoreTo >= 5)) {
                          setFilters((filters) => [
                            ...(filters || []),
                            `میانگین امتیاز: تا ${avgScoreFrom.toFixed(1)}`,
                          ]);
                        }
                        if (!(avgScoreFrom <= 1.15 && avgScoreFrom >= 1.1)) {
                          setFilters((filters) => [
                            ...(filters || []),
                            `میانگین امتیاز: از ${(avgScoreFrom - 0.1).toFixed(1)}`,
                          ]);
                        }
                      } else {
                        setFilters((filters) =>
                          filters?.filter(
                            (filter) => !filter.includes("میانگین امتیاز: از")
                          )
                        );
                        if (!(avgScoreFrom <= 1.15 && avgScoreFrom >= 1.1))
                          setFilters((filters) => [
                            ...(filters || []),
                            `میانگین امتیاز: از ${(avgScoreFrom - 0.1).toFixed(1)}`,
                          ]);
                      }
                      setAvgScoreFrom(avgScoreFrom - 0.1);
                    }
                  }}
                  className="rounded-full flex cursor-pointer z-2 w-[12.5px] h-[12.5px] mb-[-20px]"
                ></button>
                <img
                  src="/src/assets/images/minus2.png"
                  alt="minus"
                  className="w-[25px] h-[25px]"
                />
              </div>
            </div>
            <input
              dir="ltr"
              value={avgScoreFrom.toFixed(1)}
              disabled
              className="h-[40px] w-[80px] bg-white rounded-[5px] text-center outline-[2px] outline-[#000000]/21 focus:outline-[3px] focus:outline-[#2663CD]"
            />
          </div>
        </div>
        <div className="gap-[9px] flex items-center">
          <span className="text-[20px] font-[300] ">تا:</span>
          <div className="flex items-center relative group">
            <div className="flex-col absolute mb-[-5px] hidden group-hover:flex group-focus-within:group-hover:hidden">
              <div className="flex flex-col items-center mb-[-4px]">
                <button
                  onClick={() => {
                    if (avgScoreTo < 5) {
                      if (avgScoreFrom.toFixed(1) === avgScoreTo.toFixed(1)) {
                        setFilters((filters) =>
                          filters?.filter(
                            (filter) => !filter.includes("میانگین امتیاز: ")
                          )
                        );
                        if (!(avgScoreFrom <= 1.05 && avgScoreFrom >= 1)) {
                          setFilters((filters) => [
                            ...(filters || []),
                            `میانگین امتیاز: از ${avgScoreTo.toFixed(1)}`,
                          ]);
                        }
                        if (!(avgScoreTo <= 4.9 && avgScoreTo >= 4.85)) {
                          setFilters((filters) => [
                            ...(filters || []),
                            `میانگین امتیاز: تا ${(avgScoreTo + 0.1).toFixed(1)}`,
                          ]);
                        }
                      } else {
                        setFilters((filters) =>
                          filters?.filter(
                            (filter) => !filter.includes("میانگین امتیاز: تا")
                          )
                        );
                        if (!(avgScoreTo <= 4.9 && avgScoreTo >= 4.85))
                          setFilters((filters) => [
                            ...(filters || []),
                            `میانگین امتیاز: تا ${(avgScoreTo + 0.1).toFixed(1)}`,
                          ]);
                      }
                      setAvgScoreTo(avgScoreTo + 0.1);
                    }
                  }}
                  className="rounded-full flex cursor-pointer z-2 w-[12.5px] h-[12.5px] mb-[-20px]"
                ></button>
                <img
                  src="/src/assets/images/plus2.png"
                  alt="plus"
                  className="w-[25px] h-[25px]"
                />
              </div>
              <div className="flex flex-col items-center">
                <button
                  onClick={() => {
                    if (avgScoreTo > avgScoreFrom + 0.1) {
                      if (
                        (avgScoreTo - 0.1).toFixed(1) ===
                        avgScoreFrom.toFixed(1)
                      ) {
                        setFilters((filters) =>
                          filters?.filter(
                            (filter) =>
                              !filter.includes("میانگین امتیاز: از") &&
                              !filter.includes("میانگین امتیاز: تا")
                          )
                        );
                        setFilters((filters) => [
                          ...(filters || []),
                          `میانگین امتیاز: ${(avgScoreTo - 0.1).toFixed(1)}`,
                        ]);
                      } else {
                        setFilters((filters) =>
                          filters?.filter(
                            (filter) => !filter.includes("میانگین امتیاز: تا")
                          )
                        );
                        setFilters((filters) => [
                          ...(filters || []),
                          `میانگین امتیاز: تا ${(avgScoreTo - 0.1).toFixed(1)}`,
                        ]);
                      }
                      setAvgScoreTo(avgScoreTo - 0.1);
                    }
                  }}
                  className="rounded-full flex cursor-pointer z-2 w-[12.5px] h-[12.5px] mb-[-20px]"
                ></button>
                <img
                  src="/src/assets/images/minus2.png"
                  alt="minus"
                  className="w-[25px] h-[25px]"
                />
              </div>
            </div>
            <input
              dir="ltr"
              value={avgScoreTo.toFixed(1)}
              disabled
              className="h-[40px] w-[80px] bg-white rounded-[5px] text-center outline-[2px] outline-[#000000]/21 focus:outline-[3px] focus:outline-[#2663CD]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Writer({ filters, setFilters }) {
  const { writerName, setWriterName } = useSharedState();

  return (
    <div className="flex flex-col gap-[17px]">
      <h2 className="text-[20px] font-[300]">نام نویسنده:</h2>
      <div className="relative group">
        <input
          onChange={(e) => setWriterName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && writerName.length >= 3) {
              setFilters([...(filters || []), "نویسنده: " + writerName]);
              setWriterName("");
              e.target.blur();
            }
          }}
          value={writerName}
          placeholder="نام نویسنده"
          className=" mr-[30px] px-[18px] bg-white w-[287px] h-[43px]  rounded-[6px] outline-[2px] outline-[#000000]/21 focus:outline-[3px] focus:outline-[#2663CD] placeholder:text-[16px] placeholder:font-[300] placeholder:text-[#265073]"
        />
        <p className="text-[14px] text-green-700 mr-[48px] absolute pt-[10px] group-focus-within:block hidden">
          جهت اعمال فیلتر Enter را بزنید
        </p>
      </div>
    </div>
  );
}

function CheckBoxes({ addFilter, filters }) {
  const { checkedNum, setCheckedNum } = useSharedState();

  return (
    <div className="flex flex-col gap-[17px]">
      <h2 className="text-[20px] font-[300] ">وضعیت کتاب:</h2>
      <div className="flex mr-[30px] gap-[25px]">
        <div className="flex items-center gap-[5px]">
          <button
            onClick={() => {
              if (checkedNum === -1) {
                setCheckedNum(0);
                addFilter([...(filters || []), "وضعیت: در حال تالیف"]);
              } else if (checkedNum === 0) {
                setCheckedNum(-1);
                addFilter(
                  filters?.filter((filter) => filter !== "وضعیت: در حال تالیف")
                );
              } else {
                setCheckedNum(0);
                addFilter((filters) =>
                  filters?.filter(
                    (filter) =>
                      filter !== "وضعیت: به اتمام رسیده" &&
                      filter !== "وضعیت: متوقف شده"
                  )
                );
                addFilter((filters) => [
                  ...(filters || []),
                  "وضعیت: در حال تالیف",
                ]);
              }
            }}
            className="rounded-full cursor-pointer h-[30px] w-[30px] hover:bg-[#E5E5E5]/30 transition-colors duration-400 active:bg-[#E5E5E5]/50 active:duration-100"
          >
            {checkedNum === 0 ? (
              <img
                src="/src/assets/images/checked.png"
                alt="checked"
                className="h-[18px] w-[18px] mx-auto"
              />
            ) : (
              <img
                src="/src/assets/images/unchecked.png"
                alt="unchecked"
                className="h-[18px] w-[18px] mx-auto"
              />
            )}
          </button>
          <span className="text-[20px]  font-[400]">در حال تالیف</span>
        </div>
        <div className="flex items-center gap-[5px]">
          <button
            onClick={() => {
              if (checkedNum === -1) {
                setCheckedNum(1);
                addFilter([...(filters || []), "وضعیت: به اتمام رسیده"]);
              } else if (checkedNum === 1) {
                setCheckedNum(-1);
                addFilter(
                  filters?.filter(
                    (filter) => filter !== "وضعیت: به اتمام رسیده"
                  )
                );
              } else {
                setCheckedNum(1);
                addFilter((filters) =>
                  filters?.filter(
                    (filter) =>
                      filter !== "وضعیت: در حال تالیف" &&
                      filter !== "وضعیت: متوقف شده"
                  )
                );
                addFilter((filters) => [
                  ...(filters || []),
                  "وضعیت: به اتمام رسیده",
                ]);
              }
            }}
            className="rounded-full cursor-pointer h-[30px] w-[30px] hover:bg-[#E5E5E5]/30 transition-colors duration-400 active:bg-[#E5E5E5]/50 active:duration-100"
          >
            {checkedNum === 1 ? (
              <img
                src="/src/assets/images/checked.png"
                alt="checked"
                className="h-[18px] w-[18px] mx-auto"
              />
            ) : (
              <img
                src="/src/assets/images/unchecked.png"
                alt="unchecked"
                className="h-[18px] w-[18px] mx-auto"
              />
            )}
          </button>
          <span className="text-[20px]  font-[400]">به اتمام رسیده</span>
        </div>
        <div className="flex items-center gap-[5px]">
          <button
            onClick={() => {
              if (checkedNum === -1) {
                setCheckedNum(2);
                addFilter([...(filters || []), "وضعیت: متوقف شده"]);
              } else if (checkedNum === 2) {
                setCheckedNum(-1);
                addFilter(
                  filters?.filter((filter) => filter !== "وضعیت: متوقف شده")
                );
              } else {
                setCheckedNum(2);
                addFilter((filters) =>
                  filters?.filter(
                    (filter) =>
                      filter !== "وضعیت: در حال تالیف" &&
                      filter !== "وضعیت: به اتمام رسیده"
                  )
                );
                addFilter((filters) => [
                  ...(filters || []),
                  "وضعیت: متوقف شده",
                ]);
              }
            }}
            className="rounded-full cursor-pointer h-[30px] w-[30px] hover:bg-[#E5E5E5]/30 transition-colors duration-400 active:bg-[#E5E5E5]/50 active:duration-100"
          >
            {checkedNum === 2 ? (
              <img
                src="/src/assets/images/checked.png"
                alt="checked"
                className="h-[18px] w-[18px] mx-auto"
              />
            ) : (
              <img
                src="/src/assets/images/unchecked.png"
                alt="unchecked"
                className="h-[18px] w-[18px] mx-auto"
              />
            )}
          </button>
          <span className="text-[20px]  font-[400]">متوقف شده</span>
        </div>
      </div>
    </div>
  );
}

function KeyWord({ filters, setFilters }) {
  const { keyword, setKeyword } = useSharedState();

  return (
    <div className="flex items-center gap-[9px] grow-1">
      <h2 className="text-[20px] font-[300]">عبارت کلیدی:</h2>
      <div className="relative group grow-1">
        <input
          className="p-[12px] w-[100%] bg-white text-[16px] font-[300] max-h-[40px] rounded-[6px] outline-[2px] outline-[#000000]/21 focus:outline-[3px] focus:outline-[#2663CD] placeholder:text-[16px] placeholder:font-[300] placeholder:text-[#265073]"
          placeholder="جستجوی داستان براساس عبارت کلیدی خلاصه آن..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && keyword.length >= 3) {
              setFilters([...(filters || []), "کلید: " + keyword]);
              setKeyword("");
              e.target.blur();
            }
          }}
        />
        <p className="text-[14px] mt-[10px] mr-[12px] text-green-700 absolute group-focus-within:block hidden">
          جهت اعمال فیلتر Enter را بزنید
        </p>
      </div>
    </div>
  );
}

function CreationDate({ setFilters }) {
  const { dateFrom, setDateFrom, dateTo, setDateTo } = useSharedState();

  return (
    <div className="flex items-center justify-between gap-[25px]">
      <h2 className="text-[20px] font-[300] ">تاریخ ایجاد:</h2>
      <div className="flex gap-[9px] items-center">
        <span className="text-[20px] font-[300]">از:</span>
        <DatePicker
          value={dateFrom}
          onChange={(value) => {
            setDateFrom(value);
            setFilters((filters) =>
              filters?.filter(
                (filter) =>
                  !filter.includes("تاریخ ایجاد: از") &&
                  !filter.includes("تاریخ ایجاد: تا") &&
                  !filter.includes("تاریخ ایجاد: ")
              )
            );
            if (value) {
              if (String(value) !== String(dateTo)) {
                setFilters((filters) => [
                  ...(filters || []),
                  `تاریخ ایجاد: از ${value}`,
                ]);
                if (dateTo) {
                  setFilters((filters) => [
                    ...(filters || []),
                    `تاریخ ایجاد: تا ${dateTo}`,
                  ]);
                }
              } else {
                setFilters((filters) => [
                  ...(filters || []),
                  `تاریخ ایجاد: ${value}`,
                ]);
              }
            } else if (dateTo) {
              setFilters((filters) => [
                ...(filters || []),
                `تاریخ ایجاد: تا ${dateTo}`,
              ]);
            }
          }}
          calendar={persian}
          locale={persian_fa}
          maxDate={dateTo ? new Date(dateTo) : new Date()}
          calendarPosition="bottom-right"
          inputClass="h-[40px] text-[20px] p-[12px] bg-white rounded-[6px] outline-[2px] outline-[#000000]/21 focus:outline-[3px] focus:outline-[#2663CD]"
        />
      </div>
      <div className="flex gap-[9px] items-center">
        <span className="text-[20px] font-[300]">تا:</span>
        <DatePicker
          value={dateTo}
          onChange={(value) => {
            setDateTo(value);
            setFilters((filters) =>
              filters?.filter(
                (filter) =>
                  !filter.includes("تاریخ ایجاد: از") &&
                  !filter.includes("تاریخ ایجاد: تا") &&
                  !filter.includes("تاریخ ایجاد: ")
              )
            );
            if (value) {
              if (String(value) !== String(dateFrom)) {
                setFilters((filters) => [
                  ...(filters || []),
                  `تاریخ ایجاد: تا ${value}`,
                ]);
                if (dateFrom) {
                  setFilters((filters) => [
                    ...(filters || []),
                    `تاریخ ایجاد: از ${dateFrom}`,
                  ]);
                }
              } else {
                setFilters((filters) => [
                  ...(filters || []),
                  `تاریخ ایجاد: ${value}`,
                ]);
              }
            } else if (dateFrom) {
              setFilters((filters) => [
                ...(filters || []),
                `تاریخ ایجاد: از ${dateFrom}`,
              ]);
            }
          }}
          calendar={persian}
          locale={persian_fa}
          maxDate={new Date()}
          minDate={dateFrom ? new Date(dateFrom) : null}
          calendarPosition="bottom-right"
          inputClass="h-[40px] text-[20px] p-[12px] bg-white rounded-[6px] outline-[2px] outline-[#000000]/21 focus:outline-[3px] focus:outline-[#2663CD]"
        />
      </div>
    </div>
  );
}

function FromToInputs({
  maxValue,
  valueLength,
  setFilters,
  filterPattern,
  fromValue,
  setFromValue,
  toValue,
  setToValue,
}) {
  function deleteAllFilters() {
    setFilters((filters) =>
      filters?.filter((filter) =>
        filterPattern === "chapter"
          ? !filter.includes("تعداد فصل ها: از") &&
            !filter.includes("تعداد فصل ها: تا") &&
            !filter.includes("تعداد فصل ها: ")
          : filterPattern === "fav"
            ? !filter.includes("تعداد پسندیده ها: از") &&
              !filter.includes("تعداد پسندیده ها: تا") &&
              !filter.includes("تعداد پسندیده ها: ")
            : filterPattern === "scorer"
              ? !filter.includes("تعداد امتیازدهندگان: از") &&
                !filter.includes("تعداد امتیازدهندگان: تا") &&
                !filter.includes("تعداد امتیازدهندگان: ")
              : null
      )
    );
  }

  function setFromFilters() {
    deleteAllFilters();
    if (toValue === "1") {
      setFilters((filters) =>
        filterPattern === "chapter"
          ? [...(filters || []), "تعداد فصل ها: 1 فصل"]
          : filterPattern === "fav"
            ? [...(filters || []), "تعداد پسندیده ها: 1 نفر"]
            : filterPattern === "scorer"
              ? [...(filters || []), "تعداد امتیازدهندگان: 1 نفر"]
              : null
      );
    } else {
      setFilters((filters) =>
        filterPattern === "chapter"
          ? toValue !== maxValue
            ? [...(filters || []), `تعداد فصل ها: تا ${toValue} فصل`]
            : null
          : filterPattern === "fav"
            ? toValue !== maxValue
              ? [...(filters || []), `تعداد پسندیده ها: تا ${toValue} نفر`]
              : null
            : filterPattern === "scorer"
              ? toValue !== maxValue
                ? [...(filters || []), `تعداد امتیازدهندگان: تا ${toValue} نفر`]
                : null
              : null
      );
    }
  }

  function setToFilters() {
    deleteAllFilters();
    if (fromValue === maxValue) {
      setFilters((filters) =>
        filterPattern === "chapter"
          ? [...(filters || []), `تعداد فصل ها: ${maxValue} فصل`]
          : filterPattern === "fav"
            ? [...(filters || []), `تعداد پسندیده ها: ${maxValue} نفر`]
            : filterPattern === "scorer"
              ? [...(filters || []), `تعداد امتیازدهندگان: ${maxValue} نفر`]
              : null
      );
    } else {
      setFilters((filters) =>
        filterPattern === "chapter"
          ? fromValue !== "1"
            ? [...(filters || []), `تعداد فصل ها: از ${fromValue} فصل`]
            : null
          : filterPattern === "fav"
            ? fromValue !== "1"
              ? [...(filters || []), `تعداد پسندیده ها: از ${fromValue} نفر`]
              : null
            : filterPattern === "scorer"
              ? fromValue !== "1"
                ? [
                    ...(filters || []),
                    `تعداد امتیازدهندگان: از ${fromValue} نفر`,
                  ]
                : null
              : null
      );
    }
  }

  function setEqualFilter(fromOrTo) {
    deleteAllFilters();
    setFilters((filters) =>
      filterPattern === "chapter"
        ? [
            ...(filters || []),
            `تعداد فصل ها: ${fromOrTo === "from" ? fromValue : toValue} فصل`,
          ]
        : filterPattern === "fav"
          ? [
              ...(filters || []),
              `تعداد پسندیده ها: ${fromOrTo === "from" ? fromValue : toValue} نفر`,
            ]
          : filterPattern === "scorer"
            ? [
                ...(filters || []),
                `تعداد امتیازدهندگان: ${fromOrTo === "from" ? fromValue : toValue} نفر`,
              ]
            : null
    );
  }

  function setNotEqualFilter(numWithoutLeadingZeros, fromOrTo) {
    deleteAllFilters();
    setFilters((filters) =>
      filterPattern === "chapter"
        ? fromOrTo === "from"
          ? [
              ...(filters || []),
              fromValue !== "1"
                ? `تعداد فصل ها: از ${fromValue} فصل`
                : undefined,
              numWithoutLeadingZeros !== Number(maxValue)
                ? `تعداد فصل ها: تا ${numWithoutLeadingZeros} فصل`
                : undefined,
            ].filter((item) => item !== undefined)
          : [
              ...(filters || []),
              numWithoutLeadingZeros !== 1
                ? `تعداد فصل ها: از ${numWithoutLeadingZeros} فصل`
                : undefined,
              toValue !== maxValue
                ? `تعداد فصل ها: تا ${toValue} فصل`
                : undefined,
            ].filter((item) => item !== undefined)
        : filterPattern === "fav"
          ? fromOrTo === "from"
            ? [
                ...(filters || []),
                fromValue !== "1"
                  ? `تعداد پسندیده ها: از ${fromValue} نفر`
                  : undefined,
                numWithoutLeadingZeros !== Number(maxValue)
                  ? `تعداد پسندیده ها: تا ${numWithoutLeadingZeros} نفر`
                  : undefined,
              ].filter((item) => item !== undefined)
            : [
                ...(filters || []),
                numWithoutLeadingZeros !== 1
                  ? `تعداد پسندیده ها: از ${numWithoutLeadingZeros} نفر`
                  : undefined,
                toValue !== maxValue
                  ? `تعداد پسندیده ها: تا ${toValue} نفر`
                  : undefined,
              ].filter((item) => item !== undefined)
          : filterPattern === "scorer"
            ? fromOrTo === "from"
              ? [
                  ...(filters || []),
                  fromValue !== "1"
                    ? `تعداد امتیازدهندگان: از ${fromValue} نفر`
                    : undefined,
                  numWithoutLeadingZeros !== Number(maxValue)
                    ? `تعداد امتیازدهندگان: تا ${numWithoutLeadingZeros} نفر`
                    : undefined,
                ].filter((item) => item !== undefined)
              : [
                  ...(filters || []),
                  numWithoutLeadingZeros !== 1
                    ? `تعداد امتیازدهندگان: از ${numWithoutLeadingZeros} نفر`
                    : undefined,
                  toValue !== maxValue
                    ? `تعداد امتیازدهندگان: تا ${toValue} نفر`
                    : undefined,
                ].filter((item) => item !== undefined)
            : null
    );
  }

  function handleFromValue() {
    if (fromValue.trim() === "" || /^0+$/.test(fromValue) || isNaN(fromValue)) {
      setFromValue("1");
      setFromFilters();
      return;
    }
    const num = Number(fromValue);
    if (num < 0 || !Number.isInteger(num) || num === 0) {
      setFromValue("1");
      setFromFilters();
      return;
    }
    const numWithoutLeadingZeros = parseInt(fromValue, 10);
    if (numWithoutLeadingZeros >= Number(toValue)) {
      setFromValue(toValue);
      setEqualFilter("to");
      return;
    }
    setFromValue(`${numWithoutLeadingZeros}`);
    setNotEqualFilter(numWithoutLeadingZeros, "to");
  }

  function handleToValue() {
    if (toValue.trim() === "" || /^0+$/.test(toValue) || isNaN(toValue)) {
      setToValue(maxValue);
      setToFilters();
      return;
    }
    const num = Number(toValue);
    if (num < 0 || !Number.isInteger(num) || num === 0) {
      setToValue(maxValue);
      setToFilters();
      return;
    }
    const numWithoutLeadingZeros = parseInt(toValue, 10);
    if (numWithoutLeadingZeros <= Number(fromValue)) {
      setToValue(fromValue);
      setEqualFilter("from");
      return;
    }
    setToValue(`${numWithoutLeadingZeros}`);
    setNotEqualFilter(numWithoutLeadingZeros, "from");
  }

  return (
    <div className="flex justify-between mr-[30px] gap-[76px]">
      <div className="flex items-center gap-[9px]">
        <span className="text-[20px] font-[300] ">از:</span>
        <input
          dir="ltr"
          value={fromValue}
          onChange={(e) =>
            e.target.value.length <= valueLength &&
            !isNaN(Number(e.target.value))
              ? setFromValue(e.target.value)
              : null
          }
          onBlur={() => handleFromValue()}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleFromValue();
              e.target.blur();
            }
          }}
          className="h-[40px] w-[80px] bg-white rounded-[5px] text-center outline-[2px] outline-[#000000]/21 focus:outline-[3px] focus:outline-[#2663CD]"
        />
      </div>
      <div className="flex items-center gap-[9px]">
        <span className="text-[20px] font-[300] ">تا:</span>
        <input
          dir="ltr"
          value={toValue}
          onChange={(e) =>
            e.target.value.length <= valueLength &&
            !isNaN(Number(e.target.value))
              ? setToValue(e.target.value)
              : null
          }
          onBlur={() => handleToValue()}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleToValue();
              e.target.blur();
            }
          }}
          className="h-[40px] w-[80px] bg-white rounded-[5px] text-center outline-[2px] outline-[#000000]/21 focus:outline-[3px] focus:outline-[#2663CD]"
        />
      </div>
    </div>
  );
}

function Book({ coverImage, bookName, authorName, star, bookDescription }) {
  return (
    <div className="gap-[20px] py-[26px] pl-[30px] pr-[13px] bg-[#A4C0ED] rounded-[25px] outline-[2px] outline-[#000000]/21 flex items-center justify-between">
      <div className="flex gap-[16px] items-center">
        {coverImage === null ? (
          <img
            src="/src/assets/images/book_sample1.png"
            alt="book"
            className="rounded-[20px] w-[153px] h-[184px]"
          />
        ) : (
          <img
            src={`/api${coverImage}`}
            alt="book"
            className="rounded-[20px] w-[130px] h-[150px]"
          />
        )}
        <div className="flex flex-col gap-[10px] overflow-hidden h-[184px] mx-h-[184px]">
          <h3 className="text-[24px] font-[400] top-0">{bookName}</h3>
          <div className="flex gap-[30px] top-0 -mt-[5px]">
            <span className="text-[18px] font-[400]">مؤلف: {authorName}</span>
            <Rating dir="ltr" readOnly precision={0.01} value={star} />
          </div>
          <p className="text-[14px] font-[300] top-0">{bookDescription}</p>
        </div>
      </div>
      <div className="flex flex-col gap-[13px]">
        <button className="btn !py-[9px] !rounded-[10px] !min-w-[160px] !h-fit !mr-0 !ml-0 !mb-0">
          <span className="span-btn">شروع مطالعه کتاب</span>
        </button>
        <button className="btn !py-[9px] !rounded-[10px] !min-w-[160px] !h-fit !mr-0 !ml-0 !mb-0">
          <span className="span-btn">مشاهده جزئیات کتاب</span>
        </button>
      </div>
    </div>
  );
}

const Forum = ({
  forumId,
  forumName,
  forumDescription,
  createdAt,
  bookId,
  forumImage,
}) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("fa-IR", options);
  };

  const getImageSrc = () => {
    if (forumImage) {
      return `http://45.158.169.198${forumImage}`;
    }
    return `/src/assets/images/book_sample${bookId % 10 || 1}.png`;
  };

  return (
    <button
      onClick={() => navigate(`/threads/${forumId}`)}
      className="relative overflow-hidden py-[10px] pr-[10px] pl-[90px] bg-[#a3d5ff] outline-[2px] outline-[#000000]/21 rounded-[15px] gap-[38px] flex items-center cursor-pointer hover:ease-in-out hover:before:w-full hover:before:h-full before:absolute before:w-0 before:h-0 before:bg-[#2663CD]/40 before:shadow-none hover:shadow-[#000000]/21 hover:shadow-lg before:inset-0 before:transition-all before:duration-[0.6s] before:ease-in-out transition-all active:before:bg-[#2663CD]/20 active:outline-none active:shadow-none"
    >
      <img
        src={getImageSrc()}
        alt="book cover"
        className="relative w-[105px] h-[132px] rounded-[5px] z-2 object-cover"
      />
      <div className="flex flex-col text-start relative z-2">
        <h3 className="text-[20px] font-[400] text-black">{forumName}</h3>
        <div className="flex gap-[13px] mb-[13px]">
          <span className="text-[12px] font-[300] text-[#333333]">
            ایجاد شده در {formatDate(createdAt)}
          </span>
        </div>
        <p className="text-[14px] font-[300]">{forumDescription}</p>
      </div>
    </button>
  );
};

function Person({ person }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isHoveredInnerButton, setIsHoveredInnerButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //useeffect for following |||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  useEffect(() => {
    setLoading(true);
    const fetchFollowing = async () => {
      try {
        const response = await fetch(`/api/user/is/follow/${person.id}/`, {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        const data = await response.json();
        setIsFollowing(data.is_follow);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFollowing();
  }, []);
  const handleFollow = async () => {
    try {
      const response = await fetch(`/api/user/toggle/follow/${person.id}/`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
    } catch (err) {
      console.error(err.message);
    }
  };
  if (loading) {
    return (
      <div className="h-[100vh] grid place-items-center">
        <Loading />
      </div>
    );
  }
  return (
    <button
      onClick={() => {
        if (!isHoveredInnerButton) {
          navigate(`/anotheruserprofile/${person.id}`);
        }
      }}
      className={`relative overflow-hidden p-[21px] bg-[#A4C0ED] outline-[2px] outline-[#000000]/21 rounded-[20px] flex items-center justify-between cursor-pointer ${!isHoveredInnerButton ? "hover:ease-in-out hover:before:w-full hover:before:h-full hover:shadow-[#000000]/50 hover:shadow-lg hover:text-white" : ""} before:absolute before:w-0 before:h-0 before:bg-[#2663CD]/60 before:shadow-none before:inset-0 before:transition-all before:duration-[0.2s] transition-all active:before:bg-[#2663CD]/40 active:outline-none active:shadow-none active:ring-0 active:ring-offset-0`}
    >
      <div className="flex items-center gap-[21px] relative">
        <img
          src="/src/assets/images/following.png"
          alt="follow"
          className="rounded-full w-[110px] h-[110px]"
        />
        <div className="flex flex-col gap-[7px] items-start">
          <h3>
            {person.name.length > 12
              ? person.name.slice(0, 12) + "..."
              : person.name}
          </h3>
          <span>{person.user_info.following_count}</span>
        </div>
      </div>
      <button
        onMouseEnter={() => setIsHoveredInnerButton(true)}
        onMouseLeave={() => setIsHoveredInnerButton(false)}
        onClick={() => {
          setIsFollowing(!isFollowing);
          handleFollow();
        }}
        className="btn py-[7px] px-[21px] !rounded-[10px] !w-fit !h-fit !ml-0 !mr-0 !mb-0"
      >
        <span className="span-btn text-[14px] font-[300]">
          {isFollowing ? "دنبال نکردن" : "دنبال کردن"}
        </span>
      </button>
    </button>
  );
}
