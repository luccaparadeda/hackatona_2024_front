"use client";
import BoxComponent from "@/components/promptBox";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import "animate.css";
import api from "@/utils/api";
import { Category, getCategoryFrontInfo } from "./mocksContent";

export default function chatOptions() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    const response = await api.get("/category");
    localStorage.setItem("categories", JSON.stringify(response.data));
    setCategoriesList(
      response.data.map(
        (category: {
          name: string;
          description: string;
          prompts: string[];
        }) => ({
          ...category,
          ...getCategoryFrontInfo(category.name),
        }),
      ),
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-y-auto overflow-x-hidden px-4 mb-4">
      <h1 className="text-3xl font-bold text-center animate__fadeIn animate__animated animate__delay-1s mt-6">
        Selecione uma opção
      </h1>
      {categoriesList.map((category, index) => (
        <Button
          key={index}
          className={`w-80%  h-20 active:bg-transparent hover:bg-transparent animate__animated animate__delay-1s p-0 ${
            index % 2 === 0 ? "animate__slideInLeft" : "animate__slideInRight"
          }`}
          variant={"ghost"}
          onClick={() =>
            index === selectedIndex
              ? setSelectedIndex(null)
              : setSelectedIndex(index)
          }
        >
          <BoxComponent
            className="w-full h-full"
            icon={category.emoji}
            title={category.exibitionName}
            description={category.description}
            isSelected={selectedIndex === index}
            iconBgColor={category.color}
          />
        </Button>
      ))}
      {selectedIndex !== null && (
        <Button
          className={
            "text-white mt-2 mx-4 animate__fadeIn animate__animated bg-primaryGreen hover:bg-primaryGreen active:bg-primaryDarkGreen"
          }
          variant={"ghost"}
          onClick={() =>
            router.push(`chatbot/${categoriesList[selectedIndex].name}`)
          }
        >
          {"CONFIRMAR"}
        </Button>
      )}
    </div>
  );
}
