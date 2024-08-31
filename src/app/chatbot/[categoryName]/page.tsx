"use client";

import { Category } from "@/app/chatoptions/mocksContent";
import ChatBox from "@/components/ChatBox";
import { Input } from "@/components/ui/input";
import OptionsCard from "@/components/ui/optionsCard";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";

const options = [
  { id: 1, label: "Fumaça", value: "Mais informações" },
  { id: 2, label: "Combate à incêndio", value: "Mais informações" },
  { id: 3, label: "Solicitar ajuda", value: "Mais informações" },
  { id: 3, label: "Solicitar ajuda", value: "Mais informações" },
  { id: 3, label: "Solicitar ajuda", value: "Mais informações" },
];

const baseMessages = [
  {
    fromUser: true,
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni possimus repudiandae aperiam, minima deleniti fugiat quam vero facere ea nostrum qui exercitationem soluta impedit sapiente perferendis adipisci deserunt delectus suscipit.",
  },
  {
    fromUser: false,
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni possimus repudiandae aperiam, minima deleniti fugiat quam vero facere ea nostrum qui exercitationem soluta impedit sapiente perferendis adipisci deserunt delectus suscipit.",
  },
];
const chatMessagesMock = [...baseMessages, ...baseMessages, ...baseMessages];

export default function Chatbot() {
  const params = useParams<{ categoryName: string }>();
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  useEffect(() => {
    const list = localStorage.getItem("categories");
    if (!list) {
      router.replace("/chatoptions");
      return;
    }

    setSelectedCategory(
      JSON.parse(list).filter((category: { name: string }) => {
        if (category.name === params.categoryName) {
          return category;
        }
      })[0],
    );
  }, []);
  return (
    <div className="flex flex-col gap-4 h-full relative overflow-scroll">
      <div className="p-2 flex flex-col gap-1 mb-40">
        {chatMessagesMock.map((message, i) => (
          <ChatBox key={i} fromUser={message.fromUser}>
            <div className="text-justify">{message.text}</div>
          </ChatBox>
        ))}
      </div>
      <div className="fixed bottom-0 w-full backdrop-blur-sm">
        <div className="overflow-x-auto overflow-y-hidden flex gap-2.5 w-full mb-2">
          {selectedCategory?.prompts.map((prompt, i) => (
            <div
              key={i}
              className={[
                i === 0 && "ml-2",
                i === options.length - 1 && "mr-2",
              ].join(" ")}
            >
              <OptionsCard key={i} text={prompt} onClick={() => {}} />
            </div>
          ))}
        </div>
        <div className="mb-1 mx-2 flex gap-1">
          <Input
            placeholder="Digite sua mensagem..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-[#eeeeee] rounded-md text-black h-12"
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
