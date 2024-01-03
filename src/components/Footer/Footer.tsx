import React from "react";
import { BsLinkedin, BsFacebook } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="flex justify-between items-center bg-[#0d7836] py-3 gap-3 md:gap-5 mx-0 md:mx-auto px-5 md:px-18 lg:px-20 md:flex-row flex-col mt-5">
      <span className="text-white text-center">
        &copy; 2023{" "}
        <a href="https://github.com/trillionclues" target="_blank">
          Trillionclues Inc.
        </a>
      </span>
      <ul className="flex gap-3">
        <li>
          <a href="/about" className="text-white hover:text-white transition">
            About Us
          </a>
        </li>
        <li>
          <a href="/contact" className="text-white hover:text-white transition">
            Contact
          </a>
        </li>
        <li>
          <a
            href="/aappointment"
            className="text-white hover:text-white transition"
          >
            Appointments
          </a>
        </li>
      </ul>

      <ul className="flex gap-4">
        <li>
          <BsFacebook className="text-lg text-black hover:text-white transition cursor-pointer" />
        </li>
        <li>
          <BsLinkedin className="text-lg text-black hover:text-white transition cursor-pointer" />
        </li>
        <li>
          <AiFillInstagram className="text-xl text-black hover:text-white transition cursor-pointer" />
        </li>
      </ul>
    </footer>
  );
}
