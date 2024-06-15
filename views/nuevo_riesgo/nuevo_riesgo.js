function enviarFormulario() {
    // Obtener el formulario y los datos
    var form = document.getElementById("form_crear_riesgo");
    var formData = new FormData(form);

    // Crear un nuevo FormData solo con las filas seleccionadas
    var formDataSeleccionado = new FormData();
    for (var pair of formData.entries()) {
        var name = pair[0];
        var value = pair[1];
        if (name === "seleccionado[]" && value === "on") {
            // Agregar solo las filas seleccionadas al nuevo FormData
            var index = name.substring(0, name.indexOf("["));
            formData.forEach(function (val, key) {
                if (key.startsWith(index)) {
                    formDataSeleccionado.append(key, val);
                }
            });
        }
    }

    // Enviar el formulario con los datos de las filas seleccionadas
    fetch("../../routes/pr0yecto/nuevo_riesgo", {
        method: form.method,
        body: formDataSeleccionado
    }).then(function(response) {
        // Manejar la respuesta
        console.log(response);
    }).catch(function(error) {
        // Manejar errores
        console.error(error);
    });
}