;
(function($, window, document, undefined) {
	var Jlight = function(opt) {
		var self = this;
		this.settings = $.extend({
			speed: 500
		}, opt || {})
		this.imgPop = $('.J-light-box'); // 取得需要 灯箱效果的 图片
		// 添加遮罩 灯箱
		this.mask = $('<div id="light-mask"></div>');
		this.lightBox = $('<div class="light-popbox"></div>');
		this.bodyNode = $(document.body);
		this.renderDom();
		// 获取各个dom node
		this.lightPopPic = this.lightBox.find('.light-pop-pic'); // 图片区域
		this.lightPopImg = this.lightBox.find('img') //  弹出灯箱 图片
		this.prevBtn = this.lightBox.find('.image-prev'); // 上一张 切换按钮
		this.nextBtn = this.lightBox.find('.image-next'); // 下一张 切换按钮
		this.lightPopTitle = this.lightBox.find('.light-pop-title');
		this.lightPopDEscri = this.lightBox.find('.light-pop-descri'); // 底部 描述区域
		this.lightCloseBtn = this.lightBox.find('.light-pop-close'); // 底部关闭按钮
		this.DescriTitle = this.lightBox.find('.descri-title'); // 描述区域 标题
		this.DescriIndex = this.lightBox.find('.descri-index'); // 描述区域 索引

		// 事件委托 点击图片
		this.groupIndex = null; // 图片的组别      
		this.groupInfo = []; // 保存同组 的图片的信息                       
		this.bodyNode.on('click', '.J-light-box', function(event) {
			// 阻止默认事件
			event.preventDefault();
			if ($(this).attr('data-group') != self.groupIndex) {
				self.groupIndex = $(this).attr('data-group');
				self.getGroupInfo();
			}
			self.initPop($(this));
		});
		// 关闭 灯箱
		this.mask.click(function(event) {
			$(this).fadeOut();
			self.lightBox.fadeOut();
		});
		this.lightCloseBtn.click(function(event) {
			$(this).fadeOut();
			self.lightBox.fadeOut();
		});
	};
	Jlight.prototype = {
		loadPicSize: function(sourceSrc) {
			var self = this;
			// 每次加载图片 要把上次的宽高清空
			this.lightPopImg.css({
				width: 'auto',
				height: 'auto'
			});
			this.lightPopTitle.hide();
			this.preLoadImg(sourceSrc, function() {
				var picW = self.lightPopImg.width(),
					picH = self.lightPopImg.height();
				self.changePic(picW, picH);
			});
			this.DescriTitle.text();
		},
		// 图片宽高
		changePic: function(width, height) {
			var self = this;
			var winW = $(window).width(),
				winH = $(window).height();
			var scale = Math.min(winW / (width + 10), winH / (height + 10), 1);
			height *= scale;
			width *= scale;
			this.lightPopPic.animate({
					width: width - 10,
					height: height - 1
				},
				self.settings.speed);
			var top = (winH - height) / 2;
			this.lightBox.animate({
					width: width,
					height: height,
					marginLeft: -(width / 2),
					top: top
				},
				self.settings.speed,
				function() {
					self.lightPopImg.animate({
						width: width - 10,
						height: height - 10
					}).fadeIn(self.settings.speed);
					self.lightPopTitle.fadeIn(self.settings.speed);
				});
		},
		// 监控图片是否加载完成
		preLoadImg: function(src, callback) {
			var img = new Image();
			img.src = src;
			if (!!window.ActiveXObject) {
				img.onreadystatechange = function() {
					if (this.readyState == 'complete') {
						callback();
					};
				};
			} else {
				img.onload = function() {
					callback();
				}
			}
		},
		showMaskAndPopup: function(sourceSrc, currentId) {
			var self = this;
			// alert("12");
			// 先让 遮罩层，灯箱框 消失
			this.lightPopImg.hide();
			this.lightPopTitle.hide();
			var winW = $(window).width(),
				winH = $(window).height();
			// 设置图片预览区域 大小为视口的一半
			this.lightPopPic.css({
				width: winW / 2,
				height: winH / 2
			});
			this.mask.fadeIn();
			this.lightBox.fadeIn();
			var picW = winW / 2 + 10,
				picH = winH / 2 + 10;
			var lightH = winH / 2 + 10; // 灯箱的高度 10 是上下边框的高度
			var topAnimate = (winH - lightH) / 2;
			// 设置弹出层的 水平居中 和 动画效果
			this.lightBox.css({
				width: picW,
				height: picH,
				marginLeft: -(picW / 2), // 水平居中
				top: -(winH / 2)
			}).animate({
					top: topAnimate,
				},
				self.settings.speed,
				function() {
					self.loadPicSize(sourceSrc);
				});
			// 写到这里写不下去了,
			// 对象理解的还不够深入
			// this.index=this.getIndexOf(currentId);
		},
		// getIndexOf:function(currentId){
		// 	var index = 0;
		// 	$(this.groupInfo).each(function(i) {
		// 		index = i;
		// 		if (this.) {}
		// 	});
		// },
		initPop: function(currentObj) {
			//获取src加载图片  获取id顺序来判断 上一页 下一页的 出现与否
			var src = currentObj.attr('src'),
				id = currentObj.attr('data-id');
			// 显出遮罩层， 弹窗
			this.showMaskAndPopup(src, id);
			
		},
		//获取同族的 图片信息
		getGroupInfo: function() {
			var self = this;
			var groupList = this.bodyNode.find('*[data-group = ' + this.groupIndex + ']');
			groupList.each(function(index, el) {
				self.groupInfo.push({
					id: $(this).attr('data-id'),
					title: $(this).attr('data-title'),
					src: $(this).attr('src')
				});
			});
		},
		renderDom: function() {
			var strDom = '<div class="light-pop-pic">' +
				'<span class="image-prev btn"></span>' +
				'<img src="images/1-1.jpg">' +
				'<span class="image-next btn"></span>' +
				'</div>' +
				'<div class="light-pop-title">' +
				'<div class="light-pop-descri">' +
				'<p class = "descri-title">标题</p>' +
				'<p class = "descri-index"> 当前是第几张图片</p>' +
				'</div>' +
				'<div class="light-pop-close">' +
				'关闭按钮' +
				'</div>' +
				'</div>';
			this.lightBox.html(strDom);
			this.mask.appendTo(this.bodyNode);
			this.lightBox.appendTo(this.bodyNode)
		}
	};
	window['Jlight'] = Jlight;
})(jQuery, window, document)