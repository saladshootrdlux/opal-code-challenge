# opal-code-challenge
Demo repository for Opal's junior devops code challenge.

## Prerequisites

You will need the latest versions of Node Package Manager (npm), AWS CLI, Docker desktop, and Terraform to be installed and executable via command line.

### Creating the Server

First, you'll need to clone the repository, change to the core directory, and create a local server to push to ECS.

`git clone git@github.com:saladshootrdlux/opal-code-challenge.git`

`cd opal-code-challenge`

Create an npm project:

`npm init --y`

Install npm express for routing within our app.

`npm install express`

Initialize terraform.

`terraform init`

(Optional) Run terraform plan to preview changes.

`terraform plan`

Run terraform apply to create the ECS cluster, security groups, load balancer, and routing.

`terraform apply`

KNOWN ISSUE: The current revision of the `main.tf` script sometimes runs at this point without linking to the load balancer and may result in an error. This is due to the script attempting to link our service to the load balancer before it is created:

![error image](https://user-images.githubusercontent.com/38591271/106855685-32d42180-6672-11eb-83d9-875aa438a5b1.png)

Simply re-run the `terraform apply` command if this occurs and the issue should resolve itself.

Authenticate and push the node application image to our newly created repository.



