import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import { useSharedState } from "./SharedStateProvider";

export function CreationDate({ setFilters }) {
  const { dateFrom, setDateFrom, dateTo, setDateTo } = useSharedState();

  return (
    <div className="flex flex-col gap-[17px] w-full ">
      <h2 className="text-[17px] font-[300] ">تاریخ انتشار:</h2>
      <div className="flex  w-full ">
        <div className="flex  items-center gap-2">
          <span className="text-[17px] font-[300]">از:</span>
          <DatePicker
            value={dateFrom}
            onChange={(value) => {
              setDateFrom(value);
              setFilters((filters) =>
                filters?.filter(
                  (filter) =>
                    !filter.includes("تاریخ ایجاد: از") &&
                    !filter.includes("تاریخ ایجاد: تا") &&
                    !filter.includes("تاریخ ایجاد: ")
                )
              );
              if (value) {
                if (String(value) !== String(dateTo)) {
                  setFilters((filters) => [
                    ...(filters || []),
                    `تاریخ ایجاد: از ${value}`,
                  ]);
                  if (dateTo) {
                    setFilters((filters) => [
                      ...(filters || []),
                      `تاریخ ایجاد: تا ${dateTo}`,
                    ]);
                  }
                } else {
                  setFilters((filters) => [
                    ...(filters || []),
                    `تاریخ ایجاد: ${value}`,
                  ]);
                }
              } else if (dateTo) {
                setFilters((filters) => [
                  ...(filters || []),
                  `تاریخ ایجاد: تا ${dateTo}`,
                ]);
              }
            }}
            calendar={persian}
            locale={persian_fa}
            maxDate={dateTo ? new Date(dateTo) : new Date()}
            calendarPosition="bottom-right"
            inputClass="h-[30px] text-[20px] p-[12px] bg-white rounded-[6px] outline-[2px] outline-[#000000]/21 focus:outline-[3px] focus:outline-[#2663CD] w-8/10"
          />
        </div>
        <div className="flex gap-[9px] items-center ">
          <span className="text-[17px] font-[300]">تا:</span>
          <DatePicker
            value={dateTo}
            onChange={(value) => {
              setDateTo(value);
              setFilters((filters) =>
                filters?.filter(
                  (filter) =>
                    !filter.includes("تاریخ ایجاد: از") &&
                    !filter.includes("تاریخ ایجاد: تا") &&
                    !filter.includes("تاریخ ایجاد: ")
                )
              );
              if (value) {
                if (String(value) !== String(dateFrom)) {
                  setFilters((filters) => [
                    ...(filters || []),
                    `تاریخ ایجاد: تا ${value}`,
                  ]);
                  if (dateFrom) {
                    setFilters((filters) => [
                      ...(filters || []),
                      `تاریخ ایجاد: از ${dateFrom}`,
                    ]);
                  }
                } else {
                  setFilters((filters) => [
                    ...(filters || []),
                    `تاریخ ایجاد: ${value}`,
                  ]);
                }
              } else if (dateFrom) {
                setFilters((filters) => [
                  ...(filters || []),
                  `تاریخ ایجاد: از ${dateFrom}`,
                ]);
              }
            }}
            calendar={persian}
            locale={persian_fa}
            maxDate={new Date()}
            minDate={dateFrom ? new Date(dateFrom) : null}
            calendarPosition="bottom-right"
            inputClass="h-[30px] text-[20px] p-[12px] bg-white rounded-[6px] outline-[2px] outline-[#000000]/21 focus:outline-[3px] focus:outline-[#2663CD] w-8/10"
          />
        </div>
      </div>
    </div>
  );
}
