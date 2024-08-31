"use client";
import Logo from "@/assets/Logo";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="relative flex w-full h-full overflow-y-auto">
      <div className="w-full">
        <Image
          src="/earthFromSpace.jpg"
          alt="earth from space"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "100%" }}
        ></Image>
      </div>
      <div className="bg-white z-10 absolute right-0 flex flex-col w-1/2 h-full gap-10 rounded-l-xl">
        <div className="flex flex-col gap-4 items-center self-center mt-10">
          <Logo />
        </div>
        <span className="font-bold text-3xl text-center">Seja bem vindo!</span>
        <div className="flex flex-col gap-1 mx-20">
          <span className="text-gray-500 font-medium">Email</span>
          <Input
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#f9f9f9] border-0  rounded-md text-black h-12"
          />
        </div>
        <div className="flex flex-col gap-1 mx-20">
          <span className="text-gray-500 font-medium">Senha</span>
          <Input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#f9f9f9] border-0 rounded-md text-black h-12"
          />
        </div>
        <Button
          className="mx-32 mt-10 h-10 bg-primaryGreen"
          onClick={() => router.push("dashboard")}
        >
          ENTRAR
        </Button>
      </div>
    </div>
  );
}
