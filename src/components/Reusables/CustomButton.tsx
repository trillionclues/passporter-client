"use client";

import Link from "next/link";

interface CustomButtonProps {
  text: string;
  href: string;
  icon?: React.ReactElement;
  className: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  href,
  icon,
  className,
  onClick,
}) => {
  if (onClick) {
    return (
      <button onClick={onClick} className={className}>
        <span className={className}>{text}</span>
        {icon}
      </button>
    );
  } else {
    return (
      <Link href={href} passHref legacyBehavior>
        <a className={className}>
          <span className={className}>{text}</span>
          {icon}
        </a>
      </Link>
    );
  }
};

export default CustomButton;
