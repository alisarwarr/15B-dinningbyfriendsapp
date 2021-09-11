import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';
import * as lambda from '@aws-cdk/aws-lambda';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as rds from '@aws-cdk/aws-rds';
import { Role, ServicePrincipal, ManagedPolicy } from '@aws-cdk/aws-iam';
//EVENTBRIDGE
import * as events from '@aws-cdk/aws-events';
import * as targets from '@aws-cdk/aws-events-targets';
//VTL-REQUEST-RESPONSE
import { EVENT_SOURCE, requestTemplate, responseTemplate } from '../utils/appsync-request-response';
//COGNITO
import * as cognito from '@aws-cdk/aws-cognito';
import * as iam from '@aws-cdk/aws-iam';


export class AppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);




//**************************APPSYNC**************************/
    //APPSYNC's API gives you a graphqlApi with apiKey ( for deploying APPSYNC )
    const api = new appsync.GraphqlApi(this, 'graphlApi', {
      name: 'dinningbyfriends-api',
      schema: appsync.Schema.fromAsset('graphql/schema.gql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY
        }
      }
    });
    //print graphqlApi Url on console after deploy APPSYNC
    new cdk.CfnOutput(this, 'GraphQlAPIURL', {
      value: api.graphqlUrl
    });
    //print apiKey on console after deploy APPSYNC
    new cdk.CfnOutput(this, 'GraphQLAPIKey', {
      value: api.apiKey || ''
    });
//**************************APPSYNC**************************/




    //creating HTTPdatasource ( that will put our event to the eventbus )
    const http_datasource = api.addHttpDataSource('dinningbyfriends-ds',
      //ENDPOINT for eventbridge
      `https://events.${this.region}.amazonaws.com/`,
      {
        name: 'httpDsWithEventBridge',
        description: 'From Appsync to Eventbridge',
        authorizationConfig: {
          signingRegion: this.region,
          signingServiceName: 'events'
        }
      }
    );
    //giving permissions for HTTPdatasource
    events.EventBus.grantPutEvents(http_datasource);




    //mutations
    const mutations = [
      "createUser",
      "createRestaurant",
      "createUserfriend",
      "createUserrestaurant",
      "createRestaurantuser",
      "createRestaurantuserreview",
      "createRestaurantuserreviewpersonalization",
      "deleteUser",
      "deleteRestaurant",
      "deleteUserfriend",
      "deleteUserrestaurant",
      "deleteRestaurantuser",
      "deleteRestaurantuserreview",
      "deleteRestaurantuserreviewpersonalization",
      "editRestaurantuserreview",
      "editRestaurantuserreviewpersonalization"
    ];
    mutations.forEach((thatMutation: string) => {
      let details = `\\\"id\\\": \\\"$ctx.args.id\\\"`;

      if(thatMutation === "createUser") {
        details = `\\\"name\\\":\\\"$ctx.args.name\\\"`;
      }
      else if(thatMutation === "deleteUser") {
        details = `\\\"id\\\": \\\"$ctx.args.id\\\", \\\"name\\\":\\\"$ctx.args.name\\\"`;
      }
      else if(thatMutation === "createRestaurant") {
        details = `\\\"name\\\":\\\"$ctx.args.name\\\", \\\"cuisine\\\":\\\"$ctx.args.cuisine\\\", \\\"address\\\":\\\"$ctx.args.address\\\"`;
      }
      else if(thatMutation === "createUserfriend" || thatMutation === "deleteUserfriend") {
        details = `\\\"idFrom\\\":\\\"$ctx.args.idFrom\\\", \\\"idTo\\\":\\\"$ctx.args.idTo\\\"`;
      }
      else if(thatMutation === "createUserrestaurant" || thatMutation === "deleteUserrestaurant") {
        details = `\\\"idFrom\\\":\\\"$ctx.args.idFrom\\\", \\\"idTo\\\":\\\"$ctx.args.idTo\\\"`;
      }
      else if(thatMutation === "createRestaurantuser" || thatMutation === "deleteRestaurantuser") {
        details = `\\\"idFrom\\\":\\\"$ctx.args.idFrom\\\", \\\"idTo\\\":\\\"$ctx.args.idTo\\\"`;
      }
      else if(thatMutation === "createRestaurantuserreview") {
        details = `\\\"idFrom\\\":\\\"$ctx.args.idFrom\\\", \\\"idTo\\\":\\\"$ctx.args.idTo\\\", \\\"hisName\\\":\\\"$ctx.args.hisName\\\", \\\"text\\\":\\\"$ctx.args.text\\\"`;
      }
      else if(thatMutation === "deleteRestaurantuserreview") {
        details = `\\\"idFrom\\\":\\\"$ctx.args.idFrom\\\", \\\"idTo\\\":\\\"$ctx.args.idTo\\\"`;
      }
      else if(thatMutation === "editRestaurantuserreview") {
        details = `\\\"idFrom\\\":\\\"$ctx.args.idFrom\\\", \\\"idTo\\\":\\\"$ctx.args.idTo\\\", \\\"text\\\":\\\"$ctx.args.text\\\"`;
      }
      else if(thatMutation === "createRestaurantuserreviewpersonalization") {
        details = `\\\"idFrom\\\":\\\"$ctx.args.idFrom\\\", \\\"idTo\\\":\\\"$ctx.args.idTo\\\", \\\"hisId\\\":\\\"$ctx.args.hisId\\\", \\\"hisName\\\":\\\"$ctx.args.hisName\\\", \\\"useful\\\":\\\"$ctx.args.useful\\\"`;
      }
      else if(thatMutation === "deleteRestaurantuserreviewpersonalization") {
        details = `\\\"idFrom\\\":\\\"$ctx.args.idFrom\\\", \\\"idTo\\\":\\\"$ctx.args.idTo\\\", \\\"hisId\\\":\\\"$ctx.args.hisId\\\"`;
      }
      else if(thatMutation === "editRestaurantuserreviewpersonalization") {
        details = `\\\"idFrom\\\":\\\"$ctx.args.idFrom\\\", \\\"idTo\\\":\\\"$ctx.args.idTo\\\", \\\"hisId\\\":\\\"$ctx.args.hisId\\\", \\\"useful\\\":\\\"$ctx.args.useful\\\"`;
      }
            
      //describing resolver for datasource ( for send data to NEPTUNE )
      http_datasource.createResolver({
        typeName: "Mutation",
        fieldName: thatMutation,
        requestMappingTemplate: appsync.MappingTemplate.fromString(requestTemplate(details, thatMutation)),
        responseMappingTemplate: appsync.MappingTemplate.fromString(responseTemplate())
      });
    });




    //creating VirtualPrivateCloud
    const vpc = new ec2.Vpc(this, 'dinningbyfriends-vpc');




