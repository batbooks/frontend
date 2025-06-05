export function SelectedGenreAndTag({
  Obj,
  deleteFilter = null,
  filters = null,
  selected,
  addSelected,
  unselected,
  deleteUnselected,
  allSelected = null,
  addAllSelected = null,
  allUnselected = null,
  deleteAllUnselected = null,
}) {
  return (
    <button
      onClick={() => {
        {
          Obj.category_id !== undefined
            ? deleteFilter(
                filters?.filter((filter) => filter !== "تگ: " + Obj.title)
              )
            : deleteFilter(
                filters?.filter((filter) => filter !== "ژانر: " + Obj.title)
              );
        }
        deleteUnselected([...unselected, Obj]);
        addSelected(
          selected.filter((selected) => selected.title !== Obj.title)
        );
        if (allSelected !== null) {
          deleteAllUnselected([...allUnselected, Obj]);
          addAllSelected(
            allSelected.filter((selected) => selected.title !== Obj.title)
          );
        }
      }}
      title={Obj.description}
      className="btn !bg-[#4D8AFF] !text-black hover:!text-white before:!bg-[#2663CD] !w-full !h-fit !mb-0 !mx-0 !rounded-[10px] py-[10px]"
    >
      <span className="span-btn !text-[14px] !font-[300]">{Obj.title}</span>
    </button>
  );
}
