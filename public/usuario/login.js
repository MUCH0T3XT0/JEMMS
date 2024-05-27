console.log("aqui");


window.addEventListener('load', function() {
    console.log("aqui no");
    let msg = document.getElementById('msg');
    let correo = document.getElementById('correo');
    let contrasena = document.getElementById('contrasena');
});


const boton = document.getElementById('iniciar');
//console.log(boton);

boton.addEventListener('click', function(event){
    msg.textContent = "";

    console.log("entro");
    //console.log(correo.value);
    //console.log(contrasena.value);
    
    if(!correo.value || !contrasena.value){
        msg.textContent = "Llene todos los campos";
    }else{
        let resultado = /(\w|\d|\.|_)+@appix\.mx/.test(correo.value);
        console.log(resultado);
        login(resultado, correo.value, contrasena.value);
    }
})

async function login(resultado, correo, contrasena){
    msg.textContent = "";

    if(!resultado){
        msg.textContent="Correo Invalido";
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
            msg.textContent = "Cuenta o contraseña incorrectos";
        }


    }
}