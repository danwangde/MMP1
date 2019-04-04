var fs = require('fs');
var query = require('myMysql');
/*
	arg opt :{
		startTime:,  //查询起始时间  距1970年 毫秒数
		endTime:,	//查询结束时间 距1970年 毫秒数
		dataBase:,	//查询的数据库
		table:,	//查询的表
		conditions:,//查询条件，字符串数组
		fileName:,//生成的文件名
		fileType:,//生成的文件类型
		fields:,//查询的字段
		selectFieldNum:// 查询的字段数目，若全部查询则填0XFFFF；
		timeField:// 基于时间查询的时间字段 
		timeFieldSign: //该时间的字段含义
		finalFileName: //最终文件名
	}
*/
var opt = {};
opt.startTime = parseInt(process.argv[2]);
opt.endTime = parseInt(process.argv[3]);
opt.dataBase = process.argv[4];
opt.table = process.argv[5];
opt.conditions = process.argv[6].split(",");
opt.fileName = process.argv[7];
opt.fileType = process.argv[8];
opt.fields = process.argv[9].split(",");
opt.selectFieldNum = process.argv[10];
opt.timeField = process.argv[11];
opt.timeFieldSign = process.argv[12];
opt.finalFileName = process.argv[13];

var selectedFields = []; 
var conditions = [];
var interval = 1*60*60*1000 //一小时间隔;
var start;
var end;
var middle;

process.on('uncaughtException', function (err) {                                                                                                                                            
	console.log("uncaughtException err : "+err);
	try{
		fs.renameSync(opt.fileName, opt.fileName+".err");
	}catch(e){
		console.log(e);
	}
    process.exit();                                                                                                                                              
}); 

function handleArg(){
	if(opt.conditions[0] === "default"){
		conditions = [];
	}else{
		for(let i = 0; i < opt.conditions.length; i++){
			conditions.push(opt.conditions[i]);
		}
	}
	
	start = opt.startTime;
	console.log(start);
	end = opt.endTime;
	console.log(end);
	tmp = start + interval;
	console.log(tmp);
	if(tmp <= end){
		middle = tmp;
	}else{
		middle = end;
	}
	console.log(middle);
	firstLine();
}
handleArg();

async function firstLine(){
	//处理查询条件，将条件中的字段挑出来
	let conditionFields = [];
	for(let i = 0; i< opt.conditions.length;i++){
		let tmpArr = opt.conditions[i].split("=");
		conditionFields.push(tmpArr[0]);
	}
	console.log(conditionFields);
	
	//查询出所有字段及注释
	let sql = "show full fields from  `"+opt.dataBase +"`."+opt.table;
	console.log(sql);
	try{
		var result1 = await query(sql);
	}catch(e){
		console.log('query field err : '+e);
		try{
			fs.openSync(opt.fileName+'.err', "ax");
		}catch(e){
			console.log("cerate err file failed : "+e);
		}
		process.exit();
	}
	//console.log(result1);
	//selectedFields.push("devTime");
	//selectedFieldsSign.push("设备时间");
	let objTmp = {};
	objTmp.field = opt.timeField;
	objTmp.comment = opt.timeFieldSign;
	objTmp.type = "datetime";
	console.log(objTmp);
	selectedFields.push(objTmp);
	if(parseInt(opt.selectFieldNum) === 0xffff){
		for(let i = 0; i < result1.length; i++){
			//console.log(result1[i]);
			if((result1[i].Field == "id") ||(result1[i].Field == opt.timeField)){
				console.log(" delete id field and time field");
				continue;
			}else{
				console.log("push ");
				let obj = {};
				obj.field = result1[i].Field;
				obj.type = result1[i].Type;
				obj.comment = result1[i].Comment;
				selectedFields.push(obj);
			}
		}
		//console.log(selectedFields.length);
		var index = [];;
		for(let i = 0; i < selectedFields.length; i++){
			for(let j = 0; j<conditionFields.length;j++){
				if(selectedFields[i].field === conditionFields[j]){
					console.log("push into index");
					index.push(i);
				}
			}
		}
		console.log("index:");
		console.log(index);
		for(let i = 0; i < index.length; i++){
			console.log("delete condition Fields");
			selectedFields.splice(index, 1);
		}
		console.log("after index for loop");
		
	}else{
		for(let i = 0; i < opt.fields.length; i++){
			for(let j = 0 ; j < result1[i].length; j++){
				if(opt.fields[i] === result1[j].Field){
					let obj = {};
					obj.field = result1[i].Field;
					obj.type = result1[i].Type;
					obj.comment = result1[i].Comment;
					selectedFields.push(obj);
				}
			}
		}
	}
	console.log(selectedFields.length);
	console.log(selectedFields);
	
	let firstLine = "";
	for(let i = 0; i <  selectedFields.length; i++){
		let tmpStr = "";
		if(selectedFields[i].comment === ''){
			tmpStr += selectedFields[i].field;
		}else{
			tmpStr += selectedFields[i].comment;
		}
		console.log(tmpStr);
		if(i == (selectedFields.length - 1)){
			firstLine += tmpStr;
			break;
		}
		switch(opt.fileType){
			case "txt":
					firstLine += tmpStr + "\t\t" ;
				break;
			case "csv":
					firstLine += tmpStr + ",";
				break;	
		}
	}
	console.log(selectedFields);
	firstLine += "\n";
	console.log(firstLine);
	fs.appendFileSync(opt.fileName, firstLine);
	//fs.appendFileSync("a.txt", firstLine);
	queryWrite();
}

