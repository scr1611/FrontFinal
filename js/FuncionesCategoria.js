/// GET POST PUT DELET
function getCategoria(){
    $.ajax({
        url:"http://150.230.27.68:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarCategoria(respuesta);
        }
    });

}

function postCategoria(){
    if($("#name").val().length ==0 || $("#description").val().length ==0 ){
        alert("Todos los campos son obligatorios");
    }else{
        let cajas = {
            name:$("#name").val(),
            description:$("#description").val()
        };
        $.ajax({
            url:"http://150.230.27.68:8080/api/Category/save",
            type:"POST",
            datatype:"JSON",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success:function(respuesta){
                alert("se creo correctamente la categoria");
                window.location.reload();
            }
        });
    } 
}

function putCategoria(idBotonActualizar){
    console.log(idBotonActualizar);   
    if($("#name").val().length ==0 || $("#description").val().length ==0 ){
        alert("Todos los campos son obligatorios para actualizar");
    }else{ 
        let cajas = {
            id:idBotonActualizar,
            name:$("#name").val(),
            description:$("#description").val()
        };
        $.ajax({
            url:"http://150.230.27.68:8080/api/Category/update",
            type:"PUT",
            datatype:"JSON",
            contentType:"application/json",
            data: JSON.stringify(cajas),
            success:function(respuesta){
                alert("se Actualizo correctamente la categoria");
                window.location.reload();
            }
        });
    }
    
}



function deleteCategoria(idBotonBorrar){
    console.log(idBotonBorrar);
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Esta seguro de Borrar la categoria?',
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
            url:"http://150.230.27.68:8080/api/Category/" + idBotonBorrar,
            type:"DELETE",
            datatype:"JSON",
            contentType:"application/JSON",
            data:JSON.stringify(myData),
            success:function(respuesta){
               // alert("se Borro correctamente la categoria");
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

function pintarCategoria(respuesta){
    let myTable="<table class='table-auto w-full text-left whitespace-no-wrap'>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].id+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button class= 'inline-block px-6 py-2 border-2 border-purple-600 text-purple-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out' onclick='putCategoria("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button class='inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out' onclick='deleteCategoria("+respuesta[i].id+")'>Borrar</button>"; 
        myTable+="</tr>";
    }
    myTable+="</table";
    $("#resultado1").html(myTable);

}