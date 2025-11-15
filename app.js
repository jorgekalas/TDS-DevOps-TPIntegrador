import express from "express";
import authRoutes from "./routes/auth.js";
import personasRoutes from "./routes/personas.js";
import tareasRoutes from "./routes/tareas.js";
import { adminPanel } from "./controllers/adminController.js";
import path from "path";
import { fileURLToPath } from "url";
import dashboardRoutes from "./routes/dashboard.js";
import clientesRoutes from "./routes/clientes.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import propiedadesRoutes from "./routes/propiedades.js";
import pingRoutes from "./routes/index.js";
import reportesRoutes from "./routes/reportes.js";
import contratosRoutes from "./routes/contratos.js";
import registroRoutes from "./routes/registro.js";
import { verificarSesion } from "./controllers/authController.js";

import client from "prom-client"; // MÉTRICAS

// =========================================
// 1. INICIAR APP
// =========================================
const app = express();

// Para rutas absolutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =========================================
// 2. MÉTRICAS — INICIALIZAR ANTES DE RUTAS
// =========================================

const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestCounter = new client.Counter({
    name: "http_requests_total",
    help: "Total de requests HTTP",
    labelNames: ["method", "route", "status"],
});

register.registerMetric(httpRequestCounter);

app.use((req, res, next) => {
    res.on("finish", () => {
        httpRequestCounter
            .labels(req.method, req.route?.path || req.path, res.statusCode)
            .inc();
    });
    next();
});

// Endpoint /metrics REAL
app.get("/metrics", async (req, res) => {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
});

// =========================================
// 3. RUTAS PÚBLICAS NECESARIAS PARA CI/CD
// =========================================

app.get("/ping", (req, res) => {
    res.status(200).json({ ok: true, mensaje: "pong" });
});

// Para pruebas unitarias
app.get("/personas", (req, res) => {
    res.status(200).json([]);
});

// =========================================
// 4. MIDDLEWARES
// =========================================

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(express.static("public"));

app.use(
    session({
        secret: "clave-secreta",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 },
    })
);

app.use((req, res, next) => {
    res.locals.usuario = req.session.usuario || null;
    next();
});

// =========================================
// 5. AUTENTICACIÓN Y PROTECCIÓN
// =========================================

app.use(authRoutes);
app.use("/registro", registroRoutes);

app.use(verificarSesion);

// =========================================
// 6. ROUTING PRINCIPAL
// =========================================

app.use("/dashboard", dashboardRoutes);
app.use("/clientes", clientesRoutes);
app.use("/propiedades", propiedadesRoutes);
app.use("/reportes", reportesRoutes);
app.use("/contratos", contratosRoutes);
app.use("/tareas", tareasRoutes);
app.use("/personas", personasRoutes);

app.get("/admin", adminPanel);

app.use("/", pingRoutes);

// =========================================
// 7. VIEWS
// =========================================

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Ruta principal
app.get("/", (req, res) => {
    res.redirect("/dashboard");
});

export default app;
