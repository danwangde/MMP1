const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('mySequelize');

let Foo = sequelize.define('tbl_maintain_order',{
    OrderID:{type:Sequelize.INTEGER,allowNull:false,unique:true,primaryKey:true},
    OrderNum:{type:Sequelize.STRING},
    BridgeName:{type:Sequelize.STRING},
    DiseaseName:{type:Sequelize.STRING},
    ReportTime:{type:Sequelize.STRING},
    MaintainDept:{type:Sequelize.STRING},
    State:{type:Sequelize.STRING}
},{
    timestamps: false,
    freezeTableName:true
});
Foo.sync();
router.get('/select',async (req,res)=> {
    try{
        let resData =  await Foo.findAll();
        res.json(resData);
    }catch (e) {
        console.log('get data err'+e)
    }


});


module.exports = router;