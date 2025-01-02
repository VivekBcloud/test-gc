import React, { useEffect, useMemo, useState } from "react";
import "./styles.css";
import SearchHotel from "../../components/SearchHotel";
import HotelCards from "../../components/HotelCards";
import { fetchHotels, getPriceRanges } from "../../services";
import PaginationComponent from "../../components/Pagination";
import { CloseIcon } from "../../components/SvgIcons";

const filterPriceOptions = [
  {
    lowest: 0,
    highest: 1000,
    label: "Up to Rs. 1000",
    filterType: "price",
  },
  {
    lowest: 1001,
    highest: 2000,
    label: "Rs. 1001 to Rs. 2000",
    filterType: "price",
  },
  {
    lowest: 2001,
    highest: 5000,
    label: "Rs. 2001 to Rs. 5000",
    filterType: "price",
  },
  {
    lowest: 5001,
    highest: 999999,
    label: "Above Rs. 5000",
    filterType: "price",
  },
];
const filterRatingOptions = [
  {
    lowest: 0,
    highest: 1,
    label: "0 -1  Star",
    filterType: "rating",
  },
  {
    lowest: 1,
    highest: 2,
    label: "1 - 2 Star",
    filterType: "rating",
  },
  {
    lowest: 2,
    highest: 3,
    label: "2 - 3 Star",
    filterType: "rating",
  },
  {
    lowest: 3,
    highest: 4,
    label: "3 - 4 Star",
    filterType: "rating",
  },
  {
    lowest: 4,
    highest: 5,
    label: "4 - 5 Star",
    filterType: "rating",
  },
];

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

const Home = () => {
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [hotelList, setHotelList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  // Get current items
  const itemsPerPage = 9;
  const startIdx = (currentPage - 1) * itemsPerPage;

  useEffect(() => {
    const fetchData = async () => {
      // Fetch hotel details from API
      try {
        const data = await fetchHotels({ page: 1, size: 30 });
        console.log("data", data);
        if (Array.isArray(data)) {
          const hotelListWithPrice = data.map((hotel) => {
            const { lowest, highest } = getPriceRanges(hotel?.rooms);
            return { ...hotel, lowestPrice: lowest, highestPrice: highest };
          });
          setHotelList(hotelListWithPrice);
        }
      } catch (err) {
        console.error("Error fetching hotel details:", err);
      }
    };
    fetchData();
  }, []);
  const uniqueCityNames = [...new Set(hotelList.map((hotel) => hotel?.city))];
  const filterLocationOptions = useMemo(
    () =>
      uniqueCityNames.map((city) => ({
        label: city,
        filterType: "city",
      })),
    [hotelList]
  );

  console.log("filterLocationOptions", filterLocationOptions);
  console.log("appliedFilters", appliedFilters);
  const filteredHotels = hotelList
    .filter((hotel) => {
      if (appliedFilters.length) {
        return appliedFilters.some((filter) => {
          if (filter.filterType === "city") {
            return hotel.city === filter.label;
          } else if (filter.filterType === "price") {
            return (
              hotel.lowestPrice >= filter.lowest &&
              hotel.lowestPrice <= filter.highest
            );
          } else if (filter.filterType === "rating") {
            return (
              hotel.rating >= filter.lowest && hotel.rating <= filter.highest
            );
          }
          return false;
        });
      }
      return true;
    })
    .sort((hotelA, hotelB) => {
      if (!sortBy) return false;
      if (sortBy === "price low to high") {
        return parseFloat(hotelA.lowestPrice) - parseFloat(hotelB.lowestPrice);
      } else if (sortBy === "price high to low") {
        return (
          parseFloat(hotelB.highestPrice) - parseFloat(hotelA.highestPrice)
        );
      } else if (sortBy === "rating low to high") {
        return parseFloat(hotelA.rating) - parseFloat(hotelB.rating);
      } else if (sortBy === "rating high to low") {
        return parseFloat(hotelB.rating) - parseFloat(hotelA.rating);
      }
      return false;
    });
  const filteredPaginatedHotels = filteredHotels?.slice(
    startIdx,
    startIdx + itemsPerPage
  );
  const addToAppliedFilterList = (filterlabel) => {
    setAppliedFilters([...appliedFilters, filterlabel]);
    setCurrentPage(1);
  };
  const removeFromAppliedFilters = (filterlabel) => {
    setAppliedFilters(
      appliedFilters.filter((filter) => filter !== filterlabel)
    );
    setCurrentPage(1);
  };
  return (
    <div className="home-container">
      <div className="p-5 md:p-10 md:pb-20  relative">
        <div className="absolute inset-0 overflow-clip ">
          <img
            className="h-full absolute left-1/3 right-0 top-0  opacity-100 pointer-events-none scale-150 "
            src="https://raw.githubusercontent.com/gocomet-india/frontend-hotel-assignment/main/hero-bg.jpg"
            alt="hero-image"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent"></div>
        </div>
        <div className="isolate">
          <div className="max-w-[724px] w-full z-20 ">
            <h1 className="py-4 text-4xl">Find the prefect deal, always.</h1>
            <p className="text-sm py-4">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Reiciendis fugiat rerum id. Nobis, totam, voluptatem suscipit
              aliquam quo deserunt expedita ipsum, inventore omnis impedit a.
              Alias minima facere molestiae tenetur!
            </p>
          </div>

          <div className="mt-6 md:mt-12">
            <SearchHotel />
          </div>
        </div>
      </div>
      <div>
        <h2 className="py-4 text-center text-2xl">Explore Hotels</h2>
        <section className="grid sm:grid-cols-[16rem_auto] ">
          <div className="p-4">
            <div className="flex justify-between items-center pb-2">
              <div className="text-2xl">Filters</div>
              <button
                className="text-blue-500 text-sm"
                onClick={() => {
                  setAppliedFilters([]);
                }}
              >
                CLEAR ALL
              </button>
            </div>
            {appliedFilters.length > 0 && (
              <div className="flex gap-1 flex-wrap pt-2">
                {appliedFilters.map((item) => (
                  <div
                    className="px-2 bg-blue-100 rounded-3xl text-blue-500 border border-blue-500 flex items-center text-sm"
                    key={item?.label}
                  >
                    <span className="leading-none h-fit">{item?.label}</span>
                    <button
                      onClick={() => {
                        removeFromAppliedFilters(item);
                      }}
                    >
                      <CloseIcon />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div>
              {/* filter options */}
              <FilterBox
                appliedFilters={appliedFilters}
                filterHeading={"PRICE RANGE"}
                filterOptions={filterPriceOptions}
                addToAppliedFilterList={addToAppliedFilterList}
                removeFromAppliedFilters={removeFromAppliedFilters}
              />

              <FilterBox
                appliedFilters={appliedFilters}
                filterHeading={"RATING"}
                filterOptions={filterRatingOptions}
                addToAppliedFilterList={addToAppliedFilterList}
                removeFromAppliedFilters={removeFromAppliedFilters}
              />

              <FilterBox
                appliedFilters={appliedFilters}
                filterHeading={"CITY"}
                filterOptions={filterLocationOptions}
                addToAppliedFilterList={addToAppliedFilterList}
                removeFromAppliedFilters={removeFromAppliedFilters}
              />
            </div>
          </div>
          {/* hotel list */}
          <div className="p-4">
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
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 ">
              {filteredPaginatedHotels.length > 0 ? (
                filteredPaginatedHotels.map((item) => (
                  <HotelCards key={item?.id} details={item} />
                ))
              ) : (
                <div className="py-5">No results found</div>
              )}
            </div>
            <PaginationComponent
              totalItems={filteredHotels.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
