console.log("aqui");


window.addEventListener('load', function() {
    console.log("aqui no");

    
   
    
});


const boton = document.getElementById('iniciar');
console.log(boton);

boton.addEventListener('click', function(event){
    let msg = document.getElementById('msg');
    msg.textContent = "";

    console.log("entro");
    let correo = document.getElementById('correo').value;
    let contrasena = document.getElementById('contrasena').value;
    if(!correo || !contrasena){
        msg.textContent = "Llene todos los campos";
    }else{
        let resultado = /([A-Z]|[a-z]|[0-9])+@appix\.mx/.test(correo);

        login(resultado, correo, contrasena);
    }
    

   
    
})

async function login(resultado, correo, contrasena){
    let msg = document.getElementById('msg');
    msg.textContent = "";

    if(!resultado){
        msg.textContent="Correo Invalido";
    }else{
        console.log(correo);
        console.log(contrasena);
        console.log(JSON.stringify({correo: correo, contrasena:contrasena}));
        console.log(JSON.stringify({'correo': correo, 'contrasena':contrasena}))
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