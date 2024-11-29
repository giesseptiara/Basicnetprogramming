const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const namaDatabase = 'task-manager';

async function main() {
    try {
        // Koneksi ke MongoDB
        await client.connect();
        console.log('Berhasil terhubung ke MongoDB database server');

        const db = client.db(namaDatabase);

        // Mencari satu dokumen berdasarkan nama
        const byNama = await db.collection('pengguna').findOne({ nama: 'Randi' });

        // Ganti dengan ObjectId yang sesuai dari data di MongoDBCompass
        const byObjectID = await db.collection('pengguna').findOne({
            _id: new ObjectId("674936109ba4dfee40b89e2d")
        });

        // Mencari beberapa dokumen berdasarkan kriteria usia
        const toArray = await db.collection('pengguna').find({ usia: 25 }).toArray();

        // Mengecek apakah data ditemukan
        if (byNama || byObjectID || toArray.length > 0) {
            console.log('Data Pengguna ditemukan (berdasarkan nama):', byNama);
            console.log('Data Pengguna ditemukan (berdasarkan ID Objek):', byObjectID);
            console.log('Data Pengguna ditemukan (dalam format Array):', toArray);
        } else {
            console.log('Data Pengguna tidak ditemukan');
        }
    } catch (err) {
        console.error('Kesalahan:', err);
    } finally {
        // Menutup koneksi ke MongoDB
        await client.close();
    }
}

main().catch(console.error);
