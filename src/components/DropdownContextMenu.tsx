import { Fragment, useState } from "react";

interface Option {
  label: string;
  onClick: () => void;
}

export default function DropdownContextMenu({
  options,
  children,
}: {
  options: Option[];
  children: React.ReactNode;
}) {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  return (
    <Fragment>
      <div className="px-2 relative">
        <button onClick={() => setIsOptionsOpen(true)}>{children}</button>
        {isOptionsOpen && (
          <div
            className={
              "absolute bg-white border-gray-400 border rounded-lg flex flex-col z-20 overflow-hidden whitespace-nowrap" +
              (isOptionsOpen ? "" : "hidden")
            }
          >
            {options.map((option) => (
              <button
                className="px-10 py-2 border-b hover:bg-gray-100 "
                onClick={() => {
                  setIsOptionsOpen(false);
                  option.onClick();
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {isOptionsOpen && (
        <div
          className="fixed h-screen w-screen z-10 right-0 top-0"
          onClick={() => setIsOptionsOpen(false)}
        ></div>
      )}
    </Fragment>
  );
}
