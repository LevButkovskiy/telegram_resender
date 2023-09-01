type CallerType = "module" | "util"
type LogType = "info" | "error"

export default class Logger {
	protected static getDate(): string {
		const d = new Date()
		return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
	}

	protected static createLog<T>(type: LogType, caller: CallerType, fn: string, ...args: Array<T>) {
		const consoleFn = type === "error" ? console.error : console.info
		consoleFn(`${this.getDate()} - [${type.toUpperCase()}] - [${caller}] - [${fn}] - `, ...args)
	}

	static log<T>(caller: CallerType, fn: string, ...args: Array<T>) {
		this.createLog("info", caller, fn, ...args)
	}

	static info<T>(caller: CallerType, fn: string, ...args: Array<T>) {
		this.createLog("info", caller, fn, ...args)
	}

	static error<T>(caller: CallerType, fn: string, ...args: Array<T>) {
		this.createLog("error", caller, fn, ...args)
	}
}
