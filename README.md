# Curriculum Vitae
 
## Personal Information

 <img align='right' src="docs/LXW.jpg" width="120" height="169">  

**Name:** Francis Luo    

**Cell Phone No:** 15221959360

**E-mail:** luo_xiawu@163.com

**WeChat:** francis2891

**Date of Birth:** June, 1979

**Nationality:** China

**Current Location:** Shanghai,China

**Marital Status:** Married

## Education
<img align='left' src="docs/NTU.png" width="140" height="80">  

**Nanyang Technological University | NTU**

Singapore

Master’s degree, Digital Media Technology, School of Computer Engineering

August 2012 ~ July 2014

<img align='left' src="docs/JSKJDX2.jpg" width="110" height="72"> 

**Jiangsu University of Science and Technology | JUST**

China

* Master’s degree, Computer Integrated Manufacturing Systems (CIMS), School of Mechanical Engineering

September 2002 ~ March 2005

* Bachelor’s degree, Mechanical Manufacture and Automation, School of Mechanical Engineering

September 1998 ~ July 2002

## Skills Summary

**1. Deep expertise in Agile development practices and DevOps culture adoption**

o	Extensive experience in Agile software development, delivery, and cross-team DevOps collaboration.. 

*	Agile development, CI/CD/CL/Jenkins/Artifactory/JFrog/gitops-deploy/spinnaker/argoCD/Canary deployment
  
*	Spearheaded DevOps culture transformation across development, QA, delivery, localization, and security teams
  
*	Implemented Scrum and OKR methodologies to enhance cross-team collaboration and accelerate incident resolution

o	Led cloud-native transformation (0→1) for multiple products with Docker/K8s/microservices and full automation

* Built cloud infrastructure from scratch (0 to 1) on Alibaba Cloud using advanced Kubernetes (ACK: Alibaba Container Service for Kubernetes) to support applications running in China regions.
  
*	Service based architecture, API based communication, container based infrastructure and Devops process

*	Single modular applications of multiple products are built based on the same principle of cloud native

*	New applications based on public and private cloud computing agility and automation are built, and the computing capacity provided on demand is utilized

o	Accumulated lots of experience in culture, process, method (such as Devops), architecture and Technology (container/docker) involved in the development and interactive transformation to cloud native applications

o	Familiar with CI/CD pipeline, rolling, blue/green deployment, automatic scalability and fault tolerance

o	Understand the construction, deployment and management of cloud native applications, and learn about cloud computing, security, testing ,monitoring and alarms

**2. Techniques**

o	DevOps

*	Familiar with Jenkins,GitHub,Artifactory,CI/CD pipeline,Perforce, Electrical Cloud,Gitlab

*	Learn about IaC,Ansible,Terriform,Packer,VMware,Docker, dockerfile, Containerd, Harbor, DockerHub, AWS, Azure, Linux, Splunk

*	Learn about SpringCloud/Eureka,Ribbon, zuul, hystrix, springcloud gateway, springcloud Config

*	Learn about Cloud Native, Kubernetes, Prometheus, Grafana,ELK, EFK, ServiceMesh/Istio, K8s teckton, Rancher, pinpoint, Helm v3, Alertmanager, PV, PVC, storageClass, Ceph, Sonarqube, Harmony

*	Learn about Python, Perl, Batch, Powershell, Groovy/UT,Golang

o	Development

*	Learn about Computer Graphics, OpenGL，WebGL

*	Familiar with C++ & the principles of basic data structures and algorithms

*	Learn about Java, Java Script, Servlet, Eclipse, Type Script, PHP, HTTPS, HTML, XML, CSS, JSON, ASP.net

*	Learn about Nginx, Tomcat, Django

*	Learn about MySQL/Mariadb, MongoDB, Redis

* Learn about AI/ML basic theories, plus completed assignments

**3.	Management**

*	Familiar with Scrum, Kanban, Agile, LUMA, OKR theories,SLA,JIRA


## Working Experience

**Senior DevOps Engineer (Engineering | DevOps)**

Project44 China | Shanghai, China

April 2022 ~ June 2025 (3 years 2 months) 

**Senior Software Engineer III (Engineering | DevOps)**

Autodesk Asia Pte Ltd. (ASRD)  | Singapore

November 2011 ~ June 2021 (9 years 5 months)

**Software Engineer (Developer)**

Autodesk Software (China) Co., Ltd. (ACRD) | Shanghai, China

May 2005 ~ November 2011 (6 years 6 months) 

