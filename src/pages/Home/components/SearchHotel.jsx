import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import clsx from "clsx";
import { fetchHotelNames } from "../../../services";
import {
  LocationIcon,
  SearchIcon,
  UsersIcon,
} from "../../../components/SvgIcons";
import { useToast } from "../../../App";
function checkForErrorPresent(errorCode, codeList) {
  if (codeList.length) {
    const error = codeList.find((code) => code === errorCode);
    if (error) {
      return true;
    }
  }
  return false;
}
const SearchHotel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [checkinPersonCount, setCheckinPersonCount] = useState(2);
  const [hoteNameList, setHoteNameList] = useState([]);
  const [errorList, setErrorList] = useState([]);

  const dropdownRef = useRef(null);
  const { showToast } = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      // Fetch hotel details from API
      try {
        const data = await fetchHotelNames();
        if (Array.isArray(data)) setHoteNameList(data);
      } catch (err) {
        showToast("Error fetching hotel names", "error");
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const options = hoteNameList.map((hotel) => {
    return {
      id: hotel.id,
      label: `${hotel.name}, ${hotel.city}`,
    };
  });
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option?.id);
    setSearchTerm(option?.label);
    setIsDropdownOpen(false);
  };

  const handleSearchHotel = () => {
    // Perform search hotel logic here
    console.log(
      "Search hotel with:",
      selectedOption,
      checkInDate,
      checkOutDate,
      checkinPersonCount
    );
    const params = new URLSearchParams();
    if (
      !selectedOption ||
      !checkInDate ||
      !checkOutDate ||
      !checkinPersonCount
    ) {
      showToast("Please fill all details", "error");
      const notFilled = [];
      if (!selectedOption) notFilled.push("hotelName");
      if (!checkInDate || !checkOutDate) notFilled.push("checkIn");
      if (!checkinPersonCount) notFilled.push("checkinPersonCount");
      setErrorList(notFilled);
      return;
    }
    params.set("checkinPersonCount", checkinPersonCount);
    params.set("checkinDate", new Date(checkInDate).toLocaleDateString());
    params.set("checkoutDate", new Date(checkOutDate).toLocaleDateString());

    navigate(`/hoteldetails/${selectedOption}?${params.toString()}`);
  };
  return (
    <div className="flex gap-4 items-center flex-wrap mb-0 md:mb-1 text-sm">
      <div className="relative w-80 bg-white" ref={dropdownRef}>
        <div
          className={clsx(
            "flex items-center border  rounded-md px-3 py-2 shadow-sm",
            checkForErrorPresent("hotelName", errorList)
              ? "border-red-400"
              : "border-gray-300"
          )}
        >
          <label
            htmlFor="search-hotel"
            className="flex items-center text-blue-500 mr-2"
          >
            <LocationIcon />
          </label>
          <input
            type="text"
            id="search-hotel"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => setIsDropdownOpen(true)}
            placeholder="Type city, place, or hotel name"
            className="w-full outline-none text-gray-700"
          />
          <label
            htmlFor="search-hotel"
            className="flex items-center text-blue-500 ml-2"
          >
            <SearchIcon />
          </label>
        </div>
        {isDropdownOpen && filteredOptions.length > 0 && (
          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 max-h-40 overflow-y-auto">
            {filteredOptions.map((option) => (
              <div
                key={option.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOptionClick(option)}
              >
                {option?.label}
              </div>
            ))}
          </div>
        )}
        {isDropdownOpen && filteredOptions.length === 0 && (
          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1">
            <div className="px-4 py-2 text-gray-500">No results found</div>
          </div>
        )}
      </div>
      <div
        className={clsx(
          "flex items-center border gap-2  rounded-md px-3 py-2 shadow-sm bg-white",
          checkForErrorPresent("checkIn", errorList)
            ? "border-red-400"
            : "border-gray-300"
        )}
      >
        {/* Check-In */}
        <input
          type="date"
          id="check-in-date"
          className="focus:outline-none focus:ring focus:ring-blue-300"
          value={checkInDate}
          onChange={(e) => {
            const value = e.target.value;
            if (!checkOutDate) {
              setCheckInDate(value);
              setCheckOutDate(value);
            } else {
              const startDate = new Date(value).getTime();
              const endDate = new Date(checkOutDate).getTime();
              if (endDate < startDate) {
                showToast(
                  "Check-in date should be before check-out date",
                  "error"
                );
              } else {
                setCheckInDate(value);
              }
            }
          }}
        />
        <input
          type="date"
          id="check-out-date"
          className="focus:outline-none focus:ring focus:ring-blue-300"
          value={checkOutDate}
          onChange={(e) => {
            const value = e.target.value;
            if (!checkInDate) {
              setCheckInDate(value);
              setCheckOutDate(value);
            } else {
              const startDate = new Date(checkInDate).getTime();
              const endDate = new Date(value).getTime();
              if (endDate < startDate) {
                showToast(
                  "Check-out date should be after check-in date",
                  "error"
                );
              } else {
                setCheckOutDate(value);
              }
            }
          }}
        />
      </div>
      <div
        className={clsx(
          "flex items-center border bg-white rounded-md px-3 py-2 text-blue-500 shadow-sm gap-2 focus-within:border-blue-500",
          checkForErrorPresent("checkinPersonCount", errorList)
            ? "border-red-400"
            : "border-gray-300"
        )}
      >
        <label htmlFor="personCount">
          <UsersIcon className="" />
        </label>
        <input
          type="number"
          name="person"
          id="personCount"
          onChange={(e) => {
            setCheckinPersonCount(e.target.value);
          }}
          value={checkinPersonCount}
          className="w-10 px-1 text-black"
        />
      </div>
      <button
        className="bg-blue-500 text-white max-w-36  w-full py-2 shadow-sm rounded-md hover:bg-blue-600"
        onClick={handleSearchHotel}
      >
        Search
      </button>
    </div>
  );
};

export default SearchHotel;
