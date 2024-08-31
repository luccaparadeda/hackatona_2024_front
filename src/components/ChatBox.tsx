import BrainIcon from "@/assets/BrainIcon";
import UserIcon from "@/assets/UserIcon";
import { Fragment } from "react";

export default function ChatBox({
  children,
  fromUser,
}: {
  children: React.ReactNode;
  fromUser: boolean;
}) {
  return (
    <div className="flex w-4/5 bg-red-500 rounded-md">
      {children}
      <div>{fromUser ? <UserIcon /> : <BrainIcon />}</div>
    </div>
  );
}
