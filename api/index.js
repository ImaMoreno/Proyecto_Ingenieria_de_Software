import express from "express";
import mongoose from "mongoose";
import mongodb from "mongodb";
import dotenv from "dotenv";
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import roomRoute from './routes/rooms.js';
import hotelsRoute from './routes/hotels.js';
import cookieParser from "cookie-parser";
import cors from 'cors';


dotenv.config();

const connect = async() =>{
  try{
    await mongoose.connect(process.env.MONGO)
    console.log("Conectados a MONGO")
  }catch (error){
    //handError(error);
    throw error;
  }
}
mongoose.connection.on('coneccted',() =>{
  console.log("MongoDB conectado!!!");
})
mongoose.connection.on('disconnected',()=>{
  console.log("MongoDB Desconectado!!");
})

const app= express();


//middLewares
app.use(cookieParser());
app.use(express.json());
app.use(cors())

app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/rooms",roomRoute);
app.use("/api/hotels",hotelsRoute);

app.use((err,req, res, next)=>{
  const errorStatus = err.status  || 500
  const errorMessage = err.message  || "Servidor no disponible"
  return res.status(errorStatus).json({
    message : errorMessage,
    status: errorStatus,
    success: false,
    stack: err.stack
})
})

app.listen(8800,async ()=>{
  connect();
    console.log('Conectando al backend!!!')
});

app.get("/reservas",(req,res)=>{
  res.status(200).send("Todo esta OK")
});


