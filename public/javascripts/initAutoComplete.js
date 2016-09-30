var map;
var geocoder;
var json_path = {
    hospital: "/json/hospital.json"
}

function initMap() {
    //map options
    var location;
    var iconSize = new google.maps.Size(29, 39);
    var iconAnchor = new google.maps.Point(14.5, 37);
    geocoder = new google.maps.Geocoder();
    var myOptions = {
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false
    }
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    //check whether browser supports GPS locating
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(location);
            addMarker(location);
        });
    } else {
        location = new google.maps.LatLng(25.09108, 121.5598);
        map.setCenter(location);
        addMarker(location);
    }
    showHospital();
}
//add User location marker
function addMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        title: "Hi",
        map: map
    });
}