async function queryWrite(){
	//console.log("this query start and end :" + get_date_str(new Date(start)) + " "+ get_date_str(new Date(middle)));
	let sql = "select ";
	for(let i = 0; i < selectedFields.length; i++){
		if(i === (selectedFields.length - 1)){
			sql += selectedFields[i].field;
			break;
		}
		sql += selectedFields[i].field +", ";
	}
	sql += " from `"+opt.dataBase +"`."+opt.table+" where ";
	if(conditions.length){
		for(let i = 0; i < conditions.length; i++){
			sql += conditions[i] + " and ";
		}
	}
	
	//console.log(new Date(middle));
	//console.log(new Date(start));
	sql += opt.timeField +"<= '" + get_date_str(new Date(middle)) + "' and  "+opt.timeField+" >= '"+ get_date_str(new Date(start))+ "'";
	//console.log(sql);
	
	try{
		var result = await query(sql);
	}catch(e){
		console.log("query data failed : "+e);
		try{
			fs.renameSync(opt.fileName, opt.fileName+".err");
		}catch(e){
			console.log(e);
		}
		process.exit();  
	}
	console.log("result length:"+result.length);
	if(result.length){
		for(let i = 0; i< result.length; i++){
			let fileContent = "";
			for(let j = 0; j < selectedFields.length; j++){
				let addStr = ""
				if(selectedFields[j].type === "datetime"){
					if(result[i][selectedFields[j].field] === null){
						addStr += "null";
					}else{
						addStr += get_date_str(result[i][selectedFields[j].field]);
					}
				}else{
					addStr += result[i][selectedFields[j].field];
				}
				//console.log(addStr);
				if(j === (selectedFields.length - 1)){
					fileContent += addStr;
					break;
				}
				switch (opt.fileType){
					case 'txt':
						fileContent += addStr + "\t\t";
						break;
					case 'csv':
						fileContent += addStr +",";
						break;
				}
			}
			fileContent += "\n";
			//console.log(fileContent);
			//console.log(opt.fileName+"."+opt.fileType);
			fs.appendFileSync(opt.fileName, fileContent);
			//fs.appendFileSync('a.txt', fileContent);
		}
		
	}else{
		console.log("select on suit");
	}
	ifEnd();
}

function ifEnd(){
	//console.log("function if end");
	start = middle;
	let tmp = start + interval;
	//console.log(tmp);
	if(tmp > end){
		//console.log()
		if(Math.floor((tmp - end)/interval) >= 1){
			fs.renameSync(opt.fileName, opt.finalFileName);
			console.log(" dataout ok ************************************************ ");
			process.exit();
		}else{
			middle = end;
		}
	}else{
		middle = tmp;
	}
	console.log("next query start and end :" + get_date_str(new Date(start)) + " "+ get_date_str(new Date(middle)));
	queryWrite();
}


function get_date_str(date) {
    return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
}