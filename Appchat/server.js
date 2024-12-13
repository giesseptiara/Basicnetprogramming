const net = require('net');

const clients = [];

// Membuat server
const server = net.createServer((socket) => {
    console.log('Klien baru terhubung.');

    // Tambahkan klien ke array
    clients.push(socket);

    // Ketika klien mengirim pesan
    socket.on('data', (data) => {
        console.log(`Pesan diterima: ${data.toString().trim()}`);
        // Kirim pesan ke semua klien lain
        clients.forEach((client) => {
            if (client !== socket) {
                client.write(data);
            }
        });
    });

    // Ketika klien terputus
    socket.on('end', () => {
        console.log('Klien terputus.');
        const index = clients.indexOf(socket);
        if (index !== -1) clients.splice(index, 1);
    });

    // Tangani error
    socket.on('error', (err) => {
        console.error(`Error: ${err.message}`);
    });
});

// Menentukan port server
const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
