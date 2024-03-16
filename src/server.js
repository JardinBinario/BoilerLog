const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const methodOverride = require('method-override');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const MainMap = require('./routes/mainMap.routes');
const { dbConnection } = require('./database/database');
const { etiquetarPeticion } = require('./middlewares/middlewares');
const { httpLogger } = require('./helpers/logger');

require('dotenv').config();

class BoilerLogServer {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.loadMiddlewares();
        this.loadRoutes();
        this.loadDocs();
        this.loadDb();
    }

    loadDocs() {
        const options = {
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
            },
            apis: [path.join(__dirname, 'routes', '*.yaml')],
        };

        const specs = swaggerJsdoc(options);

        this.app.use(
            '/docs',
            swaggerUi.serve,
            swaggerUi.setup(specs)
        );
    }

    loadMiddlewares() {
        this.app.use(etiquetarPeticion);
        this.app.use(httpLogger);

        this.app.use(cors());
        this.app.use(methodOverride());

        this.app.use(fileUpload({
            limits: { fileSize: 50 * 1024 * 1024 },
            abortOnLimit: true,
            useTempFiles: true,
            tempFileDir: '/tmp/'
        }));
    }

    loadRoutes() {
        this.app.use(MainMap);
    }

    listen() {
        this.app.listen(this.port, () => console.log(`Escuchando peticiones en http://localhost:${this.port}`));
    }

    async loadDb() {
        await dbConnection();
    }
}

module.exports = BoilerLogServer;
