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

  app.get('/lista_usuario', (req, res) => {
    const id_usu=req.query.id_usuario;
    let sql2="SELECT * FROM lista_usuario WHERE id_usuario="+id_usu+"";
    con.query(sql2, function (err, result) {
      if (err) throw err;
      res.json(result);
      console.log("Result: " + JSON.stringify(result,null,2));
    });
  })
  //Nuestro primer WS get
// app.get('/', (req, res) => {    
//   let sql = "SELECT * from lista_vehiculos where marca = 'Fiat'";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       res.json(result);
//       console.log("Result: " + JSON.stringify(result,null,2));
//     });
//   })