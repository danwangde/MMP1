const express = require('express');
const router = express.Router();
const query = require('myMysql');
const process = require('process');


async function login(username,password) {
    
    let state;
    let select_sql="select * from admin";
    let result;
    try{
       result = await query(select_sql);
       console.log(result);
       if(password == result[0].password){
           if(result[0].power =='admin'){
               state  =0;
           }else if(result[0].power =='super_admin'){
               state = 1;
           }
       }
      
    } catch(e){
        console.log(`login err`+e)
    }
    return state;
    
}
async function a(){
    var res =await login('123','123');
    console.log(res);
}


a();