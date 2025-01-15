import { ChatInputCommandInteraction } from "discord.js"

import InMemoryStorage from "../../../storage"

export default async function createImagePoll(interaction: ChatInputCommandInteraction) {
    const creatorId: string = interaction.user.id
    if (!creatorId) {
        await interaction.reply(`Image poll cannot be created, user has no id`)
        return
    }

    const storage: InMemoryStorage = InMemoryStorage.getInstance()

    const pollId = storage.createImagePoll(creatorId)
    await interaction.reply(`Image poll created - poll id: \`${pollId}\``)
}