## Project Portfolio
>	**Project44 China**
[I.Built Alibaba Cloud/GCP hybrid platform for China apps with cross-border networking](#I)

[II.Deployed China Monitoring Stack: Datadog, ELK & Grafana](#II)

[III.Built Alibaba Cloud Compliance Auditor for US SOC2](#III)

[IV.Deployed the China Movement Web platform and passing all QA validation checks to deliver a stable, production-ready service]

[V.Archive the data in the Lingang Government Data Center to obtain/renew the Data Export Security License]

[VI.Migrated mapping services from Mapbox to Baidu Maps to comply with China market regulations]

[VII.POC project, APAC AI Agent]

>	**Autodesk Singapore Office**

[I. Migrate ETO Component CI/CD build process from VM to K8s Platform](#I)

[II. Migrate micro-services from Separated Dockers to Kubernetes cluster with HA of master nodes and monitor system](#II)

[III. Automation CI-CD Build Process for Autodesk major Desktop Products](#III)

[IV. Implement micro services based on CI-CD automatic deployment for company products build process](#IV)

[V. Pull Request CI/CD System from P4 to Git](./docs/MoreWorkExperience_sinoffice.md)

VI. BRE/ECS – CI/CD Builds for the Data Management Team

>	**Autodesk Shanghai Office**

[VII. Form DevOps team and Set up Automation building process for Inventor, Vault, ETO](./docs/MoreWorkExperience_shaoffice.md)

VIII. Develop two tools iTuneUp and MSDPSCollector

IX. Reduce Inventor Build Cost

X. C4a, AEC Block Management

>	**Others**

[XI. Setup DevOps Platform for *Graphic Editing System* and *Chinese Speech Recognition System* with Kubernetes Cluster](./docs/MoreWorkKubernetes.md)

XII. Migrate SpringCloud based e-Shopping Platform to K8s

[XIII. E-learning | ML&DL&AI](./docs/MoreWorkELearningAI.md)

[XIV. Interactive Shape Editing](./NTU-StudyProjects/Dissertation)

[XV. E-Practice | leetcode coding exercise](https://leetcode-cn.com/u/lionsg/)

## Project Experience

> <=3 years

<a name="I"></a>
### I.Built Alibaba Cloud/GCP hybrid platform for China apps with cross-border networking

In 2022, I architected Project44's greenfield Alibaba Cloud deployment (0→1) for China operations, establishing a hybrid cloud platform with GCP via Megaport. This compliant infrastructure processed 1M+ daily orders while maintaining real-time synchronization with US systems. The solution enabled full localization without sacrificing global connectivity, becoming Project44's foundation for APAC expansion. Key achievements included seamless cloud-native migration, cross-region networking, and unified security across both platforms.

•	Role: PI                                                          Time: April 2022-Mar 2023
•	Major functions:
1.)	Cloud Infrastructure Migration
• Evaluated and migrated GCP infrastructure to Alibaba Cloud, replicating US services with full functionality.

2.) IaC Development
• Built 20+ reusable Terraform modules across 5 Git repos for standardized Alibaba Cloud deployments.

3.) Core Platform Deployment
• Deployed Kubernetes clusters, hybrid networking (Megaport GCP link), and middleware (Kafka, Postgres, Redis).

4.) Security & Observability
• Implemented Vault, IAM, and ELK stack for secure, observable operations across both clouds.

5.) Operations & Maintenance
• Maintained ACK clusters with security patches and built China-compliant logging pipelines.

<a name="II"></a>
### II.Deployed China Monitoring Stack: Datadog, ELK & Grafana

Designed and deployed a Terraform-based monitoring stack (Datadog/ELK/Grafana) across China environments using GitOps (ArgoCD), with real-time Slack/PagerDuty alerts ensuring 99.9% SLA compliance and full-stack observability.

•	Role: PI                                                          Time: Mar 2023-June 2023
•	Major functions:
1.) Cross-Region Monitoring
Deployed Datadog across Alibaba Cloud with custom dashboards, achieving 99.9% visibility for all China services. (15 words)

2.) Log Management
Built Elasticsearch-Logstash pipeline enabling sub-2s log searches across environments for rapid troubleshooting. (14 words)

3.) Observability Framework
Configured China-hosted Grafana with 15+ dashboards tracking 50+ KPIs including API performance. (15 words)

4.) Incident Management
Integrated Slack/PagerDuty with tiered escalation and automated runbooks for 24/7 response. (16 words)

<a name="III"></a>
### III.Built Alibaba Cloud Compliance Auditor for US SOC2

