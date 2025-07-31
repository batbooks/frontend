export function GenreAndTag({
  Obj,
  addFilter = null,
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
            ? addFilter([...(filters || []), "تگ: " + Obj.title])
            : addFilter([...(filters || []), "ژانر: " + Obj.title]);
        }
        addSelected([...selected, Obj]);
        deleteUnselected(
          unselected.filter((unselected) => unselected.title !== Obj.title)
        );
        if (allSelected !== null) {
          addAllSelected([...allSelected, Obj]);
          deleteAllUnselected(
            allUnselected.filter((unselected) => unselected.title !== Obj.title)
          );
        }
      }}
      title={Obj.description}
      className="btn !bg-[#2663CD]/80  !h-fit !mb-0 !mx-0 !rounded-[10px] py-[10px] !w-full"
    >
      <span className="span-btn !text-[12px] lg:!text-[14px] !font-[300]">{Obj.title}</span>
    </button>
  );
}
