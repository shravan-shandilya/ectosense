"use strict";
import logger from "./logger.js";
import { default as mongodb } from "mongodb";
import { config } from "../config.js";

const MODULE = "[DB]";
let _db = null;

async function initDatabase() {
  return new Promise((resolve, reject) => {
    return resolve(true);
    mongodb.MongoClient.connect(
      config.URL,
      {
        poolSize: config.POOL_SIZE,
        useNewUrlParser: true,
      },
      function (err, client) {
        if (err) {
          logger.error(`${MODULE} mongodb connect failed!`, err);
          return reject(err);
        }
        logger.log(`${MODULE} connected successfully to mongodb`);
        _db = client.db(config.DATABASE);
        return resolve(true);
      }
    );
  });
}

function getDatabase() {
  return _db;
}

export { initDatabase, getDatabase };
