require('dotenv').config();
const proxy = require('express-http-proxy');
const axios = require('axios');

const express = require('express');
const redirectionsConfig = require('../config/redirections');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const db = require('./db');

(async function() {
  await db.init();
  db.collection('server-api-redirects').find().toArray().then((redirectionsConfig) => {
    console.log('reditionsConfig', redirectionsConfig);
    for (var i = 0; i < redirectionsConfig.length; i++) {
      const r = redirectionsConfig[i];
      app.use(`/${r.route}`, proxy(`${process.env.SERVER_URL}:${r.port}`));
    }

    app.listen(process.env.PORT, () => {
      console.log(`API-redirect app listening on port ${process.env.PORT}!`);
    });
  });
})();