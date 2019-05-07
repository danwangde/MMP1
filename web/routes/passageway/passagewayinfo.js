const express = require('express');

const router = express.Router();

const query = require('myMysql');

router.get('/select',async function(req,res){
    let sql = `select PassagewayID,PassagewayNum, PassagewayName,PassagewayNum,Length,Width,High,ManageUnit from mmp.tbl_passageway_info `;
    let resData;
    try{
         resData = await query(sql);
    } catch(e){
        console.log(`select err`+e)
    }
    res.json(resData);
});

router.post('/update',async function(req,res){
    let sql = `update mmp.tbl_passageway_info set 
                    PassagewayName='${req.body.PassagewayName}',
                    PassagewayNum='${req.body.PassagewayNum}',
                    CrossStrucure='${req.body.CrossStrucure}',
                    Area='${req.body.Area}',
                    Town='${req.body.Town}',
                    PassagewayRoad='${req.body.PassagewayRoad}',
                    Length='${req.body.Length}',
                    Width='${req.body.Width}',
                    High='${req.body.High}',
                    NumberRule='${req.body.NumberRule}',
                    ManageUnit='${req.body.ManageUnit}',
                    CuringUnit='${req.body.CuringUnit}',
                    DesignUnit='${req.body.DesignUnit}',
                    BuildUnit='${req.body.BuildUnit}',
                    SuperviseUnit='${req.body.SuperviseUnit}',
                    ChannelLongitude='${req.body.ChannelLongitude}',
                    ChannelLatitude='${req.body.ChannelLatitude}'
                where PassagewayID=${req.body.PassagewayID}`;
    let resData;
    try{
        resData = await query(sql);
        res.json('修改成功');
   } catch(e){
       console.log(`select err`+e)
   }
})

 router.get('/delete',async function(req,res){
    console.log(req.query);
    let sql = `delete from mmp.tbl_passageway_info where PassagewayID= '${req.query.PassagewayID}'`;
    try{
        let del = await query(sql);
        console.log(del);
        res.send('删除成功');
    }catch (e) {
        console.log(`select err`+e)
    }

   
});



router.post('/selInfo', async function(req,res){

    let sql = `select * from mmp.tbl_passageway_info where PassagewayID = '${req.body.PassagewayID}' `;
    let resInfo;
    try{
         resInfo = await query(sql);

    }catch (e) {
        console.log(`select err`+e)
    }
    console.log(resInfo);
    res.send(resInfo);
});


function Struct(typeid, label,id, children){
    this.typeid = typeid;
    this.label = label;
    this.id = id;
    this.children = children;
}

router.get('/tree',async function(req,res){
    let treedata = [];
    let onetree = {};

    onetree.PassagewayID = req.query.PassagewayID;
    onetree.label = req.query.PassagewayName;
    onetree.children = [];
    try{
        let main_sql = `select MainStructID from mmp.tbl_passageway_mainstructure where PassagewayID=${req.query.PassagewayID}`;
        let res_main = await query(main_sql);
        let mainStruct={};
        if(res_main.length==0){
            mainStruct = new Struct(1,'主体构造物','','');
        }else{
             mainStruct = new Struct(1,'主体构造物',res_main[0].MainStructID,'');
        }
       
        onetree.children.push(mainStruct);
        /* ............................................................................................................................. */
        let entrance_sql = `select EntranceID,EntranceName from mmp.tbl_passageway_entrance where PassagewayID=${req.query.PassagewayID}`;
        let res_entrance = await query(entrance_sql);
        let entrances = [];
        for(let item of res_entrance){
            let one_entrance = {};
            one_entrance.entranceid = item.EntranceID;
            one_entrance.label = item.EntranceName;
            entrances.push(one_entrance);
        }
        let entrance = new Struct(2,'出入口','',entrances);
        onetree.children.push(entrance);
         /* ............................................................................................................................. */
         let roadsurface_sql = `select RoadSurfaceID,RoadSurfaceName from mmp.tbl_passageway_roadsurface where PassagewayID=${req.query.PassagewayID}`;
         let res_roadsurface = await query(roadsurface_sql);

         let surface = [];
         for(let item of res_roadsurface){
             let one_roadsurface = {};
             one_roadsurface.roadsurfaceid = item.RoadSurfaceID;
             one_roadsurface.label = item.RoadSurfaceName;
             surface.push(one_roadsurface);
         }
         let roadsurface = new Struct(3,'道面','',surface);
         onetree.children.push(roadsurface);
        /* ............................................................................................................................. */
        let drainage_sql = `select DrainageID from mmp.tbl_passageway_drainage where PassagewayID=${req.query.PassagewayID}`;
        let res_drainage = await query(drainage_sql);
        let drainageStruct = {};
        if(res_drainage.length==0){
            drainageStruct = new Struct(4,'排水设施','','');
        }else{
            drainageStruct = new Struct(4,'排水设施',res_drainage[0].DrainageID,'');
        }
        onetree.children.push(drainageStruct);
        /* ............................................................................................................................. */
        let attachment_sql = `select AttachmentID from mmp.tbl_passageway_attachment where PassagewayID=${req.query.PassagewayID}`;
        let res_attachment = await query(attachment_sql);
        let attachmentStruct = {};
        if(res_attachment.length==0){
            attachmentStruct = new Struct(5,'附属设施','','');
        }else{
            attachmentStruct = new Struct(5,'附属设施',res_attachment[0].AttachmentID,''); 
        }
        onetree.children.push(attachmentStruct);
        /* ............................................................................................................................. */
        
        treedata.push(onetree);
    
        res.json(treedata);
    }catch(e){
        console.log(`select data err`+e);
    }
   
})

module.exports = router;