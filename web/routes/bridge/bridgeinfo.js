const express = require('express');

const router = express.Router();

const query = require('myMysql');

router.get('/select',async function(req,res){
    let sql = `select BridgeID, BridgeNum,BridgeName,TotalLength,ManageUnit,CuringGrade,MainStructType from mmp.tbl_bridge_info `;
    let resData;
    try{
         resData = await query(sql);
    } catch(e){
        console.log(`select err`+e)
    }
    res.json(resData);
});

router.post('/update',async function(req,res){
    let sql = `update mmp.tbl_bridge_info set 
                    BridgeName='${req.body.BridgeName}',
                    MainStructType='${req.body.MainStructType}',
                    FunctionType='${req.body.FunctionType}',
                    CuringType='${req.body.CuringType}',
                    CuringGrade='${req.body.CuringGrade}',
                    BridgeArea='${req.body.BridgeArea}',
                    BridgeTown='${req.body.BridgeTown}',
                    BridgeRoad='${req.body.BridgeRoad}',
                    TotalLength='${req.body.TotalLength}',
                    TotalArea='${req.body.TotalArea}',
                    MaxSpan='${req.body.MaxSpan}',
                    AcrossName='${req.body.AcrossName}',
                    ManageUnit='${req.body.ManageUnit}',
                    CuringUnit='${req.body.CuringUnit}',
                    NumberRule='${req.body.NumberRule}',
                    BridgeLON='${req.body.BridgeLON}',
                    BridgeLAT='${req.body.BridgeLAT}',
                    LimitHeight='${req.body.LimitHeight}',
                    LimitWidth='${req.body.LimitWidth}',
                    LimitLoad='${req.body.LimitLoad}',
                    WaterLevel='${req.body.WaterLevel}',
                    HighestWaterLevel='${req.body.HighestWaterLevel}',
                    DesignWaterLevel='${req.body.DesignWaterLevel}',
                    AntiSeismic='${req.body.AntiSeismic}',
                    LoadStandard='${req.body.LoadStandard}',
                    LoadGrade='${req.body.LoadGrade}',
                    DesignUnit='${req.body.DesignUnit}',
                    BuildUnit='${req.body.BuildUnit}',
                    SuperviseUnit='${req.body.SuperviseUnit}'
                where BridgeID=${req.body.BridgeID}`;
    let resData;
    try{
        resData = await query(sql);
   } catch(e){
       console.log(`select err`+e)
   }
   res.json(resData);
})

router.post('/delete',async function(req,res){
    console.log(req.body);
    let sql = `delete from mmp.tbl_bridge_info where BridgeID= '${req.body.BridgeID}'`;

    let del;
    try{
        del = await query(sql);

    }catch (e) {
        console.log(`select err`+e)
    }

    res.send('删除成功');
});

router.post('/selInfo', async function(req,res){

    let sql = `select * from mmp.tbl_bridge_info where BridgeID = ${req.body.BridgeID} `;
    let resInfo;
    try{
         resInfo = await query(sql);

    }catch (e) {
        console.log(`select err`+e)
    }
    console.log(resInfo);
    res.send(resInfo);
});

function Struct(typeID, label,BridgeLineID, children){
    this.typeID = typeID;
    this.label = label;
    this.BridgeLineID = BridgeLineID;
    this.children = children;
}

router.get('/tree', async function(req,res){
    let treedata=[];
    let bridge = {};
    bridge.bridgeId=req.query.BridgeID;
    bridge.label=req.query.BridgeName;
    bridge.children = [];
    let line_sql = `select BridgeLineID, LineName from mmp.tbl_bridge_line where BridgeID = ${req.query.BridgeID}`;
    try{
        resInfo = await query(line_sql);
        for(let i = 0; i< resInfo.length; i++){
            let oneLine = {};
            oneLine.BridgeLineID = resInfo[i].BridgeLineID;
            oneLine.label = resInfo[i].LineName;
            oneLine.children = [];
            
            let span_sql = `select BridgeSpanID,SpanNum  from mmp.tbl_bridge_span where BridgeLineID = ${resInfo[i].BridgeLineID}`;
            let res_span  = await query(span_sql);
            let spans = [];
            for(let j = 0; j < res_span.length; j++){
                let one_span = {};
                one_span.spanID = res_span[j].BridgeSpanID;
                one_span.label = res_span[j].SpanNum;
                one_span.BridgeLineID = resInfo[i].BridgeLineID;
                spans.push(one_span);
            }
            let up = new Struct(1, "上部结构",'', spans);
            oneLine.children.push(up);

            let pier_sql = `select BridgePierID,PierNum  from mmp.tbl_bridge_pier where  BridgeLineID = ${resInfo[i].BridgeLineID}`;
            let res_pier  = await query(pier_sql);
            let downs = [];
            for(let j = 0; j < res_pier.length; j++){
                let one_pier = {};
                one_pier.pierId = res_pier[j].BridgePierID;
                one_pier.label = res_pier[j].PierNum;
                one_pier.BridgeLineID = resInfo[i].BridgeLineID;
                downs.push(one_pier);
            }
            
            let abutment_sql = `select ID,BridgeAbutmentNum  from mmp.tbl_bridge_abutment where BridgeLineID = ${resInfo[i].BridgeLineID}`;
            let res_abutment  = await query(abutment_sql);
            for(let j = 0; j < res_abutment.length; j++){
                let one_abutment = {};
                one_abutment.abutmentId = res_abutment[j].ID;
                one_abutment.label = res_abutment[j].BridgeAbutmentNum;
                one_abutment.BridgeLineID = resInfo[i].BridgeLineID;
                downs.push(one_abutment);
            }
            let down = new Struct(2, "下部结构",'', downs);
            oneLine.children.push(down);


            let surface_sql = `select BridgeSurfaceID  from mmp.tbl_bridge_surface where  BridgeLineID = ${resInfo[i].BridgeLineID}`;
            let res_surface  = await query(surface_sql);
            let surface = new Struct(3, "桥面系",resInfo[i].BridgeLineID,'');
            
            console.log(surface);
            oneLine.children.push(surface);

            let att_sql = `select BridgeAttachID  from mmp.tbl_bridge_attachment where  BridgeLineID = ${resInfo[i].BridgeLineID}`;
            let res_attr  = await query(att_sql);
           
            let attachment = new Struct(4, "附属设施",resInfo[i].BridgeLineID,'');
            oneLine.children.push(attachment);

            let anti_sql = `select AntiknockID  from mmp.tbl_bridge_antiknock where  BridgeLineID = ${resInfo[i].BridgeLineID}`;
            let res_anti  = await query(anti_sql);
           
            let antiknock = new Struct(5, "抗震设施",resInfo[i].BridgeLineID,'');
            oneLine.children.push(antiknock);
            
            bridge.children.push(oneLine);

            
        }
        treedata.push(bridge)
        res.json(treedata);
   }catch (e) {
       console.log(`select err`+e)
   }

});
module.exports = router;