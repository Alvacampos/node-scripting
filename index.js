const { fileFilter, getAllDocs } = require('./helper');

let input;
try {
  input = new RegExp(`${process.argv[2]}$`);
} catch (e) {
  console.log('Invalid Input', e);
  process.exitCode = 0;
}

(async () => {
  if (input) {
    let results = await getAllDocs(process.cwd());
    results = fileFilter(results, input);
    console.log(results);
  }
})();

process.exitCode = 0;

// add try catch for more scenarios
