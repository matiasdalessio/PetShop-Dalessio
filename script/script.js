let tablaJuguetes = document.getElementById("tablaJuguetes")
let tablaFarmacia = document.getElementById("tablaFarmacia")
let añadir = document.getElementById("añadir")




  if (document.title.includes("Franco's | Farmacia") || document.title.includes("Franco's | Juguetes")) {
    fetching()
  } else if (document.title.includes("Contacto")){
    alertSubmit() 
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
console.log(data.response)

if (tablaFarmacia) {
  dibujarTabla(data.response, tablaFarmacia, "tablaFarmacia")
} else if (tablaJuguetes){
  dibujarTabla(data.response, tablaJuguetes, "tablaJuguetes")
}

  function dibujarTabla(array, dato1, dato2){
    dato1.innerHTML = "";
    if (tablaFarmacia) {
      array = array.filter((producto)=> producto.tipo == "Medicamento")        
    } else if(tablaJuguetes){
      array = array.filter((producto)=> producto.tipo == "Juguete")
    }
    
    array.forEach(element => {      
      if (element.stock == 0){
        dato1.innerHTML+=
        `<div class=" carta">
          <div class="z-depth-5 card">
            <img class="cardImage" src="${element.imagen}">           
            <p class="card-title">${element.nombre}</p>
            <p class="card-stock">Sin stock disponible.</p>
            <div class="card-content">
            <p>${element.descripcion}</p>
            </div>
            <button id="${element._id}" class="btn-floating halfway-fab waves-effect waves-light red"><i id="${element._id}"class="material-icons">add</i></button>
            <p class="card-price">$ ${element.precio}</p>
          </div>
        </div>`      
      } else if(element.stock == 1){
        dato1.innerHTML+=
        `<div class=" carta">
          <div class="z-depth-5 card">
            <img class="cardImage" src="${element.imagen}">           
            <p class="card-title">${element.nombre}</p>
            <p class="card-stock">¡Última unidad disponible!</p>
            <div class="card-content">
              <p>${element.descripcion}</p>
            </div>
            <button id="${element._id}" class="btn-floating halfway-fab waves-effect waves-light red"><i id="${element._id}"class="material-icons">add</i></button>
            <p class="card-price">$ ${element.precio}</p>
          </div>
        </div>`
      }else if (element.stock <= 5 ) {
        dato1.innerHTML+=
        `<div class=" carta">
          <div class="z-depth-5 card">
            <img class="cardImage" src="${element.imagen}">           
            <p class="card-title">${element.nombre}</p>
            <p class="card-stock">¡Últimas ${element.stock} unidades!</p>
            <div class="card-content">
              <p>${element.descripcion}</p>
            </div>
            <button id="${element._id}" class="btn-floating halfway-fab waves-effect waves-light red"><i id="${element._id}"class="material-icons">add</i></button>
            <p class="card-price">$ ${element.precio}</p>
          </div>
        </div>`
      } else{
        dato1.innerHTML+=
        `<div class=" carta">
          <div class="z-depth-5 card">
            <img class="cardImage" src="${element.imagen}">           
            <p class="card-title">${element.nombre}</p>
            <p class="card-stock-ok">En Stock</p>
            <div class="card-content">
              <p>${element.descripcion}</p>
            </div>
            <button id="${element._id}" class="btn-floating halfway-fab waves-effect waves-light red"><i id="${element._id}"class="material-icons">add</i></button>
            <p class="card-price">$ ${element.precio}</p>
          </div>
        </div>`
      }
      document.getElementById(element._id).addEventListener('click', (e) => {
        console.log("hola")
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

