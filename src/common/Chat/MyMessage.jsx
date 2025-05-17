export default function MyMessage({
  Message = "پیام تستی سبتنیرزمتیتدیستتدزظرتدنریا ذدستن بدیدتس تندستی ّدتسـِ«أ تنسبِـ« تنس یبتن بستند تسیت بتس یدتبتسد یتب تدسِد بdsf sdf sdf sdf sdf s df sd سب سیب سی بسی بسی بس  یسب  شب سی بسی   سی بسی بسب س  یسب سندستنی بدتنُأ« ـبیتدأت ",
  UserId = 1,
  prevMessage = 0,
}) {
  return (
    <div dir="rtl" className="px-3 mb-2">
      {/* نام کاربری فقط اگر پیام قبلی وجود نداشته باشد */}
      {/* {!prevMessage && (
        <div className="relative group inline-block">
          <p className="text-sm font-semibold text-green-600 mb-1 mr-2 flex items-center gap-1">
           
            من
          </p>
          
        </div>
      )} */}

      <section className="relative shadow-lg max-w-[400px] bg-gradient-to-br from-green-100 to-green-200 px-4 py-2 rounded-2xl text-right leading-relaxed transition-all duration-200 lg:max-w-[500px]">
        <p className="text-sm font-semibold text-[#07c116] mb-1  flex items-center gap-1">
          من
        </p>
        <p className="text-[15px] text-gray-800 pl-5 text-wrap">{Message}</p>
        <p className="text-xs text-gray-500 text-left mt-1">6:40</p>
      </section>
    </div>
  );
}
