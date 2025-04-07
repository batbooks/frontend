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
        className="flex flex-col max-w-screen m-auto bg-[#d9f0ff] px-[80px] pb-[107px] pt-[13px] shadow-2xl shadow-[#000000]-25 items-center overflow-hidden"
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

        <div className="ml-auto flex bg-[#A4C0ED] rounded-[35px] shadow-lg shadow-[#000000]/25 mb-[40px] pl-[52px] pb-[52px] pr-[23px] pt-[20px] gap-[39px] border-[2px] border-[#000000]/8 w-full">
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
              جنسیت ذکر نشده
            </span>
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
              <h5 className="text-[16px] font-[300] mb-1">درباره من:</h5>
              <p className="text-[#000000]/70 text-[14px] font-[300]">
                این متن صرفا جهت تست میباشد...
                <br />
                این متن صرفا جهت تست میباشد...
                <br />
                این متن صرفا جهت تست میباشد...
                <br />
                این متن صرفا جهت تست میباشد...
                <br />
                این متن صرفا جهت تست میباشد...
                <br />
                این متن صرفا جهت تست میباشد...
              </p>
            </div>
          </div>

          <div className="rounded-[20px] w-[242px] h-[368px] mt-[32px] mr-auto shadow-lg shadow-[#000000]/25">
            <BookCard
              title="تست"
              author="تست"
              coverImage={"/src/assets/images/book_sample.png"}
              description="این متن صرفا جهت تست است..."
              chapters={85}
            />
          </div>
        </div>

        <h5 className="text-[24px] font-[400] text-[#265073] ml-auto mb-[25px]">
          کتاب های موردعلاقه
        </h5>

        <div className="ml-auto mb-[46px]">
          <button className="absolute rounded-full bg-[#000000] z-2 mt-[107px] mr-[1280px] cursor-pointer">
            <img src="/src/assets/images/slider.svg" alt="slider"></img>
          </button>
          <div className="flex gap-[25px] z-1">
            <div className="w-[180px] h-[254px]">
              <BookCard
                title="تست"
                author="تست"
                coverImage={"/src/assets/images/book_sample.png"}
                description="این متن صرفا جهت تست است..."
                chapters={85}
              />
            </div>
            <div className="w-[180px] h-[254px]">
              <BookCard
                title="test"
                author="test"
                coverImage="/src/assets/images/book_sample2.png"
                description="lkdf  fseklmgd dflbcmkfrd   srvzgjirkl"
                chapters={85}
              />
            </div>
            <div className="w-[180px] h-[254px]">
              <BookCard
                title="test"
                author="test"
                coverImage="/src/assets/images/book_sample3.png"
                description="xklcm"
                chapters={85}
              />
            </div>
            <div className="w-[180px] h-[254px]">
              <BookCard
                title="test"
                author="test"
                coverImage="/src/assets/images/book_sample4.png"
                description="djfxn"
                chapters={85}
              />
            </div>
            <div className="w-[180px] h-[254px]">
              <BookCard
                title="test"
                author="test"
                coverImage="/src/assets/images/book_sample5.png"
                description="test"
                chapters={85}
              />
            </div>
            <div className="w-[180px] h-[254px]">
              <BookCard
                title="test"
                author="test"
                coverImage="/src/assets/images/book_sample6.png"
                description="tsfxsdj"
                chapters={85}
              />
            </div>
            <div className="w-[180px] h-[254px]">
              <BookCard
                title="test"
                author="test"
                coverImage="/src/assets/images/book_sample6.png"
                description="sefnk"
                chapters={85}
              />
            </div>
          </div>
        </div>

        <h6 className="text-[24px] font-[400] text-[#265073] ml-auto mb-[25px]">
          کتاب های تالیف شده
        </h6>

        <div className="ml-auto">
          <button className="absolute rounded-full bg-[#000000] z-2 mt-[107px] mr-[1280px] cursor-pointer">
            <img src="/src/assets/images/slider.svg" alt="slider"></img>
          </button>
          <div className="flex gap-[25px] z-1">
            <div className="w-[180px] h-[254px]">
              <BookCard
                title="تست"
                author="تست"
                coverImage="/src/assets/images/book_sample.png"
                description="این متن صرفا جهت تست میباشد..."
                chapters={85}
              />
            </div>
            <div className="w-[180px] h-[254px]">
              <BookCard
                title="test"
                author="test"
                coverImage="/src/assets/images/book_sample2.png"
                description="jxdfvnd  fseklmgd dflbcmkfrd   srvzgjirkl"
                chapters={85}
              />
            </div>
            <div className="w-[180px] h-[254px]">
              <BookCard
                title="test"
                author="test"
                coverImage="/src/assets/images/book_sample3.png"
                description="test"
                chapters={85}
              />
            </div>
            <div className="w-[180px] h-[254px]">
              <BookCard
                title="test"
                author="test"
                coverImage="/src/assets/images/book_sample4.png"
                description="setgjnkd"
                chapters={85}
              />
            </div>
            <div className="w-[180px] h-[254px]">
              <BookCard
                title="test"
                author="test"
                coverImage="/src/assets/images/book_sample5.png"
                description="tesset"
                chapters={85}
              />
            </div>
            <div className="w-[180px] h-[254px]">
              <BookCard
                title="test"
                author="test"
                coverImage="/src/assets/images/book_sample6.png"
                description="tsesexgdf"
                chapters={85}
              />
            </div>
            <div className="w-[180px] h-[254px]">
              <BookCard
                title="test"
                author="test"
                coverImage="/src/assets/images/book_sample6.png"
                description="settg"
                chapters={85}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Another_User_Profile;
