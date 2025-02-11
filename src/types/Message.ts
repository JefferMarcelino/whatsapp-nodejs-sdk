export type MessageType = "text" | "interactive" | "image" | "document" | "template";

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
  object: string;
  entry: {
    id: string;
    changes: {
      field: string;
      value: {
        messaging_product: string;
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
        messages: WhatsAppWebhookTextMessage[] | WhatsAppWebhookInteractiveButtonMessage[] | WhatsAppWebhookInteractiveListMessage[];
      };
    }[];
  }[];
};

export interface Contact {
  profile: {
    name: string;
  };
  wa_id: string;
};

interface WhatsAppWebhookBase {
  from: string;
  id: string;
  timestamp: string;
}

export interface WhatsAppWebhookTextMessage extends WhatsAppWebhookBase {
  type: "text";
  text: {
    body: string;
  };
};

export interface WhatsAppWebhookInteractiveButtonMessage extends WhatsAppWebhookBase {
  type: "interactive";
  interactive: {
    type: "button_reply";
    button_reply: {
      id: string;
      title: string;
    }
  };
};

export interface WhatsAppWebhookInteractiveListMessage extends WhatsAppWebhookBase {
  type: "interactive";
  interactive: {
    type: "list_reply";
    list_reply: {
      id: string;
      title: string;
      description?: string;
    }
  };
};