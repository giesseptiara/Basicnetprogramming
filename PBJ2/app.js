// Memuat modul yargs untuk mempermudah pembuatan perintah CLI (Command Line Interface)
const yargs = require('yargs');

// Memuat modul catatan yang berisi fungsi untuk mengelola catatan
const catatan = require('./catatan');

// Perintah untuk menambahkan catatan baru
yargs.command({
    command: 'tambah', // Nama perintahnya adalah 'tambah'
    describe: 'Menambahkan catatan baru', // Deskripsi perintah
    builder: { // Bagian ini digunakan untuk mendefinisikan argumen yang dibutuhkan
        judul: {
            describe: 'Judul catatan', // Deskripsi argumen 'judul'
            demandOption: true, // Argumen ini wajib diisi
            type: 'string' // Jenis datanya adalah string
        },
        isi: {
            describe: 'Isi catatan', // Deskripsi argumen 'isi'
            demandOption: true, // Argumen ini juga wajib diisi
            type: 'string' // Jenis datanya adalah string
        }
    },
    handler(argv) { // Fungsi yang akan dijalankan saat perintah dipanggil
        catatan.tambahCatatan(argv.judul, argv.isi); // Memanggil fungsi 'tambahCatatan' dari modul 'catatan'
    }
});

// Perintah untuk menghapus catatan berdasarkan judul
yargs.command({
    command: 'hapus', // Nama perintahnya adalah 'hapus'
    describe: 'Menghapus catatan', // Deskripsi perintah
    builder: { // Argumen yang dibutuhkan
        judul: {
            describe: 'Judul catatan', // Deskripsi argumen 'judul'
            demandOption: true, // Wajib diisi
            type: 'string' // Jenis datanya adalah string
        }
    },
    handler(argv) { // Fungsi yang dijalankan saat perintah dipanggil
        catatan.hapusCatatan(argv.judul); // Memanggil fungsi 'hapusCatatan' dari modul 'catatan'
    }
});

// Perintah untuk menampilkan semua catatan yang ada
yargs.command({
    command: 'list', // Nama perintahnya adalah 'list'
    describe: 'Menampilkan semua catatan', // Deskripsi perintah
    handler() { // Fungsi yang dijalankan saat perintah dipanggil
        catatan.tampilkanSemuaCatatan(); // Memanggil fungsi 'tampilkanSemuaCatatan' dari modul 'catatan'
    }
});

// Perintah untuk membaca catatan berdasarkan judulnya
yargs.command({
    command: 'read', // Nama perintahnya adalah 'read'
    describe: 'Membaca catatan', // Deskripsi perintah
    builder: { // Argumen yang dibutuhkan
        judul: {
            describe: 'Judul catatan', // Deskripsi argumen 'judul'
            demandOption: true, // Wajib diisi
            type: 'string' // Jenis datanya adalah string
        }
    },
    handler(argv) { // Fungsi yang dijalankan saat perintah dipanggil
        catatan.bacaCatatan(argv.judul); // Memanggil fungsi 'bacaCatatan' dari modul 'catatan'
    }
});

// Menjalankan parsing perintah yang diberikan melalui command line
yargs.parse(); 
