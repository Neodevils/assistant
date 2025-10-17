import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class CommandHandler {
	constructor() {
		this.commands = new Map();
	}

	async loadCommands() {
		const commandsPath = path.join(__dirname, "../commands");
		const files = fs
			.readdirSync(commandsPath)
			.filter((f) => f.endsWith(".js"));

		for (const file of files) {
			const { default: command } = await import(
				path.join(commandsPath, file)
			);

			if (!command || !command.data || !command.data.name) {
				console.warn(
					`⚠️ [WARNING] ${file} is not a valid command file.`,
				);
				continue;
			}

			this.commands.set(command.data.name, command);
		}

		console.log(`ℹ️ [INFO] ${this.commands.size} commands loaded.`);
	}

	async handleInteraction(interaction) {
		if (interaction.type !== 2) return;

		const command = this.commands.get(interaction.data.name);
		if (!command) {
			return {
				type: 4,
				data: { content: "❌ [ERROR] Command not found." },
			};
		}

		try {
			return await command.execute(interaction);
		} catch (err) {
			console.error(err);
			return {
				type: 4,
				data: {
					content:
						"❌ [ERROR] Error occurred while executing command.",
				},
			};
		}
	}
}
