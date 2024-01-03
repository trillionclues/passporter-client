"use client";
import React, { useEffect, useState } from "react";
import { destination, locations } from "./Destination";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

const Recommend = () => {
  const [active, setActive] = useState(1);
  const [displayedDestinations, setDisplayedDestinations] = useState<
    typeof destination
  >([]);
  const initialDisplayCount = 6;

  const loadMoreDestinations = () => {
    setDisplayedDestinations(
      destination.slice(0, displayedDestinations.length + initialDisplayCount)
    );
  };

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    if (active >= 0) {
      const filteredDestinations = destination.filter(
        (destination) => destination.area === locations[active]
      );
      setDisplayedDestinations(
        filteredDestinations.slice(0, initialDisplayCount)
      );
    }
  }, [active]);

  return (
    <section className="py-8 mt-10" id="recommend">
      <div className="text-center">
        <h2 className="md:text-3xl text-2xl font-semibold">
          Recommended <span className="text-[#0d7836]"> Destinations</span>
        </h2>
      </div>
      <div className="text-center mt-4 mx-auto px-3 md:px-15 lg:px-18">
        <ul className="flex justify-center items-center text-sm">
          {locations.map((loc, idx) => (
            <li
              key={idx}
              onClick={() => setActive(idx)}
              className={`${
                active === idx ? "border-b-2 border-[#0d7836]" : ""
              } cursor-pointer py-2 px-4 text-md text-gray-700 hover:border-b-2 hover:border-[#0d7836]`}
            >
              {loc}
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 mx-auto px-5 md:px-18 lg:px-20">
        {" "}
        {displayedDestinations.map((destination, index) => (
          <div
            key={index}
            className="destination bg-white p-4 rounded-lg shadow-lg flex flex-col"
            data-aos="fade-left"
            data-aos-delay={`${(index % 3) * 100}`}
          >
            <div className="relative w-full h-60">
              <Image
                src={destination.image}
                alt="Destination Image"
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>

            <div className="flex-grow p-4">
              <h3 className="text-xl font-semibold mt-2">
                {destination.title}
              </h3>
              <p>{destination.subTitle}</p>
              <div className="flex justify-between mt-2">
                <span>1000km</span>
                <span>{destination.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {displayedDestinations.length < destination.length && (
        <div className="text-center mt-6">
          <button
            className="bg-[#0d7836] text-white py-2 px-4 rounded-md hover:bg-gray-500"
            onClick={loadMoreDestinations}
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default Recommend;
