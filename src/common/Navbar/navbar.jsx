import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";

function Navbar({ hasLogined = false }) {
  const [isVisiblePanel, setIsVisiblePanel] = useState(false);
  const [isClickedPanel, setIsClickedPanel] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const [isVisibleUser, setIsVisibleUser] = useState(false);
  const [isClickedUser, setIsClickedUser] = useState(false);

  let navigate = useNavigate();

  return (
    <header
      dir="rtl"
      className="max-w-screen m-auto font-[Vazir] flex bg-[#a3d5ff] justify-between py-[2px] pl-[50px] pr-[30px] shadow-lg shadow-[#000000]/25"
    >
      <nav className="flex items-center gap-[60px]">
        <div className="relative flex flex-col">
          <button
            className="rounded-full cursor-pointer hover:outline-none focus:outline-none"
            onMouseEnter={() => {
              if (!isClickedUser) {
                setIsVisibleUser(true);
              }
            }}
            onMouseLeave={() => {
              if (!isClickedUser) {
                setIsVisibleUser(false);
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
            onBlur={() => {
              setIsClickedUser(false);
              setIsVisibleUser(false);
            }}
          >
            {hasLogined ? (
              <img
                className="w-[50px] h-[50px]"
                src="/images/user_image2.png"
                alt="User Image 2"
              />
            ) : (
              <img
                className="w-[50px] h-[50px]"
                src="/images/user_none.png"
                alt="User Image 3"
              />
            )}
          </button>
          {hasLogined ? (
            <ul
              className={`absolute w-[155px] h-[76px] divide-y divide-[#2F4F4F]/50 shadow-lg shadow-[#000000]/25 mt-[60px] rounded-[10px] ${isVisibleUser ? "opacity-100" : "opacity-0"} ${isVisibleUser ? "visible" : "invisible"} transition-opacity duration-1000 ease-in-out`}
            >
              <li className="w-[155px] h-[38px] bg-[#ffffff] rounded-t-[10px]">
                <button
                  onClick={() => {
                    setSelectedItem(0);
                    navigate("/profiles/userprofile");
                  }}
                  className="w-full h-full rounded-t-[10px] cursor-pointer pl-[68px] hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:outline-none disabled:bg-[#2663cd] disabled:cursor-auto"
                >
                  <span className="text-[13px] font-[300] text-[#000000]/70">
                    پروفایل کاربری
                  </span>
                </button>
              </li>
              <li className="w-[155px] h-[38px] bg-[#ffffff] rounded-b-[10px]">
                <button
                  onClick={() => setSelectedItem(0)}
                  className="w-full h-full rounded-b-[10px] cursor-pointer pl-[28px] hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:outline-none disabled:bg-[#2663cd] disabled:cursor-auto"
                >
                  <span className="text-[13px] font-[300] text-[#000000]/70">
                    خروج از حساب کاربری
                  </span>
                </button>
              </li>
            </ul>
          ) : (
            <ul
              className={`absolute w-[155px] h-[76px] divide-y divide-[#2F4F4F]/50 shadow-lg shadow-[#000000]/25 mt-[60px] rounded-[10px] ${isVisibleUser ? "opacity-100" : "opacity-0"} ${isVisibleUser ? "visible" : "invisible"} transition-opacity duration-1000 ease-in-out`}
            >
              <li className="w-[155px] h-[38px] bg-[#ffffff] rounded-t-[10px]">
                <button
                  onClick={() => {
                    setSelectedItem(0);
                    navigate("/auth/signup");
                  }}
                  className="w-full h-full rounded-t-[10px] cursor-pointer pl-[102px] hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:outline-none disabled:bg-[#2663cd] disabled:cursor-auto"
                >
                  <span
                    to={"/auth/signup"}
                    className="text-[13px] font-[300] text-[#000000]/70"
                  >
                    ثبت نام
                  </span>
                </button>
              </li>
              <li className="w-[155px] h-[38px] bg-[#ffffff] rounded-b-[10px]">
                <button
                  onClick={() => {
                    setSelectedItem(0);
                    navigate("/auth/login");
                  }}
                  className="w-full h-full rounded-b-[10px] cursor-pointer pl-[119px] hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:outline-none disabled:bg-[#2663cd] disabled:cursor-auto"
                >
                  <span className="text-[13px] font-[300] text-[#000000]/70">
                    ورود
                  </span>
                </button>
              </li>
            </ul>
          )}
        </div>

        <ul className="flex items-center gap-[66px]">
          <li className="flex flex-col items-center">
            <a
              onClick={() => setSelectedItem(1)}
              className={`text-[16px] hover:underline hover:text-[#2663CD] active:text-[#2663CD]/50 active:no-underline active:transition-all active:duration-100 focus:outline-none focus:text-[#2663CD] ${selectedItem === 1 ? "text-[#265073]" : ""}`}
              href="#home"
            >
              صفحه اصلی
            </a>
            {selectedItem === 1 ? (
              <div className="w-[30px] h-[2.5px] bg-[#CA2B2E] mt-[3px] rounded-full"></div>
            ) : (
              <span></span>
            )}
          </li>
          <li className="flex flex-col items-center">
            <a
              onClick={() => setSelectedItem(2)}
              className={`text-[16px] hover:underline hover:text-[#2663CD] active:text-[#2663CD]/50 active:no-underline active:transition-all active:duration-100 focus:outline-none focus:text-[#2663CD] ${selectedItem === 2 ? "text-[#265073]" : ""}`}
              href="#mybooks"
            >
              کتاب‌های من
            </a>
            {selectedItem === 2 ? (
              <div className="w-[30px] h-[2.5px] bg-[#CA2B2E] mt-[3px] rounded-full"></div>
            ) : (
              <span></span>
            )}
          </li>
          <li className="relative flex flex-col w-[155px] items-center mr-[-29px]">
            <button
              className="cursor-pointer flex focus:outline-none"
              onMouseEnter={() => {
                if (!isClickedPanel) {
                  setIsVisiblePanel(true);
                }
              }}
              onMouseLeave={() => {
                if (!isClickedPanel) {
                  setIsVisiblePanel(false);
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
              onBlur={() => {
                setIsClickedPanel(false);
                setIsVisiblePanel(false);
              }}
            >
              <img 
                className="w-[24px] h-[24px]"
                src="/images/arrow.png"
                alt="arrow"
              />
              <span>پنل ارتباطی</span>
            </button>
            <ul
              className={`absolute w-[155px] h-[76px] divide-y divide-[#2F4F4F]/50 shadow-lg shadow-[#000000]/25 mt-[44px] rounded-[10px] ${isVisiblePanel ? "opacity-100" : "opacity-0"} ${isVisiblePanel ? "visible" : "invisible"} transition-opacity duration-1000 ease-in-out`}
            >
              <li className="w-[155px] h-[38px] bg-[#ffffff] rounded-t-[10px]">
                <button
                  onClick={() => setSelectedItem(0)}
                  className="w-full h-full rounded-t-[10px] cursor-pointer pl-[89px] hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:outline-none disabled:bg-[#2663cd] disabled:cursor-auto"
                >
                  <span className="text-[13px] font-[300] text-[#000000]/70">
                    تالار گفتگو
                  </span>
                </button>
              </li>
              <li className="w-[155px] h-[38px] bg-[#ffffff] rounded-b-[10px]">
                <button
                  onClick={() => setSelectedItem(0)}
                  className="w-full h-full rounded-b-[10px] cursor-pointer pl-[118px] hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:outline-none disabled:bg-[#2663cd] disabled:cursor-auto"
                >
                  <span className="text-[13px] font-[300] text-[#000000]/70">
                    افراد
                  </span>
                </button>
              </li>
            </ul>
          </li>
          <li className="flex flex-col items-center mr-[-29px]">
            <a
              onClick={() => setSelectedItem(3)}
              className={`text-[16px] hover:underline hover:text-[#2663CD] active:text-[#2663CD]/50 active:no-underline active:transition-all active:duration-100 focus:outline-none focus:text-[#2663CD] ${selectedItem === 3 ? "text-[#265073]" : ""}`}
              href="#search"
            >
              جستجوی کتاب
            </a>
            {selectedItem === 3 ? (
              <div className="w-[30px] h-[2.5px] bg-[#CA2B2E] mt-[3px] rounded-full"></div>
            ) : (
              <span></span>
            )}
          </li>
          <li className="flex flex-col items-center">
            <a
              onClick={() => setSelectedItem(4)}
              className={`text-[16px] hover:underline hover:text-[#2663CD] active:text-[#2663CD]/50 active:no-underline active:transition-all active:duration-100 focus:outline-none focus:text-[#2663CD] ${selectedItem === 4 ? "text-[#265073]" : ""}`}
              href="#contact"
            >
              ارتباط با ما
            </a>
            {selectedItem === 4 ? (
              <div className="w-[30px] h-[2.5px] bg-[#CA2B2E] mt-[3px] rounded-full"></div>
            ) : (
              <span></span>
            )}
          </li>
        </ul>
      </nav>
      <div className="flex ">
        <h1 className="text-[56px] font-[700] text-[#2663CD]">Books</h1>
        <h1 className="text-[56px] font-[700] text-[#002d54]">Bat</h1>
      </div>
    </header>
  );
}

export default Navbar;
