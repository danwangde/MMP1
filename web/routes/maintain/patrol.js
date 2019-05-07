const express = require('express');

const router = express.Router();

const query = require('myMysql');

router.get('/select',async function(req,res){
    let sql =  `select * from mmp.tbl_maintain_patrol`;

    try{
        var resData = await query(sql);
    } catch(e){
        console.log(`select err`+e)
    }
    res.json(resData);
});


router.get('/assess',async function(req,res){
  let sql = `select  b.BridgeName ,p.StartTime,p.EndTime, b.Frequency, b.PatrolUnit, p.ActualTimes, p.CreateDate from mmp.tbl_maintain_parassess p inner join mmp.tbl_bridge b on p.BridgeName=b.BridgeName`;

    try{
        var resData = await query(sql);
    } catch(e){
        console.log(`select err`+e)
    }
    res.json(resData);
});

router.get('/times',async function(req,res){

    let sql= `select BridgeName as Name , count(*) as ActualTimes from mmp.tbl_maintain_patrol group by BridgeName`;
    try{
        var resData = await query(sql);
    } catch(e){
        console.log(`select err`+e)
    }
    res.json(resData);
});


module.exports = router;