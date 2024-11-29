const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const namaDatabase = 'task-manager';

async function main() {
    try {
        await client.connect();
        console.log('Berhasil terhubung ke MongoDB database server');
        const db = client.db(namaDatabase);

        // Menghapus semua pengguna dengan usia tertentu
        db.collection('pengguna')
            .deleteMany({ usia: 28 }) // Ganti angka 28 dengan data usia yang ingin dihapus
            .then((result) => {
                console.log('Hasil deleteMany:', result);
            })
            .catch((error) => {
                console.error('Error deleteMany:', error);
            });

        // Challenge: Menghapus satu data tugas dengan deleteOne
        db.collection('tugas')
            .deleteOne({ nama: 'NamaTugas' }) // Ganti 'NamaTugas' dengan nama tugas yang ingin dihapus
            .then((result) => {
                console.log('Hasil deleteOne:', result);
            })
            .catch((error) => {
                console.error('Error deleteOne:', error);
            });
    } catch (error) {
        console.error('Error utama:', error);
    }
}

main();
