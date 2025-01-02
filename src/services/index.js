import axios from "../config/axios.";

export const fetchHotels = async (params) => {
  const { data } = await axios.get(`/hotels`, {
    params: {
      ...params,
    },
  });
  console.log({ data });
  return data?.hotels;
};

export const fetchHotelDetails = async (hotelId) => {
  const { data } = await axios.get(`/hotels/${hotelId}`);
  console.log({ data });
  return data?.hotel;
};

/* Genre */
export const fetchHotelNames = async () => {
  const { data } = await axios.get(`/hotels-name`);
  console.log({ data });
  return data;
};

export function getPriceRanges(roomList) {
  if (!roomList?.length) return { lowest: 0, highest: 0 };
  const lowestPriceRoom = Math.min(...roomList.map((room) => room.price));
  const highestPriceRoom = Math.max(...roomList.map((room) => room.price));
  return { lowest: lowestPriceRoom, highest: highestPriceRoom };
}
