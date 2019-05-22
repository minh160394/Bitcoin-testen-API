var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var PORT = process.env.PORT || 5500;
const mysql = require("mysql");
app.use(bodyParser.json());
app.use(express.static(__dirname));
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password:'Minh1994',
    database: 'bctransdatabase'
});
mysqlConnection.connect((err) => {
    if(!err)
    console.log('successfully login');
    else
    console.log(err);
});
app.post('/products', function(req, res){
    let uploaddata = req.body.name;
    console.log(uploaddata);
        uploaddata.transaction.forEach(element => {
            mysqlConnection.query('SELECT * FROM bctrans WHERE transhas = ?',[element.hash],(err, rows, fields) => {
                console.log(element.recieved_value[0]);
                if(rows == 0)
                mysqlConnection.query('INSERT INTO bctrans (accountID,transfees,transhas,date) Value (?,?,?,?)', [element.address,element.fees,element.hash,element.recieved],function(err,connection){
                    if(err) console.log("fdgdf");
                    else{
                        console.log(connection);
                    }
                })
                else
                console.log("already exist");
                
            })
        });  
        
});
app.get('/products/:id', function(req, res){
    mysqlConnection.query('SELECT * FROM bctrans WHERE  accountID = ? ',[req.params.id] ,(err, rows, fields) => {
       console.log(rows)
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});
app.listen(PORT, function(){
    console.log('Server' + PORT);
});
