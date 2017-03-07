$(document).ready(function($) {
        $(document).scrollTop(0);
        $(document).scroll(function(event) {
                var top = $(document).scrollTop();
                var moveId = '';
                $('.wrapper .content .item').each(function(index, el) {
                        var self = $(this);
                        if (top > self.offset().top - 100) {
                                moveId = self.attr('index');
                        } else {
                                return false;
                        }
                        if (moveId != '' & ($('.menu li .active').attr('index') != moveId)) {
                                $('.menu li .active').removeClass('active');
                                $('.menu').find('li [index=' + moveId + ']').addClass('active');
                        }
                });
        });
        // $('.menu ').on('click', 'li a ', function(event) {
                
        //         var self = $(this);
        //         var index = self.attr('index');
        //         var preIndex = $('.menu li .active').attr('index')
        //         if (index == preIndex) {
        //                 return;
        //         } else {

        //                 $('.menu li .active').removeClass('active');
        //                 $('.menu').find('li [index=' + index + ']').addClass('active');
                        
        //         }
        // });
});