window.addEventListener('load', function() {
    console.log("Hola");   
    const wrapper = document.getElementById('tablaMostar_lider');
    const wrapper1 = document.getElementById('tablaMostar_colaboradores');
    console.log("ABC");

        gridTable = new gridjs.Grid({
        columns: [
            "id_usuario", "nombres", "apellido_p", "nombre_proyecto"],
        pagination: true,
        search: true,
        sort: true,
        server:{
            url: "/usuario/mostrar_usuarios_lideres",
            then: data => data.usuario1
        }
    }).render(wrapper);

    gridTable1 = new gridjs.Grid({
        columns: ["id_usuario", "nombres", "apellido_p", "correo"],
        pagination: true,
        search: true,
        sort: true,
        server:{
            url: "/usuario/mostrar_usuarios_colaboradores",
            then: data => data.usuario2
        }
    }).render(wrapper1);
});
