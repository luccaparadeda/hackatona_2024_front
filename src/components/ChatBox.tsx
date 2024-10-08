import BrainIcon from "@/assets/BrainIcon";
import UserIcon from "@/assets/UserIcon";

export default function ChatBox({
  children,
  fromUser,
}: {
  children: React.ReactNode;
  fromUser: boolean;
}) {
  return (
    <div
      className={`flex w-4/5 rounded-md p-1 gap-1 text-xs
        ${
          fromUser
            ? "ml-auto bg-chatTextGray "
            : "bg-chatGreen flex-row-reverse"
        }`}
    >
      <div className="flex-1 p-1">{children}</div>
      <div className="p-1 self-center">
        {fromUser ? <UserIcon /> : <BrainIcon />}
      </div>
    </div>
  );
}
