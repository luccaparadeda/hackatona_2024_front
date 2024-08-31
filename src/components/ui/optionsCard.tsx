export default function OptionsCard({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col justify-center text-center items-center bg-white h-24 w-32 border border-[#00000044] p-2 rounded-md"
    >
      <div className="text-center text-xs">{text}</div>
    </div>
  );
}
