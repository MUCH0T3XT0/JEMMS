const boton = document.getElementById('ingresar_datos');

boton.addEventListener('click', function(event){
    let nombre = document.getElementById("nombre").value;
    let apellido_p = document.getElementById("apellido_p").value;
    let apellido_m = document.getElementById("apellido_m").value;
    let correo = document.getElementById("correo").value;
    let contrasena = document.getElementById("contrasena").value;
    let rol = document.getElementById("rol").value;

    let vacio = document.getElementById('vacio');
    let msg_correo = document.getElementById('msg_correo');
    let msg_nombre = document.getElementById('msg_nombre');
    let msg_apellido_p = document.getElementById('msg_apellido_p');
    let msg_apellido_m = document.getElementById('msg_apellido_m');

   
    vacio.style.display = "none";
    msg_correo.style.display = "none";
    msg_nombre.style.display = "none";
    msg_apellido_p.style.display = "none";
    msg_apellido_m.style.display = "none";

    const correovalido = /(\w|\.)+@appix\.mx/;
    const nombrevalido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;

    if(!nombre || !apellido_p || !apellido_m  || !rol || !correo || !contrasena){
        vacio.style.display = "block";

    }else if(!correovalido.test(correo)){
        msg_correo.style.display = "block";

    }else if(!nombrevalido.test(nombre)){
        msg_nombre.style.display = "block";

    }else if(!nombrevalido.test(apellido_p)){
        msg_apellido_p.style.display = "block";

    }else if(!nombrevalido.test(apellido_m)){
        msg_apellido_m.style.display = "block";

    }else{
        agregar(correo, nombre, apellido_m, apellido_p, contrasena, rol);
    }
})

async function agregar(correo, nombre, apellido_m, apellido_p, contrasena, rol){
    const url = "/usuario/agregar_usuario";

    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nombre: nombre, apellido_m: apellido_m, apellido_p: apellido_p, contrasena: contrasena, rol: rol, correo: correo})
    })

    if(response.ok){
        swal("Se agregó el usuario exitosamente", "Volverás a la pantalla anterior", {
            className: "boxstyle",

            icon: "success",

            dangerMode: true,
            
            buttons: {
                New: {
                    text: "Ok",

                    visible: true,

                    className: "buttonstyle",
                }
            },
        }).then((borrar)=>{
            if(borrar){
                window.location.href = "/usuario/mostrar_usuarios";
            }
        });
    }else if(response.status == 400){
        swal("El correo ya existe", "Intente con un correo diferente", {
            icon: "error",
            buttons: {
                New: {
                text: "Aceptar",

                visible: true,

                className: "buttonstyle"
                }
            }
        })
    }else{
        swal("¡Ha ocurrido un error en la base de datos!",{
            icon: "error",
            buttons: {
                New: {
                text: "Aceptar",

                visible: true,

                className: "buttonstyle"
                }
            }
        })
    }

}