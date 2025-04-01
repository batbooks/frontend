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
        },
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
    <div className="h-[100vh] w-[100vw] bg-[#D9F0FF]">
      <div className="flex items-center gap-1">
        <img
          src="/photos/logo.png"
          alt="mid-right"
          className="mt-1.5 w-[6vw]"
        />
      </div>
      <main className="m-auto h-[55vh] w-[52vw] justify-center rounded-[13px] bg-[#A4C0ED]">
        <h2 className="mt-auto text-center text-[20px] font-bold">خوش آمدید</h2>
        <h3 className="mb-14 text-center text-[16px]">برای ادامه وارد شوید</h3>
        <form onSubmit={handleSubmit}>
          <input
            className="mx-auto mb-5 flex h-[4.58vh] w-[35.55vw] items-center justify-center rounded-[40px] bg-[#FFFFFF] pl-16 placeholder:mr-[72px] placeholder:text-right"
            value={email}
            placeholder="ایمیل"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type={showPassword ? "text" : "password"}
            className="mx-auto mb-5 flex h-[4.58vh] w-[35.55vw] items-center justify-center rounded-[40px] bg-[#FFFFFF] pl-16 placeholder:mr-[72px] placeholder:text-right"
            value={password}
            placeholder="رمز عبور"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="mx-auto mb-5 flex h-[38px] w-[143px] cursor-pointer items-center justify-center rounded-[46px] bg-[#2663CD] text-center text-white disabled:opacity-50"
          >
            {loading ? "...در حال ورود" : "ورود"}
          </button>
          <button className="mx-auto flex cursor-pointer justify-center">
            رمز عبور را فراموش کرده ام
          </button>
        </form>
      </main>

      <div className="mx-auto flex justify-center">
        <Link to="/auth/signup" className="cursor-pointer text-[#2663CD]">
          ثبت نام
        </Link>
        <p> هنوز ثبت نام نکرده اید؟</p>
      </div>
      {showPassword ? (
        <img
          src="/photos/eye-on.png"
          alt="eye-on-password"
          onClick={handleShowPassword}
          className="absolute top-[36.75vh] left-[33vw] z-50"
        />
      ) : (
        <img
          src="/photos/eye-off.png"
          alt="eye-off-password"
          onClick={handleShowPassword}
          className="absolute top-[36.75vh] left-[33vw] z-50"
        />
      )}

      <img
        src="/photos/user.png"
        alt="user"
        className="absolute top-[29.5vh] right-[33vw]"
      />
      <img
        src="/photos/lock.png"
        alt="lock-password"
        className="absolute top-[36.75vh] right-[33vw]"
      />
      <img
        src="/photos/mid-left.png"
        alt="mid-left"
        className="absolute bottom-[22.2vh] left-[23.5vw]"
      />
      <img
        src="/photos/mid-right.png"
        alt="mid-right"
        className="absolute right-[18vw] bottom-[48vh]"
      />
      <img
        src="/photos/bottom-left.png"
        alt="bottom-left"
        className="absolute bottom-[0vh] left-[0vw]"
      />
      <img
        src="/photos/bottom-right.png"
        alt="bottom-right"
        className="absolute right-[1vw] bottom-[0vh]"
      />
    </div>
  );
}
export default Login;
