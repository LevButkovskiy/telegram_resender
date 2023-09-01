import puppeteer from "puppeteer-extra"
import SessionPlugin from "puppeteer-extra-plugin-session"

puppeteer.use(SessionPlugin())

export default async function createBrowserPage(options: {headless?: boolean; autoPage?: boolean} = {}) {
	const {headless = false} = options

	const browser = await puppeteer.launch({headless})
	const page = await browser.newPage()

	return page
}
