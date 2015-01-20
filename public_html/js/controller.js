// testing  coordinades for distance calculation
//18.5032637,-69.8489928 18.5032573,-69.848409

//globals
var startPoint = new google.maps.LatLng(14.993077, -75.278870);// D = Longitude, k = latitude
var map; // global for the GMap object
var interval; // interval for over time action-making
var zOrderCounter = 1;
var movementSpeed = 1; // secs
var flightNumber = 1;
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
    },
    {
        url: 'img/plane-collision.png',
        size: new google.maps.Size(30, 30),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 32)
    }
];
var typesAirplane = [
    {
        name: 'Airbus A310',
        maxSpeed: 905,
        maxAltitude: 41000,
        fuelCapacity: 14600,
        fuelConsumption: 20.7
    }, //MX = 905,MA = 41000 FT, MaxFuel = 14600 gal, consumption = 20.7 p/km//
    {
        name: 'Boeing 737-800',
        maxSpeed: 876,
        maxAltitude: 41000,
        fuelCapacity: 6875,
        fuelConsumption: 4.88
    },// MX = 876, MA = 41000 FT, MaxFuel = 6875 gal, consumption = 4.88 g/h 792
    {
        name: 'DC-9-30',
        maxSpeed: 505,
        maxAltitude: 25000,
        fuelCapacity: 4239,
        fuelConsumption: 1.43
    } // MX = 505,MA = 25000 FT, MaxFuel = 4239 gal, consumption 1.43
];
var airplanes = [];
var landedPlanes = 0, accidentedPlanes = 0;

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
    
//    testingPlanes(map);

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
            airportIndex: i,
            zIndex: zOrderCounter
        });
        // add its own event listener
        addAirportEListener(marker); // ADVICE: always use a function to set the Listener of each marker
        aPorts.push(marker);
        zOrderCounter++;
    }
}
function addAirportEListener(marker){
    google.maps.event.addListener(marker, 'click', function() { // never add it through an array
//            if(airplanes.length === 0){
                createAnAirplane(marker.get('map'), airports, marker.getTitle());
                console.log("title: " + marker.getTitle());
//            console.log("Clicked airport index: " + marker.airportIndex);
//            }
        });
}
function changeIcon(marker, img){
    marker.setIcon(img);
}
function startInterval() {
    interval = setInterval(ticker, 1000 * movementSpeed);
}
function ticker() {
    if (airplanes.length > 0) {
        for (var i = 0; i < airplanes.length; ++i) {
            if(!airplanes[i].properties.landed){ // if landed
                var collisions = detectPosibleCollision(airplanes, i);
//                console.log("collisions: " + collisions);
                moveAirplane(airplanes[i]);//, 0.090000);
                if( collisions.length > 0){ // got possible collisions
                    changeIcon(airplanes[i],images[3].url); // possible collision
                    preventCollision(airplanes[i], collisions, aPorts);
                }else{
                changeIcon(airplanes[i], images[1].url); // normal plane
                }
            }
        }

    // testing lines
    
    } else {
        console.log('No Airplanes flying');
    }
}
function createAnAirplane(m, as, title) {
    // about airport
    var aport = as.slice(0);
    var fromo;
    var APortTo; // random airport for destination
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

    //about airplane - settup
    var airplanePos = new google.maps.LatLng(fromo[1], fromo[2]); // starting position of the airplane
    var rndType = Math.floor(Math.random() * typesAirplane.length); // the random type of airpplane
    var chosenPlane = typesAirplane[rndType];
    // marker for the plane
    var plane = new google.maps.Marker({
        position: airplanePos,
        map: m,
        icon: images[1],
        title: '('+flightNumber+')[' + chosenPlane.name + ']\n',
        zIndex: zOrderCounter
    });
//    console.log(plane);
    plane.from = fromo;
    plane.to = too;
    plane.oldTo = too;
    plane.properties = createAirplaneProperties(chosenPlane.name, chosenPlane.maxSpeed,
                            chosenPlane.maxAltitude, chosenPlane.fuelCapacity, chosenPlane.fuelConsumption);
    plane.flightNumber = flightNumber;                        

//    console.log(plane.getTitle());
//    console.log(plane);
    airplanes.push(plane);
    zOrderCounter++;
    flightNumber++;
}
function moveAirplane(airplane){
    var lat = airplane.getPosition().k;
    var lng = airplane.getPosition().D;
    var directions = getAirplpaneDirection(airplane);
    
    // part of the collision prevention
    if(airplane.properties.proximitySkips !== 0){
        airplane.properties.proximitySkips--;
    }else{
        // switch back to original destination
        airplane = switchBackDestination(airplane);
    }
    
    if(directions.lat === 0 && directions.lng === 0){
        airplane.properties.landed = true;
        ++landedPlanes;
//        console.log("landed!!");
    }else{
        var actualAltitude = airplane.properties.actualAltitude;
        var maxAltitude = airplane.properties.maxAltitude;
        var vel = ((actualAltitude !== maxAltitude)?airplane.properties.maxSpeed/2:airplane.properties.maxSpeed)/10000;


        // apply movement
        lat += (directions.lat * vel); // update latitude
        lng += (directions.lng * vel); // update longitude
        airplane.properties.actualAltitude += (actualAltitude !== maxAltitude)?maxAltitude/4:0; // update altitude
        airplane.properties.actualFuel -= airplane.properties.fuelConsumption; // update fuel

        airplane.setPosition(new google.maps.LatLng(lat, lng));
//        console.log("aAltitude: " + actualAltitude+", mAlt: "+maxAltitude+", vel: "+ vel + ", fuel: " + airplane.properties.actualFuel);
    //    console.log("lat: " + lat+", lng: " + lng);
    }
    
    
}


// init
google.maps.event.addDomListener(window, 'load', initialize);





