import { FaHistory } from "react-icons/fa";
import { BiDollar } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";
import { IoIosHelpCircle, IoMdBook } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

// include role upgrade rquest, dashboard, settings, and more
export const AdminMenuitems = [
  {
    id: 1,
    title: "Dashboard",
    link: "/admin-dashboard",
    icon: <FaHistory />,
  },
  {
    id: 2,
    title: "Payments",
    link: "/admin-dashboard/payments",
    icon: <BiDollar />,
  },
  {
    id: 3,
    title: "Settings",
    link: "/admin-dashboard/settings",
    icon: <IoSettingsOutline />,
  },
  {
    id: 4,
    title: "Role Upgrade Requests",
    link: "/admin-dashboard/role-requests",
    icon: <IoIosHelpCircle />,
  },
  {
    id: 5,
    title: "Sign Out",
    link: "/login",
    icon: <CiLogout />,
  },
];
