var validator = require('is-my-json-valid');

var  Validation;

module.exports = Validation = function(){
    _constructor();
};

var _constructor = function() {
    console.log("INIT");
    var validate = validator(_schema);

    //console.log('should be valid', validate({hello: 'world'}));
    //console.log('should not be valid', validate({}));

// get the last list of errors by checking validate.errors
// the following will print [{field: 'data.hello', message: 'is required'}]
    console.log(validate.errors);
};

var _schema =
{
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "http://jsonschema.net",
    "type": "object",
    "properties": {
        "accession": {
            "type": "string"
        },
        "entryName": {
            "type": "string"
        },
        "sequence": {
            "type": "string"
        },
        "categories": {
            "type": "array",
            "minItems": 1,
            "items": {
                "type": "object",
                "$ref": "#/definitions/categoryObject"
            }
        }
    },
    "required": [
        "accession",
        "entryName",
        "sequence",
        "categories"
    ],
    "definitions": {
        "categoryObject": {
            "properties": {
                "category": {
                    "type": "string"
                },
                "types": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "$ref": "#/definitions/typeObject"
                    }
                }
            },
            "required": [
                "category",
                "types"
            ]
        },
        "typeObject": {
            "properties": {
                "type": {
                    "type": "string"
                },
                "label": {
                    "type": "string"
                },
                "cvId": {
                    "type": "string"
                },
                "locations": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "$ref": "#/definitions/locationObject"
                    },
                    "minItems": 1
                }
            },
            "required": [
                "type",
                "label",
                "cvId",
                "locations"
            ]
        },
        "locationObject": {
            "properties": {
                "locationType": {
                    "enum": ["CONTINUOUS", "BRIDGE", "POSITION"]
                },
                "features": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "$ref": "#/definitions/featureObject"
                    },
                    "minItems": 1
                }
            },
            "required": [
                "locationType",
                "features"
            ]
        },
        "featureObject": {
            "properties": {
                "ftId": {
                    "type": "string",
                    "unique": true
                },
                "internalId": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "begin": {
                    "type": "integer"
                },
                "end": {
                    "type": "integer"
                },
                "status": {
                    "type": "string"
                },
                "evidence": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "$ref": "#/definitions/evidenceObject"
                    },
                    "minItems": 1
                }
            },
            "required": [
                "ftId",
                "begin",
                "end"
            ]
        },
        "evidenceObject": {
            "properties": {
                "type": {
                    "type": "string",
                    "pattern": "^ECO:[0-9]{7}$"
                },
                "source": {
                    "type": "object",
                    "oneOf": [
                        {"$ref": "#/definitions/dbReferenceObject"},
                        {"$ref": "#/definitions/referenceObject"}
                    ]
                }
            },
            "required": [
                "type",
                "source"
            ]
        },
        "dbReferenceObject": {
            "properties": {
                "dbReferenceType": {
                    "type": "string"
                },
                "dbReferenceId": {
                    "type": "string"
                }
            },
            "required": [
                "dbReferenceType",
                "dbReferenceId"
            ]
        },
        "referenceObject": {
            "properties": {
                "ref": {
                    "type": "string"
                }
            },
            "required": [
                "ref"
            ]
        }
    }
};