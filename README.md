🏠 API Inmobiliaria – Proyecto Integrador DevOps (Backend + CI/CD + Docker + Monitoreo)
📘 Descripción general

Esta API está orientada a optimizar la gestión interna de la inmobiliaria Alquilarte, una empresa mediana dedicada a la administración de propiedades, clientes y contratos.
El sistema permite administrar tareas y áreas funcionales para mejorar la eficiencia administrativa, comercial y operativa.

A lo largo de este trabajo, se aplicaron prácticas DevOps completas, incluyendo:

Control de versiones con GitFlow

Contenerización con Docker

Integración y Despliegue Continuo (CI/CD) con GitHub Actions + Render

Testing automatizado con Jest y Supertest

Monitoreo con Prometheus + Grafana

Infraestructura como Código (IaC) con Terraform (opcional)

🎯 Objetivos generales

Mejorar la arquitectura y mantenibilidad del software desarrollado por encargo.

Integrar equipos de trabajo aplicando metodologías ágiles y prácticas DevOps.

Desempeñarse de manera autónoma en entornos de desarrollo profesional.

Incorporar herramientas de automatización y monitoreo de infraestructura.

⚙️ Objetivos específicos

Desarrollar una aplicación web utilizando Node.js + Express + Pug.

Integrar una base de datos MongoDB Atlas.

Implementar pruebas automatizadas con Jest y Supertest.

Dockerizar el entorno y crear workflows CI/CD para build, test y deploy automático.

Desplegar la app en la nube (Render) con integración continua.

Añadir monitoreo en tiempo real mediante Prometheus y Grafana.

Explorar Infraestructura como Código (IaC) con Terraform.

🚀 Funcionalidades principales

CRUD de Personas, Clientes, Propiedades, Contratos y Reportes.

Testing automatizado para endpoints críticos (/ping, /personas).

Despliegue automático en Render mediante Deploy Hook.

Métricas Prometheus expuestas en /metrics.

Dashboard en Grafana para visualización del rendimiento.

CI/CD completo mediante GitHub Actions.

Infraestructura reproducible con Terraform (opcional).

📁 Estructura del Proyecto (Versión 2.0 – DevOps)
├─ app.js                 # Configuración Express, healthcheck, /metrics
├─ index.js               # Bootstrap server + conexión MongoDB
├─ routes/                # Endpoints REST (personas, clientes, propiedades…)
├─ views/                 # Plantillas Pug
├─ tests/                 # Jest + Supertest
├─ Dockerfile             # Imagen Node.js para la app
├─ docker-compose.yml     # App + Mongo + Prometheus + Grafana
├─ infra/
│   └─ terraform/         # Ejemplo de IaC con provider docker
├─ .github/workflows/
│   ├─ ci-test.yml        # CI – Build, test y build Docker
│   └─ deploy.yml         # CD – Deploy automático a Render
└─ README.md

🌐 Rutas principales
Ruta	Descripción
/ping	Endpoint de salud (utilizado en CI y healthcheck Docker)
/personas	Gestión de personal (API REST y tests)
/clientes	CRUD de clientes con vistas Pug
/propiedades	CRUD de propiedades vinculadas a clientes
/metrics	Exposición de métricas para Prometheus

🧱 Dockerización

Dockerfile principal:

FROM node:18-alpine
WORKDIR /app

RUN apk add --no-cache bash
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .

EXPOSE 3000
ENV PORT=3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=20s --retries=3 \
  CMD wget -qO- http://localhost:3000/ping || exit 1

CMD ["npm", "start"]


Ejecutar localmente:

# Build y run manual
docker build -t tds-devops-tpintegrador-app .
docker run -p 3000:3000 --env MONGO_URI=<atlas-uri> tds-devops-tpintegrador-app

# O con docker-compose
docker compose up -d


Servicios disponibles:

App: http://localhost:3000

Prometheus: http://localhost:9090

Grafana: http://localhost:3001

🧪 Testing automatizado

Pruebas básicas con Jest y Supertest:

import request from 'supertest';
import app from '../app.js';

