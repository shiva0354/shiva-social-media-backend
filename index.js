import express from "express";
import helmet from "helmet";
import cors from "cors";
import {config} from "./app/config/config.js";
import router from "./app/routes/api.js";
import { connection } from "./app/database/connection.js";

const app = express()

app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(cors())

app.use(router)

connection()

app.listen(config.port, () => { console.log(`Server Running On Port: ${config.port}`) })
