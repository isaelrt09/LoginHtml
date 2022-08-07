function login() {
    var us, pass;

    user = document.getElementById("usuario").value;
    pass = document.getElementById("contraseña").value;

    if (user == "isael" && pass == "1234") {

        window.location = "tabla.html";
    } else {
        alert("Datos Incorrectos.");
    }
}