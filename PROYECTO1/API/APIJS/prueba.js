fetch(
    "https://api.igdb.com/v4/languages",
    { method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Client-ID': 'rf5rz2l7mhh48x5q4dyqyuiikr3dyg',
        'Authorization': 'Bearer 1hkmbgavqo7ztv6wvc71gts84u4z1q',
      },
      body: "fields *; sort id desc;"
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