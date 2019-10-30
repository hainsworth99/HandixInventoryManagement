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

/*
*********************************************************************************************************
* parts requests ****************************************************************************************
*********************************************************************************************************
*/

// get all parts
app.get('/api/parts', (req, res) => {
    let sql = "SELECT * FROM part";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

// create new part (basic CRUD)
app.post('/api/parts',(req, res) => {
    let data = {
        PartID: req.body.PartID,
        PartName: req.body.PartName,
        PartDescription: req.body.PartDescription,
        QuantityPerPops: req.body.QuantityPerPops,
        CostPerUnit: req.body.CostPerUnit,
        URLForReorder: req.body.URLForReorder,
        CurrentInventoryCount: req.body.CurrentInventoryCount,
        PartNotes: req.body.PartNotes
    };
    let sql = "INSERT INTO part SET ?";
    let query = conn.query(sql, data,(err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

// read part (basic CRUD)
app.get('/api/parts/:id', (req, res) => {
    let sql = "SELECT * FROM part WHERE PartID='" + req.params.id + "'";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

// update part (basic CRUD)
app.put('/api/parts/:id',(req, res) => {
    let sql = "UPDATE part SET PartID='" + req.body.PartID +
                        "', PartName='" + req.body.PartName +
                        "', PartDescription='" + req.body.PartDescription +
                        "', QuantityPerPops='" + req.body.QuantityPerPops +
                        "', CostPerUnit='" + req.body.CostPerUnit +
                        "', URLForReorder='" + req.body.URLForReorder +
                        "', CurrentInventoryCount='" + req.body.CurrentInventoryCount +
                        "', PartNotes='" + req.body.PartNotes +
                         "' WHERE PartID='" + req.params.id + "'";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

// delete part (basic CRUD)
app.delete('/api/parts/:id',(req, res) => {
  let sql = "DELETE FROM part WHERE PartID='"+req.params.id+"'";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

/*
***********************************************************************************************************
* assemblies requests *************************************************************************************
***********************************************************************************************************
*/
// get all assemblies
app.get('/api/assemblies', (req, res) => {
    let sql = "SELECT * FROM assembly";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

// create new assembly (basic CRUD)
app.post('/api/assemblies', (req, res) => {
    let sql = "INSERT INTO assembly SET ?";
    let data = {
        AssemblyID: req.body.AssemblyID,
        AssemblyName: req.body.AssemblyName,
        CurrentInventoryCount: req.body.CurrentInventoryCount,
        AssemblyNotes: req.body.AssemblyNotes,
        ParentAssembly: req.body.ParentAssembly
    }
    let query = conn.query(sql, data, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

// read assembly (basic CRUD)
app.get('/api/assemblies/:id', (req, res) => {
    let sql = "SELECT * FROM assembly WHERE AssemblyID = '" + req.params.id + "'";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

// update assembly (basic CRUD)
app.put('/api/assemblies/:id', (req, res) => {
    let sql = "UPDATE assembly SET AssemblyID = '" + req.body.AssemblyID +
        "', AssemblyName = '" + req.body.AssemblyName +
        "', CurrentInventoryCount = '"+ req.body.CurrentInventoryCount +
        "', AssemblyNotes = '" + req.body.AssemblyNotes +
        "', ParentAssembly = '" + req.body.ParentAssembly +
        "' WHERE AssemblyID = '" + req.body.AssemblyID + "'";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

// delete assembly (basic CRUD)
app.delete('/api/assemblies/:id', (req, res) => {
    let sql = "DELETE FROM assembly WHERE AssemblyID = '" + req.params.id + "'";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

/*
***********************************************************************************************************
* part-assembly relationship requests *********************************************************************
***********************************************************************************************************
*/

// create new part-assembly relationship (basic CRUD)
app.post('/api/parts_in_assembly', (req, res) => {
    let data = {
        Assembly_AssemblyID: req.body.AssemblyID,
        Part_PartID: req.body.PartID,
        PartCountPerAssembly: req.body.PartCountPerAssembly
    };
    let sql = "INSERT INTO Part_has_Assembly SET ?";
    let query = conn.query(sql, data, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

// read part-assembly relationship (basic CRUD)
app.get('/api/parts_in_assembly/:pid/:aid', (req, res) => {
    let sql = "SELECT * FROM Part_has_Assembly WHERE Part_PartID = '" + req.params.pid + "' AND Assembly_AssemblyID = '" + req.params.aid + "'";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

// update part-assembly relationship (basic CRUD)
app.put('/api/parts_in_assembly/:pid/:aid/:count', (req, res) => {
    let sql = "UPDATE Part_has_Assembly SET PartCountPerAssembly = " + req.params.count +
        " WHERE Assembly_AssemblyID = '" + req.params.aid +
        "' AND Part_PartID = '" + req.params.pid + "'";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

// delete part-assembly relationship (basic CRUD)
app.delete('/api/parts_in_assembly/:pid/:aid', (req, res) => {
    let sql = "DELETE FROM Part_has_Assembly WHERE Assembly_AssemblyID = '" + req.params.aid + "' AND Part_PartID = '" + req.params.pid + "'";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

app.listen(3000, () => {
  console.log('Server started on port 3000...');
});