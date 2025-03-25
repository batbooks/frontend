import { useState } from "react";

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
    <div className="w-[100vw] h-[100vh] bg-[#D9F0FF]">
      <div className="flex gap-1 items-center ">
        <img
          src="../../../../public/BatBooksLogo.png"
          alt="mid-right"
          className="w-[6vw] pt-1.5"
        />
        <h2 className="text-[24px]  font-bold text-[#333333]">BatBooks</h2>
      </div>

      <main className=" w-[52vw] h-[55vh] m-auto bg-[#A4C0ED] rounded-[13px] justify-center ">
        <h2 className="font-bold text-center text-[20px] mt-auto ">
          به batbooks خوش آمدید
        </h2>
        <h3 className="text-center text-[16px] mb-14">
          برای ادامه دادن ثبت نام کنید
        </h3>
        <form typeof="submit" className="flex-col" onSubmit={handleSubmit}>
          <input
            className="bg-[#FFFFFF] mx-auto mb-5 flex justify-center pl-16 items-center  w-[35.55vw] h-[4.58vh] rounded-[40px] placeholder:text-right placeholder:mr-[72px]"
            value={email}
            placeholder="ایمیل"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type={showPassword ? "text" : "password"}
            className="bg-[#FFFFFF] mx-auto mb-5 flex justify-center pl-16 items-center w-[35.55vw] h-[4.58vh] rounded-[40px] placeholder:text-right placeholder:mr-[72px]"
            value={password}
            placeholder="رمز عبور (8 کاراکتر)"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type={showRepeatPassword ? "text" : "password"}
            className="bg-[#FFFFFF] mx-auto mb-5 flex justify-center  pl-16 items-center w-[35.55vw] h-[4.58vh] rounded-[40px] placeholder:text-right placeholder:mr-[72px]"
            value={repeatPassword}
            placeholder="تکرار رمز عبور"
            onChange={(e) => setRepeatPassword(e.target.value)}
          />

          <button className="bg-[#2663CD] text-white mx-auto flex justify-center items-center  w-[143px] h-[38px] rounded-[46px] cursor-pointer">
            ثبت نام
          </button>
        </form>
      </main>
      {showPassword ? (
        <img
          src="../../../../public/eye-on.png"
          alt="eye-on-password"
          onClick={handleShowPassword}
          className="absolute z-50 left-[33vw] top-[36.75vh] "
        />
      ) : (
        <img
          src="../../../../public/eye-off.png"
          alt="eye-off-password"
          onClick={handleShowPassword}
          className="absolute z-50 left-[33vw] top-[36.75vh] "
        />
      )}
      {showRepeatPassword ? (
        <img
          src="../../../../public/eye-on.png"
          alt="eye-on-repeat-password"
          onClick={handleShowRepeatPassword}
          className="absolute z-50 left-[33vw] top-[44vh]"
        />
      ) : (
        <img
          src="../../../../public/eye-off.png"
          alt="eye-off-repeat-password"
          onClick={handleShowRepeatPassword}
          className="absolute z-50 left-[33vw] top-[44vh]"
        />
      )}

      <img
        src="../../../../public/user.png"
        alt="user"
        className="absolute right-[33vw] top-[29.5vh]"
      />
      <img
        src="../../../../public/lock.png"
        alt="lock-password"
        className="absolute right-[33vw] top-[36.75vh]"
      />
      <img
        src="../../../../public/lock.png"
        alt="lock-repeat-password"
        className="absolute right-[33vw] top-[44vh]"
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

export default Signup;
