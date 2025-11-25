import {
	ActionRowBuilder,
	MessageCommandBuilder,
	type MessageContextMenuInteraction,
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
	type MiniComponentMessageActionRow,
	type MiniInteractionCommand,
} from "@minesa-org/mini-interaction";

const menu_command: MiniInteractionCommand = {
	data: new MessageCommandBuilder().setName("Menu").toJSON(),

	handler: (interaction: MessageContextMenuInteraction) => {
		const menu = new ActionRowBuilder<MiniComponentMessageActionRow>()
			.addComponents(
				new StringSelectMenuBuilder()
					.setCustomId("menu:role")
					.setMaxValues(2)
					.setPlaceholder("Select a role")
					.addOptions(
						new StringSelectMenuOptionBuilder()
							.setLabel("hello")
							.setDescription("Heyyyy")
							.setValue("hello")
							.setEmoji("😀"),
						new StringSelectMenuOptionBuilder()
							.setLabel("bye")
							.setDescription("Byeee")
							.setValue("bye")
							.setEmoji("😀"),
					),
			)
			.toJSON();

		const message = interaction.targetMessage?.content;

		return interaction.reply({
			content: "Select something! " + message,
			components: [menu],
		});
	},
};

export default menu_command;
