"use strict"

let url = 'https://integrador5marina2.herokuapp.com/api/students';

let tbody = document.querySelector("#tbody_students");

let headTable = tbody.innerHTML;

let select_filter = document.querySelector("#from-select");

let form_libreta = document.querySelector("#form_filtro_libreta");
let form_genero = document.querySelector("#form_filtro_genero");
let form_carrera_ciudad = document.querySelector("#form_filtro_carrera_ciudad");
let div_btn_filtrar = document.querySelector("#div_btn_filtrar");

getStudents();

document.addEventListener("DOMContentLoaded", function(){

    document.querySelector("#btn_insertar").addEventListener('click', function(){
        insertStudent();
    });

    select_filter.addEventListener('change', function(e){
        var selectedOption = this.options[select_filter.selectedIndex];
        let opcion = selectedOption.value;
        cambioDeClases(opcion);
        switch (opcion) {
            case '1':
                let todos = "";
                filtrar(todos);
                break;
            case '2':
                let alfabeticamente = "/sortedbyname";
                filtrar(alfabeticamente);
                break;
            default:
                break;
        }
    });

    document.querySelector("#btn_filtrar").addEventListener('click', function(){
        identificarFiltro();
    });
});

async function filtrar(criterio){
    try {
        let recibido = await fetch(url+criterio);
        let json = await recibido.json();
        cargarTabla(json);
    }
    catch(t){
        console.log(t);
    }
}

async function filtrarResultSimple(criterio){
    try {
        let recibido = await fetch(url+criterio);
        let json = await recibido.json();
        let json2 ={json};
        cargarTabla(json2);
    }
    catch(t){
        console.log(t);
    }
}

function identificarFiltro(){
    let criterio = "";
    let select_filter = document.querySelector("#from-select");
    var selectedOption = select_filter.options[select_filter.selectedIndex];
    switch (selectedOption.value) {
        case '3':
            let bookNumber = parseInt(document.querySelector("#input_filter_libreta").value);
            if(bookNumber != null){
                criterio = "/bookNumber/"+bookNumber;
                filtrarResultSimple(criterio);
            }
            break;
        case '4':
            let genero = document.querySelector('input[name="flexRadiofiltroGenero"]:checked').value;
            if(genero != ""){
                criterio = "/gender/"+genero;
            }
            filtrar(criterio);
            break;
        case '5':
            let carrera = document.querySelector("#input_filtro_carrera").value;
            let ciudad = document.querySelector("#input_filtro_ciudad").value;
            if(carrera != "" & ciudad!= ""){
                criterio = "/"+carrera+"/"+ciudad;
            }
            filtrar(criterio);
            break;
        default:
            break;
    }
    return criterio;
}

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


//comportamiento de ocultar o mostrar criterios de filtrados



function cambioDeClases(opcion){
        switch (opcion) {
            case '1':
                ocultarforms();
                break;
            case '2':
                ocultarforms();
                break;
            case '3':
                mostrar(form_libreta);
                break;
            case '4':
                mostrar(form_genero);
                break;
            case '5':
                mostrar(form_carrera_ciudad);
                break;
            default:
                break;
        }
}
function mostrar(form_mostrar){
    form_libreta.classList.add("hiden_cont");
    form_genero.classList.add("hiden_cont");
    form_carrera_ciudad.classList.add("hiden_cont");
    form_mostrar.classList.toggle("hiden_cont");
    div_btn_filtrar.classList.remove("hiden_cont");
}

function ocultarforms(){
    form_libreta.classList.add("hiden_cont");
    form_genero.classList.add("hiden_cont");
    form_carrera_ciudad.classList.add("hiden_cont");
    div_btn_filtrar.classList.add("hiden_cont");
}