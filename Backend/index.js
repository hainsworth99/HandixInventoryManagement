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
    // ensure data is populated with correct types
    // PartID, PartName, QuantityPerPops, CostPerUnit, CurrentInventoryCount must be defined
    if (typeof data['PartID'] === 'undefined' ||
        typeof data['PartName'] === 'undefined' ||
        typeof data['QuantityPerPops'] === 'undefined' ||
        typeof data['CostPerUnit'] === 'undefined' ||
        typeof data['CurrentInventoryCount'] === 'undefined'){
        res.send(JSON.stringify({"status": 400, "error": "bad request: provide all required fields", "response": null}));
    }
    // check that QuantityPerPops, CostPerUnit, and CurrentInventoryCount are non negative numeric values
    else if (isNaN(data['QuantityPerPops']) || isNaN(data['CostPerUnit']) || isNaN(data['CurrentInventoryCount'])){
        res.send(JSON.stringify({"status": 400, "error": "bad request: QuantityPerPops, CostPerUnit, and CurrentInventoryCount must be numeric", "response": null}));
    }
    else if (data['QuantityPerPops']<0 || data['CostPerUnit']<0 || data['CurrentInventoryCount']<0){
        res.send(JSON.stringify({"status": 400, "error": "bad request: QuantityPerPops, CostPerUnit, and CurrentInventoryCount must be non negative", "response": null}));
    }
    else {
        let sql = "INSERT INTO part SET ?";
        let query = conn.query(sql, data,(err, results) => {
            if(err){
                if (err.errno == 1062){
                    res.send(JSON.stringify({"status": 400, "error": "Bad request: part with PartID '" + req.body.PartID + "' already exits", "response": results}));
                }
                else {
                    throw err;
                }
            }
            else {
                res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            }
        });
    }
});

// read part (basic CRUD)
app.get('/api/parts/:id', (req, res) => {
    let sql = "SELECT * FROM part WHERE PartID='" + req.params.id + "'";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        if (results.length != 0)
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        else
            res.send(JSON.stringify({"status": 404, "error": "Not found: part with PartID '" + req.params.id + "' does not exist", "response": null}));
    });
});

// update part (basic CRUD)
app.put('/api/parts/:id',(req, res) => {
    // ensure data is populated with correct types
    // PartID, PartName, QuantityPerPops, CostPerUnit, CurrentInventoryCount must be defined
    if (typeof req.body.PartID === 'undefined' ||
        typeof req.body.PartName === 'undefined' ||
        typeof req.body.QuantityPerPops === 'undefined' ||
        typeof req.body.CostPerUnit === 'undefined' ||
        typeof req.body.CurrentInventoryCount === 'undefined'){
        res.send(JSON.stringify({"status": 400, "error": "bad request: provide all required fields", "response": null}));
    }
    // check that QuantityPerPops, CostPerUnit, and CurrentInventoryCount are non negative numeric values
    else if (isNaN(req.body.QuantityPerPops) || isNaN(req.body.CostPerUnit) || isNaN(req.body.CurrentInventoryCount)){
        res.send(JSON.stringify({"status": 400, "error": "bad request: QuantityPerPops, CostPerUnit, and CurrentInventoryCount must be numeric", "response": null}));
    }
    else if (req.body.QuantityPerPops<0 || req.body.CostPerUnit<0 || req.body.CurrentInventoryCount<0){
        res.send(JSON.stringify({"status": 400, "error": "bad request: QuantityPerPops, CostPerUnit, and CurrentInventoryCount must be non negative", "response": null}));
    }
    else {
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
            if (results['affectedRows'] != 0)
                res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            else
                res.send(JSON.stringify({"status": 404, "error": "Not found: part with PartID '" + req.params.id + "' does not exist", "response": null}));
        });
    }
});

// delete part (basic CRUD)
app.delete('/api/parts/:id',(req, res) => {
    let sql = "DELETE FROM part WHERE PartID='"+req.params.id+"'";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        if (results['affectedRows'] != 0)
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        else
            res.send(JSON.stringify({"status": 404, "error": "Not found: part with PartID '" + req.params.id + "' does not exist", "response": null}));
    });
});

