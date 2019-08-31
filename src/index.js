require('dotenv').config();
const proxy = require('express-http-proxy');

const express = require('express');
const redirectionsConfig = require('../config/redirections');
const app = express();

for (var i = 0; i < redirectionsConfig.length; i++) {
  const r = redirectionsConfig[i];
  app.use(`/${r.route}`, proxy(`${process.env.SERVER_URL}:${r.port}`));
}

app.listen(process.env.PORT, () => {
  console.log(`API-redirect app listening on port ${process.env.PORT}!`);
});