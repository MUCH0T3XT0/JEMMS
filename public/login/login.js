const passwordInput = document.getElementById('inputPassword');
const passwordConfirmar = document.getElementById('confirmaPassword');
const mostrarPassword = document.getElementById('mostrar');
const passwordError = document.getElementById('errorPassword')
const passwordForma = document.getElementById('formaPassword');
const botonL = document.getElementById("botonL");

passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    const segura = calcuPassword(password);
    actualizarPassword(segura);
});

mostrarPassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    mostrarPassword.textContent = type === 'password' ? 'Show' : 'Hide';
});
/*
passwordForma.addEventListener('submit', (evento) => {
    const password = passwordInput.value;
    const confPassword = passwordConfirmar.value;

    if(password !== confPassword) {
        evento.preventDefault();
        passwordError.textContent = "El Password no coincide. Intentalo de nuevo";
    }
});
*/
botonL.addEventListener("click", ()=>{
    window.location.href= "/home";
});
