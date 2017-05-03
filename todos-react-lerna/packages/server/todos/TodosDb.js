const AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-1"
});

const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = "Todos";

function Todos() { }

//
Todos.createTable = () => {
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
Todos.getAll = (callback) => {
    var params = {
        TableName: tableName
    };

    console.log("Scanning table.");
    docClient.scan(params, (err, data) => {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Scan succeeded.");
            return callback(err, JSON.stringify(data.Items));
        }
    });
}

//
Todos.add = (item, callback) => {
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

    console.log("Adding a new item...");
    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            return callback(err);
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            return callback(err, JSON.stringify(item));
        }
    });
};

//
Todos.remove = (id, title, callback) => {
    var params = {
        TableName: tableName,
        Key: {
            "id": id,
            "title": title
        }
    };

    console.log("Attempting a conditional delete...");
    docClient.delete(params, function (err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
            return callback(err);
        } else {
            console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
            return callback(err, JSON.stringify({ id: id }));
        }
    });
};

//
Todos.update = (item, callback) => {
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

    console.log("Updating the item...");
    docClient.update(params, function (err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            return callback(err);
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            return callback(err, JSON.stringify(item));
        }
    });
};

//
Todos.toggleAll = (isCompleted, callback) => {
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
                    Todos.update(todo, (err, data) => { });
                }
            });

            return callback(err, JSON.stringify({ isCompleted }));
        }
    });
};

//
Todos.removeCompleted = (callback) => {
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
                if (todo.isCompleted) {
                    Todos.remove(todo.id, todo.title, (err, data) => { });
                }
            });

            return callback(err, JSON.stringify({}));
        }
    });
};

module.exports = Todos;
