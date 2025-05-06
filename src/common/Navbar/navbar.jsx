import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { logout } from "../../redux/infoSlice";

function Navbar() {
  const [isVisiblePanel, setIsVisiblePanel] = useState(false);
  const [isClickedPanel, setIsClickedPanel] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const [isVisibleUser, setIsVisibleUser] = useState(false);
  const [isClickedUser, setIsClickedUser] = useState(false);

  let navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/auth/login");
    // useDispatch(logout());
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
      className={`${isVisiblePanel || isVisibleUser ? "relative" : ""} sticky top-0 z-50  ${isScrolled ? "h-[70px] shadow-md transition-all duration-300" : ""} h-[100px] max-w-screen m-auto flex bg-[#a3d5ff] justify-between py-[1px] pl-[50px] pr-[30px]`}
    >
      <nav className="flex items-center gap-[60px]">
        <div
          onMouseLeave={() => {
            if (!isClickedUser) {
              setIsVisibleUser(false);
            }
          }}
          className="flex flex-col mt-[86px] gap-[10px] rounded-full"
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
                className="w-[50px] h-[50px] rounded-full"
                src={`/api${user.user_info.image}`}
                alt="User Image 2"
              />
            ) : (
              <img
                className="w-[50px] h-[50px] rounded-full"
                src="/images/user_none.png"
                alt="User Image 3"
              />
            )}
          </button>
          {isAuthenticated ? (
            <ul
              className={`w-[155px] h-[76px] divide-y divide-[#2F4F4F]/50 shadow-lg shadow-[#000000]/25 rounded-[10px] ${isVisibleUser ? "opacity-100" : "opacity-0"} ${isVisibleUser ? "visible" : "invisible"} transition-opacity duration-1000 ease-in-out`}
            >
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
              className={`w-[155px] h-[76px] divide-y divide-[#2F4F4F]/50 shadow-lg shadow-[#000000]/25 rounded-[10px] ${isVisibleUser ? "opacity-100" : "opacity-0"} ${isVisibleUser ? "visible" : "invisible"} transition-opacity duration-1000 ease-in-out`}
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

        <ul className="flex items-center gap-[66px] mr-[-105px]">
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
            className="gap-[10px] mt-[85px] flex flex-col w-[155px] items-center mr-[-29px] rounded-full"
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
              className={`w-[155px] h-[76px] divide-y divide-[#2F4F4F]/50 shadow-lg shadow-[#000000]/25 rounded-[10px] ${isVisiblePanel ? "opacity-100" : "opacity-0"} ${isVisiblePanel ? "visible" : "invisible"} transition-opacity duration-1000 ease-in-out`}
            >
              <li className="w-[155px] h-[38px] bg-[#ffffff] rounded-t-[10px]">
                <button
                  onClick={() => {
                    setSelectedItem(0);
                    setIsVisiblePanel(false);
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
              onClick={() => setSelectedItem(4)}
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
      <div className="flex my-auto">
        <h1 className="text-[40px] font-[700] text-[#2663CD]">Books</h1>
        <h1 className="text-[40px] font-[700] text-[#002d54]">Bat</h1>
      </div>
    </header>
  );
}

export default Navbar;
