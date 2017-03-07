$(document).ready(function($) {
	$('.searchInput .inputtext').focus();
    $('.searchInput .inputtext').keyup(function(event) {
        var val=$('.searchInput .inputtext').val();
    	$.ajax({
    		url: 'http://suggest.taobao.com/sug',
    		type: 'get',
    		dataType: 'jsonp',
            data:{
               q:val,
               "code": "utf-8"
            },
    		success:function(data){
               var html = "";
               for (var i = 0; i < data.result.length; i++) {
                   html += "<li>" + data.result[i][0] + "</li>";
               }
               $('.suggest').html(html).slideDown(1000);
                $('.suggest li').hover(function() {
                	$(this).addClass('active')
                }, function() {
                	$(this).removeClass('active')
                });               
               // $("#suggest ul").html(html);
               // $("#suggest ul").show();
    		}           
    	})	  	
    });
    $(document).click(function () {
        if (event.target.tagName == "INPUT") {
            $(".suggest").slideDown(100);
        } else {
            $(".suggest").slideUp(100)
        }
    });
});