"use client";
import TrashIcon from "@/assets/TrashIcon";
import CategoryBox from "@/components/CategoryBox";
import ChevronDown from "@/components/ChevronDown";
import DropdownContextMenu from "@/components/DropdownContextMenu";
import { FileUpload } from "@/components/FileUpload";
import Modal from "@/components/Modal";
import { useAuth } from "@/hooks/useAuth";
import api from "@/utils/api";
import { Fragment, useEffect, useState } from "react";
import { Category, getCategoryFrontInfo } from "../chatoptions/mocksContent";

function getFiles(name: string) {
  if (name === "incendio") {
    return [
      { name: "Guia de Incêndio 1" },
      { name: "Guia de Incêndio 2" },
      { name: "Guia de Incêndio 3" },
      { name: "Guia de Incêndio 4" },
    ];
  } else {
    return [
      { name: "Guia de Chuvas Intensas 1" },
      { name: "Guia de Chuvas Intensas 2" },
      { name: "Guia de Chuvas Intensas 3" },
    ];
  }
}

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const { signOut } = useAuth();

  const [categoriesList, setCategoriesList] = useState<Category[]>([]);

  async function trySignOut(): Promise<void> {
    await signOut();
  }

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsModalOpen(false);
  };

  async function getCategories() {
    const response = await api.get("/category");
    localStorage.setItem("categoriesDashboard", JSON.stringify(response.data));
    const categories = response.data.map(
      (category: { name: string; description: string; prompts: string[] }) => ({
        ...category,
        ...getCategoryFrontInfo(category.name),
      }),
    );
    setSelectedCategory(categories[0]);
    setCategoriesList(categories);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="h-full w-full overflow-y-auto p-6">
      <div className="justify-between flex">
        <span className="font-semibold text-4xl">Dashboard</span>
        <DropdownContextMenu
          options={[{ label: "Fazer Logout", onClick: () => trySignOut() }]}
        >
          <div className="text-sm font-semibold flex gap-2 items-center">
            admin@gmail.com
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
          {categoriesList.map((item, index) => (
            <CategoryBox
              className="cursor-pointer hover:"
              onClick={() => setSelectedCategory(item)}
              key={index}
              iconBgColor={item.color}
              icon={item.emoji}
              bgColor={`${item.color}33`}
              quantity={3 + index}
              title={item.exibitionName}
            />
          ))}
        </div>
      </div>
      {selectedCategory && (
        <div className="shadow-lg rounded-3xl px-8 pt-8 pb-2 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="font-semibold text-lg">
              Arquivos - {selectedCategory.exibitionName}
            </div>
            <FileUpload />
          </div>
          <div className="grid grid-cols-[1fr_10fr_1fr]">
            <div className="text-gray-400 py-3">#</div>
            <div className="text-gray-400 py-3">Nome</div>
            <div className="text-gray-400 text-center py-3">Deletar</div>
            {getFiles(selectedCategory.name).map((file, i) => (
              <Fragment key={i}>
                <div className="border-t border-gray-300 py-3">
                  {(i + 1).toString().padStart(2, "0")}
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
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleConfirmDelete}
      />
    </div>
  );
}
