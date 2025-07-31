import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Vf() {
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const validateForm = () => {
    let newErrors = {};
    if (!code.trim()) newErrors.code = "کد بازیابی را وارد کنید.";
    if (!newPassword.trim())
      newErrors.newPassword = "رمز عبور جدید را وارد کنید.";
    else if (newPassword.length < 6)
      newErrors.newPassword = "رمز عبور باید حداقل ۶ کاراکتر باشد.";
    if (newPassword !== confirmPassword)
      newErrors.confirmPassword = "رمزهای عبور یکسان نیستند.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, code, newPassword, confirmPassword);
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await fetch(
        "https://batbooks.liara.run/auth/reset-password/verify-otp/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            code,
            new_password: newPassword,
            new_password_conf: confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        navigate("/auth/login");
      } else {
        setErrors({
          general: "خطا در بازیابی رمز عبور. لطفا دوباره تلاش کنید.",
        });
      }
    } catch (error) {
      setErrors({ general: "خطا در ارتباط با سرور." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-sky-50 text-gray-800 p-4"
      dir="rtl"
    >
      <div className="bg-white/70 backdrop-blur-xl border border-gray-200/50 shadow-2xl rounded-2xl p-8 md:p-12 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">تغییر رمز عبور</h1>
          <p className="text-gray-500 mt-3">
            کد ارسال شده به{" "}
            <span className="font-medium text-gray-700">{email}</span> را وارد
            کنید.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="کد بازیابی"
              className="w-full p-3 border border-gray-300 rounded-lg text-sm"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            {errors.code && (
              <p className="text-red-500 text-sm mt-1">{errors.code}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="رمز عبور جدید"
              className="w-full p-3 border border-gray-300 rounded-lg text-sm"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="تکرار رمز عبور جدید"
              className="w-full p-3 border border-gray-300 rounded-lg text-sm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          {errors.general && (
            <p className="text-red-500 text-sm mt-2 text-center">
              {errors.general}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
            disabled={loading}
          >
            {loading ? "در حال ارسال..." : "تغییر رمز و ورود"}
          </button>
        </form>
      </div>
    </div>
  );
}
