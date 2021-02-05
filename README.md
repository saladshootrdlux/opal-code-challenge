# opal-code-challenge
This is a demo application for Opal's junior devops code challenge. This basic 'Hello World' style application uses terraform to help automate the deployment and destruction of a dockerized node application via AWS ECS. The AWS console is used for controls, monitoring and health checks.

First, I want to accredit Andrew Bestbier and his uniquely helpful [guide](https://medium.com/avmconsulting-blog/how-to-deploy-a-dockerised-node-js-application-on-aws-ecs-with-terraform-3e6bceb48785) to using terraform to deploy a node application to AWS utilizing docker, and without which I may have chosen a completely different method of application deployment and monitoring. I am happy I chose terraform and AWS.

NOTE: The 'react-demo-app' directory is not in use currently or part of the MVP, but was planned for as a fun future project given more time.

## Technologies Used
The demo application includes the following technologies and reasoning for their use:

- Terraform (deployment automation)
- Node JS (core app)
- Express JS (routing)
- AWS ECS (docker container orchestration)
- AWS ECR (repository hosting)
- AWS CLI (interacting with AWS)
- AWS Console (controls, monitoring, and health checks)
- Docker (Dockerization of the Node application)

## Prerequisites

You will need the latest versions of Node Package Manager (npm), AWS CLI, Docker desktop, and Terraform to be installed and executable via command line. The AWS region used in this application is us-west-2.

### Creating the Application and Hosting on AWS

1. From an empty directory, clone and change to the opal-code-challenge demo directory:

`$ git clone git@github.com:saladshootrdlux/opal-code-challenge.git`

`$ cd opal-code-challenge`

2. Create a node project and install Express JS to support routing:

`$ npm init --y`

`$ npm install express`

3. Initialize terraform and apply the included `main.tf` plan:

`$ terraform init`

`$ terraform apply`

4. Navigate to the AWS ECR repository that was just created using terraform:
https://us-west-2.console.aws.amazon.com/ecr/repositories?region=us-west-2

5. Deploy the newly created node application as a docker image to AWS ECR by copying / pasting each of the commands shown below from your AWS ECR repository into your AWS CLI:

![deploy to aws ecr](https://user-images.githubusercontent.com/38591271/106989243-961f8b80-6726-11eb-9d03-a1fd92a757a7.png)

6. NOTE: There is an [error that occurs](https://github.com/saladshootrdlux/opal-code-challenge/issues/7) when the entire block of code within `main.tf` is run at once. As such, the next set of instructions have been sectioned into two additional 'sub-steps' that require we modify the `main.tf` file. We already created our ECR repository (shown below as "## Step 1") when we executed `$ terraform apply` earlier. See the following: 

![main tf steps](https://user-images.githubusercontent.com/38591271/106988044-9702ee00-6723-11eb-8cca-6ab4180c3d58.png)

7. We will now uncomment everything under "## Step 2: ..." as shown below, save, and re-run `$ terraform apply` to create our cluster next:

![main tf steps2](https://user-images.githubusercontent.com/38591271/106989626-645af480-6727-11eb-8e71-1717c0d8da65.png)

8. Finally, uncomment all remaining code ("## Step 3: ..." and below), save, and again, re-run `$ terraform apply` to create the remaining VPC, load balancer, settings, tasks, group, security policies, and routing:

![main tf steps3](https://user-images.githubusercontent.com/38591271/106990657-85244980-6729-11eb-8f3c-f438032d481c.png)

9. The server should now resolve by visiting the public DNS name located within your load balancer's basic configuration overview:
![dns name](https://user-images.githubusercontent.com/38591271/106989759-ac7a1700-6727-11eb-9774-669e315bf965.png)

NOTE: It may take 3-5 minutes for the clusters to populate as targets within the load balancer and check in as healthy. You will not be able to resolve the DNS address until all clusters display a 'healthy' status.

You should see the following 'Hello Opal!' content displayed in your browser:
![dns name](https://user-images.githubusercontent.com/38591271/106992259-d71a9e80-672c-11eb-9251-0aee8c9bf4a1.png)


### Health Check

Amazon Web Services (AWS) Elastic Containers Monitoring service (ECS) Application Load Balancer periodically sends requests to its registered targets to test their status. These tests are called health checks:
https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html

To view the health status of each of our server(s) we can take a look at the load balancer's registered targets. In the following screenshot, they are healthy:
![health check](https://user-images.githubusercontent.com/38591271/106991878-054bae80-672c-11eb-83d3-b6ef94af71f1.png)

### Destroy the Server

To tear down the server and free up all AWS resources. Simply type the following command in AWS CLI from the opal-code-challenge repository:

`$ terraform destroy`

If you'd like to re-deploy the server with any changes, I recommend remembering to delete all local temporary dot files related to Terraform and Node, and to delete / purge any docker images stored locally related to the repository or terraform may throw errors.

## Going Further

All in all, for my first experience using AWS ECS and Terraform, I have found that this is an incredibly robust toolset for application hosting, continuity, monitoring, and general automation. 

I would have liked to have resolved the script error [mentioned here](https://github.com/saladshootrdlux/opal-code-challenge/issues/7) that required breaking up `main.tf` into three 'steps' when deploying via `terraform apply` but did not have enough time to determine the exact cause or a cleaner workaround. 

I would also have liked to boil down the deployment commands into a single bash script, which would require more familiarization with interfacing with AWS ECR via AWS CLI, and clearly just requires digging a bit more into the documentation.

Given more time, I had planned to tinker with deploying a basic react app within the existing node application, and perhaps hosted some funny content, but I got pretty lost in terraform instead.
