(function($) {
    "use strict"
    $(function() {

        $( "#calc3" ).slider({
            range: true,
            min: 0,
            max: 200,
            values: [ 0, 200 ],
            slide: function( event, ui ) {
              $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
            }
          });

    })
})(jQuery);