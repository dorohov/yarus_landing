(function($) {
    "use strict"
    $(function() {

      var options = {
        f1: null,
        f2: null,
        f3: null
      }

      function setPrice() {

        if(options.f1 && options.f2 && options.f3) {
          var price = options.f1 * options.f2  * options.f3
          $('.calc__price__block__inner span').html(price)
        }else {
          alert('Пожалуйста заполните все поля!')
        }

      }

      $( "#calc3" ).slider({
        min: 0,
        max: 200,
        slide: function( event, ui ) {
          $('.calc__wrap__right__block__footer span.is--min').html(ui.value)
          options.f3 = ui.value
        }
      });

      $('input[name="calc_form1"]').change(function(e) {
        options.f1 = 1
      })

      $('.calc__wrap__right select').change(function(e) {
        if(e.target.value > 0) {
          if(e.target.value == 1) options.f2 = 7500
          else if(e.target.value == 2) options.f2 = 12500
        }
      })

      $('.calc__btn a').on('click', function(e) {
        e.preventDefault()
        setPrice()
      })

    })
})(jQuery);
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
(function($) {
    "use strict"
    $(function() {
        
        function setPaddings() {

            var classes = {
                paddingLeft: '.is--c-pl',
                paddingRight: '.is--c-pr',
                height100Per: '.is--h100'
            }

            var padding = document.getElementsByClassName('navbar__inner')[0].getBoundingClientRect()
            var height = $('.navbar').innerHeight() + $('.footer').innerHeight()

            $(classes.paddingLeft).css({
                paddingLeft: padding.left + 30
            })
            $(classes.paddingRight).css({
                paddingRight: padding.left + 30
            })
            $(classes.height100Per).css({
                minHeight: 'calc(100vh - ' + height + 'px)'
            })
            $('main').css({
                minHeight: 'calc(100vh - ' + height + 'px)'
            })

        }

        setPaddings()

        $(window).resize(function() {
            setPaddings()
        })

        $('.anchor').on('click', function(e) {
            e.preventDefault();
            var _this = $(this)
            var aid = _this.attr("href");
            if(!aid) {
                aid = _this.data('target')
            }
            $('html,body').animate({scrollTop: $(aid).offset().top - $('.navbar').innerHeight()},'slow');
        })

        $('.sreviews__list__inner').slick({
            slidesToShow: 3,
            slidesToScroll: 3,
            prevArrow: '',
            nextArrow: '',
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        autoplay: true,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplay: true
                    }
                }
            ]
        })

        $('form').parsley()

        var phoneInputs = document.getElementById('in-phone');

        new IMask(
            phoneInputs, {
            mask: '+{7}(900)000-00-00'
        });

        $('.anchor').on('click', function(e) {
            e.preventDefault();
            var _this = $(this)
            var aid = _this.attr("href");
            if(!aid) {
                aid = _this.data('target')
            }
            $('html,body').animate({scrollTop: $(aid).offset().top - $('.navbar').innerHeight()},'slow');
        })
        
    })
})(jQuery);
ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [51.669032, 39.187091],
            zoom: 16,
            controls: []
        }, {
            searchControlProvider: 'yandex#search'
        })
});
(function($) {
    "use strict"
    $(function() {

        $('.block-fv__carousel__items').slick({
            prevArrow: '.block-fv__carousel__controls button.is--prev',
            nextArrow: '.block-fv__carousel__controls button.is--next',
            dots: true
        })

    })
})(jQuery);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbGMuanMiLCJjYXJkcy5qcyIsIm1haW4uanMiLCJtYXAuanMiLCJyZXZpZXdzLmpzIiwic2l0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCJcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICB2YXIgb3B0aW9ucyA9IHtcclxuICAgICAgICBmMTogbnVsbCxcclxuICAgICAgICBmMjogbnVsbCxcclxuICAgICAgICBmMzogbnVsbFxyXG4gICAgICB9XHJcblxyXG4gICAgICBmdW5jdGlvbiBzZXRQcmljZSgpIHtcclxuXHJcbiAgICAgICAgaWYob3B0aW9ucy5mMSAmJiBvcHRpb25zLmYyICYmIG9wdGlvbnMuZjMpIHtcclxuICAgICAgICAgIHZhciBwcmljZSA9IG9wdGlvbnMuZjEgKiBvcHRpb25zLmYyICAqIG9wdGlvbnMuZjNcclxuICAgICAgICAgICQoJy5jYWxjX19wcmljZV9fYmxvY2tfX2lubmVyIHNwYW4nKS5odG1sKHByaWNlKVxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgIGFsZXJ0KCfQn9C+0LbQsNC70YPQudGB0YLQsCDQt9Cw0L/QvtC70L3QuNGC0LUg0LLRgdC1INC/0L7Qu9GPIScpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgJCggXCIjY2FsYzNcIiApLnNsaWRlcih7XHJcbiAgICAgICAgbWluOiAwLFxyXG4gICAgICAgIG1heDogMjAwLFxyXG4gICAgICAgIHNsaWRlOiBmdW5jdGlvbiggZXZlbnQsIHVpICkge1xyXG4gICAgICAgICAgJCgnLmNhbGNfX3dyYXBfX3JpZ2h0X19ibG9ja19fZm9vdGVyIHNwYW4uaXMtLW1pbicpLmh0bWwodWkudmFsdWUpXHJcbiAgICAgICAgICBvcHRpb25zLmYzID0gdWkudmFsdWVcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgJCgnaW5wdXRbbmFtZT1cImNhbGNfZm9ybTFcIl0nKS5jaGFuZ2UoZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIG9wdGlvbnMuZjEgPSAxXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICAkKCcuY2FsY19fd3JhcF9fcmlnaHQgc2VsZWN0JykuY2hhbmdlKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZihlLnRhcmdldC52YWx1ZSA+IDApIHtcclxuICAgICAgICAgIGlmKGUudGFyZ2V0LnZhbHVlID09IDEpIG9wdGlvbnMuZjIgPSA3NTAwXHJcbiAgICAgICAgICBlbHNlIGlmKGUudGFyZ2V0LnZhbHVlID09IDIpIG9wdGlvbnMuZjIgPSAxMjUwMFxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcbiAgICAgICQoJy5jYWxjX19idG4gYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICBzZXRQcmljZSgpXHJcbiAgICAgIH0pXHJcblxyXG4gICAgfSlcclxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCJcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICQoJy5ibG9jay10d19fYmxvY2tfX2NvbnRlbnRfX2xpc3RfX3NtIGEnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG5cclxuICAgICAgICAgICAgaWYoJCh0aGlzKS5oYXNDbGFzcygnaXMtLW9wZW4nKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuc2libGluZ3MoJ3VsJykuY2hpbGRyZW4oJ2xpJykuaGlkZSgpXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy0tb3BlbicpXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmh0bWwoJ9Cf0L7QutCw0LfQsNGC0Ywg0LXRidC1JylcclxuXHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnNpYmxpbmdzKCd1bCcpLmNoaWxkcmVuKCdsaScpLnNob3coKVxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtLW9wZW4nKVxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5odG1sKCfQodC60YDRi9GC0YwnKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB2YXIgZWxlbXMgPSAkKCcuYmxvY2stdHdfX2Jsb2NrX19jb250ZW50X19saXN0IHVsJylcclxuICAgICAgICB2YXIgbWF4RUxlbUhlaWdodCA9IDBcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZWxlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoJChlbGVtc1tpXSkuaW5uZXJIZWlnaHQoKSA+IG1heEVMZW1IZWlnaHQgKSBtYXhFTGVtSGVpZ2h0ID0gJChlbGVtc1tpXSkuaW5uZXJIZWlnaHQoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCgnLmJsb2NrLXR3X19ibG9ja19fY29udGVudF9fbGlzdCB1bCcpLmNzcyh7XHJcbiAgICAgICAgICAgIG1pbkhlaWdodDogbWF4RUxlbUhlaWdodFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIG1heEVMZW1IZWlnaHQgPSAwXHJcbiAgICAgICAgICAgICQoJy5ibG9jay10d19fYmxvY2tfX2NvbnRlbnRfX2xpc3QgdWwnKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgbWluSGVpZ2h0OiAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBlbGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYoJChlbGVtc1tpXSkuaW5uZXJIZWlnaHQoKSA+IG1heEVMZW1IZWlnaHQgKSBtYXhFTGVtSGVpZ2h0ID0gJChlbGVtc1tpXSkuaW5uZXJIZWlnaHQoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgJCgnLmJsb2NrLXR3X19ibG9ja19fY29udGVudF9fbGlzdCB1bCcpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBtaW5IZWlnaHQ6IG1heEVMZW1IZWlnaHRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG5cclxuICAgIH0pXHJcbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIHNldFBhZGRpbmdzKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGNsYXNzZXMgPSB7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nTGVmdDogJy5pcy0tYy1wbCcsXHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6ICcuaXMtLWMtcHInLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0MTAwUGVyOiAnLmlzLS1oMTAwJ1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgcGFkZGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ25hdmJhcl9faW5uZXInKVswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxyXG4gICAgICAgICAgICB2YXIgaGVpZ2h0ID0gJCgnLm5hdmJhcicpLmlubmVySGVpZ2h0KCkgKyAkKCcuZm9vdGVyJykuaW5uZXJIZWlnaHQoKVxyXG5cclxuICAgICAgICAgICAgJChjbGFzc2VzLnBhZGRpbmdMZWZ0KS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZ0xlZnQ6IHBhZGRpbmcubGVmdCArIDMwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICQoY2xhc3Nlcy5wYWRkaW5nUmlnaHQpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IHBhZGRpbmcubGVmdCArIDMwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICQoY2xhc3Nlcy5oZWlnaHQxMDBQZXIpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBtaW5IZWlnaHQ6ICdjYWxjKDEwMHZoIC0gJyArIGhlaWdodCArICdweCknXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICQoJ21haW4nKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgbWluSGVpZ2h0OiAnY2FsYygxMDB2aCAtICcgKyBoZWlnaHQgKyAncHgpJ1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFBhZGRpbmdzKClcclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2V0UGFkZGluZ3MoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJy5hbmNob3InKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gJCh0aGlzKVxyXG4gICAgICAgICAgICB2YXIgYWlkID0gX3RoaXMuYXR0cihcImhyZWZcIik7XHJcbiAgICAgICAgICAgIGlmKCFhaWQpIHtcclxuICAgICAgICAgICAgICAgIGFpZCA9IF90aGlzLmRhdGEoJ3RhcmdldCcpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJCgnaHRtbCxib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAkKGFpZCkub2Zmc2V0KCkudG9wIC0gJCgnLm5hdmJhcicpLmlubmVySGVpZ2h0KCl9LCdzbG93Jyk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCgnLnNyZXZpZXdzX19saXN0X19pbm5lcicpLnNsaWNrKHtcclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxyXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMyxcclxuICAgICAgICAgICAgcHJldkFycm93OiAnJyxcclxuICAgICAgICAgICAgbmV4dEFycm93OiAnJyxcclxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEyMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OCxcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJ2Zvcm0nKS5wYXJzbGV5KClcclxuXHJcbiAgICAgICAgdmFyIHBob25lSW5wdXRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luLXBob25lJyk7XHJcblxyXG4gICAgICAgIG5ldyBJTWFzayhcclxuICAgICAgICAgICAgcGhvbmVJbnB1dHMsIHtcclxuICAgICAgICAgICAgbWFzazogJyt7N30oOTAwKTAwMC0wMC0wMCdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnLmFuY2hvcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSAkKHRoaXMpXHJcbiAgICAgICAgICAgIHZhciBhaWQgPSBfdGhpcy5hdHRyKFwiaHJlZlwiKTtcclxuICAgICAgICAgICAgaWYoIWFpZCkge1xyXG4gICAgICAgICAgICAgICAgYWlkID0gX3RoaXMuZGF0YSgndGFyZ2V0JylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKCdodG1sLGJvZHknKS5hbmltYXRlKHtzY3JvbGxUb3A6ICQoYWlkKS5vZmZzZXQoKS50b3AgLSAkKCcubmF2YmFyJykuaW5uZXJIZWlnaHQoKX0sJ3Nsb3cnKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIFxyXG4gICAgfSlcclxufSkoalF1ZXJ5KTsiLCJ5bWFwcy5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgbXlNYXAgPSBuZXcgeW1hcHMuTWFwKCdtYXAnLCB7XHJcbiAgICAgICAgICAgIGNlbnRlcjogWzUxLjY2OTAzMiwgMzkuMTg3MDkxXSxcclxuICAgICAgICAgICAgem9vbTogMTYsXHJcbiAgICAgICAgICAgIGNvbnRyb2xzOiBbXVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgc2VhcmNoQ29udHJvbFByb3ZpZGVyOiAneWFuZGV4I3NlYXJjaCdcclxuICAgICAgICB9KVxyXG59KTsiLCIoZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCJcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICQoJy5ibG9jay1mdl9fY2Fyb3VzZWxfX2l0ZW1zJykuc2xpY2soe1xyXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICcuYmxvY2stZnZfX2Nhcm91c2VsX19jb250cm9scyBidXR0b24uaXMtLXByZXYnLFxyXG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcuYmxvY2stZnZfX2Nhcm91c2VsX19jb250cm9scyBidXR0b24uaXMtLW5leHQnLFxyXG4gICAgICAgICAgICBkb3RzOiB0cnVlXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdmFyIHRpbWUgPSA0O1xyXG4gICAgICAgIHZhciAkYmFyLFxyXG4gICAgICAgICAgICAkc2xpY2ssXHJcbiAgICAgICAgICAgIGlzUGF1c2UsXHJcbiAgICAgICAgICAgIHRpY2ssXHJcbiAgICAgICAgICAgIHBlcmNlbnRUaW1lO1xyXG5cclxuICAgICAgICAkc2xpY2sgPSAkKCcuYmxvY2stb25fX3JpZ2h0X19pdGVtcycpLnNsaWNrKHtcclxuICAgICAgICAgICAgcHJldkFycm93OiAnLmJsb2NrLW9uX19yaWdodF9fY29udHJvbHNfX2J0bnMgYnV0dG9uLmlzLS1wcmV2JyxcclxuICAgICAgICAgICAgbmV4dEFycm93OiAnLmJsb2NrLW9uX19yaWdodF9fY29udHJvbHNfX2J0bnMgYnV0dG9uLmlzLS1uZXh0JyxcclxuICAgICAgICAgICAgZHJhZ2dhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgbW9iaWxlRmlyc3Q6IHRydWVcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkYmFyID0gJCgnLmJsb2NrLW9uX19yaWdodF9fY29udHJvbHNfX2JhciBzcGFuJyk7XHJcblxyXG4gICAgICAgICQoJy5ibG9jay1vbl9fcmlnaHQnKS5vbih7XHJcbiAgICAgICAgICAgIG1vdXNlZW50ZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaXNQYXVzZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG1vdXNlbGVhdmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaXNQYXVzZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc3RhcnRQcm9ncmVzc2JhcigpIHtcclxuICAgICAgICAgICAgcmVzZXRQcm9ncmVzc2JhcigpO1xyXG4gICAgICAgICAgICBwZXJjZW50VGltZSA9IDA7XHJcbiAgICAgICAgICAgIGlzUGF1c2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGljayA9IHNldEludGVydmFsKGludGVydmFsLCAxMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBpbnRlcnZhbCgpIHtcclxuICAgICAgICAgICAgaWYoaXNQYXVzZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHBlcmNlbnRUaW1lICs9IDEgLyAodGltZSswLjEpO1xyXG4gICAgICAgICAgICAgICAgJGJhci5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBwZXJjZW50VGltZStcIiVcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZihwZXJjZW50VGltZSA+PSAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2xpY2suc2xpY2soJ3NsaWNrTmV4dCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0UHJvZ3Jlc3NiYXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVzZXRQcm9ncmVzc2JhcigpIHtcclxuICAgICAgICAgICAgJGJhci5jc3Moe1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDArJyUnIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpY2spO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhcnRQcm9ncmVzc2JhcigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICQoJy5ibG9jay1vbl9fcmlnaHRfX2l0ZW1zJykub24oJ2JlZm9yZUNoYW5nZScsIGZ1bmN0aW9uKGV2ZW50LCBzbGljaywgY3VycmVudFNsaWRlLCBuZXh0U2xpZGUpIHtcclxuICAgICAgICAgICAgJCgnLmJsb2NrLW9uX19yaWdodF9fY29udHJvbHNfX251bXMnKS5odG1sKCc8c3Bhbj4wJyArIChuZXh0U2xpZGUgKyAxKSArICc8L3NwYW4+IC8gMCcgKyBzbGljay5zbGlkZUNvdW50ICkgXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCgnLmJsb2NrLW9uX19yaWdodF9faXRlbXMnKS5zbGljaygnc2xpY2tHb1RvJywgMCk7XHJcblxyXG4gICAgICAgICQoJy5ibG9jay1zdl9fYmxvY2tfX3RpdGxlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBfYyA9ICQodGhpcykuc2libGluZ3MoJy5ibG9jay1zdl9fYmxvY2tfX3RleHQnKVxyXG4gICAgICAgICAgICAkKCcuYmxvY2stc3ZfX2Jsb2NrX190aXRsZScpLm5vdCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtLW9wZW4nKVxyXG4gICAgICAgICAgICAkKCcuYmxvY2stc3ZfX2Jsb2NrX190ZXh0Jykubm90KF9jKS5zbGlkZVVwKClcclxuICAgICAgICAgICAgdmFyIF9jID0gJChfYykuc2xpZGVUb2dnbGUoKVxyXG4gICAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdpcy0tb3BlbicpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyJdfQ==
