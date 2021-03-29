let tablaJuguetes = document.getElementById("tablaJuguetes")
let tablaFarmacia = document.getElementById("tablaFarmacia")
let añadir = document.getElementById("añadir")




  if (document.title.includes("Franco's | Farmacia") || document.title.includes("Franco's | Juguetes")) {
    fetching()
  } else if (document.title.includes("Contacto")){
    alertSubmit() 
  } else if(document.title.includes("Franco's Vet y Pet Shop")){
    carousel()
    myScript()
  }else {
    myScript()
  }


function fetching(){
fetch("https://apipetshop.herokuapp.com/api/articulos")
  .then(resp =>resp.json())
  .then(data =>myScript(data))
  .catch(error => console.log(error))
}

function myScript(data){
  
  infoAPI={}


if (tablaFarmacia) {
  dibujarTabla(data.response, tablaFarmacia)
} else if (tablaJuguetes){
  dibujarTabla(data.response, tablaJuguetes)
}

  function dibujarTabla(array, dato1){
    
    dato1.innerHTML = "";
    if (tablaFarmacia) {
      array = array.filter((producto)=> producto.tipo == "Medicamento")        
    } else if(tablaJuguetes){
      array = array.filter((producto)=> producto.tipo == "Juguete")
    }
    
    array.forEach(element => {    
      const tarjeta = document.createElement("div")  
      tarjeta.className = "carta  animate__animated animate__fadeIn"
       if (element.stock <= 5 ) {
        tarjeta.innerHTML+=
        `<div class="z-depth-5 card">
            <img class="cardImage" src="${element.imagen}">           
            <p class="card-title">${element.nombre}</p>
            <p class="card-stock">¡Últimas unidades!</p>
            <div class="card-content">
              <p>${element.descripcion}</p>
            </div>
            <button id="${element._id}" class="btn-floating halfway-fab waves-effect waves-light red"><i id="${element._id}"class="material-icons">add</i></button>
            <p class="card-price">$ ${element.precio}</p>
          </div>`
      } else{
        tarjeta.innerHTML+=
        `<div class="z-depth-5 card">
            <img class="cardImage" src="${element.imagen}">           
            <p class="card-title">${element.nombre}</p>
            <p class="card-stock-ok"></p>
            <div class="card-content">
              <p>${element.descripcion}</p>
            </div>
            <button id="${element._id}" class="btn-floating halfway-fab waves-effect waves-light red"><i id="${element._id}"class="material-icons">add</i></button>
            <p class="card-price">$ ${element.precio}</p>
          </div>`
      }
      dato1.appendChild(tarjeta)
      document.getElementById(element._id).addEventListener('click', (e) => {
        console.log(e.target)
      })
    });    
  }
}

var carrito =[]

function alertSubmit(){
document.getElementById("submit").addEventListener("click", (event)=>{

  document.getElementById("formulario").reset()
    Swal.fire({
        title: '¿Quieres guardar los cambios?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Guardar y Enviar`,
        denyButtonText: `No Guardar`,
      }).then((result) => {

        if (result.isConfirmed) {
          Swal.fire('Muchas Gracias por Escribirnos!', '', 'success')
          document.getElementById("formulario").reset()
        } else if (result.isDenied) {
          Swal.fire('No se envió la Información', '', 'info')
        }
        
      })

})
}

function carousel(){
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, {
        indicators: true,
        fullWidth: true,
        
        
    });
  });
}