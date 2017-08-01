let Validator = require('jsonschema').Validator;
var v = new Validator();

// 
var instance = 4;
var schema1 = { "type": "number" };
let result = v.validate(instance, schema1);
console.log(result);
console.log(result.valid);

//
// Address, to be embedded on Person 
var addressSchema = {
  "id": "/SimpleAddress",
  "type": "object",
  "properties": {
    "lines": {
      "type": "array",
      "items": { "type": "string" }
    },
    "zip": { "type": "string" },
    "city": { "type": "string" },
    "country": { "type": "string" }
  },
  "required": ["country"]
};

// Person 
var schema2 = {
  "id": "/SimplePerson",
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "address": { "$ref": "/SimpleAddress" },
    "votes": { "type": "integer", "minimum": 1 }
  }
};

var p = {
  "name": "Barack Obama",
  "address": {
    "lines": ["1600 Pennsylvania Avenue Northwest"],
    "zip": "DC 20500",
    "city": "Washington",
    "country": 123
  },
  "votes": "lots"
};

v = new Validator();
v.addSchema(addressSchema, '/SimpleAddress');
// console.log(v.validate(p, schema));
result = v.validate(p, schema2);
console.log(result);
console.log(result.valid);


//
var schema3 = {
  "title": "JSON schema for WebARX Bundles",
  "$schema": "http://json-schema.org/draft-04/schema#",

  "type": "object",
  "required": ["platform", "extensions"],

  "properties": {
    "platform": {
      "description": "The exact version of the platform",
      "type": "string"
    },

    "extensions": {
      "description": "Extensions are specified with keys as the extension name and values as the version of the extension",
      "type": "object",
      "additionalProperties": {
        "type": "string"
      }
    }
  }
};

//
var production = {
  "platform": "1.0.0",
  "extensions": {
    "viewer": "1.0.0"
  }
};
v = new Validator();
result = v.validate(production, schema3);
console.log(result);
console.log(result.valid);