//********************AURORA DATABASE**********************/
    const databaseName = "dinningbyfriends_ServerlessDB";
    
    
    //creating database ( serverless cluster )
    const serverlessDB = new rds.ServerlessCluster(this, 'ServerlessDB', {
      vpc: vpc,                                               //assigning vpc for security of database
      engine: rds.DatabaseClusterEngine.aurora({              //using MySQL engine for Aurora Severless
        version: rds.AuroraEngineVersion.VER_1_22_2
      }),
      scaling: {                                              //defining scaling for pricing manage by database usage
        autoPause: cdk.Duration.minutes(10),                  //default is to pause after 5 minutes of idle time
        minCapacity: rds.AuroraCapacityUnit.ACU_2,            //default is 2 Aurora capacity units (ACUs)
        maxCapacity: rds.AuroraCapacityUnit.ACU_4             //default is 16 Aurora capacity units (ACUs)
      },
      deletionProtection: false,                              //default is true so database cluster cannot be deleted
      defaultDatabaseName: databaseName,                      //name of a database
      enableDataApi: true                                     //enabling data api
      //either use "enable-data-api" in cluster construct or this to grant access to lambda function
    });
    
    
    //create a specific role for lambdafunction
    const role = new Role(this, 'dinningbyfriends-lambdaRole', {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),      
      managedPolicies: [
        //giving RDS access to lambda
        ManagedPolicy.fromAwsManagedPolicyName("AmazonRDSDataFullAccess"),
        //giving VPC access to lambda
        ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaVPCAccessExecutionRole"),
        //giving basic access to lambda
        ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaBasicExecutionRole")
      ]
    });
    
    
    //getting secret from secret manager ( incase of not own password set )
    const secarn = serverlessDB.secret?.secretArn || '';
