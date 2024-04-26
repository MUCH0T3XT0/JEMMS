const botonInfo = document.getElementById("info_p");
const botonReporte = document.getElementById("reporte");

botonInfo.addEventListener("click", ()=>{
    window.location.href="/info_proyecto";
});

botonReporte.addEventListener("click", ()=>{
    window.location.href="/reporte";
});