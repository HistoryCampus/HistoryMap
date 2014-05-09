$(function() {

  self = this;
  this.map = $('#map');
  this.mapHeight = this.map.height();
  this.mapWidth = this.map.width();

  this.update = function() {
    self.map.height($(document).height() * 0.9);
    self.mapHeight = self.map.height();
    self.mapWidth = self.map.width();
  };

  $(window).resize(this.update);
  this.update();

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

