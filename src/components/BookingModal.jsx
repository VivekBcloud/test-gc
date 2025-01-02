import React, { useState } from "react";
import PersonDetails from "./PersonDetails";

const HotelBookingModal = ({ roomImg }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
      >
        Book Now
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="absolute flex flex-col items-center justify-center min-h-screen bg-gray-100 z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-1/2 p-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Hotel Booking
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Please fill in your details to book the hotel.
              </p>

              {/* Form */}
              <div className="mt-4">
                <div>
                  <div className="mb-4">
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Checkin Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Checkout Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <img src={roomImg} alt="room image" />
                  <PersonDetails />
                </div>

                <button
                  onClick={closeModal}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500"
                >
                  Confirm Booking
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              >
                &times;
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HotelBookingModal;
