import React, { useEffect, useRef } from "react";
import HotelCard from "./HotelCard";
import Loading from "../../../components/Loading";

const HotelCardList = ({ filteredPaginatedHotels, isLoading, currentPage }) => {
  const containerRef = useRef(null);

  const handleScrollToContainer = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    console.log("called");
    handleScrollToContainer();
  }, [currentPage]);
  if (isLoading) return <Loading />;
  return (
    <div
      className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 "
      ref={containerRef}
    >
      {filteredPaginatedHotels.length > 0 ? (
        filteredPaginatedHotels.map((item) => (
          <HotelCard key={item?.id} details={item} />
        ))
      ) : (
        <div className="py-5">No results found</div>
      )}
    </div>
  );
};

export default HotelCardList;
