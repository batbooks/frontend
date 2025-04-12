import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userinfo,setuserinfo]=useState([])
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const fetchuserinfo = async (acces_token) => {
    try {
      const response = await fetch(
        `https://batbooks.liara.run/auth/who/`,
        {
          method: "GET",
          
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${acces_token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setuserinfo(data.userinfo)
    } catch (err) {
      console.error(err.message)
      console.log("asdad");
    }
  };

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
      // Cookies.set('access_token', 'value', { expires: 7,secure:true , path:'/'  } );
      // Cookies.set('refresh_token', 'value', { expires: 7,secure:true , path:'/'  } );
      if (response.ok){
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      navigate("/");
      const user = userinfo; 
      fetchuserinfo(response.data.access)
      
      dispatch(loginSuccess({
        user,
        access: response.data.access,
        refresh: response.data.refresh
      }));
      }
      
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
        <h2 className="text-[24px] mt-1.5 ml-2 font-bold text-[#002D54]">
          Bat<span className="text-[#2663CD]">Books</span>
        </h2>
      </div>
      <main className="w-[700px] h-[450px] m-auto bg-[#A4C0ED] rounded-[13px] justify-center mt-14 pt-10 relatvie">
        <h2 className="font-bold text-center text-[20px] ">خوش آمدید</h2>
        <h3 className="text-center text-[16px] mt-1.5 mb-12">
          برای ادامه وارد شوید
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center relative mb-3">
            <input
              className="bg-[#FFFFFF] mx-auto flex justify-center pl-14 px-4 items-center  w-[60%] h-[4.58vh] rounded-[40px] placeholder:text-right placeholder:mr-[72px]"
              value={email}
              dir="ltr"
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
              dir="ltr"
              placeholder="رمز عبور"
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
          <button
            type="submit"
            className="bg-[#2663CD] shadow-lg shadow-[#000]/25 cursor-pointer transition-colors duration-200 text-white mx-auto mb-5 text-center flex justify-center items-center  w-[143px] h-[38px] rounded-[46px] focus:shadow-none focus:bg-[#2663CD]/90 focus:outline-none focus:ring-[#2663CD] focus:ring-offset-2 focus:ring-[2px] hover:bg-[#2663CD]/90 active:bg-[#2663CD]/30 active:duration-300 active:outline-none active:ring-0 active:ring-offset-0 disabled:cursor-auto disabled:shadow-none disabled:bg-[#2663CD]/60 disabled:ring-0 disabled:ring-offset-0"
            disabled={loading}
          >
            {loading ? "...در حال ورود" : "ورود"}
          </button>
          <button
            className="mx-auto flex cursor-pointer justify-center"
            onClick={() => navigate("/Forget_password")}
          >
            رمز عبور را فراموش کرده ام
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

      <div className="mx-auto flex justify-center">
        <Link to="/auth/signup" className="cursor-pointer text-[#2663CD]">
          ثبت نام
        </Link>
        <p> هنوز ثبت نام نکرده اید؟</p>
      </div>
      <img
        src="/src/assets/images/bottom-left.png"
        alt="bottom-left"
        className="absolute left-0 bottom-0 w-[25vw] aspect-auto"
      />
      <img
        src="/src/assets/images/bottom-right.png"
        alt="bottom-right"
        className=" absolute right-[0px] bottom-0 w-[33vw] ascept-auto"
      />
    </div>
  );
}
export default Login;
