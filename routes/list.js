let express = require('express');
let router = express.Router();
let mongodb = require('mongodb');
let mongoCt = mongodb.MongoClient;
let address = 'mongodb://127.0.0.1:27017';

/* GET home page. */
router.use("/",function(req, res){
  mongoCt.connect(address+'/8-30',(err,db)=>{ //链接到8-30库
    let list = db.collection('list');//链接到表;
    list.find({},{_id:0}).skip(parseInt(req.body.start)).limit(parseInt(req.body.count)).toArray((err,result)=>{
      if(err) throw new Error();
      //console.log(result);
      //返回数据（给前端)
      res.send(result);
    });
  })
});

module.exports = router;
