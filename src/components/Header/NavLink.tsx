import { NavProps } from "@/types/NavProps.module";
import Link from "next/link";
import React from "react";

const NavLinks: React.FC<NavProps> = ({ navlink: { id, title, url } }) => {
  return (
    <Link key={id} href={url}>
      {title}
    </Link>
  );
};

export default NavLinks;
