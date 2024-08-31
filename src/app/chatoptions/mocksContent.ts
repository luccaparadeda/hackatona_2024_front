export interface Category {
  color: string;
  emoji: string;
  exibitionName: string;
  name: string;
  description: string;
  prompts: string[];
}

export function getCategoryFrontInfo(name: string) {
  switch (name) {
    case "chuvas_intensas":
      return {
        color: "#000044",
        emoji: "🌧️",
        exibitionName: "Chuva Intensa",
      };
    case "incendio":
      return {
        color: "#440000",
        emoji: "🔥",
        exibitionName: "Incêndio",
      };
    default:
      console.log(name);
      throw new Error("Invalid category id");
  }
}
