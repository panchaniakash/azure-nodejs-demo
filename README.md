# Azure DevOps CI/CD Pipeline - Node.js App 🚀 #

This project shows a minimal but complete CI/CD setup that deploys a Node.js "Hello World" app to Azure App Service using Azure DevOps Pipelines and Terraform.

##  What’s Included

### Node.js app (app.js) with:

/ → returns app info
/health → health check endpoint

### CI/CD pipeline (azure-pipelines.yml) with 3 stages:

Build & Test → install deps, run tests, publish artifacts
Deploy Infrastructure → create Azure resources with Terraform
Deploy App → deploy ZIP to App Service + run health check

### Terraform IaC (main.tf) that provisions:

Resource Group
App Service Plan (Linux, Free tier)
Linux Web App with Node.js 18

## Architecture ##

[Source Code] ---> [Azure Pipeline] ---> [Azure App Service]
                        |
                        v
                  [Terraform IaC]

# --------------- Quick Start -----------------  #

## Prerequisites ##
Azure subscription
Azure DevOps project
Service connection named azure-service-connection

## Steps ##
Clone this repo and push to Azure DevOps
Create a pipeline → select existing YAML → azure-pipelines.yml
Run pipeline → it will:
- Build & test the app
- Provision infra (main.tf)
- Deploy app to Azure App Service

## Local Testing ##
npm install
npm test
npm start

App runs at http://localhost:3000

# Improvements for Production #

Add Key Vault for secrets
Enable monitoring & logging (App Insights, Log Analytics)
Use staging slots for blue/green deployments

# Assumptions #

Using default Free (F1) App Service Plan for simplicity
Terraform state stored locally (for demo; in prod use remote state)
Only one main.tf file to keep things clean

Happy Deploying! 🎉