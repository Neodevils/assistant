import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	MessageCommandBuilder,
	type MessageContextMenuInteraction,
	type MiniComponentMessageActionRow,
	type MiniInteractionCommand,
} from "@minesa-org/mini-interaction";

const translateCommand: MiniInteractionCommand = {
	data: new MessageCommandBuilder()
		.setName("Translate")
		.setNameLocalizations({ tr: "Çeviri" })
		.toJSON(),

	handler: async (interaction: MessageContextMenuInteraction) => {
		const message = interaction.targetMessage?.content;
		const button = new ButtonBuilder()
			.setCustomId("translate:button")
			.setLabel("Translate")
			.setStyle(ButtonStyle.Primary);
		const row = new ActionRowBuilder<MiniComponentMessageActionRow>()
			.addComponents(button)
			.toJSON();

		return interaction.reply({
			content: message,
			components: [row],
		});
	},
};

export default translateCommand;
