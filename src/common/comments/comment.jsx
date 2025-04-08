import { Rating } from "@mui/material";

export default function Comment() {
  return (
    <div dir="rtl" className="pt-[60px] px-[72.5px] pb-[119px]">
      <img
        src="/src/assets/images/readers_reviews.png"
        alt="readersreviews"
        className="w-[209px] h-[53px]"
      />
      <div className="flex flex-col gap-[41px]">
        {Array.from({ length: 4 }, (_, i) => i).map((i) => (
          <Commentt user_image={"/src/assets/images/user-image1.png"} />
        ))}
      </div>
      <button className="pl-[16px] pr-[235px] py-[8px] rounded-full bg-[#2663CD] mx-auto shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto">
        <img
          src="/src/assets/images/arrow-right.png"
          alt="arrowright"
          className="w-[21px] h-[21px]"
        />
      </button>
    </div>
  );
}

function Commentt({ user_image }) {
  return (
    <div className="w-[186px] flex">
      <div className="flex flex-col items-center">
        <div className="flex">
          <img
            src={user_image}
            alt="user1"
            className="rounded-full mb-[9px] "
          />
          <span className="absolute mt-[13px] mr-[98px]">نام کاربری</span>
        </div>
        <Rating
          dir="ltr"
          size="small"
          precision={1}
          defaultValue={4}
          readOnly
          className="mb-[17px]"
        />
        <button className="text-[#ffffff] text-[14px] font-[400] py-[5px] px-[38px] rounded-full bg-[#2663CD] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto">
          دنبال کردن
        </button>
      </div>
      <div></div>
    </div>
  );
}
