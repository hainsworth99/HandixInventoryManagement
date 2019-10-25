const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const config = require('./config.json')

app.use(bodyParser.json());

const conn = mysql.createConnection(config);

conn.connect((err) => {
  if(err) throw err;
  console.log('Mysql Connected...');
});


app.get('/api/parts', (req, res) => {
    let sql = "SELECT * FROM part";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

app.get('/api/assemblies', (req, res) => {
    let sql = "SELECT * FROM assembly";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

app.get('/api/assemblies/:id', (req, res) => {
    console.log(req.url)

    let sql = "SELECT a.AssemblyName, parts.* FROM assembly a, (SELECT pha.Assembly_AssemblyID, p.PartName, p.PartID, pha.PartCountPerAssembly FROM part p, Part_has_Assembly pha WHERE p.PartID = pha.Part_PartID ORDER BY pha.Assembly_AssemblyID) as parts WHERE a.AssemblyID = parts.Assembly_AssemblyID AND a.AssemblyID = '" + req.params.id + "'";

    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results)
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});


app.listen(3000, () => {
  console.log('Server started on port 3000...');
});