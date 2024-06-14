window.addEventListener('load', function() {
    console.log("Hola");   
    const wrapper = document.getElementById('tablaMostar_lider');
    const wrapper1 = document.getElementById('tablaMostar_colaboradores');
    const wrapper2 = document.getElementById('tablaMostar_colaboradores1');
    variable = wrapper.getAttribute('data-value1');
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
        server:{
            url: "/usuario/"+variable+"/mostrar_usuarios_lideres_por_proyecto",
            then: data => data.usuario1.map(usuario => [
                usuario.nombre_proyecto,
                usuario.id_usuario,
                usuario.nombres,
                usuario.apellido_p
            ])
        },//Se agregó la modificación de estilos en la tabla 
        style: {
            table: {
              border: '3px solid #ccc'
            },
            th: {
              'background-color': 'rgba(0, 0, 0, 0.1)',
              color: '#000',
              'border-bottom': '3px solid #ccc',
              'text-align': 'center'
            },
            td: {
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
                name: "",
                sort: false,
                formatter: (_, row) => {
                    return liderazgo || rol ? gridjs.h('div', { className: 'center-content' }, 
                        gridjs.h('button', {
                            className: 'btn btn-info',
                            onClick: () => { muestraLider(row.cells[0].data);
                            }
                        }, 'Asignar como lider')
                    ): '';
                }
            },
            {//Se agregó el botón de agregar colaborador 
                id: 'expulsar',
                name: "",
                sort: false,
                formatter: (_, row) => {
                    return liderazgo || rol ? gridjs.h('div', { className: 'center-content' }, 
                        gridjs.h('button', {
                            className: 'btn btn-danger',
                            onClick: () => { muestraEliminaColaborador(row.cells[0].data);
                            }
                        }, 'Expulsar del proyecto')
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
            border: '3px solid #ccc'
            },
            th: {
            'background-color': 'rgba(0, 0, 0, 0.1)',
            color: '#000',
            'border-bottom': '3px solid #ccc',
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
    const wrapper = document.getElementById('tablaMostar_lider');
    variable = wrapper.getAttribute('data-value1');

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
    }).then((borrar)=>{
        if (borrar) {
            location.reload();
        }
    });
}


async function eliminarColaborador(id_usuario){
    const wrapper = document.getElementById('tablaMostar_lider');
    variable = wrapper.getAttribute('data-value1');

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
    }).then((borrar)=>{
        if (borrar) {
            location.reload();
        }
    });
}

async function cambiarLiderazgo(id_usuario){
    const wrapper = document.getElementById('tablaMostar_lider');
    variable = wrapper.getAttribute('data-value1');

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
    }).then((borrar)=>{
        if (borrar) {
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
        }
    });
}
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
    const wrapper = document.getElementById('tablaMostar_lider');
    id_proyecto = wrapper.getAttribute('data-value1');
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
function muestraEliminaColaborador(id_usuario){
    console.log(id_usuario);

    swal("¿Estas seguro de que quieres expulsar al colaborador del proyecto?", "Esta accion no se puede deshacer", {
        className: "boxstyle",

        dangerMode: true,
        
        buttons: {
            cancel: true,

            New: {
                text: "Expulsar",

                visible: true,

                className: "buttonstyle",
            }
        },
    })
    .then((borrar)=>{
        if (borrar) {
            eliminarColaborador(id_usuario);
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





function muestraConfirmacion(objeto,id, num){
    swal("¿Estas seguro de querer agregar dicha dicho/s riesgo/s al proyecto?", "Dicho/s riesgo/s se asociara/n en automatico a este proyecto",{
        className: "boxstyle",

        dangerMode: true,
        
        buttons: {
            cancel: true,

            New: {
                text: "Aceptar",

                visible: true,

                className: "buttonstyle",
            }
        },
    })
    .then((borrar)=>{
        if (borrar) {
            FuncionAgregar(objeto, id);
        }
    })
    ;
}
function muestraAlerta(alerta, icono){
    swal("Alerta", 
        alerta, 
        icono, {
        dangerMode: true,
        buttons: {New: {text: "Aceptar"}},
        closeOnClickOutside: false,
        timer: 5000,
    });
}
window.addEventListener('load', function() {
    const wrapper = document.getElementById('tablaMostar_Riesgos_Globales');
    const variable = wrapper.getAttribute('value');

        gridTable = new gridjs.Grid({
            columns: [
                {
                    id: 'select',
                    name: 'Seleccionar',
                    formatter: (_, row) => gridjs.html(`<input type="checkbox" class="select-row" data-id="${row.cells[0].data}" data-description="${row.cells[1].data}" data-categoria="${row.cells[2].data}" data-impacto="${row.cells[3].data}" data-probabilidad="${row.cells[4].data}" data-estrategia_m="${row.cells[5].data}"/>`)
                },
                {
                    id: 'description',
                    name: 'Descripcion del riesgo'
                },
                {
                    id: 'categoria',
                    name: 'Categoria de riesgo'
                },
                {
                    id: 'impacto',
                    name: 'Impacto de riesgo'
                },
                {
                    id: 'probabilidad',
                    name: 'Probabilidad del riesgo'
                },
                {
                    id: 'estrategia_m',
                    name: 'Estrategia  de Mitigacion'
                }
            ],
        pagination: true,
        search: true,
        sort: true,
        server:{
            url: "/proyecto/${variable}/agregar_riesgos",
            then: data => data.riesgo.map(riesgo => [
                riesgo.id_riesgo,
                riesgo.description,
                riesgo.categoria,
                riesgo.impacto,
                riesgo.probabilidad,
                riesgo.estrategia_m,
            ])
        }
    }).render(wrapper);

    const selectedItems = [];
    var numselectedItems= 0;

    wrapper.addEventListener('change', function(event) {
        if (event.target.classList.contains('select-row')) {
            const checkbox = event.target;
            const id = checkbox.getAttribute('data-id');
            const D_categoria = checkbox.getAttribute('data-categoria');
            const D_impacto = checkbox.getAttribute('data-impacto');
            const D_probabilidad = checkbox.getAttribute('data-probabilidad');
            const D_estrategia = checkbox.getAttribute('data-estrategia_m');
            const D_description = checkbox.getAttribute('data-description');
            if (checkbox.checked) {
                selectedItems.push({D_categoria: D_categoria, D_impacto: D_impacto, D_probabilidad: D_probabilidad, D_estrategia: D_estrategia, D_description: D_description});
                //alert('Se selecciono los siguientes riesgos en el proyecto ' + variable);
                //alert(JSON.stringify(selectedItems, null, 2));
                numselectedItems +=1;
            } else {
                const index = selectedItems.findIndex(item => item.id === id);
                selectedItems.splice(index, 1);
                numselectedItems= numselectedItems - 1;
                //alert("Se deselecciona");
            }
        }
    });

    const Buton1= document.getElementById('AgregarRiesgoBoton');
    const Buton2 = document.getElementById('CrearRiesgoBoton');
    
    Buton1.addEventListener('click', function(event) {
        event.preventDefault();
        console.log(selectedItems);
        console.log(typeof(selectedItems[0].D_categoria));
        var mensaje= "Se agregara el siguiente numero de riesgos al proyecto" + numselectedItems;
        console.log(mensaje);
        muestraAlerta(mensaje, "warning");
        muestraConfirmacion(selectedItems, variable, numselectedItems);
        
    });
    Buton2.addEventListener('click', function(event) {
        const desc = document.getElementById('descripcion');
        const vdescripcion = desc.value;

        const impa = document.getElementById('impacto');
        const vimpacto = impa.value;

        const cate = document.getElementById('categoria');
        const vcategoria = cate.value;

        const prob = document.getElementById('probabilidad');
        const vprobabilidad = prob.value;

        const estr = document.getElementById('estrategia');
        const vestrategia = estr.value;
        if (vdescripcion.length ==0 || vimpacto == 0 || vcategoria == 0 || vprobabilidad == 0 || vestrategia.length ==0){
            muestraAlerta("Error al crear riesgo: Los datos no fueron rellenados en su totalidad", "warning");
            newItem = [];
        }else{
            console.log("Si llego");
            newItem.push({D_categoria: vcategoria, D_impacto: vimpacto, D_probabilidad: vprobabilidad, D_estrategia: vestrategia, D_description: vdescripcion})
            muestraConfirmacion(newItem, variable, 1);
            newItem = [];
        }
        
    });
});
async function FuncionAgregar(selectedItems, variable){
    if (selectedItems.length != 0) {
        const url = '/proyecto/'+variable+'/agregar_riesgos';
        console.log(url);

        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({selectedItems: selectedItems})
        })
        .then(response => {
            if(!response.ok){
                throw new Error("HTTP error " + response.status);;
            }
        })
        .then(data => {
            console.log('Success:', data);
            muestraAlerta('Riesgo(s) agregado(s) con éxito', "success");
        })
        .catch((error) => {
            console.error('Error:', error);
            muestraAlerta('Hubo un error al agregar el/los riesgo(s).', "warning");
        });

        console.log(response);

    } else {
        muestraAlerta('Por favor, selecciona al menos un riesgo.', "warning");
    }
}













