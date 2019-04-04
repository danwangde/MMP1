var express = require('express');

var router = express.Router();

var query = require('myMysql');

var child_process = require('child_process');


//查数据
router.get('/select',async function(req,res,next){
    //造桥梁基本信息假数据
    let msg = [
        {BridgeName:'胜利路桥',MainStructType:'梁桥',CuringGrade:'I等'},
        {BridgeName:'八一路桥',MainStructType:'圬工拱桥',CuringGrade:'I等'},
        {BridgeName:'人民路桥',MainStructType:'桁架桥',CuringGrade:'II等'},
        {BridgeName:'八一立交桥',MainStructType:'刚构桥',CuringGrade:'I等'},
        {BridgeName:'红旗路桥',MainStructType:'钢结构拱桥',CuringGrade:'II等'},
        {BridgeName:'燕山立交桥',MainStructType:'悬臂+挂梁',CuringGrade:'I等'},
        {BridgeName:'张北路乌河桥',MainStructType:'梁桥',CuringGrade:'I等'},
        {BridgeName:'解放路桥',MainStructType:'梁桥',CuringGrade:'III等'},
        {BridgeName:'沂源路桥',MainStructType:'圬工拱桥',CuringGrade:'II等'},
        {BridgeName:'周村路桥',MainStructType:'圬工拱桥',CuringGrade:'II等'},
        {BridgeName:'淄川路桥',MainStructType:'钢筋混凝土拱桥',CuringGrade:'II等'},
        {BridgeName:'张店路桥',MainStructType:'人行天桥',CuringGrade:'II等'},
        {BridgeName:'高青路桥',MainStructType:'人行天桥',CuringGrade:'III等'},
        {BridgeName:'南部山区桥',MainStructType:'钢筋混凝土拱桥',CuringGrade:'II等'},
        {BridgeName:'兴隆路桥',MainStructType:'人行天桥',CuringGrade:'II等'},
        {BridgeName:'南北康桥',MainStructType:'圬工拱桥',CuringGrade:'I等'},
        {BridgeName:'千佛山路桥',MainStructType:'桁架桥',CuringGrade:'I等'},
        {BridgeName:'六里山路桥',MainStructType:'梁桥',CuringGrade:'I等'},
        {BridgeName:'建邦大桥',MainStructType:'刚构桥',CuringGrade:'I等'},
        {BridgeName:'纬六路高架桥',MainStructType:'梁桥',CuringGrade:'I等'},
        {BridgeName:'北园高架桥',MainStructType:'梁桥',CuringGrade:'I等'},
        {BridgeName:'舜耕路兴济河桥',MainStructType:'梁桥',CuringGrade:'II等'},
        {BridgeName:'二环南路兴隆大沟桥',MainStructType:'梁桥',CuringGrade:'II等'}
    ];


    /*
        let sqlSelect = "select * from s485_config order by id"; //升:asc 降:desc

        try{

            var select_res = await query(sqlSelect);
            console.log(select_res);
        }catch (e) {
            console.log('select err:'+e)
        }*/
    //res.setHeader('content-type','text/json');
    res.json(msg);
    //console.log(res.json(msg));
});

module.exports = router;