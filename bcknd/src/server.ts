import dotenv from 'dotenv';
import Express from 'express';
import cors from 'cors';
import corsConfig from './config/corsConfig';
import dbConn from './config/dbConn';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoutes from './routers/authRoutes';
import blogCrud from './routers/blogCrud';

dotenv.config()
dbConn();
const app = Express();
const PORT = parseInt(process.env.PORT as string) || 3500

app.use(cors(corsConfig))
app.use(cookieParser())
app.use(Express.json());
app.use(Express.text());
app.use(Express.urlencoded({ extended: false }));


app.use("/auth", authRoutes);
app.use("/", blogCrud);

app.use("*", (_, res)=>{
    return res.status(404).json({error: "Requested endpoint not found"})
})

mongoose.connection.once("open", ()=>{
    console.log("Connected to Database");  
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})