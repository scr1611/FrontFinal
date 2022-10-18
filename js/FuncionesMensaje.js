/// GET POST PUT DELET
function getMensaje(){
    $.ajax({
        url:"http://150.230.27.68:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarMensaje(respuesta);
        }
    });

}

function postMensaje(){
    let cajas = {
        messageText:$("#messageText").val()
    };
    $.ajax({
        url:"http://150.230.27.68:8080/api/Message/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se creo correctamente el mensaje");
            window.location.reload();
        }
    });
}

function putMensaje(){

}

function deleteMensaje(){

}

/////////////////////////////////////////////////

function pintarMensaje(respuesta){
    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="</tr>";
    }
    myTable+="</table";
    $("#resultado1").html(myTable);

}