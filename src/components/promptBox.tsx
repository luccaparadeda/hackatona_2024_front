import React from "react";

interface BoxComponentProps {
  icon: string;
  title: string;
  description: string;
  isSelected: boolean;
  iconBgColor: string;
  className?: string;
}

const BoxComponent: React.FC<BoxComponentProps> = ({
  icon,
  title,
  description,
  isSelected,
  iconBgColor,
  className,
}) => {
  return (
    <div className={className}>
      <div
        className={`flex items-center p-4 border rounded-lg transition-colors duration-300 ${
          isSelected ? "bg-white border-green-300" : "bg-white border-gray-300"
        }`}
      >
        <div
          className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full"
          style={{ backgroundColor: iconBgColor }}
        >
          <span className="text-xl">{icon}</span>
        </div>

        <div className="ml-4 overflow-hidden">
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="mt-2 text-xs font-light text-gray-700 truncate">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BoxComponent;
