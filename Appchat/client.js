const net = require('net');
const readline = require('readline');

// Buat interface untuk input pengguna
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Koneksi ke server
const client = net.createConnection({ host: 'localhost', port: 5000 }, () => {
    console.log('Terhubung ke server. Mulai mengetik pesan Anda...');
});

// Menerima pesan dari server
client.on('data', (data) => {
    console.log(`Pesan dari klien lain: ${data.toString().trim()}`);
});

// Ketika server memutus koneksi
client.on('end', () => {
    console.log('Terputus dari server.');
    process.exit(0);
});

// Ketika ada error
client.on('error', (err) => {
    console.error(`Error: ${err.message}`);
});

// Mengirim pesan ke server
rl.on('line', (line) => {
    client.write(line);
});
