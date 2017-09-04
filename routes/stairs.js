let express = require('express');
let router = express.Router();
let mongodb = require('mongodb');
let mongoCt = mongodb.MongoClient;
let address = 'mongodb://127.0.0.1:27017';

/* GET home page. */
router.use("/1",function(req, res){
  mongoCt.connect(address+'/8-30',(err,db)=>{ //链接到8-30库
    let stairs = db.collection('stairs');//链接到表;
    stairs.find({},{_id:0}).toArray((err,result)=>{
      if(err) throw new Error();
      //console.log(result);
      //返回数据（给前端)
      res.send(result);
    });
  })
});
router.use("/2",function(req, res){
  mongoCt.connect(address+'/8-30',(err,db)=>{ //链接到8-30库
    let stairs2 = db.collection('stairs2');//链接到表;
    stairs2.findOne({},{_id:0},(err,result)=>{
      if(err) throw new Error();
      //console.log(result);
      //返回数据（给前端)
      res.send(result);
    });
  })
});
router.use("/3",function(req, res){
  mongoCt.connect(address+'/8-30',(err,db)=>{ //链接到8-30库
    let stairs3 = db.collection('stairs3');//链接到表;
    stairs3.findOne({},{_id:0},(err,result)=>{
      if(err) throw new Error();
      //console.log(result);
      //返回数据（给前端)
      res.send(result);
    });
  })
});
module.exports = router;
