"use client";
import React, { useEffect } from "react";
import Navbar from "@/components/Header/Navbar";
import HoverDevCards from "@/components/Reusables/HoverCards";
import MediaCenter from "./MediaCenter";
import Recommend from "@/components/Hero/Recommend";
import ApplyNow from "@/components/Hero/ApplyNow";
import Footer from "@/components/Footer/Footer";
import HeroLayout from "@/components/Hero/HeroLayout";
import { getUserDetails } from "@/redux/actions/authActions/getUserDetails.service";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const fetchData = () => {
    getUserDetails(dispatch);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <main className="w-full h-full ">
        <Navbar />
        <HeroLayout />
        <HoverDevCards />
        <Recommend />
        <ApplyNow />
        <MediaCenter />
        <Footer />
      </main>
    </>
  );
};

export default HomePage;
