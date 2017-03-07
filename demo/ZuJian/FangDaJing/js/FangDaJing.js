;
(function($, window, undefined) {
	$.fn.zoom = function(options) {
		var defaluts = {
			zoomX: 360, // 放大镜 宽度
			zooY: 225, // 放大镜 高度
			offset: 10, // 放大镜与原图片距离
			position: "right" // 默认在原图的右边
		};
		var options = $.extend({}, defaluts, options || {});

		$(this).each(function() {
			$(this).hover(function() {
				// 获取 基本的 宽高
				var imgs = $(this).get(0);
				var imgW = imgs.clientWidth;
				var imgH = imgs.clientHeight;
				var imgTop = parseInt(imgs.offsetTop);
				var imgLeft = parseInt(imgs.offsetLeft);
				// 添加放大镜d
				$('<div class="zoomBox"><img class = "zoomPic" src="' + $(this).attr("src") + '"/></div>').insertAfter($(this));
				var zoomBox = $("div.zoomBox");
				// zoomBox 的 左边距离
				var zoomBoxLeft;
				if (options.position == "right") {
					zoomBoxLeft = imgs.offsetLeft + imgW + options.offset;
				} else if (options.position == "left") {
					zoomBoxLeft = imgLeft - options.zoomX - options.offset;
				}
				zoomBox.css({
					top: imgTop,
					left: zoomBoxLeft,
					width: options.zoomX,
					height: options.zooY
				});
				$(document).mousemove(function(event) {
					// 获取放大镜中图片 宽高
					var innerW = $('.zoomPic').get(0).clientWidth;
					var innerH = $('.zoomPic').get(0).clientHeight;
					var scalex = Math.round(innerW / imgW);
					var scaley = Math.round(innerH / imgH);
					var scrollY = event.pageY - imgTop;
					var scrollX = event.pageX - imgLeft;
					zoomBox.get(0).scrollTop = scrollY * scaley;
					zoomBox.get(0).scrollLeft = scrollX * scalex;
				});

			}, function() {

				$(".zoomBox").hide();
				$(".zoomBox").remove();
				$(document).unbind('mousemove');
			});

		});
	}
})(jQuery, window)