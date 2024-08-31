interface CategoryBoxProps {
  icon: string;
  title: string;
  quantity: number;
  iconBgColor: string;
  bgColor: string;
}

export default function CategoryBox({
  icon,
  title,
  quantity,
  iconBgColor,
  bgColor,
}: CategoryBoxProps) {
  return (
    <div
      className="flex flex-col items-start p-4 rounded-2xl transition-colors duration-300 min-w-44 min-h-44"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full mb-4"
        style={{ backgroundColor: iconBgColor }}
      >
        <span className="text-xl">{icon}</span>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div>
        <p className="text-sm font-light text-gray-700">
          {quantity + " arquivo" + (quantity > 1 ? "s" : "")}
        </p>
      </div>
    </div>
  );
}
