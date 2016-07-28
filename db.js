var mysql      = require('mysql');
/*
connection = mysql.createConnection({
  host     : '192.155.246.146',
  user     : 'alistixs',
  password : 'alistixs',
  database : 'db_alistixs',
  insecureAuth: true
}); 
*/
connection = mysql.createConnection({
  host     : '52.39.212.226',
  user     : 'alistixs',
  password : 'alistixs@2016',
  database : 'alistixs',
  insecureAuth: true
}); 

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId)
});