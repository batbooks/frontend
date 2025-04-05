import { useState } from "react";
import Footer from "/src/common/Footer/footer";
import Navbar from "/src/common/Navbar/navbar";
import BookCard from "../../../common/BookCard/bookCard";

function Another_User_Profile() {
  const [following, setFollowing] = useState(true);

  return (
    <>
      <Navbar />
      <main
        style={{ direction: "rtl" }}
        className="flex flex-col font-[Vazir] max-w-[1440px] m-auto bg-[#d9f0ff] pr-[80px] pb-[107px] pt-[13px] shadow-2xl shadow-[#000000]-25 items-center"
      >
        <button
          className="bg-[#2663cd] text-[#ffffff] items-center rounded-[46px] py-[8px] px-[18px] mt-[15px] mb-[24px] ml-auto shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto"
          onClick={() => setFollowing(!following)}
        >
          {following ? (
            <span className="font-[400] text-[16px]">دنبال کردن</span>
          ) : (
            <span className="font-[400] text-[16px]">دنبال نکردن</span>
          )}
        </button>
        <h1 className="text-[#265073] text-[32px] font-[700] mx-auto absolute">
          پروفایل کاربری
        </h1>

        <div className="ml-auto flex bg-[#A4C0ED] rounded-[35px] shadow-lg shadow-[#000000]/25 mb-[40px] pl-[52px] pb-[52px] pr-[23px] pt-[20px] gap-[39px] min-w-[1280px] border-[2px] border-[#000000]/8">
          <div>
            <img
              className="w-[236px] h-[267px] shadow-lg shadow-[#000000]/25 rounded-[30px]"
              src="/photos/user_image.png"
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
                src="/photos/gift_sign.png"
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
            <img src="/photos/favorite_book.png" alt="favoritebook" />
          </div>
        </div>

        <h5 className="text-[24px] font-[400] text-[#265073] ml-auto mb-[25px]">
          کتاب های موردعلاقه
        </h5>

        <div className="ml-auto mb-[46px]">
          <button className="absolute rounded-full bg-[#000000] z-2 mt-[107px] mr-[1280px] cursor-pointer">
            <img src="/photos/slider.svg" alt="slider"></img>
          </button>
          <div className="flex gap-[25px] z-1 carousel-items">
            <BookCard
              title="کیر"
              author="عمو جانی"
              coverImage="/photos/book_sample.png"
              description="کون کص صصصصصصصصص کیر رررررررررررررررررررررررررررررررررررررررر"
              chapters={85}
            />
            <BookCard
              title="kir"
              author="amoo johny"
              coverImage="/photos/book_sample2.png"
              description="koon  fseklmgd dflbcmkfrd   srvzgjirkl"
              chapters={85}
            />
            <BookCard
              title="kir"
              author="amoo johny"
              coverImage="/photos/book_sample3.png"
              description="koon"
              chapters={85}
            />
            <BookCard
              title="kir"
              author="amoo johny"
              coverImage="/photos/book_sample4.png"
              description="koon"
              chapters={85}
            />
            <BookCard
              title="kir"
              author="amoo johny"
              coverImage="/photos/book_sample5.png"
              description="koon"
              chapters={85}
            />
            <BookCard
              title="kir"
              author="amoo johny"
              coverImage="/photos/book_sample6.png"
              description="koon"
              chapters={85}
            />
            <BookCard
              title="kir"
              author="amoo johny"
              coverImage="/photos/book_sample6.png"
              description="koon"
              chapters={85}
            />
          </div>
        </div>

        <h6 className="text-[24px] font-[400] text-[#265073] ml-auto mb-[25px]">
          کتاب های تالیف شده
        </h6>

        <div className="ml-auto">
          <button className="absolute rounded-full bg-[#000000] z-2 mt-[107px] mr-[1280px] cursor-pointer">
            <img src="/photos/slider.svg" alt="slider"></img>
          </button>
          <div className="flex gap-[25px] z-1">
            <BookCard
              title="کیر"
              author="عمو جانی"
              coverImage="/photos/book_sample.png"
              description="کون کص صصصصصصصصص کیر رررررررررررررررررررررررررررررررررررررررر"
              chapters={85}
            />
            <BookCard
              title="kir"
              author="amoo johny"
              coverImage="/photos/book_sample2.png"
              description="koon  fseklmgd dflbcmkfrd   srvzgjirkl"
              chapters={85}
            />
            <BookCard
              title="kir"
              author="amoo johny"
              coverImage="/photos/book_sample3.png"
              description="koon"
              chapters={85}
            />
            <BookCard
              title="kir"
              author="amoo johny"
              coverImage="/photos/book_sample4.png"
              description="koon"
              chapters={85}
            />
            <BookCard
              title="kir"
              author="amoo johny"
              coverImage="/photos/book_sample5.png"
              description="koon"
              chapters={85}
            />
            <BookCard
              title="kir"
              author="amoo johny"
              coverImage="/photos/book_sample6.png"
              description="koon"
              chapters={85}
            />
            <BookCard
              title="kir"
              author="amoo johny"
              coverImage="/photos/book_sample6.png"
              description="koon"
              chapters={85}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Another_User_Profile;
