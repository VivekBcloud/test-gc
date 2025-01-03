import React, { useState } from "react";
import { ArrowLongRightIcon, CloseIcon } from "../../../components/SvgIcons";

const ViewFacilityModal = ({ roomDetails, hotelName = "" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { amenities } = roomDetails;
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
        className=" flex items-center justify-center min-w-fit gap-2 flex-1 p-2  border border-blue-500 text-blue-500 rounded hover:border-blue-600 hover:text-blue-600 text-sm"
      >
        View Facilities
        <ArrowLongRightIcon />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className=" fixed inset-0 bg-black bg-opacity-20 backdrop-blur flex flex-col items-center justify-center z-10">
          <div className="bg-white rounded-md shadow-lg w-10/12 xl:w-2/3  max-w-[800px] py-2 md:py-4 px-4 md:px-8">
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
                  <CloseIcon size={10} />
                </button>
              </div>
            </div>
            <div className="flex gap-4 flex-wrap py-8">
              {Array.isArray(amenities) &&
                amenities?.map((amenity) => (
                  <div
                    key={amenity}
                    className="p-6 border-2 border-blue-500  rounded text-blue-500 flex justify-center items-center text-center hover:shadow-md  hover:shadow-blue-500 transition-shadow"
                  >
                    {amenity}
                  </div>
                ))}
            </div>

            <div className="mt-4">
              <div>
                <button
                  onClick={closeModal}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewFacilityModal;
