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

  var carrito =[]
    if (localStorage.getItem("carrito")) {
      carrito= JSON.parse(localStorage.getItem("carrito"))
      console.log(carrito)
    } 

  dibujarTablaCarrito(carrito,contenedorCarrito)
    
  

if (tablaFarmacia) {
  dibujarTablaProductos(infoAPI, tablaFarmacia)
} else if (tablaJuguetes){
  dibujarTablaProductos(infoAPI, tablaJuguetes)
}

  function dibujarTablaProductos(array, dato1){

    
    dato1.innerHTML = "";
    if (tablaFarmacia) {
      array = array.filter((producto)=> producto.tipo == "Medicamento") 
      dibujarTablaCarrito(carrito,contenedorCarrito)        
    } else if(tablaJuguetes){
      array = array.filter((producto)=> producto.tipo == "Juguete")
      dibujarTablaCarrito(carrito,contenedorCarrito) 
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
            <button class="btn-floating kart btn pulse halfway-fab waves-effect waves-light red"><i id="${element._id}"class="btnCarrito material-icons">add_shopping_cart</i></button>
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
            <button class="btn-floating kart btn pulse halfway-fab waves-effect waves-light red"><i id="${element._id}"class="btnCarrito material-icons">add_shopping_cart</i></button>
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
                  if (!carrito.includes(element)) {
                    carrito.push(element)}                  
                  console.log(carrito)
                  localStorage.setItem("carrito", JSON.stringify(carrito))
                  M.toast({html: '+ Agregaste un elemento al carrito', classes: 'light green rounded '})
                } else {
                  M.toast({html: 'No se puede agregar más unidades de este artículo', classes: 'rounded light red'})
                }}
            return element
        })
        dibujarTablaCarrito(carrito,contenedorCarrito) 
        })
    });    
  }
  
  function dibujarTablaCarrito(carrito, dato1){

    yaEnCarrito = carrito.filter(element => element.agregado)

    var total = 0    
    for (let i = 0; i < yaEnCarrito.length; i++) {
      if (yaEnCarrito[i].precio> 0) {
        total += yaEnCarrito[i].precioEnCarro
      }}
      if (yaEnCarrito.length == 0){
        total = 0
      }
      if (yaEnCarrito.length === 0) {
      document.getElementById("contenedorCarrito").innerHTML = `<td colspan="4" style="text-align: center; color: white; font-size: 40px;">¡Aún no has añadido ningun elemento de la lista a tu carrito!</td>`  
      document.getElementById("calculadorPrecio").innerHTML =`<td colspan="3" style="text-align: center; font-weight: bold; font-size: 30px;">TOTAL</td> 
      <td> $0</td> `    
      } else{
      dato1.innerHTML =""
      yaEnCarrito.map(element =>{
        const tarjetaCarrito = document.createElement("tr") 
        tarjetaCarrito.className = "tablaCarrito" 
        tarjetaCarrito.innerHTML +=`
              <td><img class=" z-depth-5 borderRadious" src="${element.imagen}"></td>
              <td>${element.nombre}</td>
              <td>$${element.precioEnCarro}</td>
              <td class="carritoCantidad"><button class="z-depth-3 btn-floating waves-effect waves-light red"><i id="-${element._id}"class="material-icons">remove</i></button>${element.cantidad}<button class="z-depth-3 btn-floating waves-effect waves-light red"><i id="+${element._id}"class="material-icons">add</i></button></td>`
            dato1.appendChild(tarjetaCarrito)
            const calculadorPrecio = document.getElementById("calculadorPrecio")
            calculadorPrecio.innerHTML=`
            <td><button  id="borrarCarrito"class="z-depth-5 btn waves-effect waves-light red">VACIAR CARRITO</button></td>
            <td style="text-align: center; font-weight: bold; font-size: 30px;">TOTAL</td> 
            <td>$${total}</td>            
            <td><button id="finalizarCompra" class="z-depth-5 btn waves-effect waves-light green">FINALIZAR COMPRA</button></td> `
            document.getElementById("finalizarCompra").addEventListener('click', (e) =>{
              M.toast({html: 'Acá te derivaría a la pasarela de pagos... Si tuviera una😪', classes: 'light green rounded '})
            })
            
            document.getElementById("borrarCarrito").addEventListener('click', (e) => {
              yaEnCarrito.forEach(element => { 
                element.stock += element.cantidad
                element.cantidad = element.cantidad - element.cantidad
                element.agregado = false
                carrito = []
                localStorage.removeItem("carrito")
               });     
                    dibujarTablaCarrito(carrito,contenedorCarrito)             

            })

            document.getElementById(`-${element._id}`).addEventListener('click', (e) => {
              const idABuscar = e.target.id
              console.log(yaEnCarrito)
              yaEnCarrito = yaEnCarrito.map(element => {
                if ("-"+element._id == idABuscar){ 
                      element.cantidad -= 1
                      element.stock += 1
                      element.precioEnCarro = element.cantidad * element.precio
                      if (element.cantidad ==0) {
                        element.agregado = false
                        localStorage.removeItem("carrito")
                      }                      
                  }
                  return element
              })
              dibujarTablaCarrito(carrito,contenedorCarrito)

            })
            document.getElementById(`+${element._id}`).addEventListener('click', (e) => {
              const idABuscar = e.target.id
              yaEnCarrito = yaEnCarrito.map(element => {
                if ("+"+element._id == idABuscar){ 
                  if (element.stock > 0) {
                    element.cantidad += 1
                    element.stock -= 1
                    element. precioEnCarro = element.cantidad * element.precio
                  } else {
                    M.toast({html: 'No se puede agregar más unidades de este artículo', classes: 'rounded light red'})
                  }}
                  return element
              })

              dibujarTablaCarrito(carrito,contenedorCarrito)

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

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.addEventListener("click", function(event) {
  modal.style.display = "block";
})

// When the user clicks on <span> (x), close the modal
span.addEventListener("click", function(event) {
  modal.style.display = "none";
})

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
})