;(function(window,document,undefined){
    function Tan(){
    	return new Tan.prototype.init(param);
    }
    Tan.prototype = {
    	constructor: Tan,
    	container:null,
    	wrap:null,
    	header:null,
    	width:0,
    	height:0,
    	isDown:false,    // 按下鼠标，拖拽，默认false
    	init: function(param){
            this.container = param.wrap || null;
            this.wrap = this.container.querySelector('.pop-wrap')||null;
            this.header = this.container.querySelector('.pop-header')||null;
            if(!this.container || !this.wrap || !this.header){
                console.warn('弹窗框HTML结构不完整');
                return;
            }
            this.type = param.type || info;  //弹出框默认类型为 info
            this.container.className +=' ' + this.type;
            var self = this,
                confirm = this.container.querySelector('.confirm'),
                cancel = this.container.querySelector('.cancel');
            // 绑定确定按钮事件
            confirm && confirm.addEventListener('click',function(){
                param.confirm();
                self.hide();
            },false);
            // 绑定取消按钮事件
            cancel && cancel.addEventListener('click',function(){
            	param.cancel();
            	self.hide();
            },false);
            // 弹窗拖动
            var offsetX = 0,
            offsetY = 0,
            mL = 0,
            mT = 0,
            wH = document.documentElement.clientHeight,
            wW = document.documentElement.clientWidth;

            document.addEventListener('mousedown',_down,false);
            document.addEventListener('mouseup',_up,false);

            function _down(event){
               var event = event || window.event;
               if (event.target.className ===self.header.className ||
               	event.target.parentNode.className===self.header.calssName) {
                self.isDown = true;
                document.addEventListener('mousemove',_move,false)
               }
            }
            function _up(){


            }
            function _move(event){
                var event = event || window.event;
                event.preventDefault();
                if(self.isDown){

                }
            }
    	},
    	show: function(){
    		this.container.className += ' show';
    		// status 这一块儿 是啥意思 ？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？
    		this.status = true;
    		this.width= this.wrap.clientWidth;
    		this.height = this.wrap.clientHeight;
    		this.wrap.style.marginLeft = -(this.width/2) +'px';
            this.wrap.style.marginTop = -(this.height/2) + 'px';
            // 禁止页面滚动   阻止滚轮的默认事件
            window.addEventListener('mousewheel',_stopScroll,false)
            return this;
    	},
    	hide: function(){
            this.container.className = this.container.className.replace(/show/g,'').trim();
    	    this.wrap.style.cssText = '';
    	    this.status = false;
    	    window.removeEventListener('mousewheel',_stopScroll,false);
    	    return this;
    	}
    }
    function _stopScroll(event){
        var event = event || window.event;
        event.preventDefault();
    }
 })(window,document)