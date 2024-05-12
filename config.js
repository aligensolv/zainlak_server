import * as dotenv from 'dotenv'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({
    path: path.join(__dirname, './.env')
})

export const jwt_secret_key = process.env.JWT_SECRET_KEY.trim()
export const port = process.env.PORT.trim()
export const socket_port = process.env.SOCKET_PORT.trim()
export const host = process.env.HOST.trim()
export const node_env = process.env.NODE_ENV.trim()
export const is_development = node_env == 'development'

export const database_connection_string = process.env.DATABASE_CONNECTION_STRING
export const static_files_host = process.env.STATIC_FILES_HOST
export const static_absolute_files_host = process.env.ABSOLUTE_STATIC_FILES_HOST

export const manager_phone_number = process.env.MANAGER_PHONE_NUMBER
export const manager_email = process.env.MANAGER_EMAIL

export const smtp_host = process.env.SMTP_HOST
export const smtp_port = +process.env.SMTP_PORT
export const smtp_user = process.env.SMTP_USER
export const smtp_pass = process.env.SMTP_PASS

export const firebase_notification_topic = process.env.FIREBASE_NOTIFICATION_TOPIC
