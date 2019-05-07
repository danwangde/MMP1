const express = require('express');

const router = express.Router();

const query = require('myMysql');

router.get('/select',async function(req,res){
    let sql = `select BridgeID, BridgeNum, BridgeName, BridgeType,  CuringGrade, Cycle, Frequency, PatrolUnit from mmp.tbl_bridge`;

    try{
        var resData = await query(sql);
    } catch(e){
        console.log(`select err`+e)
    }
    res.json(resData);
});

router.post('/update',async function(req,res){
    let update = req.body;
    console.log(update);
    let sql = `update tbl_bridge set Cycle = '${update.Cycle}', Frequency = '${update.Frequency}', PatrolUnit = '${update.PatrolUnit}' where BridgeID = '${update.BridgeID}'`;

    try{
        var result = await query(sql);
    } catch(e){
        console.log(`select err`+e)
    }
    res.json(result);
});


module.exports = router;