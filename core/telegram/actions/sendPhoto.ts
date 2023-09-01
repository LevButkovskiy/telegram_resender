import { Blob } from "buffer";
import fs from "node:fs";
import createActionURL from "../utils/createActionURL";

export default async function sendPhoto(options: {chat_id: number; path: string; caption?: string}): Promise<string> {
	const {path, ...omited} = options

	const buffer = fs.readFileSync(path)
	const file = new Blob([buffer])

	const form = new FormData()
	// @ts-ignore: Unreachable code error
	form.append("photo", file)

	return fetch(createActionURL("sendPhoto", omited), {method: "POST", body: form}).then((res) => res.text())
}
