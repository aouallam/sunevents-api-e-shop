const _utils = require("./utils.func.js");
const NodeGeocoder = require("node-geocoder");
const options = {
  provider: "google",
  apiKey: "AIzaSyASANk7dSi4m2HBXS-S96GuBCr-USS5v70",
};

const geocoder = NodeGeocoder(options);

const geoCode = async (address) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await geocoder.geocode(address);
      resolve(result);
    } catch (error) {
      const err = _utils.getErrors(error);
      reject({
        statusCode: err.statusCode,
        data: err.data,
      });
    }
  });
const decode = async (ll) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await geocoder.reverse(ll);
      resolve(result);
    } catch (error) {
      const err = _utils.getErrors(error);
      reject({
        statusCode: err.statusCode,
        data: err.data,
      });
    }
  });
module.exports = { geoCode, decode };
