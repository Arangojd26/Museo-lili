// var contenidoQR = document.getElementById("contenido");
var videoQR;
var estado = 0;
var contenidoQR = '';
let infoQR = ''
const contadorPiezas = 0;
let api = new Api();

(() => {
  const qr = localStorage.getItem('piezas')
  const pieza1 = {
    nombre: 'Marimba Mambik',
    contenido: 'train.mp4'
  }
  const pieza2 = {
    nombre: 'Flauta Mambik',
    contenido: 'Street.mp4'
  }
  const pieza3 = {
    nombre: 'Hombre de la tierra',
    contenido: 'sad.mp4'
  }
  const pieza4 = {
    nombre: 'Diosa de las aguas',
    contenido: 'Agua.mp4'
  }
  const pieza5 = {
    nombre: 'Amor de antaño',
    contenido: 'love.mp4'
  }
  const pieza6 = {
    nombre: 'Princesa Leilla',
    contenido: 'woman.mp4'
  }
  let arrayPiezas = [pieza1,pieza2,pieza3,pieza4,pieza5,pieza6];
  if(qr === null){
    localStorage.setItem('piezas', JSON.stringify(arrayPiezas));
  }
})();

const mensajeConfirmacion = (confirma) => {

  let tituloModal = ''
  if(confirma === 0){
    tituloModal='La pieza ya se encuentra en tu maleta de explorador virtual'
  }else if(confirma === 1){
    tituloModal='¡Agregaste la pieza a tu maleta de explorador virtual!'
  }else{
    tituloModal='!Tu maleta ya se encuentra llena! Dirigite a la linea de tiempo para reconstruir la historia del pacífico colombiano'
  }

  $('#mensajeConfirmacion').html(tituloModal);
  $('#modalPiezaConfirmada').modal('show')

}

function addEntry() {
  // Parse any JSON previously stored in allEntries
  let existingEntries = JSON.parse(localStorage.getItem("maleta"));
  let datosActuales = {
    email: 'arango@gmail.com',
    qr: infoQR
  }
  if(existingEntries === null) existingEntries = [datosActuales];

  

  localStorage.setItem("entry", JSON.stringify(datosActuales));
  // Save allEntries back to local storage
  existingEntries.push(datosActuales);
  localStorage.setItem("maleta", JSON.stringify(existingEntries));
};


const compararDatos =  (datosServidor) => {

  // let datosStorage = JSON.parse(localStorage.getItem('maleta'));

  // const datosActuales = {
  //   email: 'arango@gmail.com',
  //   qr: infoQR
  // }

  // if (datosStorage === null) {

  //   let data = [datosActuales]
  //   localStorage.setItem('maleta', JSON.stringify(data));
  //   console.log("datosStorage: ")
  //   console.log(datosStorage)

  //   datosStorage.push(datosActuales);
  //   console.log(datosStorage)

  // } else {
  let datosActuales = {
    email: 'arango@gmail.com',
    qr: infoQR
  }
  let existingEntries = JSON.parse(localStorage.getItem("maleta"));
  if(existingEntries === null) existingEntries = [];


  // // localStorage.setItem("maleta", JSON.stringify(datosActuales))
  // existingEntries.push(datosActuales);;
  // localStorage.setItem('maleta', JSON.stringify(existingEntries));
      
  
  

  // localStorage.setItem("maleta", JSON.stringify(existingEntries));

    // console.log('datosStorage Else: ')
    // console.log(existingEntries)
    const arrayFiltrado = existingEntries.filter(pieza => pieza.qr === datosActuales.qr)


    // console.log("DatosServer: ")
    // console.log(existingEntries.length)
    if (arrayFiltrado.length > 0) {

      console.log('Ya existe la pieza en la maleta.')
      mensajeConfirmacion(0)
    } else if (arrayFiltrado.length <= 0 && existingEntries.length < 5) {

      // enviarDatos(data, url)

      // api.postData(data, url)
      mensajeConfirmacion(1)
      existingEntries.push(datosActuales);
      localStorage.setItem('maleta', JSON.stringify(existingEntries));
      
    } else if (existingEntries.length >= 5) {

      console.log('La maleta está llena')
      mensajeConfirmacion(2)
    }

    // console.log('array filtrado: ')
    // console.log(arrayFiltrado)
  
  // }
  
  

}


