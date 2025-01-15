import { randomUUID } from "crypto"

export function smallSnowflake () {
    const fullUUID = randomUUID()
    return fullUUID.split('-')[0]
}