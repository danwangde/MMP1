const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('mySequelize');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
//let  multipartMiddleware = multipart();

let Foo = sequelize.define('tbl_maintain_scheme',{
    SchemeID:{type:Sequelize.INTEGER,allowNull:false,unique:true,primaryKey:true},
    OrderNum:{type:Sequelize.STRING},
    BridgeName:{type:Sequelize.STRING},
    DiseaseName:{type:Sequelize.STRING},
    SubmitDate:{type:Sequelize.STRING},
    MaintenancePlan:{type:Sequelize.STRING},
    state:{type:Sequelize.STRING},
    file:{type:Sequelize.STRING}
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


router.post('/update',async (req,res)=> {
    let file = req.body.file;

    try{
        let result = await Foo.update({
            file
        },{
            where:{
                SchemeID:req.body.SchemeID
            }
        });
        res.json(result);
    }catch(e){
        console.log('update err:'+e)
    }
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 接收到文件后输出的保存路径（若不存在则需要创建）
        cb(null, 'public/');
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
        cb(null, Date.now() + "-" + file.originalname);
    }
});
var createFolder = function(folder){
    try{
        // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
        // 如果文件路径不存在将会抛出错误"no such file or directory"
        fs.accessSync(folder);
    }catch(e){
        // 文件夹不存在，以同步的方式创建文件目录。
        fs.mkdirSync(folder);
    }
};

var uploadFolder = './public/';
createFolder(uploadFolder);

let upload = multer({storage:storage});

router.post('/ce',upload.single('file'),async function (req,res) {
    let file = req.file;
    console.log(file);
    res.send(file);


});

router.post('/del',async function (req,res) {
    console.log(`./public/${req.body.file}`);
    fs.unlinkSync(`./public/${req.body.file}`);
});


module.exports = router;