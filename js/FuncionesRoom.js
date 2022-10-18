/// GET POST PUT DELET
function getRoom(){
    $.ajax({
        url:"http://150.230.27.68:8080/api/Room/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarRoom(respuesta);
        }
    });

}

function postRoom(){
    if($("#name").val().length ==0 || $("#hotel").val().length ==0 || $("#stars").val().length ==0 || $("#description").val().length ==0){
        alert("Todos los campos son obligatorios para crear la habitacion");
    }else{
        let cajas = {
            name:$("#name").val(),
            hotel:$("#hotel").val(),
            stars:$("#stars").val(),
            description:$("#description").val(),
            category:{id: + $("#select-category").val()}
        };
        console.log(cajas);
        $.ajax({
            url:"http://150.230.27.68:8080/api/Room/save",
            type:"POST",
            datatype:"JSON",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success:function(respuesta){
                alert("se creo correctamente la Habitacion");
                window.location.reload();
            }
        });
    }
}

function putRoom(idBotonActualizar){
    if($("#name").val().length ==0 || $("#hotel").val().length ==0 || $("#stars").val().length ==0 || $("#description").val().length ==0){
        alert("Todos los campos son obligatorios para Actualizar la habitacion");
    }else{
        let cajas = {
            id:idBotonActualizar,
            name:$("#name").val(),
            hotel:$("#hotel").val(),
            stars:$("#stars").val(),
            description:$("#description").val(),
            category:{id: + $("#select-category").val()}
        };
        console.log(cajas);
        $.ajax({
            url:"http://150.230.27.68:8080/api/Room/update",
            type:"PUT",
            datatype:"JSON",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success:function(respuesta){
                alert("se actualizo correctamente la Habitacion");
                window.location.reload();
            }
        });
    }
}

function deleteRoom(idBotonBorrar){
    console.log(idBotonBorrar);
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Esta seguro de Borrar la Habitacion?',
        text: "No podra revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Borrar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          let myData={
            id:idBotonBorrar
        };
    
        $.ajax({
            url:"http://150.230.27.68:8080/api/Room/" + idBotonBorrar,
            type:"DELETE",
            datatype:"JSON",
            contentType:"application/JSON",
            data:JSON.stringify(myData),
            success:function(respuesta){
                window.location.reload();
            }
        });

        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })

}

/////////////////////////////////////////////////

function pintarRoom(respuesta){
    let myTable="<table class=min-w-full text-center>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].id+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].hotel+"</td>";
        myTable+="<td>"+respuesta[i].stars+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].category.name+"</td>";
        myTable+="<td> <button class='inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out' onclick='deleteRoom("+respuesta[i].id+")'>Borrar</button>";
        myTable+="<td> <button class= 'inline-block px-6 py-2 border-2 border-purple-600 text-purple-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out' onclick='putRoom("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="</tr>";
    }
    myTable+="</table";
    $("#resultado1").html(myTable);

}

//////////////////////Get Category////////////////////7
function getRoom_Category(){
    $.ajax({
        url:"http://150.230.27.68:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let $select = $("#select-category");
            $.each(respuesta, function(id, name){
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
            })
        }
    });

}