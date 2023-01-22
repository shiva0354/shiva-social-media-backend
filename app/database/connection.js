import mongoose from "mongoose";
import {config} from "../config/config.js";

export const connection = () => {
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(config.db_string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    } catch (error) {
        console.log(`${error} did not connect`)
    }
}