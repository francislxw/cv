# AWS features are used in implementing services to support Inventor Build Automation

### services

ci-services

testcase.manage.service

tcdb.services

access.service

### AWS features

Amazon Web Services | S3, SQS, Dynamoid, ’aws-sdk’, test/mocking

AWS Credentials| AWSAccessKeyId | AWSSecretKey

AWS S3 (Simple Storage Service)| Buckets: $s3.bucket(ENV[‘AWS_S3_BUCKET’]).object(key)

AWS SQS | Aws::SQS::Client.new

AWS Access Control | Block public access | Configuring cross-origin resource sharing (CORS)

AWS Shoryuken | Super-efficient AWS SQS thread-based message processor | .configure_client/server

AWS Dynamoid DB | gem 'dynamoid' | include Dynamoid::Document| Dynamoid.configure | rake dynamoid:create_tables

gem 'aws-sdk' | Aws::S3::Resource.new| Aws.config.update

AWS LocalStack | A fully functional local AWS Cloud Stack for test/mocking framework | endpoint: 'http://localstack:4566'

AWS Lambda|AMI | SSM | EC2 instance | CloudFormation | boto3 | python-lambda awscli

Amazon Machine Images (AMIs)

Amazon Simple Systems Manager (SSM)

Amazon Elastic Compute Cloud instance (EC2 instance)
