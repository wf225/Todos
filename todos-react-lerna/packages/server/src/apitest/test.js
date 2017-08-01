const semver = require('semver');
const util = require("util");

console.log(semver.valid('1.2.3'));
console.log(semver.valid('a.2.3'));