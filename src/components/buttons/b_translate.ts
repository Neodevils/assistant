import {
	type ButtonInteraction,
	type MiniInteractionComponent,
} from "@minesa-org/mini-interaction";

const button: MiniInteractionComponent = {
	customId: "translate:button",

	handler: async (interaction: ButtonInteraction) => {
		const response = "Button clicked!";

		return interaction.reply({
			content: response,
		});
	},
};

export default button;
