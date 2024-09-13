const yargs = require('yargs');
const catatan = require('./catatan');

// Perintah untuk menambahkan catatan
yargs.command({
    command: 'tambah',
    describe: 'Menambahkan catatan baru',
    builder: {
        judul: {
            describe: 'Judul catatan',
            demandOption: true,
            type: 'string'
        },
        isi: {
            describe: 'Isi catatan',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        catatan.tambahCatatan(argv.judul, argv.isi);
    }
});

// Perintah untuk menghapus catatan
yargs.command({
    command: 'hapus',
    describe: 'Menghapus catatan',
    builder: {
        judul: {
            describe: 'Judul catatan',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        catatan.hapusCatatan(argv.judul);
    }
});

// Perintah untuk menampilkan semua catatan
yargs.command({
    command: 'list',
    describe: 'Menampilkan semua catatan',
    handler() {
        catatan.tampilkanSemuaCatatan();
    }
});

// Perintah untuk membaca catatan berdasarkan judul
yargs.command({
    command: 'read',
    describe: 'Membaca catatan',
    builder: {
        judul: {
            describe: 'Judul catatan',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        catatan.bacaCatatan(argv.judul);
    }
});

yargs.parse();
