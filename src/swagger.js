const swaggerAutogen = require('swagger-autogen')()
console.log('gbfids');
const outputFile = 'src/swagger_output.json'
const endpointsFiles = ['src/index.js']

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./index.js')
})