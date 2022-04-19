// start script msg

let fs = require('fs');
const fsPromises = fs.promises;
let input;

const fileFilter = (list, input) => {
  return list.filter((file) => file.match(input));
};

const screenDocs = async (path) => {
  return await fsPromises.readdir(path, function (err, list) {
    if (err) throw err;
    return list;
  });
};

const readDataArray = async (screeningResults, path) => {
  let fileArray = [];
  for (const data of screeningResults) {
    let completePath = path + '/' + data;
    if (fs.existsSync(`./${data}`)) {
      if (fs.statSync(`./${data}`).isDirectory()) {
        fileArray.push(await getAllDocs(data, completePath));
        fileArray = fileArray.flat();
      } else {
        fileArray.push(completePath);
      }
    }
  }
  return fileArray;
};

const getAllDocs = async (path) => {
  let screeningResults = await screenDocs(path);
  let fileArray = await readDataArray(screeningResults, path);
  return fileArray;
};

try {
  input = new RegExp(process.argv[2]);
} catch (e) {
  console.log('Invalid Input', e);
}

(async () => {
  if (input) {
    let results = await getAllDocs(process.cwd());
    results = fileFilter(results, input);
    console.log(results);
  }
})();

process.exitCode = 0;

/*
const readDataArray = async (screeningResults) => {
  let fileArray = [];
  console.log(screeningResults);
  for (const data of screeningResults) {
    if (fs.existsSync(`./${data}`)) {
      if (fs.statSync(`./${data}`).isDirectory()) {
        let x = await getAllDocs(data);
        fileArray.push(x);
        fileArray = fileArray.flat();
      } else {
        fileArray.push(data);
      }
    }
  }
  return fileArray;
};
*/
