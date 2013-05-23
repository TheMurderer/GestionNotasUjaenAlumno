var dni='';


/**
 * Funcion para almacenar los valores de recuerdame
 */
function leerDatosUsuario(){

   var check = window.localStorage.getItem("check");
   if(check=='true'){

	   var email = window.localStorage.getItem("correo");
	   var pass = window.localStorage.getItem("pass");  
	   $("#passwordinput").val(pass.toString());
	   $("#textinput").val(email.toString());
	   $("#checkRec").attr('checked', true);  
	   $("#checkRec").attr("checked",true).checkboxradio("refresh");
	   $("#pageLogin").trigger('update');
	   
   }
}

function comprobarDatosUsuario(){
	 var check = $("#checkRec").attr('checked');

	 if(check =='checked'){
	
		var pass = $("#passwordinput").val();
		var email = $("#textinput").val(); 

		window.localStorage.setItem("pass",pass.toString());
		window.localStorage.setItem("correo",email.toString());
		window.localStorage.setItem("check","true");

	 }else{

		 var check = window.localStorage.getItem("check");
		 if(check == 'true'){
			 window.localStorage.removeItem("correo");
			 window.localStorage.removeItem("pass");
			 window.localStorage.setItem("check","false"); 
		 }
		 
	 }
	
}

function peticionLogin(){

	console.log($('#formLogin').serialize());

	var cad = "[" + JSON.stringify($("#formLogin").serializeObject()) + "]";
	cad= cad.substring(0, cad.lastIndexOf("\"pass\":"));
	cad = cad + '"pass":"' + hex_sha1($('#passwordinput').val()) + '"}]';

	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'log',
			'datos':cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			arrayRespuesta = eval(respuesta);
            if (arrayRespuesta["ok"] == 0){
				alert('Login incorrecto');
				navigator.notification.alert('Acceso incorrecto',null,'Login', 'Aceptar');
			}else{
				//Guardamos el Id de la sessi�n
				document.cookie= "validar=true";
				resetTimer();
				idSesion = arrayRespuesta["sesion"];
				 //Lista de asignaturas del profesor
				location.href = "#pageSignatures";
				//
				peticionAsignaturas();
				almacenarDNI();
				comprobarDatosUsuario();
			}
		},
		error: function(respuesta){
			alert("Su sesi\xf3n se ha cerrado automaticamente.");delCookie("validar");location.href="#pageLogin";
		}
	});
}

function almacenarDNI(){
	var cad='';
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'obtenerDNI',
			'datos':cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			arrayRespuesta = eval(respuesta);
            dni= arrayRespuesta["dni"];

			
		},
		error: function(respuesta){
			alert("Su sesi\xf3n se ha cerrado automaticamente.");delCookie("validar");location.href="#pageLogin";
		}
	});
	
}