export default function EditProfile() {
  return (
    <div
      dir="rtl"
      className="relative m-auto w-[806px] h-[856px] rounded-[36px] bg-[#A4C0ED] shadow-lg shadow-[#000000]/25 border-[2px] border-[#000000]/21 px-[69.4px] pt-[49px] pb-[84px]"
    >
      <img
        className="absolute w-[420px] h-[594px] bottom-0 left-0 ml-[10.2px]"
        src="/src/assets/images/mid_left.png"
        alt="midleft"
      />
      <div>
        <h1 className="text-[24px] font-[700] text-[#1A365D] mb-[43.4px]">
          ویرایش پروفایل
        </h1>

        <div className="flex gap-[36px] mb-[27.6]">
          <div className="flex flex-col">
            <label className="text-[#000000]/70 text-[16.8px] font-[400] mb-[0.2px]">
              نام کاربری
            </label>
            <input className="bg-[#ffffff] w-[315.6px] h-[52.8px] rounded-[12px] px-[25.6px] outline-[2px] outline-[#000000]/21"></input>
          </div>
          <div className="flex flex-col">
            <label className="text-[#000000]/70 text-[16.8px] font-[400] mb-[0.2px]">
              جنسیت
            </label>
            <div className="flex bg-[#ffffff] w-[315.6px] h-[52.8px] rounded-[12px] pl-[25.6px] pr-[20.6px] text-[#000000]/50 hover:cursor-pointer outline-[2px] outline-[#000000]/21 focus:outline-none">
              <div className="flex items-center">
                <img
                  src="/images/arrow.png"
                  alt="arrow"
                  className="w-[24px] h-[24px]"
                ></img>
                <span>--انتخاب کنید--</span>
              </div>
            </div>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
}
