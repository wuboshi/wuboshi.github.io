window.onload = function(){
	var container = $("#container"),
	list = $("#list"),
	prev = $("#prev"),
	next = $("#next"),
	buttons = document.getElementById('buttons').getElementsByTagName('span'),
	buttonsLength = buttons.length;
	var animated = false;
	var index = 0;
	// a 标签 绑定 click 事件  如何绑定？？？
	// addEvent(prev,"click",function(e){
	// })


	//  底部按钮的显示
	function showbutton(){
		for (var i = 0; i < buttonsLength; i++) {
			if(buttons[i].className=="on"){
				buttons[i].className="";
				break;
			}
		}
		buttons[index].className = "on";
	}

	// 图片轮播 动画
	function animate(distance){
		var oldLeft = parseInt(list.style.left),
		newLeft = oldLeft + distance;
		animated = true;
		var time = 300; // 切换 总时间
		var interval = 10;  // 每一次切换时间
		var speed = distance/(time/interval);    // 一共三十次动作，每次的距离（即“速度”）为speed
		var go = function(){
			if ((speed > 0 && parseInt(list.style.left) < newLeft) || (speed < 0 && parseInt(list.style.left) > newLeft)) {
				list.style.left = parseInt(list.style.left) + speed + "px";
				setTimeout(go, interval);
			} else {
            	// 相当于 list 在水平移动过程中，到了两边之后，重置一下它的 left值
            	if(newLeft < -3000){
            		list.style.left = -600 + "px";
            	}
            	if(newLeft > -600){
            		list.style.left = -3000 + "px";	
            	}
            	animated = false;
            }
        }
        go();
        // list.style.left = newLeft + "px";
    }
    prev.onclick = function(){
    	if (animated) {
    		return;
    	}
    	//  底部按钮的 index
    	index -= 1;
    	if (index < 0 ) {
    		index = 4;
    	} 
    	showbutton();
    	animate(-600);	
    }
    next.onclick = function(){
    	if (animated) {
    		return;
    	}
    	index += 1;
    	if (index > 4 ) {
    		index = 0;
    	} 
    	showbutton();
    	animate(600);	
    }
	// 按钮点击  切换按钮
	for (var i = 0; i < buttonsLength; i++) {
		// 遍历 绑定 click事件，为毛可以用？怎么没有闭包那个问题
		buttons[i].onclick = function(){
			if (animated) {
				return;
			}
			if (this.className == "on") {
				return;
			}
			// getAttribute 得到自定义 属性
			var myIndex = this.getAttribute("index");
			// 计算 移动距离
			var offset = -600 * (myIndex - index);	
			animate(offset);	
			index = myIndex;
			showbutton();
		}
	}
	function play(){
		timer = setTimeout(function(){
			// 自动播放，就好像有人在不停 “点击”
			next.onclick();
			play();
		},3000)
	}
	function stop(){
		clearTimeout(timer);
	}
    container.onmouseover = stop;
    container.onmouseout = play;
	play();
}










