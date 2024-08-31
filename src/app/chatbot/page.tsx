"use client";

import { Input } from "@/components/ui/input";
import OptionsCard from "@/components/ui/optionsCard";
import { useState } from "react";
import { IoIosSend } from "react-icons/io";

const options = [
  { id: 1, label: "Fumaça", value: "Mais informações" },
  { id: 2, label: "Combate à incêndio", value: "Mais informações" },
  { id: 3, label: "Solicitar ajuda", value: "Mais informações" },
  { id: 3, label: "Solicitar ajuda", value: "Mais informações" },
  { id: 3, label: "Solicitar ajuda", value: "Mais informações" },
];

export default function Chatbot() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex-1">aaa</div>
      <div className="">
        <div className="overflow-x-auto overflow-y-hidden flex gap-2.5 w-full mb-2">
          {options.map((option, i) => (
            <div
              key={i}
              className={[
                i === 0 && "ml-2",
                i === options.length - 1 && "mr-2",
              ].join(" ")}
            >
              <OptionsCard
                key={option.id}
                option={option.label}
                text={option.value}
                onClick={() => console.log(option.label)}
              />
            </div>
          ))}
        </div>
        <div className="mb-1 mx-2 flex gap-1">
          <Input
            placeholder="Digite sua mensagem..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-[#D9D9D9] bg-opacity-40 rounded-md text-black h-12"
          />
          <div
            className={`bg-black rounded-full w-14 h-12 flex items-center justify-center transition-opacity 
              ${!inputValue && "opacity-45 pointer-events-none"}`}
          >
            <IoIosSend
              className="text-white z-10 cursor-pointer w-8 h-8"
              onClick={() => console.log("Submit")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
