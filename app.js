$(function() {

  self = this;
  this.map = $('#map');
  this.mapBBox = this.map.offset();
  this.mapHeight = this.map.height();
  this.mapWidth = this.map.width();

  this.mapLatLngBBox = [
    {lat: 60.9518, lng: -14.8535},
    {lat: 35.1379, lng: 42.4512}
  ];

  d = this.mapLatLngBBox[1].lng - this.mapLatLngBBox[0].lng;
  this.mapPixelFactor = this.mapWidth / d;

  this.markerClass = "marker";
  this.markerPrototype = $('<img src="marker.svg" class="marker" width="40px">');
  this.markerLayer = $('#marker-layer');
  this.markers = [];

  this.update = function() {
    self.map.height($(document).height() * 0.9);
    self.mapHeight = self.map.height();
    self.mapWidth = self.map.width();

    d = self.mapLatLngBBox[1].lng - self.mapLatLngBBox[0].lng;
    self.mapPixelFactor = self.mapWidth / d;
  };

  this.placeMarker = function(pos) {
    var marker = self.markerPrototype.clone(),
        markerWidth = marker.width(),
        markerHeight = marker.height();

    x = self.mapBBox.left + pos.x - markerWidth / 2;
    y = self.mapBBox.top + pos.y - markerHeight;

    marker.offset({ top: y, left: x });

    self.markers.push(marker);
    self.markerLayer.append(marker);
  };

  this.clearAllMarkers = function() {
    self.markers.length = 0;
    self.markerLayer.empty();
  };

  this.latLngToXY = function(lat, lng) {
    var pos = {
      x: lat * self.mapPixelFactor,
      y: lng * self.mapPixelFactor
    };
    return pos;
  };

  $(window).resize(this.update);
  this.update();

  //DEBUG
  this.placeMarker(this.latLngToXY(52.5, 13.4));

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

