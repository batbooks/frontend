import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { logout } from "../../redux/infoSlice";
import { Menu, X } from "lucide-react";
import {
  FiHome,
  FiBook,
  FiSearch,
  FiMail,
  FiUser,
  FiEdit,
  FiLogOut,
  FiLogIn,
  FiUserPlus,
  FiUsers,
  FiMessageSquare,
  FiChevronDown,
  FiChevronUp,
  FiX,
} from "react-icons/fi";

const MobileMenu = ({ isAuthenticated, user, handleLogout, handleNav }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openCommunications, setOpenCommunications] = useState(false);
  const menuRef = useRef(null);

  const toggleCommunications = () => setOpenCommunications(!openCommunications);

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
      <button
        className="p-2 text-black hover:text-blue-600 transition"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <div
        ref={menuRef}
        className={`absolute right-0 top-[60px] w-64 bg-white shadow-xl rounded-xl overflow-hidden transform origin-top transition-all duration-300 ease-out ${
          isMenuOpen
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <ul className="divide-y divide-gray-200 text-right text-gray-800">
          {isAuthenticated ? (
            <>
              <li className="px-4 py-3 flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full"
                  src={
                    user.user_info.image
                      ? `/api${user.user_info.image}`
                      : "/images/user_none.png"
                  }
                  alt="User"
                />
                <span>{user.name}</span>
              </li>
              <li>
                <button
                  onClick={() => handleNav("/userprofile")}
                  className="w-full text-right px-5 py-3 hover:bg-blue-100 transition flex items-center gap-3"
                >
                  <FiUser className="text-blue-600" />
                  پروفایل کاربری
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("/mybooks/createbook")}
                  className="w-full text-right px-5 py-3 hover:bg-blue-100 transition flex items-center gap-3"
                >
                  <FiEdit className="text-blue-600" />
                  نوشتن کتاب جدید
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  onClick={() => handleNav("/auth/signup")}
                  className="w-full text-right px-5 py-3 hover:bg-blue-100 transition flex items-center gap-3"
                >
                  <FiUserPlus className="text-blue-600" />
                  ثبت‌نام
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("/auth/login")}
                  className="w-full text-right px-5 py-3 hover:bg-blue-100 transition flex items-center gap-3"
                >
                  <FiLogIn className="text-blue-600" />
                  ورود
                </button>
              </li>
            </>
          )}

          <li>
            <button
              onClick={() => handleNav("/", 1)}
              className="w-full text-right px-5 py-3 hover:bg-blue-100 transition flex items-center gap-3"
            >
              <FiHome className="text-blue-600" />
              صفحه اصلی
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNav("/mybooks", 2)}
              className="w-full text-right px-5 py-3 hover:bg-blue-100 transition flex items-center gap-3"
            >
              <FiBook className="text-blue-600" />
              کتاب‌های من
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNav("/search", 3)}
              className="w-full text-right px-5 py-3 hover:bg-blue-100 transition flex items-center gap-3"
            >
              <FiSearch className="text-blue-600" />
              جستجوی کتاب
            </button>
          </li>

          {/* پنل ارتباطی */}
          <li>
            <button
              onClick={toggleCommunications}
              className="w-full text-right px-5 py-3 hover:bg-blue-100 transition flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <FiMail className="text-blue-600" />
                پنل ارتباطی
              </div>
              {openCommunications ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            <ul
              className={`bg-gray-50 overflow-hidden transition-all duration-300 ${
                openCommunications ? "max-h-40" : "max-h-0"
              }`}
            >
              <li>
                <button
                  onClick={() =>
                    handleNav("/searchresults", { searchingItem: "forum" })
                  }
                  className="w-full text-right px-8 py-3 hover:bg-blue-100 transition flex items-center gap-3 text-sm"
                >
                  <FiMessageSquare className="text-blue-600" />
                  تالار گفتگو
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    handleNav("/searchresults", { searchingItem: "people" })
                  }
                  className="w-full text-right px-8 py-3 hover:bg-blue-100 transition flex items-center gap-3 text-sm"
                >
                  <FiUsers className="text-blue-600" />
                  افراد
                </button>
              </li>
            </ul>
          </li>

          <li>
            <button
              onClick={() => handleNav("/contact", 4)}
              className="w-full text-right px-5 py-3 hover:bg-blue-100 transition flex items-center gap-3"
            >
              ارتباط با ما
            </button>
          </li>

          {isAuthenticated && (
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full text-right px-5 py-3 hover:bg-red-100 text-red-600 transition flex items-center gap-3"
              >
                <FiLogOut className="text-red-600" />
                خروج از حساب
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

function Navbar() {
  const [openCommunications, setOpenCommunications] = useState(false);
  const toggleCommunications = () => setOpenCommunications(!openCommunications);
  const [isVisiblePanel, setIsVisiblePanel] = useState(false);
  const [isClickedPanel, setIsClickedPanel] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const [isVisibleUser, setIsVisibleUser] = useState(false);
  const [isClickedUser, setIsClickedUser] = useState(false);
  const [showSampleSearch, setShowSampleSearch] = useState(false);
  const [keepSearchOpen, setKeepSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  let navigate = useNavigate();
<<<<<<< HEAD
  const { user, isAuthenticated } = useSelector((state) => (state.auth));
=======
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

>>>>>>> 4a675b6b32465fdc06461ba16e32de58b86443f2
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/auth/login");
  };

  const handleNav = (path, itemId = null) => {
    if (itemId) setSelectedItem(itemId);
    navigate(path);
  };

  useEffect(() => {
    if (location.pathname === "/") setSelectedItem(1);
    else if (location.pathname === "/mybooks") setSelectedItem(2);
    else if (location.pathname === "/search") setSelectedItem(3);
    else if (location.pathname === "/contact") setSelectedItem(4);
    else setSelectedItem(0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/searchresults?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setShowSampleSearch(false);
      setKeepSearchOpen(false);
    }
  };

  return (
    <header
      dir="rtl"
      className={`${isVisiblePanel || isVisibleUser ? "relative" : ""} p-7 sticky top-0 z-50 lg:${
        isScrolled ? "h-[70px] shadow-md transition-all duration-300" : ""
      } h-[100px] md:max-w-screen lg:m-auto flex bg-[#a3d5ff] justify-between py-[1px] lg:pl-[50px] lg:pr-[30px]`}
    >
      <nav className="hidden lg:flex items-center gap-[60px]">
        <div
          onMouseLeave={() => {
            if (!isClickedUser) {
              setIsVisibleUser(false);
            }
          }}
          className={`relative flex flex-col ${
            isVisibleUser ? "mt-[86px]" : ""
          } gap-[10px] rounded-full`}
        >
          <button
            className="rounded-full cursor-pointer hover:outline-none focus:outline-none"
            onMouseEnter={() => {
              if (!isClickedUser) {
                setIsVisibleUser(true);
              }
            }}
            onClick={() => {
              if (isClickedUser) {
                setIsVisibleUser(false);
              } else {
                setIsVisibleUser(true);
              }
              setIsClickedUser(!isClickedUser);
            }}
            onBlur={() =>
              setTimeout(() => {
                setIsClickedUser(false);
                setIsVisibleUser(false);
              }, 250)
            }
          >
            {isAuthenticated && user.user_info.image != null ? (
              <img
                className="w-[50px] h-[50px] rounded-[30px]"
<<<<<<< HEAD
                src={`https://www.batbooks.ir${user.user_info.image}`}
                alt="User Image 2"
=======
                src={`/api${user.user_info.image}`}
                alt="User Image"
>>>>>>> 4a675b6b32465fdc06461ba16e32de58b86443f2
              />
            ) : (
              <img
                className="w-[50px] h-[50px] rounded-[30px]"
                src="/images/user_none.png"
                alt="User Image"
              />
            )}
          </button>
          {isAuthenticated ? (
            <ul
              className={`w-[155px] h-[76px] divide-y divide-[#2F4F4F]/50 shadow-lg shadow-[#000000]/25 rounded-[10px] transition-opacity duration-1000 ease-in-out ${
                isVisibleUser
                  ? "opacity-100 pointer-events-auto relative"
                  : "opacity-0 pointer-events-none absolute mt-[60px]"
              }`}
            >
              <li></li>
              <li className="w-[155px] h-[38px] bg-[#ffffff] rounded-t-[10px]">
                <button
                  onClick={() => {
                    setSelectedItem(0);
                    setIsVisibleUser(false);
                    navigate("/userprofile");
                  }}
                  className="text-[#000000]/70 w-full h-full rounded-t-[10px] cursor-pointer pl-[68px] hover:text-[#ffffff] hover:bg-[#2663cd]/90 transition-colors duration-200"
                >
                  <span className="text-[13px] font-bold">پروفایل کاربری</span>
                </button>
              </li>
              <li className="w-[155px] h-[38px] bg-[#ffffff]">
                <button
                  onClick={() => {
                    setSelectedItem(0);
                    setIsVisibleUser(false);
                    navigate("/mybooks/createbook");
                  }}
                  className="text-[#000000]/70 w-full h-full cursor-pointer pl-[53px] hover:text-[#ffffff] hover:bg-[#2663cd]/90 transition-colors duration-200"
                >
                  <span className="text-[13px] font-bold">نوشتن کتاب جدید</span>
                </button>
              </li>
              <li className="w-[155px] h-[38px] bg-[#ffffff] rounded-b-[10px]">
                <button
                  onClick={() => {
                    setSelectedItem(0);
                    setIsVisibleUser(false);
                    handleLogout();
                  }}
                  className="text-[#000000]/70 w-full h-full rounded-b-[10px] cursor-pointer pl-[28px] hover:text-[#ffffff] hover:bg-[#2663cd]/90 transition-colors duration-200"
                >
                  <span className="text-[13px] font-bold">
                    خروج از حساب کاربری
                  </span>
                </button>
              </li>
            </ul>
          ) : (
            <ul
              className={`w-[155px] h-[76px] divide-y divide-[#2F4F4F]/50 shadow-lg shadow-[#000000]/25 rounded-[10px] transition-opacity duration-1000 ease-in-out ${
                isVisibleUser
                  ? "opacity-100 pointer-events-auto relative"
                  : "opacity-0 pointer-events-none absolute mt-[60px]"
              }`}
            >
              <li className="w-[155px] h-[38px] bg-[#ffffff] rounded-t-[10px]">
                <button
                  onClick={() => {
                    setSelectedItem(0);
                    setIsVisibleUser(false);
                    navigate("/auth/signup");
                  }}
                  className="text-[#000000]/70 w-full h-full rounded-t-[10px] cursor-pointer pl-[102px] hover:text-[#ffffff] hover:bg-[#2663cd]/90 transition-colors duration-200"
                >
                  <span className="text-[13px] font-bold">ثبت نام</span>
                </button>
              </li>
              <li className="w-[155px] h-[38px] bg-[#ffffff] rounded-b-[10px]">
                <button
                  onClick={() => {
                    setSelectedItem(0);
                    setIsVisibleUser(false);
                    navigate("/auth/login");
                  }}
                  className="text-[#000000]/70 w-full h-full rounded-b-[10px] cursor-pointer pl-[119px] hover:text-[#ffffff] hover:bg-[#2663cd]/90 transition-colors duration-200"
                >
                  <span className="text-[13px] font-bold">ورود</span>
                </button>
              </li>
            </ul>
          )}
        </div>

        <ul
          className={`flex items-center gap-[66px] ${
            isVisibleUser ? "-mr-[105px]" : ""
          }`}
        >
          <li className="flex flex-col items-center">
            <button
              onClick={() => {
                setSelectedItem(1);
                navigate("/");
              }}
              className={`text-[16px] ${
                selectedItem != 1
                  ? "cursor-pointer hover:text-[#2663CD]"
                  : "text-[#265073] font-bold"
              } transition-colors`}
            >
              صفحه اصلی
            </button>
            {selectedItem === 1 && (
              <div className="w-[40px] h-[2.5px] bg-[#1E40AF] mt-[3px] rounded-full"></div>
            )}
          </li>
          <li className="flex flex-col items-center">
            <button
              onClick={() => {
                setSelectedItem(2);
                navigate("/mybooks");
              }}
              className={`text-[16px] ${
                selectedItem != 2
                  ? "cursor-pointer hover:text-[#2663CD]"
                  : "text-[#265073] font-bold"
              } transition-colors`}
            >
              کتاب‌های من
            </button>
            {selectedItem === 2 && (
              <div className="w-[40px] h-[2.5px] bg-[#1E40AF] mt-[3px] rounded-full"></div>
            )}
          </li>
          <li
            onMouseLeave={() => {
              if (!isClickedPanel) {
                setIsVisiblePanel(false);
              }
            }}
            className={`relative gap-[10px] ${
              isVisiblePanel ? "mt-[85px]" : ""
            } flex flex-col w-[155px] items-center mr-[-29px] rounded-full`}
          >
            <button
              className="cursor-pointer flex focus:outline-none"
              onMouseEnter={() => {
                if (!isClickedPanel) {
                  setIsVisiblePanel(true);
                }
              }}
              onClick={() => {
                if (isClickedPanel) {
                  setIsVisiblePanel(false);
                } else {
                  setIsVisiblePanel(true);
                }
                setIsClickedPanel(!isClickedPanel);
              }}
              onBlur={() =>
                setTimeout(() => {
                  setIsClickedPanel(false);
                  setIsVisiblePanel(false);
                }, 250)
              }
            >
              <img
                className="w-[24px] h-[24px] scale-80"
                src="/images/arrow.png"
                alt="arrow"
              />
              <span>پنل ارتباطی</span>
            </button>
            <ul
              className={`w-[155px] h-[76px] divide-y divide-[#2F4F4F]/50 shadow-lg shadow-[#000000]/25 rounded-[10px] transition-opacity duration-1000 ease-in-out ${
                isVisiblePanel
                  ? "opacity-100 pointer-events-auto relative"
                  : "opacity-0 pointer-events-none absolute mt-[34px]"
              }`}
            >
              <li className="w-[155px] h-[38px] bg-[#ffffff] rounded-t-[10px]">
                <button
                  onClick={() => {
                    setSelectedItem(0);
                    setIsVisiblePanel(false);
                    navigate("/searchresults", {
                      state: { searchingItem: "forum" },
                    });
                  }}
                  className="text-[#000000]/70 w-full h-full rounded-t-[10px] cursor-pointer pl-[89px] hover:text-[#ffffff] hover:bg-[#2663cd]/90 transition-colors duration-200"
                >
                  <span className="text-[13px] font-bold">تالار گفتگو</span>
                </button>
              </li>
              <li className="w-[155px] h-[38px] bg-[#ffffff] rounded-b-[10px]">
                <button
                  onClick={() => {
                    setSelectedItem(0);
                    setIsVisiblePanel(false);
                    navigate("/searchresults", {
                      state: { searchingItem: "people" },
                    });
                  }}
                  className="text-[#000000]/70 w-full h-full rounded-b-[10px] cursor-pointer pl-[118px] hover:text-[#ffffff] hover:bg-[#2663cd]/90 transition-colors duration-200"
                >
                  <span className="text-[13px] font-bold">افراد</span>
                </button>
              </li>
            </ul>
          </li>
          <li className="flex flex-col items-center mr-[-29px]">
            <button
              onClick={() => {
                setSelectedItem(3);
                navigate("/search");
              }}
              className={`text-[16px] ${
                selectedItem != 3
                  ? "cursor-pointer hover:text-[#2663CD]"
                  : "text-[#265073] font-bold"
              } transition-colors`}
            >
              جستجوی کتاب
            </button>
            {selectedItem === 3 && (
              <div className="w-[40px] h-[2.5px] bg-[#1E40AF] mt-[3px] rounded-full"></div>
            )}
          </li>
          <li className="flex flex-col items-center">
            <button
              onClick={() => {
                setSelectedItem(4);
                navigate("/contact");
              }}
              className={`text-[16px] hover:animate-pulse ${
                selectedItem != 4
                  ? "cursor-pointer hover:text-[#2663CD]"
                  : "text-[#265073] font-bold"
              } transition-colors`}
            >
              ارتباط با ما
            </button>
            {selectedItem === 4 && (
              <div className="w-[40px] h-[2.5px] bg-[#1E40AF] mt-[3px] rounded-full"></div>
            )}
          </li>
          <li className="flex flex-col items-center relative">
            <button
              onMouseEnter={() => setShowSampleSearch(true)}
              onMouseLeave={() => {
                if (!keepSearchOpen) {
                  setShowSampleSearch(false);
                }
              }}
              onClick={() => {
                setKeepSearchOpen(!keepSearchOpen);
                setShowSampleSearch(true);
              }}
              className={`text-[16px] hover:animate-pulse ${
                selectedItem != 5
                  ? "cursor-pointer hover:text-[#2663CD]"
                  : "text-[#265073] font-bold"
              } transition-colors`}
            >
              <img src="/src/assets/images/search.png" alt="add" />
            </button>
            {selectedItem === 5 && (
              <div className="w-[40px] h-[2.5px] bg-[#1E40AF] mt-[3px] rounded-full"></div>
            )}

            {(showSampleSearch || keepSearchOpen) && (
              <div
                className="absolute top-full mt-2 right-0 w-64 bg-white rounded-lg shadow-lg p-4 z-50"
                onMouseEnter={() => setShowSampleSearch(true)}
                onMouseLeave={() => {
                  if (!keepSearchOpen) {
                    setShowSampleSearch(false);
                  }
                }}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-bold text-gray-700">
                    جستجوی پیشرفته
                  </h3>
                  <button
                    onClick={() => {
                      setKeepSearchOpen(false);
                      setShowSampleSearch(false);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiX />
                  </button>
                </div>
                <form onSubmit={handleSearchSubmit} className="flex flex-col gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="جستجو..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm transition-colors"
                    >
                      جستجو
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setKeepSearchOpen(false);
                        setShowSampleSearch(false);
                      }}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md text-sm transition-colors"
                    >
                      انصراف
                    </button>
                  </div>
                </form>
              </div>
            )}
          </li>
        </ul>
      </nav>

      <div className="flex my-auto">
        <h1 className="text-[40px] font-[700] text-[#2663CD]">Books</h1>
        <h1 className="text-[40px] font-[700] text-[#002d54]">Bat</h1>
      </div>

      <MobileMenu
        isAuthenticated={isAuthenticated}
        user={user}
        handleLogout={handleLogout}
        handleNav={handleNav}
      />
    </header>
  );
};

export default Navbar;