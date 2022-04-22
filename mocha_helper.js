const fs = require('fs');
const path = require('path');
const Mocha = require('mocha');

function getTestPaths (dir, fileList) {
  const files = fs.readdirSync(dir);
  fileList = fileList || [];

  files.forEach(function (file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      fileList = getTestPaths(path.join(dir, file), fileList);
    } else {
      fileList.push(path.join(dir, file));
    }
  });

  return fileList.filter(function (file) {
    return path.extname(file) === '.js';
  });
}

const runMochaTestsByTag = (tag) => {

  const mochaOptions = {
    timeout: 200000,
    fgrep: tag,
    reporter: 'mocha-junit-reporter',
    reporterOptions: {
      mochaFile: './reports/file.xml'
    }
  };
  const mocha = new Mocha(mochaOptions);

  getTestPaths('./test').forEach(function (file) {
    mocha.addFile(
      path.join(file)
    );
  });

  return mocha.run();

  // return new Promise((resolve, reject) => {
  //   mocha.run((failures) => {
  //     if (failures) reject('at least one test is failed, check detailed execution report')
  //     resolve('success')
  //   });
  // });
}

module.exports = {
  runMochaTestsByTag
}