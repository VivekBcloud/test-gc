import React, { useEffect, useMemo, useState } from "react";
import SearchHotel from "./components/SearchHotel";
import { fetchHotels, getPriceRanges } from "../../services";
import PaginationComponent from "../../components/Pagination";
import { CloseIcon } from "../../components/SvgIcons";
import FilterBox from "./components/FilterBox";
import HotelCardList from "./components/HotelCardList";
import { useToast } from "../../App";
import HotelSorter from "./components/HotelSorter";

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

const Home = () => {
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [hotelList, setHotelList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  // Get current items
  const itemsPerPage = 9;
  const startIdx = (currentPage - 1) * itemsPerPage;
  const { showToast } = useToast();
  useEffect(() => {
    const fetchData = async () => {
      // Fetch hotel details from API
      try {
        setIsLoading(true);
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
        showToast("Failed to get hotel list", "error");
        console.error("Error fetching hotel details:", err);
      } finally {
        setIsLoading(false);
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

  const filteredHotels = hotelList
    .filter((hotel) => {
      if (appliedFilters.length) {
        return appliedFilters.some((filter) => {
          if (filter?.filterType === "city") {
            return hotel?.city === filter.label;
          } else if (filter.filterType === "price") {
            return hotel?.rooms?.some(
              (room) =>
                room?.price >= filter.lowest && room?.price <= filter.highest
            );
          } else if (filter?.filterType === "rating") {
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
            <HotelSorter setSortBy={setSortBy} />
            <HotelCardList
              filteredPaginatedHotels={filteredPaginatedHotels}
              isLoading={isLoading}
              currentPage={currentPage}
            />
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
