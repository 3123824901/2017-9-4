$(function(){

	
  //登录注册
  $.ajax({
    url:"/user/judge",
    type:"get",
    success:function (data) {
      if(!!data["flag"]){
        $(".top-l").html(`亲爱的，${data["username"]}  <a href="javascript:void(0);" id="logout">退出登录</a>`);
        $("#logout").click(function () {
          console.log("asasasa");
          $.ajax({
            url:"/user/logout",
            type:"get",
            success:function () {
              location.reload();
            }
          });
        });
      }
    }
  });
	
		
})
