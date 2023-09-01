import Bluebird from "bluebird"
import {Page} from "puppeteer"
import {SELECTORS} from "../../../constants"
import sendMessage from "../../../telegram/actions/sendMessage"
import {User} from "../../../user/User"
import sleep from "../../utils/sleep"
import {Message} from "./Chats"

export async function openChat(page: Page, name: string) {
	const search = await page.waitForSelector(SELECTORS.chats.search.input)
	search?.type(name)

	const result = await page.waitForSelector(SELECTORS.chats.search.result)
	result?.click()
}

export async function getMessages(page: Page): Promise<Message[]> {
	await page.waitForSelector(SELECTORS.chats.messages.list)
	await sleep(10)
	return page.$$eval(SELECTORS.chats.messages.list, (e) =>
		e.map((message) => {
			const id = message.getAttribute("id") || ""
			const text = message.querySelector(".text-content") as HTMLDivElement
			const toRemove = [
				Array.from(text.querySelectorAll("img")),
				Array.from(text.querySelectorAll("svg")),
				Array.from(text.querySelectorAll("canvas")),
				Array.from(text.querySelectorAll(".emoji")),
				text.querySelector(".Reactions"),
			] as HTMLElement[]

			toRemove
				.flat()
				.filter(Boolean)
				.map((r) => r?.remove?.())

			return {
				id,
				number: +id.replace(/[A-z]/g, "") || 0,
				text: text.innerText.replace(/\n/g, "\n"),
			}
		}),
	)
}

export async function sendMessages(messages: Message[], user: User) {
	return Bluebird.mapSeries(
		messages.sort((a, b) => a.number - b.number),
		async (message) =>
			sendMessage({
				chat_id: user.telegramId,
				text: message.text,
				parse_mode: "MarkdownV2",
			}),
	)
}
