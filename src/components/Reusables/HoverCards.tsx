import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import { FiCreditCard, FiMail, FiUser, FiUsers } from "react-icons/fi";
import NoSSR from "./NoSSRWrapper";

const hoverColor = "#0d7836";

const HoverDevCards = () => {
  return (
    <div className="p-4 pt-4 mx-auto px-5 md:px-18 lg:px-20">
      <h2 className="text-xl font-semibold py-8 underline">
        Domestic Passport Application Portal
      </h2>
      <div className="grid gap-3 grid-cols-1 lg:grid-cols-3">
        <NoSSR>
          <Card
            title="Passport"
            subtitle="You can now apply for a Nigerian passport online. Very simple and easy to use."
            href="/passport"
            Icon={FiUser}
          />

          <Card
            title="Visa"
            subtitle="Application for Nigerian Visas can now be completed online from anywhere on the globe"
            href="/visa"
            Icon={FiMail}
          />
          <Card
            title="ETC"
            subtitle="ECOWAS Travel Certificate issued to Nigerians traveling to ECOWAS members states."
            href="#"
            Icon={FiUsers}
          />
          <Card
            title="ERC"
            subtitle="Residence Visa allows individuals to reside in Nigeria for a period not exceeding two years."
            href="#"
            Icon={FiCreditCard}
          />
          <Card
            title="Tourism"
            subtitle="Work at holiday destinations in Abuja & Lagos! Check your eligibility for travel visa here."
            href="#"
            Icon={FiCreditCard}
          />
          <Card
            title="Naturalization"
            subtitle="Check your eligibility for naturalization, complete the form and upload your data."
            href="#"
            Icon={FiCreditCard}
          />
        </NoSSR>
      </div>
    </div>
  );
};

interface CardType {
  title: string;
  subtitle: string;
  Icon: IconType;
  href: string;
}

const Card = ({ title, subtitle, Icon, href }: CardType) => {
  return (
    <a
      href={href}
      className="w-full p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d7836] to-indigo-600 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />

      <div className="flex flex-row gap-3">
        <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-slate-100 group-hover:text-violet-400 group-hover:rotate-12 transition-transform duration-300" />
        <Icon className="mb-2 text-2xl text-[#0d7836] group-hover:text-white transition-colors relative z-10 duration-300" />
        <h3 className="font-medium text-lg text-slate-950 group-hover:text-white relative z-10 duration-300">
          {title}
        </h3>
      </div>
      <p className="text-slate-400 group-hover:text-violet-200 relative z-10 duration-300">
        {subtitle}
      </p>
      <div className="flex flex-end pt-1">
        <Link href="">Apply now</Link>
      </div>
    </a>
  );
};

export default HoverDevCards;
