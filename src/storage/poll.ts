export interface PollData {
    id: string,
    creatorId: string
}

export class Poll implements PollData {
    id: string
    creatorId: string

    constructor(id: string, creatorId: string) {
        this.id = id
        this.creatorId = creatorId
    }
}