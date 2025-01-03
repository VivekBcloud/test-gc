import React from "react";
import ImageCarousel from "./ImageCarousel";
import HotelBookingModal from "./BookingModal";
import { UsersIcon } from "./SvgIcons";
import ViewFacilityModal from "./ViewFacilityModal";

const RoomCards = ({ roomDetails, hotelName }) => {
  console.log("roomdata", roomDetails);
  return (
    <div className="p-4 border rounded border-gray-300">
      <ImageCarousel images={roomDetails?.image_urls} />
      <div className="flex items-center justify-between py-4">
        <div className="text-xl">{roomDetails?.name}</div>
        <div className="flex gap-1 items-center ">
          <span className="text-gray-500">
            <UsersIcon />
          </span>
          2
        </div>
      </div>
      <div className="pb-4">
        <span className="font-bold text-lg">
          {`₹ ${roomDetails?.price} / `}
        </span>

        <span className="text-sm">night</span>
      </div>
      <div className="flex flex-wrap gap-3">
        <ViewFacilityModal roomDetails={roomDetails} hotelName={hotelName} />
        <HotelBookingModal roomDetails={roomDetails} hotelName={hotelName} />
      </div>
    </div>
  );
};

export default RoomCards;
