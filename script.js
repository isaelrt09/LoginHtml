var selectedRow = null;
var contactos = [];

function onLoad() {
  obtenerLocalStorage();

  console.log(contactos);
  var table = document
    .getElementById("Listado")
    .getElementsByTagName("tbody")[0];
  for (var i = 0; i < contactos.length; i++) {
    table.innerHTML += `
    <tr><td>${contactos[i].nombre}</td> 
    <td>    ${contactos[i].apellido}
    </td>
    <td>    ${contactos[i].correo}
    </td> 
    <td><button onclick='onEdit(this, ${contactos[i].id})'>Editar</button></td>
    <td><button onclick='onDelete(this, ${contactos[i].id})'>Borrar</button></td>
    <td><button onClick="onMensaje(this)">Mensaje</button></td>
    </tr>
`;
  }
}
function onFormSubmit(e) {
  event.preventDefault();
  var formData = readFormData();
  if (selectedRow == null) {
    insertNewRecord(formData);
  } else {
    updateRecord(formData);
  }
  resetForm();
}

function readFormData() {
  var formData = {};
  formData["nombre"] = document.getElementById("nombre").value;
  formData["apellido"] = document.getElementById("apellido").value;
  formData["correo"] = document.getElementById("correo").value;
  formData["id"] = document.getElementById("id").value;
  return formData;
}

//Insert
function insertNewRecord(data) {
  const newContacto = { ...data, id: contactos.length + 1 };
  contactos.push(newContacto);
  var table = document
    .getElementById("Listado")
    .getElementsByTagName("tbody")[0];

  table.innerHTML += `
    <tr><td>${newContacto.nombre}</td> 
    <td>    ${newContacto.apellido}
    </td>
    <td>    ${newContacto.correo}
    </td> 
    <td><button onclick='onEdit(this, ${newContacto.id})'>Editar</button></td>
    <td><button onclick='onDelete(this, ${newContacto.id})'>Borrar</button></td>
    <td><button onClick="onMensaje(this)">Mensaje</button></td>
    </tr>
`;

  agregarLocalStorage();
}
function agregarLocalStorage() {
  localStorage.setItem("contactos", JSON.stringify(contactos));
}

function obtenerLocalStorage() {
  contactos = JSON.parse(localStorage.getItem("contactos"));
}

function buscarContacto() {
  var buscar = document.getElementById("buscar").value;
  var table = document
    .getElementById("Listado")
    .getElementsByTagName("tbody")[0];
  var tr = table.getElementsByTagName("tr");
  for (var i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(buscar.toUpperCase()) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

//Edit
function onEdit(td, id) {
  console.log("adasd", id);
  selectedRow = td.parentElement.parentElement;
  document.getElementById("nombre").value = selectedRow.cells[0].innerHTML;
  document.getElementById("apellido").value = selectedRow.cells[1].innerHTML;
  document.getElementById("correo").value = selectedRow.cells[2].innerHTML;
  document.getElementById("id").value = id;
}

function updateRecord(formData) {
  contactoSelected = contactos.find((contacto) => contacto.id == formData.id);

  contactoSelected.nombre = formData.nombre;
  contactoSelected.apellido = formData.apellido;
  contactoSelected.correo = formData.correo;
  contactoSelected.id = formData.id;

  agregarLocalStorage();

  selectedRow.cells[0].innerHTML = formData.nombre;
  selectedRow.cells[1].innerHTML = formData.apellido;
  selectedRow.cells[2].innerHTML = formData.correo;
}

//Delete
function onDelete(td, id) {
  if (confirm("Quiere eliminar su contacto ?")) {
    row = td.parentElement.parentElement;
    document.getElementById("Listado").deleteRow(row.rowIndex);

    contactos = contactos.filter((contacto) => contacto.id != id);
    console.log("adasd", id);
    agregarLocalStorage();
    resetForm();
  }
}

//Refrescar
function resetForm() {
  document.getElementById("nombre").value = "";
  document.getElementById("apellido").value = "";
  document.getElementById("correo").value = "";
  selectedRow = null;
}

function onMensaje() {
  window.location = "Mensaje.html";
}
function Mensaje() {
  if (confirm("Quiere enviar un mensaje ?")) {
    alert("Mensaje enviado");
    document.getElementById("mensaje").value = "";

    window.location = "tabla.html";
  }
}
