if (typeof Number.prototype.toRadians == 'undefined') {
    Number.prototype.toRadians = function() {
        return this * Math.PI / 180;
    }
}

$(function() {

  self = this;

  map = document.getElementById('map-contours');
  this.mapBBox = map.getBoundingClientRect();

  this.mapLatLngBBox = [
    {lat: 60.9518, lng: -14.8535},
    {lat: 35.1379, lng: 42.4512}
  ];

  this.markerPrototype = $('#marker-prototype');
  this.markerSize = {
    w: this.markerPrototype.width(),
    h: this.markerPrototype.height()
  }

  this.markerLayer = $('#marker-layer');
  this.markers = [];

  this.update = function() {
  };

  this.placeMarker = function(pos) {
    var marker = self.markerPrototype.clone(),
        w = self.markerSize.w,
        h = self.markerSize.h;
    marker.removeAttr("id");

    self.markers.push(marker);
    self.markerLayer.append(marker);

    //x = self.mapBBox.left + pos.x - w / 2;
    //y = self.mapBBox.top + pos.y - h;
    dx = self.mapBBox.left - w/2;
    dy = self.mapBBox.top - h*2;
    x = pos.x + dx;
    y = pos.y + dy;

    marker.offset({ top: y, left: x });
  };

  this.clearAllMarkers = function() {
    self.markers.length = 0;
    self.markerLayer.empty();
  };

  this.latLngToXY = function(lat, lng) {
    var dy, dx, verticalFactor, pos;

    xKmPerPx = self.mapWidthAtLat(lat) / self.mapBBox.width;
    yKmPerPx = self.mapHeightAtLng(lng) / self.mapBBox.width;

    dy = self.sphericalDistance(
      {lat: self.mapLatLngBBox[0].lat, lng: lng},
      {lat: lat, lng: lng}
    );
    dx = self.sphericalDistance(
      {lat: lat, lng: self.mapLatLngBBox[0].lng},
      {lat: lat, lng: lng}
    );

    pos = {
      x: dx / xKmPerPx,
      y: dy / yKmPerPx
    };

    return pos;
  };

  this.sphericalDistance = function(from, to) {
    var φ1 = from.lat.toRadians(),
        φ2 = to.lat.toRadians(),
        Δλ = (to.lng - from.lng).toRadians(),
        R = 6378.137; // gives d in km

    return Math.acos( Math.sin(φ1)*Math.sin(φ2) + Math.cos(φ1)*Math.cos(φ2) * Math.cos(Δλ) ) * R;
  };

  this.mapWidthAtLat = function(lat) {
    return self.sphericalDistance(
      {lat: lat, lng: self.mapLatLngBBox[0].lng},
      {lat: lat, lng: self.mapLatLngBBox[1].lng}
    );
  };

  this.mapHeightAtLng = function(lng) {
    return self.sphericalDistance(
      {lat: self.mapLatLngBBox[0].lat, lng: lng},
      {lat: self.mapLatLngBBox[1].lat, lng: lng}
    );
  };

  $(window).resize(this.update);
  this.update();

  //DEBUG
  //this.placeMarker(this.latLngToXY(35.1379, 42.4512));
  this.placeMarker(this.latLngToXY(52.5,13.5));
  this.placeMarker(this.latLngToXY(51.5, 0));
    

});


/* jquery slider */

$(function() {
  var select = $( "#minbeds" );
  var slider = $( "<div id='slider'></div>" ).insertAfter( select ).slider({
    min: 1,
    max: 6,
    range: "min",
    value: select[ 0 ].selectedIndex + 1,
    slide: function( event, ui ) {
      select[ 0 ].selectedIndex = ui.value - 1;
      updateYear();
    }
  });
  $( "#minbeds" ).change(function() {
    slider.slider( "value", this.selectedIndex + 1 );

    updateYear();
  });

  function updateYear() {
    console.log($( "#minbeds" ).val());
  }
});

