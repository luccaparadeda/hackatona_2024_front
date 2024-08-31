"use client";
import BoxComponent from "@/components/promptBox";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import "animate.css";

export default function chatOptions() {
  const [firstButtonIsOn, setFirstButtonIsOn] = useState(false);
  const [secondButtonIsOn, setSecondButtonIsOn] = useState(false);

  const eitherButtonIsOn = useMemo(() => {
    return firstButtonIsOn || secondButtonIsOn;
  }, [firstButtonIsOn, secondButtonIsOn]);

  function changeSelectedButton(sender: "first" | "second") {
    if (sender === "first") {
      setFirstButtonIsOn((prev) => !prev);
      setSecondButtonIsOn(false);
    } else if (sender === "second") {
      setSecondButtonIsOn((prev) => !prev);
      setFirstButtonIsOn(false);
    }
  }

  const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col justify-center text-center items-center">
      <div className="flex flex-col gap-4 p-4 ">
        <h1 className="text-3xl font-bold text-center animate__fadeIn animate__animated animate__delay-1s">Selecione uma opção</h1>
        <Button
          className="w-full h-full active:bg-transparent hover:bg-transparent animate__animated animate__slideInRight animate__delay-1s"
          variant={"ghost"}
          onClick={() => changeSelectedButton("first")}
        >
          <BoxComponent
            description="Chuva chuaaaaaaa"
            icon="⛈️"
            iconBgColor="#C5D8FD"
            isSelected={firstButtonIsOn}
            title="Chuvas fortes"
            className="w-full h-full"
          />
        </Button>

        <Button
          className="w-full h-full active:bg-transparent hover:bg-transparent animate__animated animate__slideInLeft animate__delay-1s"
          variant={"ghost"}
          onClick={() => changeSelectedButton("second")}
        >
          <BoxComponent
            className="w-full h-full"
            icon={"🔥"}
            title={"Incêndios"}
            description={"Fogo ai ai ui ui"}
            isSelected={secondButtonIsOn}
            iconBgColor={"#FBFCB9"}
          />
        </Button>

        {eitherButtonIsOn && (
          <Button
            className="bg-primaryGreen hover:bg-primaryGreen active:bg-primaryDarkGreen hover:text-white active:text-white text-white mt-6 mx-4 animate__fadeIn animate__animated"
            variant={"ghost"}
            onClick={() => router.push('chatbot')}
          >
            CONFIRMAR
          </Button>
        )}

{!eitherButtonIsOn && (
        <Button
          className="bg-primaryGray hover:bg-primaryGray active:bg-primaryDarkGray hover:text-white active:text-white text-white mt-8 mx-4 animate__fadeIn animate__animated"
          variant={"ghost"}
          onClick={() => router.push('chatbot')}
        >
          PULAR
        </Button>
)}
      </div>
    </div>
  );
}
