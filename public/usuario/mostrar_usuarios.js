window.addEventListener('load', function() {
    console.log("Hola");   
    const wrapper = document.getElementById('tablaMostar_lider');
    const wrapper1 = document.getElementById('tablaMostar_colaboradores');
    const valor = (wrapper.dataset.value === "true")? true : false;
    
    console.log("ABC");

        gridTable = new gridjs.Grid({
            columns: [
                {
                    id: 'nombre_proyecto',
                    name: 'Nombre del Proyecto'
                },
                {
                    id: 'id_usuario',
                    name: 'ID Usuario'
                },
                {
                    id: 'nombres',
                    name: 'Nombres'
                },
                {
                    id: 'apellido_p',
                    name: 'Apellido Paterno'
                },
            ],
        pagination: true,
        search: true,
        sort: true,
        server:{
            url: "/usuario/mostrar_usuarios_lideres",
            then: data => data.usuario1.map(usuario => [
                usuario.nombre_proyecto,
                usuario.id_usuario,
                usuario.nombres,
                usuario.apellido_p
            ])
        },//Se agregó la modificación de estilos en la tabla 
        style: {
            table: {
                border: '3px solid rgb(15, 28, 167)'
                },
                th: {
                'background-color': 'rgba(15, 28, 167, 0.345)',
                color: '#000',
                'border-bottom': '3px solid rgb(15, 28, 167)',
                'text-align': 'center'
                }
                /*td: {
                'text-align': 'center'
                }*/            
          }        
    }).render(wrapper);

    console.log(valor);
    console.log(!valor);
    if(valor){
        console.log("entro");
        gridTable1 = new gridjs.Grid({
            columns: [
                {
                    id: 'id_usuario',
                    name: 'ID Usuario'
                },
                {
                    id: 'nombres',
                    name: 'Nombres'
                },
                {
                    id: 'apellido_p',
                    name: 'Apellido Paterno'
                },
                {
                    id: 'rol',
                    name: 'Rol del Usuario',
                    formatter: (cell) => {
                        return cell === 1 ? 'Administrador' : 'Colaborador';
                    }
                },
                {
                    id: 'correo',
                    name: 'Correo Electrónico'
                },
                {
                    name: "Editar Usuario",
                    sort: false,
                    formatter: (_, row) => {           //Center-content es la clase en el CSS que se agregó para que los botones estén centrados
                        return gridjs.h('div', { className: 'center-content' }, 
                            gridjs.h('button', {
                                className: 'btn btn-primary',
                                onClick: () => window.location.href = `/usuario/${row.cells[0].data}/editar_usuario`
                            }, 'Editar')
                        );
                    }
                },
                {//Se agregó el botón de eliminar usuario 
                    name: "Eliminar Usuario",
                    sort: false,
                    formatter: (_, row) => {
                        return gridjs.h('div', { className: 'center-content' }, 
                            gridjs.h('button', {
                                className: 'btn btn-danger',
                                onClick: () => { muestraElimina(row.cells[0].data);
                                }
                            }, 'Eliminar')
                        );
                    }
                }
            ],
            pagination: true,
            search: true,
            sort: true,
            server:{
                url: "/usuario/mostrar_usuarios_colaboradores",
                then: data => data.usuario2.map(usuario => [
                    usuario.id_usuario,
                    usuario.nombres,
                    usuario.apellido_p,
                    usuario.rol,
                    usuario.correo
                ])
            },//Se agregó la opción de darle estilo a la tabla
            style: {
                table: {
                    border: '3px solid rgb(15, 28, 167)'
                    },
                    th: {
                    'background-color': 'rgba(15, 28, 167, 0.345)',
                    color: '#000',
                    'border-bottom': '3px solid rgb(15, 28, 167)',
                    'text-align': 'center'
                    }
                    /*td: {
                    'text-align': 'center'
                    }*/
                }
        }).render(wrapper1);
    }else{
        console.log("mortales");
        gridTable1 = new gridjs.Grid({
            columns: [
                {
                    id: 'id_usuario',
                    name: 'ID Usuario'
                },
                {
                    id: 'nombres',
                    name: 'Nombres'
                },
                {
                    id: 'apellido_p',
                    name: 'Apellido Paterno'
                },
                {
                    id: 'rol',
                    name: 'Rol del Usuario',
                    formatter: (cell) => {
                        return cell === 1 ? 'Administrador' : 'Colaborador';
                    }
                },
                {
                    id: 'correo',
                    name: 'Correo Electrónico'
                },
            ],
            pagination: true,
            search: true,
            sort: true,
            server:{
                url: "/usuario/mostrar_usuarios_colaboradores",
                then: data => data.usuario2.map(usuario => [
                    usuario.id_usuario,
                    usuario.nombres,
                    usuario.apellido_p,
                    usuario.rol,
                    usuario.correo
                ])
            },//Se agregó la opción de darle estilo a la tabla
            style: {
                table: {
                  border: '3px solid #ccc'
                },
                th: {
                  'background-color': 'rgba(0, 0, 0, 0.1)',
                  color: '#000',
                  'border-bottom': '3px solid #ccc',
                  'text-align': 'center'
                }
                /*td: {
                  'text-align': 'center'
                }*/
              }
        }).render(wrapper1);
    }
});


function muestraElimina(id_usuario){
    console.log(id_usuario);

    swal("¿Estas seguro de que quieres eliminar este usuario?", "Esta accion no se puede deshacer", {
        className: "boxstyle",

        dangerMode: true,
        
        buttons: {
            cancel: true,

            New: {
                text: "Eliminar usuario",

                visible: true,

                className: "buttonstyle",
            }
        },
    })
    .then((borrar)=>{
        if (borrar) {
            eliminaUsuario(id_usuario);
        }
    })
    ;
}

async function eliminaUsuario(id_usuario){
    console.log("entro aca");
    console.log(id_usuario);

    const url = "/usuario/"+id_usuario+"/eliminarUsuario";
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id_usuario: id_usuario})
    })

    console.log(response.ok);

    if(response.ok){
        window.location.href = "/usuario/mostrar_usuarios";
    }else{
        swal("¡El Usuario seleccionado es lider de un proyecto!", "Cambia el lider del proyecto al cual el usuario está asociado", {
            className: "boxstyle",
    
            dangerMode: true,
            
            buttons: {
                cancel: true,
            },
        })
    }
}