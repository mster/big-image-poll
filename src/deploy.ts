import { REST, Routes } from "discord.js"
import { config } from "./config"
import { commands } from './commands'

const rest = new REST().setToken(config.DISCORD_TOKEN)

type DeployCommandProps = {
    id: string
}

export async function deploy({ id }: DeployCommandProps) {
    try {
        await rest.put(
            Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, id),
            { body: Object.values(commands).map(c => c.data) }
        )
        console.debug(`Commands deployed to guild: ${id}`)
    } catch (error) {
        console.error(error)
    }
}