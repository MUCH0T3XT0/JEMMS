
function muestraConfirmacion(objeto,id, num){
    swal("¿Estas seguro de querer agregar dicho(s) riesgo(s) al proyecto?", "Dicho(s) riesgo(s) se asociará(n) en automatico a este proyecto",{
        className: "boxstyle",

        icon: "warning",

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
    swal(alerta,  {
        icon: icono,
        dangerMode: true,
        buttons: {New: {text: "Aceptar"}},
        closeOnClickOutside: false,
        timer: 5000,
    });
}
window.addEventListener('load', function() {
    const wrapper = document.getElementById('tablaMostar_Riesgos_Globales');
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
                    name: 'Categoría',
                    formatter: (cell) => {    //Se mandan llamar las funciones para mostrar la descripción con color del riesgo
                        const category = categoriaMap[cell];
                        const color = categoriaColorMap[category];
                        return gridjs.html(`<span style="color: ${color};">${category}</span>`);
                    }
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
            url: `/proyecto/${variable}/agregar_riesgos`,
            then: data => data.riesgo.map(riesgo => [  
                riesgo.id_riesgo, 
                riesgo.description,
                riesgo.categoria,
                impactoMap[riesgo.impacto], //Usar el objeto de mapeo de impacto dependiendo del número definido en la función
                probabilidadMap[riesgo.probabilidad], //Usar el objeto de mapeo de probabilidad dependiendo del número definido en la función
                riesgo.estrategia_m,
            ])
        },
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

    const selectedItems = [];
    const newItem = [];
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