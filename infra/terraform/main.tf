terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.1"
    }
  }
}

provider "docker" {}

# Red interna para los contenedores
resource "docker_network" "alquilarte_network" {
  name = "alquilarte_network"
}

# Contenedor de MongoDB
resource "docker_container" "mongo" {
  name  = "alquilarte-mongo"
  image = "mongo:6"
  ports {
    internal = 27017
    external = 27017
  }
  networks_advanced {
    name = docker_network.alquilarte_network.name
  }
}

# Contenedor de la aplicación
resource "docker_container" "app" {
  name  = "alquilarte-app"
  image = "tds-devops-app:latest"
  ports {
    internal = 3000
    external = 3000
  }
  depends_on = [docker_container.mongo]
  networks_advanced {
    name = docker_network.alquilarte_network.name
  }
}