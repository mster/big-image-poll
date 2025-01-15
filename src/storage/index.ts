import { Attachment } from 'discord.js'

import { ImagePoll, ImageData } from './imagePoll'
import { smallSnowflake } from "../utils/smallSnowflake"

class InMemoryStorage {
    private static instance: InMemoryStorage

    private polls: { [key: string]: any }

    private constructor() {
        this.polls = {}
        console.log("Storage created.")
    }

    public static getInstance(): InMemoryStorage {
        if (!InMemoryStorage.instance) {
            InMemoryStorage.instance = new InMemoryStorage()
        }
        return InMemoryStorage.instance
    }

    public getImagePoll(pollId: string): ImagePoll {
        const poll: ImagePoll | null = this.polls?.[pollId]
        if (!poll) {
            throw new Error(`Image poll does not exist with poll id: ${pollId}`)
        }
        return poll
    }

    public getPolls(): Object {
        return this.polls
    }

    public createImagePoll(creatorId: string): string {
        const pollId: string = smallSnowflake()
        const poll = new ImagePoll(pollId, creatorId)
        this.polls[pollId] = poll
        return pollId
    }

    public deleteImagePoll(pollId: string, creatorId: string): boolean {
        if (this.polls[pollId].creatorId !== creatorId) {
            return false
        }
        const wasDeleted = Reflect.deleteProperty(this.polls, pollId)
        return wasDeleted
    }

    public addImageToImagePoll(pollId: string, uploaderId: string, imageId: string, attachment: Attachment): void {
        const poll: ImagePoll = this.polls[pollId]
        const imageData: ImageData = {
            id: imageId,
            uploaderId,
            url: attachment.url,
            filename: attachment.name
        }
        poll.addImage(imageData)
        this.polls[pollId] = poll
    }

    public deleteImageFromImagePoll(pollId: string, imageId: string) : void {
        const poll: ImagePoll = this.polls[pollId]
        poll.deleteImage(imageId)
        this.polls[pollId] = poll
    }

    public getImageFromImagePoll(pollId: string, imageId: string): ImageData {
        const poll: ImagePoll = this.polls[pollId]
        const image: ImageData = poll.getImage(imageId)
        return image
    }
}

export default InMemoryStorage