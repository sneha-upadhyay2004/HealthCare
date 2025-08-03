import express from "express";
import { createServer } from "node:http";
import dotenv from 'dotenv';
dotenv.config();


import mongoose from "mongoose";
import { connectToSocket } from "./controllers/Socket.js";

import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
 import  EmergencyRoutes from "./routes/EmergencyRoutes.js";
import HospitalRoutes from "./routes/HospitalRoutes.js";


const app = express();
const server = createServer(app);
const io = connectToSocket(server);


app.set("port", (process.env.PORT || 4000))
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/emergency",EmergencyRoutes);
app.use("/api/v1/hospital",HospitalRoutes)



const start = async () => {
    app.set("mongo_user")
    const connectionDb = await mongoose.connect('mongodb+srv://s8409379:5twzxNAvSEuYQ4KK@healthcare.dacizbd.mongodb.net/')

    console.log(`MONGO Connected DB HOst: ${connectionDb.connection.host}`)
    server.listen(app.get("port"), () => {
        console.log("LISTENIN ON PORT 4000")
    });



}
start()

// 'mongodb+srv://s8409379:5twzxNAvSEuYQ4KK@healthcare.dacizbd.mongodb.net/
// app.use("/api/v1/users", userRoutes);
// app.use("/api/v1/emergency",EmergencyRoutes);
// app.use("/api/hospitals",HospitalRoutes)

// mport mongoose from "mongoose"
// import dotenv from 'dotenv';
// dotenv.config();
// import cors from "cors";
// import { connectToSocket } from "./controllers/Socket.js";
// import userRoutes from './routes/userRoutes.js';
// import  EmergencyRoutes from "./routes/EmergencyRoutes.js";
// import  HospitalRoutes  from "./routes/HospitalRoutes.js";
