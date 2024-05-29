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