describe('Test ruta /ping', () => {
  it('GET /ping responde 200 y mensaje pong', async () => {
    const res = await request(app).get('/ping');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ ok: true, mensaje: 'pong' });
  });
});


El workflow CI ejecuta los tests automáticamente en cada push o pull request a develop.

🔄 CI/CD – Integración y Despliegue Continuo

Pipeline general:

feature/* → develop → main → Render


CI – Build & Test:

name: CI - Build & Test
on:
  pull_request:
    branches: [ develop, main ]
  push:
    branches: [ develop ]

jobs:
  test-and-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: docker build -t tds-devops-tpintegrador-app .


CD – Deploy automático a Render:

name: CD - Deploy to Render
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: 🚀 Trigger Render Deploy
        run: curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}


Secrets requeridos:

RENDER_DEPLOY_HOOK = https://api.render.com/deploy/srv-xxxx?key=yyyy


Cada push a main dispara automáticamente el despliegue en Render:
👉 https://tds-devops-tpintegrador.onrender.com

🧩 Infraestructura como Código (IaC) – Opcional

La infraestructura del proyecto se modela mediante Terraform en el archivo main.tf ubicado en la raíz del repositorio.

🧱 ¿Qué modela main.tf?

A alto nivel, el main.tf:

Declara el provider (por ejemplo, docker) para gestionar recursos de la app como infraestructura.

Define la imagen de la aplicación (basada en el Dockerfile del proyecto).

Declara uno o más recursos de contenedor para levantar la API inmobiliaria con:

Puertos publicados (interno 3000 → externo 3000).

Variables de entorno como MONGO_URI y PORT.

Esto permite levantar la app como un recurso de infraestructura gestionado por Terraform, manteniendo la configuración declarativa.

🔎 Nota: La carpeta infra/terraform/ queda como espacio de trabajo y extensión para versiones futuras, laboratorios adicionales o variantes de IaC, pero el archivo activo y principal del proyecto es main.tf en la raíz.

▶️ Comandos básicos
# Desde la raíz del proyecto
terraform init
terraform plan
terraform apply -auto-approve

Con esto Terraform:

Lee main.tf.

Crea/actualiza los recursos declarados (por ejemplo, la imagen y el contenedor de la app).

Deja la infraestructura en el estado deseado de forma reproducible.

📊 Monitoreo y métricas

La app expone métricas Prometheus en /metrics, recolectadas con prom-client.
El docker-compose.yml incluye contenedores de Prometheus y Grafana preconfigurados.

prometheus.yml ejemplo:

global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'alquilarte'
    static_configs:
      - targets: ['app:3000']

🔧 Instalación local
# 1. Clonar el repositorio
git clone https://github.com/jorgekalas/TDS-DevOps-TPIntegrador.git
cd TDS-DevOps-TPIntegrador

# 2. Instalar dependencias
npm install

# 3. Configurar entorno
echo "MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/db" > .env
echo "PORT=3000" >> .env

# 4. Ejecutar servidor
npm start

👥 Roles del equipo

Ariana (Backend & Testing Lead):	Diseño de rutas y controladores, armado de Jest + Supertest
Maxi (Docker & Monitoreo):	Dockerfile, docker-compose, Prometheus y Grafana
Jorge (DevOps & CI/CD)	Workflows en GitHub Actions, Deploy Hook Render, integración Mongo Atlas

⚠️ Dificultades enfrentadas

Error 302 en CI: solucionado exponiendo rutas públicas /ping y /personas.

“Dockerfile not found” en Linux runner: se corrigió capitalización.

Push rechazado por Internal Server Error: reintento con --force-with-lease.

Falta de permisos en repo original: se resolvió creando un fork propio.

Conexión Atlas rechazada: se agregó 0.0.0.0/0 a la whitelist.

✅ Conclusión

El proyecto Alquilarte – API Inmobiliaria alcanzó un flujo DevOps completo y automatizado:

CI/CD funcional,

dockerización total,

despliegue continuo en Render,

monitoreo activo y IaC opcional.

El resultado es un sistema escalable, mantenible y demostrativo de un pipeline profesional, integrando todas las etapas del ciclo de vida de software moderno.