window.addEventListener('load', function() {
    console.log("Hola");   
    const wrapper = document.getElementById('tablaMostar_lider');
    const wrapper1 = document.getElementById('tablaMostar_colaboradores');
    console.log("ABC");

        gridTable = new gridjs.Grid({
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
                    id: 'nombre_proyecto',
                    name: 'Nombre del Proyecto'
                }
            ],
        pagination: true,
        search: true,
        sort: true,
        server:{
            url: "/usuario/mostrar_usuarios_lideres",
            then: data => data.usuario1.map(usuario => [
                usuario.id_usuario,
                usuario.nombres,
                usuario.apellido_p,
                usuario.nombre_proyecto
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
