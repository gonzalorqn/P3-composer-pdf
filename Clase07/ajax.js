"use strict";
function Login() {
    var correo = document.getElementById("txtCorreo").value;
    var clave = document.getElementById("txtClave").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var obj = JSON.parse(xhttp.responseText);
            console.log(obj);
            if (obj.existe) {
                window.location.href = "./test_pdf.php";
            }
            else {
                alert("El usuario no existe");
            }
        }
    };
    xhttp.open("POST", "./test_usuario.php", true);
    xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhttp.send('usuario_json={"correo":"' + correo + '","clave":"' + clave + '"}');
}
function Registrar() {
    var obj = {};
    obj.correo = document.getElementById("txtCorreo").value;
    obj.clave = document.getElementById("txtClave").value;
    obj.nombre = document.getElementById("txtNombre").value;
    obj.apellido = document.getElementById("txtApellido").value;
    obj.perfil = document.getElementById("txtPerfil").value;
    var foto = document.getElementById("foto");
    var form = new FormData();
    form.append('foto', foto.files[0]);
    form.append('usuario_json', JSON.stringify(obj));
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var obj = JSON.parse(xhttp.responseText);
            console.log(obj);
            if (obj.FilasAfectadas > 0) {
                window.location.href = "./index.html";
            }
            else {
                alert("Error en base de datos");
            }
        }
    };
    xhttp.open("POST", "./registro.php", true);
    xhttp.setRequestHeader("enctype", "multipart/form-data");
    xhttp.send(form);
}
//# sourceMappingURL=ajax.js.map