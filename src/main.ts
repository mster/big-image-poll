import { Client, Events, GatewayIntentBits, Guild, Interaction  } from 'discord.js'

import { config } from "./config"
import { deploy } from "./deploy"
import { commands } from "./commands"


const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
    ]
})

client.once(Events.ClientReady, (readyClient: Client<true>) => {
  console.log(`Big-poll is ready! Logged in as ${readyClient.user.tag}`)
})

client.on(Events.GuildCreate, async (guild: Guild) => {
  if (!guild.id) { 
    console.error(new Error('No guild id found'))
    return
  }

  try {
    await deploy(guild)
  } catch (error) {
    console.error(error)
  }
})

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return

  const { commandName } = interaction
  if (commands[commandName as keyof typeof commands]) {
    try {
      await commands[commandName as keyof typeof commands].execute(interaction)
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (interaction.replied || interaction.deferred) interaction.editReply(error.message)
        else interaction.reply(error.message)
      } else {
        interaction.reply('Unknown error occurred')
      }
    }
    return
  }

  interaction.reply('I don\'t see that command...')
})

client.login(config.DISCORD_TOKEN)
