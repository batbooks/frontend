import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch(
        "https://batbooks.liara.run/auth/register/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, c_password: repeatPassword }),
        }
      );
      console.log("Response status:", response.status);
      console.log("Response headers:", [...response.headers]);
      const data = await response.json();
      console.log("Response data:", data);
      if (response.ok) {
        navigate("/auth/otp", { state: { email: { email } } });
      } else {
        setError(data[0]);
        throw new Error(data[0]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  function handleShowPassword() {
    setShowPassword((show) => !show);
  }
  function handleShowRepeatPassword() {
    setShowRepeatPassword((show) => !show);
  }

  return (
    <div className="w-[100vw] h-[100vh] bg-[#D9F0FF]">
      <div className="flex gap-1 items-center ">
        <h2 className="text-[24px] mt-1.5 ml-2 font-bold text-[#002D54]">
          Bat<span className="text-[#2663CD]">Books</span>
        </h2>
      </div>

      <main className="w-[700px] h-[450px] m-auto bg-[#A4C0ED] rounded-[13px] justify-center mt-14 pt-10 relatvie">
        <h2 className="font-bold text-center text-[20px] mt-auto ">
          خوش آمدید<span> batbooks</span> به
        </h2>
        <h3 className="text-center text-[16px] mt-1.5 mb-12.5">
          برای ادامه دادن ثبت نام کنید
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center relative mb-3">
            <input
              className="bg-[#FFFFFF] mx-auto flex justify-center pl-14 px-4 items-center  w-[60%] h-[4.58vh] rounded-[40px] placeholder:text-right placeholder:mr-[50px]"
              value={email}
              placeholder="ایمیل"
              onChange={(e) => setEmail(e.target.value)}
            />
            <img
              src="/src/assets/images/user.png"
              alt="user"
              className="absolute right-[150px] top-[50%] -translate-y-1/2"
            />
          </div>
          <div className="flex justify-center relative mb-3">
            <input
              type={showPassword ? "text" : "password"}
              className="bg-[#FFFFFF] mx-auto flex justify-center pl-14 px-4 items-center  w-[60%] h-[4.58vh] rounded-[40px] placeholder:text-right placeholder:mr-[50px]"
              value={password}
              placeholder="رمز عبور (8 کاراکتر)"
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src="/src/assets/images/lock.png"
              alt="lock-password"
              className="absolute right-[150px] top-[50%] -translate-y-1/2"
            />
            {showPassword ? (
              <img
                src="/src/assets/images/eye-on.png"
                alt="eye-on-password"
                onClick={handleShowPassword}
                className="absolute z-50 mr-95 mt-2"
              />
            ) : (
              <img
                src="/src/assets/images/eye-off.png"
                alt="eye-off-password"
                onClick={handleShowPassword}
                className="absolute z-50 mr-95 mt-2"
              />
            )}
          </div>
          <div className="flex justify-center relative mb-3">
            <input
              type={showRepeatPassword ? "text" : "password"}
              className="bg-[#FFFFFF] mx-auto flex justify-center pl-14 px-4 items-center  w-[60%] h-[4.58vh] rounded-[40px] placeholder:text-right placeholder:mr-[50px]"
              value={repeatPassword}
              placeholder="تکرار رمز عبور"
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <img
              src="/src/assets/images/lock.png"
              alt="lock-repeat-password"
              className="absolute right-[150px] top-[50%] -translate-y-1/2"
            />
            {showRepeatPassword ? (
              <img
                src="/src/assets/images/eye-on.png"
                alt="eye-on-repeat-password"
                onClick={handleShowRepeatPassword}
                className="absolute z-50 mr-95 mt-2"
              />
            ) : (
              <img
                src="/src/assets/images/eye-off.png"
                alt="eye-off-repeat-password"
                onClick={handleShowRepeatPassword}
                className="absolute z-50 mr-95 mt-2"
              />
            )}
          </div>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "...در حال ثبت نام" : "ثبت نام"}
          </button>
          {error != "" ? (
            <p className="text-red-600 text-center mt-5">{error}</p>
          ) : null}
        </form>
        <img
          src="/src/assets/images/mid-left.png"
          alt="mid-left"
          className=" absolute left-[370px] top-[280px]  "
        />
        <img
          src="/src/assets/images/mid-right.png"
          alt="mid-right"
          className="absolute right-[320px] top-[0px]"
        />
      </main>
      <img
        src="/src/assets/images/bottom-left.png"
        alt="bottom-left"
        className="absolute left-0 bottom-0 w-[25vw] aspect-auto"
      />
      <img
        src="/src/assets/images/bottom-right.png"
        alt="bottom-right"
        className=" absolute right-[0px] bottom-0 w-[33vw] aspect-auto"
      />
    </div>
  );
}

export default Signup;
