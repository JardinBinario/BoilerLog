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
const { config } = require('./config');

class BoilerLogServer {
    constructor() {
        this.app = express();
        this.port = config.port;

        this.loadMiddlewares();
        this.loadRoutes();
        this.loadDocs();
        this.loadDb();
    }

    loadDocs() {
        const options = JSON.parse(config.oapiDefinition);

        // change this to wherever you have your yaml files or pass other paths in the array
        options.apis = [path.join(__dirname, 'routes', '*.yaml')]

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
