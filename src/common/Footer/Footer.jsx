import React from "react";
import emailIcon from "../../assets/images/email.svg";
import locationIcon from "../../assets/images/Location-icon.svg";
import phoneIcon from "../../assets/images/phone.svg";
import { useState } from "react";
import Popup from "./PopUp";
import parse from "html-react-parser";

function Footer() {
  const [popupContent, setPopupContent] = useState(null);
  const handleItemClick = (content) => {
    setPopupContent(content);
  };

  const closePopup = () => {
    setPopupContent(null);
  };

  return (
    <footer
      dir="rtl"
      className="max-w-screen m-auto mt-15 bg-[#a3d5ff] flex flex-col pt-[55px] pb-[30px] divide-y divide-[#2F4F4F]/50 px-[80px] shadow-lg shadow-[#000000]/25"
    >
      <div className="flex pb-[20px] gap-[100px]">
        <div className="flex grow-677 justify-between gap-[100px]">
          <div className="space-y-2.5">
            <h1 className="text-base text-[#265073] font-bold">
              شرکت BatBooks
            </h1>
            <ul className="space-y-2.5">
              <li>
                <button
                  className="text-sm"
                  onClick={() =>
                    handleItemClick(
                      <div
                        dir="rtl"
                        class="text-right text-gray-800 leading-7 space-y-4 pr-2"
                      >
                        <h2 class="text-2xl font-bold text-blue-900 border-b pb-2 mb-4">
                          درباره ما
                        </h2>

                        <p class="text-sm md:text-base">
                          شرکت{" "}
                          <span class="font-semibold text-blue-700">
                            BatBooks
                          </span>{" "}
                          از پیشتازان نوظهور صنعت کتاب و کتاب‌خوانی است. با توجه
                          به سرانه مطالعاتی پایین کشور، هدف ما کمک به بهبود این
                          وضعیت و در اختیار گذاشتن محتوای{" "}
                          <span class="font-medium text-green-700">
                            رایگان و نامحدود
                          </span>{" "}
                          برای جوانان و نوجوانان این مرز و بوم است.
                        </p>

                        <p class="text-sm md:text-base">
                          با ما همراه باشید تا با خواندن کتاب، علاوه بر بالا
                          بردن معلومات، سرگرمی خوبی داشته باشید و اوقات خوشی را
                          سپری کنید.
                        </p>

                        <p class="text-sm md:text-base font-semibold text-blue-800">
                          پیش به‌سوی ایرانی داناتر...
                        </p>
                      </div>
                    )
                  }
                >
                  درباره ما
                </button>
              </li>
              <li>
                <button
                  className="text-sm"
                  onClick={() =>
                    handleItemClick(
                      <div
                        dir="rtl"
                        class="text-right text-gray-800 leading-7 max-h-[400px] overflow-y-auto pr-2 space-y-4"
                      >
                        <h2 class="text-2xl font-bold text-blue-900 mb-4">
                          قوانین و مقررات
                        </h2>

                        <p>
                          شرکت <strong>BatBooks</strong> ضمن خوش آمدگويي به شما
                          عزيزان، آرزومند است محيطي صميمي را براي ارتقا سطح دانش
                          شما كاربران گرامي فراهم كند...
                        </p>

                        <p>
                          به اميد داشتن لحظاتي پر از موفقيت براي شما،‌ قوانين
                          سایت به حضور اعلام مي‌گردد:
                        </p>

                        <ol class="list-decimal space-y-3 pr-5 text-sm md:text-base text-gray-700">
                          <li>
                            کلیه حقوق مادی و معنوی سایت محفوظ بوده و متعلق به
                            شرکت BatBooks می‌باشد. هرگونه کپی‌برداری ممنوع و
                            پیگرد قانونی دارد.
                          </li>
                          <li>
                            کتاب‌هایی که در بازار به‌صورت غیررایگان فروخته
                            می‌شوند، نباید در سایت منتشر شوند. نقض این قانون
                            باعث مسدود شدن حساب خواهد شد.
                          </li>
                          <li>
                            در پاسخ به پرسش‌ها از تمسخر یا به‌کارگیری عبارات
                            دلسردکننده خودداری فرمایید. احترام در گفتگو شرط اول
                            است.
                          </li>
                          <li>
                            از انحراف موضوعات در تالار گفتگو بپرهیزید. در صورت
                            مشاهده، پست‌ها حذف و کاربران متخلف جریمه خواهند شد.
                          </li>
                          <li>
                            قبل از ایجاد موضوع جدید در تالار، از طریق گزینه
                            جستجو مطمئن شوید که موضوع تکراری نباشد.
                          </li>
                          <li>
                            هرگونه اظهار نظر در مورد مسائل سیاسی، مذهبی، یا
                            گرایش‌های جنسی ممنوع بوده و تخلف محسوب می‌شود.
                          </li>
                          <li>
                            بی‌احترامی به مدیران، کاربران و اشخاص حقیقی یا حقوقی
                            ممنوع است. متخلفین جریمه خواهند شد.
                          </li>
                          <li>
                            کاربران مجاز به اظهار نظر درباره جریمه دیگر کاربران
                            نیستند. مدیریت اختیار کامل دارد.
                          </li>
                        </ol>

                        <p class="bg-yellow-50 border-r-4 border-yellow-400 p-3 rounded-md text-yellow-800">
                          <strong>اخطار:</strong> در صورت عدم رعایت هرکدام از
                          قوانین، مدیران مجاز به اعمال محدودیت یا توقیف حساب
                          کاربری خواهند بود.
                        </p>

                        <p class="bg-blue-50 border-r-4 border-blue-400 p-3 rounded-md text-blue-800">
                          <strong>نکته:</strong> حق تغییر قوانین برای مدیریت
                          محفوظ بوده و کاربران موظف به رعایت قوانین جدید هستند.
                        </p>

                        <p class="text-sm text-gray-600">
                          با آرزوی موفقیت و بهروزی برای شما کاربران گرامی
                          <br />
                          تیم مدیریت سایت BatBooks
                        </p>
                      </div>
                    )
                  }
                >
                  قوانین و مقررات
                </button>
              </li>
              <li>
                <button className="text-sm">پیشنهادات و انتقادات</button>
              </li>
              <li>
                <button
                  className="text-sm"
                  onClick={() =>
                    handleItemClick(
                      <div
                        dir="rtl"
                        class="text-right text-gray-800 leading-7 space-y-6 max-h-[400px] overflow-y-auto pr-2"
                      >
                        <h2 class="text-2xl font-bold text-blue-900 border-b pb-2 mb-4">
                          پرسش‌های متداول
                        </h2>

                        <div class="space-y-2">
                          <h3 class="text-lg font-semibold text-blue-800">
                            من یک نویسنده/ناشر هستم. در چه زمینه‌هایی می‌توانم
                            با شما همکاری کنم؟
                          </h3>
                          <p class="text-sm md:text-base">
                            سایت ما بستری‌ست که نویسندگان تازه‌کار و بااستعداد
                            در آن فعالیت کرده و آثار خود را برای جامعه‌ی بزرگی
                            از علاقه‌مندان به کتاب و کتاب‌خوانی معرفی می‌کنند.
                            نویسندگان می‌توانند آثار خود را به مرحله چاپ برسانند
                            یا آن را برای دریافت بازخورد کاربران منتشر کنند.
                            ناشران نیز برای ارزیابی آثار و آگاهی بهتر از سطح
                            نویسندگان، به سایت ما مراجعه کرده و با مشاهده
                            امتیازدهی و نظرات نوشته شده درباره آثار آن نویسنده،
                            اقدام می‌کنند. ناشران علاقه‌مند به چاپ کتاب‌های خود
                            نیز می‌توانند از طریق ارتباط با ما، درخواست خود را
                            ثبت کنند و ما این درخواست را به ناشران معتبر و مورد
                            اعتماد خود انتقال داده و نتیجه را از طریق ایمیل به
                            شما اطلاع رسانی خواهیم کرد.
                          </p>
                        </div>

                        <div class="space-y-2">
                          <h3 class="text-lg font-semibold text-blue-800">
                            چه عواملی احتمال قبولی چاپ آثار نویسنده توسط ناشر را
                            بیشتر می‌کند؟
                          </h3>
                          <p class="text-sm md:text-base">
                            کاری که مدیران سایت در قبال درخواست شما انجام
                            می‌دهند، انتقال درخواست به ناشر به‌همراه نشان دادن
                            آثاری‌ست که توسط نویسنده در سایت تألیف شده و نظرات و
                            امتیازات کاربران را به‌همراه دارد. هرچه تعداد و
                            بازخوردها مثبت‌تر باشد، احتمال قبولی اثر توسط ناشر
                            بیشتر فراهم می‌شود.
                          </p>
                        </div>

                        <div class="space-y-2">
                          <h3 class="text-lg font-semibold text-blue-800">
                            سود شرکت و واسطه‌گری بین نویسنده و ناشر چیست؟
                          </h3>
                          <p class="text-sm md:text-base">
                            ده درصد از مبلغ قرارداد ناشر و نویسنده بابت خدمات
                            این سایت و برای معرفی و دیده شدن نویسندگان تازه‌کار،
                            توانایی ارزیابی نویسندگان از طریق نظرات و امتیازات
                            آثارشان توسط ناشران و نیز ارتباط دادن نویسنده و ناشر
                            به شرکت تعلق می‌گیرد.
                          </p>
                        </div>

                        <div class="space-y-2">
                          <h3 class="text-lg font-semibold text-blue-800">
                            قابلیت‌های دیگر سایت چیست؟
                          </h3>
                          <p class="text-sm md:text-base">
                            خواندن کتاب، به‌اشتراک‌گذاری و فعالیت، بحث و تبادل
                            نظر درباره کتاب‌های خاص در تالار گفتگو، فالو کردن
                            دوستان و دیدن کتاب‌های مورد علاقه‌شان، هدف‌گذاری
                            برای خواندن کتاب به‌طور مستمر.
                          </p>
                        </div>
                      </div>
                    )
                  }
                >
                  پرسش های متداول
                </button>
              </li>
              <li>
                <a className="text-sm" href="#contact_us">
                  ارتباط با ما
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-2.5">
            <h1 className="text-base text-[#265073] font-bold">همکاری با ما</h1>
            <ul className="space-y-2.5">
              <li>
                <a className="text-sm" href="#contact_creature">
                  ارتباط با ناشران و چاپ اثر
                </a>
              </li>
              <li>
                <a className="text-sm">ما را در شبکه های اجتماعی</a>
                <br />
                <a className="text-sm">به دیگران معرفی کنید...</a>
              </li>
              <li className="flex gap-[15px] mt-[7px]">
                <button className=" w-[25px] h-[25px] cursor-pointer ">
                  <img
                    src="/images/whatsapp-logo.svg"
                    alt="whatsapp"
                    className="m-auto"
                    onClick={() =>
                      window.open(
                        "https://chat.whatsapp.com/Hzy3OYlguCR8C8bmfheA8J",
                        "_blank"
                      )
                    }
                  ></img>
                </button>

                <button className=" w-[25px] h-[25px] cursor-pointer">
                  <img
                    src="/images/telegram-logo.svg"
                    alt="telegram"
                    className="m-auto"
                    onClick={() =>
                      window.open("https://t.me/BatBooks_2025", "_blank")
                    }
                  ></img>
                </button>
                <button className=" w-[25px] h-[25px] cursor-pointer">
                  <img
                    src="/images/instagram_logo.svg"
                    alt="instagram"
                    className="m-auto"
                  ></img>
                </button>
              </li>
            </ul>
          </div>
          <div className="space-y-2.5">
            <h1 className="text-base font-bold text-[#265073]">
              مسیرهای ارتباطی
            </h1>
            <ul className="space-y-2.5">
              <li>
                <div className="flex flex-row gap-[3px]">
                  <img src={phoneIcon} className="w-[14px] mb-[2px]" />
                  <span className="text-sm text-black ">
                    : 53227747 - (021)
                  </span>
                </div>
              </li>
              <li>
                <div className="flex flex-row gap-[3px]">
                  <img src={emailIcon} className="w-[14px] mb-[2px]" />
                  <span className="text-sm text-black ">
                    : batbook2025@gmail.com
                  </span>
                </div>
              </li>
              <li>
                <div className="flex flex-row gap-[3px]">
                  <div className="flex flex-col gap-[5px]">
                    <div className="flex flex-row gap-[3px]">
                      <img src={locationIcon} className="w-[14px]" />
                      <span className="text-sm ">: تهران، میدان رسالت،</span>
                    </div>

                    <span className="text-sm mr-[2px]">
                      دانشگاه علم و صنعت ایران،
                    </span>

                    <span className="text-sm mr-[2px]">
                      خیابان هنگام، خیابان دانشگاه
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-[20px] items-center grow-603">
          <img src="/batbooksLogo.png" className="w-[150px]" />
          <h1 className="text-[32px] text-center font-bold text-[#002D54]">
            Bat<span className="text-[#2663CD]">Books</span>
          </h1>
        </div>
      </div>
      <p dir="rtl" className="text-sm text-right mt-[20px]">
        © کلیه حقوق مادی و معنوی سایت برای{" "}
        <span className="font-bold">batbooks</span> محفوظ است.
      </p>
      {popupContent && <Popup message={popupContent} onClose={closePopup} />}
    </footer>
  );
}

export default Footer;
