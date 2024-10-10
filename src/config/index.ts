export default {
  GET_URL: (version: string, phoneNumberId: string) => `https://graph.facebook.com/${ version }/${ phoneNumberId }/messages`,
}