// update current inventory count
app.put('/api/parts/:id/:count', (req, res) => {
    // ensure count is numeric, non negative
    if (isNaN(req.params.count) || req.params.count<0){
        res.send(JSON.stringify({"status": 400, "error": "bad request: count must be numeric, non negative", "response": null}));
    }
    else {
        let sql = "UPDATE part SET CurrentInventoryCount = " + req.params.count + " WHERE PartID = '" + req.params.id + "'";
        let query = conn.query(sql, (err, results) => {
            if(err) throw err;
            if (results['affectedRows'] != 0)
                res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            else
                res.send(JSON.stringify({"status": 404, "error": "Not found: part with PartID '" + req.params.id + "' does not exist", "response": null}));
        });
    }
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
    // ensure data is populated with correct types
    // AssemblyID, AssemblyName, CurrentInventoryCount, ParentAssembly must be defined
    if (typeof data['AssemblyID'] === 'undefined' ||
        typeof data['AssemblyName'] === 'undefined' ||
        typeof data['ParentAssembly'] === 'undefined' ||
        typeof data['CurrentInventoryCount'] === 'undefined'){
        res.send(JSON.stringify({"status": 400, "error": "bad request: provide all required fields", "response": null}));
    }
    // ensure CurrentInventoryCount is numeric, non negative
    else if (isNaN(data['CurrentInventoryCount']) || data['CurrentInventoryCount']<0){
        res.send(JSON.stringify({"status": 400, "error": "bad request: CurrentInventoryCount must be numeric, non negative", "response": null}));
    }
    else{
        let query = conn.query(sql, data, (err, results) => {
            if(err){
                if (err.errno == 1062){
                    res.send(JSON.stringify({"status": 400, "error": "Bad request: assembly with AssemblyID '" + req.body.AssemblyID + "' already exits", "response": results}));
                }
                else {
                    throw err;
                }
            }
            else {
                res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            }
        });
    }
});

// read assembly (basic CRUD)
app.get('/api/assemblies/:id', (req, res) => {
    let sql = "SELECT * FROM assembly WHERE AssemblyID = '" + req.params.id + "'";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        if (results.length != 0)
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        else
            res.send(JSON.stringify({"status": 404, "error": "Not found: assembly with AssemblyID '" + req.params.id + "' does not exist", "response": null}));
    });
});

// update assembly (basic CRUD)
app.put('/api/assemblies/:id', (req, res) => {
    // ensure data is populated with correct types
    // AssemblyID, AssemblyName, CurrentInventoryCount, ParentAssembly must be defined
    if (typeof req.body.AssemblyID === 'undefined' ||
        typeof req.body.AssemblyName === 'undefined' ||
        typeof req.body.CurrentInventoryCount === 'undefined' ||
        typeof req.body.ParentAssembly === 'undefined'){
        res.send(JSON.stringify({"status": 400, "error": "bad request: provide all required fields", "response": null}));
    }
    // ensure CurrentInventoryCount is numeric, non negative
    else if (isNaN(req.body.CurrentInventoryCount) || req.body.CurrentInventoryCount<0){
        res.send(JSON.stringify({"status": 400, "error": "bad request: CurrentInventoryCount must be numeric, non negative", "response": null}));
    }
    else {
        let sql = "UPDATE assembly SET AssemblyID = '" + req.body.AssemblyID +
            "', AssemblyName = '" + req.body.AssemblyName +
            "', CurrentInventoryCount = '"+ req.body.CurrentInventoryCount +
            "', AssemblyNotes = '" + req.body.AssemblyNotes +
            "', ParentAssembly = '" + req.body.ParentAssembly +
            "' WHERE AssemblyID = '" + req.params.id + "'";
        let query = conn.query(sql, (err, results) => {
            if(err) throw err;
            if (results['affectedRows'] != 0)
                res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            else
                res.send(JSON.stringify({"status": 404, "error": "Not found: assembly with AssemblyID '" + req.params.id + "' does not exist", "response": null}));

        });
    }
});

