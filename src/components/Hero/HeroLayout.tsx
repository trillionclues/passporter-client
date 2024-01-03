import React from "react";
import Link from "next/link";

const HeroLayout = () => {
  return (
    <div className="relative overflow-hidden h-screen">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0d7836] to-black opacity-80"></div>
      <img
        src="/images/main.jpeg"
        alt=""
        className="w-full h-screen object-cover"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-10 text-center w-full md:w-auto">
        <h1 className="md:text-3xl text-2xl text-uppercase font-bold mb-3">
          Explore the World with Your Passport
        </h1>
        <p className="font-light text-md text-center mb-3 tracking-wider mx-auto md:px-0 px-10">
          Get ready to embark on a journey of a lifetime with your passport.
          Discover new destinations, experience diverse cultures.
        </p>
        <Link href="#recommend">
          <button className="px-6 py-4 bg-white text-blue-500 border border-white cursor-pointer text-lg font-normal tracking-wide transition-all duration-300 uppercase hover:bg-transparent hover:border-white hover:text-white mt-3">
            Explore Recommendations
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HeroLayout;
