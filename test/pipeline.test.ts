import { BuildSpec, EventAction, FilterGroup, Project } from '@aws-cdk/aws-codebuild';
import { Artifact } from '@aws-cdk/aws-codepipeline';
import { CodeBuildAction } from '@aws-cdk/aws-codepipeline-actions';
import { App, SecretValue, Stack } from '@aws-cdk/core';
import { WebhookFilteredPipeline } from '../src';

let app: App;
let stack: Stack;
beforeEach(() => {
  app = new App();
  stack = new Stack(app);
});

test('throws on invalid props', () => {
  expect(() => new WebhookFilteredPipeline(stack, 'test', {})).toThrowError();
  expect(() => new WebhookFilteredPipeline(stack, 'test', {
    webhookFilters: [],
  })).toThrowError();
  expect(() => new WebhookFilteredPipeline(stack, 'test', {
    githubSourceActionProps: {
      owner: 'test',
      repo: 'testrepo',
      output: new Artifact(),
      oauthToken: SecretValue.plainText('mytoken'),
      actionName: 'github',
    },
  })).toThrowError();
});

test('snapshot for github', () => {
  const sourceOutput = new Artifact();
  const pipe = new WebhookFilteredPipeline(stack, 'test', {
    githubSourceActionProps: {
      owner: 'test',
      repo: 'testrepo',
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
      project: new Project(stack, 'proj', { buildSpec: BuildSpec.fromObject({}) }),
    })],
  });
  expect(app.synth().getStackArtifact(stack.artifactId).template).toMatchSnapshot();
});