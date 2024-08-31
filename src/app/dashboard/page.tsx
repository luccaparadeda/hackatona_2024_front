"use client";
import TrashIcon from "@/assets/TrashIcon";
import CategoryBox from "@/components/CategoryBox";
import ChevronDown from "@/components/ChevronDown";
import DropdownContextMenu from "@/components/DropdownContextMenu";
import { FileUpload } from "@/components/FileUpload";
import Modal from "@/components/Modal";
import { useAuth } from "@/hooks/useAuth";
import { Fragment, useState } from "react";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { signOut } = useAuth();

  async function trySignOut(): Promise<void> {
    await signOut();
  }

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="h-full w-full overflow-y-auto p-6">
      <div className="justify-between flex">
        <span className="font-semibold text-4xl">Dashboard</span>
        <DropdownContextMenu
          options={[{ label: "Fazer Logout", onClick: () => trySignOut() }]}
        >
          <div className="text-sm font-semibold flex gap-2 items-center">
            example@gmail.com
            <ChevronDown />
          </div>
          <div className="text-sm">Admin</div>
        </DropdownContextMenu>
      </div>
      <div className="shadow-lg rounded-3xl p-8 flex flex-col gap-4">
        <div>
          <div className="font-semibold text-lg">Categorias</div>
          <div className="text-gray-500 font-medium">
            Categorias Disponíveis
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <CategoryBox
              key={i}
              bgColor="#ff0000"
              icon="🔥"
              iconBgColor="#aa0000"
              quantity={2}
              title="Teste123"
            />
          ))}
        </div>
      </div>
      <div className="shadow-lg rounded-3xl px-8 pt-8 pb-2 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="font-semibold text-lg">Arquivos - Incêndio</div>
          <FileUpload />
        </div>
        <div className="grid grid-cols-[1fr_10fr_1fr]">
          <div className="text-gray-400 py-3">#</div>
          <div className="text-gray-400 py-3">Nome</div>
          <div className="text-gray-400 text-center py-3">Deletar</div>
          {fileMocks.map((file, i) => (
            <Fragment key={i}>
              <div className="border-t border-gray-300 py-3">
                {i.toString().padStart(2, "0")}
              </div>
              <div className="border-t border-gray-300 py-3">{file.name}</div>
              <div
                className="flex justify-center border-t border-gray-300 py-3 cursor-pointer"
                onClick={() => handleDeleteClick()}
              >
                <TrashIcon />
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleConfirmDelete}
      />
    </div>
  );
}
