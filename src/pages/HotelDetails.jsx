import React, { useEffect } from "react";
import { Link, useParams } from "react-router";
import { fetchHotelDetails } from "../services";
import RoomCards from "../components/RoomCards";

const HotelDetails = () => {
  const { hotelId } = useParams();
  const [details, setDetails] = React.useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch hotel details from API
      try {
        const data = await fetchHotelDetails(hotelId);
        setDetails(data);
      } catch (err) {
        console.error("Error fetching hotel details:", err);
      }
    };
    fetchData();
  }, [hotelId]);

  return (
    <div>
      <div
        className="py-20 "
        style={{
          background: `url(${details?.image_url})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Link to="/">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-400 rounded-full text-white">
            {"<"}
          </div>
        </Link>
        <div className="flex flex-row items-center justify-center">
          <h2>{details?.name}</h2>
          <div>
            <div>{details?.city}</div>
            <div>{details?.rating}</div>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        {details?.rooms?.map((room) => (
          <RoomCards key={room?.id} roomDetails={room} />
        ))}
      </div>
    </div>
  );
};

export default HotelDetails;
