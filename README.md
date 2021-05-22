# Webhook Filtered Pipeline

This is a construct for AWS CDK which enables you to start your CodePipelines using webhook filtered source actions.

This functionality is not available in CloudFormation right now (see [this issue](https://github.com/aws/aws-cdk/issues/10265)), this construct works around that by putting a CodeBuild project in front which does have support for filters, and it starts the pipeline.

See the code documentation for implementation details.