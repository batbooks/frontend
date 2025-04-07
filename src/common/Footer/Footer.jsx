import React from "react";

function Footer() {
  return (
    <footer
      style={{ direction: "rtl" }}
      className="max-w-screen m-auto bg-[#a3d5ff] flex flex-col pt-[35px] pb-[23px] divide-y divide-[#2F4F4F]/50 px-[80px] shadow-lg shadow-[#000000]/25"
    >
      <div className="flex pb-[57.5px] gap-[10px]">
        <div className="flex grow-677 justify-between gap-[10px]">
          <div className="space-y-2.5">
            <h1 className="text-[16px] text-[#265073] font-bold">
              شرکت BatBooks
            </h1>
            <ul className="space-y-2.5">
              <li>
                <a
                  className="text-[14px] text-[#000000] font-[400]"
                  href="#about_us"
                >
                  درباره ما
                </a>
              </li>
              <li>
                <a
                  className="text-[14px] text-[#000000] font-[400]"
                  href="#rules"
                >
                  قوانین و مقررات
                </a>
              </li>
              <li>
                <a
                  className="text-[14px] text-[#000000] font-[400]"
                  href="#suggestions"
                >
                  پیشنهادات و انتقادات
                </a>
              </li>
              <li>
                <a
                  className="text-[14px] text-[#000000] font-[400]"
                  href="#FAQ"
                >
                  پرسش های متداول
                </a>
              </li>
              <li>
                <a
                  className="text-[14px] text-[#000000] font-[400]"
                  href="#contact_us"
                >
                  ارتباط با ما
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-2.5">
            <h1 className="text-[16px] text-[#265073] font-bold">
              همکاری با ما
            </h1>
            <ul className="space-y-2.5">
              <li>
                <a
                  className="text-[14px] text-[#000000] font-[400]"
                  href="#contact_creature"
                >
                  ارتباط با ناشران و چاپ اثر
                </a>
              </li>
              <li>
                <a className="text-[14px] text-[#000000] font-[400]">
                  ما را در شبکه های اجتماعی
                </a>
                <br />
                <a className="text-[14px] text-[#000000] font-[400]">
                  به دیگران معرفی کنید...
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-2.5">
            <h1 className="text-[16px] font-bold text-[#265073]">
              مسیرهای ارتباطی
            </h1>
            <ul className="space-y-2.5">
              <li>
                <span className="text-[14px] text-[#000000] font-[400]">
                  تلفن ثابت: 53227747 - (021)
                </span>
              </li>
              <li>
                <span className="text-[14px] text-[#000000] font-[400]">
                  آدرس ایمیل: Email.iust.ac.ir
                </span>
              </li>
              <li>
                <span className="text-[14px] text-[#000000] font-[400]">
                  نشانی: تهران، میدان رسالت،
                </span>
                <br />
                <span className="text-[14px] text-[#000000] font-[400]">
                  دانشگاه علم و صنعت ایران
                </span>
                <br />
                <span className="text-[14px] text-[#000000] font-[400]">
                  خیابان هنگام، خیابان دانشگاه،{" "}
                </span>
              </li>
              <li className="flex gap-[15px] mt-[7px]">
                <button className=" w-[25.65px] h-[25.65px] cursor-pointer ">
                  <img
                    src="/images/whatsapp-logo.svg"
                    alt="whatsapp"
                    className="m-auto"
                  ></img>
                </button>
                <button className=" w-[25.65px] h-[25.65px] cursor-pointer">
                  <img
                    src="/images/telegram-logo.svg"
                    alt="telegram"
                    className="m-auto"
                  ></img>
                </button>
                <button className=" w-[25.65px] h-[25.65px] cursor-pointer">
                  <img
                    src="/images/instagram_logo.svg"
                    alt="instagram"
                    className="m-auto"
                  ></img>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-[39px] grow-603 ml-[57px] ">
          <h1 className="mr-auto text-[32px] font-[700] text-[#000000] ml-[90px]">
            BatBooks
          </h1>
          <div className="flex mr-auto gap-[22px] ">
            <button className="flex bg-[#001F54] rounded-[12px] text-[#ffffff] gap-[18px] pr-[23px] pl-[15px] min-w-[150px] py-[7px] cursor-pointer">
              <div className="flex flex-col m-auto">
                <span className="text-[10px] mb-[-7px] font-[300] uppercase">
                  get it on
                </span>
                <span className="text-[20px] font-[400]">myket</span>
              </div>
              <img
                className="w-[30px] h-[30px] my-auto"
                src="/images/myket.png"
                alt="myket"
              />
            </button>
            <button className="flex bg-[#001F54] rounded-[12px] text-[#ffffff] gap-[18px] pr-[23px] pl-[15px] min-w-[150px] py-[7px] cursor-pointer">
              <div className="flex flex-col m-auto">
                <span className="text-[10px] mb-[-7px] uppercase font-[300]">
                  get it on
                </span>
                <span className="text-[20px] font-[400]">Bazzar</span>
              </div>
              <img
                className="w-[30px] h-[30px] my-auto"
                src="/images/bazzar.png"
                alt="bazzar"
              />
            </button>
          </div>
        </div>
      </div>
      <p className="text-[12px] m-auto font-[300] mt-[40.5px]">
        Copyright © 73b4 - m485 BatBooks. All rights reserved
      </p>
    </footer>
  );
}

export default Footer;
