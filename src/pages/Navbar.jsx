import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { logout } from "../redux/infoSlice";
import menuIcon from "../assets/images/menu.svg";
import HamburgerNavbar from "../sharedComponents/navbar/HamburgerNavbar";
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
  FiMessageCircle,
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
    setTimeout(() => setMenuVisible(true), 10);
    console.log("ad"); // برای شروع transition بعد از render
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
    else if (location.pathname === "/public-playlists") setSelectedItem(4);
    else if (location.pathname === "/chat") setSelectedItem(5);
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
      className={`${isVisiblePanel || isVisibleUser ? "relative" : ""} p-7  sticky top-0 z-150  lg:${isScrolled ? "h-[70px] shadow-md transition-all duration-300" : ""} h-[100px] md:max-w-screen lg:m-auto flex bg-[#a3d5ff] justify-between py-[1px] lg:pl-[50px]  lg:pr-[30px]`}
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
                src={`http://127.0.0.1:8000${user.user_info.image}`}
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
              <li className=" w-full text-nowrap h-[38px] bg-[#ffffff] rounded-t-[10px]">
                <button
                  onClick={() => {
                    setSelectedItem(0);
                    setIsVisibleUser(false);
                    navigate("/userprofile");
                  }}
                  className="px-2 flex items-center gap-2 text-[#000000]/70 w-full h-full rounded-t-[10px] cursor-pointer  hover:text-[#ffffff] hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:outline-none disabled:bg-[#2663cd] disabled:cursor-auto"
                >
                  <FiUser className="text-black/50" />
                  <p className="text-[13px] font-bold">پروفایل کاربری</p>
                </button>
              </li>
              <li className="w-full h-[38px] bg-[#ffffff]">
                <button
                  onClick={() => {
                    setSelectedItem(0);
                    setIsVisibleUser(false);
                    navigate("/mybooks/createbook");
                  }}
                  className="flex p-2 gap-2 text-[#000000]/70 w-full h-full cursor-pointer items-center hover:text-[#ffffff] hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:outline-none disabled:bg-[#2663cd] disabled:cursor-auto"
                >
                  <FiEdit className="text-black/50" />
                  <p className="text-[13px] font-bold"> نوشتن کتاب جدید</p>
                </button>
              </li>
              <li className="w-full h-[38px] bg-[#ffffff]  border-b border-[#2F4F4F]/50 rounded-b-[10px]">
                <button
                  onClick={() => {
                    setSelectedItem(0);
                    setIsVisibleUser(false);
                    navigate("/auth/login");
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                  }}
                  className="flex p-2 gap-2 text-[#000000]/70 w-full h-full cursor-pointer items-center hover:text-[#ffffff] hover:bg-[#2663cd]/90 rounded-b-[10px] hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:outline-none disabled:bg-[#2663cd] disabled:cursor-auto"
                >
                  <FiLogOut className="text-black/50" />
                  <p className="text-nowrap text-[13px] font-bold">
                    {" "}
                    خروج از حساب کاربری
                  </p>
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
          className={`flex items-center lg:gap-12 xl:gap-[66px] ${isVisibleUser ? "-mr-[105px]" : ""}`}
        >
          <li className="flex gap-2 ">
            <section className="flex p-1">
              <FiHome></FiHome>
            </section>
            <div className="flex flex-col items-center">
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
                <div className="w-[60px] h-[2.5px] bg-[#1E40AF] mt-[3px] rounded-full"></div>
              ) : (
                <span></span>
              )}
            </div>
          </li>
          <li className="flex gap-2 ">
            <section className="flex p-1">
              <FiBook></FiBook>
            </section>
            <div className="flex flex-col items-center">
              <button
                onClick={() => {
                  setSelectedItem(2);
                  navigate("/mybooks");
                }}
                className={`text-[16px] ${selectedItem != 2 ? "cursor-pointer hover:text-[#2663CD]" : "text-[#265073] font-bold"}  active:text-[#2663CD]/50 active:no-underline active:transition-all active:duration-100 focus:outline-none focus:text-[#2663CD]`}
              >
                کتاب های من
              </button>
              {selectedItem === 2 ? (
                <div className="w-[40px] h-[2.5px] bg-[#1E40AF] mt-[3px] rounded-full"></div>
              ) : (
                <span></span>
              )}
            </div>
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
              <li className="w-full h-[38px] bg-[#ffffff] rounded-t-[10px]">
                <button
                  onClick={() => {
                    setSelectedItem(0);
                    setIsVisibleUser(false);
                    navigate("/chat");
                  }}
                  className="flex p-2 gap-2 text-[#000000]/70 w-full h-full cursor-pointer items-center hover:text-[#ffffff] hover:bg-[#2663cd]/90 rounded-t-[10px] hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:outline-none disabled:bg-[#2663cd] disabled:cursor-auto"
                >
                  <FiMessageCircle className="text-black/50" />
                  <p className="text-[13px] font-bold"> چت</p>
                </button>
              </li>
              <li className="w-full h-[38px] bg-[#ffffff]">
                <button
                  onClick={() => {
                    setSelectedItem(0);
                    setIsVisibleUser(false);
                    navigate("/forums");
                  }}
                  className="flex p-2 gap-2 text-[#000000]/70 w-full h-full cursor-pointer items-center hover:text-[#ffffff] hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:outline-none disabled:bg-[#2663cd] disabled:cursor-auto"
                >
                  <FiMessageSquare className="text-black/50" />
                  <p className="text-[13px] font-bold"> تالار گفتگو</p>
                </button>
              </li>
              <li className="w-full h-[38px] bg-[#ffffff] rounded-b-[10px]">
                <button
                  onClick={() => {
                    setSelectedItem(0);
                    setIsVisibleUser(false);
                    navigate("/people");
                  }}
                  className="flex p-2 gap-2 text-[#000000]/70 w-full h-full cursor-pointer rounded-b-[10px] items-center hover:text-[#ffffff] hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:outline-none disabled:bg-[#2663cd] disabled:cursor-auto"
                >
                  <FiUsers className="text-black/50" />
                  <p className="text-[13px] font-bold"> افراد</p>
                </button>
              </li>
            </ul>
          </li>
          <li className="flex flex-col items-center mr-[-29px]">
            <button
              onClick={() => {
                setSelectedItem(3);
                navigate("/advancedsearchbook");
              }}
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
                navigate("/public-playlists");
              }}
              className={`text-[16px] hover:animate-pulse ${selectedItem != 4 ? "cursor-pointer hover:text-[#2663CD]" : "text-[#265073] font-bold"}  active:text-[#2663CD]/50 active:no-underline active:transition-all active:duration-100 focus:outline-none focus:text-[#2663CD]`}
            >
              پلی لیست های عمومی
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
      <button
        onClick={openMenu}
        className="lg:hidden p-2 text-blue-700 hover:text-blue-900 text-3xl cursor-pointer"
      >
        ☰
      </button>
      <div onClick={() => navigate("/")} className="flex my-auto ">
        <h1 className="text-[30px] font-[700] text-[#2663CD]">Books</h1>
        <h1 className="text-[30px] font-[700] text-[#002d54]">Bat</h1>
      </div>
      <HamburgerNavbar
        openMenu={openMenu}
        closeMenu={closeMenu}
        handleLogout={handleLogout}
        handleNav={handleNav}
        menuVisible={menuVisible}
        mobileMenuOpen={mobileMenuOpen}
        openCommunications={openCommunications}
        toggleCommunications={toggleCommunications}
        setSelectedItem={setSelectedItem}
      />
    </header>
  );
}

export default Navbar;
