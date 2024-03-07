const z = require("zod");

const path = require("path");
const URL_ENV = process.env.url ?? "url";

const envPath = path.resolve(__dirname, `.env.${URL_ENV}`);

require("dotenv").config({ path: envPath });
