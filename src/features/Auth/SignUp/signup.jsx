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
            ثبت نام
          </button>
        </form>
      </main>
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
      />
    </div>
  );
}

export default Signup;
