//globals
var startPoint = new google.maps.LatLng(14.993077, -75.278870);//new google.maps.LatLng(18.504196, -69.848010); // B = Longitude, k = latitude
var map;
var airports = [
    ['La Chinita', 10.554462, -71.724090], // venezuela
    ['Santo Domingo', 18.430113, -69.676491], // rep. dominicana
    ['MNFC', 12.352439, -86.182805] // nicaragua
];
var images = [
    {
        url: 'img/airport.png',
        size: new google.maps.Size(30,32),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0,32)
    },
    {
        url: 'img/plane.png',
        size: new google.maps.Size(30,32),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0,32)
    }
]
var typesAirplane = [
    
]
// structures


//functions 
function initialize() {
    var mapOptions = {
        center: startPoint,
        zoom: 6, // starting zoom
        draggable: false, // map can be moved by the mouse
        scrollwheel: false // disable zoom
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);

    // markers
    //var airplane1 = new Marker( 18.504196, -69.848010, 'First Airplane');
//    var image = 'img/plane.png';
//    var marker = new google.maps.Marker({
//        position: startPoint,
//        title: "Hello World!",
//        icon: image
//    });
//    marker.setMap(map);
//    console.log(marker.getPosition());
//    console.log(marker.getPosition().B);
    
    setAirports(map, airports);
}

function setAirports(m, as){
    for(var i = 0; i < as.length; ++i){
        var airportPos = new google.maps.LatLng(as[i][1], as[i][2]);
        var marker = new google.maps.Marker({
            position: airportPos,
            map: m, 
            icon: images[0],
            title: as[i][0]
        });
    }
}

// init
google.maps.event.addDomListener(window, 'load', initialize);





