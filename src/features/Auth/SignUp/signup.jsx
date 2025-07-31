
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// -----------------------
//  آیکون‌های نمایش/مخفی‌سازی رمز عبور
// -----------------------
const EyeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 1.274 4.057 5.064 7 9.542 7 .847 0 1.67.111 2.458.318M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 2l20 20" />
  </svg>
);

// -----------------------
//   کامپوننت ثبت‌نام
// -----------------------
export default function Signup() {
  const navigate = useNavigate();

  // فیلدهای فرم
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  // وضعیت نمایش رمزها
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  // وضعیت خطا و لودینگ
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // -----------------------
  //   ارسال فرم
  // -----------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // بررسی تطابق رمزها قبل از درخواست
    if (password !== repeatPassword) {
      setError('رمزهای عبور یکسان نیستند!');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/auth/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, c_password: repeatPassword }),
      });
      const data = await response.json();

      if (response.ok) {
        // انتقال به صفحهٔ OTP و ارسال ایمیل در state
        navigate('/auth/otp', { state: { email } });
      } else {
        // پیام خطا از بک‌اند یا پیام عمومی
        setError(data[0] || 'خطایی رخ داد. لطفاً دوباره امتحان کنید.');
      }
    } catch (err) {
      // خطای شبکه یا خطاهای دیگر
      if (password.length < 8) {
        setError('طول پسورد شما کم است.');
      } else {
        setError('ایمیل شما اشتباه است.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* فونت و استایل عمومی */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700&display=swap');
          body {
            font-family: 'Vazirmatn', sans-serif;
          }
          .password-toggle-icon {
            position: absolute;
            top: 50%;
            left: 1rem;
            transform: translateY(-50%);
            cursor: pointer;
          }
        `}
      </style>

      <div className="bg-sky-50 text-gray-800" dir="rtl">
        <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden">
          {/* تزئینات پس‌زمینه */}
          <div className="absolute top-10 right-10 w-48 h-48 text-sky-200/80 opacity-60 rotate-12 hidden md:block">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 22.5a.5.5 0 0 1-.5-.5v-19a.5.5 0 0 1 .5-.5h.5a2.5 2.5 0 0 1 2.5 2.5v15a2.5 2.5 0 0 1-2.5 2.5h-.5Zm-5.25-2.25a.75.75 0 0 0 0 1.5h.5a1 1 0 0 0 1-1v-15a1 1 0 0 0-1-1h-.5a.75.75 0 0 0 0 1.5h.5a.25.25 0 0 1 .25.25v14.5a.25.25 0 0 1-.25.25h-.5ZM8.5 22.5a.5.5 0 0 1-.5-.5v-19a.5.5 0 0 1 .5-.5h.5a2.5 2.5 0 0 1 2.5 2.5v15a2.5 2.5 0 0 1-2.5 2.5h-.5Zm-5-4a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 .5-.5h.5a2.5 2.5 0 0 1 2.5 2.5v9a2.5 2.5 0 0 1-2.5 2.5h-.5Z" />
            </svg>
          </div>
          <div className="absolute bottom-4 left-4 w-64 h-64 text-sky-200/80 opacity-60 -rotate-12 hidden lg:block">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              <circle cx="12" cy="12" r="4" />
            </svg>
          </div>

          {/* کارت ثبت‌نام */}
          <div className="relative z-10 w-full max-w-md">
            <div className="bg-white/70 backdrop-blur-xl border border-gray-200/50 shadow-2xl shadow-sky-200/60 rounded-2xl p-8 md:p-12">
              {/* هدر */}
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-wider">ایجاد حساب کاربری</h1>
                <p className="text-gray-500 mt-2">به بت‌بوکس بپیوندید</p>
              </div>

              {/* فرم ثبت‌نام */}
              <form onSubmit={handleSubmit}>
                {/* نام */}
                

                {/* ایمیل */}
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                      <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                      <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-12 p-3.5 transition duration-300 placeholder-gray-500"
                    placeholder="ایمیل خود را وارد کنید"
                    required
                  />
                </div>

                {/* رمز عبور */}
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                      <path d="M14 7h-1.5V4.5a4.5 4.5 0 1 0-9 0V7H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-5 8a1 1 0 1 1-2 0v-3a1 1 0 1 1 2 0v3Zm1.5-8h-5V4.5a2.5 2.5 0 1 1 5 0V7Z" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-12 p-3.5 transition duration-300 placeholder-gray-500"
                    placeholder="رمز عبور"
                    required
                  />
                  <span onClick={() => setShowPassword(!showPassword)} className="password-toggle-icon text-gray-500 hover:text-gray-800">
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </span>
                </div>

                {/* تکرار رمز عبور */}
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                      <path d="M14 7h-1.5V4.5a4.5 4.5 0 1 0-9 0V7H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-5 8a1 1 0 1 1-2 0v-3a1 1 0 1 1 2 0v3Zm1.5-8h-5V4.5a2.5 2.5 0 1 1 5 0V7Z" />
                    </svg>
                  </div>
                  <input
                    type={showRepeatPassword ? 'text' : 'password'}
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    className="bg-white/50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-12 p-3.5 transition duration-300 placeholder-gray-500"
                    placeholder="تکرار رمز عبور"
                    required
                  />
                  <span onClick={() => setShowRepeatPassword(!showRepeatPassword)} className="password-toggle-icon text-gray-500 hover:text-gray-800">
                    {showRepeatPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </span>
                </div>

                {/* پیام خطا */}
                {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

                {/* دکمه ثبت‌نام */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-3.5 text-center transition duration-300 transform ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                >
                  {loading ? 'در حال ثبت‌نام...' : 'ثبت نام'}
                </button>

                {/* لینک ورود */}
                <p className="text-sm text-center text-gray-500 mt-8">
                  قبلاً ثبت نام کرده‌اید؟{' '}
                  <Link to="/auth/login" className="font-medium text-blue-600 hover:underline">
                    وارد شوید
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

