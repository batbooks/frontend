
import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// ------------------------
//      کامپوننت OTP
// ------------------------
const OTP_LENGTH = 6; // طول کد تایید

export default function Otp() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  // استیت‌ها
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputsRef = useRef([]);

  // تایمر شمارش معکوس
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // تغییر مقدار هر اینپوت
  const handleChange = (index, value) => {
    if (isNaN(value)) return; // فقط اعداد مجازند
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  // پشتیبانی از Backspace برای رفتن به قبلی
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // ارسال مجدد کد
  const handleResendCode = async () => {
    try {
      setError('');
      setTimer(60);
      // درخواست ارسال مجدد (در صورت وجود API)
      await fetch('http://127.0.0.1:8000/auth/resend-otp/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch (err) {
      setError('ارسال مجدد با خطا مواجه شد.');
    }
  };

  // ارسال فرم تایید
  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length !== OTP_LENGTH) {
      setError('کد تایید کامل نیست.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://127.0.0.1:8000/auth/otp/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: otpCode }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/auth/login');
      } else {
        setError(data.message || 'کد تایید نامعتبر است.');
      }
    } catch (err) {
      setError('خطایی رخ داد. دوباره تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* استایل سراسری */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700&display=swap');
          body { font-family: 'Vazirmatn', sans-serif; }
          .otp-input {
            width: 3rem;
            height: 3.5rem;
            text-align: center;
            font-size: 1.5rem;
            border-radius: 0.5rem;
            border: 1px solid #d1d5db;
            background-color: rgba(255, 255, 255, 0.5);
            transition: all 0.3s;
          }
          .otp-input:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.4);
            outline: none;
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

          {/* کارت تایید کد */}
          <div className="relative z-10 w-full max-w-md">
            <div className="bg-white/70 backdrop-blur-xl border border-gray-200/50 shadow-2xl shadow-sky-200/60 rounded-2xl p-8 md:p-12">
              {/* هدر */}
              <div className="text-center mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-wider">تایید کد</h1>
                <p className="text-gray-500 mt-3">کد {OTP_LENGTH} رقمی ارسال شده به ایمیل خود را وارد کنید.</p>
              </div>

              {/* فرم */}
              <form onSubmit={handleSubmit}>
                {/* ورودی‌ها */}
                <div className="flex justify-center gap-2 mb-6" dir="ltr">
                  {otp.map((val, index) => (
                    <input
                      key={index}
                      className="otp-input"
                      type="text"
                      maxLength="1"
                      value={val}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onFocus={(e) => e.target.select()}
                      ref={(el) => (inputsRef.current[index] = el)}
                    />
                  ))}
                </div>

                {/* خطا */}
                {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}

                {/* دکمه تایید */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-3.5 text-center transition duration-300 transform ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                >
                  {loading ? 'در حال تایید...' : 'تایید و ادامه'}
                </button>

                {/* ارسال مجدد */}
                {/* <div className="text-sm text-center text-gray-500 mt-8">
                  {timer > 0 ? (
                    <p>ارسال مجدد کد تا {timer} ثانیه دیگر</p>
                  ) : (
                    <button type="button" onClick={handleResendCode} className="font-medium text-blue-600 hover:underline">
                      ارسال مجدد کد
                    </button>
                  )}
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

