const express = require('express');

const router = express.Router();

const query = require('myMysql');

router.get('/select',async function(req,res){
    //查出入口表返回道面基本信息
    let sql = `select * from mmp.tbl_passageway_roadsurface where PassagewayID=${req.query.PassagewayID} and RoadSurfaceID=${req.query.RoadSurfaceID}`;
    let resInfo = await query(sql);
    //查构件表返回当前道面下的构件
    let sqlCom = `select * from mmp.tbl_passageway_component where PassagewayID=${req.query.PassagewayID} and SuperStructure='${resInfo[0].TypeName}' and StructureID=${req.query.RoadSurfaceID}`;
    try{
        let resCom = await query(sqlCom);
        let obj ={};
        obj.data1=resInfo;
        obj.data2=resCom;
        res.json(obj);
    }catch(e){
        console.log('get data err'+e);
    }
})
//道面的新增
router.post('/insert',async function(req,res){
    let sql = `insert into mmp.tbl_passageway_roadsurface(PassagewayID,RoadSurfaceName,SurfaceMatrial,NonslipMaterial,Length,Width,Clearance,TypeName) values(${req.body.PassagewayID},'${req.body.RoadSurfaceName}',${req.body.SurfaceMatrial},${req.body.NonslipMaterial},${req.body.Length},${req.body.Width},'${req.body.Clearance}','${req.body.TypeName}')`;
    try{
        let result = await query(sql);
        console.log(result);
        res.json(result);
    }catch(e){
        console.log('get data err'+e);
    }
})
//道面信息修改
router.post('/update',async function(req,res){
    let sql = `update mmp.tbl_passageway_roadsurface set RoadSurfaceName='${req.body.RoadSurfaceName}',SurfaceMatrial='${req.body.SurfaceMatrial}',NonslipMaterial='${req.body.NonslipMaterial}' where RoadSurfaceID=${req.body.RoadSurfaceID}`;
    try{
        let result = await query(sql);
        console.log(result);
        res.json('更新成功');
    }catch(e){
        console.log('get data err'+e);
    }
})
//道面的删除
router.get('/delete',async function(req,res){
    let sql = `delete from mmp.tbl_passageway_roadsurface where RoadSurfaceID=${req.query.RoadSurfaceID}`;
    try{
        let result = await query(sql);
        res.json('删除成功');
    }catch(e){
        console.log('insert data err'+e);
    }
})
//返回道面可选的构件类型
router.get('/selType',async function(req,res){
    let sqlType = `select ComponentTypeName from mmp.componenttype where SuperStructure in (select TypeName from mmp.tbl_passageway_roadsurface)`;
    try{
        let result = await query(sqlType);
        res.json(result);
    }catch(e){
        console.log('insert data err'+e);
    }
})
//道面下构件信息的新增
router.get('/add',async function(req,res){
   
    let sql = `insert into mmp.tbl_passageway_component(PassagewayID,SuperStructure,StructureID,ComponentNum,ComponentName,ComponentTypeName) values(${req.query.PassagewayID},'${req.query.SuperStructure}',${req.query.StructureID},'${req.query.ComponentNum}','${req.query.ComponentName}','${req.query.ComponentTypeName}')`;
    try{
        let result = await query(sql);
        console.log(result);
        res.json(result);
    }catch(e){
        console.log('get data err'+e);
    }
})
//道面下构件信息的修改
router.get('/updateCom',async function(req,res){
   
    let sql = `update mmp.tbl_passageway_component set
                    ComponentTypeName='${req.query.ComponentTypeName}', 
                    ComponentNum='${req.query.ComponentNum}', 
                    ComponentName='${req.query.ComponentName}'
                where ComponentID=${req.query.ComponentID}`;
    try{
        let result = await query(sql);
        console.log(result);
        res.json('更新成功');
    }catch(e){
        console.log('get data err'+e);
    }
})
//道面下构件信息的删除
router.get('/deleteCom',async function(req,res){
    let sql = `delete from mmp.tbl_passageway_component where ComponentID=${req.query.ComponentID}`;
    try{
        let result = await query(sql);
        res.json('删除成功');
    }catch(e){
        console.log('insert data err'+e);
    }
})

module.exports = router;

