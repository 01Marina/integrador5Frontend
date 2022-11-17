"use strict"

let url = 'https://integrador5marina2.herokuapp.com/api/students';

let tbody = document.querySelector("#tbody_students");

let headTable = tbody.innerHTML;

getStudents();

document.addEventListener("DOMContentLoaded", function(){

    document.querySelector("#btn_insertar").addEventListener('click', function(){
        insertStudent();
    });
});

async function insertStudent() {
    let data = {
		     	"nombre": document.querySelector("#input_nombre").value,
		        "edad": parseInt(document.querySelector("#input_edad").value),
		        "genero": document.querySelector('input[name="flexRadiogenero"]:checked').value,
		        "dni": parseInt(document.querySelector("#input_dni").value),
		        "ciudad_de_residencia": document.querySelector("#input_ciudad").value,
		        "libreta_universitaria": parseInt(document.querySelector("#input_libreta").value),
		        "matriculas": []
	        };
            console.log(data);
    try {
      await fetch(url+ "/insert", {
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "body": JSON.stringify(data),
      });
      getStudents();
    }
    catch (t) {
      console.log(t);
    }
}

async function getStudents(){
    try {
      let recibido = await fetch(url);
      let json = await recibido.json();
      console.log(json);
      cargarTabla(json);
    }
    catch(t){
      console.log(t);
    }
}

function cargarTabla(json){
    tbody.innerHTML = headTable;

    for(let i = 0; i < json.length; i++){
        crearFila(json[i]);
    }
}

function crearFila(student){

    let row = document.createElement("tr");
    row.setAttribute("id",student.id_estudiante);

    let nombre = document.createElement("td");
    nombre.textContent = student.nombre;

    let edad = document.createElement("td");
    edad.textContent = student.edad;

    let genero = document.createElement("td");
    genero.textContent = student.genero;

    let dni = document.createElement("td");
    dni.textContent = student.dni;

    let ciudad_de_residencia = document.createElement("td");
    ciudad_de_residencia.textContent = student.ciudad_de_residencia;

    let libreta_universitaria = document.createElement("td");
    libreta_universitaria.textContent = student.libreta_universitaria;

    row.appendChild(nombre);
    row.appendChild(edad);
    row.appendChild(genero);
    row.appendChild(dni);
    row.appendChild(ciudad_de_residencia);
    row.appendChild(libreta_universitaria);
    tbody.appendChild(row);
}


