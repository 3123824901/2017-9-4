$(function() {
	$("#top").load("top.html");
	$("footer").load("foot.html");
	$(".btn").click(function() {
		$(".sN_c ul li:nth-child(4)").nextAll().toggle();
	});
	$("#head #logo").click(function() {
		location.assign("index.html");
	})

  //获取数据
  //var k = 0; //控制页码
  //var numPerPage = 15; //每一页显示的条数
  fetch(0,15);
  function fetch(k,numPerPage){
    if(k<0) k=0;
    if(k>2) k=2;
    $.ajax({
      url: "/list",
      type: "POST",
      dataType:"json",
      data:{
        start:(k*numPerPage),
        count:numPerPage
      },
      success: function(data) {
        data={mainList:data};
        console.log(data);
        var html = template("navCon", data);
        $(".list ul").html(html);

        pagefy(k,numPerPage);

      }
    });
  }


	function pagefy(k,numPerPage){
    var pages = 3; //总页数
    var oPage = document.getElementsByClassName("page")[0];
    var aPage = oPage.getElementsByTagName("a");
    var alen = aPage.length; //所有a标签长度
    for(let i = 0; i < alen; i++) {
      aPage[i].onclick = function () {
        switch (i) {
          case 0: //点击上一页时，如果不在第一页
            if (k > 0) {
              k = k - 1;
            }
            break;
          case alen-1: //点击下一页时，如果不在最后一页，页码加1
            if (k < pages) {
              k=k+1;
            }
            break;
          default: //点击具体的页码时，当前下标+1
            k = i - 1;
        }
        //添加高亮，先同一清除，再具体添加
        for (var m = 0; m < aPage.length; m++) {
          aPage[m].className = "";
        }
        aPage[k + 1].className = "active";

        //获取数据
        fetch(k,numPerPage)

        $(window).scrollTop(0);//控制页面刷新后永远在顶部
        return false;
      }
    }
  }
  //输入页码
  $("#page_btn").click(function(){
    k=parseInt($("#page_txt").val()-1);
    fetch(k,15);
    $("#nums").find("a").eq(k).addClass("active").siblings().removeClass("active");
    $(window).scrollTop(0);//控制页面刷新后永远在顶部
    $("#page_txt").val("");
  })
})