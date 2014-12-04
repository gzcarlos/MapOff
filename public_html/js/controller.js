// testing  coordinades for distance calculation
//18.5032637,-69.8489928 18.5032573,-69.848409

//globals
var startPoint = new google.maps.LatLng(14.993077, -75.278870);// B = Longitude, k = latitude
var map;
var interval;
var plane;
var aPorts = [];
var airports = [
    ['La Chinita', 10.554462, -71.724090], // venezuela
    ['Santo Domingo', 18.430113, -69.676491], // rep. dominicana
    ['MNFC', 12.352439, -86.182805] // nicaragua
];
var airports2 = [
    ['La Chinita', 16.455423, -79.834783], // venezuela
    ['Santo Domingo', 13.505396, -82.097966], // rep. dominicana
    ['MNFC', 15.293037, -73.067205] // nicaragua
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
    },
    {
        url: 'img/airport2.png',
        size: new google.maps.Size(30, 30),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 32)
    }
];
var typesAirplane = [
    'Airbus 310', //MX = 905,MA = 41000 FT
    'Boeing 737-800',// MX = 876, MA = 41000 FT
    'DC-9-21' // MX = 915,MA = 25000 FT
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
    map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);

    // markers
//    var airplane1 = new google.maps.LatLng( airports[0][1], airports[0][2]);
//    var image = 'img/plane.png';
//    plane = new google.maps.Marker({
//        position: airplane1,
//        title: "Hello World!",
//        icon: image//,
////        zIndex: 1
//    });
//    console.log(plane.getTitle());
//    plane.setMap(map);
//    console.log(marker.getPosition());
//    console.log(marker.getPosition().B);

    setAirports(map, airports);
    startInterval();

//    setAirplanes(map, airports2, typesAirplane);
//    interval = setInterval(ticker, 1000);
}

function setAirports(m, as) { // MODIFY: load each airport in individual variables 
    // m = map
    // as = airports
    // put airports in map
//    console.log(as);
    for (var i = 0; i < as.length; ++i) {
        var airportPos = new google.maps.LatLng(as[i][1], as[i][2]);
        var marker = new google.maps.Marker({
            position: airportPos,
            map: m,
            icon: images[2],
            title: as[i][0],
            airportIndex: i
        });
        // add its own event listener
        addAirportEListener(marker); // ADVICE: always use a function to set the Listener of each marker
        aPorts.push(marker);
    }
}
function setAirplanes(m, as, ap) { // useless

    for (var i = 0; i < ap.length; ++i) {
//        setTimeout(function() {
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

//        console.log(plane.getTitle());
        airplanes.push(plane);
//        }, 50); // end of setTimout
    }
//    setTimeout(function() {
//    console.log(airplanes);
//    }, 175); // end of time out
}
function setAirplaneDirection(airplane) {
    if (airplane.from[0] > airplane.to[0]) { // latitude greater
        airplane.LatVel = -airplane.LatVel; // invert speed direction;
    }

    if (airplane.from[1] > airplane.to[1]) { // longitude greater
        airplane.LonVel = -airplane.LonVel; //  invert speed direction;
    }
    
    return airplane;
}
function addAirportEListener(marker){
    google.maps.event.addListener(marker, 'click', function() { // never add it through an array
            createAnAirplane(marker.get('map'), airports, marker.getTitle());
            console.log("title: " + marker.getTitle());
//            console.log("Clicked airport index: " + marker.airportIndex);
        });
}
function startInterval() {
    interval = setInterval(ticker, 1000);
}
function ticker() {
    if (airplanes.length > 0) {
        for (var i = 0; i < airplanes.length; ++i) {

        }
    } else {
        console.log('No Airplanes flying');
    }
}
function createAnAirplane(m, as, title) {
    // about airport
    var aport = as.slice(0);
    var fromo;
    var APortTo; // random airport of destination
    var too;
    
    //remove the from airPlane with title
    for (var i = 0; i < as.length; ++i) {
        if (as[i][0] === title) {
            fromo = as[i];
           aport.splice(i, 1); // remove the FROM airport
        }
    }
//    console.log('as: ' + as);
    APortTo = Math.floor(Math.random() * aport.length); // random airport of destination
    too = aport[APortTo];
//    console.log('from: ' + fromo[0] + ' to: ' + too[0]);

    //about airplane - settup
    var airplanePos = new google.maps.LatLng(fromo[1], fromo[2]); // starting position of the airplane
    var rndType = Math.floor(Math.random() * typesAirplane.length); // the random type of airpplane

    // marker for the plane
//            console.log(images[1]);
    var plane = new google.maps.Marker({
        position: airplanePos,
        map: m,
        icon: images[1],
        title: '[' + typesAirplane[rndType] + ']\n'//,
//                zIndex: 0 - i
    });
    console.log(plane);
    plane.from = fromo;
    plane.to = too;

//    console.log(plane.getTitle());
//    console.log(plane);
    airplanes.push(plane);
}


//event listeners
//google.maps.event.addListener(aPorts[0], 'click', function() { // never add it through an array
////            createAnAirplane(map, airports, marker.getTitle());
//    console.log('clicked1');
//});
//google.maps.event.addListener(marker, 'click', function() { // never add it through an array
////            createAnAirplane(map, airports, marker.getTitle());
//    console.log('clicked2');
//});
//google.maps.event.addListener(marker, 'click', function() { // never add it through an array
////            createAnAirplane(map, airports, marker.getTitle());
//    console.log('clicked3');
//});


// init
google.maps.event.addDomListener(window, 'load', initialize);





