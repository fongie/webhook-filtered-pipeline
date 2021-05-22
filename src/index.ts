import { BuildSpec, FilterGroup, ISource, Project, Source } from "@aws-cdk/aws-codebuild";
import { Pipeline, PipelineProps } from "@aws-cdk/aws-codepipeline";
import { GitHubSourceAction, GitHubSourceActionProps, GitHubTrigger } from "@aws-cdk/aws-codepipeline-actions";
import { Effect, PolicyStatement } from "@aws-cdk/aws-iam";
import { Construct } from "constructs";

/**
 * Properties for the webhook filtered pipeline.
 * You should either use 'githubSourceActionProps' together with 'webhookFilters'
 * to create a pipeline with a GitHub source. Then, the pipeline will have the source action
 * set. Or, you provide your own 'source' for the codebuild project. Then, you will also have
 * to set the pipeline source action manually after creating the pipeline.
 */
export interface WebhookFilteredPipelineProps extends PipelineProps {
  /**
   * GitHub details used to set the starting project source as well as the first action
   * in the pipeline. Remember to set your output artifacts etc here to keep building
   * the pipeline.
   * You must set this and webhookfilters OR source.
   */
  readonly githubSourceActionProps?: GitHubSourceActionProps;
  /**
   * All webhook filters you wish to apply to starting the pipeline
   * You must set this and githubSourceActionProps OR source.
   */
  readonly webhookFilters?: FilterGroup[];

  /**
   * If you do not wish to use GitHub, you can provide a custom
   * source here. Note that if you do, you have to set your own
   * filters using `source.webhookFilters` and you must set
   * `source.webhook` to true. Also, you have to set the source action
   * on the pipeline after creating it.
   * 
   * NOTE: if you set this, all github properties (including webhookFilters) 
   * above will be ignored.
   */
  readonly source?: ISource;
}

/**
 * Start an AWS CodePipeline using a source with webhook filters
 * This is currently not supported in CloudFormation so this construct
 * uses a workaround using a CodeBuild project. 
 * See issue https://github.com/aws/aws-cdk/issues/10265
 * 
 * If you set the github props, you will get a pipeline with the first source
 * stage configured. If you set the 'source' prop, you will need to confgure the
 * pipeline's source stage yourself.
 */
export class WebhookFilteredPipeline extends Pipeline {
  private _starterProject: Project
  constructor(scope: Construct, id: string, props: WebhookFilteredPipelineProps) {
    super(scope, id, props);
    const { source, webhookFilters, githubSourceActionProps } = props;
    if (!source && (!githubSourceActionProps || !webhookFilters)) {
      throw Error('You must set EITHER source OR githubSourceActionProps and webhookfilters');
    }
    this._starterProject = new Project(this, `${id}-starter`, {
      source: source ?? Source.gitHub({
        owner: githubSourceActionProps.owner,
        repo: githubSourceActionProps.repo,
        branchOrRef: githubSourceActionProps.branch,
        webhook: webhookFilters ? true : false,
        webhookFilters
      }),
      buildSpec: BuildSpec.fromObject({
        version: '0.2',
        phases: {
          install: {
            'runtime-versions': {
              nodejs: 10
            }
          },
          build: {
            commands: [`aws codepipeline start-pipeline-execution --name ${this.pipelineName}`]
          }
        }
      })
    })
    this._starterProject.addToRolePolicy(new PolicyStatement({
      actions: [ 'codepipeline:StartPipelineExecution' ],
      resources: [ this.pipelineArn ],
      effect: Effect.ALLOW
    }));
    if (githubSourceActionProps) {
      this.addStage({
        stageName: 'Source',
        actions: [new GitHubSourceAction({
          ... githubSourceActionProps,
          trigger: GitHubTrigger.NONE // so it is only started by the starter project
        })],
      });
    }
  }
  /**
   * The CodeBuild project that starts the pipeline
   */
  get starterProject(): Project {
    return this._starterProject
  }
}
