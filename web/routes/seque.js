const Sequelize = require('sequelize');
const sequelize = new Sequelize('mmp', 'root', '123',{   //创建一个sequelize 对象实例
    host:'localhost',
    dialect:'mysql',
    dialectOptions:{
        charset:'utf8'
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});
let name = process.argv[2];
let password = process.argv[3];
let mail = process.argv[4];
let age = process.argv[5];
let job = process.argv[6];

let User = sequelize.define('students',{              //定义模型User,告诉Sequelize如何映射数据库表
    name:{type:Sequelize.STRING, allowNull:false, unique: true, primaryKey:true},
    password:Sequelize.INTEGER,
    mail:Sequelize.STRING,
    age:Sequelize.STRING,
    job:Sequelize.STRING
},{
    timestamps: false,
    freezeTableName:true
});

User.sync();

async function start(){
    let result = await  User.create({
        name,
        password,
        mail,
        age,
        job
    });

    console.log(result);
}
start();