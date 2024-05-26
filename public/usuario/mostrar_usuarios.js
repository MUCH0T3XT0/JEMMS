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
                id: 'correo',
                name: 'Correo Electrónico'
            },
            {
                name: "Editar",
              formatter: (_, row) => {
                return gridjs.h('button', {
                    className: ' btn btn-link',
                    onClick: () => alert(`Editing "${row.cells[0].data}" "${row.cells[1].data}"`)
                  }, 'Editar');
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
                usuario.correo
            ])
        }
    }).render(wrapper1);
});
