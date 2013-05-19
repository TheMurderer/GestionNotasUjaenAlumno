/*----------- VARIABLES GLOBALES -----------*/
var idTitulacionSeleccionada = '';
var idAsignaturaSeleccionada = '';
var esResponsable = '';

var numeroGruposTeoriaAnadidos = 1;
var numeroGruposPracticasAnadidos = 1;

/*----------- PETICIONES JSON -----------*/





/*******************************************************************************
 * *
 * 
 * @name : peticionAsignaturasTitulacion *
 * @description : Petición json para recuperar las Asignaturas de una titulación *
 * @param idTitulacion :
 *            id de la titulación de la cual queremos recuperar las asignaturas
 ******************************************************************************/
function peticionAsignaturasTitulacion() {
	var cad = "[]";
	$('#inscripGrupos').empty();
	$.ajax({
				type : "GET",
				url : p_url,
				dataType : 'jsonp',
				data : {
					'm' : 'lasigtit',
					'datos' : cad
				},
				contentType : 'application/json; charset=utf-8',
				success : function(respuesta) {

					// Asignaturas pertenecientes a una titulación
					arrayRespuesta = eval(respuesta);

					var i;
					var codhtml = '<div class="agrupacionElementos" >';

					codhtml = codhtml
							+ '<p class="letraDocumento" >Asignaturas</p>';

					if (arrayRespuesta.length != 0) {
						codhtml = codhtml
								+ '<select id="menuAsigntauras" name="asignaturaTitulacion" >';
						// Opción por defecto
						codhtml = codhtml
								+ '<option value="" disabled="disabled" selected>'
								+ "Elija una asignatura" + '</option>';
						for (i = 0; i < arrayRespuesta.length; i++) {
							codhtml = codhtml + '<option value="'
									+ arrayRespuesta[i]["id"] + '">'
									+ arrayRespuesta[i]["nombre"] + '</option>';
						}
						codhtml = codhtml + '</select>';
						codhtml = codhtml + '<br></div>';
					} else {
						codhtml = "<p class='letraDocumento'>No hay asignaturas</p>";
					}

					$('#asignaturaElegida').html(codhtml);
					$('#menuAsigntauras').selectmenu();

					$('#menuAsigntauras').change(function() {
						idAsignaturaSeleccionada = $('#menuAsigntauras').val();
						inscripcionGrupos();
					});
				},
				error : function(respuesta) {
					alert("Su sesi\xf3n se ha cerrado automaticamente.");
					delCookie("validar");
					location.href="#pageLogin";
				},
				beforeSend : function() {
					$('#cargando3').show();
					$('#listarAsignaturasTitulacion').hide();
				},
				complete : function() {
					$('#cargando3').hide();
					$('#listarAsignaturasTitulacion').show();
				}
			});

}


