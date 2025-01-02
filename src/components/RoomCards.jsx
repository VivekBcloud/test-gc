import React from "react";
import ImageCarousel from "./ImageCarousel";
import HotelBookingModal from "./BookingModal";

const RoomCards = ({ roomDetails }) => {
  return (
    <div>
      <ImageCarousel images={roomDetails?.image_urls} />
      <HotelBookingModal roomImg={roomDetails?.image_urls[0]} />
    </div>
  );
};

export default RoomCards;
