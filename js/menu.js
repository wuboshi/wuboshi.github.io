window.onload = function() {
  var menu = [
    ['静态页面', 
      ['demo/JingTaiYeMian/qietu2/index.html', '仿静态页面一(兼容IE8)'],
      ['demo/JingTaiYeMian/qietu1/index.html', '仿静态页面二(兼容IE8)'],
      ['demo/JingTaiYeMian/XiaoMiGuanWang/index.html', '仿小米官网'],
    ],
    ['HTML5&CSS3', 
      ['demo/HTML5CSS3/CSS3Animation/index.html', 'CSS3初级动画'],
      ['demo/HTML5CSS3/CSS3JingShen3Deffect/index.html', '3D景深--仿锤子科技官网banner效果'],
      ['demo/HTML5CSS3/HTML5storage/index.html', '本地存储留言板--web localStorage']
    ],
    ['js效果与组件开发', 
      ['demo/JingTaiYeMian/DengLuKuangTuoZhuaiSuoFang/index.html', 'js效果--登陆框拖拽和缩放'],
      ['demo/JingTaiYeMian/JiaoDianLunBoTu/index.html', 'js效果--无缝焦点轮播'],
      ['demo/JingTaiYeMian/TabXuanXiangKa/index.html', 'js效果--Tab选项卡'],
      ['demo/JingTaiYeMian/dingweidaohang/index.html', 'js效果--网页定位导航'],
      ['demo/ZuJian/XuanZhuanMuMa/index.html', '插件--旋转木马'],
      ['demo/ZuJian/LightBox/index.html', '插件--自适应的灯箱'],
      ['demo/ZuJian/FenYeZuJian/index.html', '插件--分页'],
      ['demo/ZuJian/FangDaJing/index.html', '插件--放大镜'],
      ['demo/ZuJian/Calendar/index.html', '插件--日历选择器']
    ],
    ['其它',
     ['demo/JingTaiYeMian/BaiduJingTaiShowYe/index.html', '后台交互-仿百度搜索自动提示(利用jsonp，跨域)'],
     ['https://github.com/wuboshi/ChatRoom', '多人在线聊天室(Angular+Socket.io+Express)']
    ]
  ];
  var list = "";
  var length = menu.length;
  for (var j = 0; j < length; j++) {

    for (var i = 0; i < menu[j].length; i++) {
      if (i === 0) {
        list += '<div class="indexMenu"><dt class="menuTitle">' + menu[j][i] + '</dt>';
      } else {
        list += '<dd class="mentList"><a target = "_blank" href="' + menu[j][i][0] + '">' + menu[j][i][1] + '</a></dd>';
      }
    }
    list += '</div>';
  }
  document.body.innerHTML =  list
   +''
}
