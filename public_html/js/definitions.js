// all standard objects and helper functions definitions
//------------------------- OBJECTS -------------------------//
function Airplane(name, maxSpeed, maxAltitude, fuelCapacity, fuelConsumption){
    this.name = name;
    this.maxSpeed = maxSpeed;
    this.maxAltitude = maxAltitude;
    this.fuelCapacity = fuelCapacity;
    this.fuelConsumption = fuelConsumption;
    //variants
    this.actualAltitude = 0;
    this.actualFuel = fuelCapacity;
    this.actualSpeed = 0;
    this.landed = false;
}

//------------------------- FUNCTIONS -------------------------//
function detectPosibleCollision(airplanes, index){
    /*
     * Detect which other planes could collide with the one has 
     * been chosen 
     */
    var planeLat = airplanes[index].getPosition().k; //
    var planeLng = airplanes[index].getPosition().D; //
    var planePosition = airplanes[index].getPosition();
    var result = [];
//    console.log(planeLat);
    
    // 
    for(i = 0; i < airplanes.length && i !== index; ++i){
        if(getDistance(airplanes[i].getPosition(), planePosition) <  0.600000 ){
            console.error("ap["+index+"]: collision detected with #" + i);
            result.push[i];
        }
    }

    return result;
}
function preventCollision(airplanes, index, collisions){
    /* Makes evasive movements in the plane with the given index.
     * Take the possible collitions to make such movements.
     */
}
function getDifference(A, B){
    return Math.abs(Math.abs(A) - Math.abs(B));
}
function getDistance(positionA, positionB){
    var lat1 = positionA.k, lat2 = positionB.k;
    var lng1 = positionA.D, lng2 = positionB.D;
    
    return Math.sqrt(Math.pow(lat2 - lat1,2) + Math.pow(lng2 - lng1,2));
}
function getHaversineDistance(positionA, positionB){
    var lat1 = positionA.k, lat2 = positionB.k;
    var lng1 = positionA.D, lng2 = positionB.D;

    var R = 6371; //  earth radius in km
    var dLat = (lat2 - lat1) * Math.PI / 180;  // converting degrees to radians
    var dLng = (lng2 - lng1) * Math.PI / 180;
    var a = 
         0.5 - Math.cos(dLat)/2 + 
         Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
         (1 - Math.cos(dLng))/2;

    return R * 2 * Math.asin(Math.sqrt(a));
    
}
function getAirplpaneDirection(airplane){
    var latDirection = 1, lngDirection = 1;
    
//    console.log("rads: " + getDistance(airplane.to[1],airplane.getPosition().k));
    
    // **stop condition** -> up/right condition - > down/left condition
    if(getDifference(airplane.to[1],airplane.getPosition().k) < 0.050000){
        latDirection = 0;
    }
    else if(airplane.to[1] > airplane.getPosition().k){
        latDirection = 1;
    }else if(airplane.to[1] < airplane.getPosition().k){
        latDirection = -1;
    }
    
    if(getDifference(airplane.to[2], airplane.getPosition().D) < 0.050000){
        lngDirection = 0;
    }
    else if(airplane.to[2] > airplane.getPosition().D){
        lngDirection = 1;
    }else if(airplane.to[2] < airplane.getPosition().D){
        lngDirection = -1;
    }
    return {lat: latDirection, lng: lngDirection};
}
function toRadians(val){
    return this * Math.PI / 180;
}
function createAirplaneProperties(name, maxSpeed, maxAltitude, fuelCapacity, fuelConsumption){
    return new Airplane(name, maxSpeed, maxAltitude, fuelCapacity, fuelConsumption);
}
function getRandomPercentOf(value){
    /*
     * the min will be 60% and the max 100%
     */
    var extraPercent = Math.floor(Math.random() * 40) + 1
    var staticPercent = 0.6;
    
    extraPercent /= 100;
    
    return  value * (staticPercent + extraPercent);
}
function testingPlanes(map){
    var p1 = new google.maps.Marker({
        position:  new google.maps.LatLng(14.993077, -75.278870),
        icon:{
            url: 'img/plane-collision.png',
            size: new google.maps.Size(30, 30),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 32)
        },
        dragable: true,
        map: map
    });
    
    var p2 = new google.maps.Marker({
        position:  new google.maps.LatLng(14.893077, -74.678870),
        icon:{
            url: 'img/plane-collision.png',
            size: new google.maps.Size(30, 30),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 32)
        },
        dragable: true,
        map: map
    });
    console.log("distance: "+getDistance(p1.getPosition(), p2.getPosition()));
//    console.log("distance2: "+getHaversineDistance(new google.maps.LatLng(18.504552,-69.839455)
//                                            , new google.maps.LatLng(18.504536,-69.838430)) * 1000);
}