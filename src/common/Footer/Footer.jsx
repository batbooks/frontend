import React from "react";

function Footer() {
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
                <a className="text-sm" href="#about_us">
                  درباره ما
                </a>
              </li>
              <li>
                <a className="text-sm" href="#rules">
                  قوانین و مقررات
                </a>
              </li>
              <li>
                <a className="text-sm" href="#suggestions">
                  پیشنهادات و انتقادات
                </a>
              </li>
              <li>
                <a className="text-sm" href="#FAQ">
                  پرسش های متداول
                </a>
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
                  <img
                    src="src/assets/images/phone.svg"
                    className="w-[14px] mb-[2px]"
                  />
                  <span className="text-sm text-black ">
                    : 53227747 - (021)
                  </span>
                </div>
              </li>
              <li>
                <div className="flex flex-row gap-[3px]">
                  <img
                    src="src/assets/images/email.svg"
                    className="w-[14px] mb-[2px]"
                  />
                  <span className="text-sm text-black ">
                    : batbook2025@gmail.com
                  </span>
                </div>
              </li>
              <li>
                <div className="flex flex-row gap-[3px]">
                  <div className="flex flex-col gap-[5px]">
                    <div className="flex flex-row gap-[3px]">
                      <img
                        src="src/assets/images/Location-icon.svg"
                        className="w-[14px]"
                      />
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
    </footer>
  );
}

export default Footer;
