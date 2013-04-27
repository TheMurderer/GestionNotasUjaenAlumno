function motrarListaAlumnosAsistMod(idGrupo){
	var cad = "[{\"id\":\"" + idGrupo + "\"}]";

	grupoSel = idGrupo;
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'obtenerAsistenciasAlumnoGrupo',
			'datos': cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			
			arrayRespuesta = eval(respuesta);
			
			var i;
			var codhtml = '<fieldset data-role="controlgroup">';

			if(arrayRespuesta.length != 0){
				$('#btUpdAsistencia').show();
				for(i = 0; i < arrayRespuesta.length; i++){
					if(arrayRespuesta[i]["asistencia"] == 1){
						codhtml = codhtml + '<input type="checkbox" name="'+ arrayRespuesta[i]["id_RecuentoAsist"] +'" id="'+ arrayRespuesta[i]["id_RecuentoAsist"] +'" checked onclick="this.checked=!this.checked;">';
					}else{
						codhtml = codhtml + '<input type="checkbox" name="'+ arrayRespuesta[i]["id_RecuentoAsist"] +'" id="'+ arrayRespuesta[i]["id_RecuentoAsist"] +'" disabled="disabled">';

					}
					codhtml = codhtml + '<label for="'+ arrayRespuesta[i]["id_RecuentoAsist"] +'"> Fecha/Hora: ' + arrayRespuesta[i]["fecha_hora"] + ' </label>';
				}
				codhtml = codhtml + '</ul>';
				

				$('#ContenidoModificarAsis').html(codhtml);
				$('#calificacionAlumnos').trigger('create');
				
			}else{
				$('#btUpdAsistencia').hide();
				$('#ContenidoModificarAsis').html("<h3 class='estiloH3' >No existe ninguna asistencia todav\xEDa</h3>");
			}
        },
		error: function(respuesta){
			alert("Su sesi\xf3n se ha cerrado automaticamente.");delCookie("validar");location.href="#pageLogin";
		}
	});
}


function mostrarListaGruposModAsistencia(idAsignaturaSel){

	var cad = "[{\"id\":\"" + idAsignaturaSel + "\"}]";
	dniMod = dni;

	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'obtenerGruposAlumnoAsignatura',
			'datos': cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){

			arrayRespuesta = eval(respuesta);
			
			var i;

			var codhtml = '<select name="select-native-4Asis" id="cbGruposAlModAsis" >';
			codhtml= codhtml + '<option value="0" disabled selected> Seleccione grupo </option>';
			
			if(arrayRespuesta[0].length != 0){
				
				codhtml = codhtml + '<optgroup label="Teor\xeda">';
				for(i = 0; i < arrayRespuesta[0].length; i++){
					if(arrayRespuesta[0][i]["Turno"]=='M'){
						codhtml = codhtml + '<option value="'+arrayRespuesta[0][i]["idGrupo"]+'">Grupo '+arrayRespuesta[0][i]["Descripcion"]+' - Turno Ma\xf1ana</option>';
					}else{
						codhtml = codhtml + '<option value="'+arrayRespuesta[0][i]["idGrupo"]+'">Grupo '+arrayRespuesta[0][i]["Descripcion"]+' - Turno Tarde</option>';
					}
				}
				codhtml = codhtml + '</optgroup>';
				
			}

			if(arrayRespuesta[1].length != 0){
				codhtml = codhtml + '<optgroup label="Pr\xe1cticas">';
				for(i = 0; i < arrayRespuesta[1].length; i++){
						codhtml = codhtml + '<option value="'+arrayRespuesta[1][i]["idGrupo"]+'">Grupo '+arrayRespuesta[1][i]["Descripcion"]+' Horario: '+ arrayRespuesta[1][i]["hora_comienzo"] +' - ' + arrayRespuesta[1][i]["hora_fin"]+'</option>';	
				}
				codhtml = codhtml + '</optgroup>';
			}
			codhtml =codhtml + '</select>';

			$('#elegirGrupoModAsis').html(codhtml);
			$('#calificacionAlumnos').trigger('create');
			
			$('#cbGruposAlModAsis').change(function() {
				motrarListaAlumnosAsistMod($('#cbGruposAlModAsis').val());
			});
			
        },
		error: function(respuesta){
			alert("Su sesi\xf3n se ha cerrado automaticamente.");delCookie("validar");location.href="#pageLogin";
		},
		beforeSend: function(){
			$('#cargando4').show();
			$('#panelContenidoAsignaturaAlum').hide();
		},
		complete: function(){
			$('#cargando4').hide();
			$('#panelContenidoAsignaturaAlum').show();
		}
	});
	
}