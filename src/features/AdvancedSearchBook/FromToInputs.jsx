export function FromToInputs({
  maxValue,
  valueLength,
  setFilters,
  filterPattern,
  fromValue,
  setFromValue,
  toValue,
  setToValue,
}) {
  function deleteAllFilters() {
    setFilters((filters) =>
      filters?.filter((filter) =>
        filterPattern === "chapter"
          ? !filter.includes("تعداد فصل ها: از") &&
            !filter.includes("تعداد فصل ها: تا") &&
            !filter.includes("تعداد فصل ها: ")
          : filterPattern === "fav"
            ? !filter.includes("تعداد پسندیده ها: از") &&
              !filter.includes("تعداد پسندیده ها: تا") &&
              !filter.includes("تعداد پسندیده ها: ")
            : filterPattern === "scorer"
              ? !filter.includes("تعداد امتیازدهندگان: از") &&
                !filter.includes("تعداد امتیازدهندگان: تا") &&
                !filter.includes("تعداد امتیازدهندگان: ")
              : null
      )
    );
  }

  function setFromFilters() {
    deleteAllFilters();
    if (toValue === "1") {
      setFilters((filters) =>
        filterPattern === "chapter"
          ? [...(filters || []), "تعداد فصل ها: 1 فصل"]
          : filterPattern === "fav"
            ? [...(filters || []), "تعداد پسندیده ها: 1 نفر"]
            : filterPattern === "scorer"
              ? [...(filters || []), "تعداد امتیازدهندگان: 1 نفر"]
              : null
      );
    } else {
      setFilters((filters) =>
        filterPattern === "chapter"
          ? toValue !== maxValue
            ? [...(filters || []), `تعداد فصل ها: تا ${toValue} فصل`]
            : null
          : filterPattern === "fav"
            ? toValue !== maxValue
              ? [...(filters || []), `تعداد پسندیده ها: تا ${toValue} نفر`]
              : null
            : filterPattern === "scorer"
              ? toValue !== maxValue
                ? [...(filters || []), `تعداد امتیازدهندگان: تا ${toValue} نفر`]
                : null
              : null
      );
    }
  }

  function setToFilters() {
    deleteAllFilters();
    if (fromValue === maxValue) {
      setFilters((filters) =>
        filterPattern === "chapter"
          ? [...(filters || []), `تعداد فصل ها: ${maxValue} فصل`]
          : filterPattern === "fav"
            ? [...(filters || []), `تعداد پسندیده ها: ${maxValue} نفر`]
            : filterPattern === "scorer"
              ? [...(filters || []), `تعداد امتیازدهندگان: ${maxValue} نفر`]
              : null
      );
    } else {
      setFilters((filters) =>
        filterPattern === "chapter"
          ? fromValue !== "1"
            ? [...(filters || []), `تعداد فصل ها: از ${fromValue} فصل`]
            : null
          : filterPattern === "fav"
            ? fromValue !== "1"
              ? [...(filters || []), `تعداد پسندیده ها: از ${fromValue} نفر`]
              : null
            : filterPattern === "scorer"
              ? fromValue !== "1"
                ? [
                    ...(filters || []),
                    `تعداد امتیازدهندگان: از ${fromValue} نفر`,
                  ]
                : null
              : null
      );
    }
  }

  function setEqualFilter(fromOrTo) {
    deleteAllFilters();
    setFilters((filters) =>
      filterPattern === "chapter"
        ? [
            ...(filters || []),
            `تعداد فصل ها: ${fromOrTo === "from" ? fromValue : toValue} فصل`,
          ]
        : filterPattern === "fav"
          ? [
              ...(filters || []),
              `تعداد پسندیده ها: ${fromOrTo === "from" ? fromValue : toValue} نفر`,
            ]
          : filterPattern === "scorer"
            ? [
                ...(filters || []),
                `تعداد امتیازدهندگان: ${fromOrTo === "from" ? fromValue : toValue} نفر`,
              ]
            : null
    );
  }

  function setNotEqualFilter(numWithoutLeadingZeros, fromOrTo) {
    deleteAllFilters();
    setFilters((filters) =>
      filterPattern === "chapter"
        ? fromOrTo === "from"
          ? [
              ...(filters || []),
              fromValue !== "1"
                ? `تعداد فصل ها: از ${fromValue} فصل`
                : undefined,
              numWithoutLeadingZeros !== Number(maxValue)
                ? `تعداد فصل ها: تا ${numWithoutLeadingZeros} فصل`
                : undefined,
            ].filter((item) => item !== undefined)
          : [
              ...(filters || []),
              numWithoutLeadingZeros !== 1
                ? `تعداد فصل ها: از ${numWithoutLeadingZeros} فصل`
                : undefined,
              toValue !== maxValue
                ? `تعداد فصل ها: تا ${toValue} فصل`
                : undefined,
            ].filter((item) => item !== undefined)
        : filterPattern === "fav"
          ? fromOrTo === "from"
            ? [
                ...(filters || []),
                fromValue !== "1"
                  ? `تعداد پسندیده ها: از ${fromValue} نفر`
                  : undefined,
                numWithoutLeadingZeros !== Number(maxValue)
                  ? `تعداد پسندیده ها: تا ${numWithoutLeadingZeros} نفر`
                  : undefined,
              ].filter((item) => item !== undefined)
            : [
                ...(filters || []),
                numWithoutLeadingZeros !== 1
                  ? `تعداد پسندیده ها: از ${numWithoutLeadingZeros} نفر`
                  : undefined,
                toValue !== maxValue
                  ? `تعداد پسندیده ها: تا ${toValue} نفر`
                  : undefined,
              ].filter((item) => item !== undefined)
          : filterPattern === "scorer"
            ? fromOrTo === "from"
              ? [
                  ...(filters || []),
                  fromValue !== "1"
                    ? `تعداد امتیازدهندگان: از ${fromValue} نفر`
                    : undefined,
                  numWithoutLeadingZeros !== Number(maxValue)
                    ? `تعداد امتیازدهندگان: تا ${numWithoutLeadingZeros} نفر`
                    : undefined,
                ].filter((item) => item !== undefined)
              : [
                  ...(filters || []),
                  numWithoutLeadingZeros !== 1
                    ? `تعداد امتیازدهندگان: از ${numWithoutLeadingZeros} نفر`
                    : undefined,
                  toValue !== maxValue
                    ? `تعداد امتیازدهندگان: تا ${toValue} نفر`
                    : undefined,
                ].filter((item) => item !== undefined)
            : null
    );
  }

  function handleFromValue() {
    if (fromValue.trim() === "" || /^0+$/.test(fromValue) || isNaN(fromValue)) {
      setFromValue("1");
      setFromFilters();
      return;
    }
    const num = Number(fromValue);
    if (num < 0 || !Number.isInteger(num) || num === 0) {
      setFromValue("1");
      setFromFilters();
      return;
    }
    const numWithoutLeadingZeros = parseInt(fromValue, 10);
    if (numWithoutLeadingZeros >= Number(toValue)) {
      setFromValue(toValue);
      setEqualFilter("to");
      return;
    }
    setFromValue(`${numWithoutLeadingZeros}`);
    setNotEqualFilter(numWithoutLeadingZeros, "to");
  }

  function handleToValue() {
    if (toValue.trim() === "" || /^0+$/.test(toValue) || isNaN(toValue)) {
      setToValue(maxValue);
      setToFilters();
      return;
    }
    const num = Number(toValue);
    if (num < 0 || !Number.isInteger(num) || num === 0) {
      setToValue(maxValue);
      setToFilters();
      return;
    }
    const numWithoutLeadingZeros = parseInt(toValue, 10);
    if (numWithoutLeadingZeros <= Number(fromValue)) {
      setToValue(fromValue);
      setEqualFilter("from");
      return;
    }
    setToValue(`${numWithoutLeadingZeros}`);
    setNotEqualFilter(numWithoutLeadingZeros, "from");
  }

  return (
    <div className="flex lg:justify-between sm:justify-around justify-between 2xl:mr-[30px]">
      <div className="flex items-center gap-[9px]">
        <span className="text-[20px] font-[300] ">از:</span>
        <input
          dir="ltr"
          value={fromValue}
          onChange={(e) =>
            e.target.value.length <= valueLength &&
            !isNaN(Number(e.target.value))
              ? setFromValue(e.target.value)
              : null
          }
          onBlur={() => handleFromValue()}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleFromValue();
              e.target.blur();
            }
          }}
          className="h-[40px] lg:w-[80px] md:w-[120px] w-[80px] bg-white rounded-[5px] text-center outline-[2px] outline-[#000000]/21 focus:outline-[3px] focus:outline-[#2663CD]"
        />
      </div>
      <div className="flex items-center gap-[9px]">
        <span className="text-[20px] font-[300] ">تا:</span>
        <input
          dir="ltr"
          value={toValue}
          onChange={(e) =>
            e.target.value.length <= valueLength &&
            !isNaN(Number(e.target.value))
              ? setToValue(e.target.value)
              : null
          }
          onBlur={() => handleToValue()}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleToValue();
              e.target.blur();
            }
          }}
          className="h-[40px] lg:w-[80px] md:w-[120px] w-[80px] bg-white rounded-[5px] text-center outline-[2px] outline-[#000000]/21 focus:outline-[3px] focus:outline-[#2663CD]"
        />
      </div>
    </div>
  );
}
