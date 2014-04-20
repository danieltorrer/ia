var lat = 19.413821, lon =  -99.136505

var styles= [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#a2daf2"}]},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#f7f1df"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#d0e3b4"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#bde6ab"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"color":"#fbd3da"}]},{"featureType":"poi.business","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffe15f"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efd151"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"black"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#cfb2db"}]}]

var options = {
	mapTypeControlOptions: {
		mapTypeIds: [ 'Styled']
	},
	center: new google.maps.LatLng(lat, lon),
	zoom: 14,
	mapTypeId: 'Styled',
	streetViewControl: false,
	overviewMapControl: false,
	mapTypeControl: false,
};

var tipo = "specials"
var query = "https://api.foursquare.com/v2/venues/explore?client_id=Z0IEHNY5BAQXCLVYS3FASWUJKLHNOKD3C3M100RUXBROCT0Q&client_secret=03ZQUSZDUSX4HF3H1W0KU31UMIWGATPOU2JZ4XFB1VDZTLIE&v=20130815&ll="+lat+","+lon+"+&query=" + tipo;

var div = document.getElementById('map');
var map = new google.maps.Map(div, options);
var styledMapType = new google.maps.StyledMapType(styles, { name: 'Styled' });

function initialize(){
	map.mapTypes.set('Styled', styledMapType);
	var infowindow = new google.maps.InfoWindow()
	console.log(query);
	$.getJSON(query,buildList)
}

function createMarker(lati,longi,name,tipo,icono){
	var marker = new google.maps.Marker({
		map: map,
		position: {lat: lati, lng: longi},
		icon: icono+"bg_64.png"
	});

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(name + "<br><span class='subtitle'>"+ tipo+ "</h6>");
		infowindow.open(map, this);	 
	});

	/*var texto = "<div class='lugar' data-id='" + place.id +  "' data-lat='" + place.geometry.location.A + "' data-lon='" + place.geometry.location.k +"' >"
	texto += "<img src='" + place.icon + "'>"
	texto += "<span>" + place.name + "</span>"
	texto += "</div>"*/

	//$(".lugares").append(texto)
}

function buildList(data,status,xhr) {
	//infowindow = new google.maps.InfoWindow()

	$.each(data.response.groups[0].items, function( key, value ) {
		console.log(value.venue.categories[0].icon);
		createMarker(value.venue.location.lat, value.venue.location.lng, value.venue.name, value.venue.categories[0].shortName, value.venue.categories[0].icon.prefix)
	});

}

google.maps.event.addDomListener(window, 'load', initialize);