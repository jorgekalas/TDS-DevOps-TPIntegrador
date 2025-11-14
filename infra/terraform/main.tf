provider "docker" {}

resource "docker_image" "app" {
  name         = "tds-devops-tpintegrador-app"
  keep_locally = false
}

resource "docker_container" "app" {
  name  = "alquilarte-app"
  image = docker_image.app.latest
  ports {
    internal = 3000
    external = 3000
  }
}
