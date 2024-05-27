
window.addEventListener('load', function() {
    console.log("Comprobacion 1");   
    const wrapper = document.getElementById('tablaMostar_Riesgos_Globales');
    //const wrapper1 = document.getElementById('tablaMostar_colaboradores');
    console.log("Comprobacion 2");

        gridTable = new gridjs.Grid({
            columns: [
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
            url: "/proyecto/agregar_riesgos",
            then: data => data.riesgo.map(riesgo => [
                riesgo.description,
                riesgo.categoria,
                riesgo.impacto,
                riesgo.probabilidad,
                riesgo.estrategia_m,
            ])
        }
    }).render(wrapper);
/*
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
    */
});