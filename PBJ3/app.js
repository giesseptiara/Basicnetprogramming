const request = require('postman-request')
const url =
'http://api.weatherstack.com/current?access_key=1520f9e0db9b27ef8f9e92ae68d3c3cc&query=latitude,longitude'
request({ url: url }, (error, response) => {
//console.log(response)
const data = JSON.parse(response.body)
//console.log(data)
//console.log(data.current)
console.log(data.current.temperature)
})