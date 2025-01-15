import dotenv from "dotenv"
import * as constants from "./constants"

dotenv.config()

const { DISCORD_TOKEN, DISCORD_CLIENT_ID } = process.env

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
    throw new Error('Missing discord environment variables')
}

export const config = {
    DISCORD_TOKEN,
    DISCORD_CLIENT_ID,
    ...constants
}