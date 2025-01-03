import React, { useEffect } from "react";
import { Link, useParams } from "react-router";
import { fetchHotelDetails } from "../../services";
import Loading from "../../components/Loading";
import {
  ArrowLongLeftIcon,
  LocationIcon,
  SolidStarIcon,
} from "../../components/SvgIcons";
import RoomCards from "./components/RoomCards";

const HotelDetails = () => {
  const { hotelId } = useParams();
  const [details, setDetails] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch hotel details from API
      try {
        setIsLoading(true);
        const data = await fetchHotelDetails(hotelId);
        setDetails(data);
      } catch (err) {
        console.error("Error fetching hotel details:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [hotelId]);

  if (isLoading) return <Loading />;

  return (
    <div>
      <div
        className="relative py-28 mb-8"
        style={{
          backgroundImage: `url(${details?.image_url})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60 iso"></div>
        <div className="isolate">
          <Link to="/" className="absolute left-0 top-0 p-4">
            <div className="flex items-center justify-center w-10 h-10 bg-white bg-opacity-60 rounded-full text-blue-500 hover:bg-opacity-80 transition-all">
              <ArrowLongLeftIcon />
            </div>
          </Link>
          <div className="flex flex-col gap-2 items-center justify-center text-white">
            <div className="text-4xl">{details?.name}</div>
            <div className="flex gap-2 mt-4">
              <div className="flex gap-1 items-center text-sm">
                <LocationIcon size={5} />
                {details?.city}
              </div>
              <div className="flex gap-1 items-center">
                <SolidStarIcon size={4} />
                <span className="text-sm">{details?.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 p-4">
        {details?.rooms?.map((room) => (
          <RoomCards
            key={room?.id}
            roomDetails={room}
            hotelName={details?.name}
          />
        ))}
      </div>
      <div className="p-4">
        <div className="text-xl py-4">About the {details?.name}</div>
        <p className="text-sm leading-[22px]">{details?.description}</p>
      </div>
    </div>
  );
};

export default HotelDetails;
