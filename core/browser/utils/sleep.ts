export default async function sleep(seconds: number) {
	return new Promise((r) => {
		setTimeout(() => r(true), seconds * 1000)
	})
}
