import Link from "next/link";
import React from "react";

interface CustomHeaderProps {
  headerText: string;
  paraText: string;
  className: string;
}

const FormHeader: React.FC<CustomHeaderProps> = ({
  headerText,
  paraText,
  className,
}) => {
  return (
    <>
      <div className="flex flex-col text-center justify-center items-center">
        <Link href="/">
          <h2 className="font-bold text-[#0d7836] text-2xl text-center">
            PASSPORTER
          </h2>
        </Link>
        <div className="brush-underline pl-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 10"
            width="100%"
            height="10"
          >
            <path
              d="M0 0 C 20 10 40 10 60 0"
              stroke="#000"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      </div>
      <h1 className="font-bold text-lg mt-5 text-[#0d7836]">{headerText}</h1>
      <p className={className}>{paraText}</p>
    </>
  );
};

export default FormHeader;
