const express = require("express");
const router = express.Router();
const controller = require("../controllers/home.controllers.js");

router.get("/test_json", (req, res)=>{
    req.status(200).json({code: 200, msg:"OK"});
});

router.get("/home", (req, res)=>{
    req.status(200).json({code: 200, msg:"OK"});
})

router.get('/cerrar_sesion', controller.render_cerrar_sesion);