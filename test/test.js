var { assert } = require('chai');
var { _fileFilter, _screenDocs } = require('../index.js');

describe('Test filter function', function () {
  it('should return 0 when the value is not present', function () {
    const testArray = ['hi', 'moove-it', 'nodejs', 'practice'];
    const wordToFind = 'hola';
    assert.lengthOf(_fileFilter(testArray, wordToFind), 0);
  });

  it('should return 1 when the value is present in the array', function () {
    const testArray = ['hi', 'moove-it', 'nodejs', 'practice'];
    const wordToFind = 'hi';
    assert.lengthOf(_fileFilter(testArray, wordToFind), 1);
  });
});

describe('Test screening function', function () {
  it('should return array with the names of all the files/folders found', async function () {
    assert.isArray(await _screenDocs(process.cwd()));
  });
});
