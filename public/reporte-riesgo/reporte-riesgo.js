const riesgoNivel = document.getElementById('nivelRiesgo');

function actualizarRiesgo(riesgo) {
    let mensaje = '';
    let nomClase = '';

    if(riesgo <= 30) {
        mensaje = "Bajo"
        nomClase = 'riesgo-bajo'; 
    } else if(riesgo > 30 || riesgo <= 70) {
        mensaje = 'Medio';
        nomClase = 'riesgo-medio'; 
    } else {
        mensaje = 'Alto';
        nomClase = 'riesgo-alto';
    }

    riesgoNivel.textContent = `${mensaje}`;
    riesgoNivel.className = nomClase;
}