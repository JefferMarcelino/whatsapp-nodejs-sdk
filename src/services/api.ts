import axios, { AxiosInstance } from "axios";
import config from "../config";

/**
 * Creates an Axios instance configured for the WhatsApp Business Cloud API.
 *
 * @param version - API version, e.g., 'v18.0'.
 * @param wphoneNumberIdaid - Phone number ID.
 * @param token - Authorization token for WhatsApp API.
 * @returns {AxiosInstance} - Configured Axios instance.
 */
const api = (version: string, phoneNumberId: string, token: string): AxiosInstance => axios.create({
  baseURL: config.GET_URL(version, phoneNumberId),
  headers: {
    Authorization: `Bearer ${ token }`,
    'Content-Type': 'application/json',
  },
});

export default api;