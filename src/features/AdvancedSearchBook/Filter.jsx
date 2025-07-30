import { useSharedState } from "./SharedStateProvider";

export function Filter({
  filterName,
  deleteFilter,
  filters,
  unselectedGenres,
  setUnselectedGenres,
  selectedGenres,
  deleteSelectedGenres,
  allUnselectedTags,
  setAllUnselectedTags,
  allSelectedTags,
  deleteAllSelectedTags,
  setFromValueChapter,
  setToValueChapter,
  setFromValueFav,
  setToValueFav,
  setFromValueScorer,
  setToValueScorer,
}) {
  const {
    setCheckedNum,
    setAvgScoreFrom,
    setAvgScoreTo,
    setDateFrom,
    setDateTo,
    setSelectValue,
  } = useSharedState();

  return (
    <div className="overflow-hidden relative items-center shadow-lg flex justify-between text-nowrap rounded-full bg-white pr-[11px] pl-[30px] py-[6px] w-full mx-0 grow-1">
      <span className="z-1 text-[15px] font-[100]">{filterName}</span>
      <div className="bg-white h-full w-[28px] rounded-l-full z-2 absolute left-0 grid">
        <button
          onClick={() => {
            if (filterName.includes("ژانر: ")) {
              setUnselectedGenres([
                ...unselectedGenres,
                ...selectedGenres.filter((genre) =>
                  filterName.includes(genre.title)
                ),
              ]);
              deleteSelectedGenres(
                selectedGenres.filter(
                  (genre) => !filterName.includes(genre.title)
                )
              );
            }
            if (filterName.includes("تگ: ")) {
              setAllUnselectedTags([
                ...allUnselectedTags,
                ...allSelectedTags.filter((tag) =>
                  filterName.includes(tag.title)
                ),
              ]);
              deleteAllSelectedTags(
                allSelectedTags.filter((tag) => !filterName.includes(tag.title))
              );
            }
            if (filterName.includes("تعداد فصل ها: از")) {
              setFromValueChapter("1");
            } else if (filterName.includes("تعداد فصل ها: تا")) {
              setToValueChapter("9999");
            } else if (filterName.includes("تعداد فصل ها: ")) {
              setFromValueChapter("1");
              setToValueChapter("9999");
            }
            if (filterName.includes("تعداد پسندیده ها: از")) {
              setFromValueFav("1");
            } else if (filterName.includes("تعداد پسندیده ها: تا")) {
              setToValueFav("99999");
            }
            if (filterName.includes("تعداد پسندیده ها: ")) {
              setFromValueFav("1");
              setToValueFav("99999");
            }
            if (filterName.includes("تعداد امتیازدهندگان: از")) {
              setFromValueScorer("1");
            } else if (filterName.includes("تعداد امتیازدهندگان: تا")) {
              setToValueScorer("99999");
            } else if (filterName.includes("تعداد امتیازدهندگان: ")) {
              setFromValueScorer("1");
              setToValueScorer("99999");
            }
            if (filterName.includes("میانگین امتیاز: از")) {
              setAvgScoreFrom("1.0");
            } else if (filterName.includes("میانگین امتیاز: تا")) {
              setAvgScoreTo("5.0");
            } else if (filterName.includes("میانگین امتیاز: ")) {
              setAvgScoreFrom("1.0");
              setAvgScoreTo("5.0");
            }
            if (filterName.includes("وضعیت: ")) {
              setCheckedNum(-1);
            }
            if (filterName.includes("تاریخ ایجاد: از")) {
              setDateFrom("");
            } else if (filterName.includes("تاریخ ایجاد: تا")) {
              setDateTo("");
            } else if (filterName.includes("تاریخ ایجاد: ")) {
              setDateFrom("");
              setDateTo("");
            }
            if (filterName.includes("مرتب سازی براساس: ")) {
              setSelectValue("--انتخاب کنید--");
            }
            deleteFilter(filters?.filter((filter) => filter != filterName));
          }}
          className="grid mx-auto my-auto rounded-full cursor-pointer h-[15px] w-[15px] hover:bg-[#E5E5E5]/70 transition-colors duration-400 active:bg-[#E5E5E5] active:duration-100"
        >
          <span className="text-black text-[17px] font-[100] translate-y-[-4px] mx-auto">
            &times;
          </span>
        </button>
      </div>
    </div>
  );
}
