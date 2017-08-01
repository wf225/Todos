const jsonpatch = require("jsonpatch");
let Validator = require('jsonschema').Validator;


let mydoc = {
    "baz": "qux",
    "foo": "bar"
};
let thepatch = [
    { "op": "replace", "path": "/baz", "value": "boo" }
];

console.log(typeof (mydoc))

//---------
var RemoveBundlePatchSchema = {
    title: 'JSON schema for Boundle Remove',
    '$schema': 'http://json-schema.org/draft-04/schema#',
    type: 'array',
    items:
    {
        id: '/items',
        type: 'object',
        required: ['op', 'path'],
        additionalProperties: false,
        properties: { op: [Object], path: [Object] }
    }
};
const patchDoc = { op: 'remove', path: '/extensions/viewer' };
const v = new Validator();
const result = v.validate([patchDoc], RemoveBundlePatchSchema);
console.log(result.valid)

//********** */
let patcheddoc = jsonpatch.apply_patch(mydoc, thepatch);
console.log(patcheddoc);

let bundle = {
    "id": "production",
    "platform": {
        "version": "1.0.0",
        "entryPoint": "platform.1.0.0.js"
    },
    "extensions": {
        "viewer": {
            "version": "1.0.0",
            "entryPoint": "viewer.1.0.0.js"
        }
    }
};
console.log(bundle);

function getExtensionValue(name, version) {
    return {
        version: version,
        entryPoint: name + "." + version + ".js"
    };
}
thepatch = [
    { "op": "replace", "path": "/platform", "value": getExtensionValue("platform", "2.0.0") }
];
patcheddoc = jsonpatch.apply_patch(bundle, thepatch);
console.log(patcheddoc);

// 1. PATCH Update the platform to a new version
thepatch = [
    { "op": "replace", "path": "/extensions/viewer", "value": "2.0.0" }
];
patcheddoc = jsonpatch.apply_patch(bundle, thepatch);
console.log(patcheddoc);

thepatch = [
    { "op": "remove", "path": "/extensions/viewer" }
];
patcheddoc = jsonpatch.apply_patch(bundle, thepatch);
console.log(patcheddoc);

thepatch = [
    { "op": "add", "path": "/extensions/compare", "value": "1.0.0" }
];
patcheddoc = jsonpatch.apply_patch(bundle, thepatch);
console.log(patcheddoc);

thepatch = [
    { "op": "replace", "path": "/platform", "value": "2.0.0" },
    { "op": "replace", "path": "/extensions/viewer", "value": "2.0.0" },
    { "op": "add", "path": "/extensions/compare", "value": "2.0.0" }
];
patcheddoc = jsonpatch.apply_patch(bundle, thepatch);
console.log(patcheddoc);

thepatch = [
    { "op": "remove", "path": "/platform" }
];
patcheddoc = jsonpatch.apply_patch(bundle, thepatch);
console.log(patcheddoc);

thepatch = [
    { "op": "remove", "path": "/extensions" }
];
patcheddoc = jsonpatch.apply_patch(bundle, thepatch);
console.log(patcheddoc);

thepatch = [
    { "op": "replace", "path": "/extensions/viewer", "value": "3.0.0" }
];
patcheddoc = jsonpatch.apply_patch(bundle, thepatch);
console.log(patcheddoc);

thepatch = [
    { "op": "remove", "path": "/extensions/something" }
];
patcheddoc = jsonpatch.apply_patch(bundle, thepatch);
console.log(patcheddoc);

thepatch = [
    { "op": "replace", "path": "/platform", "value": "2.0.0" },
    { "op": "replace", "path": "/extensions/viewer", "value": "2.0.0" },
    { "op": "add", "path": "/extensions/compare", "value": "2.0.0" },
    { "op": "add", "path": "/extensions/foobar", "value": "1.0.0" }
];
patcheddoc = jsonpatch.apply_patch(bundle, thepatch);
console.log(patcheddoc);
