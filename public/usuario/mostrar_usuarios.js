window.addEventListener('load', function() {
    console.log("Hola");   
    const wrapper = document.getElementById('tablaMostar_lider');
    const wrapper1 = document.getElementById('tablaMostar_colaboradores');
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
            {
                name: "Editar Usuario",
                sort: false,
                formatter: (_, row) => {           //Center-content es la clase en el CSS que se agregó para que los botones estén centrados
                    return gridjs.h('div', { className: 'center-content' }, 
                        gridjs.h('button', {
                            className: 'btn btn-primary',
                            onClick: () => alert(`Editando "${row.cells[0].data}" "${row.cells[1].data}"`)
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
                            onClick: () => {
                                if (confirm(`¿Estás seguro de que quieres eliminar el usuario "${row.cells[0].data}"?`)) {
                                    // Aquí debes implementar la lógica para eliminar el riesgo
                                    alert(`Eliminando "${row.cells[0].data}"`);
                                }
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
});
