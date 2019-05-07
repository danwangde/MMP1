var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize')
var sequelize = require('mySequelize');

var obj = sequelize.define('SC_info',{
    SCID:{type:Sequelize.INTEGER, allowNull:false, unique: true, primaryKey:true},
    name:{type:Sequelize.STRING, allowNull:false},
    group_id:{type:Sequelize.INTEGER},
    name_code:{type:Sequelize.STRING},
    emass:{type:Sequelize.DOUBLE},
    earea:{type:Sequelize.DOUBLE},
    ishadow:{type:Sequelize.INTEGER},
    cofcd:{type:Sequelize.DOUBLE},
    darea:{type:Sequelize.DOUBLE},
    cofeta:{type:Sequelize.DOUBLE}
},{
    timestamps: false,
    freezeTableName:true
});

obj.sync();

router.get('/select', async function (req, res, next) {
    try{
        let result = await obj.findAll();
        res.json(result);
    }catch (e){
        console.log(e);
        res.send('err');
    }
});

router.post('/insert', async function (req, res, next) {
    console.log("req.query");
    console.log(req.query)
    try{
        let result = await obj.create({
            SCID: req.body.SCID,
            name:req.body.name,
            group_id:req.body.group_id,
            name_code:req.body.name_code,
            emass:req.body.emass,
            earea:req.body.earea,
            ishadow:req.body.ishadow||null,
            cofcd:req.body.cofcd||null,
            darea:req.body.darea||null,
            cofeta:req.body.cofeta||null
        });
        res.json(result);
    }catch (e){
        console.log(e);
        res.send('err');
    }
});

router.get('/delete', async function (req, res, next) {
    try{
        let result = await obj.destroy({
            where:{
                SCID:req.query.SCID
            }
        });
        res.json(result);
    }catch (e){
        console.log(e);
        res.send('err');
    }
});

router.post('/update', async function (req, res, next) {
    console.log("req.body");
    console.log(req.body)
    try{
        let result = await obj.update({
                SCID: req.body.SCID,
                name:req.body.name,
                group_id:req.body.group_id,
                name_code:req.body.name_code,
                emass:req.body.emass,
                earea:req.body.earea,
                ishadow:req.body.ishadow||null,
                cofcd:req.body.cofcd||null,
                darea:req.body.darea||null,
                cofeta:req.body.cofeta||null
            },
            {
                where: {
                    SCID: req.body.SCID
                }
            }
        );
        res.json(result);
    }catch (e){
        console.log(e);
        res.send('err');
    }
});

module.exports = router;