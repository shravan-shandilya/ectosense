"use strict";
import logger from "./logger.js";
import { default as mongodb } from "mongodb";
import { config } from "../config.js";

const MODULE = "[DB]";
let _db = null;

async function initDatabase() {
  return new Promise((resolve, reject) => {
    // return resolve(true);
    mongodb.MongoClient.connect(
      config.MONGO.URL,
      {
        poolSize: config.MONGO.POOL_SIZE,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      function (err, client) {
        if (err) {
          logger.error(`${MODULE} mongodb connect failed!`, err);
          return reject(err);
        }
        logger.info(`${MODULE} connected successfully to mongodb`);
        _db = client.db(config.MONGO.DATABASE);
        return resolve(true);
      }
    );
  });
}

function getDatabase() {
  return _db;
}

export { initDatabase, getDatabase };
