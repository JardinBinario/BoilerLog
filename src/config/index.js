const path = require('path');
require('dotenv').config();

const defaultOAPIDef = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: "JardinBinario's BoilerLog Express API with Swagger",
            version: '0.1.0',
            description:
                'This is a simple CRUD API application made with Express and documented with Swagger.',
            license: {
                name: 'MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: 'Jardin Binario',
                url: 'https://www.jardinbinario.com',
                email: 'marceliux@jardinbinario.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: [path.join(__dirname, '../', 'routes', '*.yaml')],
};

const config = {
    port: process.env.PORT || 4000,
    dbHost: process.env.MONGODB_URI || 'mongodb://localhost:27017/boilerLogLocal',
    privateKey: process.env.PRIVATE_KEY || 'local-private-k39',
    tokenLife: process.env.TOKEN_LIFE || '1h',
    awsRegion: process.env.AWS_REGION,
    awsAccessKey: process.env.AWS_ACCESS_KEY,
    awsSecretKey: process.env.AWS_SECRET_KEY,
    awsBucket: process.env.AWS_BUCKET,
    oapiDefinition: process.env.OAPI_DEFINITION || defaultOAPIDef,
};

module.exports = { 
    config
};