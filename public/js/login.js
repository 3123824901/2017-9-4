$(function() {
	$(".code_1 .img2").click(function() {
		$(".code_1").hide().next().show();
	})
	$(".code_1 .mima a:first-child").click(function() {
		$(".code_1").hide().next().show();
	});
	$(".code_2 .img2").click(function() {
		$(".code_2").hide().prev().show();
	})
	

	$(".button").click(function(){
    let username = $(".code_2 .inp #txt").val();
    let password = $(".code_2 .inp #psw").val();

		if(username==""){
			$(".code_2 .inp #txt").attr("placeholder","用户名不能为空");
      $(".code_2 .inp #txt").css("border","1px solid #ff0036");
		}
		if(password==""){
			$(".code_2 .inp #psw").css("border","1px solid #ff0036");
      $(".code_2 .inp #psw").change(function(){
        $(this).css("border","1px solid #ccc").next().hide();
      })
		}
    //向后端请求
    if(username!="" && password!=""){
      $.ajax({
        url:"/user/login",
        type:"POST",
        data:{
          username:username,
          password:password
        },
        dataType:"json",
        success:function (data) {
          switch(data.msg){
            case 0:
              location.assign("index.html");
              break;
            default :
              $(".code_2 .inp #psw").css("border","1px solid #ff0036").next().show();
              $(".code_2 .inp #psw").change(function(){
                $(this).css("border","1px solid #ccc").next().hide();
              })
          }
        }
      });

    }

		
	})
	

})