Designed and developed a SOC2-compliant auditing system on Alibaba Cloud using ActionTrail/OSS/MNS, with Logstash-to-SumoLogic analysis and Vault-secured secrets. Automated compliance reporting (40+ hrs/month savings) achieved SOC2 Type I certification with full audit trails.
•	Role: PI                                                          Time: Mar 2023-June 2023
•	Major functions:
1.) Log Management System
Built ActionTrail-to-SumoLogic pipeline via OSS/MNS and Logstash, streaming structured API logs for US compliance analytics. 

2.) Security Framework
Implemented Vault-managed secrets with RAM Roles/K8s webhooks, enforcing RBAC and least-privilege access per SOC2. 

3.) Compliance Automation
Configured Sumo Logic with SOC2 rulesets and WORM-protected OSS storage for immutable audit evidence. 

4.) Monitoring & Response
Deployed real-time Slack/email alerts for suspicious activity, achieving 100% traceability and SOC2 Type II readiness.

> >3 years
<a name="I"></a>
### I. Migrate ETO Component CI/CD build process from VM to K8s Platform

Decouple exist CICD build process of ETO component, and migrate it to kubernetes cluster DevOps platform with github,Jenkins, k8s and artifactory server, this is a pilot project, purpose is to accumulate experiences for other larger products build process migration.

•	Role: PI　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　Time: June 2020-June 2021

•	Main CICD process/pipeline stages

DEV members push commits to github, Jenkins feels this with webbook, call k8s api to create Jenkins worker pods, which will run pipeline stages:

initial task, sync-source code, get 3rd party files, compile solutions, harmony scan, create zip packages, distribute to all global sites, post-build tasks.

•	Major functions:

1.)	Set up Kubernetes cluster platform with binary method (2 masters + 4 nodes).

2.)	Apply Keepalived and Nginx tools to implement HA for masters nodes.

3.)	Set up Kibana dashboard with EFK tools to watch logs.

4.)	Utilize Prometheus, Grafana and Alertmaner to set up monitor system.

5.)	Switch the build process from fixed VM to k8s clusters, once build is done, pod will be removed, which will save cloud resources.

6.)	Notify alerts to DevOps team by email and slack channel.

•	[Demo](./docs/demo/1.Proj1.md)

<a name="II"></a>
### II. Migrate micro-services from Separated Dockers to Kubernetes cluster with HA of master nodes and monitor system

Migrate micro-services implemented in project IV from separated Dockers to k8s, implement DevOps platform with Jenkins, k8s and artifactory server, and make it much easier to maintain these services.

•	Role: PI　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　Time: May 2019-June 2020

•	Main CICD process/pipeline stages

EngOps member push commits to github, Jenkins feels this with webbook, call k8s api to create Jenkins worker pod, which will run pipeline stages:

sync source code, compile solutions, harmony scan, create docker image, push to artifactory, deploy it to stage branch, deploy it to production branch.

•	Major functions:

1.)	Set up Kubernetes cluster platform with Kubeadm method (2 masters + 3 nodes).

2.)	Implement HA for masters nodes by Keepalived and Nginx tools.

3.)	Set up monitor system by Prometheus, Grafana and Alertmaner tools.

4.)	Set up Kibana dashboard with EFK tools to monitor logs.

5.)	Notify committer with job results by email and slack channel.

•	[Demo](./docs/demo/2.Proj2.md)

<a name="III"></a>
### III. Automation CI-CD Build Process for Autodesk major Desktop Products

Migrate the CI-CD experience from Vault product to all other major products, use Jenkins pipeline to implement automation build process, and crate a unified dashboard for all departments usage.

•	Role: PI　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　Time: June 2016-May 2019

•	Main Pipeline stages

Initialize build, sync-source, update 3P, compile solutions, Digital Sign binaries, Create masters, Digital sign installers, UPI Register, Harmony Scan, Post Symbols, Post masters, post-build tasks.

•	Major functions:

1.) Automatically error checking from build logs.

2.) Notify respective committers timely & correctly, especially for the error ones.

3.) Implement a dashboard to monitor build status of above listed products.

4.) Branch build scheduler for SWD team, to validate their code changes from their own branches

5.) Builds will trigger automatically in Jenkinks by services timely.

6.) Everyone (DEV/QA teams) can monitor builds (Optmize/Debug/Core) status from the unified dashboard.

7.) Each test image with be created with clean master/binaries dynamically to run test cases by service automatically.

8.) Validation result of new builds will be shown on the dashboard, including new failed test cases number/rate.

9.) Post masters/binaries to different sites globally for QA validate & DEV debug usage. 

10.) QA team cross-validate new failures, reports to DEV team to fix bug.

11.) DEV team provide fix, validate the new code change with CI build, then put it into respective DEV branch, follow CCB merge etc. process to Release branch.

