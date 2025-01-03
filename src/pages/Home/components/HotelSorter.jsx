import React from "react";

const HotelSorter = ({ setSortBy }) => {
  return (
    <div className="flex justify-end mb-4">
      <select
        name="sort by"
        className="p-2 self-end overflow-hidden border border-gray-300"
        onClick={(e) => setSortBy(e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="price low to high">Price low to high</option>
        <option value="price high to low">Price high to low</option>
        <option value="rating low to high">Rating low to high</option>
        <option value="rating high to low">Rating high to low</option>
      </select>
    </div>
  );
};

export default HotelSorter;
