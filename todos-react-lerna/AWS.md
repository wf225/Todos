# AWS

## AWS CLI & EB CLI
  1. Install [python 3.4.3](https://www.python.org/downloads/release/python-343/).

  2. [Install the AWS Command Line Interface on Microsoft Windows](http://docs.aws.amazon.com/cli/latest/userguide/awscli-install-windows.html)
```
pip install --upgrade --user awscli
```

  3. [The Elastic Beanstalk Command Line Interface (EB CLI)](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html)


### [Using the AWS Elastic Beanstalk Node.js Platforms](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_nodejs.container.html)

### Locking Dependencies with NPM Shrinkwrap
You can avoid upgrading dependencies by creating an npm-shrinkwrap.json file that locks down your application's dependencies to the current version.
```
$ npm install
$ npm shrinkwrap
wrote npm-shrinkwrap.json
```

## AWS - Website
- [Managing Access Keys for IAM Users](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html)
-- C:\Users\wubil\.aws

- [Getting Started in Node.js](http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-started-nodejs.html)


- [Hosting a Static Website on Amazon S3](http://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html)


## AWS - DynamoDB
- [Node.js and DynamoDB](http://docs.aws.amazon.com/zh_cn/amazondynamodb/latest/gettingstartedguide/GettingStarted.NodeJs.html)
```
npm install aws-sdk
```

- [Download and Run DynamoDB](http://docs.aws.amazon.com/zh_cn/amazondynamodb/latest/gettingstartedguide/GettingStarted.Download.html)
```
cd c:\aws
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb -inMemory
```

- [Setting Up DynamoDB (Web Service)](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/SettingUp.DynamoWebService.html)

- [DynamoDB Actions](http://docs.aws.amazon.com/zh_cn/amazondynamodb/latest/APIReference/API_Types.html)

- [DynamoDB Data Types](http://docs.aws.amazon.com/zh_cn/amazondynamodb/latest/APIReference/API_Types.html)


## AWS - Lamada

### package
```
aws cloudformation package --template-file example.yaml --output-template-file serverless-output.yaml --s3-bucket todos-wubil
```

### deploy
```
aws cloudformation deploy --template-file serverless-output.yaml --stack-name todos-wubil --capabilities CAPABILITY_IAM
```

### apigateway
[Create an API Using Amazon API Gateway](http://docs.aws.amazon.com/lambda/latest/dg/with-on-demand-https-example-configure-event-source.html)

1. Create the API

Run the following create-rest-api command to create the wubil-todos API.
```
$ aws apigateway create-rest-api --name wubil-todos
```

The following is the response:
```
{
    "createdDate": 1493894264,
    "id": "<app-id>",
    "name": "wubil-todos"
}
```

You also need the ID of the API root resource. To get the ID, run the get-resources command.
```
$ aws apigateway get-resources --rest-api-id <app-id>
```

The following is the response:
```
{
    "items": [
        {
            "id": "<root-id>",
            "path": "/"
        }
    ]
}
```

2. Create a Resource (todos) in the API
```
$ aws apigateway create-resource \
--rest-api-id <app-id> \
--parent-id <root-id> \
--path-part api
```
Reponse:
```
{
    "parentId": "<root-id>",
    "path": "/api",
    "pathPart": "api",
    "id": "<resource-id>"
}
```

```
$ aws apigateway create-resource \
--rest-api-id <app-id> \
--parent-id <resource-id> \
--path-part todo

{
    "pathPart": "todo",
    "path": "/api/todo",
    "id": "<resource-id>",
    "parentId": "<resource-id>"
}
```

3. 
```
$ aws apigateway put-method \
--rest-api-id <app-id> \
--resource-id <resource-id> \
--http-method PUT \
--authorization-type NONE
```

```
$ aws apigateway get-method \
--rest-api-id <app-id> \
--resource-id <resource-id> \
--http-method GET
```

- [AWS Serverless Application Model (AWS SAM) prescribes rules for expressing Serverless applications on AWS](https://github.com/awslabs/serverless-application-model)

- [Create an API with Lambda Proxy Integration through a Proxy Resource](http://docs.aws.amazon.com/zh_cn/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html#api-gateway-proxy-integration-lambda-function-nodejs)

### Serverless

#### [Lambda + Serverless Tutorial video](https://www.youtube.com/watch?v=71cd5XerKss)

#### CloudFormation
- [What is AWS CloudFormation?](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html)
- [Using the AWS Command Line Interface](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-using-cli.html)
- [AWS Resource Types Reference](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html)