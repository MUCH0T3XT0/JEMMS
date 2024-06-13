
window.addEventListener('load', function(){
    //console.log("aqui no");
    let nombre_proyecto = document.getElementById('nombre_proyecto');
    let empresa = document.getElementById('empresa');
    let departamento = document.getElementById('departamento');
    let f_creacion = document.getElementById('f_creacion');
    let f_fin = document.getElementById('f_fin');
    let encargado = document.getElementById('encargado');
    let presupuesto = document.getElementById('presupuesto');
    let descripcion = document.getElementById('descripcion');
    
    let msg = document.getElementById('msg');
})

const boton_enviar = document.getElementById('boton-enviar');

boton_enviar.addEventListener('click', function(event){
    let opciones = document.getElementsByName('check');
    msg.textContent = null;
    let msg_nombre_proyecto = document.getElementById('msg_nombre_proyecto');
    let msg_empresa = document.getElementById('msg_empresa');
    let msg_encargado = document.getElementById('msg_encargado');
    let msg_presupuesto = document.getElementById('msg_presupuesto');
    let msg_descripcion = document.getElementById('msg_descripcion');
    let msg_f_creacion = document.getElementById('msg_f_creacion');
    let msg_f_fin = document.getElementById('msg_f_fin');
    
    msg_nombre_proyecto.style.display = "none";
    msg_empresa.style.display = "none";
    msg_encargado.style.display = "none";
    msg_presupuesto.style.display = "none";
    msg_descripcion.style.display = "none";
    msg_f_creacion.style.display = "none";
    msg_f_fin.style.display = "none";


    const inicio = moment(f_creacion.value, "DD/MM/YYYY").toDate();
    const fin = moment(f_fin.value, "DD/MM/YYYY").toDate();
    const x = moment();
    const hoy = moment(x, "DD-MM-YYYY").toDate();
    let lider_proyecto;
            for (const lider of opciones) {
                if (lider.checked) {
                    lider_proyecto = lider.value;
                    break;
                }
            }
    //CAMPOS VACIOS
    if (!lider_proyecto){
        msg.textContent = "Tienes que asignar lider al proyecto";
    }
    if(!nombre_proyecto.value || !empresa.value || !f_creacion.value || !f_fin.value || !encargado.value || !presupuesto.value || !descripcion.value){
        msg.textContent = "Llene todos los campos";

    //LA FECHA DE FIN ES PASADO A LA FECHA ACTUAL DE LA CREACION DEL PROYECTO
    }else if(moment(fin).isBefore(hoy)){
        if(msg_f_creacion.style.display === "none"){
            msg_f_creacion.style.display = "block";
        }

    //LA FECHA DE FIN ES ANTERIOR A LA FECHA DE INICIO
    }else if(moment(fin).isBefore(inicio)){
        if(msg_f_fin.style.display === "none"){
            msg_f_fin.style.display = "block";
        }
    
    }else{//VERIFICACION DE LOS DATOS CON REGEX
        let r_proyecto = /^(\w|\.|%|-|\$|@||ñ|á|é|í|ó|ú|\s){1,30}$/.test(nombre_proyecto.value);
        let r_empresa = /^(\w|\.|%|-|\$|@||ñ|á|é|í|ó|ú|\s){1,15}$/.test(empresa.value);
        let r_encargado = /^(\w|\.|%|-|\$|@||ñ|á|é|í|ó|ú|\s){1,30}$/.test(encargado.value);
        let r_presupuesto = /\d{1,19}/.test(presupuesto.value);
        let r_descripcion = /^(\w|\.|%|-|\$|@||ñ|á|é|í|ó|ú|\s){1,500}$/.test(descripcion.value);

        //LA VERIFICACION DE TODOS LOS INPUTS FUE CORRECTA
        if(r_proyecto && r_empresa && r_empresa && r_presupuesto && r_descripcion){
            nuevo_proyecto(lider_proyecto.value, nombre_proyecto.value, empresa.value, departamento.value, moment(f_creacion.value, "DD-MM-YYYY").format(moment.HTML5_FMT.DATE), moment(f_fin.value,  "DD-MM-YYYY").format(moment.HTML5_FMT.DATE), encargado.value, presupuesto.value, descripcion.value);

        }else{
            //ERROR EN PROYECTO
            if(!r_proyecto){
                if(msg_nombre_proyecto.style.display === "none"){
                    msg_nombre_proyecto.style.display = "block";
                }
                
            //ERROR EN EMPRESA
            }
            if(!r_empresa){
                if(msg_empresa.style.display === "none"){
                    msg_empresa.style.display = "block";
                }

            //ERROR EN ENCARGADO
            }
            if(!r_encargado){
                if(msg_encargado.style.display === "none"){
                    msg_encargado.style.display = "block";
                }

            //ERROR EN PRESUPUESTO
            }
            if(!r_presupuesto){
                if(msg_presupuesto.style.display === "none"){
                    msg_presupuesto.style.display = "block";
                }
            
            //ERROR EN DESCRIPCION
            }
            if(!r_descripcion){
                if(msg_descripcion.style.display === "none"){
                    msg_descripcion.style.display = "block";
                }
            }
                
            
        }
    }
});

async function nuevo_proyecto(id_lider, nombre_proyecto, empresa, departamento, f_inicio, f_fin, encargado, presupuesto, descripcion){
    const url = "/proyecto/nuevo_proyecto";
    

    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id_lider: id_lider ,nombre_proyecto:nombre_proyecto, descripcion: descripcion, empresa: empresa, presupuesto: presupuesto, f_creacion: f_inicio, f_fin: f_fin, encargado: encargado, departamento: departamento})
    })

    console.log(response.ok);

    if(response.ok){
        console.log("si");
        window.location.href = "/proyecto/home";
    }else{
        msg.textContent = "Error en la BD";
    }
};




//------------------------------------------------------------------------------------




function muestraConfirmacion(objeto,id, num){
    swal("¿Estas seguro de querer crear el proyecto?", "Se agregara de acuerdo a los riesgos introducidos",{
        className: "boxstyle",

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
    swal("Alerta", 
        alerta, 
        icono, {
        dangerMode: true,
        buttons: {New: {text: "Aceptar"}},
        closeOnClickOutside: false,
        timer: 5000,
    });
}
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