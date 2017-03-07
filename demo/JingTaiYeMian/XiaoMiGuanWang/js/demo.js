$(document).ready(function() {

  $("a").attr("target", "_blank") //新标签打开链接
  $(".select").click(function(e) { //当鼠标点击slelct Region 弹出新对话框 打开遮蔽罩
    $("a").attr("target", "") //取消新标签打开这个链接
    $(".switch").slideDown(); //打开新对话框
    $(".shield").fadeIn(); //打开遮蔽罩
    e.preventDefault();
  });
  $(".x").click(function(e) {
    $(".switch").slideUp(); //关闭新对话框
    $(".shield").fadeOut(); //关闭遮蔽罩
    e.preventDefault();
  }); //当鼠标点击x，关闭新对话框，关闭遮蔽罩
  $(".topbar-care").mouseenter(function() { //鼠标移入购物车 
    $(".care-menu").slideToggle() // 显示购物车详细  
    $(".kong").addClass("kong-change"); //加入class让购物车变色
    $(".topbar-care").addClass("care-change");
  });
  $(".topbar-care").mouseleave(function() { //鼠标移出
    setTimeout(function() {
      $(".care-menu").slideToggle();
    }, 300); //关掉购物车页面
    setTimeout(function() {
      $(".kong").removeClass("kong-change");
    }, 400); //去掉class
    setTimeout(function() {
      $(".topbar-care").removeClass("care-change");
    }, 500);
  });
  var menus = [".menu-guide-1", ".menu-guide-2", ".menu-guide-3", ".menu-guide-4", ".menu-guide-5", ".menu-guide-6", ".menu-guide-7", ".menu-guide-8", ".menu-guide-9", ".menu-guide-10"];
  for (var i = 0; i < 10; i++) {
    $(menus[i]).mouseenter(function() { //
      $(this).children("div").show()
    })
    $(menus[i]).mouseleave(function() {
      $(this).children("div").hide()
    })
  };
  $(".header-nav").mouseenter(function() { // 顶部导航 开启占位div
    $(".zhanwei-div").show()
  });
  $(".header-nav").mouseleave(function() { // 顶部导航 关闭占位div
    $(".zhanwei-div").hide()
  });

  $(".header-nav-li").mouseenter(function() { // 顶部导航 
    if ($(".zhanwei-div").css("display") == "none") { //如果占位div不存在则代表第一次移入 开启动画效果
      $(this).children("div").slideDown()
    } else { //如果占位div存在则代表不是第一次移入 关闭动画
      $(this).children("div").show()
    }
  });
  $(".header-nav-li").mouseleave(function() { // 顶部导航
    $(this).children("div").hide()
  });

  var oa = ["rolling-a-0", "rolling-a-1", "rolling-a-2", "rolling-a-3", "rolling-a-4"]
  $(".rolling").click(function() { //当小圆点被点击
    $(".rolling").removeClass("touch"); // 让所有的小圆点都去掉点击样式
    $(this).addClass("touch"); //给被点击的小圆点单独添加点击样式
    var n = $(this).text() // 定义小圆点位置
    $(".rolling0").fadeTo(300, 0.0) //把其他图片的透明度调成0 
    $(".rolling0").eq(n).fadeTo(100, 1.0) //把当前透明度调整1

    var ahref = $(".rolling0").eq(n).attr("href"); //获取当前按钮的herf
    $(".rolling0").eq(4).attr("href", ahref) //塞入最上面一张图
    return false; //阻止跳转
  });
  $(".rolling").mouseenter(function() {
    clearInterval(timer) //检测到鼠标移动到原点就关闭计时器
  });
  //轮播定时器
  var oclick = [".click-0", ".click-1", ".click-2", ".click-3", ".click-4"];
  var iNow = 0; //iNow第一张
  timer = setInterval(function() { //打开定时器
    iNow++; //图片加1，成为下一张
    if (iNow > 4) { //循环
      iNow = 0;
    }
    $(oclick[iNow]).trigger("click"); //触发小圆点的click
  }, 4000);
  //上部展示切换
  $(".con-bottom-onclick").click(function() {
    $(".carousel-one").fadeIn(500)
    $(".carousel-tow").fadeOut(500)
    return false; //阻止跳转
  });
  $(".con-bottom-unclick").click(function() {
    $(".carousel-tow").fadeIn(800) //渐变切换不完善 等待更换滑动切换
    $(".carousel-one").fadeOut(800)
    return false; //阻止跳转
  });
  var rclick = [".con-bottom-onclick", ".con-bottom-unclick"];
  var R = 0;
  Rclick = setInterval(function() { //打开定时器
    R++;
    if (R > 1) {
      R = 0;
    }
    $(rclick[R]).trigger("click"); //触发click
  }, 5000);
  for (var i = 0; i < 4; i++) { //第一行 热门耳机
    $(".top-button-click").eq(i).mouseenter(function() {
      var atext = $(this).text()
      if (atext == "热门") { //如果触摸的是热门
        $(".hot-headset").show() // 显示热门标签
        $(".hot-headset").siblings().hide() //隐藏其他同辈标签
      };
      if (atext == "耳机音箱") {
        $(".headset").siblings().hide()
        $(".headset").show()
      };
      if (atext == "电源") {
        $(".memory").siblings().hide()
        $(".memory").show()
      };
      if (atext == "电池存储卡") {
        $(".source").siblings().hide()
        $(".source").show()
      };
      $(".top-button-click").removeClass("top-button-color") //删除所有同辈元素的橙色状态
      $(".top-button-click").removeClass("top-button-border") //删除所有同辈元素底边框效果
      $(this).addClass("top-button-color") //给当前元素加上橙色
      $(this).addClass("top-button-border") //给当前元素加上底边框
      $(this).removeClass("gray-424242") //删除当前元素的灰色效果
    })
  };
  $(".top-button-click").click(function() {
    return false; //防止误点击跳转
  })
  for (var i = 0; i < 5; i++) { //第二行 热门 保护套

    $(".tow-top-button-click").eq(i).mouseenter(function() {
      var atext = $(this).text()
      if (atext == "热门") { //如果触摸的是热门
        $(".hot-protect").show() // 显示热门标签
        $(".hot-protect").siblings().hide() //隐藏其他同辈标签
      };
      if (atext == "保护套") {
        $(".protect").siblings().hide()
        $(".protect").show()
      };
      if (atext == "后盖") {
        $(".lid").siblings().hide()
        $(".lid").show()
      };
      if (atext == "贴膜") {
        $(".film").siblings().hide()
        $(".film").show()
      };
      if (atext == "其他配件") {
        $(".parts").siblings().hide()
        $(".parts").show()
      };
      $(".tow-top-button-click").removeClass("top-button-color") //删除所有同辈元素的橙色状态
      $(".tow-top-button-click").removeClass("top-button-border") //删除所有同辈元素底边框效果
      $(this).addClass("top-button-color") //给当前元素加上橙色
      $(this).addClass("top-button-border") //给当前元素加上底边框
      $(this).removeClass("gray-424242") //删除当前元素的灰色效果
      return false; //防止误点击跳转
    })
  };
  for (var i = 0; i < 5; i++) { //第三行 热门 米兔
    $(".three-top-button-click").eq(i).mouseenter(function() {
      var atext = $(this).text()
      if (atext == "热门") { //如果触摸的是热门
        $(".hot-clothes").show() // 显示热门标签
        $(".hot-clothes").siblings().hide() //隐藏其他同辈标签
      };
      if (atext == "服装") {
        $(".clothes").siblings().hide()
        $(".clothes").show()
      };
      if (atext == "米兔") {
        $(".rabbit").siblings().hide()
        $(".rabbit").show()
      };
      if (atext == "生活周边") {
        $(".periphery").siblings().hide()
        $(".periphery").show()
      };
      if (atext == "箱包") {
        $(".bag").siblings().hide()
        $(".bag").show()
      };
      $(".three-top-button-click").removeClass("top-button-color") //删除所有同辈元素的橙色状态
      $(".three-top-button-click").removeClass("top-button-border") //删除所有同辈元素底边框效果
      $(this).addClass("top-button-color") //给当前元素加上橙色
      $(this).addClass("top-button-border") //给当前元素加上底边框
      $(this).removeClass("gray-424242") //删除当前元素的灰色效果
      return false; //防止误点击跳转
    })
  };
});