const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index");
const {upload} = require("../uploader/uploader");


router.post("/import", upload("file"), indexController.import);
router.get("/export",indexController.export);


module.exports =router;