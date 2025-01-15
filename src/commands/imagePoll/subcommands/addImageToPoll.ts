import { Attachment, ChatInputCommandInteraction } from "discord.js"

import InMemoryStorage from "../../../storage"
import { smallSnowflake } from "../../../utils/smallSnowflake"

export default async function addImageToPoll(interaction: ChatInputCommandInteraction) {
    const uploaderId: string = interaction.user.id
    if (!uploaderId) {
        await interaction.reply(`Image cannot be added to poll without uploader id`)
        return
    }

    const pollId: string | null = interaction.options.getString('poll-id')
    if (!pollId) {
        await interaction.reply(`Could not find poll - poll id: \`${pollId}\``)
        return
    }

    const storage: InMemoryStorage = InMemoryStorage.getInstance()

    const attachment: Attachment | null = interaction.options.getAttachment("image")
    if (attachment && attachment?.url) {
        await interaction.deferReply()

        const imageId: string = smallSnowflake()
        storage.addImageToImagePoll(pollId, uploaderId, imageId, attachment)

        const embed = {                
            color: 0x0099ff,
            title: `Add image to poll:\`${pollId}\` with image-id:\`${imageId}\``,
            image: {
                url: attachment.url,
            }
        }

        await interaction.editReply({ embeds: [embed] })
    }
}