console.log("aqui");


window.addEventListener('load', function() {
    console.log("aqui no");
    
    let correo = document.getElementById('correo');
    let contrasena = document.getElementById('contrasena');
});


const boton = document.getElementById('iniciar');
//console.log(boton);

boton.addEventListener('click', function(event){
    let msg_correo_invalido = document.getElementById('msg_correo_invalido');
    let msg_constraseña = document.getElementById('msg_constraseña');
    let msg_campos = document.getElementById('msg_campos');

    msg_correo_invalido.style.display = "none";
    msg_constraseña.style.display = "none";
    msg_campos.style.display = "none";
    
    if(!correo.value || !contrasena.value){
        msg_campos.style.display = "block";
    }else{
        let resultado = /(\w|\d|\.|_)+@appix\.mx/.test(correo.value);
        console.log(resultado);
        login(resultado, correo.value, contrasena.value);
    }
})

async function login(resultado, correo, contrasena){
    
    if(!resultado){
        msg_correo_invalido.style.display = "block";
    }else{
        //console.log(correo);
        //console.log(contrasena);

        const url = '/usuario/login';
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({correo: correo, contrasena:contrasena})
        })

        console.log(response.ok);

        if(response.ok){
            console.log("si");
            window.location.href = "/proyecto/home";
        }else{
            msg_constraseña.style.display = "block";
        }


    }
}