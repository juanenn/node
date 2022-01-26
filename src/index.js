
//MySQL conexion a base de datos
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "10.192.240.25",
    user: "cuentaSanti",
    password: "1234",
    database: "bd_taller",
    port : "3307"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

// //variables

const express = require('express');
const app = express();
const morgan=require('morgan');

 //Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2)


//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//consulta usuarios
app.get('/usuarios', (req, res) => {
  let sql2="SELECT * FROM lista_usuario";
  con.query(sql2, function (err, result) {
    if (err) throw err;
    res.json(result);
    console.log("Result: " + JSON.stringify(result,null,2));
  });
})
  // consulta pasando un id de usuario por navegador
  app.get('/lista_usuario', (req, res) => {
    const id_usu=req.query.id_usuario;
    let sql2="SELECT * FROM lista_usuario WHERE id_usuario="+id_usu+"";
    con.query(sql2, function (err, result) {
      if (err) throw err;
      res.json(result);
      console.log("Result: " + JSON.stringify(result,null,2));
    });
  })
  //lista de vehiculos filtrando por un id usuario

app.get('/vehiculos', (req, res) => { 
  const id_usu=req.query.id_usuario; 
  let sql2 = "SELECT * from lista_vehiculos where id_usuario="+id_usu+"";
    con.query(sql2, function (err, result) {
      if (err) throw err;
      res.json(result);
      console.log("Result: " + JSON.stringify(result,null,2));
    });
  })
//informacion de un vehiculo filtrando por id vehiculo
app.get('/infoVehiculo', (req, res) => { 
  const id_vehiculo=req.query.id_matricula; 
  let sql2 = "SELECT * from lista_vehiculos where id_matricula="+id_vehiculo+"";
    con.query(sql2, function (err, result) {
      if (err) throw err;
      res.json(result);
      console.log("Result: " + JSON.stringify(result,null,2));
    });
  })

  //Lista de servicios filtrando por un ID de vehículo
  app.get('/Servicios', (req, res) => { 
    const id_vehiculo=req.query.id_matricula; 
    let sql2 = "SELECT * from lista_servicios where id_matricula="+id_vehiculo+"";
      con.query(sql2, function (err, result) {
        if (err) throw err;
        res.json(result);
        console.log("Result: " + JSON.stringify(result,null,2));
      });
    })
    //Información de un servicio filtrando por el ID del servicio
    app.get('/infoServicios', (req, res) => { 
      const id_servicio=req.query.id_servicio; 
      let sql2 = "SELECT * from lista_servicios where id_servicio="+id_servicio+"";
        con.query(sql2, function (err, result) {
          if (err) throw err;
          res.json(result);
          console.log("Result: " + JSON.stringify(result,null,2));
        });
      })
  // modificar(editar) un usuario 
  
app.post('/editUsuario',(req,res)=>{
  const id_usu=req.query.id_usuario;
  const nombre=req.query.nombre;
  // const dni=req.query.dni;

  let sql="UPDATE lista_usuario set nombre='"+nombre+"'where id_usuario="+id_usu;
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.json(result);
      console.log("Result: " + JSON.stringify(result,null,2));
    });
} )
// crear un nuevo usuario
app.post('/crearUsuario',(req,res)=>{
  const id_usu=req.query.id_usuario;
  const nombre=req.query.nombre;
  const apellidos=req.query.apellidos;
  const dni=req.query.dni;
  const telefono=req.query.telefono;
  const email=req.query.email;
  const pass=req.query.contrasena;
   let sql="insert into lista_usuario values('"+id_usu+'","'+nombre+'","'+'","'+apellidos+'","'+dni+'","'+telefono+'","'+email+'","'+pass+'")"';
   con.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
    console.log("Result: " + JSON.stringify(result,null,2));
  });
})
  const dni=req.query.dni;

  let sql="UPDATE lista_usuario set nombre='"+nombre+"'where id_usuario="+id_usu;
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.json(result);
      console.log("Result: " + JSON.stringify(result,null,2));
    });

 //Iniciando el servidor, escuchando...
app.listen(app.get('port'),()=>{
     console.log(`Server listening on port ${app.get('port')}`);
});



//Routes
app.use(require('./routes/index'));

const { Router } = require('express');
const router = Router();
 
