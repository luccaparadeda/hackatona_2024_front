export default function OptionsCard({
  option,
  text,
  onClick,
}: {
  option: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <div className="flex flex-col justify-center text-center items-center bg-white h-16 w-32 border border-[#00000044] p-2 rounded-md">
      <div className="font-semibold  text-xs">{option}</div>
      <div className="text-center text-xs">{text}</div>
    </div>
  );
}
