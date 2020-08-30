let qrTimeLine = infoQR
let contador = 0
let estadoVidSabio = 0;

const pintarEnMaleta = () => {
    
    try {

        let listMaleta = JSON.parse(localStorage.getItem("maleta"));
        let listaPiezas = JSON.parse(localStorage.getItem("piezas"));
        
        let piezas_filtradas = listaPiezas.filter(
            (pieza) => {
              let ok = false;
              for (let i = 0; i < listMaleta.length; i++) { // Corta cuando no hay mas following o cuando ya se encontró uno
                let listMaletas = listMaleta[i];
                if (listMaletas['qr'] == pieza['contenido'])
                  ok = true;
              }
              return ok;
          })

        const arrayFiltrado = piezas_filtradas.map(pieza => {

           return   `<img  width='60' class='icons-maleta mx-1' src='/assets/img/icons/${pieza.nombre}.png' alt='Image' onclick="iconClickEvent('${pieza.contenido}')" />`;
            // console.log("piezasss:")
            // console.log(pieza.nombre);

        })

        $(".contenido").html(arrayFiltrado)

        // console.log("listaObjetos")
        // console.log(arrayFiltrado)
        // console.log(document.getElementsByClassName('contenido').innerHTML)
        
    } catch (error) {
        console.log(error)
    }
}

const  salirVideo = (idVideo) => {
    
      
    if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
      }     
    let videoIntro = document.getElementById(idVideo)
    videoIntro.pause();
    videoIntro.currentTime = 0;
    
}

const  goFullscreen = (idFS, idVideo, ocultarModal, AbrirModal) => {

    let element = document.getElementById(idFS);       
    if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    }  
    let videoIntro = document.getElementById(idVideo)
    videoIntro.currentTime = 0;
    videoIntro.play();

    videoIntro.onended = function () {
        // console.log("entra al onended");
        $(ocultarModal).modal("hide");
        salirVideo(idVideo)
        $(AbrirModal).modal('show')

    };
}

const videoSabioAgradeciendo = (contadorPiezas) => {

    if(contadorPiezas === 5) {

        goFullscreen('videoOnModalSabio', 'videoSabio', '#videoModalSabio', '#modalCompartirLogro');
        console.log('Sabio agradecido');

        $('#videoModalSabio').modal({
            show: true
        }) 
    }
}

document.getElementById("saltarVideoSabio").onclick = () => {

    salirVideo('videoSabio')
    $("#videoModalSabio").modal("hide");
    
    // // salirFullScreen()
    // api.getData(url, modalPreguntaMaleta)
    
  };

document.getElementById("saltarVideoFinal").onclick = () => {

    
    salirVideo('videoFinal')
    $("#videoModalFinal").modal("hide");
    location.href="personajes.html"; 
    // // salirFullScreen()
    // api.getData(url, modalPreguntaMaleta)
    
};

const playAudioMaleta = (aud) => {

    aud.play();
  }
  

const iconClick  = iconQR => {


    
    let listMaleta = JSON.parse(localStorage.getItem("maleta"));
    let piezas_filtrados = listMaleta.filter((pieza) => pieza.qr !== iconQR)
    const audPCorrecta = document.getElementById('audioPiezaMaletaCorrecta');
    const audPIncorrecta = document.getElementById('audioPiezaMaletaIncorrecta');
    if (infoQR === 'M1' && iconQR === 'love.mp4'){
        
        console.log('Pieza Correcta M1');
        contador++;
        localStorage.setItem('maleta', JSON.stringify(piezas_filtrados));
        
        playAudioMaleta(audPCorrecta)

    }else if(infoQR === 'M2' && iconQR === 'Agua.mp4'){

        console.log('Pieza Correcta M2');
        contador++;
        localStorage.setItem('maleta', JSON.stringify(piezas_filtrados));
        playAudioMaleta(audPCorrecta);

    }else if(infoQR === 'M3' && iconQR === 'sad.mp4'){

        console.log('Pieza Correcta M3');
        contador++;
        localStorage.setItem('maleta', JSON.stringify(piezas_filtrados));
        playAudioMaleta(audPCorrecta)

    }else if(infoQR === 'M4' && iconQR === 'Street.mp4'){

        console.log('Pieza Correcta M4');
        contador++;
        localStorage.setItem('maleta', JSON.stringify(piezas_filtrados));
        playAudioMaleta(audPCorrecta)

    }else if(infoQR === 'M5' && iconQR === 'train.mp4'){

        console.log('Pieza Correcta M5');
        contador++;
        localStorage.setItem('maleta', JSON.stringify(piezas_filtrados));
        playAudioMaleta(audPCorrecta)

    }else {
        playAudioMaleta(audPIncorrecta)
    }

    
    pintarEnMaleta()
    videoSabioAgradeciendo(contador)
    
    console.log(contador)
    console.log(piezas_filtrados)
    
}



