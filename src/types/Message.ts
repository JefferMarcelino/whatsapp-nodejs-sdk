export type MessageType = "text" | "interactive" | "image" | "document";

export type InteractiveMessageType = "button" | "list";

export type MediaMessageType = "image" | "document";

export interface ButtonReply {
  id: string;
  title: string;
};

export interface ListReply {
  title: string,
  rows: {
    id: string;
    title: string;
    description?: string;
  }[];
};