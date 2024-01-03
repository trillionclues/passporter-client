import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

const MediaCenter = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="mx-auto px-5 md:px-18 lg:px-20 my-10 pt-10">
      <h2 className="text-3xl font-semibold">Media Center</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white border p-4 rounded-lg" data-aos="flip-up">
          <h2 className="text-xl font-semibold mb-2">
            Passport backlog is now a thing of the past – NIS
          </h2>
          <p>
            The Nigerian Immigration Service (NIS) has urged Nigerians who
            applied for International Passports and are yet to collect to visit
            the passports offices for collection as backlog has been cleared.
          </p>
          <p className="text-sm text-gray-500">October 2nd, 2023</p>
          <a
            href="/learn-more"
            className="text-green-600 font-semibold mt-auto"
          >
            Learn More
          </a>
        </div>

        <div className="bg-white border p-4 rounded-lg" data-aos="flip-up">
          <h2 className="text-xl font-semibold mb-2">
            Passport Payment Disclaimer
          </h2>
          <p className="mb-5">
            It is a criminal offence to be in possession of multiple copies of
            valid passports, or a crime to apply for such. NIS strongly
            discourages the use of touts or agents for passport applications.
          </p>
          <p className="text-sm text-gray-500">November 2nd, 2022</p>
          <a
            href="/learn-more"
            className="text-green-600 font-semibold mt-auto"
          >
            Learn More
          </a>
        </div>

        <div className="bg-white border p-4 rounded-lg" data-aos="flip-up">
          <h2 className="text-xl font-semibold mb-2">
            Passport Production Timelines
          </h2>
          <p className="mb-2">
            Average Passport Processing times take up to 3 weeks for
            renewals/reissue and up to 6 weeks for first-time applicants. Lorem
            ipsum dolor sit amet consectetur, adipisicing elit. Voluptas, id.
          </p>
          <p className="text-sm text-gray-500 py-1">September 21st, 2021</p>
          <Link
            href="learn-more"
            className="text-green-600 font-semibold mt-auto"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MediaCenter;
