// Mengimpor modul 'fs' untuk operasi file dan 'chalk' untuk menampilkan teks berwarna di terminal
const fs = require('fs');
const chalk = require('chalk');

// Fungsi ini hanya mengembalikan string statis
const ambilCatatan = function () {
    return 'Ini Catatan Randi Proska...'; // Mengembalikan teks statis
};

// Fungsi untuk menambah catatan baru
const tambahCatatan = function (judul, isi) {
    const catatan = muatCatatan(); // Memuat catatan yang ada dari file
    // Memeriksa apakah sudah ada catatan dengan judul yang sama
    const catatanGanda = catatan.filter(function (note) {
        return note.judul === judul; // Mencari catatan yang memiliki judul sama
    });

    // Jika tidak ada catatan dengan judul yang sama, tambahkan catatan baru
    if (catatanGanda.length === 0) {
        catatan.push({
            judul: judul, // Menambahkan judul baru
            isi: isi      // Menambahkan isi catatan
        });
        simpanCatatan(catatan); // Menyimpan catatan ke file
        console.log(chalk.green('Catatan baru ditambahkan!')); // Menampilkan pesan sukses
    } else {
        console.log(chalk.red('Judul catatan telah dipakai')); // Menampilkan pesan error jika judul sudah dipakai
    }
};

// Fungsi untuk menyimpan catatan ke dalam file 'catatan.json'
const simpanCatatan = function (catatan) {
    const dataJSON = JSON.stringify(catatan); // Mengonversi array catatan menjadi format JSON
    fs.writeFileSync('catatan.json', dataJSON); // Menulis file 'catatan.json' dengan data baru
};

// Fungsi untuk memuat catatan dari file 'catatan.json'
const muatCatatan = function () {
    try {
        const dataBuffer = fs.readFileSync('catatan.json'); // Membaca file 'catatan.json'
        const dataJSON = dataBuffer.toString(); // Mengonversi buffer ke string
        return JSON.parse(dataJSON); // Mengonversi string JSON ke array JavaScript
    } catch (e) {
        return []; // Jika file tidak ditemukan atau terjadi kesalahan, kembalikan array kosong
    }
};

// Fungsi untuk menghapus catatan berdasarkan judul
const hapusCatatan = function (judul) {
    const catatan = muatCatatan(); // Memuat semua catatan yang ada
    // Menyimpan catatan yang tidak memiliki judul yang cocok dengan yang akan dihapus
    const catatanUntukDisimpan = catatan.filter(function (note) {
        return note.judul !== judul; // Mempertahankan catatan yang judulnya tidak sama
    });

    // Jika ada catatan yang dihapus (artinya panjang array berubah), tampilkan pesan sukses
    if (catatan.length > catatanUntukDisimpan.length) {
        console.log(chalk.green.inverse('Catatan dihapus!')); // Pesan sukses
        simpanCatatan(catatanUntukDisimpan); // Simpan catatan yang tersisa
    } else {
        console.log(chalk.red.inverse('Catatan tidak ditemukan!')); // Pesan error jika catatan tidak ditemukan
    }
};

// Fungsi untuk menampilkan semua catatan yang ada
const tampilkanSemuaCatatan = function () {
    const catatan = muatCatatan(); // Memuat semua catatan
    console.log(chalk.blue('Daftar Catatan:')); // Menampilkan header daftar catatan
    // Loop melalui setiap catatan dan tampilkan judul serta isi catatan
    catatan.forEach(function (note) {
        console.log(`- ${note.judul}: ${note.isi}`); // Menampilkan setiap catatan
    });
};

// Fungsi untuk membaca catatan berdasarkan judul
const bacaCatatan = function (judul) {
    const catatan = muatCatatan(); // Memuat semua catatan
    // Mencari catatan yang judulnya sesuai dengan judul yang diminta
    const catatanDitemukan = catatan.find(function (note) {
        return note.judul === judul; // Mencocokkan judul
    });

    // Jika catatan ditemukan, tampilkan judul dan isinya
    if (catatanDitemukan) {
        console.log(chalk.blue(`Judul: ${catatanDitemukan.judul}`)); // Menampilkan judul
        console.log(`Isi: ${catatanDitemukan.isi}`); // Menampilkan isi catatan
    } else {
        console.log(chalk.red('Catatan tidak ditemukan!')); // Pesan error jika catatan tidak ditemukan
    }
};

// Mengekspor semua fungsi agar dapat digunakan di tempat lain
module.exports = {
    ambilCatatan: ambilCatatan,
    tambahCatatan: tambahCatatan,
    hapusCatatan: hapusCatatan,
    tampilkanSemuaCatatan: tampilkanSemuaCatatan,
    bacaCatatan: bacaCatatan
};
