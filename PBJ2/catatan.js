const fs = require('fs');
const chalk = require('chalk');

const ambilCatatan = function () {
    return 'Ini Catatan Randi Proska...';
};

const tambahCatatan = function (judul, isi) {
    const catatan = muatCatatan();
    const catatanGanda = catatan.filter(function (note) {
        return note.judul === judul;
    });

    if (catatanGanda.length === 0) {
        catatan.push({
            judul: judul,
            isi: isi
        });
        simpanCatatan(catatan);
        console.log(chalk.green('Catatan baru ditambahkan!'));
    } else {
        console.log(chalk.red('Judul catatan telah dipakai'));
    }
};

const simpanCatatan = function (catatan) {
    const dataJSON = JSON.stringify(catatan);
    fs.writeFileSync('catatan.json', dataJSON);
};

const muatCatatan = function () {
    try {
        const dataBuffer = fs.readFileSync('catatan.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};

const hapusCatatan = function (judul) {
    const catatan = muatCatatan();
    const catatanUntukDisimpan = catatan.filter(function (note) {
        return note.judul !== judul;
    });

    if (catatan.length > catatanUntukDisimpan.length) {
        console.log(chalk.green.inverse('Catatan dihapus!'));
        simpanCatatan(catatanUntukDisimpan);
    } else {
        console.log(chalk.red.inverse('Catatan tidak ditemukan!'));
    }
};

const tampilkanSemuaCatatan = function () {
    const catatan = muatCatatan();
    console.log(chalk.blue('Daftar Catatan:'));
    catatan.forEach(function (note) {
        console.log(`- ${note.judul}: ${note.isi}`);
    });
};

const bacaCatatan = function (judul) {
    const catatan = muatCatatan();
    const catatanDitemukan = catatan.find(function (note) {
        return note.judul === judul;
    });

    if (catatanDitemukan) {
        console.log(chalk.blue(`Judul: ${catatanDitemukan.judul}`));
        console.log(`Isi: ${catatanDitemukan.isi}`);
    } else {
        console.log(chalk.red('Catatan tidak ditemukan!'));
    }
};

module.exports = {
    ambilCatatan: ambilCatatan,
    tambahCatatan: tambahCatatan,
    hapusCatatan: hapusCatatan,
    tampilkanSemuaCatatan: tampilkanSemuaCatatan,
    bacaCatatan: bacaCatatan
};
