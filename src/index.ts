import { AxiosInstance, AxiosResponse } from 'axios';
import api from './services/api';
import type { ButtonReply, InteractiveMessageType, ListReply, MediaMessageType, MessageType, WhatsAppWebhookPayload } from './types/Message';
import { isButtonReply, isListReply } from './types/guards';

export class WhatsAppClient {
  token: string;
  phoneNumberId: string;
  version: string;
  api: AxiosInstance;

  constructor(
    phoneNumberId: string,
    token: string,
    version: string = 'v18.0',
  ) {
    this.token = token;
    this.phoneNumberId = phoneNumberId;
    this.version = version;
    this.api = api(this.version, this.phoneNumberId, this.token);
  };

  /**
   * Handle errors and log them to the console.
   * 
   * @param error - The error object.
   */
  private handleError(error: any) {
    console.error('WhatsApp API Error:', error?.response?.data || error.message || error);
  };

  /**
   * General method to send a message of any type via WhatsApp.
   * 
   * @param to - The recipient's WhatsApp number.
   * @param messageType - The type of message to send.
   * @param data - Message payload to send.
   * @param messageId - Optional WhatsApp message ID for context.
   * @returns {Promise<AxiosResponse<any, any>>} - Returns the response from the WhatsApp API, or throws an error.
   */
  private async sendMessage<T>(to: string, messageType: MessageType, data: T, messageId?: string, ): Promise<AxiosResponse<any, any>> {
    try {
      if (messageId) {
        (data as any).context = { message_id: messageId };
      };

      const response = await this.api.post('/', {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to,
        type: messageType,
        ...data,
      });

      return response;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Send a text message via WhatsApp.
   *
   * @param number - The recipient's WhatsApp number.
   * @param message - The text message to send.
   * @param messageId - Optional WhatsApp message ID for context.
   * @returns {Promise<AxiosResponse<any, any>>} - Returns the response from the WhatsApp API, or throws an error.
   */
  public async sendTextMessage(number: string, message: string, messageId?: string): Promise<AxiosResponse<any, any>> {
    const data = {
      text: { body: message }
    };

    return this.sendMessage(number, "text", data, messageId);
  };

  /**
   * Send an interactive message via WhatsApp.
   *
   * @param number - The recipient's WhatsApp number.
   * @param data - Data for the interactive message.
   * @param messageId - Optional WhatsApp message ID for context.
   * @returns {Promise<AxiosResponse<any, any>>} - Returns the response from the WhatsApp API, or throws an error.
   */
  public async sendInteractiveMessage (
    number: string, 
    type: InteractiveMessageType, 
    message: string,
    interactiveData: ButtonReply[] | ListReply[], 
    messageId?: string
  ): Promise<AxiosResponse<any, any>> {
    let data = {
      interactive: {
        type,
        body: {
          text: message,
        },
        action: {}
      }
    };
  
    if (type == "button" && interactiveData.every(isButtonReply)) {
      data["interactive"]["action"] = {
        buttons: interactiveData.map((button) => ({
          type: "reply",
          reply: {
            id: button.id,
            title: button.title,
          },
        })),
      }
    } else if (type == "list" && interactiveData.every(isListReply)) {
      data["interactive"]["action"] = {
        button: "Abrir",
        sections: interactiveData
      }
    };

    return this.sendMessage(number, "interactive", data, messageId);
  };

  /**
   * Send a media message via WhatsApp.
   *
   * @param number - The recipient's WhatsApp number.
   * @param type - The type of media message.
   * @param link - The link for the media
   * @param caption - Optional caption for the media.
   * @param messageId - Optional WhatsApp message ID for context.
   * @returns {Promise<AxiosResponse<any, any>>} - Returns the response from the WhatsApp API, or throws an error.
   */
  public async sendMediaMessage(
    number: string, 
    type: MediaMessageType, 
    link: string, 
    caption?: string, 
    messageId?: string
  ): Promise<AxiosResponse<any, any>> {
    const data = {
      [`${ type }`]: {
        link,
        caption
      }
    };

    return this.sendMessage(number, type, data, messageId);
  };

  /**
   * Extract the contact's name from the WhatsApp webhook payload.
   * 
   * @param payload - The WhatsApp webhook payload.
   * @returns {string | null} - Returns the contact's name, or null if not found.
   */
  public getContactName(payload: WhatsAppWebhookPayload): string | null {
    const contact = payload.entry.changes[0].value.contacts[0];
    return contact?.profile?.name || null;
  };

  /**
   * Extract the contact's WhatsApp number from the WhatsApp webhook payload.
   * 
   * @param payload - The WhatsApp webhook payload.
   * @returns {string | null} - Returns the contact's WhatsApp number, or null if not found.
   */
  public getContactNumber(payload: WhatsAppWebhookPayload): string | null {
    const message =  payload.entry.changes[0].value.messages[0];
    return message?.from || null;
  }
  
  /**
   * Extract the text message body from the WhatsApp webhook payload.
   * 
   * @param payload - The WhatsApp webhook payload.
   * @returns {string | null} - Returns the text message, or null if not found.
   */
  public getTextMessage(payload: WhatsAppWebhookPayload): string | null {
    const message =  payload.entry.changes[0].value.messages[0];

    if (message?.type === 'text') {
      return message.text?.body || null;
    };

    return null;
  }
};