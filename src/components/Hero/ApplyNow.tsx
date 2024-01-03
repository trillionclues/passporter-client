import React, { useEffect } from "react";
import Image from "next/image";
import CustomButton from "../Reusables/CustomButton";
import { BsArrowUpRight } from "react-icons/bs";
import AOS from "aos";
import "aos/dist/aos.css";

const ApplyNow = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="bg-white pt-8 mx-0 md:mx-auto px-5 md:px-18 lg:px-20 flex md:flex-row flex-col items-start gap-5 my-5">
      <div className="md:w-1/2 w-full" data-aos="fade-right">
        <div className="relative overflow-hidden border-4 border-[hsl(185, 57%, 50)] rounded-t-lg">
          <Image
            src="/images/flag-img.png"
            alt="Nigerian flag image"
            layout="responsive"
            width={400}
            height={300}
          />
        </div>
      </div>
      <div className="md:w-1/2 w-full">
        <h2 className="text-3xl font-semibold mb-12 text-start">
          Document for Nigerians valid for travel within ECOWAS countries
        </h2>
        <p className="text-gray-600">
          Get the travel document that proves you are a citizen of the West
          African Community. The 2-year validity certificate is valid for travel
          across the region.
          <br />
          <br />
          Non-Nigerian ECOWAS citizens and foreigners may also apply for
          resident permits.
        </p>
        <CustomButton
          text="Apply Now"
          href="/passport"
          icon={<BsArrowUpRight />}
          className="flex flex-row gap-2 bg-[#0d7836] text-white py-2 px-3 rounded-md hover:bg-gray-500 w-36 mt-12"
        />
      </div>
    </div>
  );
};

export default ApplyNow;
