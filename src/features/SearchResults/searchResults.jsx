import React, { useState, useEffect } from "react";
import Navbar from "../../pages/Navbar";

import Footer from "../../common/Footer/Footer";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router";
import Loading from "../../common/Loading/Loading";

export default function SearchResults({ searchingItem = "people" }) {
  const [allOfThem, setAllOfThem] = useState(true);
  const [isVisibleFilters, setIsVisibleFilters] = useState(false);
  const [people, setPeople] = useState([]); //get current page people from api
  const [books, setBooks] = useState([]); //get current page books from api
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentpage, setcurrentpage] = useState(1);
  const [currentpage1, setcurrentpage1] = useState(1);

  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const [searched, setSearched] = useState("");

  // const [people, setPeople] = useState([]);
  useEffect(() => {
    if (searchingItem === "forum") {
      const fetchForums = async () => {
        setLoading(true);
        try {
          const response = await fetch(`http://127.0.0.1:8000/forum/?page=${currentpage}`);
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
          const response = await fetch(`http://127.0.0.1:8000/user/users/all/?page=1`);
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
    setLoading(true);
    setAllOfThem(false);
    console.log(page);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/user/search/${searched}/?page=${page}`
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
        className={`flex flex-col items-center pt-[25px] pb-[60px] ${searchingItem == "book" ? "px-[98px]" : "px-[98px]"} w-[100%]`}
      >
        <h1 className="font-bold text-[#265073] text-[32px] mb-[30px]">
          {searchingItem === "book"
            ? "جستجوی کتاب"
            : searchingItem === "people"
              ? "افراد"
              : "تالار گفتگو"}
        </h1>
        <form
          className={`mb-[37px] ${
            searchingItem === "book" ? "items-center" : ""
          }`}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className={`flex gap-[26px]`}>
            {searchingItem === "book" ? (
              <div className="flex gap-[2px] ml-[-10px] items-center">
                <span className="text-[20px] font-[100]">{"["}</span>
                <button
                  onClick={() => setIsVisibleFilters(!isVisibleFilters)}
                  className="cursor-pointer group relative"
                >
                  <span className="text-[20px] font-[400] text-[#2663EB]">
                    فیلترها
                  </span>
                  <div className="h-[1px] w-full absolute bg-[#2663EB] bottom-1.25 collapse group-hover:visible group-active:collapse"></div>
                </button>
                <span className="text-[20px] font-[100]">{"]"}</span>
              </div>
            ) : null}
            <div className="relative flex items-center">
              <input
                onChange={(e) => {
                  setSearched(e.target.value);
                }}
                className="w-[693px] h-[49px] py-[12.5px] pr-[26px] pl-[50px] bg-white rounded-[20px] outline-[2px] outline-[#000000]/21 shadow-lg shadow-[#000000]/25 focus:shadow-none focus:outline-[3px] focus:outline-[#2663cd] placeholder:text-[16px] placeholder:font-[300] placeholder:text-[#265073]"
                placeholder={
                  searchingItem === "people"
                    ? "نام کاربری"
                    : searchingItem == "book"
                      ? "نام کتاب"
                      : "موضوع تالار"
                }
              />
              <img
                src="/images/search.png"
                alt="search"
                className="w-[24px] h-[24px] z-2 ml-[15px] absolute left-0"
              />
            </div>
            <button
              onClick={() => {
                if (searchingItem == "people") {
                  fetchPeople();
                }
              }}
              className="!py-[12px] !px-[28px] !rounded-[20px] !w-fit !h-fit !mb-0 !ml-0 !mr-0 shadow-2xl btn"
            >
              <span className="span-btn !text-[16px] !font-[400]">
                {searchingItem === "forum"
                  ? "جستجوی گفتگو"
                  : searchingItem == "book"
                    ? "جستجوی کتاب"
                    : "جستجوی فرد"}
              </span>
            </button>
          </div>
        </form>
        {searchingItem === "book" && isVisibleFilters ? (
          <SearchFilters searchingItem={searchingItem} />
        ) : null}
        <div className="flex flex-col w-[100%]">
          {error == "" ? <div>{error} asda </div> : null}
          {searchingItem !== "book" ? (
            <h2 className="text-[16px] font-[300] mb-[31px]">نتایج جستجو</h2>
          ) : (
            <div className="flex items-center justify-between mb-[21px]">
              <h2 className="text-[16px] font-[300]">نتایج جستجو</h2>
              <div className="flex items-center gap-[10px]">
                <h2 className="text-[16px] font-[300]">مرتب سازی براساس</h2>
                <SelectMenu
                  placehold={"--انتخاب کنید--"}
                  options={["تازه ترین", "محبوب ترین"]}
                  w={"147"}
                />
              </div>
            </div>
          )}
          {searchingItem === "book" ? (
            <div className="grid grid-cols-1 gap-[40px] mb-[30px]">
              {books.map((i) => (
                <Book
                  key={i}
                  coverImage={`/images/book_sample${i}.png`}
                />
              ))}
            </div>
          ) : searchingItem === "forum" ? (
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

function SearchFilters({ searchingItem }) {
  const [filterNum, setFilterNum] = useState(0);
  const [filters, setFilters] = useState([
    "رمان(داستانی)",
    "علمی-تخیلی",
    "جنائی",
  ]);
  const [genres, setGenres] = useState([]);
  const [tags, setTags] = useState([]);
  const [writerName, setWriterName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGenresAndTags = async () => {
      setLoading(true);
      const response = await fetch(`http://127.0.0.1:8000/tag/genres/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response2 = await fetch(`http://127.0.0.1:8000/tag/tag-categories/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const data2 = await response2.json();
      setGenres(data.genres);
      setTags(data2.tag_categories);
    };
    if (searchingItem === "book") {
      try {
        fetchGenresAndTags();
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  return (
    <div className="flex flex-col w-full bg-[#A4C0ED] rounded-[20px] border-[2px] border-[#000000]/21 px-[55px] pt-[30px] pb-[60px] mb-[37px]">
      <div className="flex flex-col gap-[17px] w-fit">
        <div className="flex justify-between items-center">
          <div className="flex gap-[3px] items-center">
            <img
              src="/images/filter.png"
              alt="filter"
              className="min-w-[30px] max-w-[30px] min-h-[30px] max-h-[30px]"
            />
            <h2 className="text-[20px] font-[300] text-000000]">
              فیلترها ({filterNum})
            </h2>
          </div>
          <button className="group cursor-pointer relative">
            <span className="text-[16px] font-[400] text-[#A4C0ED]">
              حذف فیلترها
            </span>
            <div className="h-[1px] w-full absolute bg-[#A4C0ED] bottom-1.25 collapse group-hover:visible group-active:collapse"></div>
          </button>
        </div>
        <div className="flex flex-wrap gap-[11px] mb-[20px]">
          {filters.map((filter, i) => (
            <Filter
              key={i}
              filterName={filter}
              deleteFilter={setFilters}
              filters={filters}
            />
          ))}
        </div>
      </div>
      <h2 className="border-t-[1px] border-000000] pt-[20px] text-[20px] font-[300] text-000000] mb-[17px]">
        ژانرها:
      </h2>
      <div className="flex flex-wrap gap-x-[25px] gap-y-[21px] mx-[30px] p-[17px] bg-[#FFF] rounded-[15px] border-[2px] border-[#000000]/21 mb-[50px]">
        {loading ? (
          <Loading />
        ) : (
          genres.map((genre) => (
            <GenreAndTag
              key={genre.id}
              genreOrTagName={genre.title}
              addFilter={setFilters}
              filters={filters}
            />
          ))
        )}
      </div>
      <h2 className="text-[20px] font-[300] text-000000] mb-[17px]">
        دسته بندی تگ ها:
      </h2>
      <div className="flex flex-wrap gap-x-[25px] gap-y-[21px] mx-[30px] p-[17px] bg-[#FFF] rounded-[15px] border-[2px] border-[#000000]/21 mb-[17px]">
        {loading ? (
          <Loading />
        ) : (
          tags.map((tagCategory) => (
            <GenreAndTag
              key={tagCategory.id}
              genreOrTagName={tagCategory.title}
            />
          ))
        )}
      </div>
      <h2 className="text-[20px] font-[300] text-000000] mb-[17px]">
        جستجوی تگ ها:
      </h2>
      <input
        className="p-[12px] mb-[17px] w-[calc(100%-60px)] mx-auto bg-white text-[16px] font-[300] max-h-[40px] rounded-[6px] outline-[2px] outline-[#000000]/21 focus:outline-[3px] focus:outline-[#2663cd] placeholder:text-[16px] placeholder:font-[300] placeholder:text-[#265073]"
        placeholder="تگ مورد نظر خود را اینجا جستجو کنید..."
      ></input>
      <div className="flex flex-wrap gap-x-[25px] gap-y-[21px] mx-[30px] p-[17px] bg-[#FFF] rounded-[15px] border-[2px] border-[#000000]/21 mb-[50px]">
        {loading ? (
          <Loading />
        ) : (
          tags.map((tagCategory) =>
            tagCategory.tags.map((tag) => (
              <GenreAndTag
                key={tag.id}
                genreOrTagName={tag.title}
                addFilter={setFilters}
                filters={filters}
              />
            ))
          )
        )}
      </div>
      <div className="flex justify-between w-[calc(100%-30px)] mb-[50px]">
        <div className="flex flex-col gap-[17px]">
          <h2 className="text-[20px] font-[300] text-000000]">تعداد فصل ها:</h2>
          <div className="flex justify-between mr-[30px] gap-[76px]">
            <div className="flex items-center gap-[9px]">
              <span className="text-[20px] font-[300] text-000000]">از:</span>
              <input className="h-[40px] w-[70px] bg-white rounded-[5px] border-[2px] border-[#000000]/21 text-center focus:outline-none" />
            </div>
            <div className="flex items-center gap-[9px]">
              <span className="text-[20px] font-[300] text-000000]">تا:</span>
              <input className="h-[40px] w-[70px] bg-white rounded-[5px] border-[2px] border-[#000000]/21 text-center focus:outline-none" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[17px]">
          <h2 className="text-[20px] font-[300] text-000000]">
            تعداد افرادی که پسندیده اند:
          </h2>
          <div className="flex justify-between mr-[30px] gap-[76px]">
            <div className="flex items-center gap-[9px]">
              <span className="text-[20px] font-[300] text-000000]">از:</span>
              <input className="h-[40px] w-[70px] bg-white rounded-[5px] border-[2px] border-[#000000]/21 text-center focus:outline-none" />
            </div>
            <div className="flex items-center gap-[9px]">
              <span className="text-[20px] font-[300] text-000000]">تا:</span>
              <input className="h-[40px] w-[70px] bg-white rounded-[5px] border-[2px] border-[#000000]/21 text-center focus:outline-none" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[17px]">
          <h2 className="text-[20px] font-[300] text-000000]">
            تعداد امتیازدهندگان:
          </h2>
          <div className="flex justify-between mr-[30px] gap-[76px]">
            <div className="flex items-center gap-[9px]">
              <span className="text-[20px] font-[300] text-000000]">از:</span>
              <input className="h-[40px] w-[70px] bg-white rounded-[5px] border-[2px] border-[#000000]/21 text-center focus:outline-none" />
            </div>
            <div className="flex items-center gap-[9px]">
              <span className="text-[20px] font-[300] text-000000]">تا:</span>
              <input className="h-[40px] w-[70px] bg-white rounded-[5px] border-[2px] border-[#000000]/21 text-center focus:outline-none" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between w-[calc(100%-30px)] items-center mb-[50px]">
        <div className="flex flex-col gap-[17px]">
          <h2 className="text-[20px] font-[300] text-000000]">
            میانگین امتیازات کتاب:
          </h2>
          <div className="flex justify-between mr-[30px] gap-[76px]">
            <div className="flex items-center gap-[9px]">
              <span className="text-[20px] font-[300] text-000000]">از:</span>
              <input className="h-[40px] w-[70px] bg-white rounded-[5px] border-[2px] border-[#000000]/21 text-center focus:outline-none" />
            </div>
            <div className="flex items-center gap-[9px]">
              <span className="text-[20px] font-[300] text-000000]">تا:</span>
              <input className="h-[40px] w-[70px] bg-white rounded-[5px] border-[2px] border-[#000000]/21 text-center focus:outline-none" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[17px]">
          <h2 className="text-[20px] font-[300] text-000000]">وضعیت کتاب:</h2>
          <CheckBoxes addFilter={setFilters} filters={filters} />
        </div>
        <div className="flex flex-col gap-[17px]">
          <h2 className="text-[20px] font-[300] text-000000]">نام نویسنده:</h2>
          <div className="flex gap-[6px]">
            <button
              onClick={() => {
                if (writerName !== "") setFilters([...filters, writerName]);
              }}
              className="btn !bg-[#2663CD]/80 !w-fit !h-fit !mb-0 !mx-0 !py-[10.5px] !px-[7px] !rounded-r-[50px] !rounded-l-[5px]"
            >
              <span className="span-btn !text-[15px] !font-[400]">
                اعمال فیلتر
              </span>
            </button>
            <input
              onChange={(e) => setWriterName(e.target.value)}
              value={writerName}
              placeholder="نام نویسنده"
              className="px-[8px] shadow-lg shadow-[#000]/25 bg-white w-[210px] h-[43px] rounded-r-[5px] rounded-l-[45px] outline-[2px] outline-[#000000]/10 focus:outline-[3px] focus:outline-[#2663CD] focus:shadow-none"
            />
          </div>
        </div>
      </div>
      <h2 className="text-[20px] font-[300] text-000000] mb-[17px]">
        عبارت کلیدی:
      </h2>
      <input
        className="p-[12px] mb-[50px] w-[calc(100%-60px)] mx-auto bg-white text-[16px] font-[300] max-h-[40px] rounded-[6px] outline-[2px] outline-[#000000]/21 focus:outline-[3px] focus:outline-[#2663CD] placeholder:text-[16px] placeholder:font-[300] placeholder:text-[#265073]"
        placeholder="جستجوی داستان براساس عبارت کلیدی خلاصه آن..."
      ></input>
      <div className="flex items-center justify-between w-[calc(100%-30px)]">
        <h2 className="text-[20px] font-[300] text-000000]">تاریخ انتشار:</h2>
        <div className="flex gap-[18px] items-center">
          <span className="text-[20px] font-[300] text-000000] ml-[-9px]">
            از:
          </span>
          <SelectMenu
            placehold={"--روز--"}
            options={Array.from({ length: 30 }, (_, i) => `${i + 1}`)}
            w={"100"}
          />
          <SelectMenu
            placehold={"--ماه--"}
            options={[
              "فروردین",
              "اردیبهشت",
              "خرداد",
              "تیر",
              "مرداد",
              "شهریور",
              "مهر",
              "آبان",
              "آذر",
              "دی",
              "بهمن",
              "اسفند",
            ]}
            w={"100"}
          />
          <SelectMenu
            placehold={"--سال--"}
            options={Array.from({ length: 91 }, (_, i) => `${i + 1300}`)}
            w={"100"}
          />
        </div>
        <div className="flex gap-[18px] items-center">
          <span className="text-[20px] font-[300] text-000000] ml-[-9px]">
            تا:
          </span>
          <SelectMenu
            placehold={"--روز--"}
            options={Array.from({ length: 30 }, (_, i) => `${i + 1}`)}
            w={"100"}
          />
          <SelectMenu
            placehold={"--ماه--"}
            options={[
              "فروردین",
              "اردیبهشت",
              "خرداد",
              "تیر",
              "مرداد",
              "شهریور",
              "مهر",
              "آبان",
              "آذر",
              "دی",
              "بهمن",
              "اسفند",
            ]}
            w={"100"}
          />
          <SelectMenu
            placehold={"--سال--"}
            options={Array.from({ length: 91 }, (_, i) => `${i + 1300}`)}
            w={"100"}
          />
        </div>
      </div>
    </div>
  );
}

function Filter({ filterName, deleteFilter, filters }) {
  return (
    <div className="items-center w-[160px] flex justify-between rounded-full bg-white px-[11px] py-[6px]">
      <span className="text-[15px] font-[100]">{filterName}</span>
      <button
        onClick={() => {
          deleteFilter(filters.filter((filter) => filter != filterName));
        }}
        className="grid rounded-full cursor-pointer h-[15px] w-[15px] hover:bg-[#E5E5E5]/70 transition-colors duration-400 active:bg-[#E5E5E5] active:duration-100"
      >
        <span className="text-black text-[17px] font-[100] translate-y-[-4px] mx-auto">
          &times;
        </span>
      </button>
    </div>
  );
}

function GenreAndTag({ genreOrTagName, addFilter = null, filters = null }) {
  return (
    <button
      onClick={() => {
        if (!filters.includes(genreOrTagName))
          addFilter([...filters, genreOrTagName]);
      }}
      className="btn !bg-[#2663CD]/80 !w-[215px] !h-fit !mb-0 !mx-0 !rounded-[10px] px-[18px] py-[10px]"
    >
      <span className="span-btn !text-[14px] !font-[300]">
        {genreOrTagName}
      </span>
    </button>
  );
}

function CheckBoxes(addFilter, filters) {
  const [checkedNum, setCheckedNum] = useState(-1);

  return (
    <div className="flex mr-[30px] gap-[33px]">
      <div className="flex items-center gap-[5px]">
        <button
          onClick={() => {
            if (checkedNum === -1) {
              setCheckedNum(1);
              addFilter([...filters, "به اتمام رسیده"]);
            } else if (checkedNum === 1) {
              setCheckedNum(-1);
              addFilter(
                addFilter(
                  filters.filter((filter) => filter !== "به اتمام رسیده")
                )
              );
            } else {
              setCheckedNum(1);
              addFilter([...filters, "به اتمام رسیده"]);
              addFilter(
                filters.filter((filter) => filter !== "به اتمام رسیده")
              );
            }
          }}
          className="rounded-full cursor-pointer h-[30px] w-[30px] hover:bg-[#E5E5E5]/30 transition-colors duration-400 active:bg-[#E5E5E5]/50 active:duration-100"
        >
          {checkedNum === 1 ? (
            <img
              src="/images/checked.png"
              alt="checked"
              className="h-[18px] w-[18px] mx-auto"
            />
          ) : (
            <img
              src="/images/unchecked.png"
              alt="unchecked"
              className="h-[18px] w-[18px] mx-auto"
            />
          )}
        </button>
        <span className="text-[20px] text-000000] font-[400]">
          به اتمام رسیده
        </span>
      </div>
      <div className="flex items-center gap-[5px]">
        <button
          onClick={() => {
            if (checkedNum === -1) {
              setCheckedNum(0);
              addFilter([...filters, "به اتمام رسیده"]);
            } else if (checkedNum === 0) {
              setCheckedNum(-1);
              addFilter(
                addFilter(
                  filters.filter((filter) => filter !== "به اتمام رسیده")
                )
              );
            } else {
              setCheckedNum(0);
              addFilter([...filters, "به اتمام رسیده"]);
              addFilter(
                filters.filter((filter) => filter !== "به اتمام رسیده")
              );
            }
          }}
          className="rounded-full cursor-pointer h-[30px] w-[30px] hover:bg-[#E5E5E5]/30 transition-colors duration-400 active:bg-[#E5E5E5]/50 active:duration-100"
        >
          {checkedNum === 0 ? (
            <img
              src="/images/checked.png"
              alt="checked"
              className="h-[18px] w-[18px] mx-auto"
            />
          ) : (
            <img
              src="/images/unchecked.png"
              alt="unchecked"
              className="h-[18px] w-[18px] mx-auto"
            />
          )}
        </button>
        <span className="text-[20px] text-000000] font-[400]">منتشر نشده</span>
      </div>
    </div>
  );
}

function SelectMenu({ placehold, options, w }) {
  const [isSelectOpened, setIsSelectOpened] = useState(false);
  const [selectValue, setSelectValue] = useState(placehold);

  return (
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
        className={`z-6 flex bg-[#ffffff] w-[${w}px] h-[45px] ${isSelectOpened ? "rounded-t-[12px]" : "rounded-[12px] shadow-lg shadow-[#000000]/21"} pl-[25px] pr-[5px] text-[13px] ${selectValue !== placehold ? "text-[#000000]" : "text-[#265073]"} cursor-pointer outline-[2px] outline-[#000000]/21`}
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
        className={`overflow-y-scroll flex flex-col absolute bg-[#ffffff] w-[${w}px] h-[90px] outline-[2px] outline-[#000000]/21 z-9 divide-y divide-[#2F4F4F]/50 rounded-b-[12px] ${isSelectOpened ? "visible" : "hidden"}`}
      >
        <li className={`min-h-[45px] w-full z-10`}>
          <button
            onClick={(e) => {
              e.preventDefault();
              setSelectValue(`${placehold}`);
            }}
            className="z-11 flex text-[15px] text-[#000000]/70 w-full h-full cursor-pointer hover:bg-[#2663cd]/90 hover:cursor-pointer active:outline-none"
          >
            <span className="m-auto text-[#265073] z-12">{`${placehold}`}</span>
          </button>
        </li>
        {options.map((option, i) => (
          <li className={`min-h-[45px] w-full z-10`} key={i}>
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
  );
}

function Book({
  coverImage,
  bookName = "نام کتاب",
  authorName = "نام نویسنده",
  star = 4.5,
}) {
  return (
    <div className="py-[26px] pl-[40px] pr-[20px] bg-[#A4C0ED] rounded-[25px] outline-[2px] outline-[#000000]/21 flex items-center justify-between">
      <div className="flex gap-[27px] items-center">
        <img
          src={coverImage}
          alt="book"
          className="rounded-[20px] w-[153px] h-[189px]"
        />
        <div className="flex flex-col gap-[5px]">
          <h3 className="text-[32px] font-[400]">{bookName}</h3>
          <div className="flex gap-[20px]">
            <span className="text-[20px] font-[400]">{authorName}</span>
            <Rating dir="ltr" readOnly precision={0.1} value={star} />
          </div>
          <p className="text-[14px] font-[300]">
            خلاصه داستان: این متن صرفاً جهت تست متن خلاصه کتاب می باشد.
            <br />
            خلاصه داستان: این متن صرفاً جهت تست متن خلاصه کتاب می باشد. خلاصه
            داستان: این متن صرفاً جهت تست متن خلاصه کتاب می باشد.
            <br />
            خلاصه داستان: این متن صرفاً جهت تست متن خلاصه کتاب می باشد.
          </p>
        </div>
      </div>
      <button className="btn !py-[9px] !rounded-[10px] !min-w-[203px] !h-fit !mr-0 !ml-0 !mb-0">
        <span className="span-btn">مشاهده جزئیات کتاب</span>
      </button>
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
    return `/images/book_sample${bookId % 10 || 1}.png`;
  };

  return (
    <button
      onClick={() => navigate(`/threads/${forumId}`)}
      className="relative overflow-hidden py-[10px] pr-[10px] pl-[90px] bg-[#a3d5ff] outline-[2px] outline-[#000000]/21 rounded-[15px] gap-[38px] flex items-center cursor-pointer hover:ease-in-out hover:before:w-full hover:before:h-full before:absolute before:w-0 before:h-0 before:bg-[#2663CD]/40 before:shadow-none hover:shadow-[#000000]/21 hover:shadow-lg before:inset-0 before:transition-all before:duration-[0.2s] transition-all active:before:bg-[#2663CD]/20 active:outline-none active:shadow-none"
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
        const response = await fetch(`http://127.0.0.1:8000/user/is/follow/${person.id}/`, {
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
      const response = await fetch(`http://127.0.0.1:8000/user/toggle/follow/${person.id}/`, {
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
          src="/images/following.png"
          alt="follow"
          className="rounded-full w-[110px] h-[110px]"
        />
        <div className="flex flex-col gap-[7px] items-start">
          <h3 >{person.name.length > 12 ? person.name.slice(0, 12) + '...' : person.name}</h3>
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
