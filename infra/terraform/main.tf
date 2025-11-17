terraform {
  required_providers {
    docker = {
      source = "kreuzwerker/docker"
      version = "~> 2.22.0"
    }
  }
}

provider "docker" {}

# Red para los servicios
resource "docker_network" "alquilarte_net" {
  name = "alquilarte_net"
}

# MongoDB
resource "docker_container" "mongo" {
  name  = "alquilarte-mongo"
  image = "mongo:6"

  ports {
    internal = 27017
    external = 27017
  }

  networks_advanced {
    name = docker_network.alquilarte_net.name
  }
}

# App Node
resource "docker_container" "app" {
  name  = "alquilarte-app"
  image = "tds-devops-tpintegrador-app:latest"

  depends_on = [
    docker_container.mongo
  ]

  ports {
    internal = 3000
    external = 3000
  }

  networks_advanced {
    name = docker_network.alquilarte_net.name
  }
}

resource "docker_container" "prometheus" {
  name  = "alquilarte-prom"
  image = "prom/prometheus:latest"

  ports {
    internal = 9090
    external = 9090
  }

  volumes {
    host_path      = "D:/Tecnicatura en Desarrollo de Software/04 - Cuarto Semestre/02 - Seminario de Profundizacion/TPI_DEVOPS_FINAL/TDS-DevOps-TPIntegrador/prometheus.yml"
    container_path = "/etc/prometheus/prometheus.yml"
  }

  networks_advanced {
    name = docker_network.alquilarte_net.name
  }
}

# Grafana
resource "docker_container" "grafana" {
  name  = "alquilarte-grafana"
  image = "grafana/grafana:latest"

  ports {
    internal = 3000
    external = 3001
  }

  networks_advanced {
    name = docker_network.alquilarte_net.name
  }
}
