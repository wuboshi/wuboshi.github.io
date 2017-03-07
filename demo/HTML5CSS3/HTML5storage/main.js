$(document).ready(function($) {
        // 取得local storage中的内容，并加以渲染
        var infoList=getlist('chatinfo');
        console.log(infoList);
        console.log('localStorage '+localStorage)
        for (var i = 0; i < infoList.length; i++) {
               var $info=$('<div>').addClass('info').text(infoList[i]['info']);
               var $time=$('<div>').addClass('time').text(infoList[i]['time']);
               var $del=$('<div>').addClass('del').text('删除？');
               $('<li>').attr('index', infoList[i]['index']).append($info,$time,$del).appendTo($('.content .content-list '));

        }
        // 发送事件
        var sendbtn = $('.sendbtn .send');
        sendbtn.click(function(event) {
                var sendInfo = $('.send-content .inputtext').val();
                if (!sendInfo) {
                        alert("聊天内容为空，请输入内容")
                } else {
                        addinfo(sendInfo);
                }
        });
        var cancel = $('.sendbtn .cancel');
        cancel.click(function(event) {
              $('.wrapper .content .content-list li .del').each(function(index, el) {
                      if ($(this).hasClass('sure') ) {
                        $(this).removeClass('sure')
                      } else {
                        $(this).addClass('sure')
                        .click(function(event) {
                                // 在dom结构中删除对应的聊天 
                              $('.content .content-list li[index='+(index+1)+']').remove();
                              cancel.trigger('click');
                              var infoArray = getlist('chatinfo');
                              infoArray.splice(index,1);
                              localStorage.setItem('chatinfo',JSON.stringify(infoArray));
                        });;
                      }
              });
              
        });
        
        function addinfo(info) {
                // 获取发布聊天时间
                var date = new Date(),
                        year = date.getFullYear(),
                        month = date.getMonth() + 1,
                        monthdate = date.getDate(), // 一月中的某一天
                        hour = date.getHours(),
                        minute = date.getMinutes(),
                        second = date.getSeconds();
                var time = year + '年' + month + '月' + monthdate + '号， ' + hour + ':' + minute + ':' + second;
                // var msg=year+'年'+month+'月'+monthdate+'号，'+'你留下le'+info;
                // 因为localStorage是键值对形式，所以将多个信息合并为一个对象
                var infoArray = getlist('chatinfo');
                var index=infoArray.length+1;
                var infoObject = {
                        info: info,
                        time: time,
                        index:index
                };
                infoArray.push(infoObject);
                localStorage.setItem('chatinfo',JSON.stringify(infoArray));
                // 立即 在 当前页面上面 显示出dom改变的结果,造成聊天的假象
                var $info=$('<div>').addClass('info').text(info);
                var $time=$('<div>').addClass('time').text(time);
                var $del=$('<div>').addClass('del').text('删除？');
                $('<li>').attr('index', index)
                .append($info,$time,$del).appendTo($('.content .content-list'));
                // 清空聊天发送框
                $('.send-content .inputtext').val('');
        }
        // 获取本地存储的相应某个键对应的值
        function getlist(value){
           var val=localStorage.getItem(value);
           if (val==null) {
             val=[];
           } else {
             val=JSON.parse(val);
           }
           return val;
        }
});