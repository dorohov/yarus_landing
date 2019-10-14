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