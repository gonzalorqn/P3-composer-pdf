function Login()
{
    var correo = (<HTMLInputElement>document.getElementById("txtCorreo")).value;
    var clave = (<HTMLInputElement>document.getElementById("txtClave")).value;

    let xhttp : XMLHttpRequest = new XMLHttpRequest();

    xhttp.onreadystatechange = () =>
    {
        if(xhttp.readyState == 4 && xhttp.status == 200)
        {
            var obj = JSON.parse(xhttp.responseText);
            console.log(obj);
            if(obj.existe)
            {
                window.location.href = "./test_pdf.php";
            }
            else
            {
                alert("El usuario no existe");
            }
        }
    };

    xhttp.open("POST", "./test_usuario.php", true);
    xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
    xhttp.send('usuario_json={"correo":"'+correo+'","clave":"'+clave+'"}');
}

function Registrar()
{
    var obj : any = {};
    obj.correo = (<HTMLInputElement>document.getElementById("txtCorreo")).value;
    obj.clave = (<HTMLInputElement>document.getElementById("txtClave")).value;
    obj.nombre = (<HTMLInputElement>document.getElementById("txtNombre")).value;
    obj.apellido = (<HTMLInputElement>document.getElementById("txtApellido")).value;
    obj.perfil = (<HTMLInputElement>document.getElementById("txtPerfil")).value;
    let foto : any = (<HTMLInputElement>document.getElementById("foto"));

    let form : FormData = new FormData();

    form.append('foto', foto.files[0]);
    form.append('usuario_json', JSON.stringify(obj));

    let xhttp : XMLHttpRequest = new XMLHttpRequest();

    xhttp.onreadystatechange = () =>
    {
        if(xhttp.readyState == 4 && xhttp.status == 200)
        {
            var obj = JSON.parse(xhttp.responseText);
            console.log(obj);
            if(obj.FilasAfectadas > 0)
            {
                window.location.href = "./index.html";
            }
            else
            {
                alert("Error en base de datos");
            }
        }
    };

    xhttp.open("POST", "./registro.php", true);
    xhttp.setRequestHeader("enctype", "multipart/form-data");
    xhttp.send(form);
}