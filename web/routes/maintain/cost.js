const express = require('express');

const router = express.Router();

const Sequelize = require('sequelize');

const sequelize  = require('Mysequelize');

let Foo = sequelize.define('tbl_maintain_cost',{
    CostID:{type:Sequelize.INTEGER,allowNull:false,unique:true,primaryKey:true},
    OrderNum:{type:Sequelize.STRING},
    BridgeName:{type:Sequelize.STRING},
    DiseaseName:{type:Sequelize.STRING},
    MaintainUnit:{type:Sequelize.STRING},
    ProLeader:{type:Sequelize.STRING},
    Address:{type:Sequelize.STRING},
    date:{type:Sequelize.STRING},
    MaintainAmount:{type:Sequelize.DECIMAL(10,2)}
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