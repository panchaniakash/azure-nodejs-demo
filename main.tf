terraform {
  required_version = ">= 1.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

# Resource Group
resource "azurerm_resource_group" "rg" {
  name     = "rg-hello-world"
  location = "Central India"
}

# App Service Plan (Linux, Free tier)
resource "azurerm_service_plan" "plan" {
  name                = "asp-hello-world"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  os_type             = "Linux"
  sku_name            = "F1"
}

# Web App
resource "azurerm_linux_web_app" "app" {
  name                = "hello-world-app"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  service_plan_id     = azurerm_service_plan.plan.id

  site_config {
    health_check_path = "/health"
    application_stack {
      node_version = "18-lts"
    }
  }

  app_settings = {
    "NODE_ENV" = "production"
    "PORT"     = "3000"
  }
}
