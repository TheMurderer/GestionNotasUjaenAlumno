/*----------- VARIABLES GLOBALES -----------*/
var pestanaSeleccionada = '';
var idAsignaturaSeleccionada = '';

//¿Se ha insertado información en los contenedores? Por Defecto TRUE
var numeroParcialTeoria = 1;
var numeroParcialPractica = 1;
var numeroParcialTrabajos = 1;

var asignaturaConfi='';
var idGrupoBorrarTeoria='';
var idGrupoBorrarPractica='';


/*----------- PETICIONES JSON -----------*/




/*************************************************************************
 ** @name 		 : mostrarDIV
 ** @description : Muestra el div de Teoría/Prácticas/Trabajos voluntarios
 ** 			   según la pestaña seleccionada
 ** @param valor : Div contenerdor de la información
 *************************************************************************/
function mostrarDIV(valor){
	if(valor == 'T'){
		pestanaSeleccionada = 'T';
		
		$('#confDIVTeoria').show();
		$('#confDIVPractica').hide();
		$('#confDIVTrabajos').hide();
		
		$('#panelConfiguracionAsignatura').refresh();
	}else if (valor == 'P'){
		pestanaSeleccionada = 'P';
		
		$('#confDIVTeoria').hide();
		$('#confDIVPractica').show();
		$('#confDIVTrabajos').hide();

		$('#panelConfiguracionAsignatura').refresh();
	}else{
		pestanaSeleccionada = 'TV';
		
		$('#confDIVTeoria').hide();
		$('#confDIVPractica').hide();
		$('#confDIVTrabajos').show();

		$('#panelConfiguracionAsignatura').refresh();
	}
}


/*************************************************************************
 ** @name 		 : ocultarTodosDIV
 ** @description : Oculta todos los div y deja mostrando la pestaña por defecto
 **				   (Teoría)
 *************************************************************************/
function ocultarTodosDIV(){
	pestanaSeleccionada = 'T';
	$('#pestanaTeoriaConf').addClass("ui-btn-active");
	$('#pestanaPracticasConf').removeClass('ui-btn-active');
	$('#pestanaTrabajosConf').removeClass('ui-btn-active');
	
	$('#confDIVTeoria').show();
	$('#confDIVPractica').hide();
	$('#confDIVTrabajos').hide();
}


function opcionesConfAsig(idAsignatura){


	var codhtml='';
	idAsignaturaSeleccionada = idAsignatura;
	
			codhtml='<ul data-role="listview" id="listaOpcionesAsignatura">';

			codhtml=codhtml + '<li data-icon="plus"><a onclick="informacionAsig('+idAsignatura+')">Informaci\xf3n </a></li>';
			codhtml=codhtml + '<li data-icon="edit"><a onclick="exportacionPDFCalif('+idAsignatura+')">Exportar calificicaciones (PDF)</a></li>';
			codhtml=codhtml + '<li data-icon="delete"><a href="#divDialogoEliminacionAsignatura" data-rel="dialog" onclick="eliminarAsignaturaProf('+ idAsignatura +');">Salir</a></li>';

            codhtml = codhtml + '</ul>';

            $('#contenidoOpAsig').html(codhtml);

            $('#opcionesAsignatura').trigger('pagecreate');
            $('#listaOpcionesAsignatura').listview();


}

