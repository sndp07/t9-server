
const express = require('express');
const cors = require("cors");
const cluster = require('cluster');
const numOfCPUs = require('os').cpus().length;

const { version } = require('./package.json');
const routes = require('./src/routes');
const errorHandler = require('./src/middlewares/error-handler');
const { loadDictionary } = require('./src/utils/common-utils');

const app = express();
const verArr = version.split('.');
const apiVersion = `v${verArr[0]}.${verArr[1]}`

const initserver = () => {
    app.use(cors());

    app.use(`/${apiVersion}/apis`, routes);
    app.use(errorHandler);

    const PORT = 8080;

    app.listen(PORT, () => console.log(`starting worker server with process-id ${process.pid} listening to ${PORT}`));
}

if (cluster.isMaster) {
    for (let i = 0; i < numOfCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker) => {
        console.log('process exit by process-id : ', worker.process.pid);
    })
} else {
    loadDictionary(() => {
        initserver();
    });
}



