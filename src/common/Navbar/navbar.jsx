import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { logout } from "../../redux/infoSlice";
import menuIcon from "../../assets/images/menu.svg";

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
  FiPhone,
} from "react-icons/fi";

function Navbar() {
  const [openCommunications, setOpenCommunications] = useState(false);
  const toggleCommunications = () => setOpenCommunications(!openCommunications);
  const [isVisiblePanel, setIsVisiblePanel] = useState(false);
  const [isClickedPanel, setIsClickedPanel] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const [isVisibleUser, setIsVisibleUser] = useState(false);
  const [isClickedUser, setIsClickedUser] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => {
    setMobileMenuOpen(true);
    setTimeout(() => setMenuVisible(true), 10); // برای شروع transition بعد از render
  };
  const closeMenu = () => {
    setMenuVisible(false);
    setTimeout(() => setMobileMenuOpen(false), 300); // همزمان با مدت انیمیشن
  };
  let navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/auth/login");
  };
  const handleNav = (path, itemId = null) => {
    if (itemId) setSelectedItem(itemId);
    navigate(path);
    closeMenu();
  };
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") setSelectedItem(1);
    else if (location.pathname === "/mybooks") setSelectedItem(2);
    else if (location.pathname === "/search") setSelectedItem(3);
    else if (location.pathname === "/contact") setSelectedItem(4);
    else setSelectedItem(0);
  }, [location.pathname]);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      dir="rtl"
      className={`${isVisiblePanel || isVisibleUser ? "relative" : ""} p-7  sticky top-0 z-50  lg:${isScrolled ? "h-[70px] shadow-md transition-all duration-300" : ""} h-[100px] md:max-w-screen lg:m-auto flex bg-[#a3d5ff] justify-between py-[1px] lg:pl-[50px]  lg:pr-[30px]`}
    >
      <nav className="hidden lg:flex items-center gap-[60px]">
        <div
          onMouseLeave={() => {
            if (!isClickedUser) {
              setIsVisibleUser(false);
            }
          }}
          className={`relative flex flex-col ${isVisibleUser ? "mt-[86px]" : ""} gap-[10px] rounded-full`}
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
                src={`https://www.batbooks.ir${user.user_info.image}`}
                alt="User Image 2"
              />
            ) : (
              <img
                className="w-[50px] h-[50px] rounded-[30px]"
                src="/images/user_none.png"
                alt="User Image 3"
              />
            )}
          </button>
          {isAuthenticated ? (
            <ul
              className={`w-[155px] h-[76px] divide-y divide-[#2F4F4F]/50 shadow-lg shadow-[#000000]/25 rounded-[10px] transition-opacity duration-1000 ease-in-out ${isVisibleUser ? "opacity-100 pointer-events-auto relative" : "opacity-0 pointer-events-none absolute mt-[60px]"}`}
            >
              <li></li>
              <li className="w-[155px] h-[38px] bg-[#ffffff] rounded-t-[10px]">
                <button
                  onClick={() => {
                    setSelectedItem(0);
                    setIsVisibleUser(false);
                    navigate("/userprofile");
                  }}
                  className="text-[#000000]/70 w-full h-full rounded-t-[10px] cursor-pointer pl-[68px] hover:text-[#ffffff] hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:outline-none disabled:bg-[#2663cd] disabled:cursor-auto"
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
                  className="text-[#000000]/70 w-full h-full cursor-pointer pl-[53px] hover:text-[#ffffff] hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:outline-none disabled:bg-[#2663cd] disabled:cursor-auto"
                >
                  <span className="text-[13px] font-bold">
                    {" "}
                    نوشتن کتاب جدید
                  </span>
                </button>
              </li>
              <li className="w-[155px] h-[38px] bg-[#ffffff] rounded-b-[10px]">
                <button
                  onClick={() => {
                    setSelectedItem(0);
                    setIsVisibleUser(false);
                    handleLogout();
                  }}
                  className="text-[#000000]/70 w-full h-full rounded-b-[10px] cursor-pointer pl-[28px] hover:text-[#ffffff] hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:outline-none disabled:bg-[#2663cd] disabled:cursor-auto"
                >
                  <span className="text-[13px] font-bold">
                    خروج از حساب کاربری
                  </span>
                </button>
              </li>
            </ul>
          ) : (
            <ul
              className={`w-[155px] h-[76px] divide-y divide-[#2F4F4F]/50 shadow-lg shadow-[#000000]/25 rounded-[10px] transition-opacity duration-1000 ease-in-out ${isVisibleUser ? "opacity-100 pointer-events-auto relative" : "opacity-0 pointer-events-none absolute mt-[60px]"}`}
            >
              <li className="w-[155px] h-[38px] bg-[#ffffff] rounded-t-[10px]">
                <button
                  onClick={() => {
                    setSelectedItem(0);
                    setIsVisibleUser(false);
                    navigate("/auth/signup");
                  }}
                  className="text-[#000000]/70 w-full h-full rounded-t-[10px] cursor-pointer pl-[102px] hover:text-[#ffffff] hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:outline-none disabled:bg-[#2663cd] disabled:cursor-auto"
                >
                  <span to={"/auth/signup"} className="text-[13px] font-bold">
                    ثبت نام
                  </span>
                </button>
              </li>
              <li className="w-[155px] h-[38px] bg-[#ffffff] rounded-b-[10px]">
                <button
                  onClick={() => {
                    setSelectedItem(0);
                    setIsVisibleUser(false);
                    navigate("/auth/login");
                  }}
                  className="text-[#000000]/70 w-full h-full rounded-b-[10px] cursor-pointer pl-[119px] hover:text-[#ffffff] hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:outline-none disabled:bg-[#2663cd] disabled:cursor-auto"
                >
                  <span className="text-[13px] font-bold">ورود</span>
                </button>
              </li>
            </ul>
          )}
        </div>

        <ul
          className={`flex items-center gap-[66px] ${isVisibleUser ? "-mr-[105px]" : ""}`}
        >
          <li className="flex flex-col items-center">
            <button
              onClick={() => {
                setSelectedItem(1);
                navigate("/");
              }}
              className={`text-[16px] ${selectedItem != 1 ? "cursor-pointer hover:text-[#2663CD]" : "text-[#265073] font-bold"}  active:text-[#2663CD]/50 active:no-underline active:transition-all active:duration-100 focus:outline-none focus:text-[#2663CD]`}
            >
              صفحه اصلی
            </button>
            {selectedItem === 1 ? (
              <div className="w-[40px] h-[2.5px] bg-[#1E40AF] mt-[3px] rounded-full"></div>
            ) : (
              <span></span>
            )}
          </li>
          <li className="flex flex-col items-center">
            <button
              onClick={() => {
                setSelectedItem(2);
                navigate("/mybooks");
              }}
              className={`text-[16px] ${selectedItem != 2 ? "cursor-pointer hover:text-[#2663CD]" : "text-[#265073] font-bold"}  active:text-[#2663CD]/50 active:no-underline active:transition-all active:duration-100 focus:outline-none focus:text-[#2663CD]`}
            >
              کتاب‌های من
            </button>
            {selectedItem === 2 ? (
              <div className="w-[40px] h-[2.5px] bg-[#1E40AF] mt-[3px] rounded-full"></div>
            ) : (
              <span></span>
            )}
          </li>
          <li
            onMouseLeave={() => {
              if (!isClickedPanel) {
                setIsVisiblePanel(false);
              }
            }}
            className={`relative gap-[10px] ${isVisiblePanel ? "mt-[85px]" : ""} flex flex-col w-[155px] items-center mr-[-29px] rounded-full`}
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
              className={`w-[155px] h-[76px] divide-y divide-[#2F4F4F]/50 shadow-lg shadow-[#000000]/25 rounded-[10px] transition-opacity duration-1000 ease-in-out ${isVisiblePanel ? "opacity-100 pointer-events-auto relative" : "opacity-0 pointer-events-none absolute mt-[34px]"}`}
            >
              <li className="w-[155px] h-[38px] bg-[#ffffff] rounded-t-[10px]">
                <button
                  onClick={() => {
                    setSelectedItem(0);
                    setIsVisiblePanel(false);
                    navigate("/forums", {
                      state: { searchingItem: "forum" },
                    });
                  }}
                  className="text-[#000000]/70 w-full h-full rounded-t-[10px] cursor-pointer pl-[89px] hover:text-[#ffffff] hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:outline-none disabled:bg-[#2663cd] disabled:cursor-auto"
                >
                  <span className="text-[13px] font-bold">تالار گفتگو</span>
                </button>
              </li>
              <li className="w-[155px] h-[38px] bg-[#ffffff] rounded-b-[10px]">
                <button
                  onClick={() => {
                    setSelectedItem(0);
                    setIsVisiblePanel(false);
                    navigate("/people", {
                      state: { searchingItem: "people" },
                    });
                  }}
                  className="text-[#000000]/70 w-full h-full rounded-b-[10px] cursor-pointer pl-[118px] hover:text-[#ffffff] hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:outline-none disabled:bg-[#2663cd] disabled:cursor-auto"
                >
                  <span className="text-[13px] font-bold">افراد</span>
                </button>
              </li>
            </ul>
          </li>
          <li className="flex flex-col items-center mr-[-29px]">
            <button
              onClick={() => setSelectedItem(3)}
              className={`text-[16px]  ${selectedItem != 3 ? "cursor-pointer hover:text-[#2663CD]" : "text-[#265073] font-bold"} active:text-[#2663CD]/50 active:no-underline active:transition-all active:duration-100 focus:outline-none focus:text-[#2663CD]`}
            >
              جستجوی کتاب
            </button>
            {selectedItem === 3 ? (
              <div className="w-[40px] h-[2.5px] bg-[#1E40AF] mt-[3px] rounded-full"></div>
            ) : (
              <span></span>
            )}
          </li>
          <li className="flex flex-col items-center">
            <button
              onClick={() => {
                setSelectedItem(4);
                navigate("/contact");
              }}
              className={`text-[16px] hover:animate-pulse ${selectedItem != 4 ? "cursor-pointer hover:text-[#2663CD]" : "text-[#265073] font-bold"}  active:text-[#2663CD]/50 active:no-underline active:transition-all active:duration-100 focus:outline-none focus:text-[#2663CD]`}
            >
              ارتباط با ما
            </button>
            {selectedItem === 4 ? (
              <div className="w-[40px] h-[2.5px] bg-[#1E40AF] mt-[3px] rounded-full"></div>
            ) : (
              <span></span>
            )}
          </li>
        </ul>
      </nav>
      {/* <div className="hidden md:w-full md:flex flex-row-reverse justify-between "> */}
      <div className="flex my-auto ">
        <h1 className="text-[40px] font-[700] text-[#2663CD]">Books</h1>
        <h1 className="text-[40px] font-[700] text-[#002d54]">Bat</h1>
      </div>
      <button
        onClick={openMenu}
        className="lg:hidden p-2 text-blue-700 hover:text-blue-900 text-3xl"
      >
        ☰
      </button>
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className={`absolute inset-0 backdrop-blur-sm bg-blue-950/40 transition-opacity duration-300 ${
              menuVisible ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeMenu}
          />

          <div
            className={`absolute top-0 right-0 w-[60%] sm:w-[50%] max-w-xs h-full text-nowrap bg-gradient-to-b from-blue-50 to-white shadow-2xl rounded-l-3xl transform transition-all duration-300 ease-in-out 
      ${menuVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
          >
            <div className="flex justify-between items-center p-5 border-b border-blue-200">
              <h2 className="text-xl font-bold text-blue-800">منو</h2>
              <button
                onClick={closeMenu}
                className="text-blue-800 text-2xl hover:text-red-500 transition"
              >
                &times;
              </button>
            </div>

            <ul className="flex flex-col items-start px-4  py-6 space-y-3 text-blue-800">
              {isAuthenticated ? (
                <>
                  <li className="w-full px-3 flex items-center gap-3">
                    <img
                      className="w-10 h-10  rounded-full"
                      src={`https://www.batbooks.ir${user.user_info.image}`}
                      alt="asd"
                    />
                    <h3>{user.name} </h3>
                  </li>
                  <li>
                    <MenuItem
                      icon={<FiUser />}
                      label="پروفایل کاربری"
                      onClick={() => handleNav("/userprofile")}
                    />
                  </li>
                  <li>
                    <MenuItem
                      icon={<FiEdit />}
                      label="نوشتن کتاب جدید"
                      onClick={() => handleNav("/mybooks/createbook")}
                    />
                  </li>
                  <li>
                    <MenuItem
                      icon={<FiLogOut />}
                      label="خروج از حساب کاربری"
                      onClick={() => {
                        handleLogout();
                        closeMenu();
                      }}
                      isAuthenticated
                    />
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <MenuItem
                      icon={<FiUserPlus />}
                      label="ثبت‌نام"
                      onClick={() => handleNav("/auth/signup")}
                    />
                  </li>
                  <li>
                    <MenuItem
                      icon={<FiLogIn />}
                      label="ورود"
                      onClick={() => handleNav("/auth/login")}
                    />
                  </li>
                </>
              )}
              <hr className="w-full border-t border-blue-200 my-2" />

              <li>
                <MenuItem
                  icon={<FiHome />}
                  label="صفحه اصلی"
                  onClick={() => handleNav("/", 1)}
                />
              </li>
              <li>
                <MenuItem
                  icon={<FiBook />}
                  label="کتاب‌های من"
                  onClick={() => handleNav("/mybooks", 2)}
                />
              </li>
              {/* پنل ارتباطی */}
              <li className="w-full transition-all duration-300 m-0">
                <button
                  onClick={toggleCommunications}
                  className="w-full flex items-center justify-between px-4 py-2 rounded-xl hover:bg-blue-50 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <FiMail className="text-blue-600 text-lg" />
                    <span className="text-xs sm:text-sm ">پنل ارتباطی</span>
                  </div>
                  {openCommunications ? <FiChevronUp /> : <FiChevronDown />}
                </button>

                <ul
                  className={`overflow-hidden transition-all duration-400 ease-in-out flex flex-col mt-2 space-y-2 bg-gray-100 rounded-lg m-4 mb-0 
      ${openCommunications ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
    `}
                >
                  <li className="transition-all duration-200 ">
                    <MenuItem
                      icon={<FiUsers />}
                      label="افراد"
                      onClick={() => handleNav("/people")}
                    />
                  </li>
                  <li className="transition-all duration-200">
                    <MenuItem
                      icon={<FiMessageSquare />}
                      label="تالار گفتگو"
                      onClick={() => handleNav("/forums")}
                    />
                  </li>
                </ul>
              </li>
              <li>
                <MenuItem
                  icon={<FiSearch />}
                  label="جستجوی کتاب"
                  onClick={() => handleNav("/advancedsearchbook", 3)}
                />
              </li>
              <li>
                <MenuItem
                  icon={<FiPhone />}
                  label="ارتباط با ما"
                  onClick={() => handleNav("/contact", 4)}
                />
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
const MenuItem = ({ icon, label, onClick, isAuthenticated = false }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl transition-all
      ${isAuthenticated ? "text-red-600 hover:bg-red-50 hover:text-red-700" : "hover:bg-blue-50"}`}
  >
    <span
      className={`text-lg ${isAuthenticated ? "text-red-500" : "text-blue-600"}`}
    >
      {icon}
    </span>
    <span className="text-xs sm:text-sm font-medium">{label}</span>
  </button>
);
export default Navbar;
