/* variables */
var lat = 19.413821,
lon = -99.136505,
styles = [{
	featureType: "water",
	elementType: "geometry",
	stylers: [{
		color: "#a2daf2"
	}]
}, {
	featureType: "landscape.man_made",
	elementType: "geometry",
	stylers: [{
		color: "#f7f1df"
	}]
}, {
	featureType: "landscape.natural",
	elementType: "geometry",
	stylers: [{
		color: "#d0e3b4"
	}]
}, {
	featureType: "landscape.natural.terrain",
	elementType: "geometry",
	stylers: [{
		visibility: "off"
	}]
}, {
	featureType: "poi.park",
	elementType: "geometry",
	stylers: [{
		color: "#bde6ab"
	}]
}, {
	featureType: "poi",
	elementType: "labels",
	stylers: [{
		visibility: "off"
	}]
}, {
	featureType: "poi.medical",
	elementType: "geometry",
	stylers: [{
		color: "#fbd3da"
	}]
}, {
	featureType: "poi.business",
	stylers: [{
		visibility: "off"
	}]
}, {
	featureType: "road",
	elementType: "geometry.stroke",
	stylers: [{
		visibility: "off"
	}]
}, {
	featureType: "road",
	elementType: "labels",
	stylers: [{
		visibility: "off"
	}]
}, {
	featureType: "road.highway",
	elementType: "geometry.fill",
	stylers: [{
		color: "#ffe15f"
	}]
}, {
	featureType: "road.highway",
	elementType: "geometry.stroke",
	stylers: [{
		color: "#efd151"
	}]
}, {
	featureType: "road.arterial",
	elementType: "geometry.fill",
	stylers: [{
		color: "#ffffff"
	}]
}, {
	featureType: "road.local",
	elementType: "geometry.fill",
	stylers: [{
		color: "black"
	}]
}, {
	featureType: "transit.station.airport",
	elementType: "geometry.fill",
	stylers: [{
		color: "#cfb2db"
	}]
}],
options = {
	mapTypeControlOptions: {
		mapTypeIds: ["Styled"]
	},
	center: new google.maps.LatLng(lat, lon),
	zoom: 13,
	mapTypeId: "Styled",
	streetViewControl: !1,
	overviewMapControl: !1,
	mapTypeControl: !1
},
tipo = "4deefb944765f83613cdba6e",
precio = "1",
radius = "8000",
div = document.getElementById("map"),
map = null,
query = "",
markers = [];

//google.maps.event.addDomListener(window, "load", initialize);

$(document).foundation();

$(document).ready(function(){
	$(".field-toggle").click(function(){
		$(".background").addClass("open")
		$(this).parent().find("ul").addClass("fadeInUp").addClass("field-open")
	})

	$(".background").click(function(){
		$(".background").removeClass("open")
		$(".field-open").removeClass("field-open")
	})

	$(".field ul>li").click(function(){
		//console.log( $(this).text() )
		
		//console.log( $(this).parent().parent().children(".field-toggle").text())
		$(this).parent().parent().children(".field-toggle").text( $(this).text() )

		$(".background").removeClass("open")
		$(".field-open").removeClass("field-open")

		var caso = $(this).attr("data-type")
		
		//console.log(caso);
		switch (caso){
			case "tipo":
			tipo = $(this).attr("data-value")
			console.log("tipo");
			break

			case "radius":
			radius = $(this).attr("data-value")
			console.log("raidous");
			break

			case "precio":
			precio = $(this).attr("data-value")
			console.log("precio");
			break
		}	

	})

	$("#nl-submit").click(function(){
		query = "https://api.foursquare.com/v2/venues/explore?client_id=Z0IEHNY5BAQXCLVYS3FASWUJKLHNOKD3C3M100RUXBROCT0Q&client_secret=03ZQUSZDUSX4HF3H1W0KU31UMIWGATPOU2JZ4XFB1VDZTLIE&v=20130815&ll=" + lat + "," + lon + "&categoryId=" + tipo + "&radius=" + radius
		//console.log(query);
		$(".paso1").addClass("ocultar")
		$(".paso2").removeClass("ocultar")

		map = new google.maps.Map(div, options),
		styledMapType = new google.maps.StyledMapType(styles, {
			name: "Styled"
		})
		initialize()
	})
})


function initialize() {
	map.mapTypes.set("Styled", styledMapType), 
	new google.maps.InfoWindow, 
	$.getJSON(query, buildList)
	console.log(query);
}

function createMarker(a, b, c, d, e, id, cont) {
	var f = new google.maps.Marker({
		map: map,
		position: {
			lat: a,
			lng: b
		},
		icon: e + "bg_64.png"
	});
	google.maps.event.addListener(f, "click", function () {
		infowindow.setContent(c + "<br><span class='subtitle'>" + d + "</h6>"), infowindow.open(map, this)
	})

	markers.push(f);

	var lugar = "<div class='lugar' data-lat='" + a + "' data-lng='"+ b +"' data-id='"+ cont +"'>"
	lugar += "<img src='" + e + "bg_64.png'>" 
	lugar += "<span>" + c + "</span>" 
	lugar += "<i class='ocultar boton-add right fi-plus' data-id='"+ id + "' href='#' id='"+ cont +"''></i>" 
	lugar += "</div>"

	$(".lugares").append(lugar)

	$(".lugar").mouseover(function(){
		$(this).children(".boton-add").removeClass("ocultar")
	})

	$(".lugar").mouseout(function(){
		$(this).children(".boton-add").addClass("ocultar")
	})

	$(".boton-add").unbind().click(addLugar)
	$(".lugar").click(centerMap)


}

function addLugar(){
	//console.log(lel);
	console.log(event.target.id)
	$( this ).parent().clone().appendTo( ".seleccion" );
	
}

function centerMap(){
	var point = new google.maps.LatLng($(this).attr("data-lat"),$(this).attr("data-lng"))
	map.setCenter(point)
	google.maps.event.trigger(markers[$(this).attr("data-id")], 'click');
}

function buildList(a) {
	infowindow = new google.maps.InfoWindow

	$.each(a.response.groups[0].items, function (a, b) {
		createMarker(b.venue.location.lat, b.venue.location.lng, b.venue.name, b.venue.categories[0].shortName, b.venue.categories[0].icon.prefix, b.venue.id,a)
		console.log(b)
	})
}