export default {
	data: {
		name: "interaction",
		description: "Interaction data",
	},
	async execute(interaction) {
		const start = Date.now();
		const elapsed = Date.now() - start;

		return {
			type: 4,
			data: {
				content: `🏓 Pong!\n${elapsed}ms\n\`\`\`json\n${JSON.stringify(
					interaction,
					null,
					2,
				)}\n\`\`\``,
			},
		};
	},
};
