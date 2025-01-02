import React from "react";
import { Link } from "react-router";
import { ArrowLongRightIcon, SolidStartIcon } from "./SvgIcons";

const HotelCards = ({ details }) => {
  return (
    <div className="p-4 border border-gray-300 rounded-sm">
      <img
        className="w-full aspect-square object-cover"
        src={details?.image_url}
        alt={details?.name}
      />
      <div>
        <div className="flex justify-between pt-2">
          <div>{details?.name}</div>
          <div className="flex items-center gap-1 text-xs ">
            <SolidStartIcon />
            <div>{details?.rating}</div>
          </div>
        </div>
        <div className="text-xs">{details?.city}</div>
        <div className="flex justify-between items-center pt-2">
          <div className="font-bold">
            {`₹ ${details?.lowestPrice ?? ""} - ${details?.highestPrice ?? ""}`}
          </div>
          <Link
            className="flex gap-2 items-center  bg-blue-500 rounded-sm px-6 py-1 text-white text-sm hover:bg-blue-600"
            to={`hoteldetails/${details?.id}`}
          >
            View
            <ArrowLongRightIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCards;
