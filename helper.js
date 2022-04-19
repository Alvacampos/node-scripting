const fs = require('fs');

const fileFilter = (list, input) => list.filter((file) => file.match(input));

const readDataArray = async (screeningResults, path) => {
  let fileArray = [];
  for (const data of screeningResults) {
    let completePath = path + '/' + data;
    if (fs.existsSync(`./${data}`) && fs.statSync(`./${data}`).isDirectory()) {
      fileArray.push(await getAllDocs(data, completePath));
      fileArray = fileArray.flat();
    } else {
      fileArray.push(completePath);
    }
  }
  return fileArray;
};

const getAllDocs = async (path) => {
  const screeningResults = await fs.readdirSync(path);

  const fileArray = await readDataArray(screeningResults, path);

  return fileArray;
};

module.exports = {
  fileFilter,
  readDataArray,
  getAllDocs,
};
