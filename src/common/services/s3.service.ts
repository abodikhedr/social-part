
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import crypto, { randomUUID } from "node:crypto"
import { get } from "node:http"
import { AWS_BUCKET_NAME } from "../../config/config.service.js"
class S3Service {
    client:any
    constructor() { }

    async createSignedUrl({
        fileName,
        path = "General",
        ContentType,
        expiresIn = 60
    }: {
        fileName?: string,
        ContentType: string,
        expiresIn?: number,
        path?: string
    }) {

        const commend = new PutObjectCommand({
            Bucket: AWS_BUCKET_NAME,
            Key: `social_media_app/${path}/${randomUUID}__${fileName}`,
            ContentType
        })
        const url = await getSignedUrl(this.client, commend, { expiresIn })
        return { url, key: commend.input.Key }
    }

    async getSignedUrl(Key: string, expiresIn: number = 60 * 5) {
        const commend = new GetObjectCommand({
            Bucket: AWS_BUCKET_NAME,
            Key
        })
        const url = await getSignedUrl(this.client, commend, { expiresIn })
        return url
    }


}
