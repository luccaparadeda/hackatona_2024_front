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
    <div className="flex flex-col justify-center items-center bg-white h-[64px] w-[124px] border border-[rgba(0,0,0,0.23)] py-[12px] px-[6px] rounded-[6px]">
      <div className="font-semibold text-center text-[12px]">{option}</div>
      <div className="text-center text-[12px]">{text}</div>
    </div>
  );
}
