import fs from "fs"
import {Page} from "puppeteer"
import Logger from "../../utils/Logger"

const SESSION_DATA_PATH = "sessionData.json"

export async function setSession(page?: Page) {
	if (!page) return

	async function getStorage(): Promise<object | null> {
		try {
			const file = fs.readFileSync(SESSION_DATA_PATH)
			return JSON.parse(file.toString())
		} catch (e) {
			Logger.error("util", "getStorage", e)
			return null
		}
	}

	const sessionData = await getStorage()
	if (!sessionData) return

	await page.session.restore(sessionData)
}

export async function storeSession(page?: Page) {
	if (!page) return

	const sessionData = await page.session.dump()
	fs.writeFileSync(SESSION_DATA_PATH, JSON.stringify(sessionData, null, 2))
}
