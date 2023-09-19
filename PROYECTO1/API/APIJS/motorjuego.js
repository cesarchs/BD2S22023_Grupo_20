fetch(
    "https://api.igdb.com/v4/game_engines",
    { method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Client-ID': 'wvy8k49cvhyd1yywjd9ur7hkpl7zoc',
        'Authorization': 'Bearer jk61hgwkq8sagb0fupl2h78assu74j',
      },
      body: "fields checksum,companies,created_at,description,logo,name,platforms,slug,updated_at,url;"
  })
  .then(response => {
    if (!response.ok) {
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