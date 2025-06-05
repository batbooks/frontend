import Navbar from "../../pages/Navbar";

import Footer from "../../common/Footer/Footer";
import ReadingGoalCard from "../../common/ReadingGoalCard/readingGoalCard";
import BookCard from "../../common/BookCard/bookCard";

const writtenBooks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const favBooks = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
];

export default function ShowAllBooks({
  bookModel = "another",
  anotherUser = "ممد",
}) {
  return (
    <>
      <Navbar />
      <main
        className={`flex flex-col ${bookModel === "another" ? "px-[50px]" : "pr-[20px] pl-[50px]"} pt-[20px] gap-[15px] items-end`}
      >
        <h1 className="text-[32px] font-[700] text-[#1A365D] mx-auto">
          {bookModel === "written"
            ? "تالیف شده توسط من"
            : bookModel === "fav"
              ? "کتاب های موردعلاقه من"
              : bookModel === "another"
                ? `تالیف شده توسط ${anotherUser}`
                : null}
        </h1>
        <div className="flex gap-[30px] w-full">
          <div className="flex flex-col gap-[25px] grow-1">
            <h2 className="text-[16px] font-[700] ml-auto text-[#1A365D]">
              {bookModel === "written" || bookModel === "another"
                ? "همه کتاب های تالیف شده"
                : bookModel === "fav"
                  ? "همه کتاب های موردعلاقه"
                  : null}
            </h2>
            {bookModel === "written" ? (
              <div className="w-full grid grid-cols-2 gap-x-[42px] gap-y-[26px]">
                {writtenBooks.map((i) => (
                  <WrittenBook
                    coverImage={`/images/book_sample${(i % 8) + 1}.png`}
                    bookName={"نام کتاب"}
                    chaptersNum={85}
                    key={i}
                  />
                ))}
              </div>
            ) : bookModel === "fav" || bookModel === "another" ? (
              <div
                dir="rtl"
                className={`w-full grid ${bookModel === "fav" ? "grid-cols-5" : "grid-cols-6"} gap-x-[40px] gap-y-[60px]`}
              >
                {favBooks.map((i) => (
                  <div className="w-[180px] h-[254px]">
                    <BookCard
                      title={"نام کتاب"}
                      author={"نام نویسنده"}
                      chapters={85}
                      description={
                        "این متن صرفا جهت تست میباشد...این متن صرفا جهت تست میباشد...این متن صرفا جهت تست میباشد...این متن صرفا جهت تست میباشد..."
                      }
                      coverImage={`/images/book_sample${(i % 8) + 1}.png`}
                      children={
                        bookModel === "fav" ? (
                          <button className="absolute rounded-full cursor-pointer grid h-[30px] w-[30px] left-[5px] top-[5px] hover:bg-[#E5E5E5]/40 transition-colors duration-400 active:bg-[#E5E5E5]/90 active:duration-100">
                            <span className="text-[30px] translate-y-[-3px] text-white">
                              &times;
                            </span>
                          </button>
                        ) : null
                      }
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          {bookModel === "written" || bookModel === "fav" ? (
            <div className="sticky !w-[300px] !h-[695px] !grow-0">
              <ReadingGoalCard />
            </div>
          ) : null}
        </div>
      </main>
      <div className="mt-[-20px]">
        <Footer />
      </div>
    </>
  );
}

function WrittenBook({ coverImage, bookName, chaptersNum }) {
  return (
    <div
      dir="rtl"
      className="bg-[#A4C0ED] rounded-[25px] flex py-[15px] pr-[18px] pl-[18px] border-[2px] border-[#000000]/8 justify-between items-center gap-[26px]"
    >
      <div className="flex gap-[15px] items-center">
        <img
          src={coverImage}
          alt="book"
          className="w-[127px] h-[156px] rounded-[20px]"
        />
        <div className="flex flex-col gap-[5px]">
          <h3 className="text-[24px] font-[400]">{bookName}</h3>
          <span className="text-[14px] text-nowrap font-[400]">
            {chaptersNum}فصل نوشته شده است
          </span>
        </div>
      </div>
      <button className="btn !w-fit !h-fit !mb-0 !mr-0 !ml-0 !rounded-[10px]">
        <span className="span-btn !py-[6px] !px-[32px] !text-nowrap !text-[15px] !font-[300]">
          ادامه تالیف
        </span>
      </button>
    </div>
  );
}
