import connect from "."

const MQ_QUEUE = "messages"

export default async function sendMessageToQueue(message: string) {
	const mqConnection = await connect()
	const channel = await mqConnection.createChannel()
	await channel.assertQueue(MQ_QUEUE)
	channel.sendToQueue(MQ_QUEUE, Buffer.from(message))
	await channel.close()
	await mqConnection.close()
}
