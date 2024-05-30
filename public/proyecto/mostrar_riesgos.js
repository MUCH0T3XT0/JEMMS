window.addEventListener('load', function() {
    console.log("Hola");   
    const wrapper = document.getElementById('tablaMostar_riesgos');
    const variable = wrapper.getAttribute('value');
    console.log(variable);

    //En lugar de imprimir el número entero, muestra la descripción del valor numérico de categoría
    const categoriaMap = {
        1: 'Alcance',
        2: 'Tiempo',
        3: 'Calidad',
        4: 'Costo',
        5: 'Recursos'
    };

    //Ya definidas las categorías dependinedo del número les asginamos el color
    const categoriaColorMap = {
        'Alcance': '#4ed0d7',
        'Tiempo': '#4e80d7',
        'Calidad': 'orange',
        'Costo': '#4ef73c',
        'Recursos': '#ffdd1f'
    };

    //En lugar de imprimir el número entero, muestra la descripción del valor numérico de impacto
    const impactoMap = {
        1: 'Bajo',
        2: 'Medio',
        3: 'Alto',
    };
    
    //En lugar de imprimir el número entero, muestra la descripción del valor numérico de probabilidad
    const probabilidadMap = {
        1: 'Baja',
        2: 'Media',
        3: 'Alta',
    };

    gridTable = new gridjs.Grid({
        columns: [
            {
                id: 'description',
                name: 'Descripción del Riesgo'
            },
            {
                id: 'categoria',
                name: 'Categoría',
                formatter: (cell) => {    //Se mandan llamar las funciones para mostrar la descripción con color del riesgo
                    const category = categoriaMap[cell];
                    const color = categoriaColorMap[category];
                    return gridjs.html(`<span style="color: ${color};">${category}</span>`);
                }
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
                sort: false,
                formatter: (_, row) => {
                    return gridjs.h('div', { className: 'center-content' }, 
                        gridjs.h('button', {
                            className: 'btn btn-primary',
                            onClick: () => alert(`Editando "${row.cells[0].data}" "${row.cells[1].data}"`)
                        }, 'Editar')
                    );
                }
            },
            { //Se agregó la columna de eliminar
                name: "Eliminar",
                sort: false,
                formatter: (_, row) => {        //Centrar los botónes con center-content que está definido en el CSS
                    return gridjs.h('div', { className: 'center-content' }, 
                        gridjs.h('button', {
                            className: 'btn btn-danger',
                            onClick: () => {
                                if (confirm(`¿Estás seguro de que quieres eliminar el riesgo "${row.cells[0].data}"?`)) {
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
            url:  `/proyecto/${variable}/mostrar_tabla_riesgos`,
            then: data => data.riesgo.map( riesgos => [
                riesgos.description,
                riesgos.categoria,
                impactoMap[riesgos.impacto], //Usar el objeto de mapeo de impacto dependiendo del número definido en la función
                probabilidadMap[riesgos.probabilidad], //Usar el objeto de mapeo de probabilidad dependiendo del número definido en la función
                riesgos.estrategia_m,
            ])
        },//Dar estilo a la tabla 
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
    
});