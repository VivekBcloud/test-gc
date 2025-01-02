import React, { useState } from "react";
import PersonDetails from "./PersonDetails";
import { ArrowLongRightIcon, CloseIcon } from "./SvgIcons";

const ViewFacilityModal = ({ roomDetails, hotelName = "" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { amendities } = roomDetails;
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="px-6 py-2 border border-blue-500 text-blue-500 rounded hover:border-blue-600 hover:text-blue-600 flex items-center gap-2 text-sm"
      >
        View Facilities
        <ArrowLongRightIcon />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="absolute flex flex-col items-center justify-center min-h-screen bg-gray-100 z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-md shadow-lg w-10/12 xl:w-2/3  max-w-[800px] py-2 md:py-4 px-4 md:px-8">
              <div className=" flex justify-between items-center pb-4">
                <div>
                  {hotelName}
                  {" > "}
                  <span className="text-2xl">{roomDetails.name}</span>
                </div>
                <div>
                  <button
                    onClick={closeModal}
                    className="  text-gray-600 hover:text-gray-800"
                  >
                    <CloseIcon size={10} />
                  </button>
                </div>
              </div>
              <div className="flex gap-4 flex-wrap">
                {Array.isArray(roomDetails.amenities) &&
                  roomDetails.amenities?.map((amenity) => (
                    <div
                      key={amenity}
                      className="p-6 border border-blue-500  rounded text-blue-500 flex justify-center items-center text-center"
                    >
                      {amenity}
                    </div>
                  ))}
              </div>

              <div className="mt-4">
                <div>
                  <button
                    onClick={closeModal}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewFacilityModal;
