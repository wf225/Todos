const AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-1",
    endpoint: 'http://localhost:8000'  // Use DynamoDB running locally
});

const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = "Todos";

function TodosService() { }

//
TodosService.createTable = () => {
    let params = {
        TableName: tableName,
        KeySchema: [
            { AttributeName: "id", KeyType: "HASH" },  //Partition key
            { AttributeName: "title", KeyType: "RANGE" }  //Sort key
        ],
        AttributeDefinitions: [
            { AttributeName: "id", AttributeType: "S" },
            { AttributeName: "title", AttributeType: "S" }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 10,
            WriteCapacityUnits: 10
        }
    };

    dynamodb.createTable(params, (err, data) => {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
}

//
TodosService.getAll = (callback) => {
    var params = {
        TableName: tableName
    };

    // console.log("Scanning table.");
    docClient.scan(params, (err, data) => {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Scan succeeded.");
            return callback(err, data.Items);
        }
    });
}

//
TodosService.add = (item, callback) => {
    // To improve the user experience, execute the callback first.
    // callback(null, item);

    var params = {
        TableName: tableName,
        Item: {
            "id": item.id,
            "title": item.title,
            "isCompleted": item.isCompleted,
            "status": item.status,
            "seconds": item.seconds
        }
    };

    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            return callback(err);
        } else {
            return callback(err, item);
        }
    });
};

//
TodosService.remove = (id, title, callback) => {
    // callback(null, JSON.stringify({ id, title }));

    var params = {
        TableName: tableName,
        Key: {
            "id": id,
            "title": title
        }
    };

    docClient.delete(params, function (err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
            return callback(err);
        } else {
            return callback(err, { id, title });
        }
    });
};

//
TodosService.update = (item, callback) => {
    // callback(null, JSON.stringify(item));

    var params = {
        TableName: tableName,
        Key: {
            "id": item.id,
            "title": item.title
        },
        UpdateExpression: "set isCompleted = :isCompleted, #st=:status, seconds=:seconds",
        ExpressionAttributeNames: {
            "#st": "status"
        },
        ExpressionAttributeValues: {
            ":isCompleted": item.isCompleted,
            ":status": item.status,
            ":seconds": item.seconds
        },
        ReturnValues: "UPDATED_NEW"
    };

    docClient.update(params, function (err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            return callback(err);
        } else {
            return callback(err, item);
        }
    });
};

//
TodosService.toggleAll = (isCompleted, callback) => {
    // callback(null, { isCompleted });

    var params = {
        TableName: tableName
    };

    console.log("Scanning table.");
    docClient.scan(params, (err, data) => {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            return callback(err);
        } else {
            console.log("Scan succeeded.");
            data.Items.forEach(function (todo) {
                if (todo.isCompleted != isCompleted) {
                    todo.isCompleted = isCompleted;
                    TodosService.update(todo, (err, data) => { });
                }
            });

            return callback(err, { isCompleted: isCompleted });
        }
    });
};

//
TodosService.removeCompleted = (callback) => {
    // callback(null, {});

    var params = {
        TableName: tableName
    };

    // console.log("Scanning table.");
    docClient.scan(params, (err, data) => {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            return callback(err);
        } else {
            // console.log("Scan succeeded.");
            data.Items.forEach(function (todo) {
                if (todo.isCompleted) {
                    TodosService.remove(todo.id, todo.title, (err, data) => { });
                }
            });

            return callback(err, {});
        }
    });
};

module.exports = TodosService;
