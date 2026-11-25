"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const node_crypto_1 = require("node:crypto");
const config_service_js_1 = require("../../config/config.service.js");
class S3Service {
    client;
    constructor() { }
    async createSignedUrl({ fileName, path = "General", ContentType, expiresIn = 60 }) {
        const commend = new client_s3_1.PutObjectCommand({
            Bucket: config_service_js_1.AWS_BUCKET_NAME,
            Key: `social_media_app/${path}/${node_crypto_1.randomUUID}__${fileName}`,
            ContentType
        });
        const url = await (0, s3_request_presigner_1.getSignedUrl)(this.client, commend, { expiresIn });
        return { url, key: commend.input.Key };
    }
    async getSignedUrl(Key, expiresIn = 60 * 5) {
        const commend = new client_s3_1.GetObjectCommand({
            Bucket: config_service_js_1.AWS_BUCKET_NAME,
            Key
        });
        const url = await (0, s3_request_presigner_1.getSignedUrl)(this.client, commend, { expiresIn });
        return url;
    }
}
//# sourceMappingURL=s3.service.js.map