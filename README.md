

graph TD
    %% --- NIVEL ESTRATÉGICO ---
    subgraph Estrategia ["🧠 LIDERAZGO Y ESTRATEGIA GLOBAL"]
        AndreaPM[/"👩‍💼 **Andrea Robles Hernández**<br/>Product Manager & Arquitecta de Software"<br/>*(Visión, Priorización, Diseño de Arquitectura)*\]
        style AndreaPM fill:#fff3e0,stroke:#ffb74d,stroke-width:3px
    end

    %% Conectores a los pilares operativos
    AndreaPM -.-> DesignPillar
    AndreaPM ===> DevPillar
    AndreaPM -.-> QAPillar

    %% --- NIVEL OPERATIVO (PILARES) ---
    subgraph Operaciones ["⚙️ ÁREAS DE EJECUCIÓN OPERATIVA"]
        
        %% PILAR 1: DISEÑO
        subgraph DesignPillar ["🎨 DISEÑO DE EXPERIENCIA (UX/UI)"]
            Itzel["👤 **Itzel Galván Contreras**<br/>Diseñadora UX/UI<br/>*(Responsable de Wireframes, Estilos visuales y Usabilidad)*"]
            style Itzel fill:#e1f5fe,stroke:#0288d1,stroke-width:2px
        end

        %% PILAR 2: DESARROLLO
        subgraph DevPillar ["💻 DESARROLLO E IMPLEMENTACIÓN"]
            AndreaDev["👩‍💻 **Andrea Robles H.**<br/>Desarrolladora Backend / IA<br/>*(Liderazgo Técnico, Lógica Django, Módulo IA)*"]
            style AndreaDev fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
            
            JuanDev["👨‍💻 **Juan Pablo González A.**<br/>Desarrollador Full Stack<br/>*(Frontend principal, Integración y Servidor)*"]
            style JuanDev fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
            
            %% Relación de colaboración en desarrollo
            AndreaDev <-->|Colaboración Técnica| JuanDev
        end

        %% PILAR 3: CALIDAD Y DOCS
        subgraph QAPillar ["📝 CALIDAD, PRUEBAS Y DOCUMENTACIÓN"]
            Jeronimo["👨‍🔧 **Jerónimo Israel Macías Q.**<br/>Tester & Documentador<br/>*(Pruebas de usabilidad, Reporte de errores, Manuales de usuario)*"]
            style Jeronimo fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px

            JuanDoc["👨‍💻 **Juan Pablo González A.**<br/>Apoyo Técnico<br/>*(Documentación técnica y funcional)*"]
            style JuanDoc fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px

            AndreaQA["👩‍💼 **Andrea Robles H.**<br/>Supervisión QA<br/>*(Validación final y cumplimiento de requisitos)*"]
            style AndreaQA fill:#f3e5f5,stroke:#7b1fa2,stroke-dasharray: 5 5
            
            %% Flujo de trabajo en QA
            Jeronimo -->|Reportes y Manuales| AndreaQA
            JuanDoc -->|Docs Técnicos| AndreaQA
        end
    end

    %% Estilos de enlace
    linkStyle 1 stroke-width:4px,fill:none,stroke:#2e7d32;







































# 🚗 AutoSafe AI - Sistema de Diagnóstico Vehicular con IA

Sistema de diagnóstico de mantenimiento vehicular con **Agente de IA Conversacional** orquestado mediante n8n e integrado con Google Gemini.

![AutoSafe AI](https://img.shields.io/badge/AutoSafe-AI-blue)
![n8n](https://img.shields.io/badge/n8n-Orquestación-orange)
![Gemini](https://img.shields.io/badge/Google-Gemini-green)

---

## 🎯 Características

- ✅ **Diagnóstico visual** con semáforo de riesgo (Verde/Amarillo/Rojo)
- ✅ **Agente IA conversacional** en chat flotante
- ✅ **Generación de PDF** con reporte de diagnóstico
- ✅ **Orquestación con n8n** (arquitectura profesional)
- ✅ **100% gratuito** (n8n local + Gemini Free Tier)

---

## 🛠️ Tecnologías

| Componente | Tecnología |
|------------|------------|
| Frontend | HTML5, CSS3, JavaScript |
| Agente IA | Google Gemini 2.5 Flash |
| Orquestación | n8n (Self-hosted) |
| PDF | jsPDF + html2canvas |

---

## 📁 Estructura del Proyecto

```
├── index.html          # Página principal
├── styles.css          # Estilos y diseño
├── script.js           # Lógica de diagnóstico y chat
├── README.md           # Este archivo
└── docs/
    ├── agente_ia.md       # Documentación del agente
    └── arquitectura_n8n.md # Arquitectura del workflow
```

---

## 🚀 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/andreher22/EJE-3-Mantenimiento-predictivo-de-flota.git
cd EJE-3-Mantenimiento-predictivo-de-flota
```

### 2. Instalar n8n
```bash
npm install n8n -g
```

### 3. Ejecutar n8n
```bash
n8n
```

### 4. Configurar el Workflow
1. Abre `http://localhost:5678`
2. Crea un nuevo workflow con 4 nodos:
   - **Webhook** (path: `riesgo-mecanico`)
   - **HTTP Request** (Gemini API)
   - **Code** (procesar respuesta)
   - **Respond to Webhook**
3. Consulta [docs/arquitectura_n8n.md](docs/arquitectura_n8n.md) para la configuración detallada

### 5. Abrir la aplicación
- Abre `index.html` en tu navegador

---

## 💬 Uso del Agente IA

1. Haz clic en la **burbuja del robot** 🤖 (esquina inferior derecha)
2. Escribe tu consulta, por ejemplo:
   - *"Mi auto tiene 100,000 km, ¿necesita revisión?"*
   - *"¿Cada cuánto cambio el aceite?"*
3. El agente responderá con análisis y nivel de riesgo

---

## 📊 Semáforo de Riesgo

| Color | Estado | Significado |
|-------|--------|-------------|
| 🟢 | ÓPTIMO | Vehículo en excelente estado |
| 🟡 | ATENCIÓN | Requiere revisión preventiva |
| 🔴 | RIESGO | Mantenimiento inmediato necesario |

---

## 🔑 API Key de Gemini

1. Ve a [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Crea una API Key
3. Agrégala en el nodo HTTP Request de n8n

---

## 📄 Documentación

- [Agente de IA](docs/agente_ia.md)
- [Arquitectura n8n](docs/arquitectura_n8n.md)
- [Documento Ejecutivo](docs/documento_ejecutivo.md)

---

## 🏆 Frase Clave

> "El proyecto implementa un **agente de IA conversacional orquestado con n8n** en modalidad local, integrando un modelo de lenguaje (Gemini) y una interfaz web con chat flotante para la **evaluación de riesgo mecánico vehicular**."

---

## 👨‍💻 Autor

Desarrollado para evaluación académica - 2026

---

## 📝 Licencia

MIT License
