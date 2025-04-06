import Footer from "/src/common/Footer/footer";
import Navbar from "/src/common/Navbar/navbar";
import { Rating } from "@mui/material";

export default function Profile() {
  return (
    <>
      <Navbar hasLogined={true} />
      <main
        style={{ direction: "rtl" }}
        className="flex flex-col max-w-screen m-auto bg-[#d9f0ff] px-[80px] pb-[90px] pt-[13px] shadow-2xl shadow-[#000000]-25"
      >
        <div className="flex justify-between">
          <button className="flex gap-[15px] bg-[#2663cd] text-[#ffffff] items-center rounded-[46px] py-[8px] px-[18px] mt-[15px] mb-[24px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto">
            <img
              className="w-[22px] h-[22px]"
              src="/src/assets/images/edit_sign.png"
              alt="edit"
            />
            <span className="font-[400]">ویرایش پروفایل</span>
          </button>
          <h1 className="text-[#265073] text-[32px] font-[700] ">
            پروفایل کاربری
          </h1>
          <button className="bg-[#2663cd] font-[400] text-[#ffffff] items-center rounded-[46px] px-[32px] py-[8px] mt-[15px] mb-[24px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto">
            خروج از حساب کاربری
          </button>
        </div>

        <div className="flex bg-[#A4C0ED] rounded-[35px] shadow-lg shadow-[#000000]/25 mb-[40px] pl-[52px] pb-[52px] pr-[23px] pt-[20px] gap-[39px] border-[2px] border-[#000000]/8">
          <div>
            <img
              className="w-[236px] h-[267px] shadow-lg shadow-[#000000]/25 rounded-[30px]"
              src="/src/assets/images/user_image.png"
              alt="userimage"
            />
            <h2 className="text-[24px] text-[#000000] font-[400] mt-[8px] mb-[12px]">
              جزئیات
            </h2>
            <span className="text-[16px] text-[#000000] font-[300]">
              جنسیت ذکر نشده، شهر
            </span>
            <div className="mt-[12px] flex gap-[7.5px] items-center">
              <img
                className="w-[25px] h-[25px]"
                src="/src/assets/images/gift_sign.png"
                alt="gift"
              />
              <div>
                <sapn className="text-[16px] font-[400]">روز تولد: </sapn>
                <span className="text-[16px] font-[300]">روز/ماه/سال</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[24px] font-[300] mt-[8px] mb-[26px]">
              نام کاربری
            </h3>

            <div className="flex gap-[20px] mb-[19px]">
              <button className="flex flex-col bg-[#ffffff] px-[36px] py-[5.5px] rounded-[10px] shadow-lg shadow-[#000000]/25 focus:shadow-none focus:bg-[#2663cd]/90 hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:outline-none disabled:bg-[#2663cd] disabled:cursor-auto disabled:shadow-none">
                <span className="text-[24px] font-[600] text-[#265073] mb-[-5px]">
                  100
                </span>
                <span className="font-[400] text-[#000000]/70 text-[14px]">
                  کتاب موردعلاقه
                </span>
              </button>
              <button className="flex flex-col bg-[#ffffff] px-[36px] py-[5.5px] rounded-[10px] shadow-lg shadow-[#000000]/25 focus:shadow-none focus:bg-[#2663cd]/90 hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:outline-none disabled:bg-[#2663cd] disabled:cursor-auto disabled:shadow-none">
                <span className="text-[24px] font-[600] text-[#265073] mb-[-5px]">
                  10
                </span>
                <span className="font-[400] text-[#000000]/70 text-[14px]">
                  کتاب تالیف شده
                </span>
              </button>
              <button className="flex flex-col bg-[#ffffff] px-[36px] py-[5.5px] rounded-[10px] shadow-lg shadow-[#000000]/25 focus:shadow-none focus:bg-[#2663cd]/90 hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:outline-none disabled:bg-[#2663cd] disabled:cursor-auto disabled:shadow-none">
                <span className="text-[24px] font-[600] text-[#265073] mb-[-5px]">
                  8
                </span>
                <span className="font-[400] text-[#000000]/70 text-[14px]">
                  نفر دنبال شده
                </span>
              </button>
            </div>

            <div>
              <h3 className="text-[24px] text-[#000000] font-[400]">جزئیات:</h3>
              <p className="text-[16px] font-[300] mb-[18px]">
                ملحق شده در روز/ماه/سال
              </p>
              <h4 className="text-[16px] font-[300]">ژانرهای موردعلاقه:</h4>
              <p className="text-[#000000]/70 text-[14px] font-[300] mb-[18px]">
                علمی-تخیلی، رمان(داستانی)، معمایی
              </p>
              <h5 className="text-[16px] font-[300] mb-1">درباره من:</h5>
              <p className="text-[#000000]/70 text-[14px] font-[300]">
                این متن صرفا جهت تست میباشد...
              </p>
              <p className="text-[#000000]/70 text-[14px] font-[300]">
                این متن صرفا جهت تست میباشد...
              </p>
            </div>
          </div>

          <div className="bg-[#ffffff] rounded-[20px] px-[17px] pt-[41px] pb-[28px] mt-[32px] mr-auto shadow-lg shadow-[#000000]/25">
            <img
              src="/src/assets/images/favorite_book.png"
              alt="favoritebook"
            />
          </div>
        </div>

        <div>
          <h6 className="text-[24px] font-[400] text-[#265073] mb-[25px]">
            اخیرا مطالعه میکرده ام...
          </h6>
          <div className="flex py-[26px] pr-[26px] pl-[41px] bg-[#a4c0ed] rounded-[25px] mb-[46px] items-center border-[2px] border-[#000000]/8 justify-between">
            <div className="flex">
              <img
                className="shadow-lg shadow-[#000000]/25 rounded-[20px] w-[153px] h-[189px]"
                src="/src/assets/images/book_sample.png"
                alt="book"
              ></img>
              <div className="flex flex-col mr-[26px] mt-[27px]">
                <h6 className="text-[32px] font-[400] mb-[5px]">نام کتاب</h6>
                <p className="mb-[5px] text-[20px] font-[400]">نام نویسنده</p>
                <Rating
                  style={{ direction: "ltr" }}
                  name="half-rating-read"
                  defaultValue={4.5}
                  precision={0.5}
                  readOnly
                />
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-[538px] h-[21px] bg-[#ffffff] rounded-[30px] shadow-lg shadow-[#000000]/25">
                <div className="w-[83%] h-[100%] bg-[#26A541] rounded-[30px] shadow-lg shadow-[#000000]/25"></div>
              </div>
              <p className="text-[16px] font-[400] mr-3">83%</p>
            </div>
            <button className="bg-[#2663CD] rounded-[10px] text-[#ffffff] text-[16px] font-[400] py-[9px] px-[32px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto">
              ادامه دادن
            </button>
          </div>
        </div>

        <div>
          <h6 className="text-[24px] font-[400] text-[#265073] mb-[25px]">
            در حال تالیف هستم...
          </h6>
          <div className="flex gap-[42px] items-center">
            <div className="bg-[#a4c0ed] py-[22px] pr-[27px] pl-[41px] flex rounded-[25px] border-[2px] border-[#000000]/8 items-center gap-[152px] grow-1">
              <div className="flex items-center gap-[26px]">
                <img
                  className="w-[127px] h-[156px] shadow-lg shadow-[#000000]/25 rounded-[20px]"
                  src="/src/assets/images/book_sample.png"
                  alt="book"
                ></img>
                <div className="flex flex-col gap-[5px] m-auto">
                  <h6 className="text-[32px] font-[400]">نام کتاب</h6>
                  <span className="text-[20px] font-[400]">فصل فلان ام</span>
                </div>
              </div>
              <button className="bg-[#2663CD] rounded-[10px] text-[#ffffff] text-[16px] font-[400] py-[5.5px] px-[32px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto">
                ادامه دادن
              </button>
            </div>
            <div className="bg-[#a4c0ed] py-[22px] pr-[27px] pl-[41px] flex rounded-[25px] border-[2px] border-[#000000]/8 items-center gap-[152px] grow-1">
              <div className="flex items-center gap-[26px]">
                <img
                  className="w-[127px] h-[156px] shadow-lg shadow-[#000000]/25 rounded-[20px]"
                  src="/src/assets/images/book_sample.png"
                  alt="book"
                ></img>
                <div className="flex flex-col gap-[5px] m-auto">
                  <h6 className="text-[32px] font-[400]">نام کتاب</h6>
                  <span className="text-[20px] font-[400]">فصل فلان ام</span>
                </div>
              </div>
              <button className="bg-[#2663CD] rounded-[10px] text-[#ffffff] text-[16px] font-[400] py-[5.5px] px-[32px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto">
                ادامه دادن
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
