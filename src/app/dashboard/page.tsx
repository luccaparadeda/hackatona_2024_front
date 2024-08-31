"use client";
import ImportIcon from "@/assets/ImportIcon";
import TrashIcon from "@/assets/TrashIcon";
import ChevronDown from "@/components/ChevronDown";
import DropdownContextMenu from "@/components/DropdownContextMenu";
import { Button } from "@/components/ui/button";
import CategoriesBox from "@/components/ui/categoriesBox";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

const fileMocks = [
  { name: "Guia de Incêndio" },
  { name: "Guia de Incêndio" },
  { name: "Guia de Incêndio" },
  { name: "Guia de Incêndio" },
  { name: "Guia de Incêndio" },
  { name: "Guia de Incêndio" },
  { name: "Guia de Incêndio" },
];
export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="h-full w-full overflow-y-auto p-6">
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
        <div className="flex gap-4 overflow-x-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <CategoriesBox
              bgColor="#ff0000"
              icon="🔥"
              iconBgColor="#aa0000"
              quantity={2}
              title=""
            />
          ))}
        </div>
      </div>
      <div className="shadow-lg rounded-3xl p-8 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="font-semibold text-lg">Arquivos - Incêndio</div>
          <Button variant="outline">
            <ImportIcon />
            Importar
          </Button>
        </div>
        <div className="grid grid-cols-[1fr_10fr_1fr]">
          <div className="text-gray-400 py-3">#</div>
          <div className="text-gray-400 py-3">Nome</div>
          <div className="text-gray-400 text-center py-3">Deletar</div>
          {fileMocks.map((file, i) => (
            <Fragment>
              <div className="border-t border-gray-300 py-3">
                {i.toString().padStart(2, "0")}
              </div>
              <div className="border-t border-gray-300 py-3">{file.name}</div>
              <div className="flex justify-center border-t border-gray-300 py-3">
                <TrashIcon />
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
