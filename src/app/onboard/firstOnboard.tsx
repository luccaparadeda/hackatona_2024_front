import { Button } from "@/components/ui/button";
import "animate.css";

export default function FirstOnboard() {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center text-center overflow-hidden">
      <div className="animate__animated animate__slideInLeft bg-[#F4F4FF] border-l-[24px] border-b-[24x] border-[#F4F4FF] rounded-xl">
        <div className="animate__animated animate__slideInLeft onBoardFrontContainerEnter flex flex-col items-center justify-center text-center overflow-hidden bg-[#FBFBFF] border rounded-xl w-[600px] h-[500px]">
          <h1 className="animate__animated animate__fadeIn animate__delay-1s font-bold text-xl pb-4">
            Alerta Amigo
          </h1>
          <img
            className="animate__animated animate__fadeIn animate__delay-2s w-[320px] h-[340]"
            src="/bot_gif.gif"
          />

          <div className="items-center px-8">
            <p className="animate__animated animate__fadeIn animate__delay-3s text-balance text-center">
              Nosso chatbot é treinado para fornecer informações e orientações
              precisas durante desastres. Ele está sempre pronto para te ajudar,
              seja para encontrar abrigo, obter primeiros socorros ou entender o
              que fazer a seguir.
            </p>
          </div>
        </div>
      </div>
      <Button className="bg-primaryGreen hover:bg-primaryGreen active:bg-primaryDarkGreen absolute bottom-2 right-9 animate__animated animate__fadeIn animate__delay-4s">
        Próximo
      </Button>

      <Button
        variant={"ghost"}
        className="hover:text-textGray hover:bg-transparent active:text-primaryGray text-textGray absolute bottom-2 left-9 animate__animated animate__fadeIn animate__delay-4s"
      >
        Skip
      </Button>
    </div>
  );
}
