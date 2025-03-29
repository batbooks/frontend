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
    if (!new_password.trim()) newErrors.new_password = "رمز عبور جدید را وارد کنید.";
    else if (new_password.length < 6) newErrors.new_password = "رمز عبور حداقل باید ۶ کاراکتر باشد.";
    if (new_password_conf !== new_password) newErrors.new_password_conf = "رمزهای عبور مطابقت ندارند.";

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
      const response = await axios.post("https://batbooks.liara.run/auth/reset-password/verify-otp/", {
        email,
        code,
        new_password,
        new_password_conf
      });

      if (response.data.success) {
        setSuccess("رمز عبور با موفقیت تغییر کرد.");
        console.log("sfdsdf ")
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setErrors({ general: " خطا در بازیابی رمز عبور. لطفا دوباره امتحان کنید " });
      console.log(err  )
      console.log(email)
      console.log(code)
      console.log(new_password)
      console.log(new_password_conf)

    } finally {
      setLoading(false);
      setSuccess("رمز عبور با موفقیت تغییر کرد.");
    }
  };
  const gotoloinpage=()=>{
   navigate('/Forget_password')
  }
  return (
    <div className="w-full h-full flex flex-col relative">
    
    <div className="flex flex-col relative items-center justify-center h-120 mt-15">
      
      {/* <img src="middle-left.png" alt="mid-right" className="w-[5.2vw] absolute top-3 left-0 "/> */}
      <div className="flex flex-col relative w-[40vw] h-110 p-8 pr-[2vw] pl-[2vw] pt-20 bg-[#A4C0ED] rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-center text-gray-700 mb-6">
          بازیابی رمز عبور
        </h2>

        {errors.general && <p className="text-red-500 text-center mb-2">{errors.general}</p>}
        {success && <p className="text-green-500 text-center mb-3">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-[1vw]">
          {/* Verification Code Input */}
          <div className="ml-[4.5vw]">
            <div className="relative flex  items-center w-[26vw] bg-white border border-gray-300 rounded-full  ">
            <img src="middle-left.png" alt="mid-right" className="w-45 absolute top-26 -left-[6.2vw] "/>

              <input
                type="text"
                value={code}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="کد بازیابی"
                className="w-[26vw] h-10 px-[3.1vw] text-right bg-transparent focus:outline-none rounded-full placeholder:opacity-40 placeholder:text-right focus:ring-2 focus:ring-blue-700 hover:ring-2 hover:ring-blue-700"
              />
              <img src="lock.png" alt="lock" className="absolute left-[23.3vw] text-gray-500" />
            </div>
            {errors.code && (
              <p className="text-red-500 text-sm mt-1">{errors.code}</p>
            )}
          </div>

          {/* New Password Input */}
          <div className="ml-[4.5vw]">
            <div className="relative flex items-center w-[26vw] bg-white border border-gray-300 rounded-full ">
              <input
                type="password"
                value={new_password}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="رمز جدید"
                className="w-[26vw] h-10 px-12 text-right bg-transparent focus:outline-none rounded-full placeholder:opacity-40 placeholder:text-right focus:ring-2 focus:ring-blue-700 hover:ring-2 hover:ring-blue-700"
              />
              <img src="lock.png" alt="lock" className="absolute left-[23.3vw] text-gray-500" />
            </div>
            {errors.new_password && (
              <p className="text-red-500 text-sm mt-1">{errors.new_password}</p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="ml-[4.5vw]">
            <div className="relative flex items-center w-[26vw] bg-white border border-gray-300 rounded-full  ">
              <input
                type="password"
                value={new_password_conf}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="رمز عبور خود را تکرار کنید"
                className="w-[26vw] h-10 px-[3.1vw] text-right bg-transparent focus:outline-none rounded-full placeholder:opacity-40 placeholder:text-right focus:ring-2 focus:ring-blue-700 hover:ring-2 hover:ring-blue-700"
              />
              <img src="lock.png" alt="lock" className="absolute left-[23.37vw] text-gray-500" />
            </div>
            {errors.new_password_conf && (
              <p className="text-red-500 text-sm mt-1">{errors.new_password_conf}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="w-[12vw] h-10 text-[1vw] bg-[#2663CD] text-white rounded-full font-semibold hover:bg-blue-700 transition-all"
            >
              {loading ? "در حال پردازش..." : "بازیابی"}
            </button>
          </div>
        </form>
      </div>
      <img src="middle-right-login.png" alt="mid-right" className="w-[13vw]   absolute -top-18 left-[62.3vw] min-w-32"/>
    </div>
    <h1 onClick={gotoloinpage} className="text-[1vw] text-[#2663CD] absolute top-123 left-[45vw] underline"> بازگشت به صفحه ورود </h1>
    {/* <img src="batbooks.png" alt="mid-right" className="w-[5.2vw] absolute top-3 left-0 "/> */}
    <img src="bottomleft.png" alt="bottom-left" className="w-[17vw] absolute top-123 left-0 min-w-50"/>
    <img src="bottom-right.png" alt="bottom-left" className="w-[35vw]  absolute top-52 right-0 min-w-100"/>

    <p className="text-[1.5vw] font-bold absolute top-8 left-[2vw] ">BatBooks</p>

    </div>
  );
}
