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

        $('form').parsley()

        var phoneInputs = document.getElementsByClassName('input-phone');

        if(phoneInputs.length) {
            for(var i = 0; i < phoneInputs.length; i++) {
                new IMask(
                    phoneInputs[i], {
                    mask: '+{7}(900)000-00-00'
                });
            }
        }

        $('.anchor').on('click', function(e) {
            e.preventDefault();
            var _this = $(this)
            var aid = _this.attr("href");
            if(!aid) {
                aid = _this.data('target')
            }
            $('html,body').animate({scrollTop: $(aid).offset().top},'slow');
        })

        
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
function openModal(modalID) {
    $(modalID).modal({
        fadeDuration: 100,
        showClose: false,
    })
}

(function($) {
    "use strict"
    $(function() {

        $.modal.fadeDuration = 100
        $.modal.showClose = false

        $('a.modal-open').on('click', function(e) {
            e.preventDefault()
            var thisModalId = $(this).attr('href')
            openModal(thisModalId)
            return false;
        })

        // openModal('#modal_form')
        // openModal('#modal_success')

    })
})(jQuery);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbGMuanMiLCJjYXJkcy5qcyIsIm1haW4uanMiLCJtYXAuanMiLCJtb2RhbC5qcyIsInJldmlld3MuanMiLCJzaXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgIHZhciBvcHRpb25zID0ge1xyXG4gICAgICAgIGYxOiBudWxsLFxyXG4gICAgICAgIGYyOiBudWxsLFxyXG4gICAgICAgIGYzOiBudWxsXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZ1bmN0aW9uIHNldFByaWNlKCkge1xyXG5cclxuICAgICAgICBpZihvcHRpb25zLmYxICYmIG9wdGlvbnMuZjIgJiYgb3B0aW9ucy5mMykge1xyXG4gICAgICAgICAgdmFyIHByaWNlID0gb3B0aW9ucy5mMSAqIG9wdGlvbnMuZjIgICogb3B0aW9ucy5mM1xyXG4gICAgICAgICAgJCgnLmNhbGNfX3ByaWNlX19ibG9ja19faW5uZXIgc3BhbicpLmh0bWwocHJpY2UpXHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgYWxlcnQoJ9Cf0L7QttCw0LvRg9C50YHRgtCwINC30LDQv9C+0LvQvdC40YLQtSDQstGB0LUg0L/QvtC70Y8hJylcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICAkKCBcIiNjYWxjM1wiICkuc2xpZGVyKHtcclxuICAgICAgICBtaW46IDAsXHJcbiAgICAgICAgbWF4OiAyMDAsXHJcbiAgICAgICAgc2xpZGU6IGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XHJcbiAgICAgICAgICAkKCcuY2FsY19fd3JhcF9fcmlnaHRfX2Jsb2NrX19mb290ZXIgc3Bhbi5pcy0tbWluJykuaHRtbCh1aS52YWx1ZSlcclxuICAgICAgICAgIG9wdGlvbnMuZjMgPSB1aS52YWx1ZVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICAkKCdpbnB1dFtuYW1lPVwiY2FsY19mb3JtMVwiXScpLmNoYW5nZShmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgb3B0aW9ucy5mMSA9IDFcclxuICAgICAgfSlcclxuXHJcbiAgICAgICQoJy5jYWxjX193cmFwX19yaWdodCBzZWxlY3QnKS5jaGFuZ2UoZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmKGUudGFyZ2V0LnZhbHVlID4gMCkge1xyXG4gICAgICAgICAgaWYoZS50YXJnZXQudmFsdWUgPT0gMSkgb3B0aW9ucy5mMiA9IDc1MDBcclxuICAgICAgICAgIGVsc2UgaWYoZS50YXJnZXQudmFsdWUgPT0gMikgb3B0aW9ucy5mMiA9IDEyNTAwXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgJCgnLmNhbGNfX2J0biBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgIHNldFByaWNlKClcclxuICAgICAgfSlcclxuXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgJCgnLmJsb2NrLXR3X19ibG9ja19fY29udGVudF9fbGlzdF9fc20gYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcblxyXG4gICAgICAgICAgICBpZigkKHRoaXMpLmhhc0NsYXNzKCdpcy0tb3BlbicpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5zaWJsaW5ncygndWwnKS5jaGlsZHJlbignbGknKS5oaWRlKClcclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLS1vcGVuJylcclxuICAgICAgICAgICAgICAgICQodGhpcykuaHRtbCgn0J/QvtC60LDQt9Cw0YLRjCDQtdGJ0LUnKVxyXG5cclxuICAgICAgICAgICAgfWVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuc2libGluZ3MoJ3VsJykuY2hpbGRyZW4oJ2xpJykuc2hvdygpXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy0tb3BlbicpXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmh0bWwoJ9Ch0LrRgNGL0YLRjCcpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHZhciBlbGVtcyA9ICQoJy5ibG9jay10d19fYmxvY2tfX2NvbnRlbnRfX2xpc3QgdWwnKVxyXG4gICAgICAgIHZhciBtYXhFTGVtSGVpZ2h0ID0gMFxyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBlbGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZigkKGVsZW1zW2ldKS5pbm5lckhlaWdodCgpID4gbWF4RUxlbUhlaWdodCApIG1heEVMZW1IZWlnaHQgPSAkKGVsZW1zW2ldKS5pbm5lckhlaWdodCgpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKCcuYmxvY2stdHdfX2Jsb2NrX19jb250ZW50X19saXN0IHVsJykuY3NzKHtcclxuICAgICAgICAgICAgbWluSGVpZ2h0OiBtYXhFTGVtSGVpZ2h0XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbWF4RUxlbUhlaWdodCA9IDBcclxuICAgICAgICAgICAgJCgnLmJsb2NrLXR3X19ibG9ja19fY29udGVudF9fbGlzdCB1bCcpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBtaW5IZWlnaHQ6IDBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGVsZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZigkKGVsZW1zW2ldKS5pbm5lckhlaWdodCgpID4gbWF4RUxlbUhlaWdodCApIG1heEVMZW1IZWlnaHQgPSAkKGVsZW1zW2ldKS5pbm5lckhlaWdodCgpXHJcbiAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAkKCcuYmxvY2stdHdfX2Jsb2NrX19jb250ZW50X19saXN0IHVsJykuY3NzKHtcclxuICAgICAgICAgICAgICAgIG1pbkhlaWdodDogbWF4RUxlbUhlaWdodFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSlcclxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCJcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICQoJ2Zvcm0nKS5wYXJzbGV5KClcclxuXHJcbiAgICAgICAgdmFyIHBob25lSW5wdXRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW5wdXQtcGhvbmUnKTtcclxuXHJcbiAgICAgICAgaWYocGhvbmVJbnB1dHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBwaG9uZUlucHV0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbmV3IElNYXNrKFxyXG4gICAgICAgICAgICAgICAgICAgIHBob25lSW5wdXRzW2ldLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJyt7N30oOTAwKTAwMC0wMC0wMCdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKCcuYW5jaG9yJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9ICQodGhpcylcclxuICAgICAgICAgICAgdmFyIGFpZCA9IF90aGlzLmF0dHIoXCJocmVmXCIpO1xyXG4gICAgICAgICAgICBpZighYWlkKSB7XHJcbiAgICAgICAgICAgICAgICBhaWQgPSBfdGhpcy5kYXRhKCd0YXJnZXQnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQoJ2h0bWwsYm9keScpLmFuaW1hdGUoe3Njcm9sbFRvcDogJChhaWQpLm9mZnNldCgpLnRvcH0sJ3Nsb3cnKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBzZXRQYWRkaW5ncygpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBjbGFzc2VzID0ge1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZ0xlZnQ6ICcuaXMtLWMtcGwnLFxyXG4gICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiAnLmlzLS1jLXByJyxcclxuICAgICAgICAgICAgICAgIGhlaWdodDEwMFBlcjogJy5pcy0taDEwMCdcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHBhZGRpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCduYXZiYXJfX2lubmVyJylbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcclxuICAgICAgICAgICAgdmFyIGhlaWdodCA9ICQoJy5uYXZiYXInKS5pbm5lckhlaWdodCgpICsgJCgnLmZvb3RlcicpLmlubmVySGVpZ2h0KClcclxuXHJcbiAgICAgICAgICAgICQoY2xhc3Nlcy5wYWRkaW5nTGVmdCkuY3NzKHtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiBwYWRkaW5nLmxlZnQgKyAzMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAkKGNsYXNzZXMucGFkZGluZ1JpZ2h0KS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiBwYWRkaW5nLmxlZnQgKyAzMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAkKGNsYXNzZXMuaGVpZ2h0MTAwUGVyKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgbWluSGVpZ2h0OiAnY2FsYygxMDB2aCAtICcgKyBoZWlnaHQgKyAncHgpJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAkKCdtYWluJykuY3NzKHtcclxuICAgICAgICAgICAgICAgIG1pbkhlaWdodDogJ2NhbGMoMTAwdmggLSAnICsgaGVpZ2h0ICsgJ3B4KSdcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRQYWRkaW5ncygpXHJcblxyXG4gICAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldFBhZGRpbmdzKClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKCcuc3Jldmlld3NfX2xpc3RfX2lubmVyJykuc2xpY2soe1xyXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAzLFxyXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICcnLFxyXG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcnLFxyXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTIwMCxcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY4LFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsInltYXBzLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBteU1hcCA9IG5ldyB5bWFwcy5NYXAoJ21hcCcsIHtcclxuICAgICAgICAgICAgY2VudGVyOiBbNTEuNjY5MDMyLCAzOS4xODcwOTFdLFxyXG4gICAgICAgICAgICB6b29tOiAxNixcclxuICAgICAgICAgICAgY29udHJvbHM6IFtdXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzZWFyY2hDb250cm9sUHJvdmlkZXI6ICd5YW5kZXgjc2VhcmNoJ1xyXG4gICAgICAgIH0pXHJcbn0pOyIsImZ1bmN0aW9uIG9wZW5Nb2RhbChtb2RhbElEKSB7XHJcbiAgICAkKG1vZGFsSUQpLm1vZGFsKHtcclxuICAgICAgICBmYWRlRHVyYXRpb246IDEwMCxcclxuICAgICAgICBzaG93Q2xvc2U6IGZhbHNlLFxyXG4gICAgfSlcclxufVxyXG5cclxuKGZ1bmN0aW9uKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAkLm1vZGFsLmZhZGVEdXJhdGlvbiA9IDEwMFxyXG4gICAgICAgICQubW9kYWwuc2hvd0Nsb3NlID0gZmFsc2VcclxuXHJcbiAgICAgICAgJCgnYS5tb2RhbC1vcGVuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgdmFyIHRoaXNNb2RhbElkID0gJCh0aGlzKS5hdHRyKCdocmVmJylcclxuICAgICAgICAgICAgb3Blbk1vZGFsKHRoaXNNb2RhbElkKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8gb3Blbk1vZGFsKCcjbW9kYWxfZm9ybScpXHJcbiAgICAgICAgLy8gb3Blbk1vZGFsKCcjbW9kYWxfc3VjY2VzcycpXHJcblxyXG4gICAgfSlcclxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCJcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICQoJy5ibG9jay1mdl9fY2Fyb3VzZWxfX2l0ZW1zJykuc2xpY2soe1xyXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICcuYmxvY2stZnZfX2Nhcm91c2VsX19jb250cm9scyBidXR0b24uaXMtLXByZXYnLFxyXG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcuYmxvY2stZnZfX2Nhcm91c2VsX19jb250cm9scyBidXR0b24uaXMtLW5leHQnLFxyXG4gICAgICAgICAgICBkb3RzOiB0cnVlXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdmFyIHRpbWUgPSA0O1xyXG4gICAgICAgIHZhciAkYmFyLFxyXG4gICAgICAgICAgICAkc2xpY2ssXHJcbiAgICAgICAgICAgIGlzUGF1c2UsXHJcbiAgICAgICAgICAgIHRpY2ssXHJcbiAgICAgICAgICAgIHBlcmNlbnRUaW1lO1xyXG5cclxuICAgICAgICAkc2xpY2sgPSAkKCcuYmxvY2stb25fX3JpZ2h0X19pdGVtcycpLnNsaWNrKHtcclxuICAgICAgICAgICAgcHJldkFycm93OiAnLmJsb2NrLW9uX19yaWdodF9fY29udHJvbHNfX2J0bnMgYnV0dG9uLmlzLS1wcmV2JyxcclxuICAgICAgICAgICAgbmV4dEFycm93OiAnLmJsb2NrLW9uX19yaWdodF9fY29udHJvbHNfX2J0bnMgYnV0dG9uLmlzLS1uZXh0JyxcclxuICAgICAgICAgICAgZHJhZ2dhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgbW9iaWxlRmlyc3Q6IHRydWVcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkYmFyID0gJCgnLmJsb2NrLW9uX19yaWdodF9fY29udHJvbHNfX2JhciBzcGFuJyk7XHJcblxyXG4gICAgICAgICQoJy5ibG9jay1vbl9fcmlnaHQnKS5vbih7XHJcbiAgICAgICAgICAgIG1vdXNlZW50ZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaXNQYXVzZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG1vdXNlbGVhdmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaXNQYXVzZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc3RhcnRQcm9ncmVzc2JhcigpIHtcclxuICAgICAgICAgICAgcmVzZXRQcm9ncmVzc2JhcigpO1xyXG4gICAgICAgICAgICBwZXJjZW50VGltZSA9IDA7XHJcbiAgICAgICAgICAgIGlzUGF1c2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGljayA9IHNldEludGVydmFsKGludGVydmFsLCAxMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBpbnRlcnZhbCgpIHtcclxuICAgICAgICAgICAgaWYoaXNQYXVzZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHBlcmNlbnRUaW1lICs9IDEgLyAodGltZSswLjEpO1xyXG4gICAgICAgICAgICAgICAgJGJhci5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBwZXJjZW50VGltZStcIiVcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZihwZXJjZW50VGltZSA+PSAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2xpY2suc2xpY2soJ3NsaWNrTmV4dCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0UHJvZ3Jlc3NiYXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVzZXRQcm9ncmVzc2JhcigpIHtcclxuICAgICAgICAgICAgJGJhci5jc3Moe1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDArJyUnIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpY2spO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhcnRQcm9ncmVzc2JhcigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICQoJy5ibG9jay1vbl9fcmlnaHRfX2l0ZW1zJykub24oJ2JlZm9yZUNoYW5nZScsIGZ1bmN0aW9uKGV2ZW50LCBzbGljaywgY3VycmVudFNsaWRlLCBuZXh0U2xpZGUpIHtcclxuICAgICAgICAgICAgJCgnLmJsb2NrLW9uX19yaWdodF9fY29udHJvbHNfX251bXMnKS5odG1sKCc8c3Bhbj4wJyArIChuZXh0U2xpZGUgKyAxKSArICc8L3NwYW4+IC8gMCcgKyBzbGljay5zbGlkZUNvdW50ICkgXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCgnLmJsb2NrLW9uX19yaWdodF9faXRlbXMnKS5zbGljaygnc2xpY2tHb1RvJywgMCk7XHJcblxyXG4gICAgICAgICQoJy5ibG9jay1zdl9fYmxvY2tfX3RpdGxlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBfYyA9ICQodGhpcykuc2libGluZ3MoJy5ibG9jay1zdl9fYmxvY2tfX3RleHQnKVxyXG4gICAgICAgICAgICAkKCcuYmxvY2stc3ZfX2Jsb2NrX190aXRsZScpLm5vdCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtLW9wZW4nKVxyXG4gICAgICAgICAgICAkKCcuYmxvY2stc3ZfX2Jsb2NrX190ZXh0Jykubm90KF9jKS5zbGlkZVVwKClcclxuICAgICAgICAgICAgdmFyIF9jID0gJChfYykuc2xpZGVUb2dnbGUoKVxyXG4gICAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdpcy0tb3BlbicpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyJdfQ==
