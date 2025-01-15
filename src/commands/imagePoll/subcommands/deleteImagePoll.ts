import { ChatInputCommandInteraction } from "discord.js"

import InMemoryStorage from "../../../storage"

export default async function deleteImagePoll(interaction: ChatInputCommandInteraction) {
    const creatorId: string = interaction.user.id
    if (!creatorId) {
        await interaction.reply(`Image poll cannot be created, user has no id`)
        return
    }

    const pollId: string | null = interaction.options.getString('poll-id')
    if (!pollId) {
        await interaction.reply(`Could not find poll - poll id: \`${pollId}\``)
        return
    }

    const storage: InMemoryStorage = InMemoryStorage.getInstance()
    const wasDeleted = storage.deleteImagePoll(pollId, creatorId)
    if (!wasDeleted) {
        await interaction.reply(`Unable to delete poll - poll id: \`${pollId}\``)
        return
    }

    await interaction.reply(`Image poll deleted - poll id: \`${pollId}\``)
}