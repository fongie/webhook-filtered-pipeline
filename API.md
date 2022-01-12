# API Reference

**Classes**

Name|Description
----|-----------
[WebhookFilteredPipeline](#webhook-filtered-pipeline-webhookfilteredpipeline)|Start an AWS CodePipeline using a source with webhook filters This is currently not supported in CloudFormation so this construct uses a workaround using a CodeBuild project.


**Structs**

Name|Description
----|-----------
[WebhookFilteredPipelineProps](#webhook-filtered-pipeline-webhookfilteredpipelineprops)|Properties for the webhook filtered pipeline.



## class WebhookFilteredPipeline  <a id="webhook-filtered-pipeline-webhookfilteredpipeline"></a>

Start an AWS CodePipeline using a source with webhook filters This is currently not supported in CloudFormation so this construct uses a workaround using a CodeBuild project.

See issue https://github.com/aws/aws-cdk/issues/10265

If you set the github props, you will get a pipeline with the first source
stage configured. If you set the 'source' prop, you will need to confgure the
pipeline's source stage yourself.

__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IResource](#aws-cdk-core-iresource), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IConstruct](#aws-cdk-core-iconstruct), [IPipeline](#aws-cdk-aws-codepipeline-ipipeline), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IConstruct](#aws-cdk-core-iconstruct), [IResource](#aws-cdk-core-iresource), [INotificationRuleSource](#aws-cdk-aws-codestarnotifications-inotificationrulesource)
__Extends__: [Pipeline](#aws-cdk-aws-codepipeline-pipeline)

### Initializer




```ts
new WebhookFilteredPipeline(scope: Construct, id: string, props: WebhookFilteredPipelineProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[WebhookFilteredPipelineProps](#webhook-filtered-pipeline-webhookfilteredpipelineprops)</code>)  *No description*
  * **artifactBucket** (<code>[IBucket](#aws-cdk-aws-s3-ibucket)</code>)  The S3 bucket used by this Pipeline to store artifacts. __*Default*__: A new S3 bucket will be created.
  * **crossAccountKeys** (<code>boolean</code>)  Create KMS keys for cross-account deployments. __*Default*__: true
  * **crossRegionReplicationBuckets** (<code>Map<string, [IBucket](#aws-cdk-aws-s3-ibucket)></code>)  A map of region to S3 bucket name used for cross-region CodePipeline. __*Default*__: None.
  * **enableKeyRotation** (<code>boolean</code>)  Enable KMS key rotation for the generated KMS keys. __*Default*__: false (key rotation is disabled)
  * **pipelineName** (<code>string</code>)  Name of the pipeline. __*Default*__: AWS CloudFormation generates an ID and uses that for the pipeline name.
  * **restartExecutionOnUpdate** (<code>boolean</code>)  Indicates whether to rerun the AWS CodePipeline pipeline after you update it. __*Default*__: false
  * **reuseCrossRegionSupportStacks** (<code>boolean</code>)  Reuse the same cross region support stack for all pipelines in the App. __*Default*__: true (Use the same support stack for all pipelines in App)
  * **role** (<code>[IRole](#aws-cdk-aws-iam-irole)</code>)  The IAM role to be assumed by this Pipeline. __*Default*__: a new IAM role will be created.
  * **stages** (<code>Array<[StageProps](#aws-cdk-aws-codepipeline-stageprops)></code>)  The list of Stages, in order, to create this Pipeline with. __*Default*__: None.
  * **githubSourceActionProps** (<code>[GitHubSourceActionProps](#aws-cdk-aws-codepipeline-actions-githubsourceactionprops)</code>)  GitHub details used to set the starting project source as well as the first action in the pipeline. __*Optional*__
  * **source** (<code>[ISource](#aws-cdk-aws-codebuild-isource)</code>)  If you do not wish to use GitHub, you can provide a custom source here. __*Optional*__
  * **webhookFilters** (<code>Array<[FilterGroup](#aws-cdk-aws-codebuild-filtergroup)></code>)  All webhook filters you wish to apply to starting the pipeline You must set this and githubSourceActionProps OR source. __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**starterProject** | <code>[Project](#aws-cdk-aws-codebuild-project)</code> | The CodeBuild project that starts the pipeline.
**githubSourceAction**? | <code>[GitHubSourceAction](#aws-cdk-aws-codepipeline-actions-githubsourceaction)</code> | The source action which was added to the pipeline if you provisioned the pipeline using the github properties otherwise undefined.<br/>__*Optional*__



## struct WebhookFilteredPipelineProps  <a id="webhook-filtered-pipeline-webhookfilteredpipelineprops"></a>


Properties for the webhook filtered pipeline.

You should either use 'githubSourceActionProps' together with 'webhookFilters'
to create a pipeline with a GitHub source. Then, the pipeline will have the source action
set. Or, you provide your own 'source' for the codebuild project. Then, you will also have
to set the pipeline source action manually after creating the pipeline.



Name | Type | Description 
-----|------|-------------
**artifactBucket**? | <code>[IBucket](#aws-cdk-aws-s3-ibucket)</code> | The S3 bucket used by this Pipeline to store artifacts.<br/>__*Default*__: A new S3 bucket will be created.
**crossAccountKeys**? | <code>boolean</code> | Create KMS keys for cross-account deployments.<br/>__*Default*__: true
**crossRegionReplicationBuckets**? | <code>Map<string, [IBucket](#aws-cdk-aws-s3-ibucket)></code> | A map of region to S3 bucket name used for cross-region CodePipeline.<br/>__*Default*__: None.
**enableKeyRotation**? | <code>boolean</code> | Enable KMS key rotation for the generated KMS keys.<br/>__*Default*__: false (key rotation is disabled)
**githubSourceActionProps**? | <code>[GitHubSourceActionProps](#aws-cdk-aws-codepipeline-actions-githubsourceactionprops)</code> | GitHub details used to set the starting project source as well as the first action in the pipeline.<br/>__*Optional*__
**pipelineName**? | <code>string</code> | Name of the pipeline.<br/>__*Default*__: AWS CloudFormation generates an ID and uses that for the pipeline name.
**restartExecutionOnUpdate**? | <code>boolean</code> | Indicates whether to rerun the AWS CodePipeline pipeline after you update it.<br/>__*Default*__: false
**reuseCrossRegionSupportStacks**? | <code>boolean</code> | Reuse the same cross region support stack for all pipelines in the App.<br/>__*Default*__: true (Use the same support stack for all pipelines in App)
**role**? | <code>[IRole](#aws-cdk-aws-iam-irole)</code> | The IAM role to be assumed by this Pipeline.<br/>__*Default*__: a new IAM role will be created.
**source**? | <code>[ISource](#aws-cdk-aws-codebuild-isource)</code> | If you do not wish to use GitHub, you can provide a custom source here.<br/>__*Optional*__
**stages**? | <code>Array<[StageProps](#aws-cdk-aws-codepipeline-stageprops)></code> | The list of Stages, in order, to create this Pipeline with.<br/>__*Default*__: None.
**webhookFilters**? | <code>Array<[FilterGroup](#aws-cdk-aws-codebuild-filtergroup)></code> | All webhook filters you wish to apply to starting the pipeline You must set this and githubSourceActionProps OR source.<br/>__*Optional*__



