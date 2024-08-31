import ImportIcon from "@/assets/ImportIcon";
import React, { useRef } from "react";
import { Button } from "./ui/button";
import api from "@/utils/api";

export function FileUpload({ categoryName }: { categoryName: string }) {
  const fileInputRef = useRef(null);

  function handleButtonClick() {
    (fileInputRef as any).current.click();
  }

  function handleFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      alert(`Selected file: ${file.name}`);

      api.postForm(`file/upload`, {
        file: file,
        category: categoryName,
      });
    }
  }

  return (
    <div>
      <Button variant="outline" onClick={handleButtonClick}>
        <ImportIcon />
        Importar
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
}
