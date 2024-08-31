"use client";

import { Input } from "@/components/ui/input";
import OptionsCard from "@/components/ui/optionsCard";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const options = [
  { id: 1, label: "Fumaça", value: "Mais informações" },
  { id: 2, label: "Combate à incêndio", value: "Mais informações" },
  { id: 3, label: "Solicitar ajuda", value: "Mais informações" },
];

export default function Chatbot() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-[10px] w-full justify-between">
        {options.map((option) => (
          <OptionsCard
            key={option.id}
            option={option.label}
            text={option.value}
            onClick={() => console.log(option.label)}
          />
        ))}
      </div>
      <div className="relative">
        <Input
          placeholder="Digite sua mensagem..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="bg-[#D9D9D9] bg-opacity-[40%] rounded-[6px] text-black h-[50px] pr-[50px]"
        />
        {inputValue && (
          <FaSearch
            className="absolute top-[50%] right-[10px] transform -translate-y-[50%] text-gray-500 cursor-pointer"
            size={20}
            onClick={() => console.log("Submit")}
          />
        )}
      </div>
    </div>
  );
}
