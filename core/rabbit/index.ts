import amqp, {Connection} from "amqplib"

export default async function connect(): Promise<Connection> {
	if (!process.env.AMQP_URL) throw new Error(".env AMQP_URL is empty")
	console.info(process.env.AMQP_URL)

	return amqp.connect(process.env.AMQP_URL)
}
