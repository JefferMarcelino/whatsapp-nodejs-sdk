# WhatsApp Node.js SDK

A Node.js SDK for the WhatsApp Cloud API, allowing easy integration of WhatsApp messaging into your applications.

## Installation

Install the SDK via npm:

```bash
npm install whatsapp-nodejs-sdk
```

## Usage

### Initialize the WhatsApp Client

Before using the SDK, initialize the `WhatsAppClient` with your phone number ID and access token. Get it from [Meta Developers](https://developers.facebook.com/).

```js
const { WhatsAppClient } = require('whatsapp-nodejs-sdk');

const whatsappClient = new WhatsAppClient(
  "YOUR_PHONE_NUMBER_ID",
  "YOUR_ACCESS_TOKEN"
);
```

### Example Usage

#### 1. Sending an Image

Send an image to the user with an introductory message:

```js
whatsappClient.sendMediaMessage(
  "258841234567", // recipient's phone number
  "image",        // media type
  "https://www.w3schools.com/w3css/img_lights.jpg", // media URL
  "Hello! I'm Quick Top Up Bot, here to help you get top-ups for your favorite games quickly and easily." // caption
);
```

#### 2. Sending a List Message

Send an interactive message with a list of options for the user to select from:

```js
whatsappClient.sendInteractiveMessage(
  "258841234567", 
  "list",
  "Open the list below to explore some available options",
  [
    {
      title: "Choose an option",
      rows: [
        { id: "OP_1", title: "Buy Top-Ups", description: "Get top-ups for your favorite games." },
        { id: "OP_2", title: "FAQ", description: "Find answers to frequently asked questions." },
        { id: "OP_3", title: "Tutorial", description: "Learn how to use the bot step by step." },
      ]
    },
  ],
);
```

#### 3. Sending a Buttons Message

Send an interactive message with buttons for the user to select from:

```js
whatsappClient.sendInteractiveMessage(
  "258841234567", 
  "button",
  "You chose *500 MZN* to get *1000 Diamonds* in Free Fire! \n\nSelect a payment method:",
  [
    { id: "MPESA", title: "M-Pesa" },
    { id: "EMOLA", title: "E-Mola" },
  ],
);
```

#### 4. Send a simple text message

Send a simple text message to the user:

```js
whatsappClient.sendTextMessage(
  "258841234567", 
  "Hello! I'm Quick Top Up Bot, here to help you get top-ups for your favorite games quickly and easily."
);
```