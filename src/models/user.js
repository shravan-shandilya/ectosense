"use strict";
import { getDatabase } from "../../utils/db.js";
const db = getDatabase();
const users = db.collection("users");

export function createUser(user) {
  return new Promise((resolve, reject) => {
    users
      .insertOne(user)
      .then((_res) => {
        return resolve(user);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

export function isEmailAvailable(email) {
  return new Promise((resolve, reject) => {
    users
      .findOne({ email })
      .then((result) => {
        return resolve(result === null);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

export function getUser(userId) {
  return new Promise((resolve, reject) => {
    users
      .findOne({ _id: userId })
      .then((user) => {
        return resolve(user);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

export function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    users
      .findOne({ email })
      .then((user) => {
        return resolve(user);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

export function getUserPermissions(userId) {
  return new Promise((resolve, reject) => {
    users
      .findOne({ _id: userId })
      .then((user) => {
        return resolve(user.permissions);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}
