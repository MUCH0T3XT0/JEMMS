window.addEventListener('load', function() {
    console.log("Hola");   
    const wrapper = document.getElementById('tablaMostar_riesgos');
    const variable = wrapper.getAttribute('value');
    console.log(variable);
    
    gridTable = new gridjs.Grid({
        columns: [
            {
                id: 'description',
                name: 'Descripción del Riesgo'
            },
            {
                id: 'categoria',
                name: 'Categoría'
            },
            {
                id: 'impacto',
                name: 'Impacto'
            },
            {
                id: 'probabilidad',
                name: 'Probabilidad',
            },
            {
                id: 'estretegia_m',
                name: 'Estrategia'
            },
            {
                name: "Editar",
              formatter: (_, row) => {
                return gridjs.h('button', {
                    className: ' btn btn-primary',
                    onClick: () => alert(`Editing "${row.cells[0].data}" "${row.cells[1].data}"`)
                  }, 'Editar');
              }
            }
        ],
        pagination: true,
        search: true,
        sort: true,
        server:{
            url:  `/proyecto/${variable}/mostrar_tabla_riesgos`,
            then: data => data.riesgo.map( riesgos => [
                riesgos.description,
                riesgos.categoria,
                riesgos.impacto,
                riesgos.probabilidad,
                riesgos.estrategia_m,
            ])
        }
    }).render(wrapper);
    
});