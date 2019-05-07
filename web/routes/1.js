

const Sequelize = require('sequelize');

const sequelize = new Sequelize('mmp', 'root', '123',{
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

let User = sequelize.define('students',{
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
        name:'leo',
        password:'1234',
        mail:'qq.com',
        age:25,
        job:'医生'
    });

    console.log(result)
}
start();


router.get('/sel',async function (req,res) {
    try{
        let result = await  User.findAll();
        res.json(result);
    }catch(e){
        console.log(e);
    }

});

router.get('/insert',async function (req,res) {
    try{
        let result = await  User.create({
            name:'leo',
            password:'1234',
            mail:'qq.com',
            age:25,
            job:'医生'
        });
        res.json(result);
    }catch(e){
        console.log(e);
    }

});

router.get('/update',async function (req,res) {
    try{
        let result = await User.update({
                name: 'ben',
                password:'123',
                mail:'163.com',
                age:30,
                job:'学生'

            },
            {
                where: {
                    id: 1
                }
            }
        );
        res.json(result);
    }catch (e){
        console.log(e);
        res.send('err');
    }

});

router.get('/delete',async function (req,res) {
    try{
        let result = await User.destroy(
            {
                where: {
                    id: 2
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
