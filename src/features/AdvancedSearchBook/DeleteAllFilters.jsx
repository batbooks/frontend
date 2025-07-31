import { useSharedState } from "./SharedStateProvider";

export default function DeleteButton({
  setFromValueChapter,
  setToValueChapter,
  setGenres,
  setSelectedGenres,
  selectedGenres,
  setAllTags,
  setAllSelectedTags,
  setShowingTags,
  setShowingSelectedTags,
  allSelectedTags,
  showingSelectedTags,
  setFilters,
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
    <div className="group">
      <span
        onClick={() => {
          setCheckedNum(-1);
          setAvgScoreFrom("1.0");
          setAvgScoreTo("5.0");
          setDateFrom("");
          setDateTo("");
          setSelectValue("--انتخاب کنید--");
          setFromValueChapter("1");
          setToValueChapter("9999");
          setGenres((genres) => [...genres, ...selectedGenres]);
          setTimeout(() => setSelectedGenres([]), 0);
          setAllTags((tags) => [...tags, ...allSelectedTags]);
          setTimeout(() => setAllSelectedTags([]), 0);
          setShowingTags((tags) => [...tags, ...showingSelectedTags]);
          setTimeout(() => setShowingSelectedTags([]), 0);
          setFilters([]);
        }}
        className="text-[16px] text-black cursor-pointer"
      >
        حذف همه فیلترها
      </span>
      <div className="border-t-[1px] collapse group-hover:visible group-active:collapse"></div>
    </div>
  );
}
