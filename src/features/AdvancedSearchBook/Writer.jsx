import { useEffect } from "react";
import { useSharedState } from "./SharedStateProvider";

export function Writer({ setFilters, name }) {
  const { writerName, setWriterName } = useSharedState();
  

  return (
    <div className="flex flex-col gap-[17px] w-full lg:w-8/10">
      <h2 className="text-[17px] font-[300]">نام نویسنده:</h2>
      <div className="relative group">
        <input
          value={writerName}
          onChange={(e) => setWriterName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && writerName.trim().length >= 3) {
              setFilters((filters) =>
                filters.filter((filter) => !filter.includes("نویسنده: "))
              );
              setFilters((filters) => [
                ...(filters || []),
                "نویسنده: " + writerName,
              ]);
              setWriterName("");
              e.target.blur();
            }
          }}
          placeholder="نام نویسنده"
          className="2xl:mr-[30px] px-[18px] bg-white w-full h-[40px] rounded-[6px] outline-[2px] outline-[#000000]/21 focus:outline-[3px] focus:outline-[#2663CD] placeholder:text-[16px] placeholder:font-[300] placeholder:text-[#265073]"
        />
        
        <p className="text-[14px] text-red-700 mr-[48px] absolute pt-[10px] group-focus-within:block hidden">
          لطفا پس از وارد کردن عبارتی بیشتر از سه حرف،جهت اعمال فیلتر Enter را
          بزنید
        </p>
      </div>
    </div>
  );
}
