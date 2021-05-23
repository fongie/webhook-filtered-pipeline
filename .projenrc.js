const { AwsCdkConstructLibrary, ProjectType } = require('projen');
const project = new AwsCdkConstructLibrary({
  author: 'Max Körlinge',
  authorAddress: 'mkorlinge@hotmail.com',
  cdkVersion: '1.95.2',
  defaultReleaseBranch: 'main',
  name: 'webhook-filtered-pipeline',
  repositoryUrl: 'https://github.com/fongie/webhook-filtered-pipeline',
  keywords: [
    'codepipeline',
    'webhook',
    'filter',
  ],
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-codepipeline',
    '@aws-cdk/aws-codebuild',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-codepipeline-actions',
  ], /* Which AWS CDK modules (those that start with "@aws-cdk/") does this library require when consumed? */
  // cdkTestDependencies: undefined,    /* AWS CDK modules required for testing. */
  // deps: [],                          /* Runtime dependencies of this module. */
  description: 'CDK construct to create a CodePipeline which starts based on git webhook filters', /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],                       /* Build dependencies for this module. */
  packageName: 'webhook-filtered-pipeline', /* The "name" in package.json. */
  projectType: ProjectType.LIB, /* Which type of project this is (library/app). */
  // releaseWorkflow: undefined,        /* Define a GitHub workflow for releasing from "main" when new versions are bumped. */
  initialVersion: 'v1.0.0',
});
project.synth();