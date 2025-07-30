import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
function Otp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email.email;
  const [loading, setLoading] = useState(false);

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // اگر کاربر عددی وارد کرد، به اینپوت بعدی برو
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");

    setLoading(true);
    try {
      const response = await fetch("https://batbooks.liara.run/auth/otp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: otpCode }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate("/auth/login");
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      throw new Error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#D9F0FF]">
      <div className="flex gap-1 items-center ">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="cursor-pointer text-[24px] mt-1.5 ml-2 font-[800] "
        >
          Bat<span className="text-[#2663CD]">Books</span>
        </button>
      </div>
      <main className="w-[700px] h-[450px] m-auto bg-[#A4C0ED] rounded-[13px] justify-center mt-14 pt-10 relatvie">
        <h2 className="text-[25px] font-bold text-center">
          کد تایید را وارد کنید
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="card flex justify-evenly w-[60%] mx-auto mt-[70px] mb-[50px]">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                className="bg-white h-[70px] w-[45px] rounded-[5px] text-[45px] text-center"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => (inputsRef.current[index] = el)}
              />
            ))}
          </div>
          <button type="submit" className="btn " disabled={loading}>
            <span className="span-btn">
              {loading ? "در حال بررسی کد" : "تایید"}
            </span>
          </button>
        </form>
        <img
          src="/images/mid-left.png"
          alt="mid-left"
          className=" absolute left-[335px] top-[280px]"
        />
        <img
          src="/images/mid-right.png"
          alt="mid-right"
          className="absolute right-[280px] top-[-15px]"
        />
      </main>
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
export default Otp;