// delete assembly (basic CRUD)
app.delete('/api/assemblies/:id', (req, res) => {
    let sql = "DELETE FROM assembly WHERE AssemblyID = '" + req.params.id + "'";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        if (results['affectedRows'] != 0)
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        else
            res.send(JSON.stringify({"status": 404, "error": "Not found: part with PartID '" + req.params.id + "' does not exist", "response": null}));
    });
});

// get child assemblies in parent assembly
app.get('/api/assemblies/children/:id', (req, res) => {
    let sql = "SELECT * FROM Assembly WHERE ParentAssembly = '" + req.params.id + "'";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        if (results.length != 0)
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        else
            res.send(JSON.stringify({"status": 404, "error": "Not found: part with PartID '" + req.params.id + "' does not exist", "response": null}));
    });
});

// update current inventory count
app.put('/api/assemblies/:id/:count', (req, res) => {
    // ensure count is numeric, non negative
    if (isNaN(req.params.count) || req.params.count<0){
        res.send(JSON.stringify({"status": 400, "error": "bad request: count must be numeric, non negative", "response": null}));
    }
    else {
        let sql = "UPDATE assembly SET CurrentInventoryCount = " + req.params.count + " WHERE AssemblyID = '" + req.params.id + "'";
        let query = conn.query(sql, (err, results) => {
            if(err) throw err;
            if (results['affectedRows'] != 0)
                res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            else
                res.send(JSON.stringify({"status": 404, "error": "Not found: part with PartID '" + req.params.id + "' does not exist", "response": null}));
        });
    }
});

// increment assembly count - decrements child assembly and part counts
app.put('/api/assemblies/increment/:id/:count', (req, res) => {
    // get number of assemblies to be incremented and ensure given input is a number
    let increment_num = Number(req.params.count);
    if (isNaN(increment_num) || increment_num < 0){ // if invalid count
        res.status(400);
        res.send(JSON.stringify({"status": 400, "error": "bad request: count must be numeric, non negative", "response": null}));
    }
    else { // else
        // get parts and part counts for assembly
        let sql1 = "SELECT Part_PartID, PartCountPerAssembly FROM Part_has_Assembly WHERE Assembly_AssemblyID = '" + req.params.id + "'";
        let query1 = conn.query(sql1, (err, results) => {
            if(err) throw err;
            for(var i = 0; i < results.length; i++){ // for each part/part count in assembly, decrement current part count in inventory
                let sql = "UPDATE part SET CurrentInventoryCount = GREATEST(CAST(CurrentInventoryCount AS SIGNED) - " +
                    increment_num * results[i]['PartCountPerAssembly'] +
                    ", 0) WHERE PartID = '" + results[i]['Part_PartID'] + "'";
                let query = conn.query(sql, (err, results) => {
                    if(err) throw err;
                });
            }
        });
        // get child assemblies for assembly (there should only be one of each kind of child assembly)
        let sql2 = "SELECT AssemblyID FROM assembly WHERE ParentAssembly = '" + req.params.id + "'";
        let query2 = conn.query(sql2, (err, results) => {
            if(err) throw err;
            for(var i = 0; i < results.length; i++){ // for each child assembly, decrement current assembly count in inventory
                let sql = "UPDATE assembly SET CurrentInventoryCount = GREATEST(CAST(CurrentInventoryCount AS SIGNED) - 1" +
                    ", 0) WHERE AssemblyID = '" + results[i]['AssemblyID'] + "'";
                let query = conn.query(sql, (err, results) => {
                    if(err) throw err;
                });
            }
        });
        // finally, increment the current inventory count for the assembly
        let sql3 = "UPDATE assembly SET CurrentInventoryCount = CurrentInventoryCount + " + increment_num +
            " WHERE AssemblyID = '" + req.params.id + "'";
        let query3 = conn.query(sql3, (err, results) => {
            if(err) throw err;
            if (results['affectedRows'] != 0)
                res.send(JSON.stringify({"status": 200, "error": null, "response": null}));
            else
                res.send(JSON.stringify({"status": 404, "error": "Not found: part with PartID '" + req.params.id + "' does not exist", "response": null}));
        });
    }
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
    if (typeof data.Assembly_AssemblyID === 'undefined' ||
            typeof data.Part_PartID === 'undefined' ||
            typeof data.PartCountPerAssembly === 'undefined'){
            res.send(JSON.stringify({"status": 400, "error": "bad request: provide all required fields", "response": null}));
    }
    else if (isNaN(data.PartCountPerAssembly) || data.PartCountPerAssembly<0){
        res.send(JSON.stringify({"status": 400, "error": "bad request: part count per assembly must be numeric, non negative", "response": null}));
    }
    else {
        let sql = "INSERT INTO Part_has_Assembly SET ?";
        let query = conn.query(sql, data, (err, results) => {
            if(err){
                if (err.errno == 1062){ // duplicate entry error
                    res.send(JSON.stringify({"status": 400, "error": "Bad request: part-assembly relationship with PartID '" +
                    data.Part_PartID + "' and AssemblyID '" + data.Assembly_AssemblyID + "' already exists.", "response": results}));
                }
                else if (err.errno == 1452){ // foreign key constraint failure
                    res.send(JSON.stringify({"status": 400, "error": "Bad request: fk constraint failure. Part '" +
                    data.Part_PartID + "' or assembly '" + data.Assembly_AssemblyID + "' does not exist.", "response": results}));
                }
                else {
                    throw err;
                }
            }
            else{
                res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            }
        });
    }
});

