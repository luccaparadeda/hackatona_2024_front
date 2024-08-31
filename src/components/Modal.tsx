import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

export default function Modal({ isOpen, onClose, onSubmit }: any) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center mb-5">
            Você deseja excluir este arquivo?
          </DialogTitle>
          <DialogDescription>
            <div className="flex flex-row justify-between h-14 gap-1">
              <Button className="bg-blue-600 w-1/2" onClick={onClose}>
                Cancelar
              </Button>
              <Button className="bg-red-700 w-1/2" onClick={onSubmit}>
                Confirmar
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
