    import express from "express";
    import mongoose from "mongoose";
    import dotenv from "dotenv";
    import authRoute from "./routes/auth.js";
    import hotelsRoute from "./routes/hotels.js";
    import roomsRoute from "./routes/rooms.js";
    import usersRoute from "./routes/users.js";
    import cookieParser from "cookie-parser";
    import cors from 'cors';
    

    dotenv.config()
    const app = express();
    
    const connect = async ()=>{
        try{
            await mongoose.connect(process.env.MONGO);
            console.log("Conectados a MONGODB");
        }catch(error){
            //handleError(error);
            throw error;
        }
}
    mongoose.connection.on('connect',()=>{
        connect.log("MongoDB Conectado!");
    })
    mongoose.connection.on('disconnected',()=>{
        console.log("Mongo DB Desconectado!")
    })
    //middlewares

    app.use(express.json());
    app.use(cookieParser());
    app.use(cors());

    app.use("/api/auth",authRoute);
    app.use("/api/hotels",hotelsRoute);
    app.use("/api/rooms",roomsRoute);
    app.use("/api/users",usersRoute);

    app.use((err, req, res, next)=>{
        const errorStatus = err.status || 500
        const errorMessage = err.message || "Servidor no disponible"
        return res.status(errorStatus).json({
            message:errorMessage,
            status:errorStatus,
            success: false,
            stack: err.stack
        }) 
    })

    app.listen (8800, ()=>{
        connect()
        console.log('Conectado al backend!')
        })

    app.get("/reservas", (req, res)=>{
        res.send(200, "Hola todo OK")
        })