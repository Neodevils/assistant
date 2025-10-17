import { verifyKey } from "discord-interactions";
import { CommandHandler } from "../src/handler/command-handler.js";

const commandHandler = new CommandHandler();
await commandHandler.loadCommands();

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).send("Method not allowed");
	}

	const signature = req.headers["x-signature-ed25519"];
	const timestamp = req.headers["x-signature-timestamp"];
	const body = await getRawBody(req);

	const isValid = await verifyKey(
		body,
		signature,
		timestamp,
		process.env.PUBLIC_KEY,
	);

	if (!isValid) {
		return res.status(401).send("Bad request signature");
	}

	try {
		const interaction = JSON.parse(body.toString("utf-8"));
		const response = await commandHandler.handleInteraction(interaction);
		return res.status(200).json(response);
	} catch (error) {
		console.error("Error handling interaction:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
}

function getRawBody(req) {
	return new Promise((resolve, reject) => {
		let data = "";
		req.on("data", (chunk) => {
			data += chunk;
		});
		req.on("end", () => resolve(Buffer.from(data)));
		req.on("error", reject);
	});
}
