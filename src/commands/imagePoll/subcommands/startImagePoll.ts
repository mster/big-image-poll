import { ChatInputCommandInteraction, TextBasedChannel } from "discord.js"
import { EmbedBuilder } from "@discordjs/builders"

import InMemoryStorage from "../../../storage"
import { ImagePoll, ImageData } from "../../../storage/imagePoll"

export default async function startImagePoll(interaction: ChatInputCommandInteraction) {
    const pollId: string | null = interaction.options.getString('poll-id')
    if (!pollId) {
        await interaction.reply(`Could not find poll - poll id: \`${pollId}\``)
        return
    }

    await interaction.reply(`Starting poll with id: \`${pollId}\``)

    const channel: TextBasedChannel | null = interaction.channel
    if (!channel?.isSendable()) {
        await interaction.editReply(`Unable to start poll \`${pollId}\` in this channel!`)
        return
    }

    const storage: InMemoryStorage = InMemoryStorage.getInstance()
    const imagePoll: ImagePoll = storage.getImagePoll(pollId)
    const images: Array<ImageData> = imagePoll.getImages()

    if (images.length === 0) {
        await interaction.editReply(`Unable to start poll \`${pollId}\`. The poll has no images!`)
        return
    }

    for (let imageData of images) {
        const imageEmbed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle(imageData.id)
            .setImage(imageData.url)
        await channel.send({ embeds: [imageEmbed] })
    }
}