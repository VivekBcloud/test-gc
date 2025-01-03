const FilterBox = ({
  filterHeading,
  filterOptions,
  addToAppliedFilterList,
  removeFromAppliedFilters,
  appliedFilters,
}) => {
  return (
    <div className="py-2">
      <div className="py-2">{filterHeading}</div>
      <div className="text-sm">
        {Array.isArray(filterOptions) &&
          filterOptions.map((option) => {
            const isChecked = appliedFilters.find((item) => option == item);
            return (
              <div
                key={option?.label}
                className="py-2 flex items-center gap-1 transition-all hover:font-semibold"
              >
                <input
                  type="checkbox"
                  name={option?.label}
                  id={`price-range-${option?.label}`}
                  checked={isChecked}
                  className="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-1 "
                  onChange={(e) => {
                    if (e.target.checked) {
                      addToAppliedFilterList(option);
                    } else {
                      removeFromAppliedFilters(option);
                    }
                  }}
                />
                <label
                  htmlFor={`price-range-${option?.label}`}
                  className="w-full"
                >
                  {option.label}
                </label>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default FilterBox;
