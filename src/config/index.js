require("dotenv").config();

module.exports = {
  jwtKeys: {
    main: process.env.MAIN_JWT_KEY,
    staff: process.env.MAIN_JWT_KEY,
  },
  dbCryptoKey: process.env.DB_CRYPTO_KEY,
};
