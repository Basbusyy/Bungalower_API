const express = require('express');
const router = express.Router();
const roomController = require('../controller/roomController');
const upload = require('../middleware/upload');
//CREATE

//UPDATE
router.post("/",roomController.addRoom)
//DELETE
//GETONEBYID
router.get("/:id",roomController.getRoomById)
//GET ALL
router.get("/",roomController.getRoom)

module.exports = router;
