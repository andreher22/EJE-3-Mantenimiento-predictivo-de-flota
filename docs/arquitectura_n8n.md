# 🔄 Arquitectura n8n - AutoSafe AI

## Descripción General

El flujo de n8n actúa como el **cerebro operativo** del agente de IA, orquestando la comunicación entre el frontend y el modelo de lenguaje Gemini.

---

## Diagrama del Flujo

```
┌─────────────┐     ┌──────────────────┐     ┌───────────────────┐     ┌─────────────────────┐
│   Webhook   │────▶│  Solicitud HTTP  │────▶│  Code JavaScript  │────▶│  Responder Webhook  │
│   (POST)    │     │  (Gemini API)    │     │  (Procesar)       │     │  (Respuesta)        │
└─────────────┘     └──────────────────┘     └───────────────────┘     └─────────────────────┘
```

---

## Nodos del Workflow

### 1. Webhook
- **Tipo**: Trigger
- **Método**: POST
- **Path**: `riesgo-mecanico`
- **URL Producción**: `http://localhost:5678/webhook/riesgo-mecanico`
- **Responder**: Using 'Respond to Webhook' Node

### 2. Solicitud HTTP
- **Método**: POST
- **URL**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=TU_API_KEY`
- **Body Type**: JSON
- **JSON**:
```json
{
  "contents": [{
    "parts": [{
      "text": "Eres el Agente de AutoSafe AI. INSTRUCCIONES:\n1. Responde BREVE y AMIGABLE (máximo 3-4 oraciones)\n2. Usa lenguaje simple\n3. Máximo 3 puntos clave\n4. Incluye nivel de riesgo: Bajo, Medio o Alto\n\nConsulta: {{ $json.body.mensaje }}"
    }]
  }]
}
```

### 3. Code in JavaScript
```javascript
const respuestaGemini = $input.first().json;

let texto = "No pude procesar la respuesta";
let riesgo = "Bajo";

try {
  texto = respuestaGemini.candidates[0].content.parts[0].text;
  
  if (texto.includes("Alto") || texto.includes("ALTO") || texto.includes("crítico")) {
    riesgo = "Alto";
  } else if (texto.includes("Medio") || texto.includes("MEDIO") || texto.includes("preventiv")) {
    riesgo = "Medio";
  }
} catch (e) {
  texto = "Error procesando la respuesta del agente";
}

return [{
  json: {
    respuesta: texto,
    riesgo: riesgo
  }
}];
```

### 4. Responder a Webhook
- **Respond With**: First Incoming Item
- Devuelve `{ respuesta, riesgo }` al frontend

---

## Configuración

### Requisitos
- Node.js ≥ 18
- n8n instalado globalmente

### Instalación
```bash
npm install n8n -g
n8n
```

### Acceso
```
http://localhost:5678
```

---

## Payload de Entrada

El frontend envía:
```json
{
  "mensaje": "Consulta del usuario",
  "contexto": {
    "vehiculo": "Toyota Corolla 2023",
    "kilometraje": 45000,
    "estadoActual": "ÓPTIMO",
    "nivelRiesgo": "BAJO"
  }
}
```

## Respuesta del Agente

n8n devuelve:
```json
{
  "respuesta": "Texto de la respuesta del agente...",
  "riesgo": "Bajo"
}
```

---

## Activar el Workflow

1. Guardar el workflow (Ctrl+S)
2. Clic en **"Publicar"**
3. Verificar que el interruptor esté verde (activo)
