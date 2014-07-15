//globals
var startPoint = new google.maps.LatLng(14.993077, -75.278870);//new google.maps.LatLng(18.504196, -69.848010); // B = Longitude, k = latitude
var map;
var interval;
var plane;
var airports = [
    ['La Chinita', 10.554462, -71.724090], // venezuela
    ['Santo Domingo', 18.430113, -69.676491], // rep. dominicana
    ['MNFC', 12.352439, -86.182805] // nicaragua
];
var images = [
    {
        url: 'img/airport.png',
        size: new google.maps.Size(30, 32),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 32)
    },
    {
        url: 'img/plane.png',
        size: new google.maps.Size(27, 27),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 32)
    }
];
var typesAirplane = [
    'Airbus 310',
    'Boeing 737-800',
    'DC-9-21'
];
var airplanes = [];
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
    var airplane1 = new google.maps.LatLng( airports[0][1], airports[0][2]);
    var image = 'img/plane.png';
    plane = new google.maps.Marker({
        position: airplane1,
        title: "Hello World!",
        icon: image//,
//        zIndex: 1
    });
    console.log(plane.getTitle());
//    plane.setMap(map);
//    console.log(marker.getPosition());
//    console.log(marker.getPosition().B);

    setAirports(map, airports);
    
//    setAirplanes(map, airports, typesAirplane);
    interval = setInterval(ticker, 1000);
}

function setAirports(m, as) {
    // put airports in map
    for (var i = 0; i < as.length; ++i) {
        var airportPos = new google.maps.LatLng(as[i][1], as[i][2]);
        var marker = new google.maps.Marker({
            position: airportPos,
            map: m,
            icon: images[0],
            title: as[i][0]
        });
    }
}

function setAirplanes(m, as, ap) {

    for (var i = 0; i < ap.length; ++i) {
        setTimeout(function() {
            // about airport
            var aport = as;
            var APortFrom = Math.floor(Math.random() * aport.length); // random airport of origin
            var fromo = aport[APortFrom];
            aport.pop(APortFrom); // remove the already selected for origin
            var APortTo = Math.floor(Math.random() * aport.length); // random airport of destination
            var too = aport[APortTo];

            //about airplane
            var airplanePos = new google.maps.LatLng(fromo[1] + 0.001, fromo[2]); // starting position of the airplane
            var rndType = Math.floor(Math.random() * ap.length); // the random type of airpplane

            // marker
//            console.log(images[1]);
            var plane = new google.maps.Marker({
                position: airplanePos,
                map: m,
                icon: images[1],
                title: typesAirplane[rndType]//,
//                zIndex: 0 - i
            });
            
            console.log(plane.getTitle());
            airplanes.push(plane);
        }, 50);
    }
    setTimeout(function() {
        console.log(airplanes);
    }, 175);
}

function ticker(){
    var pos = plane.getPosition();
    pos.k += 0.1;
    pos.B += 0.1;
   
    plane.setPosition(pos);
    console.log(plane.getPosition());
}

// init
google.maps.event.addDomListener(window, 'load', initialize);





