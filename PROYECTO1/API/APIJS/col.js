import fetch from 'node-fetch';
fetch(
    "https://api.igdb.com/v4/collections",
    { method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Client-ID': 'wvy8k49cvhyd1yywjd9ur7hkpl7zoc',
        'Authorization': 'Bearer jk61hgwkq8sagb0fupl2h78assu74j',
      },
      body: "fields checksum,created_at,games,name,slug,updated_at,url; where id = 8963;"
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