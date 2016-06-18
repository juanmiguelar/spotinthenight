function BuscarArtistas(){
	$('body').addClass('ui-loading');

	var nombreArtista = $('#txtArtista').val();

	var req = $.ajax({
		url: 'https://api.spotify.com/v1/search?type=artist&q=' + nombreArtista,
		timeout: 10000,
		success: function(datos){
			ProcesarArtistas(datos)
		},
		error: function (datos) {
			ManejarError()
		}
	});

	//$('body').removeClass('ui-loading');
}

function ProcesarArtistas(datos)
{
	$("#listaArtistas").empty();

	$.each(datos.artists.items,function(){
		var nuevoA = document.createElement("a");
		nuevoA.href = '#artista';
		nuevoA.innerHTML =this.name;

		nuevoA.setAttribute("id",this.id);
		//nuevoA.attributes["id"] = this.id;

		nuevoA.setAttribute("onclick","CargarInfoArtista(this.id)");

		var nuevoLi = document.createElement("li");
		nuevoLi.appendChild(nuevoA);

		$("#listaArtistas").append(nuevoLi);
	});

	$('#listaArtistas').listview('refresh');
	$('body').removeClass('ui-loading');
}


function CargarInfoArtista(id){

var req = $.ajax({
		url: 'https://api.spotify.com/v1/artists/' + id,
		timeout: 10000,
		success: function(datos){MostrarDatosArtista(datos)}
	});


var req2 = $.ajax({
		url: 'https://api.spotify.com/v1/artists/' +
		 id + '/top-tracks?country=US',
		timeout: 10000,
		success: function(datos){Populares(datos)}
	});	
}

function Populares(datos)
{
	var listacanciones = document.getElementById("cancionesPopulares");
	$("#cancionesPopulares").empty();

	var nuevoTitulo = document.createElement("li");
	nuevoTitulo.setAttribute("data-role","list-divider");
	nuevoTitulo.innerHTML = "Canciones Populares";
	listacanciones.appendChild(nuevoTitulo);

	$.each(datos.tracks,function(){
		var nuevoli = document.createElement("li");
		var nuevoA = document.createElement("a");
		nuevoA.href = this.preview_url;
		nuevoA.innerHTML = this.name;
		nuevoli.appendChild(nuevoA);
		listacanciones.appendChild(nuevoli);
	});
	$('#cancionesPopulares').listview('refresh');
}

function MostrarDatosArtista(datos)
{
	$("#nombreArtista").html(datos.name);
	$("#Seguidores").html("Número de Seguidores: " + datos.followers.total);
	var imagen = document.getElementById("imagen");
	imagen.src = datos.images[2].url;
}

function ManejarError(argument) {
	$('body').removeClass('ui-loading');
}



