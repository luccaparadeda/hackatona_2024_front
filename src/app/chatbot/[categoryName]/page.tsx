"use client";

import { Category } from "@/app/chatoptions/mocksContent";
import SmallLogo from "@/assets/SmalLogo";
import ChatBox from "@/components/ChatBox";
import SpeechRecognitionComponent, {
  SpeechRecognitionHandle,
} from "@/components/SpeechRecognitionComponent";
import { Input } from "@/components/ui/input";
import OptionsCard from "@/components/ui/optionsCard";
import { Skeleton } from "@/components/ui/skeleton";
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
  const [isLoading, setIsLoading] = useState(false);
  const divRef = useRef(null);

  const speechRecognitionRef = useRef<SpeechRecognitionHandle>(null);

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
    setIsLoading(true);
    setInputValue("");
    speechRecognitionRef.current?.stopListening();
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
        setIsLoading(false);
        setMessages([...messages, { fromUser: false, text: response.data }]);
      });

    setInputValue("");
  }

  useEffect(() => {
    const childNodes = (divRef as any)?.current?.childNodes;
    childNodes[childNodes.length - 1].scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col gap-4 h-full relative overflow-scroll">
      <div className="fixed top-0 w-full shadow-lg bg-white font-semibold flex  items-center justify-center gap-4 py-2">
        <SmallLogo />
        Alerta Amigos
      </div>
      <div ref={divRef} className="p-2 flex flex-col gap-1 mb-40 mt-14">
        {messages.map((message, i) => (
          <ChatBox key={i} fromUser={message.fromUser}>
            <ReactMarkdown>{message.text}</ReactMarkdown>
          </ChatBox>
        ))}
        {isLoading && (
          <Skeleton className="w-4/5 h-52 p-2 gap-1 flex-col grid grid-cols-3">
            <Skeleton className="ml-10 col-span-2" />
            <Skeleton />
            <Skeleton />
            <Skeleton className="col-span-2 " />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton className="col-span-2 " />
            <Skeleton />
            <Skeleton />
            <Skeleton className="col-span-2 " />
            <Skeleton className="ml-10" />
            <Skeleton />
            <Skeleton />
            <Skeleton className="col-span-2 " />
            <Skeleton />
            <Skeleton />
            <Skeleton className="col-span-2 " />
            <Skeleton />
            <Skeleton />
            <Skeleton className="ml-10 col-span-2 " />
            <Skeleton />
          </Skeleton>
        )}
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
          <SpeechRecognitionComponent
            strDescFunc={setInputValue}
            ref={speechRecognitionRef}
          />
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
