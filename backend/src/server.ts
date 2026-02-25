import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import express from 'express'
import cors from 'cors'
import router from './router'
import { connectDB } from './config/db'
import { corsConfig } from "./config/cors";
connectDB()

const app = express()

app.use(cors(corsConfig))

app.use(express.json())
app.use('/', router)

export default app