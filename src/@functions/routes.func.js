const fs = require("fs");
const path = require("path");

const fromDir = (startPath, filter) => {
  let arrayRoutes = [];
  if (!fs.existsSync(startPath)) {
    return arrayRoutes;
  }

  let files = fs.readdirSync(startPath);

  files.forEach((file) => {
    const extension = file.split(".").reverse()[0];
    let filename = path.join(startPath, file);
    let stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      arrayRoutes = arrayRoutes.concat(fromDir(filename, filter)); //recurse
    } else if (file.indexOf(".") !== 0 && extension === filter) {
      arrayRoutes.push(filename);
    }
  });
  return arrayRoutes;
};

module.exports = {
  fromDir,
};
