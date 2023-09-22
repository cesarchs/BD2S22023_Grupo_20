fetch(
    "https://api.igdb.com/v4/release_dates",
    { method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Client-ID': 'wvy8k49cvhyd1yywjd9ur7hkpl7zoc',
        'Authorization': 'Bearer jk61hgwkq8sagb0fupl2h78assu74j',
      },
      body: "fields category,checksum,created_at,date,game,human,m,platform,region,status,updated_at,y; where id =  ;"
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