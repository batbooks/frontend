import { useEffect, useState } from "react";
import Navbar from "../../pages/Navbar";

import Footer from "../../common/Footer/Footer";
import { useNavigate } from "react-router";
import Loading from "../../common/Loading/Loading";

export default function People() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allOfThem, setAllOfThem] = useState(true);
  const [error, setError] = useState(null);
  const [currentpage, setcurrentpage] = useState(1);
  const [currentpage1, setcurrentpage1] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searched, setSearched] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchPeople = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/user/users/all/?page=${currentpage}`
        );
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
  }, [currentpage]);

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
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChangeSearched = (page) => {
    setcurrentpage1(page);

    fetchPeople(page);
  };

  const handlePageChange = (page) => {
    setcurrentpage(page);
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
        className="flex flex-col items-center pt-[25px] pb-[60px] px-[98px] w-[100%]"
      >
        <h1 className="font-bold text-[#265073] text-[32px] mb-[30px]">
          افراد
        </h1>
        <form className="mb-[37px]" onSubmit={(e) => e.preventDefault()}>
          <div className={`flex gap-[26px]`}>
            <input
              onChange={(e) => {
                setSearched(e.target.value);
              }}
              className="w-[693px] h-[49px] py-[12.5px] pr-[26px] pl-[50px] bg-white rounded-[20px] outline-[2px] outline-[#000000]/21 shadow-lg shadow-[#000000]/25 focus:shadow-none focus:outline-[3px] focus:outline-[#2663cd] placeholder:text-[16px] placeholder:font-[300] placeholder:text-[#265073]"
              placeholder="نام کاربری"
            />
            <button
              onClick={() => {
                fetchPeople();
                setcurrentpage1(1);
                setTotalPages(0);
              }}
              className="!py-[12px] !px-[28px] !rounded-[20px] !w-fit !h-fit !mb-0 !ml-0 !mr-0 shadow-2xl btn"
            >
              <span className="span-btn !text-[16px] !font-[400]">
                جستجوی فرد
              </span>
            </button>
          </div>
        </form>
        <div className="flex flex-col w-[100%]">
          {error == "" ? <div>{error} asda </div> : null}
          <h2 className="text-[16px] font-[300] mb-[31px]">نتایج جستجو</h2>
          <div className="grid grid-cols-3 gap-[25px] mb-[30px]">
            {people.map((person) => (
              <Person person={person} key={person.id} />
            ))}
          </div>
          {/* Pagination */}
          {totalPages > 1 && allOfThem && (
            <div className="flex justify-center gap-2 my-6 items-center">
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
          {/* Pagination */}
          {totalPages > 1 && !allOfThem && (
            <div className="flex justify-center gap-2 my-6 items-center">
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
        const response = await fetch(
          `http://127.0.0.1:8000/user/is/follow/${person.id}/`,
          {
            method: "GET",

            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
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
      const response = await fetch(
        `http://127.0.0.1:8000/user/toggle/follow/${person.id}/`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
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
          <h3>
            {person.name.length > 12
              ? person.name.slice(0, 12) + "..."
              : person.name}
          </h3>
          <span>{person.user_info.following_count}</span>
        </div>
      </div>
      <div
        role="button"
        tabIndex={0}
        onMouseEnter={() => setIsHoveredInnerButton(true)}
        onMouseLeave={() => setIsHoveredInnerButton(false)}
        onClick={(e) => {
          e.stopPropagation();
          setIsFollowing(!isFollowing);
          handleFollow();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.stopPropagation();
            setIsFollowing(!isFollowing);
            handleFollow();
          }
        }}
        className="btn py-[7px] px-[21px] !rounded-[10px] !w-fit !h-fit !ml-0 !mr-0 !mb-0 cursor-pointer"
      >
        <span className="span-btn text-[14px] font-[300]">
          {isFollowing ? "دنبال نکردن" : "دنبال کردن"}
        </span>
      </div>
    </button>
  );
}
