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

export interface WhatsAppWebhookPayload {
  object: "whatsapp_business_account";
  entry: {
    id: string;
    changes: {
      field: "messages";
      value: {
        messaging_product: "whatsapp";
        metadata: {
          display_phone_number: string;
          phone_number_id: string;
        };
        contacts: {
          profile: {
            name: string;
          };
          wa_id: string;
        }[];
        messages: {
          from: string;
          id: string;
          timestamp: string;
          type: string;
          text?: {
            body: string;
          };
        }[];
      };
    }[]
  }
}

export interface Contact {
  profile: {
    name: string;
  };
  wa_id: string;
}