var markersArray = [];
var json_path = {
    hospital: "/json/hospital.json"
}
//pan to offset

if (!String.format) {
  String.format = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}
var modal = {
    title: "Modal Title",
    exdetail: [{
        name: "detail name: ",
        value: "detail value"
    }],
    setup: function() {
        $('#modal-wrap').find('.modal-title').prop('innerHTML', modal.title);
        var modal_exdetail = "";
        $.each(modal.exdetail, function(index, value) {
            modal_exdetail += String.format("<p>{0}<span>{1}</span></p>", value.name, value.value);
        });
        $('#modal-wrap').find('.exdetail').prop('innerHTML', modal_exdetail)
    },
    center: function(){
      var modalHeight = $('#modal-wrap').height();
      console.log(modalHeight);
      var windowHeight = $('.map-container').height();
      console.log(windowHeight);
      var topBotMargin = (windowHeight - (modalHeight + 30))/2;
      $('#modal-wrap').css('margin-top',topBotMargin);
      $('#modal-wrap').css('margin-bottom',topBotMargin);
    }
}
//pan to Marker position
google.maps.Map.prototype.panToWithOffset = function(latlng, offsetX, offsetY) {
    console.log(offsetY);
    var map = this;
    var ov = new google.maps.OverlayView();
    ov.onAdd = function() {
        var proj = this.getProjection();
        var aPoint = proj.fromLatLngToContainerPixel(latlng);
        aPoint.x = aPoint.x + offsetX;
        aPoint.y = aPoint.y + offsetY;
        map.panTo(proj.fromContainerPixelToLatLng(aPoint));
    };
    ov.draw = function() {};
    ov.setMap(this);
};
//add Hospital markers
function addMarkerWithInfo(myLatlng,info){
  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      //icon: icon,
      title: info.title
  });
  //event listener
  google.maps.event.addListener(marker, 'click', function() {
      var markerPosition = marker.getPosition();
      showModal(info, markerPosition);
  });
  //push into markers array
  markersArray.push(marker);
}
function showHospital() {
    $.getJSON(json_path.hospital,
        function(json) {
            for (var i in json) {
                var info = {};
                info.title = "醫院名稱：" + json[i].org_name;
                info.exdetail = [{
                   name: "地址:",
                   value: json[i].addr
                },{
                  name: "聯絡電話:",
                  value: json[i].contact_phone
                }];
                var myLatlng = new google.maps.LatLng(json[i].lat, json[i].lng);
                /*var marker = new google.maps.Marker({
                    map: map,
                    position: myLatlng,
                });*/
                addMarkerWithInfo(myLatlng, info);
            }
        });
}

function showModal(info, markerPosition) {
    modal.title = info.title;
    modal.exdetail = info.exdetail;
    modal.setup();
    $('#modal-wrap').css('opacity', 0);
    $('#modal-wrap').removeClass('hidden');
    $('#modal-wrap').animate({
        opacity: 1
    }, 300);
    modal.center();
    var modalHeight = $('.modal-app-msg').height();
    console.log(modalHeight);
    map.panToWithOffset(markerPosition, -1, modalHeight * -1 / 2 - 35);

    $('#modal-pointer').css('opacity', 0);
    $('#modal-pointer').removeClass('hidden');
    $('#modal-pointer').animate({
        opacity: 1
    }, 300);
}
