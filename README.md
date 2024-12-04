# Archived

This feature now exists in CDK: [PR](https://github.com/aws/aws-cdk/pull/29127) rendering this library unnecessary.

# Old Readme

## Webhook Filtered Pipeline

This is a construct for AWS CDK which enables you to start your CodePipelines using webhook filtered source actions.

This functionality is not available in CloudFormation right now (see [this issue](https://github.com/aws/aws-cdk/issues/10265)), this construct works around that by putting a CodeBuild project in front which does have support for filters, and it starts the pipeline.

See the code documentation for implementation details.

## Installation

```shell
npm i webhook-filtered-pipeline
```

## Usage

The construct extends the `Pipeline` construct which means you can use it as you would normally after instantiating it. Here's an example, which prevents the pipeline from being run when only markdown files were changed:

```typescript
import { FilterGroup, EventAction, Project, BuildSpec } from '@aws-cdk/aws-codebuild';
import { Artifact } from '@aws-cdk/aws-codepipeline';
import { CodeBuildAction } from '@aws-cdk/aws-codepipeline-actions';
import { App, Construct, SecretValue, Stack, StackProps } from '@aws-cdk/core';
import { WebhookFilteredPipeline } from 'webhook-filtered-pipeline'

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const sourceOutput = new Artifact();
    const pipe = new WebhookFilteredPipeline(this, 'pipe', {
      githubSourceActionProps: {
        owner: 'fongie',
        repo: 'my-repo',
        output: sourceOutput,
        oauthToken: SecretValue.plainText('mytoken'),
        actionName: 'github',
      },
      webhookFilters: [
        FilterGroup.inEventOf(EventAction.PUSH).andBranchIs('mybranch').andFilePathIsNot('*.md'),
      ],
    });

    pipe.addStage({
      stageName: 'stage2',
      actions: [new CodeBuildAction({
        input: sourceOutput,
        actionName: 'build',
        project: new Project(this, 'proj', { buildSpec: BuildSpec.fromObject({
            // ...
          }) 
        }),
      })],
    });

    // ... etc, add more stages
  }
}
```
