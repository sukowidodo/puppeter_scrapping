import "reflect-metadata"
import { DataSource } from "typeorm"
import {Adzan} from "./models/Adzan"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: (process.env.DB_PORT ?? 3306) as number,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATA,
    synchronize: true,
    logging: false,
    entities: [Adzan],
    migrations: [],
    subscribers: [],
})
