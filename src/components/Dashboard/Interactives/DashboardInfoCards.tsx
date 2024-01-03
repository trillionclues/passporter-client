import React from 'react'

interface DashboardCardsProps {
    title: string
    value: string
    icon: JSX.Element
}

const DashboardInfoCards: React.FC<DashboardCardsProps> = ({ title, icon, value }) => {

    return (
      <div className="bg-[#e2f1ef] p-4 rounded shadow-md flex items-center hover:bg-[#0d7836] hover:text-white">
        {icon}
        <div>
          <p className="text-lg font-semibold mb-2">{title}</p>
          <p className="text-md">{value}</p>
        </div>
      </div>
    );
  };

  export default DashboardInfoCards