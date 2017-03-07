// 自己demo页面获取 title 和链接
 function addSomeInfo(){
    var h = $('.articleTitle h2');
    h.innerHTML ='<a href="'+window.location.href+'">'+document.title+'</a>';
 }
// 简写常用的函数的写法
var $ = function(el){
    return document.querySelector(el);
}
var $$ = function(el){
    return document.querySelectorAll(el);
}
// 获取事件对象 
var getEvent = function(e){
    return e ? e : window.event;
}
//  获取事件对象目标
var getTarget = function(e){
    return e.target || e.srcElement;
}
var creEle = function(tagName){
    return document.createElement(tagName);
}
// 常用的 js事件方法 兼容
// 添加监听事件
function addEvent(ele,event,handler){
  if(ele.addEventListener){
    ele.addEventListener(ele,handler,false);
} else if(ele.attachEvent){
    ele.attachEvent('on'+event,handler);
} else{
    ele['on' + event] = handler;
}
}
// 移除监听事件
function removeEvent(ele,event,handler){
    if (ele.removeEventListener) {
        ele.removerEvenListener(event,handler,false)
    } else if (ele.detachEvent) {
        ele.detachEvent('on'+event,handler);
    } else {
        ele['on'+event] = null;
    }
}

