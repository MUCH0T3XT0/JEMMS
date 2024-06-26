window.addEventListener('load', function() {
    console.log("Hola");   
    const id_proyecto = document.getElementById('idP').getAttribute('value');
    const lider = (document.getElementById('verificacion').getAttribute('value') === "true")? true:false;
    console.log(lider);
    const wrapper = document.getElementById('tablaMostar_riesgos');
    const variable = wrapper.getAttribute('value');

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

    if(lider){
        console.log("entro lider");
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
                                onClick: () => window.location.href = `/proyecto/${id_proyecto}/${row.cells[5].data}/editar_riesgo`
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
                                onClick: () => { muestraElimina(row.cells[5].data)}
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
                    riesgos.id_riesgo,
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
    }else{
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
                    riesgos.id_riesgo,
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
    }
        
});

function muestraElimina(id_riesgo){
    swal("¿Estas seguro de que quieres eliminar este riesgo?", "Esta accion no se puede deshacer", {
        className: "boxstyle",

        dangerMode: true,
        
        buttons: {
            cancel: true,

            New: {
                text: "Eliminar riesgo",

                visible: true,

                className: "buttonstyle",
            }
        },
    })
    .then((borrar)=>{
        if (borrar) {
            eliminaRiesgo(id_riesgo);
        }
    })
    ;
}

async function eliminaRiesgo(id_riesgo){
    const id_proyecto = document.getElementById('idP').getAttribute('value');
    console.log(id_proyecto);

    console.log("entro aca");
    console.log(id_riesgo);
    const url = "/proyecto/"+id_proyecto+"/"+id_riesgo+"/eliminarRiesgo";
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id_riesgo: id_riesgo})
    })

    console.log(response.ok);

    if(response.ok){
        window.location.href = "/proyecto/"+id_proyecto+"/mostrar_riesgos";
    }else{
        console.log("Error en la BD");
    }
}