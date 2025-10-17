import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = `https://discord.com/api/v10/applications/${process.env.APP_ID}/commands`;

async function registerCommands() {
	const commandsPath = path.join(__dirname, "commands");
	const files = fs.readdirSync(commandsPath).filter((f) => f.endsWith(".js"));

	const commands = [];

	for (const file of files) {
		const { default: command } = await import(
			path.join(commandsPath, file)
		);

		if (!command || !command.data || !command.data.name) {
			console.warn(
				`⚠️ [WARNING] ${file} is missing a valid command data. Skipping...`,
			);
			continue;
		}

		console.log("Preparing:", command.data.name);
		commands.push(command.data);
	}

	if (commands.length === 0) {
		console.log("⚠️ [WARNING] No commands to register.");
		return;
	}

	try {
		const res = await fetch(url, {
			method: "PUT",
			headers: {
				Authorization: `Bot ${process.env.BOT_TOKEN}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(commands),
		});

		const json = await res.json();
		console.log("✅ [INFO] Commands registered:", json);
	} catch (err) {
		console.error("❌ [ERROR] Command registration failed:", err);
	}
}

registerCommands().catch(console.error);