// read part-assembly relationship (basic CRUD)
app.get('/api/parts_in_assembly/:pid/:aid', (req, res) => {
    let sql = "SELECT * FROM Part_has_Assembly WHERE Part_PartID = '" + req.params.pid + "' AND Assembly_AssemblyID = '" + req.params.aid + "'";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        if (results.length != 0)
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        else
            res.send(JSON.stringify({"status": 404, "error": "Not found: part-assembly relationship with part'"
            + req.params.pid + "' and assembly '" + req.params.aid + "' does not exist.", "response": null}));
    });
});

// update part-assembly relationship (basic CRUD)
app.put('/api/parts_in_assembly/:pid/:aid/:count', (req, res) => {
    if (isNaN(req.params.count) || req.params.count<0){
        res.send(JSON.stringify({"status": 400, "error": "Bad request: count must be numeric, non negative.", "response": null}));
    }
    else {
        let sql = "UPDATE Part_has_Assembly SET PartCountPerAssembly = " + req.params.count +
            " WHERE Assembly_AssemblyID = '" + req.params.aid +
            "' AND Part_PartID = '" + req.params.pid + "'";
        let query = conn.query(sql, (err, results) => {
            if(err) throw err;
            if (results['affectedRows'] != 0)
                res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            else
                res.send(JSON.stringify({"status": 404, "error": "Not found: part-assembly relationship with part'"
                + req.params.pid + "' and assembly '" + req.params.aid + "' does not exist.", "response": null}));
        });
    }
});

// delete part-assembly relationship (basic CRUD)
app.delete('/api/parts_in_assembly/:pid/:aid', (req, res) => {
    let sql = "DELETE FROM Part_has_Assembly WHERE Assembly_AssemblyID = '" + req.params.aid + "' AND Part_PartID = '" + req.params.pid + "'";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        if (results['affectedRows'] != 0)
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        else
            res.send(JSON.stringify({"status": 404, "error": "Not found: part-assembly relationship with part'"
            + req.params.pid + "' and assembly '" + req.params.aid + "' does not exist.", "response": null}));
    });
});

// get parts associated with assembly
app.get('/api/parts_in_assembly/:aid', (req, res) => {
    let sql = "SELECT pha.Assembly_AssemblyID, pha.PartCountPerAssembly, p.* " +
        "FROM Part_has_Assembly pha, part p " +
        "WHERE pha.Part_PartId = p.PartID AND pha.Assembly_AssemblyID = '" + req.params.aid + "'";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

app.listen(3000, () => {
  console.log('Server started on port 3000...');
});