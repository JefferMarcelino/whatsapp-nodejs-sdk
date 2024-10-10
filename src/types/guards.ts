import { ButtonReply, ListReply } from "./Message";

export function isButtonReply(item: any): item is ButtonReply {
  return (
    typeof item === "object" &&
    item !== null &&
    typeof item.id === "string" &&
    typeof item.title === "string"
  );
};

export function isListReply(item: any): item is ListReply {
  return (
    typeof item === "object" && 
    item !== null && 
    typeof item.title === "string" &&
    Array.isArray(item.rows) &&
    item.rows.every((row: any) => 
      typeof row === "object" && 
      row !== null && 
      typeof row.id === "string" && 
      typeof row.title === "string" && 
      (typeof row.description === "undefined" || typeof row.description === "string")
    )
  );
}