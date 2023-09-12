#Telegram bot resender
Allow to resend messages from multiple channels to one

## Requirements

-   Node 18.0

##Installation

1. Install dependencies

```
yarn install
```

2. Setup .env

```
TELEGRAM_BOT_URL= // Telegram API URL
TELEGRAM_BOT_TOKEN= // Telegram Bot token
TELEGRAM_CHAT_ID= // Id of the chat where the message will be sent
TELEGRAM_TWO_FACTOR_AUTH_PASSWORD= // Two factor password
AMQP_URL= // Rabbit MQ URL
```

3. Run project

```
yarn start
```
