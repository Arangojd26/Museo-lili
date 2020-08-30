

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

const formImagen = document.forms.formularioImagenTwitter;

const postFormImagen = async (body) => {
    console.log(body);
    return await fetch(`http://localhost:3000/twitter/postTweetsMedia`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    });
  };

const handleSubmitImagen = async (e) => {
    e.preventDefault();
    const body = JSON.stringify(Object.fromEntries(new FormData(e.target)));
    
    const res = await postFormImagen(body);
    const data = await res.json();
    
    console.log(data.json);
};

formImagen.addEventListener('submit', handleSubmitImagen);

