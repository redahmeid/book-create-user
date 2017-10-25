'use strict';

const awsServerlessExpress = require('aws-serverless-express')
const app = require('./app')
const server = awsServerlessExpress.createServer(app)

exports.handler = function(event, context) {

    var body = JSON.parse(event.body);

    callback(null, { statusCode: 200, body: body });
}
