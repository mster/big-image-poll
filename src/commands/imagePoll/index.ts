import { ChatInputCommandInteraction , SlashCommandBuilder } from "discord.js"

import createImagePoll from './subcommands/createImagePoll'
import startImagePoll from './subcommands/startImagePoll'
import list from './subcommands/list'
import deleteImagePoll from './subcommands/deleteImagePoll'
import addImageToPoll from './subcommands/addImageToPoll'
import deleteImageFromPoll from './subcommands/deleteImageFromPoll'


export const meta = {
    commandName: 'image-poll'
}

export const data = new SlashCommandBuilder()
    .setName("image-poll")
    .setDescription("For testing!")
    .addSubcommand(subcommand =>
        subcommand
        .setName('create')
        .setDescription('Create the image poll, this gives you the poll id')
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('start')
        .setDescription('Start a poll that has been created.')
        .addStringOption(option =>
            option
              .setName('poll-id')
              .setDescription('the poll id for the poll you wish to start')
              .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('list')
        .setDescription('List existing polls')
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('delete-poll')
        .setDescription('Delete existing poll')
        .addStringOption(option =>
            option
              .setName('poll-id')
              .setDescription('the poll id for the poll you wish to start')
              .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('add-image')
        .setDescription('Add an image to an existing image-poll')
        .addStringOption(option =>
            option
              .setName('poll-id')
              .setDescription('the poll id for the poll you wish to add an image to')
              .setRequired(true)
        )
        .addAttachmentOption(option =>
            option
              .setName('image')
              .setDescription('attachment')
              .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('delete-image')
        .setDescription('Delete an image to an existing image-poll')
        .addStringOption(option =>
            option
              .setName('poll-id')
              .setDescription('the poll id for the poll you wish to delete an image from')
              .setRequired(true)
        )
        .addStringOption(option =>
            option
              .setName('image-id')
              .setDescription('the image id for the image you wish to delete from the poll')
              .setRequired(true)
        )
    )


export async function execute(interaction: ChatInputCommandInteraction ) {
    const subcommandName: string = interaction.options.getSubcommand()
    
    switch(subcommandName) {
        case "create":
            await createImagePoll(interaction)
            break;
        case "start":
            await startImagePoll(interaction)
            break;
        case "list":
            await list(interaction)
            break;
        case "delete":
            await deleteImagePoll(interaction)
            break;
        case "add-image":
            await addImageToPoll(interaction)
            break;
        case "delete-image":
            await deleteImageFromPoll(interaction)
            break;
    }
}

