
window.addEventListener('load', function() {
    const wrapper = document.getElementById('tablaMostar_Riesgos_Globales');
    const variable = wrapper.getAttribute('value');
    //const variableEnviada = document.getElementById('id_proyecto').value;
    //const id_proyecto = document.getElementById('id');
    //const domAttributeValue = sourceElement.getAttribute(id_proyecto);
    //const wrapper1 = document.getElementById('tablaMostar_colaboradores');

        gridTable = new gridjs.Grid({
            columns: [
                {
                    id: 'select',
                    name: 'Seleccionar',
                    formatter: (_, row) => gridjs.html(`<input type="checkbox" class="select-row" data-id="${variable}" data-description="${row.cells[1].data}" data-categoria="${row.cells[2].data}" data-impacto="${row.cells[3].data}" data-probabilidad="${row.cells[4].data}" data-estrategia_m="${row.cells[5].data}"/>`)
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
            url: "/proyecto/:${variable}/agregar_riesgos",
            then: data => data.riesgo.map(riesgo => [
                "",
                riesgo.description,
                riesgo.categoria,
                riesgo.impacto,
                riesgo.probabilidad,
                riesgo.estrategia_m,
            ])
        }
    }).render(wrapper);

    const selectedItems = [];
    const numselectedItems= 0;

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
                alert('Se selecciono los siguientes riesgos en el proyecto ' + variable);
                alert(JSON.stringify(selectedItems, null, 2));
                numselectedItems +=1;
            } else {
                const index = selectedItems.findIndex(item => item.id === id);
                if (index > -1) {
                    selectedItems.splice(index, 1);
                    numselectedItems -=1;
                }
            }
        }
    });

    const Buton = document.getElementById('AgregarRiesgoBoton');

    Buton.addEventListener('click', function(event) {
        event.preventDefault();
        console.log(selectedItems);
        console.log(typeof(selectedItems[0].D_categoria));

        miFuncion(selectedItems, variable);
        
    });
    
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



async function miFuncion(selectedItems, variable){
    if (selectedItems.length > 0) {
        alert('Cantidad de riesgos seleccionados: ' + selectedItems.length);
        const url = '/proyecto/'+variable+'/nuevo_riesgo';
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