(function() {
	function Calendar(ele) {
		this.ele = ele;
		this.init();
	};
	Calendar.prototype = {
		renderDom: function() {
			var self = this;
			// 添加日历 dom结构
			var tab = document.createElement('table');
			tab.innerHTML = '<caption>\
						      <span id="ypre" class="change" title="上一年">&lt;</span>\
						      <span id="mpre"  class="change" title="上一月">&lt;</span>\
						      <span id="title"></span>\
						      <!--存放默认标题-->\
						      <span id="mnext"  class="change" title="下一月">&gt;</span>\
						      <span id="ynext"  class="change" title="下一年">&gt;</span>\
						    </caption>\
						    <thead>\
						      <tr>\
						        <th>Sun</th>\
						        <th>Mon</th>\
						        <th>Tue</th>\
						        <th>Wed</th>\
						        <th>Thu</th>\
						        <th>Fri</th>\
						        <th>Sat</th>\
						      </tr>\
						    </thead>\
						    <tbody></tbody>';
			this.ele.appendChild(tab);
			// 获取 时间
			var y, m, d, startWeek, dayStart;
			var time = new Date();
			y = time.getFullYear(); // 年份
			m = time.getMonth(); // 0-11
			d = time.getDate(); // 1-31
			dayStart = new Date(y, m, 01);
			startWeek = dayStart.getDay(); //0_6
			var title = document.getElementById('title');
			title.innerHTML = y + "年" + (m + 1) + "月";
			// dom 结构完善之后 才能进一步操作
			this.drawTable(tab);
			this.drawCalendar(y, m, d, startWeek, tab);
			this.changeTime(y, m, d, startWeek, tab);
			this.chooseDate(y, m, d, startWeek, tab);
		},
		// 绘制表格 先把表格 tr td 搭建起来
		drawTable: function(table) {
			for (var i = 0; i < 6; i++) {
				// tr 声明 放在这层循环之内 
				var tr = document.createElement('tr');
				table.tBodies[0].appendChild(tr);
				for (var j = 0; j < 7; j++) {
					var td = document.createElement('td');
					tr.appendChild(td);
				}
			}
		},
		//v绘制 日期
		drawCalendar: function(y, m, d, startWeek, tab) {
			var day = 1; // 记录几号
			// 判断 该月有多少天
			var lastday;
			switch (m) {
				case 0:
				case 2:
				case 4:
				case 6:
				case 7:
				case 9:
				case 11:
					lastday = 31;
					break;
				case 3:
				case 5:
				case 8:
				case 10:
					lastday = 30;
					break;
				case 1:
					// 判断是否是瑞年
					if (y % 4 == 0) {
						lastday = 29;
					} else {
						lastday = 28;
					}
					break;
				default:
					console.log("Switch 出现错误");
					break;
			}
			// 取得所有行
			var rows = tab.tBodies[0].rows;
			// 绘制第一行前面的部分
			for (var i = 0; i < startWeek; i++) {
				rows[0].cells[i].innerHTML = '';
			}
			// 绘制第一行
			for (var i = startWeek; i < 7; i++) {
				rows[0].cells[i].innerHTML = day;
				//把之前设置的颜色清空
				rows[0].cells[i].style.color = "";
				// 当天日期 标识出来
				if (day == d) {
					rows[0].cells[i].style.color = "red";
				}
				day++;
			}
			// 绘制其他行
			for (var i = 1; i < rows.length; i++) {
				for (var j = 0; j < 7; j++) {
					rows[i].cells[j].innerHTML = day;
					rows[i].cells[j].style.color = "";
					if (day == d) {
						rows[i].cells[j].style.color = "red";
					}
					day++;
					if (day > lastday) {
						return;
					}
				}
			}
		},
		// 左右 切换年份 月份
		changeTime: function(y, m, d, startWeek, tab) {
			var self = this;
			var spans = this.ele.getElementsByTagName("span");
			for (var i = 0; i < spans.length; i++) {
				spans[i].index = i;
				spans[i].onclick = function() {
					switch (this.index) {
						case 0:
							--y;
							break;
						case 1:
							--m;
							if (m < 0) {
								m = 11; // m<0 则变化为上一年的十二月
								--y;
							}

							break;
						case 2:
							break;
						case 3:
							++m;
							if (m > 11) {
								m = 0;
								++y;
							}
							break;
						case 4:
							++y;
							break;
					}
					var date = new Date(y, m, 01);
					var week = date.getDay(); // 0-6
					var d = date.getDate(); // 0-31
					var title = document.getElementById('title');
					title.innerHTML = y + "年" + (m + 1) + "月";
					self.drawTable(tab);
					self.drawCalendar(y, m, d, week, tab);
                    sele.chooseDate(y, m, d, week, tab);
				};
			}
		},
		// 点击选中日期时
		chooseDate: function(y, m, d, startWeek, tab) {
			var date = document.getElementById('date');
			var rows = tab.tBodies[0].rows;
			for (var i = 0; i < rows.length; i++) {
				for (var j = 0; j < 7; j++) {

					rows[i].cells[j].onclick = function() {
						for (var i = 0; i < rows.length; i++) {
							for (var j = 0; j < 7; j++) {

								rows[i].cells[j].onclick = function() {
									// 点击时，先把所有的样式都清空
									
									if (this.innerHTML == '') {
										alert("这是空的，点错啦(●'◡'●)")
									} else {
										this.style.color = "red";
										d = this.innerHTML;

									}
									date.value = y + '-' + (m + 1) + '-' + d;
								}
							}
						}
						// // 点击时，先把所有的样式都清空
						// rows[i].cells[j].style.color = "";
						if (this.innerHTML == '') {
							alert("这是空的，点错啦(●'◡'●)")
						} else {
							this.style.color = "red";
							d = this.innerHTML;

						}
						date.value = y + '-' + (m + 1) + '-' + d;
					}
				}
			}
		},
		init: function() {
			this.renderDom();
		}
	};
	window["Calendar"] = Calendar;
})()