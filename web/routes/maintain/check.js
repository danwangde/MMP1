const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('mySequelize');

let Foo = sequelize.define('tbl_maintain_check',{
    CheckID:{type:Sequelize.INTEGER,allowNull:false,unique:true,primaryKey:true},
    OrderNum:{type:Sequelize.STRING},
    BridgeName:{type:Sequelize.STRING},
    DiseaseName:{type:Sequelize.STRING},
    MaintainUnit:{type:Sequelize.STRING},
    ProLeader:{type:Sequelize.STRING},
    Address:{type:Sequelize.STRING},
    MaintainAmount:{type:Sequelize.STRING},
    state:{type:Sequelize.STRING}
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