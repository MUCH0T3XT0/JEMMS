
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
    msg.textContent = null;
    /*
    console.log("entro");
    console.log(nombre_proyecto.value);
    console.log(empresa.value);
    console.log(f_creacion.value);
    console.log(f_fin.value);
    console.log(encargado.value);
    console.log(presupuesto.value);
    console.log(descripcion.value);*/

    const inicio = moment(f_creacion.value, "DD/MM/YYYY").toDate();
    const fin = moment(f_fin.value, "DD/MM/YYYY").toDate();
    const x = moment();
    const hoy = moment(x, "DD-MM-YYYY").toDate();

    //CAMPOS VACIOS
    if(!nombre_proyecto.value || !empresa.value || !f_creacion.value || !f_fin.value || !encargado.value || !presupuesto.value || !descripcion.value){
        msg.textContent = "Llene todos los campos";

    //LA FECHA DE FIN ES PASADO A LA FECHA ACTUAL DE LA CREACION DEL PROYECTO
    }else if(moment(fin).isBefore(hoy)){
        msg.textContent = "Introduza una fecha de termino posterior al dia de hoy";

    //LA FECHA DE FIN ES ANTERIOR A LA FECHA DE INICIO
    }else if(moment(fin).isBefore(inicio)){
        msg.textContent = "La fecha de inicio no puede ser posterior a la fecha de fin. Introduzca una fecha de inicio y fin coherentes.";

    
    }else{//VERIFICACION DE LOS DATOS CON REGEX
        let r_proyecto = /^(\w|\.|%|-|\$|@|\s){1,30}$/.test(nombre_proyecto.value);
        let r_empresa = /^(\w|\.|%|-|\$|@|\s){1,15}$/.test(empresa.value);
        let r_encargado = /^(\w|\.|%|-|\$|@|\s){1,30}$/.test(encargado.value);
        let r_presupuesto = /\d/.test(presupuesto.value);
        let r_descripcion = /^(\w|\.|%|-|\$|@|\s){1,500}$/.test(descripcion.value);

        /*
        console.log(r_proyecto);
        console.log(r_empresa);
        console.log(r_encargado);
        console.log(r_presupuesto);
        console.log(r_descripcion);*/

        //LA VERIFICACION DE TODOS LOS INPUTS FUE CORRECTA
        if(r_proyecto && r_empresa && r_empresa && r_presupuesto && r_descripcion){
            nuevo_proyecto(nombre_proyecto.value, empresa.value, departamento.value, f_creacion.value, f_fin.value, encargado.value, presupuesto.value, descripcion.value);

        }else{
            //ERROR EN PROYECTO
            if(!r_proyecto){
                msg.textContent = "Nombre de proyecto incorrecto";

            //ERROR EN EMPRESA
            }else if(!r_empresa){
                msg.textContent = "Nombre de empresa incorrecto";

            //ERROR EN ENCARGADO
            }else if(!r_encargado){
                msg.textContent = "Nombre de encargado incorrecto";

            //ERROR EN PRESUPUESTO
            }else if(!r_presupuesto){
                msg.textContent = "Presupuesto incorrecto. Introduza solo digitos";
            
            //ERROR EN DESCRIPCION
            }else{
                msg.textContent = "Descripcion incorrecta";
            }
                
            
        }
    }
});

async function nuevo_proyecto(nombre_proyecto, empresa, departamento, f_inicio, f_fin, encargado, presupuesto, descripcion){
    const url = "/proyecto/nuevo_proyecto";
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nombre_proyecto:nombre_proyecto, descripcion: descripcion, empresa: empresa, presupuesto: presupuesto, f_creacion: f_inicio, f_fin: f_fin, encargado: encargado, departamento: departamento})
    })

    console.log(response.ok);

    if(response.ok){
        console.log("si");
        window.location.href = "/proyecto/home";
    }else{
        msg.textContent = "Error en la BD";
    }
};
