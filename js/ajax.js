"use strict"

let url = 'https://integrador5marina2.herokuapp.com/api/students';
//'https://web-unicen.herokuapp.com/api/groups/028_bedini_caseres/carro'

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
      let recibido = await fetch(url);//,{mode: 'no-cors'}
      let json = await recibido.json();
      console.log(json);
      /*carrito_compras = [];
      if(json.carro.length > 0){
        for(let i = 0; i < json.carro.length; i++){
          let id = json.carro[i]._id;
          let thing = json.carro[i].thing;
          carrito_compras.push({id,thing});
        }
      }
      mostrarDatos();*/
      //console.log("Aca traje los datos realmente: ",carrito_compras);
    }
    catch(t){
      console.log(t);
    }
  }

