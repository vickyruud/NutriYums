const BIDSDK = require("blockid-nodejs-helpers/BIDSDK.js");

const loaded = await BIDSDK.setupTenant(
  { dns: "developer.1kosmos.com", communityName: "devx" },
  "0005c9f8-1918-40be-aa00-e319043f7eee"
);
