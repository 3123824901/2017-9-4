var express = require('express');
var router = express.Router();
let mongodb = require('mongodb');
let mongoCt = mongodb.MongoClient;
let address = 'mongodb://127.0.0.1:27017';

/* GET home page. */

router.use('/nav1',function(req, res) {
  console.log(req.body);
  //res.send("111");
  mongoCt.connect(address+'/8-30',(err,db)=>{ //链接到8-30库
    let nav = db.collection('nav');//链接到表;
    nav.findOne({},{_id:0},(err,result)=>{
      if(err) throw new Error();
      console.log(result);
      //返回数据（给前端)
      res.send(result);
    });
  })
});

router.use('/nav2',function(req, res) {
  mongoCt.connect(address+'/8-30',(err,db)=>{ //链接到8-30库
    let nav_data = db.collection('nav_data');//链接到表;
    nav_data.find({},{_id:0}).toArray((err,result)=>{
      if(err) throw new Error();
      //console.log(result);
      //返回数据（给前端)
      res.send(result);
    });
  })
});

module.exports = router;