12.) Also send build results to the slack channel for team member’s review.

•	Techniques

o	SCM: Git, Jenkins, Artifactory, groovy, HashiCorp Vault, Ansible

o	Infrastructure as Code (IaC), AWS

o	Docker + Ansible to control all ECS machines + set up build environment (software version control)

o	React +Node.js front-end programming

o	Ruby-smal + OKTA (SAML2) to implement the administrator user identity confirmation

o	Implement AWS interfaces by python aws sdk boto3.

o	Implement Azure interfaces with azure vm image builder service.

•	Setup CI-CD pipeline for most major products like: 

Inventor, Vault, Civil3D, Factory Design Unities, ETO, Process Analysis etc.

•	[Demo](./docs/demo/3.Proj3.md)

<a name="IV"></a>
### IV. Implement micro services based on CI-CD automatic deployment for company products build process

In implementing the automatic CI-CD build/release for the major desktop products in above project III, we wrote more than 10 micro services and implemented the automatic deployment by ci-cd.

•	Role: PI　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　Time: Mar 2015-June 2018

•	Main Pipeline stages

SCM checkout, Build docker container, Test new code, Harmony Scan, Upload updated docker container and Deploy new services

•	CI-CD agile process:

1.) We implemented new functions on Dev self’s branch

2.) Ensure it passed UT on our local machines, then submitted it to our own branch, and performed the test builds.

3.) When the test build was clean, merged to the stage branch, Jenkins would automatically trigger a ci-cd build to run above pipeline stages once it noticed a new commit.

4.) We periodically merged the code from the Stage branch to Master branch, Jenkinsfile would run upload updated containers and deploy new services two stages if it’s from Master branch.

•	Implement more than 10 microservices

o	ci-services

o	testcase.manage.service 

o	tcdb.services

o	access.service 

o	etc.

•	Main technologies

o	git, Jenkins, artifact, ruby, rails, sqlite3, redis,aws-sdk, harmony etc.

o	Infrastructure code (IAC), AWS, Docker,Dockerfile

•	Security of microservices: 

symmetric encryption and asymmetric encryption

•	[Demo](./docs/demo/4.Proj4.md)


## More Working Experiences

[Singapore Office](./docs/MoreWorkExperience_sinoffice.md)

[Shanghai Office](./docs/MoreWorkExperience_shaoffice.md)

[NTU Projects](./docs/MoreWorkExperience_ntu.md)

[Kubeletes Projects](./docs/MoreWorkKubernetes.md)

[MachingLearning & Artificial Intelegence](./docs/MoreWorkELearningAI.md)

[Leetcode Practice](./docs/MoreWorkLeetCode.md)


## Other Highlights

### Kubernetes

* [Docker+kubernetes (k8s)+Devops Enterprise Architect](./docs/DockerK8sDevopsEnterpriseArchitect.md)

### IaC

* [AMI Creation with Packer](./docs/IacAMIPacker.md)

* [Terraform](./docs/IacTerraform.md)

* [Ansible](./ansible)

* [Microsoft Azure](./azure)

* AWS [certificate](./aws), [demo](./aws/imageservicecomponent.md)

### Computer Graphics
* [Free Form Deformation](./computer-graphics) 

### Algorigths
* [SkipList](./algorithms/1.skiplist) 

### AI

* Speech Recoginization [demo](./ai-demo/1.speech_recognition)

* Object Detection [yolo](./ai-demo/2.object_detection)


### Linux

##### Server setup

* DHCP setup

* DNS service setup

* FTP server

* SAMBA server 

* NFS server

* NTP-Chrony Time Server

* RSync Server

## Training Experience

**Power Communication Skills** | April 13th, 2012

**Scrum Foundation and Agile Engineering Practice** | April 16th ~ 18th 2012

**Employee Leadership Program Training** | September 4th ~ 7th 2012

**Conflicts Management** | April 23rd, 2013

**Power Presentation Skills** | July 10th ~11th 2014

**Security Training** | January 4th, 2015

**Business English 2B** | Dec 2016 ~ Jan 2017, British Council  

**AWS Workshop: AMI creation using Packer** | July 1st, 2017

**AWS Workshop: Terraform** | July 21st ,2017

**AWS Technical Essentials** | April 23rd , 2018, Asia / Singapore

**AWS Summit Singapore 2019** | Nov 4th, 2019

**AWS Summit Online ASEAN 2020** | May 13th, 2020, Singapore

**OKR workshop** | May 23rd ,2019

**Agile Workshop** | Oct 11st, 2019

**Interview Bootcamp** | March 15th, 2021
