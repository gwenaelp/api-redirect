const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

let db;

const dbObject = {
  db: undefined,

  init: () => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true }, (err, client) => {
        if(err) {
          console.error(err.toString());
          reject(err.toString());
        } else {
          const urlSplit = process.env.MONGO_URL.split('/');
          console.log("Connected successfully to server", urlSplit[urlSplit.length - 1]);
          db = client.db(urlSplit[urlSplit.length - 1]);
          dbObject.db = db;
          resolve(db);
        }
      });
    });
  },

  collection: (name) => {
    return dbObject.db.collection(name);
  },
};

module.exports = dbObject;
