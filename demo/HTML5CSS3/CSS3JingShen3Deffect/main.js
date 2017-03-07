$(document).ready(function($) {
	$('.box').mouseenter(function(event) {
		var parentLeft=$(this).offset().left;
		var parentTop=$(this).offset().top;
		var boxWidth=$(this).outerWidth();
		var boxHeight=$(this).outerHeight();
        $(this).mousemove(function(event) {
        	var moveX=event.pageX-parentLeft;
        	var moveY=event.pageY-parentTop;
        	// 以 preserve-3d 的正中心为“原点”，有正负
        	var X = moveX-boxWidth/2;
        	var Y = boxHeight/2-moveY;
        	$(this).css({
        		// pageY和rotateY是两个方向上的概念
        	    "-webkit-transform": "rotateY(" + X / 50 + "deg) " + "rotateX("  + Y / 50 + "deg)",
        	    "transform":"rotateY(" + X / 50 + "deg) " + "rotateX("  + Y / 50 + "deg)"
        	});0
        });
        $(this).mouseleave(function(event) {
        	$(this).css({
        		"-webkit-transform": "rotateY(" + 0 + "deg) " + "rotateX("  + 0 + "deg)",
        		"transform":"rotateY(" + 0 + "deg) " + "rotateX("  + 0 + "deg)"
        	});
        });
	});
});