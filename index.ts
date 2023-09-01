import puppeteer from "puppeteer-extra"
import SessionPlugin from "puppeteer-extra-plugin-session"
import createBrowserPage from "./core/browser"
import auth from "./core/browser/modules/auth"
import {getMessages, openChat, sendMessages} from "./core/browser/modules/chats"
import {setSession, storeSession} from "./core/browser/utils/session"
import {User} from "./core/user/User"

puppeteer.use(SessionPlugin())

async function init() {
	const page = await createBrowserPage()

	if (!process.env.TELEGRAM_CHAT_ID) throw new Error(".env TELEGRAM_CHAT_ID is empty")
	if (!process.env.TELEGRAM_TWO_FACTOR_AUTH_PASSWORD) throw new Error(".env TELEGRAM_TWO_FACTOR_AUTH_PASSWORD is empty")

	const user: User = {
		telegramId: +process.env.TELEGRAM_CHAT_ID,
		twoFactorPassword: process.env.TELEGRAM_TWO_FACTOR_AUTH_PASSWORD,
	}

	await page.goto("https://web.telegram.org/")
	await setSession(page)
	await page.reload()

	await auth(page, user)
	await storeSession(page)

	await openChat(page, "Сигналы")
	const messages = await getMessages(page)
	await sendMessages(messages, user)
}

init()
