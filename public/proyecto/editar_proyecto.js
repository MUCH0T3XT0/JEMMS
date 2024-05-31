
window.addEventListener('load', function(){
    console.log("aqui no");
    let nombre_proyecto = document.getElementById('nombre_proyecto');
    let empresa = document.getElementById('empresa');
    let f_creacion = document.getElementById('f_creacion');
    let f_fin = document.getElementById('f_fin');
    let encargado = document.getElementById('encargado');
    let presupuesto = document.getElementById('presupuesto');
    let descripcion = document.getElementById('descripcion');

    //console.log(nombre_proyecto.value);
})

const boton_guardar = document.getElementById('boton_guardar');

boton_guardar.addEventListener('click', function(event){
    console.log("entro");
    let id = boton_guardar.getAttribute('data-id');
    console.log(typeof(id));

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

    //CAMPOS VACIOS
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
            
            editar_proyecto(id, nombre_proyecto.value, empresa.value, moment(f_creacion.value, "DD-MM-YYYY").format(moment.HTML5_FMT.DATE), moment(f_fin.value,  "DD-MM-YYYY").format(moment.HTML5_FMT.DATE), encargado.value, presupuesto.value, descripcion.value);

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

async function editar_proyecto(id_proyecto, nombre_proyecto, empresa, f_inicio, f_fin, encargado, presupuesto, descripcion){
    console.log(id_proyecto);
    const url = '/proyecto/'+id_proyecto+'/editar_proyecto';
    
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nombre_proyecto:nombre_proyecto, descripcion: descripcion, empresa: empresa, presupuesto: presupuesto, f_creacion: f_inicio, f_fin: f_fin, encargado: encargado})
    })

    console.log(response.ok);

    if(response.ok){
        console.log("si");
        window.location.href = "/proyecto/"+id_proyecto+"/info_proyecto";
    }else{
        msg.textContent = "Error en la BD";
    }
};