import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {
    const params = {
        TableName: "notes",
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        }
    };
    try {
        const result = await dynamoDbLib.call("get", params);
        result.Item
            ? callback(null, success(result.Item))
            : callback(null, failure({ status: false, error: " Item not Found, Please Check" }));
    } catch (error) {
        callback(null, failure({ status: false }));
    }
}