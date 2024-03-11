import type { APIGatewayAuthorizerResult, APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayRequestAuthorizerEvent, APIGatewayTokenAuthorizerEvent, DynamoDBStreamEvent, EventBridgeEvent, KinesisStreamEvent, S3Event, ScheduledEvent, SNSEvent, SQSEvent } from 'aws-lambda';
import type { Handler } from '../xray/xray';
import type { StreamsEventResponse } from './lambda-responses';
/**
 * Lambda Handler: API Gateway Requests
 *
 * @see https://docs.aws.amazon.com/lambda/latest/dg/services-apigateway.html#apigateway-example-event
 */
export declare type ApiGatewayRequestHandler = Handler<APIGatewayProxyEvent, APIGatewayProxyResult>;
/**
 * Lambda Handler: API Gateway Token Authorizer
 *
 * @see https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html
 */
export declare type ApiGatewayTokenAuthorizerHandler = Handler<APIGatewayTokenAuthorizerEvent, APIGatewayAuthorizerResult>;
/**
 * Lambda Handler: API Gateway Request Authorizer
 *
 * @see https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html
 */
export declare type ApiGatewayRequestAuthorizerHandler = Handler<APIGatewayRequestAuthorizerEvent, APIGatewayAuthorizerResult>;
/**
 * Lambda Handler: Scheduled Events from EventBridge
 */
export type ScheduledEventHandler<TDetail = any> = Handler<ScheduledEvent<TDetail>, void>;
/**
 * Lambda Handler: EventBridge Events
 *
 @see https://docs.aws.amazon.com/lambda/latest/dg/services-cloudwatchevents.html
 */
export type EventBridgeHandler<TDetailType extends string, TDetail = any> = Handler<EventBridgeEvent<TDetailType, TDetail>, void>;
/**
 * Lambda Handler: SQS Events
 *
 * @see https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html
 */
export type SQSEventHandler = Handler<SQSEvent, void>;
/**
 * Lambda Handler: SNS Events
 *
 * @see https://docs.aws.amazon.com/lambda/latest/dg/with-sns.html
 */
export type SNSEventHandler = Handler<SNSEvent, void>;
/**
 * Lambda Handler: Kinesis Stream Events
 *
 * When `FunctionResponseTypes` for the function in CloudFormation is set to
 * `ReportBatchItemFailures` then {@link StreamsEventResponse} must be returned.
 *
 * @see https://docs.aws.amazon.com/lambda/latest/dg/with-kinesis.html
 */
export type KinesisStreamEventHandler = Handler<KinesisStreamEvent, StreamsEventResponse | null>;
/**
 * Lambda Handler: S3 Events
 *
 * @see https://docs.aws.amazon.com/lambda/latest/dg/with-s3.html
 */
export type S3EventHandler = Handler<S3Event, void>;
/**
 * Lambda Handler: DynamoDB Stream Events
 *
 * @see https://docs.aws.amazon.com/lambda/latest/dg/with-ddb.html
 */
export type DynamoDBStreamEventHandler = Handler<DynamoDBStreamEvent, void>;
//# sourceMappingURL=handler-types.d.ts.map