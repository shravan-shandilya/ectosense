"use strict";
const accessTokenRegex = /^(Bearer )([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)$/;

export function validateAccessToken() {
  return accessTokenRegex.test(token);
}
