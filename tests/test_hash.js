"use strict";

import { createPasswordHash, verifyPasswordHash } from "../utils/hash.js";

let password = "mypassword";

async function test() {
  let passwordHash = await createPasswordHash(password);
  console.log(await verifyPasswordHash(password, passwordHash));
}

test();
