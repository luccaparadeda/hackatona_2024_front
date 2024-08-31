"use client";
import Logo from "@/assets/Logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex gap-4 font-bold text-3xl items-center self-center mt-10">
        <Logo />
        Alerta Amigo
      </div>
      <div className="w-36 h-36 self-center mt-20 animate-bounce-2s">
        <Image
          src="/earth.gif"
          alt="earth rotating gif"
          height={500}
          width={500}
        />
      </div>
      <div className="text-center font-semibold mx-4 mt-4">
        As melhores práticas de segurança para qualquer situação
      </div>
      <Button
        className="mx-10 mt-10 bg-primaryGreen"
        onClick={() => router.push("onboard")}
      >
        ENTRAR
      </Button>
      <button
        className="mx-10 text-end text-primaryGreen mt-5 font-medium"
        onClick={() => {}}
      >
        SAIBA MAIS
      </button>
    </div>
  );
}
