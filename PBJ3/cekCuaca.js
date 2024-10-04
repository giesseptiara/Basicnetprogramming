const request = require('postman-request');

// Ganti dengan access_key Weatherstack Anda
const weatherstackAccessKey = '1520f9e0db9b27ef8f9e92ae68d3c3cc';
const locationQuery = 'Padang'; // Ganti dengan lokasi yang diinginkan

// Memanggil Weatherstack API untuk mendapatkan data cuaca
const urlCuaca = `http://api.weatherstack.com/current?access_key=${weatherstackAccessKey}&query=${locationQuery}&units=m`;

request({ url: urlCuaca, json: true }, (error, response) => {
    if (error) {
        console.log('Tidak bisa menghubungi layanan cuaca!');
    } else if (response.body.error) {
        console.log('Tidak dapat menemukan data cuaca untuk lokasi yang diberikan.');
    } else {
        const temperature = response.body.current.temperature;
        const precip = response.body.current.precip;
        const weather_descriptions = response.body.current.weather_descriptions[0];

        console.log(`Saat ini suhu di luar adalah ${temperature}°C.`);
        console.log(`Kemungkinan hujan: ${precip}%`);
        console.log(`Deskripsi cuaca: ${weather_descriptions}`);

        // Mengambil lokasi dari respons cuaca
        const locationQuery = response.body.location.name;

        // Memanggil Mapbox API untuk mendapatkan koordinat lokasi
        const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${locationQuery}.json?access_token=pk.eyJ1IjoiZ2llczAyIiwiYSI6ImNtMWx4a2J4YTBkZW0yanE1cWZmcDkwcjkifQ.qUse4zhDJoISYjw6sDPMJQ&limit=1`;

        request({ url: geocodeURL, json: true }, (error, response) => {
            if (error) {
                console.log('Tidak bisa terhubung ke layanan geocoding!');
            } else if (!response.body || !response.body.features) {
                console.log('Tidak dapat menemukan lokasi! Respons dari API tidak valid.');
                console.log(response.body); // Tambahkan ini untuk debug
            } else if (response.body.features.length === 0) {
                console.log('Tidak ada fitur ditemukan untuk lokasi yang diberikan.');
            } else {
                const latitude = response.body.features[0].center[1];
                const longitude = response.body.features[0].center[0];
                const place_name = response.body.features[0].place_name;
                const place_type = response.body.features[0].place_type[0];

                // Menampilkan informasi lokasi
                console.log(`Query: ${locationQuery}`);
                console.log(`Nama Tempat: ${place_name}`);
                console.log(`Tipe Tempat: ${place_type}`);
                console.log(`Koordinat: Latitude ${latitude}, Longitude ${longitude}`);
            }
        });
    }
});
