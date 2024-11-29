const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const namaDatabase = 'testsaja';
const id = new ObjectId();

console.log(id);
console.log(id.id);
console.log(id.id.length);
console.log(id.getTimestamp());
console.log(id.toHexString().length);

async function main() {
    try {
        await client.connect();
        console.log('Berhasil terhubung ke MongoDB database server');

        const db = client.db(namaDatabase);
        const clPengguna = db.collection('pengguna');
        const clTugas = db.collection('tugas');

        const insertPengguna = await clPengguna.insertOne({
            _id: id,
            nama: 'Randi',
            usia: 25
        });
        console.log('Memasukkan data Pengguna ke koleksi =>', insertPengguna);

        const insertTugas = await clTugas.insertMany([
            { Deskripsi: 'Membersihkan rumah', StatusPenyelesaian: true },
            { Deskripsi: 'Mengerjakan tugas kuliah', StatusPenyelesaian: false },
            { Deskripsi: 'Memberikan bimbingan', StatusPenyelesaian: false }
        ]);
        console.log('Memasukkan data Tugas ke koleksi =>', insertTugas);

        return 'Data selesai dimasukkan.';
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}

main().then(console.log).catch(console.error);
