const mysql = require('mysql');

// Create the connection to the database
const connection = mysql.createConnection({
    host: 'localhost',     // Your MySQL host (e.g., localhost)
    user: 'root',          // Your MySQL username
    password: '',          // Your MySQL password
    database: 'dataset',
    port: 8080     // The database you want to connect to.
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL!');
});

module.exports = connection;