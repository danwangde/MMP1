const express= require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('mySequelize');

let Foo = sequelize.define('disease',{
    DisId:{type:Sequelize.INTEGER,allowNull:false,unique:true,primary:true},
    DiseaseType:{type:Sequelize.STRING,allowNull:false},
    Type:{type:Sequelize.STRING},
    CompType:{type:Sequelize.STRING},
    DamageType:{type:Sequelize.STRING},
    DiseaseDefine:{type:Sequelize.STRING},
    DamageExplain:{type:Sequelize.STRING},
    DamageDegree:{type:Sequelize.STRING},
    DeductScore:{type:Sequelize.STRING}
},{
    timestamps: false,
    freezeTableName:true
});
Foo.sync();

router.get('/select',async function (req,res) {
    try{
        let result = await Foo.findAll();
        res.json(result);
    }catch(e){
        console.log(e);
    }
});

router.post('/insert',async function (req,res) {
    try{
        let result = await Foo.create({
            DisId:req.body.DisId,
            DiseaseType:req.body.DiseaseType,
            Type:req.body.Type || null,
            CompType:req.body.CompType || null,
            DiseaseDefine:req.body.DiseaseDefine || null,
            DamageExplain:req.body.DamageExplain || null,
            DamageDegree:req.body.DamageDegree || null,
            DeductScore:req.body.DeductScore || null
        });
        res.json(result);
    }catch(e){
        console.log(e);
        res.send('err');
    }
});


module.exports = router;

