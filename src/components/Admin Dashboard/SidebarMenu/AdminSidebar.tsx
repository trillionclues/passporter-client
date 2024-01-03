import React from "react";
import Image from "next/image";
import { AdminMenuitems } from "@/lib/AdminMenuItems";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { setActiveNav } from "@/redux/features/fetchApplicationDetailsSlice";
import userGreeting from "@/utils/greeting-profile";

const AdminSidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { activeNav } = useSelector(
    (state: RootState) => state.singleApplication
  );
  const { userData } = useSelector((state: RootState) => state.userData);

  return (
    <div className="flex flex-col justify-start items-start h-full bg-white gap-6">
      <div className="px-4 md:px-8">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/images/nis-logo.png"
            alt="tiquette logo"
            className="object-contain m-4"
            height={150}
            width={150}
          />
        </Link>
      </div>

      <section className="flex flex-col gap-2 w-full mx-8">
        {/* welcome with name */}
        <h1 className="text-lg font-semibold px-3 py-3 text-[#072F5F]">
          {`${userGreeting}, ${userData?.getApplicant.firstname}`} &#128075;
        </h1>

        {/* menu items */}
        {AdminMenuitems.map((item) => (
          <Link href={item.link} key={item.id}>
            <button
              className={`flex flex-row items-center gap-3 rounded-md px-3 py-3 w-full hover:bg-gray-300 text-[#072F5F] ${
                activeNav === item.id
                  ? "bg-gray-300 text-white"
                  : "text-[#072F5F]"
              }`}
              onClick={() => dispatch(setActiveNav(item.id))}
            >
              <div className="text-2xl">{item.icon}</div>
              <p>{item.title}</p>
            </button>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default AdminSidebar;
