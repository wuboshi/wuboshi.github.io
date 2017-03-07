;
(function($, window, document) {
	var Carousel = function(carousel) {
		var self = this;
		this.carousel = carousel;
		this.carouselbox = this.carousel.find('.carouselList');
		this.carouselitem = this.carousel.find('.carouselItem');
		this.firstItem = this.carouselitem.first(); // 第一帧，居于画面中间的第一幅图
		this.lastItem = this.carouselitem.last(); // 最后一帧
		this.prevbtn = this.carousel.find('.prev');
		this.nextbtn = this.carousel.find('.next');
		this.animated = true;    // 防止连续点击 造成的 影响
		// 默认参数
		this.settings = {
				width: 800,
				height: 270,
				posterWidth: 640,
				posterHeight: 270,
				scale: 0.8,
				autoPlay: true,
				delay: 3000,                       //   每真动画 延迟 时间
				speed: 300,                        //   速度 毫秒
				vericalAlign: "top"
			}
		// 获得 自定义配置参数
		this.customsetting = this.getsetting();
		// 与默认参数合并
		this.setsettings = $.extend({}, this.settings, this.customsetting);
		// 设置配置参数
		this.setValue();
		// 设置其余帧的 高度 宽度 zIndex属性 等
		this.setPosts();
		// 左右切换 的 点击事件
		// 往左旋转
		this.nextbtn.click(function() {
			if (self.animated) {
				self.animated = false;
				self.rotate("left");
			}
		});
		// 往右旋转
		this.prevbtn.click(function() {
			if (self.animated) {
				self.animated = false;
				self.rotate("right");
			}
		})
		// 判断是否自动执行
		if (this.setsettings.autoPlay) {
			this.autoPlay();
			this.carousel.hover(function(){
              clearInterval(self.timer);
			},function(){
              self.autoPlay()
			});
		}
	};
	Carousel.prototype = {
		// 获取 配置参数
		getsetting: function() {
			var settings = this.carousel.attr("data-setting");
			if (settings && settings != "") {
				return $.parseJSON(settings);
			} else {
				return {};
			}
		},
		// 初始设置
		setValue: function() {
			// 左右切换按钮的 宽度 高度
			var btnw = (this.setsettings.width - this.setsettings.posterWidth) / 2;
			var btnh = this.setsettings.height;
			// 设置左右切换按钮的宽度 高度 zindex层级关系
			this.prevbtn.css({
				width: btnw,
				height: btnh,
				zIndex: Math.ceil(this.carouselitem.length / 2)
			});
			this.nextbtn.css({
				width: btnw,
				height: btnh,
				zIndex: Math.ceil(this.carouselitem.length / 2)
			});
			this.carousel.css({
				width: this.setsettings.width,
				height: this.setsettings.height
			});
			this.carouselbox.css({
				width: this.setsettings.width,
				height: this.setsettings.height
			});
			this.firstItem.css({
				width: this.setsettings.posterWidth,
				height: this.setsettings.posterHeight,
				left: btnw,
				zIndex: Math.ceil(this.carouselitem.length / 2)
			});
		},
		// 设置其余帧 的 高度 宽度 zIndex属性等
		setPosts: function() {

			// 缩放比例
			var scale = this.setsettings.scale;
			// 第一帧的宽度 高度
			var posterW = this.setsettings.posterWidth,
				posterH = this.setsettings.posterHeight;
			var otheritems = this.carouselitem.slice(1);
			// 分成左右两部分，每部分的帧数
			var itemsize = otheritems.length / 2;
			var gap = ((this.setsettings.width - posterW) / 2) / itemsize;
			// 左右两部分的 帧
			var rightitems = otheritems.slice(0, itemsize),
				leftitems = otheritems.slice(itemsize),
				firstLeft = (this.setsettings.width - posterW) / 2 + posterW;
			// 设置右边帧的位置 属性
			var rw = posterW,
				rh = posterH,
				rindex = itemsize;
			// 右边帧的位置
			rightitems.each(function(i) {
					rw *= scale;
					rh *= scale;
					var j = i;
					$(this).css({
						zIndex: --rindex,
						width: rw,
						height: rh,
						left: firstLeft + gap * (++i) - rw,
						top: 11,
						opacity: 1 / (++j)
					});
				})
				// 设置左边帧的位置 属性
				// 右边帧是一步步缩小，左边帧是一步步放大，
				// 左边 第一帧 是以 右边 最后一帧 为基础的
			var lw = rw * scale,
				lh = rh * scale,
				lindex = itemsize;
			// 左边帧的位置
			leftitems.each(function(i) {
				lw /= scale;
				lh /= scale;
				var j = i;
				$(this).css({
					zIndex: i,
					width: lw,
					height: lh,
					left: gap * (i),
					top: 11,
					opacity: 1 / (lindex)
				});
				--lindex
			})
		},
		// 轮播动画
		rotate: function(dir) {
			var _this_ = this;
			// 点击向右切换 左旋转
			if (dir == "left") {
				this.carouselitem.each(function(index, el) {
					var self = $(this);
					// 如若是第一个，则没有前一个，取最后一个的值
					var prev = self.prev().get(0) ? self.prev() : _this_.lastItem;
					var width = prev.width(),
						height = prev.height(),
						opacity = prev.css("opacity"),
						zindex = prev.css("zIndex"),
						left = prev.css("left"),
						top = prev.css("top");
					self.animate({
						width: width,
						height: height,
						opacity: opacity,
						zIndex: zindex,
						left: left,
						top: top
					}, _this_.setsettings.speed, function() {
						_this_.animated = true;

					});
				})
			} else if (dir == "right") {
				// 向右 滑动
				this.carouselitem.each(function(index, el) {
					var self = $(this);
					// 如若是第一个，则没有前一个，取最后一个的值
					var next = self.next().get(0) ? self.next() : _this_.firstItem;
					var width = next.width(),
						height = next.height(),
						opacity = next.css("opacity"),
						zindex = next.css("zIndex"),
						left = next.css("left"),
						top = next.css("top");
					console.log(zindex);
					self.animate({
						width: width,
						height: height,
						opacity: opacity,
						zIndex: zindex,
						left: left,
						top: top
					}, _this_.setsettings.speed, function() {
						_this_.animated = true;
					});
				})
			}
		},
		autoPlay:function(){
			var self = this;
			this.timer = setInterval(function(){
                self.nextbtn.click();
			},self.setsettings.delay)
		}
	}
	Carousel.init = function(carousels) {

		var _this_ = this;
		carousels.each(function() {
			new _this_($(this));
		});
	};
	window["Carousel"] = Carousel;
})(jQuery, window, document)