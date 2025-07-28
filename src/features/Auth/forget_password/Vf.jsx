import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Vf() {
  const [code, setVerificationCode] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [new_password_conf, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email.email;

  // if (!email) {
  //   useEffect(()=>navigate("/Forget_password"))

  //   return null;
  // }

  const validateForm = () => {
    let newErrors = {};

    if (!code.trim()) newErrors.code = "کد بازیابی را وارد کنید.";
    if (!new_password.trim())
      newErrors.new_password = "رمز عبور جدید را وارد کنید.";
    else if (new_password.length < 6)
      newErrors.new_password = "رمز عبور حداقل باید ۶ کاراکتر باشد.";
    if (new_password_conf !== new_password)
      newErrors.new_password_conf = "رمزهای عبور مطابقت ندارند.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/reset-password/verify-otp/",
        {
          email,
          code,
          new_password,
          new_password_conf,
        }
      );

      if (response.data.success) {
        setSuccess("رمز عبور با موفقیت تغییر کرد.");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setErrors({
        general: " خطا در بازیابی رمز عبور. لطفا دوباره امتحان کنید ",
      });
    } finally {
      setLoading(false);
      setSuccess("رمز عبور با موفقیت تغییر کرد.");
      navigate("/auth/login");
    }
  };
  const gotoloinpage = () => {
    navigate("/Forget_password");
  };
  return (
    <div className="w-full h-[100vh] bg-[#D9F0FF] flex flex-col relative   ">
      <div className="flex gap-1 items-center ">
        <h2 className="text-[24px] mt-1.5 ml-2 font-bold text-[#002D54]">
          Bat<span className="text-[#2663CD]">Books</span>
        </h2>
      </div>
      <main className="flex flex-col relative items-center justify-center h-full mt-15   lg:h-120 ">
        {/* <img src="middle-left.png" alt="mid-right" className="w-[5.2vw] absolute top-3 left-0 "/> */}
        <div className="flex flex-col relative w-[80vw]  h-full mt-50 p-8 pr-[2vw] pl-[2vw] pt-20 bg-[#A4C0ED] rounded-lg shadow-md md:pt-50   lg:flex lg:flex-col lg:mt-0 lg:relative lg:w-[40vw] lg:h-110 lg:p-8 lg:pr-[2vw] lg:pl-[2vw] lg:pt-20 lg:bg-[#A4C0ED] lg:rounded-lg lg:shadow-md">
          <h2 className="text-xl font-bold text-center text-gray-700 mb-6">
            بازیابی رمز عبور
          </h2>

          {errors.general && (
            <p className="text-red-500 text-center mb-2">{errors.general}</p>
          )}
          {success && (
            <p className="text-green-500 text-center mb-3">{success}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-[1vw]">
            {/* Verification Code Input */}
            <div className="place-items-center lg:ml-[4.5vw]">
              <div className="relative flex  items-center w-[52vw] bg-white border border-gray-300 rounded-full mb-2 md:mb-4 md:h-12 lg:w-[26vw] lg:mb-0  ">
                <img
                  src="/images/mid-left.png"
                  alt="mid-right"
                  className=" hidden absolute md:block md:top-32  md:-left-[15vw] md:w-70  lg:block lg:w-45 lg:absolute lg:top-26 lg:-left-[9.2vw] "
                />

                <input
                  type="text"
                  value={code}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="کد بازیابی"
                  className="w-full h-10 px-[6vw] text-right bg-transparent focus:outline-none rounded-full placeholder:opacity-40 placeholder:text-right focus:ring-2 focus:ring-blue-700 hover:ring-2 hover:ring-blue-700 lg:px-[3.1vw] "
                />
                <img
                  src="/images/lock.png"
                  alt="lock"
                  className="absolute left-[47vw] text-gray-500 lg:left-[23.3vw] "
                />
              </div>
              {errors.code && (
                <p className="text-red-500 text-sm mt-1">{errors.code}</p>
              )}
            </div>

            {/* New Password Input */}
            <div className="place-items-center mb-2 md:mb-4 lg:ml-[4.5vw]">
              <div className="relative flex  items-center w-[52vw] bg-white border border-gray-300 rounded-full lg:w-[26vw] ">
                <input
                  type="password"
                  value={new_password}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="رمز جدید"
                  className="w-full h-10 px-[6vw] text-right bg-transparent focus:outline-none rounded-full placeholder:opacity-40 placeholder:text-right focus:ring-2 focus:ring-blue-700 hover:ring-2 hover:ring-blue-700 lg:px-[3.1vw]"
                />
                <img
                  src="/images/lock.png"
                  alt="lock"
                  className="absolute left-[47vw] text-gray-500 lg:left-[23.3vw]"
                />
              </div>
              {errors.new_password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.new_password}
                </p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="place-items-center mb-3 md:mb-4 lg:ml-[4.5vw]">
              <div className="relative flex  items-center w-[52vw] bg-white border border-gray-300 rounded-full lg:w-[26vw] ">
                <input
                  type="password"
                  value={new_password_conf}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="رمز عبور خود را تکرار کنید"
                  className="w-full h-10 px-[6vw] text-right bg-transparent focus:outline-none rounded-full placeholder:opacity-40 placeholder:text-right focus:ring-2 focus:ring-blue-700 hover:ring-2 hover:ring-blue-700 lg:px-[3.1vw]"
                />
                <img
                  src="/images/lock.png"
                  alt="lock"
                  className="absolute left-[47vw] text-gray-500 lg:left-[23.3vw]"
                />
              </div>
              {errors.new_password_conf && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.new_password_conf}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button type="submit" disabled={loading} className="btn">
                <span className="span-btn">
                  {loading ? "در حال پردازش..." : "بازیابی"}
                </span>
              </button>
            </div>
          </form>
        </div>
        <img
          src="/images/mid-right.png"
          alt="mid-right"
          className="w-[13vw]   absolute top-30 left-[65.3vw] min-w-32 md:left-[67vw] md:w-[30vw] md:top-20  lg:left-[62.3vw] lg:-top-18 lg:w-[13vw]"
        />
      </main>
      <h1
        onClick={gotoloinpage}
        className="text-[1vw] text-[#2663CD] absolute top-150 left-[45vw] underline md:top-200 lg:top-123 lg:left-[45vw] "
      >
        {" "}
        بازگشت به صفحه ورود{" "}
      </h1>
      {/* <img src="batbooks.png" alt="mid-right" className="w-[5.2vw] absolute top-3 left-0 "/> */}
      <img
        src="/images/bottom-left.png"
        alt="bottom-left"
        className="absolute left-0 bottom-0 w-[25vw] aspect-auto"
      />
      <img
        src="/images/bottom-right.png"
        alt="bottom-right"
        className=" absolute right-[0px] bottom-0 w-[33vw] aspect-auto"
      />
    </div>
  );
}
