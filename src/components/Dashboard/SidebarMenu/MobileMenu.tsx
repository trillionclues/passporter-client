import React from "react";
import { Menuitems } from "@/lib/Menuitems";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setActiveNav } from "@/redux/features/fetchApplicationDetailsSlice";
import userGreeting from "@/utils/greeting-profile";

const MobileMenu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const { activeNav } = useSelector(
    (state: RootState) => state.singleApplication
  );
  const { userData } = useSelector((state: RootState) => state.userData);

  const applicationId =
    pathname?.split("/").length > 2 ? pathname?.split("/")[2] : null;

  return (
    <div className="flex flex-col gap-4 p-4 z-[999]">
      <div className="flex items-center justify-between mb-4 flex-col">
        <h1 className="text-lg font-semibold px-3 py-3 text-[#072F5F]">
          {`${userGreeting}, ${userData?.getApplicant.firstname}`} &#128075;
        </h1>

        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-2 rounded-md border border-gray-300 w-full mb-4"
        />
      </div>
      {Menuitems.map((item) => (
        <Link
          href={
            item.title === "Sign Out" || item.title === "Back to Applications"
              ? item.link
              : `${item.link}/${applicationId}`
          }
          key={item.id}
        >
          <button
            className={`flex items-center gap-3 rounded-md px-3 py-2 w-full hover:bg-gray-300 text-[#072F5F] ${
              activeNav === item.id
                ? "bg-gray-300 text-white"
                : "text-[#072F5F]"
            }`}
            onClick={() => dispatch(setActiveNav(item.id))}
          >
            <div className="text2xl">{item.icon}</div>
            <p>{item.title}</p>
          </button>
        </Link>
      ))}
    </div>
  );
};

export default MobileMenu;
