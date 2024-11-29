const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const namaDatabase = 'task-manager';

async function main() {
    try {
        await client.connect();
        console.log('Berhasil terhubung ke MongoDB database server');
        const db = client.db(namaDatabase);

        // Langkah d: Memperbaharui Data dengan perintah updateOne
        const updateOnePromise = db.collection('pengguna').updateOne(
            { _id: new ObjectId('674936109ba4dfee40b89e2d') }, // Ganti dengan ObjectId Anda
            //{ $set: { nama: 'Gies' } } // Ganti 'Randikun' dengan nama baru Anda
            {$inc: { usia: 1 }} // Uncomment untuk langkah g
        );

        updateOnePromise
            .then((result) => {
                console.log('Hasil updateOne:', result);
            })
            .catch((error) => {
                console.error('Error updateOne:', error);
            })
            .finally(() => {
                client.close();
            });

        // Langkah j: Memperbaharui Data dengan perintah updateMany
        // Uncomment untuk langkah j & k
         db.collection('tugas')
             .updateMany(
                 { StatusPenyelesaian: false },
                 { $set: { StatusPenyelesaian: true } }
             )
            .then((result) => {
                console.log('Hasil updateMany:', result.modifiedCount);
            })
            .catch((error) => {
                console.error('Error updateMany:', error);
            })
            .finally(() => {
                client.close();
            });

        // Langkah l: Challenge - Membuat semua data pada collection pengguna menjadi unik
        async function makeDataUnique() {
            const pengguna = await db.collection('pengguna').find().toArray();
            const updatedUsers = pengguna.map((user, index) => ({
                ...user,
                nama: `User_${index + 1}`, // Nama unik
                usia: 20 + index, // Usia unik
            }));
            for (const user of updatedUsers) {
                await db.collection('pengguna').updateOne(
                    { _id: user._id },
                    { $set: { nama: user.nama, usia: user.usia } }
                );
            }
            console.log('Semua data pengguna berhasil diperbarui menjadi unik');
        }

        // Uncomment untuk menjalankan challenge
        // makeDataUnique().catch(console.error).finally(() => client.close());

    } catch (error) {
        console.error('Error utama:', error);
    }
}

main();
