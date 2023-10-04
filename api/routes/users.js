import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();
router.get("/prueba",verifyToken,(req,res,next)=>{
    res.send("Hola estoy autentificando!")
})


router.get("/prueba/:id",verifyUser,(req, res,next)=>{
    res.send("Hola estoy autentificando y puedo eliminar!")
})

router.get("/admin/:id",verifyAdmin,(req, res,next)=>{
    res.send("Hola ADMIN estoy autentificando y puede hacer todas las solicitudes!")
})



//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id",verifyUser, deleteUser);

//GET
router.get("/:id",verifyUser, getUser);

//GET ALL
router.get("/",verifyAdmin, getUsers);

export default router;