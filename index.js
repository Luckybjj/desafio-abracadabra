// Exporta Modulo , se crea una instancia express
const express = require('express');
// Se guarda en una constante app la ejecución de la instancia
const app = express()
// Puerto
const PORT = 3000
const fs = require('fs')
//const path = require('path')

// Método listen
app.listen(PORT, () => {
  console.log(`Server ON PORT ${PORT}`);
})
// Se ocupa un middleware y el método "static" de express para declarar la carpeta "assets" como directorio publico del servidor
app.use(express.static("assets"));

// Ruta raíz GET que devuelve el documento HTML
/*
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html')
});
*/
// Ruta GET "/adacadabra/usuarios" que devuelve un archivo JSON
app.get("/adacadabra/usuarios", (req, res) => {
  res.sendFile(__dirname + '/usuarios.json')
});

// 05 ruta "/abracadabra/conejo/:n" que valide si el parametro n coincide con un número generado de forma aleatorea
app.get("/abracadabra/conejo/:n", (req, res) => {
  const num = Math.floor(Math.random() * (5 - 1)) + 1;
  const n = req.params.n
  /*
  n == num
      ? res.sendFile(__dirname + '/assets/conejito.jpg')
      : res.sendFile(__dirname + '/assets/voldemort.jpg')
    */
  n == num
    ? res.redirect('/conejito.jpg')
    : res.redirect('/voldemort.jpg')
});

/*
app.use("/assets", express.static(path.join(__dirname, "assets")));
*/

// Middleware con ruta "/abracadabra/juego/:usuario" para validar que el usuario recibido como parametro "usuario"
// existe en el arreglo de usuarios creado en el servidor.
app.use('/abracadabra/juego/:usuario', (req, res, next) => {
  const { usuario } = req.params;
  console.log('usuario', usuario);

  const users = JSON.parse(fs.readFileSync('./usuarios.json', 'utf-8'));
  const lista = users.usuarios.filter((u) => u == usuario);

  console.log('users', users);
  console.log('lista', lista);

  usuario == lista ? next() : res.redirect('/who.jpeg');
});

app.get('/abracadabra/juego/:usuario', (req, res, next) => {
  res.sendFile(__dirname + '/index.html');
});

// Ruta generica que no esta definida en el servidor, que devuleva al mensaje "Esta página no exite.."
// Ruta GET con paramatro "*"
app.get("*", (req, res) => {
  res.send(`<center><h1>Esta página no existe...</h1><center>
    <center><h1 style="color:red">404 page not found</h1><center`)
});

