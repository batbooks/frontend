import { useState } from "react";

export function SelectMenu() {
  const [selectValue, setSelectValue] = useState("--انتخاب کنید--");
  const [isSelectOpened, setIsSelectOpened] = useState(false);

  return (
    <div className="flex items-center gap-[10px]">
      <h2 className="text-[16px] font-[300]">مرتب سازی براساس</h2>
      <div className="relative">
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsSelectOpened(!isSelectOpened);
          }}
          onBlur={(e) => {
            e.preventDefault();
            setTimeout(() => {
              setIsSelectOpened(false);
            }, 250);
          }}
          className={`z-6 flex bg-[#ffffff] w-[147px] h-[45px] ${isSelectOpened ? "rounded-t-[12px]" : "rounded-[12px] shadow-lg shadow-[#000000]/21"} pl-[25px] pr-[5px] text-[13px] ${selectValue !== "--انتخاب کنید--" ? "text-[#000000]" : "text-[#265073]"} cursor-pointer outline-[2px] outline-[#000000]/21`}
        >
          <div className="flex items-center hover:cursor-pointer z-7 gap-[5px]">
            <img
              src="/images/arrow.png"
              alt="arrow"
              className="w-[24px] h-[24px] z-8"
            ></img>
            <span className="z-8">{selectValue}</span>
          </div>
        </button>
        <ul
          className={`overflow-y-scroll flex flex-col absolute bg-[#ffffff] w-[147px] h-[90px] outline-[2px] outline-[#000000]/21 z-9 divide-y divide-[#2F4F4F]/50 rounded-b-[12px] ${isSelectOpened ? "visible" : "hidden"}`}
        >
          <li className={`min-h-[45px] grow-1 w-full z-10`}>
            <button
              onClick={(e) => {
                e.preventDefault();
                setSelectValue("--انتخاب کنید--");
              }}
              className="z-11 flex text-[15px] text-[#000000]/70 w-full h-full cursor-pointer hover:bg-[#2663cd]/90 hover:cursor-pointer active:outline-none"
            >
              <span className="m-auto text-[#265073] z-12">
                {"--انتخاب کنید--"}
              </span>
            </button>
          </li>
          {["تازه ترین", "محبوب ترین"].map((option, i) => (
            <li className={`min-h-[45px] grow-1 w-full z-10`} key={i}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setSelectValue(`${option}`);
                }}
                className="z-11 flex text-[15px] text-[#000000]/70 w-full h-full cursor-pointer hover:bg-[#2663cd]/90 hover:cursor-pointer active:outline-none"
              >
                <span className="m-auto font-bold z-12">{`${option}`}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
