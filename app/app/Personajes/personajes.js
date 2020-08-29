const abrirLuis = () => {

    location.href="Luis.html"; 
}

const abrirIsabel = () => {

    location.href="Isabel.html"; 
}


const volverAPersonajes = () => {

   return location.href="personajes.html"; 
}

const  goFullscreen = (idFS, idVideo) => {

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
      $("#modal-fullscreen").modal("hide");
      location.href="scan.html";
      // modalPreguntaMaleta()
    };
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
    location.href="scan.html"; 
}

// let videoIsa = document.getElementById("videoIsabel");
// videoIsa.onended = function() {
//     alert("The audio has ended");
// }; 
