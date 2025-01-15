import { ChatInputCommandInteraction } from "discord.js"
import InMemoryStorage from "../../../storage"

import { ImageData } from "../../../storage/imagePoll"

export default async function deleteImageFromPoll(interaction: ChatInputCommandInteraction) {
    const pollId: string | null = interaction.options.getString('poll-id')
    if (!pollId) {
        await interaction.reply(`Could not find poll - poll id: \`${pollId}\``)
        return
    }

    const imageId: string | null = interaction.options.getString('image-id')
    if (!imageId) {
        await interaction.reply(`Could not find image - image id: \`${imageId}\``)
        return
    }

    const storage: InMemoryStorage = InMemoryStorage.getInstance()
    await interaction.deferReply()

    const image: ImageData = storage.getImageFromImagePoll(pollId, imageId)
    storage.deleteImageFromImagePoll(pollId, imageId)

    const embed = {                
        color: 0x0099ff,
        title: `Removed image from poll:\`${pollId}\` with image-id:\`${imageId}\``,
        image: {
            url: image.url,
        }
    }

    await interaction.editReply({ embeds: [embed] })
}