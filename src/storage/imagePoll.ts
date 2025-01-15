export interface ImagePollData {
    id: string
    creatorId: string
    images?: Array<ImageData>
}

export interface ImageData {
    id: string,
    uploaderId: string
    url: string
    filename: string
}

export class ImagePoll implements ImagePollData {
    id: string
    creatorId: string
    images: Array<ImageData>

    constructor(id: string, creatorId: string) {
        this.id = id
        this.creatorId = creatorId
        this.images = []
    }

    public addImage(imageData: ImageData) {
        this.images.push(imageData)
    }

    public deleteImage(imageId: string) {
        this.images = this.images.filter(image => image.id != imageId)
    }

    public getImage(imageId: string): ImageData {
        const image: ImageData | undefined = this.images.find(imageData => imageData.id = imageId)
        if (!image) {
            throw new Error('Cannot get image that does not exist!')
        }
        return image
    }

    public getImages(): Array<ImageData> {
        return this.images
    }
}