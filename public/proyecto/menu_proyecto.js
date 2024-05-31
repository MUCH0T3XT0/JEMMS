function muestraAlerta(){
    let id_proyecto = document.getElementById('cambiarEstatus_boton').getAttribute('data-id');

    swal("¿Estas seguro de cambiar el estatus?", "El proyecto se cambiará a --inactivo--", {
        className: "boxstyle",

        dangerMode: true,
        
        buttons: {
            cancel: true,

            New: {
                text: "Cambiar estatus",

                visible: true,

                className: "buttonstyle",
            }
        },
    })
    .then((borrar)=>{
        if (borrar) {
            cambiarEstatus(id_proyecto);
        }
    })
    ;
}

async function cambiarEstatus(id_proyecto){
    console.log(id_proyecto);
    const url = "/proyecto/"+id_proyecto+"/cambiarEstatus";
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id_proyecto: id_proyecto})
    })

    console.log(response.ok);

    if(response.ok){
        window.location.href = "/proyecto/home";
    }else{
        console.log("Error en la BD");
    }
}

function muestraElimina(){
    let id_proyecto = document.getElementById('eliminar_boton').getAttribute('data-id');
    console.log(id_proyecto);

    swal("¿Estas seguro de que quieres eliminar el proyecto?", "Esta accion no se puede deshacer", {
        className: "boxstyle",

        dangerMode: true,
        
        buttons: {
            cancel: true,

            New: {
                text: "Eliminar proyecto",

                visible: true,

                className: "buttonstyle",
            }
        },
    })
    .then((borrar)=>{
        if (borrar) {
            eliminaProyecto(id_proyecto);
        }
    })
    ;
}

async function eliminaProyecto(id_proyecto){
    console.log("entro aca");
    console.log(id_proyecto);
    const url = "/proyecto/"+id_proyecto+"/eliminarProyecto";
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id_proyecto: id_proyecto})
    })

    console.log(response.ok);

    if(response.ok){
        window.location.href = "/proyecto/home";
    }else{
        console.log("Error en la BD");
    }
}