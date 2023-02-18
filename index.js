import express from 'express';
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import dotenv from 'dotenv'
import connectDB from './config/dbConnect.js';

//import routers
import authRouter from "./routes/authRoute.js"
import adminRouter from "./routes/adminRoute.js"

import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

dotenv.config({ path: path.resolve(__dirname, "./.env") });







connectDB();
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use('/api/user', authRouter)
app.use('/api/admin', adminRouter)

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

const server = app.listen(PORT, () => { 
   console.log(`server started on port ${PORT}`); 
})
