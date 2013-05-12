function addSelectTitulacion(){
	var cad = "[]";

	$.ajax({
		type : "GET",
		url : p_url,
		dataType : 'jsonp',
		data : {
			'm' : 'ltit',
			'datos' : cad
		},
		contentType : 'application/json; charset=utf-8',
		success : function(respuesta) {

			// titulaciones

			arrayRespuesta = eval(respuesta);

			var i;

			var codhtml = '<select id="menuTitulaciones" name="titulacion" required>';

			if (arrayRespuesta.length != 0) {
				// Opción por defecto
				codhtml = codhtml
						+ '<option value="" disabled="disabled" selected>'
						+ "Eliga una titulaci\xF3n" + '</option>';
				for (i = 0; i < arrayRespuesta.length; i++) {
					codhtml = codhtml + '<option value="'
							+ arrayRespuesta[i]["id"] + '">'
							+ arrayRespuesta[i]["nombre"] + '</option>';
				}
				codhtml = codhtml + '</select>';
				codhtml = codhtml + '<br></div>';

				$('#reTitulacion').html(codhtml);
				$('#menuTitulaciones').selectmenu();
			}



			// $('#botonAnadirAsignatura').button();
		},
		error : function(respuesta) {
			alert("Su sesi\xf3n se ha cerrado automaticamente.");
			delCookie("validar");
			location.href="#pageLogin";
		},
		beforeSend : function() {
			$('#cargando2').show();
			$('#divFormRegister').hide();
		},
		complete : function() {
			$('#cargando2').hide();
			$('#divFormRegister').show();
		}
	});

}

function peticionRegistro(){
	var cad = "[" + JSON.stringify($("#formRegister").serializeObject()) + "]";
	cad = cad.substring(0, cad.indexOf('pass'));
	cad = cad + 'pass":"' + hex_sha1($('#password').val())+'"}]';
	cad.replace(" ","%20");
	alert(cad);

	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'reg',
			'datos':cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			arrayRespuesta = eval(respuesta);
            if (arrayRespuesta["ok"] == 0){
				alert('Registro incorrecto');
				navigator.notification.alert('Registro incorrecto',null,'Registro', 'Aceptar');
			}else{
				location.href='#pageLogin';
			}
		},
		error: function(respuesta){
			alert("Su sesi\xf3n se ha cerrado automaticamente.");delCookie("validar");location.href="#pageLogin";
		}
	});
}