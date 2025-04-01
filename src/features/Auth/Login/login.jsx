import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://batbooks.liara.run/auth/token/",
        {
          email,
          password,
        }
      );

      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      navigate("/");
    } finally {
      setLoading(false);
    }
  }

  function handleShowPassword() {
    setShowPassword((show) => !show);
  }

  return (
    <div className="w-[100vw] h-[100vh] bg-[#D9F0FF]">
      <div className="flex gap-1 items-center ">
        <h2 className="text-[24px] mt-1.5 ml-2 font-bold text-[#333333]">
          BatBooks
        </h2>
      </div>
      <main className=" w-[52vw] h-[55vh] m-auto bg-[#A4C0ED] rounded-[13px] justify-center mt-14 ">
        <h2 className="font-bold text-center text-[20px] mt-auto ">
          خوش آمدید
        </h2>
        <h3 className="text-center text-[16px] mt-1.5 mb-12.5">
          برای ادامه وارد شوید
        </h3>
        <form onSubmit={handleSubmit}>
          <input
            className="bg-[#FFFFFF] mx-auto mb-5 flex justify-center pl-14 items-center  w-[27vw] h-[4.58vh] rounded-[40px] placeholder:text-right placeholder:mr-[72px]"
            value={email}
            placeholder="ایمیل"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type={showPassword ? "text" : "password"}
            className="bg-[#FFFFFF] mx-auto mb-5 flex  justify-center pl-14 items-center  w-[27vw] h-[4.58vh] rounded-[40px] placeholder:text-right placeholder:mr-[72px]"
            value={password}
            placeholder="رمز عبور"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#2663CD] text-white mx-auto mb-5 text-center flex justify-center items-center  w-[143px] h-[38px] rounded-[46px] cursor-pointer disabled:opacity-50"
          >
            {loading ? "...در حال ورود" : "ورود"}
          </button>
          <button className=" flex mx-auto justify-center cursor-pointer">
            رمز عبور را فراموش کرده ام
          </button>
        </form>
      </main>

      <div className="flex mx-auto justify-center">
        <Link to="/auth/signup" className="text-[#2663CD] cursor-pointer">
          ثبت نام
        </Link>
        <p> هنوز ثبت نام نکرده ای؟</p>
      </div>
      {showPassword ? (
        <img
          src="../../../../public/eye-on.png"
          alt="eye-on-password"
          onClick={handleShowPassword}
          className="absolute z-50 left-[37vw] top-[36.6vh]"
        />
      ) : (
        <img
          src="../../../../public/eye-off.png"
          alt="eye-off-password"
          onClick={handleShowPassword}
          className="absolute z-50 left-[37vw] top-[36.6vh]"
        />
      )}

      <img
        src="../../../../public/user.png"
        alt="user"
        className="absolute right-[37vw] top-[29vh]"
      />
      <img
        src="../../../../public/lock.png"
        alt="lock-password"
        className="absolute right-[37vw] top-[36.6vh]"
      />
      <img
        src="../../../../public/mid-left.png"
        alt="mid-left"
        className=" absolute left-[23.5vw] bottom-[22.2vh]"
      />
      <img
        src="../../../../public/mid-right.png"
        alt="mid-right"
        className="absolute right-[18vw] bottom-[48vh]"
      />
      <img
        src="../../../../public/bottom-left.png"
        alt="bottom-left"
        className="absolute left-[0vw] bottom-[0vh]"
      />
      <img
        src="../../../../public/bottom-right.png"
        alt="bottom-right"
        className=" absolute right-[1vw] bottom-[0vh]"
      />
    </div>
  );
}
export default Login;
