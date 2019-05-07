const express = require('express');

const router = express.Router();

const query = require('myMysql');

router.get('/select',async function(req,res){
    let sql = `select * from mmp.tbl_bridge_surface where BridgeLineID=${req.query.BridgeLineID} and BridgeSurfaceID=${req.query.BridgeSurfaceID}`;
    try{
        let result = await query(sql);
        console.log(result);
        res.json(result);
    }catch(e){
        console.log('get data err'+e);
    }
})
//线路id 铺装类型  铺装材料  铺装厚度  铺装层宽度  桥面标高  桥头平顺宽度  桥头平顺单双类型  有无搭板  伸缩缝类型   伸缩缝宽差 伸缩缝材料  伸缩缝宽度  伸缩缝总条数
router.post('/insert',async function(req,res){
    let sql = `insert into mmp.tbl_bridge_surface(
                BridgeLineID,
                SpreadType,
                SpreadMaterial,
                SpreadThinkness,
                SpreadWidth,
                SurfaceElevation,
                HeadSmoothWidth,
                SingleDoubleType,
                IsHaveSlab,
                ExpansionJointType,
                ExpansionJointHigh,
                ExpansionJointMaterial,
                ExpansionJointWidth,
                ExpansionJointCount)
              values(
                  ${req.body.BridgeLineID},
                 '${req.body.SpreadType}',
                 '${req.body.SpreadMaterial}',
                 '${req.body.SpreadThinkness}',
                 '${req.body.SpreadWidth}',
                 '${req.body.SurfaceElevation}',
                 '${req.body.HeadSmoothWidth}',
                 '${req.body.SingleDoubleType}',
                 '${req.body.IsHaveSlab}',
                 '${req.body.ExpansionJointType}',
                 '${req.body.ExpansionJointHigh}',
                 '${req.body.ExpansionJointMaterial}',
                 '${req.body.ExpansionJointWidth}',
                 '${req.body.ExpansionJointCount}'
                    )`;
    try{
        let result = await query(sql);
        console.log(result);
        res.json(result);
    }catch(e){
        console.log('get data err'+e);
    }
})

router.post('/update',async function(req,res){
    let sql = `update mmp.tbl_bridge_surface set 
                    SpreadType='${req.body.SpreadType}',
                    SpreadMaterial='${req.body.SpreadMaterial}',
                    SpreadThinkness='${req.body.SpreadThinkness}',
                    SpreadWidth='${req.body.SpreadWidth}',
                    SurfaceElevation='${req.body.SurfaceElevation}',
                    HeadSmoothWidth='${req.body.HeadSmoothWidth}',
                    SingleDoubleType='${req.body.SingleDoubleType}',
                    IsHaveSlab='${req.body.IsHaveSlab}',
                    ExpansionJointType='${req.body.ExpansionJointType}',
                    ExpansionJointHigh='${req.body.ExpansionJointHigh}',
                    ExpansionJointMaterial='${req.body.ExpansionJointMaterial}',
                    ExpansionJointWidth='${req.body.ExpansionJointWidth}',
                    ExpansionJointCount='${req.body.ExpansionJointCount}'
                where BridgeSurfaceID=${req.body.BridgeSurfaceID}`;
    try{
        let result = await query(sql);
        console.log(result);
        res.json('更新成功');
    }catch(e){
        console.log('get data err'+e);
    }
})

router.get('/delete',async function(req,res){
    let sql = `delete from mmp.tbl_bridge_surface where BridgeSurfaceID=${req.query.BridgeSurfaceID}`;
    try{
        let result = await query(sql);
        console.log(1111);
        res.json('删除成功');
    }catch(e){
        console.log('insert data err'+e);
    }
})

module.exports = router;

