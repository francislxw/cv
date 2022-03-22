## Detailed Working Experiences (<= 5 years)

**Two generations of Automation Build Process for Autodesk major desktop products**

I. Decouple VB build tool (pay for license) to PERL scripts by us, plus build dashboard, SCM: P4

II Decouple scripts to groovy/python, with Jenkins pipeline, plus build dashboard, SCM: Git + Artifactory

*Main Pipeline stages:*

* Initialize build, sync-source, update 3P, compile solutions, Digital Sign binaries, Create masters, Digital sign installers, UPI Register, Post Symbols, Post masters, post-build tasks.

* Automatically error checking from logs.

* Notify build failures to respective committers correctly.

* Post masters/binaries to different sites globally for QA validate & DEV debug usage.

**Mainly for the following products:**

Setup CI-CD pipeline for most major products like: 

Inventor, Vault, Civil3D, Factory Design Unities, ETO, Process Analysis etc.

**Infrastructure as Code (IaC)**

* Docker + Ansible to control all ECS machines +set up build environment (software version control)

* Implement dashboard to monitor build status of above listed products.

* Branch build scheduler for SWD team, to validate their code changes from their own branches

* Etc.

**React +Node.js front-end programming** 

* Ruby-smal + OKTA (SAML2) to implement the administrator user identity confirmation.

* Official/Continues/QA/CI builds scheduling by admin according to DEV's requests.

* Builds will trigger automatically in Jenkinks by services timely.

* Everyone (DEV/QA teams) can monitor builds (Otpmize/Debug/Core) status from the dashboard.

* Each test image with be created with clean master/binaries dynamically to run test cases by service automatically.

* Validation result of new builds will be shown on the dashboard, including new failed test cases number/rate.

* QA team cross-validates new failures, reports to DEV team to fix bugs.

* DEV team provides fixes, validates the new code change with CI build, then puts it into repective DEV gti branch, follows CCB merge etc. process to the Release branch.

**Rest API implementation** | ruby | typescript | Redis + Sidekiq

* ci-services

* testcase.manage.service

* tcdb.services

* access.service

* etc.

**Communicate with #Slack**

Send build results to the slack channel | http POST request (header, body, data)

**Amazon Web Services** | S3, SQS, Dynamoid, ’aws-sdk’, test/mocking
 
* AWS Credentials| AWSAccessKeyId | AWSSecretKey 
 
* AWS S3 (Simple Storage Service)| Buckets: $s3.bucket(ENV[‘AWS_S3_BUCKET’]).object(key)
 
* AWS SQS | Aws::SQS::Client.new 
 
* AWS Access Control | Block public access | Configuring cross-origin resource sharing (CORS)
 
* AWS Shoryuken | Super-efficient AWS SQS thread-based message processor | .configure_client/server
 
* AWS Dynamoid DB | gem 'dynamoid' | include Dynamoid::Document| Dynamoid.configure | rake dynamoid:create_tables
 
* gem 'aws-sdk'  | Aws::S3::Resource.new| Aws.config.update
 
* AWS LocalStack | A fully functional local AWS Cloud Stack for test/mocking framework | endpoint: 'http://localstack:4566'
 
**AWS Lambda**|AMI | SSM | EC2 instance | CloudFormation | boto3 | python-lambda awscli
 
* Amazon Machine Images (AMIs)
 
* Amazon Simple Systems Manager (SSM)
 
* Amazon Elastic Compute Cloud instance (EC2 instance)

**Hashicorp Terraform**|HCL| AWS Lambda | EC2 instance | python-lambda awscli
 
* HashiCorp 配置语言（HCL）


**Hashicorp Packer**
 
* Microsoft Azure | Azure Image Builder | python-adal | azure-functions | azure-identity | azure-mgmt-imagebuilder | azure-mgmt-resource
