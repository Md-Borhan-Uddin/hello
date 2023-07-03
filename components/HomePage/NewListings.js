import React from "react";

import CardComponent from "./CardComponent";
const NewListings = ({cards}) => {
  
  return (
    <div>
      {/* Title */}
      <div className="mx-8 mt-10  ">
        <p className="text-[18.5px] font-medium ">
          New Listings in Spokeane, WA
        </p>
        <p className="text-blue-600 text-[15px]">View All 160 New Listings</p>
      </div>
      {/* Listings */}
      <div className="">
        {cards.map((card) => (
          <CardComponent />
        ))}
      </div>
    </div>
  );
};

export default NewListings;