function inscripcionGrupos(){
	var cad = "[{\"idAsig\":\"" + idAsignaturaSeleccionada + "\"}]";

	$.ajax({
				type : "GET",
				url : p_url,
				dataType : 'jsonp',
				data : {
					'm' : 'gruposAsignatura',
					'datos' : cad
				},
				contentType : 'application/json; charset=utf-8',
				success : function(respuesta) {

					// Asignaturas pertenecientes a una titulación
					arrayRespuesta = eval(respuesta);

					var i;
					var codhtml = '<div class="agrupacionElementos" >';

					codhtml = codhtml
							+ '<p class="letraDocumento" >Grupos de Teoria</p>';

					if (arrayRespuesta[0].length != 0) {
						codhtml = codhtml
								+ '<select id="menuAsigntauras" name="CbTeoria" >';
						// Opción por defecto
						codhtml = codhtml
								+ '<option value="" disabled="disabled" selected>'
								+ "Elija un grupo de teoria: " + '</option>';
						for (i = 0; i < arrayRespuesta[0].length; i++) {
							codhtml = codhtml + '<option value="'
									+ arrayRespuesta[0][i]["id"] + '"> Grupo '
									+ arrayRespuesta[0][i]["descripcion"] + ' - ' + 'Turno: ' + arrayRespuesta[0][i]["turno"]  +'</option>';
						}
						codhtml = codhtml + '</select>';
						codhtml = codhtml + '<br></div>';
					} else {
						//codhtml = "<p class='letraDocumento'>No hay grupo de teoria disponible.</p>";
					}
					
					
					codhtml =codhtml + '<div class="agrupacionElementos" >';

					codhtml = codhtml
							+ '<p class="letraDocumento" >Grupos de Pr\xe1cticas</p>';

					if (arrayRespuesta[1].length != 0) {
						codhtml = codhtml
								+ '<select id="menuAsigntauras2" name="CbPracticas" >';
						// Opción por defecto
						codhtml = codhtml
								+ '<option value="" disabled="disabled" selected>'
								+ "Elija un grupo de pr\xe1cticas: " + '</option>';
						for (i = 0; i < arrayRespuesta[1].length; i++) {
							codhtml = codhtml + '<option value="'
									+ arrayRespuesta[1][i]["id"] + '"> Grupo '
									+ arrayRespuesta[1][i]["descripcion"] + ' ' + arrayRespuesta[1][i]["horaC"]  + ' - ' + arrayRespuesta[1][i]["horaF"] + ' </option>';
						}
						codhtml = codhtml + '</select>';
						codhtml = codhtml + '<br></div>';
					} else {
						//codhtml = codhtml + "<p class='letraDocumento'>No hay grupo de teoria disponible.</p>";
					}
					
					if(arrayRespuesta[0].length == 0 && arrayRespuesta[1].length == 0 ){
						codhtml= "<p class='letraDocumento'>No hay grupos disponibles. Consulte con el profesor.</p>";
					}else{
						var bcodhtml = '<button id="btAddSignature" type="submit" data-inline="true" >A\xf1adir</button>';
						$('#btAddAsignature').html(bcodhtml);
					}
					
					
					$('#inscripGrupos').html(codhtml);
					$('#menuAsigntauras').selectmenu();
					$('#menuAsigntauras2').selectmenu();
					$('#listarAsignaturasTitulacion').trigger('create');


				},
				error : function(respuesta) {
					alert("Su sesi\xf3n se ha cerrado automaticamente.");
					delCookie("validar");
					location.href="#pageLogin";
				},
				beforeSend : function() {
					$('#cargando3').show();
					$('#listarAsignaturasTitulacion').hide();
				},
				complete : function() {
					$('#cargando3').hide();
					$('#listarAsignaturasTitulacion').show();
				}
			});
}


function addNewSignature(){
	var cad = "[" + JSON.stringify($("#formAnadeAsignatura").serializeObject())
	+ "]";

	$.ajax({
		type : "GET",
		url : p_url,
		dataType : 'jsonp',
		data : {
			'm' : 'addasig',
			'datos' : cad
		},
		contentType : 'application/json; charset=utf-8',
		success : function(respuesta) {
			arrayRespuesta = eval(respuesta);
			if (arrayRespuesta["ok"] == 0) {
				alert('Creación de asignatura incorrecta');
				navigator.notification.alert('Error al crear asignatura', null,
						'Nueva asignatura', 'Aceptar');
			} else {
				peticionAsignaturas(); // Lista de asignaturas del profesor
				location.href = "#pageSignatures";
			}
		},
		error : function(respuesta) {
			alert("Su sesi\xf3n se ha cerrado automaticamente.");
			delCookie("validar");
			location.href="#pageLogin";
		}
	});
}


/*--------------------- LIMPIAR PANTALLAS ---------------------*/

/*******************************************************************************
 * *
 * 
 * @name : limpiarTitulacionAsignatura *
 * @description : Función para limpiar los combos de la titulaciones y * las
 *              asignaturas
 ******************************************************************************/
function limpiarTitulacionAsignatura() {
	$("#titulaciones").empty();
	$("#asignaturaElegida").empty();
}

function borraBotonNuevaAsignatura() {
	$('#btDialog').empty();
}
