$(function() {
	//弹出层
	$("#cover").show().find("#btn1").click(function() {
		$("#cover").hide();
	});


	// 移动号码段:139、138、137、136、135、134、150、151、152、157、158、159、182、183、187、188、147 
	// 联通号码段:130、131、132、136、185、186、145 
	// 电信号码段:133、153、180、189
  $("#txt").focus(function(){
    $(this).css("border", "1px solid #ccc").next().hide();
  })
	$("#txt").blur(function() {
    let phone = $("#txt").val();
		var reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[7-9]))|(18[0,2-3,5-9]))\d{8}$/;
		console.log(phone);
		if(phone == "") {
			$(this).css("border", "1px solid #ff0036").addClass("change").next().show();
      $("#txt").removeAttr("data-cl");
		} else {
			if(reg.test(phone)) {
        //先正则匹配，再去数据库查询
				$.ajax({
          url:"/user/reg/1",
          type:"post",
          data:{
            username:phone
          },
          dataType:"json",
          success:function(data){
            //console.log(data);
            switch(data.msg){
              case 0://用户名不存在
                $("#txt").attr("data-cl","ok").css("border", "1px solid #ccc").next().show().find("img:first-child").show().siblings().hide();
                break;
              default://用户名存在
                $("#txt").css("border", "1px solid #ff0036").addClass("change").next().show().find("img:first-child").hide().siblings().show();
                $(".span1 i").text('手机号码已存在');
                $("#txt").removeAttr("data-cl");
                break;
            }
          }
        })
			} else {
				$(this).css("border", "1px solid #ff0036").next().show().find("img:first-child").hide().siblings().show();
        $(".span1 i").text('手机号码格式不正确');
        $("#txt").removeAttr("data-cl");
			}
		}
	});

	$(".drag").mousedown(function(e) {
		if($("#txt").attr("data-cl") == "ok") {
			var wid = $(this).offset().left;
			var hei = $(this).offset().top;
			var _left = e.pageX - wid;
			var _top = e.pageY - hei;
			console.log(_left, _top);
			$(document).mousemove(function(e) {
				var x = e.pageX - wid - _left;
				if(x >= $(".box").width() - $(".drag").width()) {
					x = $(".box").width() - $(".drag").width();
				}
				if(x < 0) {
					x = 0
				}
				$(".drag").css({
					"left": x,
					"top": 0
				});

			});

			$(document).mouseup(function() {
				$(document).off("mousemove");
				if($(".drag").position().left == 260) {
					$(".drag img").show().parents(".box").css({
						"background": "#6bc827",
						"color": "#fff"
					}).find("span").text("验证通过！").attr("data-cl","ok");
					$(".drag").unbind(); //设置无法拖动
				} else {
					$(".drag").stop().animate({
						"left": 0
					}, 300);
				}
				if($(".box span").attr("data-cl") == "ok") {
					$("#btn").css("background", "red").click(function() {
						$(".con_1").hide().next().show().find(".name span").html($("#txt").val());
						$("header li:nth-child(2)").addClass("active");
					});
				}
			});
			return false;
		}
	});

	//密码
	$("#psw1").focus(function() {
		$(".msg1").show();
		$(this).keydown(function() {
			var val = $(this).val();
			var sum = 0;
			var flag1 = flag2 = flag3 = false;
			for(var i in val) {
				var code = val.charCodeAt(i);
				if(code >= 48 && code <= 57) {
					flag1 = true;
				}
				if(code >= 65 && code <= 90 || code >= 97 && code <= 122) {
					flag2 = true;
				}
				if(code == 95) {
					flag3 = true;
				}
			}
			sum = flag1 + flag2 + flag3;
			switch(sum) {
				case 3:
					$(".msg1 p span:nth-child(3)").css("background", "#f99");
				case 2:
					$(".msg1 p span:nth-child(2)").css("background", "#9f9");
				case 1:
					$(".msg1 p span:nth-child(1)").css("background", "#99f");
			};
		});
		$("#psw1").blur(function() {
			var reg = /^[a-zA-Z]\w{6}\d$/;
			if(reg.test($(this).val())) {
				$(".msg1").hide();
				$(this).attr("data-cl", "ok").css("border", "1px solid #dedede");
			} else {
				$("#psw1").css("border", "1px solid #ff0036");
			}
		})

	})

	$("#psw2").focus(function() {
		if($("#psw1").attr("data-cl") == "ok") {
			$(this).addClass("change");
			$("#psw2").blur(function() {
				if($(this).val() === $("#psw1").val()) {
					//console.log($(this).val() == $("#psw1").val())
					$(".msg2").show().find("img:nth-child(1)").show().siblings().hide();
					$(this).attr("data-cl", "ok");

					//后端保存数据
          $.ajax({
            url:"/user/reg/2",
            type:"POST",
            data:{
              "username":$("#txt").val(),
              "password":$("#psw2").val()
            },
            dataType:"json",
            success:function (data) {
              console.log(data)
              if (data.msg_2 == 0) {
                //点亮按钮
                $("#btn3").css("background", "#ff0036").click(function () {
                  $("header li:last-child").addClass("active");
                  $(".con_2").hide().next().show();
                  var i = 5;
                  var timer = setInterval(function () {
                    i--;
                    $(".times").html(i);
                    console.log(i);
                    if (i == 0) {
                      clearInterval(timer);
                      location.assign("login.html");
                    }
                  }, 1000);
                })
              }
            }
          });
        } else {
					$(".msg2").show().find("img:nth-child(1)").hide().siblings().show();
				}
			});
		}else{
			$("#psw1").css("border", "1px solid #ff0036");
		}
	})


	

})