const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('mySequelize');

let Foo = sequelize.define('tbl_price',{
    ComponentType:{type:Sequelize.STRING,allowNull:false},
    ComponentName:{type:Sequelize.STRING},
    BelonStruct:{type:Sequelize.STRING},
    RepairPrice:{type:Sequelize.STRING}
},{
    timestamps: false,
    freezeTableName:true
});
Foo.sync();
router.get('/select',async (req,res)=> {
    let resData;
    try{
       resData =  await Foo.findAll();
    }catch (e) {
        console.log('get data err'+e)
    }

    res.json(resData);
});

router.post('/insert',async (req,res) =>{
    let ComponentType = req.body.ComponentType;
    let ComponentName =  req.body.ComponentName || null;
    let BelonStruct =  req.body.BelonStruct || null;
    let RepairPrice =  req.body.RepairPrice || null;
    try{
        let result = await Foo.create({
            ComponentType,
            ComponentName,
            BelonStruct,
            RepairPrice
        });
        res.json(result);
    }catch(e){
        console.log(e);
    }
});

router.post('/update',async (req,res)=> {
    let update = req.body;
    let ComponentType = req.body.ComponentType;
    let ComponentName =  req.body.ComponentName || null;
    let BelonStruct =  req.body.BelonStruct || null;
    let RepairPrice =  req.body.RepairPrice || null;
    try{
        let result = await Foo.update({
            ComponentType,
            ComponentName,
            BelonStruct,
            RepairPrice
        },{
            where:{
                id:update.id
            }
        });
        res.json(result);
    }catch(e){
        console.log('update err:'+e)
    }
});

router.get('/delete',async (req,res)=> {
    let del =  req.query;
    try{
        let result = await Foo.destroy({
            where:{
                id:del.id
            }
        });
        res.json(result);
    }catch (e) {
        console.log('delete err:'+e)
    }
});



module.exports = router;