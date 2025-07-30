import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MenuItem from "./MenuItem";
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
import { useLocation, useNavigate } from "react-router-dom";
export default function HamburgerNavbar({
  mobileMenuOpen,
  closeMenu,
  menuVisible,
  toggleCommunications,
  openCommunications,
  handleNav,
  handleLogout,
  setSelectedItem,
}) {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/") setSelectedItem(1);
    else if (location.pathname === "/mybooks") setSelectedItem(2);
    else if (location.pathname === "/search") setSelectedItem(3);
    else if (location.pathname === "/contact") setSelectedItem(4);
    else if (location.pathname === "/chat") setSelectedItem(5);
    else setSelectedItem(0);
  }, [location.pathname]);

  return (
    <>
      {mobileMenuOpen && (
        <div className="  lg:hidden fixed inset-0 z-50">
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
                      src={`https://batbooks.liara.run${user.user_info.image}`}
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
                      icon={<FiMessageCircle />}
                      label=" چت "
                      onClick={() => {
                        navigate("/chat", { state: { UserId: null } });
                      }}
                    />
                  </li>
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
    </>
  );
}
