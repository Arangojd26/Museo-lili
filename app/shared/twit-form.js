$('#test').click(function() {
    var esperar = 500;
    $.ajax({
        url: "app/getData.php",
        beforeSend: function() {
            $('#messageGet').text(' Cargando...');
        },
        success: function(data) {
            setTimeout(function() {
                $('#messageGet').html(data);
                console.log(data);
            }, esperar);
        }
    });
});

$("#formulario-twitter").submit(function(event){
    event.preventDefault(); //Almacena los datos sin refrescar el sitio web.
    enviar();
});

function enviar(){
    console.log("ejecutado");
    var datos = $("#formulario-twitter").serialize(); //Toma los datos name y los guarda en un arreglo.
    $.ajax({ //Envía los datos a formulario php, sin actualizar la pagina.
        type: "post",
        url:"app/getData.php",
        data: datos,
        success: function(texto){
            if(texto=="exito"){
                correcto();
            }else{
                phpError(texto);  
            }
        }
    })
}

function correcto(){
	console.log("si mandó exitooooooo");
    $("#mensajeExito").removeClass("d-none");
    $("#mensajeError").addClass("d-none");
	

}

function phpError(texto){
    $("#mensajeError").removeClass("d-none");
    $("#mensajeError").html(texto);
}
