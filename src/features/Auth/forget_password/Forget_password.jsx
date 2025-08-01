import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Forget_password() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(" https://batbooks.liara.run/auth/reset-password/send-otp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("کد بازیابی با موفقیت ارسال شد.");
        navigate("/vf", { state: { email } });
      } else {
        throw new Error(data.message || "ارسال کد ناموفق بود");
      }
    } catch (err) {
      setError("ایمیل خود را درست وارد کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50 text-gray-800 p-4" dir="rtl">
      <div className="bg-white/70 backdrop-blur-xl border border-gray-200/50 shadow-2xl rounded-2xl p-8 md:p-12 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">بازیابی رمز عبور</h1>
          <p className="text-gray-500 mt-3">ایمیل خود را برای دریافت کد وارد کنید.</p>
        </div>
        <form onSubmit={handleSendCode}>
          <div className="mb-6">
            <input
              type="email"
              className="w-full p-3.5 text-sm border border-gray-300 rounded-lg bg-white/50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="ایمیل ثبت شده"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {message && <p className="text-green-600 text-sm mb-4">{message}</p>}
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-3.5"
            disabled={isLoading}
          >
            {isLoading ? "در حال ارسال..." : "ارسال کد"}
          </button>
        </form>
      </div>
    </div>
  );
}