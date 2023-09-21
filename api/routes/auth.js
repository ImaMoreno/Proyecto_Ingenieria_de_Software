import express from "express";

const router = express.Router();
router.get("/",(req,res)=>{
    res.send("Endpoint Auth");
});

export default router;

