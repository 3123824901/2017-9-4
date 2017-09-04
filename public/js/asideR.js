$(function(){

	$("#asideR .con").find("i").hover(function(){
		$(this).next("a").show().stop().animate({"right":"40px"},500);
		
	},function(){
		$(this).next("a").hide().stop().animate({"right":"100px"},500);
	});
	$("#asideR .fy i").click(function(){
		var scrollTop=$(window).scrollTop();
		$("body,html").stop().animate({"scrollTop":0},800);
	})
	
	$("#asideR .cart").click(function(){
		location.assign("shoppingCart.html");

	})
	
	
})
