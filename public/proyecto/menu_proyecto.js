window.addEventListener('load', function() {
    console.log("Hola");   
    const wrapper = document.getElementById('tablaMostar_lider');
    const wrapper1 = document.getElementById('tablaMostar_colaboradores');
    const wrapper2 = document.getElementById('tablaMostar_colaboradores1');
    const variable = wrapper.getAttribute('data-value1');
    liderazgo = (wrapper.getAttribute('data-value2')=="true")? true:false;
    rol = (wrapper.getAttribute('data-value3')=="true")? true: false;

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
            sort: true,
            server:{
                url: `/usuario/${variable}/mostrar_usuarios_lideres_por_proyecto`,
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
            },
            td: {
                'background-color': 'white',
                'text-align': 'center'            
            }
        }        
    }).render(wrapper);
    
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
            {//Se agregó el botón de agregar colaborador 
                name: "Agregar colaborador",
                sort: false,
                formatter: (_, row) => {
                    return gridjs.h('div', { className: 'center-content' }, 
                        gridjs.h('button', {
                            className: 'btn btn-success',
                            onClick: () => { muestraAgrega(row.cells[0].data);
                            }
                        }, 'Agrega al proyecto')
                    );
                }
            }
        ],
        pagination: true,
        search: true,
        sort: true,
        server:{
            url: "/usuario/"+variable+"/agregar_usuarios_colaboradores",
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
        },
        language: {
            search: {
                placeholder: 'Buscar...'
            },
            pagination: {
                previous: 'Anterior',
                next: 'Siguiente',
                showing: 'Mostrando',
                results: () => 'resultados'
            },
            loading: 'Cargando...',
            noRecordsFound: 'Sin usuarios para agregar al proyecto',
            error: ' '
        }
    }).render(wrapper2);
    gridTable2 = new gridjs.Grid({
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
            {//Se agregó el botón de agregar colaborador 
                id: 'liderar',
                name: "Asignar como Líder",
                sort: false,
                formatter: (_, row) => {
                    return liderazgo || rol ? gridjs.h('div', { className: 'center-content' }, 
                        gridjs.h('button', {
                            className: 'btn btn-info',
                            onClick: () => { muestraLider(row.cells[0].data);
                            }
                        }, 'Asignar')
                    ): '';
                }
            },
            {//Se agregó el botón de agregar colaborador 
                id: 'expulsar',
                name: "Expulsar del Proyecto",
                sort: false,
                formatter: (_, row) => {
                    return liderazgo || rol ? gridjs.h('div', { className: 'center-content' }, 
                        gridjs.h('button', {
                            className: 'btn btn-danger',
                            onClick: () => { muestraElimina(row.cells[0].data);
                            }
                        }, 'Expulsar')
                    ): '';
                }
            }
        ],
        pagination: true,
        search: true,
        sort: true,
        server:{
            url: "/usuario/"+variable+"/mostrar_usuarios_colaboradores_por_proyecto",
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
              },
              td: {
                  'background-color': 'white',
                  'text-align': 'center'            
              }
        },
        language: {
            search: {
                placeholder: 'Buscar...'
            },
            pagination: {
                previous: 'Anterior',
                next: 'Siguiente',
                showing: 'Mostrando',
                results: () => 'resultados'
            },
            loading: 'Cargando...',
            noRecordsFound: 'Sin colaboradores en el proyecto',
            error: ' '
        }
    }).render(wrapper1);
});

async function agregarColaborador(id_usuario){
    const wrapper2 = document.getElementById('tablaMostar_colaboradores1');
    variable = wrapper2.getAttribute('value');

    console.log("entro aca");
    console.log(id_usuario);
    console.log(variable);

    const url = "/usuario/agregar_usuarios_colaboradores";
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: id_usuario, id_proyecto: variable})
    })
    swal("Colaborador agregado con exito", " Se agrego al colaborador de la vase de datos", {
        className: "boxstyle",

        dangerMode: true,
        
        buttons: {
            New: {
                text: "Ok",

                visible: true,

                className: "buttonstyle",
            }
        },
    });
}


async function eliminarColaborador(id_usuario){
    const wrapper2 = document.getElementById('tablaMostar_colaboradores');
    variable = wrapper2.getAttribute('value');

    console.log("entro aca");
    console.log(id_usuario);
    console.log(variable);

    const url = "/usuario/eliminar_usuarios_colaboradores";
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: id_usuario, id_proyecto: variable})
    })

    console.log(response.ok);
    swal("Colaborador eliminado con exito", " Se elimino al colaborador de la vase de datos", {
        className: "boxstyle",

        dangerMode: true,
        
        buttons: {
            New: {
                text: "Ok",

                visible: true,

                className: "buttonstyle",
            }
        },
    });
}

async function cambiarLiderazgo(id_usuario){
    const wrapper2 = document.getElementById('tablaMostar_colaboradores');
    variable = wrapper2.getAttribute('value');

    console.log("entro aca");

    const url = "/usuario/cambiar_liderazgo";

    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: id_usuario, id_proyecto: variable})
    })

    console.log(response.ok);
    swal("Cambio de lider exitoso", " Ya no tendras acceso a permisos de lider", {
        className: "boxstyle",

        dangerMode: true,
        
        buttons: {
            New: {
                text: "Ok",

                visible: true,

                className: "buttonstyle",
            }
        },
    });
}


function muestraElimina(id_usuario){
    console.log(id_usuario);

    swal("¿Estas seguro de que quieres expulsar este colaborador del proyecto?", "El cambio no puede ser revertido una vez realizado", {
        className: "boxstyle",

        dangerMode: true,
        
        buttons: {
            cancel: true,

            New: {
                text: "Expulsar Colaborador",

                visible: true,

                className: "buttonstyle",
            }
        },
    })
    .then((borrar   )=>{
        if (borrar) {
            eliminarColaborador(id_usuario);
            location.reload();
        }
    });
}

function muestraAgrega(id_usuario){
    console.log(id_usuario);

    swal("¿Estas seguro de que quieres agregar este usuario?", "Se asignara autimaticamente a este proyecto", {
        className: "boxstyle",

        dangerMode: true,
        
        buttons: {
            cancel: true,

            New: {
                text: "Agregar Colaborador",

                visible: true,

                className: "buttonstyle",
            }
        },
    })
    .then((borrar)=>{
        if (borrar) {
            agregarColaborador(id_usuario);
            location.reload();
        }
    });
}
function muestraLider(id_usuario){

    swal("¿Quieres transferir el liderazgo a este colaborador?", "Se transferira tu rol y ya no tendras acceso de lider", {
        className: "boxstyle",

        dangerMode: true,
        
        buttons: {
            cancel: true,

            New: {
                text: "Cambiar liderazgo",

                visible: true,

                className: "buttonstyle",
            }
        },
    })
    .then((cambiar)=>{
        if (cambiar) {
            cambiarLiderazgo(id_usuario);
            location.reload();
        }
    });
}