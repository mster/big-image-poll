import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"

export const meta = {
    commandName: 'ping'
}

export const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("For testing!")

export async function execute(interaction: ChatInputCommandInteraction) {
    return interaction.reply("Frigg off Ricky...")
}