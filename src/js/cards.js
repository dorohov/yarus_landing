(function($) {
    "use strict"
    $(function() {

        $('.block-tw__block__content__list__sm a').on('click', function(e) {
            e.preventDefault()

            if($(this).hasClass('is--open')) {

                $(this).parent().siblings('ul').children('li').hide()
                $(this).removeClass('is--open')
                $(this).html('Показать еще')

            }else {

                $(this).parent().siblings('ul').children('li').show()
                $(this).addClass('is--open')
                $(this).html('Скрыть')
            
            }

        })

        var elems = $('.block-tw__block__content__list ul')
        var maxELemHeight = 0
        for(var i = 0; i < elems.length; i++) {
            if($(elems[i]).innerHeight() > maxELemHeight ) maxELemHeight = $(elems[i]).innerHeight()
        }

        $('.block-tw__block__content__list ul').css({
            minHeight: maxELemHeight
        })

        $(window).resize(function() {
            maxELemHeight = 0
            $('.block-tw__block__content__list ul').css({
                minHeight: 0
            })
            for(var i = 0; i < elems.length; i++) {
                if($(elems[i]).innerHeight() > maxELemHeight ) maxELemHeight = $(elems[i]).innerHeight()
            }
    
            $('.block-tw__block__content__list ul').css({
                minHeight: maxELemHeight
            })
        })

    })
})(jQuery);