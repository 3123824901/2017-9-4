let express = require('express');
let router = express.Router();
let mongodb = require('mongodb');
let mongoCt = mongodb.MongoClient;
let address = 'mongodb://127.0.0.1:27017';

router.use("/reg/1",function(req, res,next){
  mongoCt.connect(address+'/8-30',(err,db)=>{ //链接到8-30库
    let user = db.collection('user');//链接到表;
    //console.log(`username:${req.body.username}`)
    user.find({"username":req.body.username},{_id:0}).toArray((err,result)=>{
      if(err) throw new Error();
      console.log(result,result.length)
      if(result.length >0){
        res.send({"msg":1});//用户名已存在
      }else{
        res.send({"msg":0});//用户名不存在
      }
    })
  })
});
router.use("/reg/2",(req,res)=>{
  mongoCt.connect(address+'/8-30',(err,db)=>{ //链接到8-30库
    let user = db.collection('user');//链接到表;
    console.log(req.body)
    user.insert(req.body,(err)=>{
      if(err){
        throw new Error();
      }else{
        res.send({"msg_2":0});  //保存成功
      }
    })
  })
});

router.use('/login', function(req, res) {
  //取数据
  mongoCt.connect(address+'/8-30',(err,db)=>{ //链接到8-30库
    let user = db.collection('user');//链接到表
    user.find(req.body,{_id:0}).toArray((err,result)=>{
      if(err) throw new Error();
      if(result.length >0){
        req.session["user_id"]=req.body.username;//种session同时给浏览器写cookie
        res.send({"msg":0});//用户名、密码正确
      }else{
        res.send({"msg":1});//用户名或密码不正确
      }
    });
  });
});

//判断用户是否登录接口
router.use("/judge",function (req,res) {
  if(req.session["user_id"]){
    res.send({"flag":true,"username":req.session["user_id"]});
  }else{
    res.send({"flag":false});
  }
});

//退出登录接口
router.use("/logout",function (req, res) {
  req.session["user_id"] = undefined;
  res.end();
});

module.exports = router;
