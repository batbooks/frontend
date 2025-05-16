import { useNavigate } from "react-router";

export default function UserMessage({
  Message = "پیام تستی",
  UserId = 1,
  prevMessage = 0,
}) {
  const navigate = useNavigate();
  return (
    <div className="px-3 mb-5">
      {/* نام کاربری فقط اگر پیام قبلی وجود نداشته باشد */}
      {/* {!prevMessage && (
        <div className="relative group inline-block">
          
          <div className="absolute left-0 top-full mt-1 w-52 bg-white text-right text-sm text-gray-700 border border-blue-200 shadow-lg rounded-xl p-3 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-none transition-all duration-300 z-50">
            <p>
              <strong>نام کامل:</strong> کاربر تستی
            </p>
            <p dir="rtl">
              <strong>ایمیل:</strong> test@example.com
            </p>
            
          </div>
        </div>
      )} */}

      <div className="flex flex-row gap-2 items-end animate-fadeIn">
        {!prevMessage && (
          <img
            onClick={() => navigate(`/anotheruserprofile/13`)}
            className="w-10 h-10 rounded-full border-2 border-blue-400 shadow-md cursor-pointer hover:scale-105 transition-all duration-200"
            src="./20.jpg"
            alt="avatar"
          />
        )}

        <section className="relative shadow-lg max-w-[400px] bg-gradient-to-br from-blue-100 to-blue-200 px-4 py-2 rounded-2xl text-right leading-relaxed transition-all duration-200 ">
          <p className="text-sm font-semibold text-blue-500    ">
            userName
          </p>
          <p className="text-[15px] text-gray-800 pl-5">{Message}</p>
          <p className="text-xs text-gray-500 text-left mt-1">6:40</p>
        </section>
      </div>
    </div>
  );
}
