ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [51.669032, 39.187091],
            zoom: 16,
            controls: []
        }, {
            searchControlProvider: 'yandex#search'
        })
});