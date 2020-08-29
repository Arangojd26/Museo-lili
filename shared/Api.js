class Api {

    constructor(){
        
    }
    
    async getData(url, metodo){

        await fetch(url)
            .then(response => {
                return response.json();
            })
            .then(myJson => {

                console.log('arrayMaleta: ')
                metodo(myJson)
            });
        // console.log("s")
    }

    async postData(datosQR, URL) {

        console.log('Entra al metodo enviarDatos')

        await fetch(URL, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(datosQR), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.log('json raro'))
            .then(response => console.log('Success'));
    }

    
}