const modalPreguntaMaleta = (data) => {
 
  const piezaLocalStorage = JSON.parse(localStorage.getItem('piezas'));
  // console.log("piezaLocalStorage: ")
  // console.log(piezaLocalStorage)

  const arrayData = piezaLocalStorage.filter(pieza => pieza.contenido === infoQR)
  // console.log('arrayleerMaleta: ')
  // console.log(arrayData)
  // console.log(arrayData[0].nombre)

  $('#nombrePieza').html(`¡${arrayData[0].nombre}!`)
  $('#modalConfirmarPieza').modal('show')
}

const videoFullScreen = () => {

  let element = document.getElementById('videoOnModal');       
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}


const controlModalVideo = (contentQR) => {

  var contenido = document.getElementById("contenido").innerHTML = `<video autoplay id='videoQR'><source src='assets/vid/${contentQR}' type='video/mp4'></video>`;

  // console.log(contenido);
  
  $('#videoModal').modal({
      show: true
      
  })
  
  estado = 2;

  // document.addEventListener("keydown", function(e) {
  //   if (e.keyCode == 13) {
  //     toggleFullScreen();
  //   }
  // }, false);
  // Cuando el video termine de reproducir cierra el modal y abre el de la pregunta.
  if(estado === 2){
    
    videoQR = document.getElementById("videoQR");
    videoQR.onended = function () {
      // console.log("entra al onended");
      $("#videoModal").modal("hide");

      // api.getData(url, modalPreguntaMaleta)
      modalPreguntaMaleta()
    };
  }
}

let scanner = new Instascan.Scanner({ video: document.getElementById('preview'), mirror: false });
          scanner.addListener('scan', function (content) {
            contenidoQR = content
            if(contenidoQR !== 'M1' && contenidoQR !== 'M2' && contenidoQR !== 'M3' &&  contenidoQR !== 'M4' && contenidoQR !== 'M5'){
              controlModalVideo(content) 
            }
            

            let element = document.getElementById('videoOnModal');   
            element.addEventListener("fullscreenchange", videoFullScreen);
            element.addEventListener("mozfullscreenchange", videoFullScreen);
            element.addEventListener("webkitfullscreenchange", videoFullScreen);
            element.addEventListener("msfullscreenchange", videoFullScreen);

            infoQR = content
          });
          Instascan.Camera.getCameras().then(function (cameras) {

            if (cameras.length > 0) {
              var selectedCam = cameras[0];
              $.each(cameras, (i, c) => {
                if (c.name.indexOf('back') != -1) {
                  selectedCam = c;
                  return false;
                }
              });
              scanner.start(selectedCam);
            }
            else {
              
              console.error('No cameras found.');
            }
          }).catch(function (e) {
            console.error(e);
          });
        
          
          


// $('#cerrarVideo').click(function() {
    
//   videoQR = document.getElementById("videoQR");
//   videoQR.pause();
//   let url = 'http://localhost:3000/codigos/datosPiezas'
  
//   api.getData(url, modalPreguntaMaleta)
// });

const salirFullScreen = () => {

  try {

    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }
  } catch (error) {
    console.log(error)
  }

  // videoQR.currentTime = 0;     
}

document.getElementById("saltar").onclick = () => {

  videoQR = document.getElementById("videoQR");
  videoQR.pause();
  
  let url = 'http://localhost:3000/codigos/datosPiezas'
  
  // // salirFullScreen()
  // api.getData(url, modalPreguntaMaleta)
  modalPreguntaMaleta()
};


// $('#cerrarVideo2').click(function() {
    
//   videoQR = document.getElementById("videoQR");
//   videoQR.pause();
//   // console.log("Cerró");
// });

// $('#guardar').click(() => {

//   let url1 = 'http://localhost:3000/codigos/datosMaleta'
//   api.getData(url1, compararDatos)

//   $('#modalConfirmarPieza').modal('hide')
// });

document.getElementById("guardar").onclick = () => {

  let url1 = 'http://localhost:3000/codigos/datosMaleta'
  // api.getData(url1, compararDatos)
  compararDatos()
  $('#modalConfirmarPieza').modal('hide')
};
         