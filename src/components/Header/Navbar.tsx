"use client";

import React, { useState, useEffect } from "react";
import NavLinks from "./NavLink";
import Image from "next/image";
import Link from "next/link";
import NavData from "./navlinks.json";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import NavAvatar from "./NavAvatar";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const closeMobileMenuOnResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("resize", closeMobileMenuOnResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", closeMobileMenuOnResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`py-3 ${
          isScrolled
            ? "fixed top-0 left-0 right-0 bg-[#0d7836] z-20"
            : "bg-white"
        }`}
      >
        <div className="container mx-auto px-5 md:px-18 lg:px-20">
          <div className="flex flex-row justify-between items-center">
            <Link
              href="/"
              className="logo-container flex pt-1 flex-col items-start justify-start"
            >
              <Image
                src="/images/nis-logo.png"
                alt="nis logo"
                width={100}
                height={100}
                className="object-contain"
                priority
              />
            </Link>
            <div className="hidden md:flex flex-row justify-center align-center lg:gap-3 md:gap-0 gap-1">
              {NavData.map((link, idx) => {
                return (
                  <div
                    key={link.id}
                    className={`${
                      activeLink === link.url
                        ? "border-b-2 border-[#0d7836]"
                        : ""
                    } cursor-pointer py-1 lg:px-4 lg:text-md md:px-[8px] text-md ${
                      isScrolled ? "text-white border-none" : "text-gray-700"
                    } hover:border-b-2 hover:border-[#0d7836]`}
                    onClick={() => setActiveLink(link.url)}
                  >
                    <NavLinks navlink={link} />
                  </div>
                );
              })}
            </div>
            <NavAvatar
              scrolled={isScrolled}
              toggleMenu={toggleMobileMenu}
              mobileMenuOpen={isMobileMenuOpen}
            />
          </div>
        </div>

        <div
          className={`md:hidden fixed top-0 left-0 right-0 bottom-0 transition-transform duration-300 ease-in-out transform ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } z-20 bg-white`}
        >
          <div className="p-4">
            {NavData.map((link) => (
              <div
                key={link.id}
                className={`font-medium cursor-pointer py-3 px-4 flex items-center hover:bg-[#F8F9FA] ${
                  activeLink === link.url
                    ? `bg-[#0d7836] text-white`
                    : `text-[#0d7836]`
                }`}
                onClick={() => {
                  setActiveLink(link.url);
                  toggleMobileMenu();
                }}
              >
                <Link href={link.url} className="hover:text-black">
                  {link.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
