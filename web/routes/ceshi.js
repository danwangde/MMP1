const express= require('express');

const router = express.Router();

const path = require('path');

//const query = require('myMysql');

router.post('/ce',async function (req,res) {
    console.log(path.dirname());
    res.json(123)

});

module.exports = router;