let tablaJuguetes = document.getElementById("tablaJuguetes")
let tablaFarmacia = document.getElementById("tablaFarmacia")
let añadir = document.getElementById("añadir")
let nombre = document.getElementById("nombre")
let apellido = document.getElementById("apellido")
let telefono = document.getElementById("telefono")
let email = document.getElementById("email")
let btnSubmit = document.getElementById("submit")
var contenedorCarrito = document.getElementById("contenedorCarrito")

  if (document.title.includes("Franco's | Contacto")){
    validacionFormYAlert() 
  } else if(document.title.includes("Franco's Vet y Pet Shop")){
    carousel() 
  }


fetch("https://apipetshop.herokuapp.com/api/articulos")
  .then(resp =>resp.json())
  .then(data =>myScript(data))
  .catch(error => console.log(error))


function myScript(data){
  
  infoAPI= JSON.parse(JSON.stringify(data.response))

  infoAPIDefault = JSON.parse(JSON.stringify(infoAPI))
  
    
  var carrito =[]

if (tablaFarmacia) {
  dibujarTablaProductos(infoAPI, tablaFarmacia)
} else if (tablaJuguetes){
  dibujarTablaProductos(infoAPI, tablaJuguetes)
}

  function dibujarTablaProductos(array, dato1){
    
    dato1.innerHTML = "";
    if (tablaFarmacia) {
      array = array.filter((producto)=> producto.tipo == "Medicamento")        
    } else if(tablaJuguetes){
      array = array.filter((producto)=> producto.tipo == "Juguete")
    } else {
      array = ""
    }
    
    array.forEach(element => {   
      const tarjeta = document.createElement("div")  
      tarjeta.className = "carta  "
       if (element.stock <= 5 ) {
        tarjeta.innerHTML+=
        `<div class="z-depth-5 card">
            <img class="cardImage" src="${element.imagen}">           
            <p class="card-title">${element.nombre}</p>
            <p class="card-stock">¡Últimas unidades!</p>
            <div class="card-content">
              <p>${element.descripcion}</p>
            </div>
            <button class="btn-floating kart halfway-fab waves-effect waves-light red"><i id="${element._id}"class="material-icons">add_shopping_cart</i></button>
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
            <button class="btn-floating kart halfway-fab waves-effect waves-light red"><i id="${element._id}"class="material-icons">add_shopping_cart</i></button>
            <p class="card-price">$ ${element.precio}</p>
          </div>`
      }
      dato1.appendChild(tarjeta)
      element.agregado = false
      element.cantidad = 0
      element.precioEnCarro= element.precio
      document.getElementById(element._id).addEventListener('click', (e) => {
        const idBoton = e.target.id
        array = array.map(element => {
            if (element._id === idBoton){
                if (element.stock > 0) {
                  element.agregado = true
                  element.cantidad += 1
                  element.stock -= 1
                  element. precioEnCarro = element.cantidad * element.precio
                }}
            return element
        })

        dibujarTablaCarrito(array,contenedorCarrito) 
        console.log(array)
        })
    });    
  }
  
  function dibujarTablaCarrito(array, dato1){
    var yaEnCarrito = array.filter(element => element.agregado == true)
    console.log(yaEnCarrito)
    var total = 0    
    for (let i = 0; i < yaEnCarrito.length; i++) {
      if (yaEnCarrito[i].precio> 0) {
        total += yaEnCarrito[i].precioEnCarro
      }}
      if (yaEnCarrito.length == 0){
        total = 0
      }
      if (yaEnCarrito.length === 0) {
      document.getElementById("contenedorCarrito").innerHTML = `<td colspan="5" style="text-align: center; color: red; font-size: 30px;">¡Aún no has añadido ningun elemento de la lista a tu carrito!</td>`  
      document.getElementById("calculadorPrecio").innerHTML =`<td colspan="4" style="text-align: center; font-weight: bold; font-size: 30px;">TOTAL</td> 
      <td> $0</td> `    
      } else{
      dato1.innerHTML =""
      yaEnCarrito.map(element =>{
        const tarjetaCarrito = document.createElement("tr")  
        tarjetaCarrito.innerHTML +=`
              <td><img class="borderRadious" src="${element.imagen}"></td>
              <td>${element.nombre}</td>
              <td>${element.precioEnCarro}</td>
              <td><button class="btn-floating waves-effect waves-light red"><i id="R${element._id}"class="material-icons">remove</i></button>${element.cantidad}<button class="btn-floating waves-effect waves-light red"><i id="S${element._id}"class="material-icons">add</i></button></td>`
            dato1.appendChild(tarjetaCarrito)
            const calculadorPrecio = document.getElementById("calculadorPrecio")
            calculadorPrecio.innerHTML=`
            <td colspan="2" style="text-align: center; font-weight: bold; font-size: 30px;">TOTAL</td> 
            <td>$${total}</td> 
            <td><button class="btn waves-effect waves-light green">FINALIZAR COMPRA</button></td> 
            <td><button  id="borrarCarrito"class="btn waves-effect waves-light red">vaciar carrito</button></td>
            `
            document.getElementById("borrarCarrito").addEventListener('click', (e) => {
              yaEnCarrito.forEach(element => { 
                element.stock += element.cantidad
                element.cantidad = element.cantidad - element.cantidad
                element.agregado = false
               });     
                    dibujarTablaCarrito(yaEnCarrito,contenedorCarrito)             

            })

            document.getElementById(`R${element._id}`).addEventListener('click', (e) => {
              const idABuscar = e.target.id
              infoAPI = infoAPI.map(element => {
                if ("R"+element._id == idABuscar){ 
                      element.cantidad -= 1
                      element.stock += 1
                      element. precioEnCarro = element.cantidad * element.precio
                      if (element.cantidad ==0) {
                        element.agregado = false
                      }                      
                  }
                  return element
              })
              dibujarTablaCarrito(array,contenedorCarrito)

            })
            document.getElementById(`S${element._id}`).addEventListener('click', (e) => {
              const idABuscar = e.target.id
              infoAPI = infoAPI.map(element => {
                if ("S"+element._id == idABuscar){ 
                  if (element.stock > 0) {
                    element.cantidad += 1
                    element.stock -= 1
                    element. precioEnCarro = element.cantidad * element.precio
                  }}
                  return element
              })

              dibujarTablaCarrito(array,contenedorCarrito)

            })
      })
    }}
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

