import { ChatInputCommandInteraction } from "discord.js"
import InMemoryStorage from "../../../storage"

export default async function list(interaction: ChatInputCommandInteraction) {
    const storage: InMemoryStorage = InMemoryStorage.getInstance()
    const polls: Object = storage.getPolls()
    await interaction.reply(`${JSON.stringify(polls, null, 2)}`)
}