import ImportIcon from "@/assets/ImportIcon";
import React, { useRef } from "react";
import { Button } from "./ui/button";

export function FileUpload() {
  const fileInputRef = useRef(null);

  function handleButtonClick() {
    (fileInputRef as any).current.click();
  }

  function handleFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      alert(`Selected file: ${file.name}`);
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
