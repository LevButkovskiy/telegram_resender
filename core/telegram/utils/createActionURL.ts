import type {ACTION_TYPES} from "../actions/actions"

export default function createActionURL(action: ACTION_TYPES, options: object = {}): URL {
	const url = process.env.TELEGRAM_BOT_URL
	const token = process.env.TELEGRAM_BOT_TOKEN

	if (!url) throw new Error(".env TELEGRAM_BOT_URL is empty")
	if (!token) throw new Error(".env TELEGRAM_BOT_TOKEN is empty")

	const stringifiedOptions = Object.entries(options).reduce(
		(acc: string, [key, value]: [string, string | number], index: number) => {
			let [thisValue, thisAcc] = [value, acc]

			if (key === "text" && typeof value === "string") {
				thisValue = value
					.replace(/\n/g, "%0A")
					.replace(/([()\-#.])+/g, "\\$1") // Служебные символы
					.replace(/#/g, "%23") // # - какой-то костыль. Ссылка ломается на знаке #
			}
			thisAcc += `${index === 0 ? "?" : "&"}${key}=${thisValue}`
			return thisAcc
		},
		"",
	)

	const result = new URL(`${url}${token}/${action}${stringifiedOptions}`)

	return result
}
