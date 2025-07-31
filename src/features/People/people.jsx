import { useEffect, useState } from "react";
import Navbar from "../../pages/Navbar";
import Footer from "../../common/Footer/Footer";
import { useNavigate } from "react-router";
import Loading from "../../common/Loading/Loading";
import { FiUserPlus, FiSearch } from "react-icons/fi";

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
    const fetchAllPeople = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://batbooks.liara.run/user/users/all/?page=${currentpage}`
        );
        if (response.ok) {
          const data = await response.json();

          const enriched = await Promise.all(
            data.results.map(async (person) => {
              try {
                const res = await fetch(
                  `https://batbooks.liara.run/user/is/follow/${person.id}/`,
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                  }
                );
                const followData = await res.json();
                return { ...person, is_follow: followData.is_follow };
              } catch {
                return { ...person, is_follow: false };
              }
            })
          );

          setPeople(enriched);
          setTotalPages(Math.ceil(data.count / itemsPerPage));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllPeople();
  }, [currentpage]);

  const fetchPeople = async (page = 1) => {
    setLoading(true);
    setAllOfThem(false);
    if (searched.length < 3) {
      setError(" کلمه سرچ شده باید بزرگتر از سه حرف باشد ");
      setTotalPages(0);
      setPeople([]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://batbooks.liara.run/user/search/${searched}/?page=${page}`
      );
      if (response.ok) {
        const data = await response.json();

        const enriched = await Promise.all(
          data.results.map(async (person) => {
            try {
              const res = await fetch(
                `https://batbooks.liara.run/user/is/follow/${person.id}/`,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                  },
                }
              );
              const followData = await res.json();
              return { ...person, is_follow: followData.is_follow };
            } catch {
              return { ...person, is_follow: false };
            }
          })
        );

        setPeople(enriched);
        setTotalPages(Math.ceil(data.count / itemsPerPage));
      }
    } catch (err) {
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
      <main className="w-full h-screen flex items-center justify-center">
        <Loading />
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main
        dir="rtl"
        className="flex flex-col items-center pt-[25px] pb-[60px] px-4 md:px-[98px] w-[100%]"
      >
        <h1 className="font-bold text-[#265073] text-2xl md:text-[32px] mb-6 md:mb-[30px]">
          افراد
        </h1>
        <form
          className="mb-6 md:mb-[37px] w-full max-w-4xl"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col md:flex-row gap-4 md:gap-[26px] w-full">
            <input
              onChange={(e) => {
                setSearched(e.target.value);
              }}
              className="w-full h-[49px] py-[12.5px] pr-[26px] pl-[50px] bg-white rounded-[20px] outline-[2px] outline-[#000000]/21 shadow-lg shadow-[#000000]/25 focus:shadow-none focus:outline-[3px] focus:outline-[#2663cd] placeholder:text-[16px] placeholder:font-[300] placeholder:text-[#265073]"
              placeholder="نام کاربری"
            />
            <button
              onClick={() => {
                fetchPeople();
                setcurrentpage1(1);
                setTotalPages(0);
              }}
              className="!py-[12px] !px-[28px] !rounded-[20px] !w-fit !h-fit !mb-0 !ml-0 !mr-0 shadow-2xl btn self-center md:self-auto lg:!min-w-[180px] lg:!px-[32px]"
            >
              <span className="span-btn !text-[16px] !font-[400] whitespace-nowrap">
                <div className="flex flex-row-reverse items-center gap-2">
                  <p>جستجوی فرد </p>
                  <FiSearch />
                </div>
              </span>
            </button>
          </div>
        </form>
        <div className="flex flex-col w-full">
          {error == "" ? <div>{error} asda </div> : null}
          <h2 className="text-[16px] font-[300] mb-6 md:mb-[31px]">
            نتایج جستجو
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-[25px] mb-6 md:mb-[30px]">
            {people.map((person) => (
              <Person person={person} key={person.id} />
            ))}
          </div>
          {totalPages > 1 && allOfThem && (
            <Pagination
              currentPage={currentpage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
          {totalPages > 1 && !allOfThem && (
            <Pagination
              currentPage={currentpage1}
              totalPages={totalPages}
              onPageChange={handlePageChangeSearched}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function Person({ person }) {
  const [isFollowing, setIsFollowing] = useState(person.is_follow || false);
  const [isHoveredInnerButton, setIsHoveredInnerButton] = useState(false);
  const navigate = useNavigate();

  const handleFollow = async () => {
    try {
      await fetch(`https://batbooks.liara.run/user/toggle/follow/${person.id}/`, {
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

  return (
    <button
      onClick={() => {
        if (!isHoveredInnerButton) {
          navigate(`/anotheruserprofile/${person.id}`);
        }
      }}
      className={`relative overflow-hidden 
    p-3 sm:p-4 md:p-5 lg:p-5 xl:p-[21px] 
    bg-[#A4C0ED] outline-[2px] outline-[#000000]/21 
    rounded-[20px] flex items-center justify-between 
    cursor-pointer w-full
    ${!isHoveredInnerButton ? "hover:ease-in-out hover:before:w-full hover:before:h-full hover:shadow-[#000000]/50 hover:shadow-lg hover:text-white" : ""}
    before:absolute before:w-0 before:h-0 before:bg-[#2663CD]/60 
    before:shadow-none before:inset-0 before:transition-all 
    before:duration-[0.2s] transition-all 
    active:before:bg-[#2663CD]/40 active:outline-none 
    active:shadow-none active:ring-0 active:ring-offset-0`}
    >
      <div
        className="flex items-center 
    gap-1 sm:gap-2 md:gap-3 lg:gap-3 xl:gap-[15px] 
    relative w-full"
      >
        {person.user_info.image ? (
          <img
            src={`https://batbooks.liara.run/${person.user_info.image}`}
            alt="follow"
            className="rounded-full border border-white
        w-12 h-12 sm:w-14 sm:h-14 
        md:w-16 md:h-16 
        lg:w-20 lg:h-20 
        xl:w-[100px] xl:h-[100px]"
          />
        ) : (
          <img
            src="/images/following.png"
            alt="follow"
            className="rounded-full border-3 border-white 
        w-12 h-12 sm:w-14 sm:h-14 
        md:w-16 md:h-16 
        lg:w-20 lg:h-20 
        xl:w-[100px] xl:h-[100px]"
          />
        )}

        <div
          className="flex flex-col 
      gap-1 sm:gap-1 md:gap-2 lg:gap-2 xl:gap-[7px] 
      items-start flex-grow min-w-0"
        >
          <h3 className="text-xs sm:text-sm md:text-[15px] lg:text-[15px] xl:text-[16px] truncate ">
            {person.name.length > 15
              ? person.name.slice(0, 15) + "..."
              : person.name}
          </h3>
          <span className="text-[8px] sm:text-xs md:text-[13px] lg:text-[13px] xl:text-[14px]">
            تعداد دنبال کنندگان : {person.user_info.follower_count}
          </span>
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
        className="btn !flex !items-end
      py-1 px-2 sm:py-2 sm:px-3 
      md:py-[6px] md:px-[14px] 
      lg:py-[6px] lg:px-[16px] 
      xl:py-[7px] xl:px-[21px] 
      !rounded-[10px] !w-fit !h-fit 
      !ml-0 !mr-0 !mb-0 cursor-pointer 
      whitespace-nowrap"
      >
        <span
          className="span-btn 
      text-[10px] sm:text-xs 
      md:text-[13px] lg:text-[13px] 
      xl:text-[14px] font-[300]"
        >
          <div className="flex flex-row-reverse gap-1 items-center">
            <p>{isFollowing ? "دنبال نکردن" : "دنبال کردن"}</p>
            <FiUserPlus />
          </div>
        </span>
      </div>
    </button>
  );
}
