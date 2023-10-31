import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUSer } from "../utils/verifyToken.js";
const router = express.Router();

// router.get("/prueba",verifyToken,(req, res, next)=> {
//     res.send("Hola estoy autenticando!")
// })

// router.get("/prueba/:id",verifyUSer,(req, res, next)=> {
//     res.send("Hola estoy autenticando Y soy Admin!")
// })

// router.get("/admin/:id",verifyAdmin,(req, res, next)=> {
//     res.send("Hola Soy Dios PA!")
// })


//UPDATE USERS
router.put("/:id",verifyUSer,updateUser);

//DELETE USERS
router.delete("/:id",verifyUSer,deleteUser)

 //GET USERS
router.get("/:id",verifyUSer,getUser)

 //GET ALL USERS
router.get("/",verifyAdmin,getUsers)

    export default router;