import { FaHistory } from "react-icons/fa";
import { BiDollar } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";
import { IoIosHelpCircle, IoMdBook } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

export const Menuitems = [
  {
    id: 1,
    title: "Dashboard",
    link: "/dashboard",
    icon: <FaHistory />,
  },
  {
    id: 2,
    title: "Payments",
    link: "/payments",
    icon: <BiDollar />,
  },
  {
    id: 3,
    title: "Settings",
    link: "/settings",
    icon: <IoSettingsOutline />,
  },
  {
    id: 4,
    title: "Customer Support",
    link: "/support",
    icon: <IoIosHelpCircle />,
  },
  {
    id: 5,
    title: "Back to Applications",
    link: "/dashboard",
    icon: <IoMdBook />,
  },
  {
    id: 6,
    title: "Sign Out",
    link: "/login",
    icon: <CiLogout />,
  },
  // back to applications with log book icon
];
