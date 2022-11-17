"use strict"

let select_filter = document.querySelector("#from-select");
let form_libreta = document.querySelector("#form_filtro_libreta");
let form_genero = document.querySelector("#form_filtro_genero");
let form_carrera_ciudad = document.querySelector("#form_filtro_carrera_ciudad");
let div_btn_filtrar = document.querySelector("#div_btn_filtrar");

document.addEventListener("DOMContentLoaded", function(){

    select_filter.addEventListener('change', function(e){
        var selectedOption = this.options[select_filter.selectedIndex];
        switch (selectedOption.value) {
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
    });
});

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