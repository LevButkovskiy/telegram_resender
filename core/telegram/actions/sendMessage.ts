import createActionURL from "../utils/createActionURL"

type TelegramMessageOptions = {chat_id: number; text: string; parse_mode?: "MarkdownV2" | "HTML"}
export default async function sendMessage(options: TelegramMessageOptions): Promise<string> {
	return fetch(createActionURL("sendMessage", options)).then((res) => res.text())
}
