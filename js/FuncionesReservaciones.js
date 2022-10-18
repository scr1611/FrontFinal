/// GET POST PUT DELET
function getReservaciones(){
    $.ajax({
        url:"http://150.230.27.68:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarReservacion(respuesta);
            console.log(respuesta);
        }
    });

}

function postReservacion(){
    if($("#startDate").val().length ==0 || $("#devolutionDate").val().length ==0){
        alert("Todos los campos son obligatorios para crear la Reservacion");
    }else{
        let cajas = {
            startDate:$("#startDate").val(),
            devolutionDate:$("#devolutionDate").val(),
            status:$("#status").val(),
            room:{id: +$("#select-room").val()},
            client:{idClient: +$("#select-client").val()}
        };
        ///console.log(cajas);
        $.ajax({
            url:"http://150.230.27.68:8080/api/Reservation/save",
            type:"POST",
            datatype:"JSON",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success:function(respuesta){
                alert("se creo correctamente la reservacion");
                window.location.reload();
            }
        });
    }
}

function putReservacion(){

}

function deleteReservacion(){

}

/////////////////////////////////////////////////

function pintarReservacion(respuesta){
    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].room.name+"</td>";
        myTable+="<td> <button onclick='deleteReservacion"+respuesta[i].idReservation+")'>Borrar</button>";
        myTable+="<td> <button onclick='putReservacion("+respuesta[i].idReservation+")'>Actualizar</button>";
        myTable+="</tr>";
    }
    myTable+="</table";
    $("#resultado1").html(myTable);

}

/////////////////////Get Room/////////////////////////////////////
function getCliente_Reservaciones(){
    $.ajax({
        url:"http://150.230.27.68:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta)
            let $select = $("#select-client");
            $.each(respuesta, function(id, name){
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
            })
        }
    });
}    
function getRoom_Reservaciones(){
    $.ajax({
        url:"http://150.230.27.68:8080/api/Room/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta)
            let $select = $("#select-room");
            $.each(respuesta, function(id, name){
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
            })
        }
    });
}