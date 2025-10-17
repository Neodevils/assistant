export default {
	data: {
		name: "interaction",
		description: "Interaction data",
	},
	async execute(interaction) {
		return {
			type: 4,
			data: {
				content: ` 🏓 Pong! \`\`\`js\n${interaction}\n\`\`\``,
			},
		};
	},
};
