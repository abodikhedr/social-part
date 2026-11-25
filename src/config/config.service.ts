import { config } from "dotenv"
import { resolve } from "node:path"
const NODE_ENV = process.env.NODE_ENV!
config({ path: resolve(`.env.${NODE_ENV}`) })



export const PORT: number = +process.env.PORT!
export const DB_URI:string = process.env.DB_URI!
export const REDIS_URL:string = process.env.REDIS_URL!
export const ACCESS_TOKEN_SEGNATURE:string = process.env.ACCESS_TOKEN_SEGNATURE!
export const REFRESH_TOKEN_SEGNATURE:string = process.env.REFRESH_TOKEN_SEGNATURE!
export const ENCRYPTION_KEYS:string =process.env.ENCRYPTION_KEYS!
export const SALT_ROUNDS:number =+process.env.SALT_ROUNDS!
export const USER_EMAIL:string =process.env.USER_EMAIL!
export const USER_PASSWORD:string =process.env.USER_PASSWORD!
export const AUDIANCE_EMAIL:string =process.env.AUDIANCE_EMAIL!
export const AWS_BUCKET_NAME:string =process.env.AWS_BUCKET_NAME!





