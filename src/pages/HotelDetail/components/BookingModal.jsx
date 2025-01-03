import React, { useState } from "react";

import { useLocation } from "react-router";
import { useToast } from "../../../App";
import {
  ArrowLongRightIcon,
  CheckInCalenderIcon,
  CheckOutCalenderIcon,
  CloseIcon,
  UsersIcon,
} from "../../../components/SvgIcons";
import ImageCarousel from "../../../components/ImageCarousel";
import PersonDetails from "./PersonDetails";

const HotelBookingModal = ({ roomDetails, hotelName = "" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();
  const { showToast } = useToast();
  const searchParams = new URLSearchParams(location.search);
  const personCount = searchParams.get("checkinPersonCount") ?? 1;
  const [checkInDate, setCheckInDate] = useState(
    searchParams.get("checkinDate") ?? ""
  );
  const [checkOutDate, setCheckOutDate] = useState(
    searchParams.get("checkoutDate") ?? ""
  );
  const [personList, setPersonList] = useState(() =>
    Array.from({ length: personCount }, (_, index) => ({
      id: index + 1,
      name: "",
      age: "",
      gender: "Male",
    }))
  );
  console.log("personList", personList);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePersonAdd = () => {
    const id = new Date().getUTCMilliseconds;
    const newPerson = {
      id,
      name: "",
      age: "",
      gender: "Male",
    };
    setPersonList([...personList, newPerson]);
  };

  const handlePersonDelete = (person) => {
    const updatedList = personList.filter((p) => person !== p);
    setPersonList(updatedList);
  };

  const updatePersonData = (person, key, value) => {
    const updatedList = personList.map((p) => {
      if (p === person) {
        return { ...p, [key]: value };
      }
      return p;
    });
    setPersonList(updatedList);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    showToast("Booking successful", "success");
    closeModal();
  };

  return (
    <>
      <button
        onClick={openModal}
        className="flex items-center justify-center flex-1 min-w-fit p-2  bg-blue-500 text-white rounded hover:bg-blue-600  gap-2 text-sm"
      >
        Book Now
        <ArrowLongRightIcon />
      </button>
      {/* Modal */}
      {isModalOpen && (
        <div className=" fixed inset-0 bg-black bg-opacity-20 backdrop-blur flex flex-col items-center justify-center z-10">
          <div className="bg-white rounded-md shadow-lg w-10/12 xl:w-2/3  max-w-[800px] py-2 md:py-4 px-4 md:px-8  overflow-y-scroll my-3">
            <div className=" flex justify-between items-center pb-4">
              <div>
                {hotelName}
                {" > "}
                <span className="text-2xl">{roomDetails?.name}</span>
              </div>
              <div>
                <button
                  onClick={closeModal}
                  className="  text-gray-600 hover:text-gray-800"
                >
                  <CloseIcon size={5} />
                </button>
              </div>
            </div>

            <div className="mt-4">
              <div className="grid grid-cols-1  md:grid-cols-2 gap-2">
                <div className="">
                  <ImageCarousel images={roomDetails?.image_urls} />
                  <div>
                    <div className="flex gap-1 flex-wrap pt-8 pb-4">
                      {Array.isArray(roomDetails.amenities) &&
                        roomDetails.amenities?.map((amenity) => (
                          <div
                            key={amenity}
                            className=" px-3 border border-blue-500  rounded-xl text-blue-500"
                          >
                            {amenity}
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-[6.5rem_auto] gap-2 py-4">
                    <div>
                      <div className="flex gap-1 items-center">
                        <span className="text-[#878787]">
                          <UsersIcon />
                        </span>
                        Person:
                      </div>
                      <div className="flex gap-1 items-center">
                        <CheckInCalenderIcon />
                        Check-in:
                      </div>
                      <div className="flex gap-1 items-center">
                        <CheckOutCalenderIcon />
                        Check-out:
                      </div>
                    </div>
                    <div>
                      <div className="text-blue-500">
                        {personList.length ? personList.length : ""}
                      </div>

                      <div className="text-blue-500">
                        {checkInDate
                          ? new Date(checkInDate).toLocaleDateString()
                          : ""}
                      </div>

                      <div className="text-blue-500">
                        {checkOutDate
                          ? new Date(checkOutDate).toLocaleDateString()
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
                <form className="md:pl-4 flex flex-col" onSubmit={handleSubmit}>
                  <div className="flex  flex-wrap justify-center border gap-2 rounded px-2 py-2 shadow-sm bg-white border-gray-500 w-fit mx-auto">
                    <input
                      type="date"
                      required
                      id="check-in-date"
                      className="focus:outline-none focus:ring focus:ring-blue-300 text-sm flex-1"
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
                      required
                      id="check-out-date"
                      className="focus:outline-none focus:ring focus:ring-blue-300 text-sm flex-1"
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

                  <div className="flex-1 py-4">
                    <PersonDetails
                      handlePersonAdd={handlePersonAdd}
                      handlePersonDelete={handlePersonDelete}
                      personList={personList}
                      updatePersonData={updatePersonData}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-500"
                  >
                    Book
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HotelBookingModal;
