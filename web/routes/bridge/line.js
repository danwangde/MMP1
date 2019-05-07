const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('mySequelize');

let Foo = sequelize.define('tbl_bridge_line',{
    BridgeLineID:{type:Sequelize.INTEGER,allowNull:false,unique:true,primaryKey:true},
    BridgeID:{type:Sequelize.INTEGER,allowNull:false},
    LineName:{type:Sequelize.STRING},
    LineNum:{type:Sequelize.STRING},
    MainStructureType:{type:Sequelize.STRING},
    LineLength:{type:Sequelize.STRING},
    LineWidth:{type:Sequelize.STRING},
    DeckArea:{type:Sequelize.STRING},
    BridgeSpan:{type:Sequelize.STRING},
    AcrossGroup:{type:Sequelize.STRING},
    BridgeSpanType:{type:Sequelize.STRING},
    BridgeHeadName:{type:Sequelize.STRING},
    BridgeTailName:{type:Sequelize.STRING},
    RetainingWallType:{type:Sequelize.STRING},
    BankRevetmentType:{type:Sequelize.STRING},
    LadderCount:{type:Sequelize.STRING},
    CurveRadius:{type:Sequelize.STRING},
    HorizontalSlope:{type:Sequelize.STRING},
    VerticalSlope:{type:Sequelize.STRING},
    StraightObliqueCorner:{type:Sequelize.STRING},
    GuideLength:{type:Sequelize.STRING},
    GuideVerticalSlope:{type:Sequelize.STRING}

},{
    timestamps: false,
    freezeTableName:true
});
Foo.sync();
//查线路表返回相应数据
router.get('/select',async (req,res)=> {
    try{
       var resData =  await Foo.findAll({
           where:{
            BridgeID:req.query.BridgeID,
            BridgeLineID:req.query.BridgeLineID
           }
       });
    }catch (e) {
        console.log('get data err'+e)
    }

    res.json(resData);
});
//更新线路表某一条的信息
router.post('/update',async (req,res)=> {
    let LineName = req.body.LineName || null;
    let LineNum =  req.body.LineNum || null;
    let MainStructureType =  req.body.MainStructureType || null;
    let LineLength =  req.body.LineLength || null;
    let LineWidth =  req.body.LineWidth || null;
    let DeckArea =  req.body.DeckArea || null;
    let BridgeSpan =  req.body.BridgeSpan || null;
    let AcrossGroup =  req.body.AcrossGroup || null;
    let BridgeSpanType =  req.body.BridgeSpanType || null;
    let BridgeHeadName =  req.body.BridgeHeadName || null;
    let BridgeTailName =  req.body.BridgeTailName || null;
    let RetainingWallType =  req.body.RetainingWallType || null;
    let BankRevetmentType =  req.body.BankRevetmentType || null;
    let LadderCount =  req.body.LadderCount || null;
    let CurveRadius =  req.body.CurveRadius || null;
    let HorizontalSlope =  req.body.HorizontalSlope || null;
    let VerticalSlope =  req.body.VerticalSlope || null;
    let StraightObliqueCorner =  req.body.StraightObliqueCorner || null;
    let GuideLength =  req.body.GuideLength || null;
    let GuideVerticalSlope =  req.body.GuideVerticalSlope || null;
    try{
        let result = await Foo.update({
            LineName,
            LineNum,
            MainStructureType,
            LineLength,
            LineWidth,
            DeckArea,
            BridgeSpan,
            AcrossGroup,
            BridgeSpanType,
            BridgeHeadName,
            BridgeTailName,
            RetainingWallType,
            BankRevetmentType,
            LadderCount,
            CurveRadius,
            HorizontalSlope,
            VerticalSlope,
            StraightObliqueCorner,
            GuideLength,
            GuideVerticalSlope
        },{
            where:{
                BridgeID:req.body.BridgeID,
                BridgeLineID:req.body.BridgeLineID
            }
        });
        console.log(result);
        res.json('更新成功');
    }catch(e){
        console.log('update err:'+e)
    }
});


//新增线路
router.post('/insert',async (req,res) =>{
    let BridgeLineID = req.body.BridgeLineID;
    let BridgeID = req.body.BridgeID;
    let LineName = req.body.LineName || null;
    let LineNum =  req.body.LineNum || null;
    let MainStructureType =  req.body.MainStructureType || null;
    let LineLength =  req.body.LineLength || null;
    let LineWidth =  req.body.LineWidth || null;
    let DeckArea =  req.body.DeckArea || null;
    let BridgeSpan =  req.body.BridgeSpan || null;
    let AcrossGroup =  req.body.AcrossGroup || null;
    let BridgeSpanType =  req.body.BridgeSpanType || null;
    let BridgeHeadName =  req.body.BridgeHeadName || null;
    let BridgeTailName =  req.body.BridgeTailName || null;
    let RetainingWallType =  req.body.RetainingWallType || null;
    let BankRevetmentType =  req.body.BankRevetmentType || null;
    let LadderCount =  req.body.LadderCount || null;
    let CurveRadius =  req.body.CurveRadius || null;
    let HorizontalSlope =  req.body.HorizontalSlope || null;
    let VerticalSlope =  req.body.VerticalSlope || null;
    let StraightObliqueCorner =  req.body.StraightObliqueCorner || null;
    let GuideLength =  req.body.GuideLength || null;
    let GuideVerticalSlope =  req.body.GuideVerticalSlope || null;
    try{
        let result = await Foo.create({
            BridgeLineID,
            BridgeID,
            LineName,
            LineNum,
            MainStructureType,
            LineLength,
            LineWidth,
            DeckArea,
            BridgeSpan,
            AcrossGroup,
            BridgeSpanType,
            BridgeHeadName,
            BridgeTailName,
            RetainingWallType,
            BankRevetmentType,
            LadderCount,
            CurveRadius,
            HorizontalSlope,
            VerticalSlope,
            StraightObliqueCorner,
            GuideLength,
            GuideVerticalSlope
        });
        console.log(result);
        res.json('插入成功');
    }catch(e){
        console.log(e);
    }
});

router.get('/delete',async (req,res)=> {
    try{
        let result = await Foo.destroy({
            where:{
                BridgeLineID:req.query.BridgeLineID
            }
        });
        res.json('删除成功');
    }catch (e) {
        console.log('delete err:'+e)
    }
});

module.exports = router;

