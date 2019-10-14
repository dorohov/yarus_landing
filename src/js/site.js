(function($) {
    "use strict"
    $(function() {

        var time = 4;
        var $bar,
            $slick,
            isPause,
            tick,
            percentTime;

        $slick = $('.block-on__right__items').slick({
            prevArrow: '.block-on__right__controls__btns button.is--prev',
            nextArrow: '.block-on__right__controls__btns button.is--next',
            draggable: false,
            mobileFirst: true
        })

        $bar = $('.block-on__right__controls__bar span');

        $('.block-on__right').on({
            mouseenter: function() {
                isPause = true;
            },
            mouseleave: function() {
                isPause = false;
            }
        })

        function startProgressbar() {
            resetProgressbar();
            percentTime = 0;
            isPause = false;
            tick = setInterval(interval, 10);
        }

        function interval() {
            if(isPause === false) {
                percentTime += 1 / (time+0.1);
                $bar.css({
                    width: percentTime+"%"
                });
                if(percentTime >= 100) {
                    $slick.slick('slickNext');
                    startProgressbar();
                }
            }
        }

        function resetProgressbar() {
            $bar.css({
                width: 0+'%' 
            });
            clearTimeout(tick);
        }

        startProgressbar();
        
        $('.block-on__right__items').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            $('.block-on__right__controls__nums').html('<span>0' + (nextSlide + 1) + '</span> / 0' + slick.slideCount ) 
        })

        $('.block-on__right__items').slick('slickGoTo', 0);

        $('.block-sv__block__title').on('click', function() {
            var _c = $(this).siblings('.block-sv__block__text')
            $('.block-sv__block__title').not(this).removeClass('is--open')
            $('.block-sv__block__text').not(_c).slideUp()
            var _c = $(_c).slideToggle()
            $(this).toggleClass('is--open')
        })

    })
})(jQuery);