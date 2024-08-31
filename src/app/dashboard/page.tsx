"use client";
import ChevronDown from "@/components/ChevronDown";
import DropdownContextMenu from "@/components/DropdownContextMenu";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="h-full w-full overflow-y-auto px-6 pt-6">
      <div className="justify-between flex">
        <span className="font-semibold text-4xl">Dashboard</span>
        <DropdownContextMenu
          options={[
            { label: "Fazer Logout", onClick: () => router.replace("/login") },
          ]}
        >
          <div className="text-sm font-semibold flex gap-2 items-center">
            example@gmail.com
            <ChevronDown />
          </div>
          <div className="text-sm">Admin</div>
        </DropdownContextMenu>
      </div>
      <div className="shadow-lg rounded-3xl p-8 flex flex-col gap-12">
        <div>
          <div className="font-semibold text-lg">Categorias</div>
          <div className="text-gray-500 font-medium">
            Categorias Disponíveis
          </div>
        </div>
        <div className="flex gap-8 overflow-x-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div key={i} className="min-w-44 h-44 bg-red-200 rounded-xl"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
