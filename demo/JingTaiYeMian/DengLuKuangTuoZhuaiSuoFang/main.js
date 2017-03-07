// 获取元素
function g(el){
	return document.getElementById(el);
}
// 点击半透明遮罩层和关闭按钮时，半透明遮罩和登陆框不可见
g("mask").onclick = g("closeBtn").onclick = function(){
	g("mask").style.display = "none";
	g("loginBox").style.display = "none";
}
// 点击 登录，半透明遮罩和登陆框出现
g("loginLink").onclick = function(){
	g("mask").style.display = "block";
	g("loginBox").style.display = "block";
}
// 自动居中   函数 
function autoCenter(el){
	// 获取窗口宽度 兼容
	var bodyW = document.documentElement.clientWidth || document.body.clientWidth,
	bodyH = document.documentElement.clientHeight || document.body.clientHeight;

	var elW = el.offsetWidth,
	elH = el.offsetHeight;

	el.style.left = (bodyW - elW)/2 +'px';
	el.style.top = (bodyH - elH)/2 +'px';
}
//自动全屏    函数 
function fillBody(el){
	var bodyW = document.documentElement.clientWidth || document.body.clientWidth,
	bodyH = document.documentElement.clientHeight || document.body.clientHeight;
	el.style.width=bodyW + 'px';
	el.style.height=bodyH + 'px';
}
// 按下鼠标时,移动登陆框
var mouseOffsetX = 0,
mouseOffsetY = 0,
isDraging=false;
g("loginBoxHeader").addEventListener('mousedown',function(e){
	var e = e || window.event;
	// 鼠标点击点离浮出层左边框的距离
	mouseOffsetX = e.pageX - g("loginBox").offsetLeft;
	//鼠标点击点离浮出层上边框的距离
	mouseOffsetY= e.pageY - g("loginBox").offsetTop;
	isDraging =true;
})
document.onmousemove = function(e){
	var e = e || window.event;
	mouseX = e.pageX;
	mouseY = e.pageY;
	var moveX = 0, moveY = 0 ;
	if(isDraging===true){
		moveX = mouseX - mouseOffsetX;
		moveY = mouseY - mouseOffsetY;
   	// 获取页面宽度 高度 
   	var bodyW = document.documentElement.clientWidth || document.body.clientWidth,
   	bodyH = document.documentElement.clientHeight || document.body.clientHeight;
    // 获取 浮出层 宽度 高度
    var loginBoxWidth = g("loginBox").offsetWidth,
    loginBoxHeight = g("loginBox").offsetHeight;
    // 限定 浮动层 移动的 最大 范围
    var maxMoveX = bodyW - loginBoxWidth,
    maxMoveY = bodyH - loginBoxHeight;
    moveX = Math.min(maxMoveX,Math.max(0,moveX));
    moveY = Math.min(maxMoveY,Math.max(0,moveY));
    g("loginBox").style.left = moveX + "px";
    g("loginBox").style.top = moveY + "px";
}
}
// 登陆框 缩放
var mousePanel,mouseCtrl,mouseType;
var moving = 0, mouseStartX=0,mouseStartY=0;
function onMouseDown(e,panel,ctrl,type){
	var e = e || window.event;
	mouseStartX = e.pageX -ctrl.offsetLeft; 
	mouseStartY = e.pageY - ctrl.offsetTop;
	mousePanel = panel;
	mouseCtrl = ctrl;
	mouseType = type;
	moving = setInterval(onMove,10);
}
function onMove(){
	if (moving) {
		// 获取 登陆框 起始的 宽度 高度
		var toX = mouseX - mouseStartX,
		toY = mouseY - mouseStartY;
        // 限制登陆框的 最大 宽度 高度
        var maxToX = document.documentElement.clientWidth - mousePanel.offsetLeft - 10,
        maxToY = document.documentElement.clientHeight - mousePanel.offsetHeight;
        //  限定 范围
        toX = Math.min(maxToX,Math.max(toX, 300));
        toY = Math.min(maxToY,Math.max(toY, 200));
        switch(mouseType){
        	case "r":
        	mousePanel.style.width = toX + "px";
        	mouseCtrl.style.left = toX + "px";
        	break;
        	case "b":
        	mousePanel.style.height = toY + "px";
        	mouseCtrl.style.top = toY + "px";
        	break;
        	case "rb":
        	mouseCtrl.style.left = toX + "px";
        	mouseCtrl.style.top = toY + "px";
        	mousePanel.style.width = toX + "px";
        	mousePanel.style.height = toY + "px";
        	break;
        }
    }
}
document.onmouseup = function(){
	isDraging=false;
	clearInterval(moving);
	moving = 0;
}
function resizable(el){
	var panel = el,
	rightBox = document.createElement("div"),
	bottomBox = document.createElement("div"),
	rightBottomBox = document.createElement("div");
    // 添加类
    rightBox.class = rightBox.className = "resizable-right resizable-box";
    bottomBox.class = bottomBox.className = "resizable-bottom resizable-box";
    rightBottomBox.class = rightBottomBox.className = "resizable-right-bottom resizable-box";
	// 添加到登录框
	panel.appendChild(rightBox);
	panel.appendChild(bottomBox);
	panel.appendChild(rightBottomBox);
	rightBox.addEventListener('mousedown',function(e){
		onMouseDown(e,panel,rightBox,"r")
	})
	bottomBox.addEventListener('mousedown',function(e){
		onMouseDown(e,panel,bottomBox,"b")
	})
	rightBottomBox.addEventListener('mousedown',function(e){
		onMouseDown(e,panel,rightBottomBox,"rb")
	})
}
// 加载  缩放 
window.onload = window.onresize = function(){
	autoCenter(g("loginBox"));
	fillBody(g("mask"));
	resizable(g("loginBox"));
}