const boton = document.getElementById('ingresar_datos');

boton.addEventListener('click', function(event){
    let nombre = document.getElementById("nombre").value;
    let apellido_p = document.getElementById("apellido_p").value;
    let apellido_m = document.getElementById("apellido_m").value;
    let contrasena = document.getElementById("contrasena").value;
    let rol = document.getElementById("rol").value;

    let vacio = document.getElementById('vacio');

    vacio.style.display = "none";

    if(!nombre || !apellido_p || !apellido_m  || !rol){
        vacio.style.display = "block";
    }else{
        verificacion(nombre, apellido_p, apellido_m, contrasena, rol);
    }
})

async function verificacion(nombre, apellido_p, apellido_m, contrasena, rol){
    const nombrevalido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;
    let msg_nombre = document.getElementById('msg_nombre');
    let msg_apellido_p = document.getElementById('msg_apellido_p');
    let msg_apellido_m = document.getElementById('msg_apellido_m');
    let id_editar = document.getElementById('id_editar').getAttribute('data-value');

    msg_nombre.style.display = "none";
    msg_apellido_p.style.display = "none";
    msg_apellido_m.style.display = "none";

    if(!nombrevalido.test(nombre)){
        msg_nombre.style.display = "block";

    }else if(!nombrevalido.test(apellido_p)){
        msg_apellido_p.style.display = "block";

    }else if(!nombrevalido.test(apellido_m)){
        msg_apellido_m.style.display = "block";

    }else{
        const url = `/usuario/${id_editar}/editar_usuario`;

        
        if(contrasena){
            const response = await fetch(url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({opcion: true, id: id_editar, nombre: nombre, apellido_m: apellido_m, apellido_p: apellido_p, contrasena: contrasena, rol: rol})
            })

            if(response.ok){
                swal("Se modificó exitosamente la informacion de este usuario", "Volverás a la pantalla anterior", {
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
            }
           
        }else{
            const response = await fetch(url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({opcion: false, id: id_editar, nombre: nombre, apellido_m: apellido_m, apellido_p: apellido_p, contrasena: contrasena, rol: rol})
            })

            if(response.ok){
                swal("Se modificó exitosamente la informacion de este usuario", "Volverás a la pantalla anterior", {
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
            }
        }
    }
}
