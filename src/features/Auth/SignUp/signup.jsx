import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  function handleSubmit(e) {
    e.prevent.default;
  }

  function handleShowPassword() {
    setShowPassword((show) => !show);
  }
  function handleShowRepeatPassword() {
    setShowRepeatPassword((show) => !show);
  }

  return (
<<<<<<< HEAD:src/features/Auth/Sign up/signup.jsx
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
        <form typeof="submit" onSubmit={handleSubmit}>
          <div className="flex justify-center relative mb-3">
            <input
              className="bg-[#FFFFFF] mx-auto flex justify-center pl-14 px-4 items-center  w-[60%] h-[4.58vh] rounded-[40px] placeholder:text-right placeholder:mr-[72px]"
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
              className="bg-[#FFFFFF] mx-auto flex justify-center pl-14 px-4 items-center  w-[60%] h-[4.58vh] rounded-[40px] placeholder:text-right placeholder:mr-[72px]"
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
              className="bg-[#FFFFFF] mx-auto flex justify-center pl-14 px-4 items-center  w-[60%] h-[4.58vh] rounded-[40px] placeholder:text-right placeholder:mr-[72px]"
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
          <button className="bg-[#2663CD] shadow-lg shadow-[#000]/25 text-white mx-auto flex justify-center items-center  w-[143px] h-[38px] rounded-[46px] cursor-pointer focus:shadow-none focus:bg-[#2663CD]/90 focus:outline-none focus:ring-[#2663CD] focus:ring-offset-2 focus:ring-[2px] hover:bg-[#2663CD]/90 active:bg-[#2663CD]/30 active:duration-300 active:outline-none active:ring-0 active:ring-offset-0 disabled:cursor-auto disabled:shadow-none disabled:bg-[#2663CD]/60 disabled:ring-0 disabled:ring-offset-0 ">
=======
    <div className="h-[100vh] w-[100vw] bg-[#D9F0FF]">
      <div className="flex items-center gap-1">
        <img
          src="/photos/logo.png"
          alt="mid-right"
          className="w-[6vw] pt-1.5"
        />
      </div>

      <main className="m-auto h-[55vh] w-[52vw] justify-center rounded-[13px] bg-[#A4C0ED]">
        <h2 className="mt-auto text-center text-[20px] font-bold">
          به batbooks خوش آمدید
        </h2>
        <h3 className="mb-14 text-center text-[16px]">
          برای ادامه دادن ثبت نام کنید
        </h3>
        <form typeof="submit" className="flex-col" onSubmit={handleSubmit}>
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
            placeholder="رمز عبور (8 کاراکتر)"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type={showRepeatPassword ? "text" : "password"}
            className="mx-auto mb-5 flex h-[4.58vh] w-[35.55vw] items-center justify-center rounded-[40px] bg-[#FFFFFF] pl-16 placeholder:mr-[72px] placeholder:text-right"
            value={repeatPassword}
            placeholder="تکرار رمز عبور"
            onChange={(e) => setRepeatPassword(e.target.value)}
          />

          <button className="mx-auto flex h-[38px] w-[143px] cursor-pointer items-center justify-center rounded-[46px] bg-[#2663CD] text-white">
>>>>>>> 228aa17fd3f1bf3008c45103cf9df45de73743f9:src/features/Auth/SignUp/signup.jsx
            ثبت نام
          </button>
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
<<<<<<< HEAD:src/features/Auth/Sign up/signup.jsx
      <img
        src="/src/assets/images/bottom-left.png"
        alt="bottom-left"
        className="absolute left-0 bottom-0 w-[25vw] aspect-auto"
      />
      <img
        src="/src/assets/images/bottom-right.png"
        alt="bottom-right"
        className=" absolute right-[0px] bottom-0 w-[33vw] ascept-auto"
=======
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
      {showRepeatPassword ? (
        <img
          src="/photos/eye-on.png"
          alt="eye-on-repeat-password"
          onClick={handleShowRepeatPassword}
          className="absolute top-[44vh] left-[33vw] z-50"
        />
      ) : (
        <img
          src="/photos/eye-off.png"
          alt="eye-off-repeat-password"
          onClick={handleShowRepeatPassword}
          className="absolute top-[44vh] left-[33vw] z-50"
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
        src="/photos/lock.png"
        alt="lock-repeat-password"
        className="absolute top-[44vh] right-[33vw]"
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
>>>>>>> 228aa17fd3f1bf3008c45103cf9df45de73743f9:src/features/Auth/SignUp/signup.jsx
      />
    </div>
  );
}

export default Signup;
