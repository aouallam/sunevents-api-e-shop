require("dotenv").config();

module.exports = {
  suneventsApi: {
    url: process.env.SUNEVENTS_URL,
    fixe: process.env.SUNEVENTS_FIXE,
    token: process.env.SUNEVENTS_TOKEN,
  },
  jwtKeys: {
    main: process.env.MAIN_JWT_KEY,
    staff: process.env.MAIN_JWT_KEY,
  },
  dbCryptoKey: process.env.DB_CRYPTO_KEY,
};
