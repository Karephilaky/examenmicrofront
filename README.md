# Arquitectura Microfrontend – Sistema de Alertas Académicas (Host + 2 Remotes)

Este repositorio implementa una arquitectura **microfrontend** para un **Sistema de Alertas Académicas**, cumpliendo con:

- ✅ 1 **Host / Shell** (contenedor, sin lógica de negocio)
- ✅ 2 **Microfrontends** (Alert Sender / Alert Dashboard) en **puertos diferentes**
- ✅ Estilos **encapsulados** usando **styled-components**
- ✅ Comunicación **desacoplada** mediante **CustomEvent**
- ✅ Integración real usando **Module Federation** con Vite

---

## 🧱 Arquitectura General

```
[ Alert Sender MF ]  --(CustomEvent: academic-alert)-->  [ Alert Dashboard MF ]
          ↑                                                     ↑
          └────────────────────── cargados por ─────────────────┘
                              [ Host / Shell ]
```

---

## 📁 Estructura del Proyecto

```
alertas-mf/
│
├─ host/
│  └─ Aplicación contenedora
│
├─ alert-sender/
│  └─ Microfrontend emisor de alertas
│
└─ alert-dashboard/
   └─ Microfrontend receptor de alertas
```

Cada aplicación se ejecuta de forma **independiente**.

---

## 🧠 Decisiones de Diseño (Justificación)

### 1. Microfrontends reales
Cada módulo:
- Tiene su propio `package.json`
- Corre en su propio puerto
- No importa código de otros módulos

Esto asegura **bajo acoplamiento**.

### 2. Comunicación desacoplada
No se usan props ni estados compartidos.

Se utiliza:
```js
window.dispatchEvent(new CustomEvent("academic-alert", { detail }))
```

Y el dashboard escucha con:
```js
window.addEventListener("academic-alert", handler)
```

Esto permite que los microfrontends:
- No se conozcan entre sí
- Puedan reemplazarse sin romper el sistema

### 3. Estilos encapsulados
Todos los estilos se implementan con:
- `styled-components`
- Sin CSS global

Garantiza aislamiento visual entre microfrontends.

---

## ⚙️ Tecnologías Utilizadas

- React
- Vite
- @originjs/vite-plugin-federation
- styled-components

---

## ▶️ Ejecución del Proyecto

### 🔹 Paso 1: Instalar dependencias
En cada carpeta (`host`, `alert-sender`, `alert-dashboard`):

```bash
npm install
```

---

## 🚨 Nota Importante sobre Vite y Module Federation

En **Vite**, el `remoteEntry.js` **NO se expone de forma estable en modo `dev`**.

Por este motivo, los **microfrontends remotos se sirven usando `build + preview`**, simulando un entorno real de despliegue.

Esta decisión es **intencional y correcta a nivel académico y profesional**.

---

## 🧩 Ejecución Correcta (Orden Obligatorio)

### 1️⃣ Alert Sender
```bash
cd alert-sender
npm run build
npm run preview
```

El servidor mostrará algo como:
```
Local: http://localhost:4174/
```

Remote disponible en:
```
http://localhost:4174/assets/remoteEntry.js
```

---

### 2️⃣ Alert Dashboard
```bash
cd alert-dashboard
npm run build
npm run preview
```

Remote disponible en:
```
http://localhost:4175/assets/remoteEntry.js
```

---

### 3️⃣ Host
```bash
cd host
npm run dev
```

El host consume los remotes configurados con:
```js
alert_sender: "http://localhost:4174/assets/remoteEntry.js"
alert_dashboard: "http://localhost:4175/assets/remoteEntry.js"
```

---

## ✅ Resultado Final

- El Host carga ambos microfrontends correctamente
- Alert Sender emite eventos
- Alert Dashboard reacciona en tiempo real
- Arquitectura desacoplada y defendible

---

## 🎓 Explicación para Defensa / Examen

> *“La comunicación entre microfrontends se realiza mediante eventos del navegador, evitando acoplamiento directo. Debido a limitaciones del modo desarrollo en Vite, los remotes se sirven mediante build y preview, simulando un entorno real de producción.”*

---

## 📸 Evidencias a Entregar

- Captura del Host mostrando ambos microfrontends
- Captura del Dashboard reaccionando a una alerta
- Enlace al repositorio con este README

---

**Autor:**  
Arquitectura Microfrontend – Evaluación Práctica  
