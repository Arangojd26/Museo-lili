

// const postData = async (datosQR, URL) => {

//     console.log('Entra al metodo enviarDatos')

//     await fetch(URL, {
//         method: 'POST', // or 'PUT'
//         body: JSON.stringify(datosQR), // data can be `string` or {object}!
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }).then(res => res.json())
//         .catch(error => console.log('json raro'))
//         .then(response => console.log('Success'));
// }


const form = document.forms.formularioTwitter;

const postForm = async (body) => {
    console.log(body);
    return await fetch(`http://localhost:3000/twitter/postTweets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    const body = JSON.stringify(Object.fromEntries(new FormData(e.target)));
    
    const res = await postForm(body);
    const data = await res.json();
    
    console.log(data.json);
};

form.addEventListener('submit', handleSubmit);





const webcamElement = document.getElementById('webcam');
const canvasElement = document.getElementById('canvas');
const snapSoundElement = document.getElementById('snapSound');
const webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement);


document.getElementById("camara").onclick = () => {

  console.log('ClickCámara')
  let camaraQR = document.getElementById('vid1');
  let desenfoque = document.getElementById('desenfoque');
  let modalPublicar = document.getElementById('modalPublicarImagen')

  camaraQR.classList.add('d-none')
  modalPublicar.classList.add('d-none')
  desenfoque.classList.add('d-none')
  webcamElement.classList.remove('d-none')

  webcam.start()
    .then(result => {
      console.log("webcam started");
    })
    .catch(err => {
      console.log(err);
    });
   
}







function getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  var dataURL = canvas.toDataURL();
  return dataURL;
}


const formImagen = document.forms.formularioImagenTwitter;

const postFormImagen = async (body) => {

  // console.log(lee);
  console.log(body)
  const bodyEnviar = JSON.stringify(body)
  // console.log(body);
    return await fetch(`http://localhost:3000/twitter/postTweetsMedia`, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Type': 'multipart/form-data'
      },
      body: {
        prueba1: 'pruebaaa1',
        prueba2: 'pruebaaa2'
      }
    });
  };

const handleSubmitImagen = async (e) => {
    e.preventDefault();
    const body = JSON.stringify(Object.fromEntries(new FormData(e.target)));
    let lee = JSON.parse(body)
    let base64 = getBase64Image(document.getElementById("img"));
    let bodyPost = {
      mensajeImagen: lee.mensajeImagen,
      foto: 'base64'
    }
    let bodyTotal = JSON.stringify(bodyPost)
    
    const res = await postFormImagen(bodyTotal);
    const data = await res.json();
    
    console.log(data.json);
};

formImagen.addEventListener('submit', handleSubmitImagen);



document.getElementById("download-photo").onclick = () => {
  
  // document.querySelector('#download-photo').href = picture;
  // document.getElementById("img").src = picture;
  
  let picture = webcam.snap();
  // webcam.flip();
  // webcam.start();
  document.getElementById("img").src = picture;

  let modalPublicar = document.getElementById('modalPublicarImagen')
  modalPublicar.classList.remove('d-none')

  // let base64 = getBase64Image(document.getElementById("img"));
  // console.log(picture);
}