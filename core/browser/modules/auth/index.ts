import {Page} from "puppeteer"
import {SELECTORS, TIMEOUTS} from "../../../constants"
import sendPhoto from "../../../telegram/actions/sendPhoto"
import type {User} from "../../../user/User"
import Logger from "../../../utils/Logger"

const SCREEN_PATH = "screen.jpeg"

async function checkLogin(page: Page) {
	try {
		await page.waitForSelector(SELECTORS.chats.folders, {timeout: TIMEOUTS.checkLogin})
		return true
	} catch (e) {
		Logger.error("module", "checkLogin", e)
		return false
	}
}

async function scanQRCode(page: Page, user: User) {
	try {
		await Promise.any(Object.values(SELECTORS.auth.qrCode).map((selector) => page.waitForSelector(selector)))
		await page.screenshot({path: SCREEN_PATH, type: "jpeg"})
		await sendPhoto({chat_id: user.telegramId, path: SCREEN_PATH})
	} catch (e) {
		Logger.error("module", "scanQRCode", e)
	}
}

async function enterPassword(page: Page, password: string) {
	try {
		const passwordInput = await page.waitForSelector(SELECTORS.auth.passwordInput)
		if (!passwordInput) throw new Error("password input not found")
		await passwordInput.type(password)

		const submitButton = await Promise.any(
			Object.values(SELECTORS.auth.submitButton).map((selector) => page.waitForSelector(selector)),
		)
		if (!submitButton) throw new Error("submit button not found")
		await submitButton?.click()
	} catch (e) {
		Logger.error("module", "enterPassword", e)
	}
}

export default async function auth(page: Page, user: User) {
	try {
		const isLogined = await checkLogin(page)
		if (isLogined) return Logger.log("module", "auth", "already logined")

		if (!process.env.TELEGRAM_TWO_FACTOR_AUTH_PASSWORD) throw new Error(".env TELEGRAM_TWO_FACTOR_AUTH_PASSWORD is empty")

		await scanQRCode(page, user)
		await enterPassword(page, user.twoFactorPassword)
		return page.waitForSelector(SELECTORS.chats.folders)
	} catch (e) {
		Logger.error("module", "auth", e)
		return null
	}
}