//********************AURORA DATABASE**********************/




    //creating lambdalayer    
    const lambdaLayer = new lambda.LayerVersion(this, 'lambdaLayer', {
      code: lambda.Code.fromAsset('lambda-layers'),
      compatibleRuntimes: [lambda.Runtime.NODEJS_14_X]
    });
    //creating lambdafunction
    const myLambda = new lambda.Function(this, 'dinningbyfriends-myLambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: new lambda.AssetCode("lambda"),
      handler: 'index.handler',
      currentVersionOptions: {
        //async retry attempts
        retryAttempts: 0
      },
      //giving timeout
      timeout: cdk.Duration.minutes(2),
      //giving layers
      layers: [lambdaLayer],
      //giving VPC
      vpc: vpc,
      //giving role
      role: role
    });




    //setting lambdafunction ( as a datasource of endpoint )
    const myLambda_datasource = api.addLambdaDataSource('myLamdaDataSource', myLambda);




    //queries
    const queries = [
      "allUsers",
      "allRestaurants",
      "allUserfriends",
      "allUserrestaurants",
      "allRestaurantusers",
      "allRestaurantuserreviews",
      "allRestaurantuserreviewpersonalizations",
      "getUserByName",
      "getRestaurantByName",
      "getUserfriendById",
      "getUserrestaurantById",
      "getRestaurantuserById",
      "getRestaurantuserreviewByUserId",
      "getRestaurantuserreviewpersonalizationByUserId",
      //( special case )
      "all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InOneRestaurant_ByUserId",
      "all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InAllRestaurants_ByUserId"
    ];
    queries.forEach((thatQuery: string) => {
      //describing resolver for datasource ( for get data from auroraServerlessDB )
      myLambda_datasource.createResolver({
        typeName: "Query",
        fieldName: thatQuery
      });
    });




    //adding env to lambdafunction
    myLambda.addEnvironment('CLUSTER_ARN', serverlessDB.clusterArn);
    myLambda.addEnvironment('SECRET_ARN', secarn);
    myLambda.addEnvironment('DATABASE_NAME', databaseName);




    //for give access to lambdafunction ( to get access data from auroraServerlessDB )
    serverlessDB.grantDataApiAccess(myLambda);




    //create lambda once after database is created ( because lambda based on database )
    myLambda.node.addDependency(serverlessDB);




    //to control who can access the cluster or instance, use the .connections attribute. ( RDS databases have a default port: 3306 )
    serverlessDB.connections.allowFromAnyIpv4(ec2.Port.tcp(3306));




    //rule fire by default event bus has target our lambdas
    const rule = new events.Rule(this, 'appsyncEventbridgeRule', {
      ruleName: 'dinningbyfriends-appsyncEventbridgeRule',
      description: 'created for appSyncEventbridge',
      eventPattern: {
        source: [EVENT_SOURCE],
        detailType: [...mutations]
        //every event that has source = "dinningbyfriends-events" will be sent to our lambdas
      },
      targets: [
        new targets.LambdaFunction(myLambda)
      ]
    });




//**************************COGNITO**************************/
    //creating userpool
    const userPool = new cognito.UserPool(this, 'dinningbyfriends-UserPool', {
      //user can sigin with 'email' & 'username' ( can also include phone, preferredUsername )
      signInAliases: {
        email: true,
        username: true
      },


      //defining policies for 'password' ( default policies are all true )
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: false
      },


      //allow users for 'signup' to create account ( so not only administrator makes account )
      selfSignUpEnabled: true,


      //user can recover account with 'email' only ( can also include PHONE_ONLY, PHONE_AND_EMAIL, etc )
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,


      //verification while creating an account using 'email' by sending a verification code ( can also add phone )
      autoVerify: {
        email: true
      },


      //customize your 'email' & 'phone' verification messages
      userVerification: {
        emailSubject: 'Verify your email for dinningbyfriends app!',
        emailBody: 'Hello, Thanks for using dinningbyfriends app! Your verification code is {####}',
        emailStyle: cognito.VerificationEmailStyle.CODE
      }
    });


    //creating 'Client' for connect COGNITO with frontend
    const userPoolClient = new cognito.UserPoolClient(this, 'dinningbyfriends-userPoolClient-amplify', {
      userPool
    });


    //send by userPool
    const userPoolId = new cdk.CfnOutput(this, 'dinningbyfriends-userPoolId', {
      value: userPool.userPoolId
    });


    //send by userPool
    const userPoolClientId = new cdk.CfnOutput(this, 'dinningbyfriends-userPoolClientId', {
      value: userPoolClient.userPoolClientId
    });
//**************************COGNITO**************************/




    //giving environmentvariable
    myLambda.addEnvironment('USERPOOL_ID', userPoolId.value);
    //giving role
    //*********************ROLE_COGNITO**********************/
    myLambda.addToRolePolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ["cognito-idp:*"],
      resources: [userPool.userPoolArn],
    }));
    //*********************ROLE_COGNITO**********************/
  }
}
