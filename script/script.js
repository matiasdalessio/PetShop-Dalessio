let tablaJuguetes = document.getElementById("tablaJuguetes")
let tablaFarmacia = document.getElementById("tablaFarmacia")
let añadir = document.getElementById("añadir")
let nombre = document.getElementById("nombre")
let apellido = document.getElementById("apellido")
let telefono = document.getElementById("telefono")
let email = document.getElementById("email")
let btnSubmit = document.getElementById("submit")



  if (document.title.includes("Franco's | Farmacia") || document.title.includes("Franco's | Juguetes")) {
    fetching()
  } else if (document.title.includes("Franco's | Contacto")){
    validacionFormYAlert() 
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
           
            <p class="card-price">$ ${element.precio}</p>
          </div>`
      }
      dato1.appendChild(tarjeta)
      
    });    
  }
}


function validacionFormYAlert(){
  nombre.addEventListener('blur', validacionForm)
  apellido.addEventListener('blur', validacionForm)
  telefono.addEventListener('blur', validacionForm)
  email.addEventListener('blur', validacionForm)
    
  function validacionForm(e){
    if (nombre.value !== "" && apellido.value !== "" && telefono.value !== "" && email.value !== ""){
      btnSubmit.removeAttribute('disabled');
    } 
  }



  btnSubmit.addEventListener("click", (event)=>{
    event.preventDefault()
    document.getElementById("formulario").reset()
      Swal.fire({
          icon: 'success',
          title: `¡Tus datos fueron envíados con exito, nos pondremos en contacto en breve!`,
          confirmButtonText: '<i class="material-icons right">thumb_up</i>Genial!',
          timer: 3500,
        }).then((result) => {
          window.location.href ='/'
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
