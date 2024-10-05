const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();

const direktoriPublic = path.join(__dirname, '../public');
const direktoriViews = path.join(__dirname, '../template/views'); // Ganti path views
const direktoriPartials = path.join(__dirname, '../template/partials'); // Tambahkan path partials

// Mengatur view engine menjadi Handlebars (hbs)
app.set('view engine', 'hbs');

// Mengatur folder untuk view
app.set('views', direktoriViews);
hbs.registerPartials(direktoriPartials); // Daftarkan partials

// Mengaktifkan serving file statis dari folder public
app.use(express.static(direktoriPublic));

// Halaman utama
app.get('/', (req, res) => {
    res.render('index', {
        judul: 'Aplikasi Cek Cuaca',
        nama: 'Gies Septiara'
    });
});

// Halaman tentang
app.get('/tentang', (req, res) => {
    res.render('tentang', {
        judul: 'Tentang Saya',
        nama: 'Gies Septiara'
    });
});

// Halaman bantuan
app.get('/bantuan', (req, res) => {
    res.render('bantuan', {
        judul: 'Bantuan',
        teksBantuan: 'Ini adalah teks bantuan.',
        nama: 'Gies Septiara'
    });
});

// Halaman bantuan wildcard
app.get('/bantuan/*', (req, res) => {
    res.render('404', {
        pesanKesalahan: 'Halaman yang Anda cari di bawah bantuan tidak ditemukan.'
    });
});

// Wildcard untuk halaman yang tidak ditemukan
app.get('*', (req, res) => {
    res.render('404', {
        pesanKesalahan: 'Halaman yang Anda cari tidak ditemukan.'
    });
});

// Menjalankan server pada port 4000
app.listen(4000, () => {
    console.log('Server berjalan pada port 4000.');
});

