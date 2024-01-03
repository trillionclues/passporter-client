import React from "react";

interface InfoListItemProps {
  title: string;
  value: string;
  icon: JSX.Element;
}

const InfoListItem: React.FC<InfoListItemProps> = ({ title, value, icon }) => (
  <li className="flex items-center space-x-2">
    <span className="font-semibold">{title}:</span>
    <span className="text-sm">{value}</span>
  </li>
);

export default InfoListItem;
