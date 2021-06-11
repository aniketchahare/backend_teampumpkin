require('dotenv').config();

const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    swagger_ui = require('swagger-ui-express'),
    cors = require('cors'),
    { success } = require("consola");

const app = express(),
    connectDB = require('./config/dbConfig'),
    routes = require('./app/routes');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.disable('x-powered-by');

app.use('/', routes);

app.use(express.static('public')); 
app.use('/user/images', express.static('images'));

app.use('*/*', (req, res, next) => {
    res.status(404).send({
        success: false,
        statuscode: 404,
        message: "Page Not found"
    });
});

app.use((err, req, res, next) => {
    if (!err) {
        return next();
    }

    res.status(500).send({
        error: {
            success: false,
            statuscode: 500,
            message: 'Internal Server Error'
        }
    });
});

app.listen(process.env.PORT, () => {
    success({ message: `Express server listening on ${process.env.PORT}, in ${app.get('env')} mode`, badge: true });
    connectDB.sequelize.sync();
});