$('#maleta').click(() => {

    pintarEnMaleta()
});

$('#actualizarMaleta').click(() => {

    pintarEnMaleta()
});

const modalPublicar = (modalCerrar, modalAbrir) => {

    $(modalCerrar).modal('hide');

    setTimeout(() => {

        $(modalAbrir).modal('show');
    }, 500);
}


document.getElementById("btnPublicar").onclick = () => {
    
    modalPublicar('#modalCompartirLogro', '#modalPublicar')
    console.log('btnPublicar')
    let maleta = document.getElementById("maletaVirtual")
    maleta.classList.add('d-none')
}

document.getElementById("btnYaPublicado").onclick = () => {

    modalPublicar('#modalPublicar', '#modalDescargarImagen')
    console.log('btnYaPublicado')

    
}

document.getElementById("publicarImagen").onclick = () => {

    modalPublicar('#modalDescargarImagen', '#modalPublicarImagen')
    console.log('publicarImagen')
}

document.getElementById("btnPublicarImagenP").onclick = () => {

    modalPublicar('#modalPublicarImagen', '#videoModalFinal')

    let element = document.getElementById('videoOnModalFinal');       
    if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    }  

    let videoIntro = document.getElementById('videoFinal')
    videoIntro.currentTime = 0;
    videoIntro.play();

    videoIntro.onended = function () {
        // console.log("entra al onended");
        salirVideo('videoFinal')
        $("#videoModalFinal").modal("hide");
        location.href="personajes.html"; 

    };
    
}

document.getElementById("btnDescargar").onclick = () => {

    setTimeout(() => {

        modalPublicar('#modalDescargarImagen', '#videoModalFinal')

        let element = document.getElementById('videoOnModalFinal');       
        if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        }  
    
        let videoIntro = document.getElementById('videoFinal')
        videoIntro.currentTime = 0;
        videoIntro.play();
    
        videoIntro.onended = function () {
            // console.log("entra al onended");
            salirVideo('videoFinal')
            $("#videoModalFinal").modal("hide");
            location.href="personajes.html"; 
    
        };
    
    }, 2500);

   

    console.log('Descargar')
}

const modalBorrarPieza = (data) => {
 
    const piezaLocalStorage = JSON.parse(localStorage.getItem('piezas'));
    // console.log("piezaLocalStorage: ")
    // console.log(piezaLocalStorage)
  
    const arrayData = piezaLocalStorage.filter(pieza => pieza.contenido === data)
    // console.log('arrayleerMaleta: ')
    // console.log(arrayData)
    // console.log(arrayData[0].nombre)
  
    $('#nombrePiezaABorrar').html(`¡${arrayData[0].nombre}!`)
    $('#modalBorrarPieza').modal('show')
  }



const iconClickBorrar  = iconQR => {

        console.log('Pieza Doble Click:' + iconQR);
        modalBorrarPieza(iconQR)

}

let DELAY = 230, clicks = 0, timer = null, nombreIcono = '';

const iconClickEvent = (pieza) => {
    console.log('lee')

    clicks++;  //count clicks

    if(clicks === 1) {

        timer = setTimeout(function() {

            iconClick(pieza)
            clicks = 0;             //after action performed, reset counter

        }, DELAY);

    } else {

        nombreIcono = pieza;
        clearTimeout(timer);    //prevent single-click action
        iconClickBorrar(pieza)
        clicks = 0;             //after action performed, reset counter

    }

};
 
const elimirarPieza = (iconName) => {

    let listMaleta = JSON.parse(localStorage.getItem("maleta"));
    let piezas_filtrados = listMaleta.filter((pieza) => pieza.qr !== iconName)
    localStorage.setItem('maleta', JSON.stringify(piezas_filtrados));
    
    const audPCorrecta = document.getElementById('audioPiezaMaletaCorrecta');
    playAudioMaleta(audPCorrecta)
    pintarEnMaleta()
    
} 

document.getElementById("borrarPieza").onclick = () => {

    elimirarPieza(nombreIcono)
    console.log(nombreIcono)
    $('#modalBorrarPieza').modal('hide')
  };
  