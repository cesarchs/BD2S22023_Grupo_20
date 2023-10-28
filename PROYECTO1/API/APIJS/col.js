import fetch from 'node-fetch';
var num = 1
fetch(
    "https://api.igdb.com/v4/games",
    { method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Client-ID': 'wvy8k49cvhyd1yywjd9ur7hkpl7zoc',
        'Authorization': 'Bearer jk61hgwkq8sagb0fupl2h78assu74j',
      },
      body: `fields *; where id = 1559 ;sort id desc;`
  })
  .then(response => {
    if (!response.ok) {
        console.log("REPONSE",response)
        throw new Error(`Error HTTP: ${response.status}`);
    }
    return response.json();
})
.then(data => {
    console.log(data); // Ahora aquí deberías ver los datos deserializados
})
.catch(err => {
    console.error(err);
});



{
    comment:{

    }

}