$(function() {

  self = this;
  this.map = $('#map');
  this.mapBBox = this.map.offset();
  this.mapHeight = this.map.height();
  this.mapWidth = this.map.width();

  this.markerClass = "marker";
  this.markerPrototype = $('<img src="marker.svg" class="marker" width="40px">');
  this.markerLayer = $('#marker-layer');
  this.markers = [];

  this.update = function() {
    self.map.height($(document).height() * 0.9);
    self.mapHeight = self.map.height();
    self.mapWidth = self.map.width();
  };

  this.placeMarker = function(x,y) {
    var marker = self.markerPrototype.clone(),
        markerWidth = marker.width(),
        markerHeight = marker.height();

    x = self.mapBBox.left + x - markerWidth / 2;
    y = self.mapBBox.top + y - markerHeight;

    marker.offset({ top: y, left: x });

    self.markers.push(marker);
    self.markerLayer.append(marker);
  };

  this.clearAllMarkers = function() {
    self.markers.length = 0;
    self.markerLayer.empty();
  };

  $(window).resize(this.update);
  this.update();
  this.placeMarker(100,100);
  this.placeMarker(200,300);
  this.placeMarker(300,200);

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

