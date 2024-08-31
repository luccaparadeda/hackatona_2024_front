"use client";
import { Button } from "@/components/ui/button";
import "animate.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function FirstOnboard() {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full h-full items-center justify-center text-center overflow-hidden">
      <div className="animate__animated animate__slideInLeft w-3/4 h-3/4 bg-[#F4F4FF] border-l-[20px] border-b-[20px] border-[#F4F4FF] rounded-xl">
        <div className="animate__animated animate__slideInLeft onBoardFrontContainerEnter flex flex-col items-center justify-between text-center overflow-hidden bg-[#FBFBFF] border rounded-xl w-full h-full p-8">
          <h1 className="animate__animated animate__fadeIn animate__delay-1s font-bold text-xl pb-4">
            Alerta Amigo
          </h1>
          <Image className="animate__animated animate__fadeIn animate__delay-2s" src="/bot_gif.gif" alt="bot gif" width={250} height={250} />

          <div className="items-center px-8">
            <p className="animate__animated animate__fadeIn animate__delay-3s text-justify text-xs pb-2">
              Nosso chatbot é treinado para fornecer informações e orientações
              precisas durante desastres. Ele está sempre pronto para te ajudar,
              seja para encontrar abrigo, obter primeiros socorros ou entender o
              que fazer a seguir.
            </p>
          </div>
        </div>
      </div>
      <Button className="bg-primaryGreen hover:bg-primaryGreen active:bg-primaryDarkGreen absolute bottom-2 right-9 animate__animated animate__fadeIn animate__delay-4s"  onClick={() => router.push("chatoptions")}>
        Próximo
      </Button>

    </div>
  );
}