function informacionAsig(idAsignatura){
	location.href="#InformacionAsig";
var cad = "[{\"idAsig\":\"" + idAsignatura + "\"}]";

	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'informacionAsig',
			'datos':cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			//titulaciones

			arrayRespuesta = eval(respuesta);
				var codhtml='';
				
				$('#contenido').text(arrayRespuesta[0][0]["nombre"]);
				$('#contenidoT').text(arrayRespuesta[0][0]["tipo"]);
				$('#contenidoCred').text(arrayRespuesta[0][0]["creditos"]);
				$('#contenidoCurso').text(arrayRespuesta[0][0]["curso"]);
				$('#contenidoTemp').text(arrayRespuesta[0][0]["temporalidad"]);
				
				$('#porT').text(arrayRespuesta[0][0]["Teoria"]);
				$('#porTMin').text(arrayRespuesta[0][0]["TeoriaMin"]);
				
				$('#porP').text(arrayRespuesta[0][0]["Practicas"]);
				$('#porPMin').text(arrayRespuesta[0][0]["PracticasMin"]);
				
				$('#porA').text(arrayRespuesta[0][0]["Asistencia"]);
				$('#porAMin').text(arrayRespuesta[0][0]["AsistenciaMin"]);

				$('#porTV').text(arrayRespuesta[0][0]["Trabajo"]);
				$('#porTVMin').text(arrayRespuesta[0][0]["TrabajoMin"]);
				var i;
				
				for(i = 0; i < arrayRespuesta[1].length; i++){
					if(arrayRespuesta[1][i]["fotografia"] !=""){
						codhtml = codhtml + '<div id="profesor' + i + '" class="divProfe">';
						var fotografia ='http://eps.ujaen.es'+ arrayRespuesta[1][i]["fotografia"].replace('\\',' ');
						codhtml= codhtml + '<div id="ctImage'+i+'" class="img"> <img class="imgIm" src="' + fotografia + '"></div>';
					}else{
						codhtml= codhtml + '<div id="ctImage'+i+'" class="img"><img class="imgIm" src="./Imagenes/anonimo.jpg"></div>';
					}
					codhtml = codhtml + '<div id="contenDescp" class="content">'+ arrayRespuesta[1][i]["nombre"] + ' ' + arrayRespuesta[1][i]["apellidos"] + '<br>';
					codhtml= codhtml + 'Despacho ' + arrayRespuesta[1][i]["edificio"] + ' - ' + arrayRespuesta[1][i]["numero_despacho"] + '<br>';
					if(arrayRespuesta[1][i]["web"] != ""){
						codhtml = codhtml + 'Web: <a href="' + arrayRespuesta[1][i]["web"] + '">'+arrayRespuesta[1][i]["web"]+'</a> Tlno: ' + arrayRespuesta[1][i]["telefono"]+'<br></div></div>';
					}else {
						codhtml = codhtml + ' Tlno: ' + arrayRespuesta[1][i]["telefono"]+'<br></div></div>';
					}
				}
	            $('#ContentProfesorInfo').html(codhtml);
	            $('#InformacionAsig').trigger('create');

		},
		error: function(respuesta){
			alert("Su sesi\xf3n se ha cerrado automaticamente.");delCookie("validar");location.href="#pageLogin";
		},
		beforeSend: function(){
			$('#cargando5').show();
			//$('#panelContenidoInfoAsig').hide();
		},
		complete: function(){
			$('#cargando5').hide();
			$('#panelContenidoInfoAsig').show();
		}
	});
}

function salirAsignatura(idAsignatura){
var cad = "[{\"idAsig\":\"" + idAsignatura + "\"}]";
	
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'eliminarAsigAlum',
			'datos':cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			//titulaciones

			arrayRespuesta = eval(respuesta);
			if (arrayRespuesta["ok"] == 1){
				peticionAsignaturas();
				location.href="#pageSignatures";
			}

		},
		error: function(respuesta){
			alert("Su sesi\xf3n se ha cerrado automaticamente.");delCookie("validar");location.href="#pageLogin";
		},
		beforeSend: function(){
			$('#cargando2').show();
			$('#listarAsignaturasTitulacion').hide();
		},
		complete: function(){
			$('#cargando2').hide();
			$('#listarAsignaturasTitulacion').show();
		}
	});
}




function eliminarAsignaturaProf(idAsignatura){

	var codhtml = '<a id="btSisi" href="javascript:salirAsignatura('+idAsignatura+')" data-role="button" data-inline="true" >Si</a>';
	codhtml = codhtml + '<a id="btNono" href="" data-role="button" data-inline="true" data-rel="back">No</a>';
	$('#btSiEliminarAsignatura').html(codhtml);
	$("#btSisi").button();
	$("#btNono").button();

}

function exportacionPDFCalif(idAsignatura){
	
	location.href=p_url + '?m=generacionInformesPDF&datos=[{"idAsig":"'+idAsignatura+'","dni":"'+dni+'"}]';

}
