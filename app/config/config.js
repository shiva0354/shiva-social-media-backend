import dotenv from "dotenv"
dotenv.config()

export const config = {
    port: process.env.PORT || 3000,
    app_name: process.env.APP_NAME || 'Node Exprerss App',
    jwt_secret: process.env.JWT_SECRET || config.app_name,
    db_string: process.env.MONGO_URL || ''
}
