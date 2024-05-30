
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

        FuncionAgregar(selectedItems, variable);
        
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
        if (vdescripcion.length ==0){
            alert("Error al crear riesgo: Sin descripcion cargada");
        }
        if (vimpacto == 0){
            alert("Error al crear riesgo: Sin impacto seleccionado");
        }
        if (vcategoria == 0){
            alert("Error al crear riesgo: Sin categoria seleccionada");
        }
        if (vprobabilidad == 0){
            alert("Error al crear riesgo: Sin probabilidad seleccionada");
        }
        if (vestrategia.length ==0){
            alert("Error al crear riesgo: Sin estrategia de mitigacion");
        }
        else{
            console.log("Si llego");
            newItem.push({D_categoria: vcategoria, D_impacto: vimpacto, D_probabilidad: vprobabilidad, D_estrategia: vestrategia, D_description: vdescripcion})
            FuncionAgregar(newItem, variable);
            newItem.splice(index, 1);
        }
        console.log("Si llego");
        
    });
});
async function FuncionAgregar(selectedItems, variable){
    if (selectedItems.length != 0) {
        alert('Quieres agregar ' + selectedItems.length + " riesgo/s?");
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
            alert('Riesgo(s) agregado(s) con éxito');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Hubo un error al agregar el/los riesgo(s).');
        });

        console.log(response);

    } else {
        alert('Por favor, selecciona al menos un riesgo.');
    }
}