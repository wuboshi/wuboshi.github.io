	;
	(function($, window, undefined) {
		function showPager(ele, opt) {
			var _this = this;
			this.$ele = ele;
			this.defaults = {
				pageIndex: 1, // 当前页
				total: 100, // 总共页数
				neighbors: 3 // 当前页 前后左右显示多少页
			};
			this.options = $.extend({}, this.defaults, opt || {});
			this.init();
		};
		showPager.prototype = {
			init: function() {
				this.render();
				this.bindClick();
			},
			render: function() {
				var self = this;
				self.$ele.empty();
				var total = self.options.total,
					pageIndex = self.options.pageIndex,
					neighbors = self.options.neighbors;
				var str = '<a href = "javascript:;"  href = "javascript:;" page="' + pageIndex + '" class ="current index">' + pageIndex + '</a>';
				// 当前页码的前三页 后三页
				for (var i = 1; i <= neighbors; i++) {
					// 第一页 在 下面另外添加
					if (pageIndex - i > 1) {
						str = '<a  href = "javascript:;"  href = "javascript:;"  page="' + (pageIndex - i) + '" class = "index"> ' + (pageIndex - i) + '</a>' + str;
					}
					// 最后一页 在 后面另外添加
					if (pageIndex + i < total) {
						str = str + '<a  href = "javascript:;"  page="' +(pageIndex + i) + '" class = "index"> ' + (pageIndex + i) + '</a>';
					}
				}
				//当前页 neighbots页之前的省略
				if (pageIndex > neighbors + 2) {
					str = '<span>...</span>' + str;
				}
				//上一页，当前页不为第一页，则就有上一页
				if (pageIndex > 1) {
					str = '<a class="prev"  page="' + (pageIndex-1) + '" href = "javascript:;" >' + '上一页' + '</a>' + '<a class = "index"  href = "javascript:;" page="1"> ' + 1 + '</a>' + str;
				}
				//当前页 neighbots页之后的省略
				if (pageIndex + neighbors < total) {
					str = str + '<span>...</span>';
				}
				//下一页
				if (pageIndex < total) {
					str = str + '<a class = "index" href = "javascript:;" page ="'+total+'">' + total + '</a>' + '<a class="next"  href = "javascript:;"   page="' + (pageIndex+1) + '" >' + '下一页' + '</a>';
				}
				$(str).appendTo(self.$ele);
			},
			bindClick: function() {
				var self = this;
				$(self.$ele).on('click', 'a', function(event) {
					event.preventDefault();
					var e = $(event.target);
					// 获取其索引
                    $.extend(self.options,{pageIndex:parseInt(e.attr('page'))});
                    self.render();
				});
			}
		};
		$.fn.showPager = function(opt) {
			// $(this) 把dom节点作为一个参数
			return new showPager($(this), opt);
		};
	})(jQuery, window)