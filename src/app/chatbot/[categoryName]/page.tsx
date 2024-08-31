"use client";

import { Category } from "@/app/chatoptions/mocksContent";
import ChatBox from "@/components/ChatBox";
import { Input } from "@/components/ui/input";
import OptionsCard from "@/components/ui/optionsCard";
import api from "@/utils/api";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import ReactMarkdown from "react-markdown";

export default function Chatbot() {
  const params = useParams<{ categoryName: string }>();
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<
    { fromUser: boolean; text: string }[]
  >([{ fromUser: false, text: "Olá, como posso te ajudar?" }]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [history, setHistory] = useState<string>();
  const divRef = useRef(null);

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

  async function onSubmit(readyText?: string) {
    const userPrompt = readyText || inputValue;
    if (!userPrompt) {
      return;
    }

    setInputValue("");
    messages.push({ fromUser: true, text: userPrompt });
    setMessages([...messages]);
    await api
      .post("/ollama-chat", {
        history,
        prompt: userPrompt,
        chat_category: "chuvas_intensas",
      })
      .then((response) => {
        setHistory(`User: ${userPrompt}, Model: ${response.data}`);
        setMessages([...messages, { fromUser: false, text: response.data }]);
      });
  }

  useEffect(() => {
    const childNodes = (divRef as any)?.current?.childNodes;
    childNodes[childNodes.length - 1].scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col gap-4 h-full relative overflow-scroll">
      <div ref={divRef} className="p-2 flex flex-col gap-1 mb-40">
        {messages.map((message, i) => (
          <ChatBox key={i} fromUser={message.fromUser}>
            <ReactMarkdown>{message.text}</ReactMarkdown>
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
                i === selectedCategory?.prompts.length - 1 && "mr-2",
              ].join(" ")}
            >
              <OptionsCard
                key={i}
                text={prompt}
                onClick={() => {
                  onSubmit(prompt);
                }}
              />
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
              onClick={() => onSubmit()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
