# 📄 Documento Ejecutivo: Agente IA Riesgo Mecánico TRAXIÓN

**EJE 3 · Mantenimiento Predictivo de Flota: Prevención y Disponibilidad**

---

## 🛑 1. Problema Operativo

El esquema actual de **mantenimiento reactivo** está generando ineficiencias críticas que impactan directamente la misión de la Fundación TRAXIÓN:

*   **Costos elevados**: Incremento del **+60%** en costos operativos por entradas no planeadas al taller.
*   **Baja disponibilidad**: Reducción del **-20%** en la disponibilidad operativa de la flota, afectando la continuidad de los proyectos sociales.
*   **Gestión ineficiente**: Pérdida de control en la planeación de rutas y toma de decisiones reactiva basada en emergencias, no en datos.
*   **Riesgo de seguridad**: Mayor probabilidad de siniestros por fallas mecánicas no detectadas a tiempo.

---

## 🧠 2. Solución y Lógica del Modelo

Implementación de un **Agente de Inteligencia Artificial Conversacional (AutoSafe AI)** que actúa como un analista experto 24/7 para prevenir fallas.

### ¿Cómo se utiliza la IA?
El agente utiliza **Google Gemini (LLM)** orquestado por **n8n** para procesar lenguaje natural y datos técnicos. El conductor o gestor interactúa vía chat, y el modelo analiza el contexto para determinar el riesgo.

### Fórmula de Riesgo
El núcleo del modelo es un sistema de puntuación algorítmico transparente:

$$ \text{Score} = \text{Datos de Unidad} + \text{Uso Reciente} + \text{Condiciones Actuales} $$

*   **Datos de Unidad**: Antigüedad, kilometraje, historial.
*   **Uso Reciente**: Carga, tipo de ruta, intensidad.
*   **Condiciones**: Alertas, ruidos, desgaste visible.

### Semáforo Automático de Decisión
*   🟢 **VERDE (0–24 pts)**: **Operación Normal**. Sin riesgo inminente.
*   🟡 **AMARILLO (25–49 pts)**: **Revisión Programada**. Alerta preventiva.
*   🔴 **ROJO (50+ pts)**: **Intervención Inmediata**. Detener unidad.

---

## 📈 3. Impacto Esperado (6 Meses)

La transición de un modelo reactivo a uno predictivo proyecta los siguientes beneficios clave:

| KPI | Impacto Proyectado | Beneficio Principal |
|-----|-------------------|---------------------|
| **Fallas no previstas** | ⬇️ **-50%** | Continuidad operativa en proyectos sociales |
| **Disponibilidad** | ⬆️ **92% ➝ 97%** | Mayor cobertura de rutas y beneficiarios |
| **Reparaciones emergencia**| ⬇️ **-40%** | Optimización directa del presupuesto |
| **Vida útil componentes** | ⬆️ **+25%** | Reducción de huella ambiental por repuestos |

---

## 🚧 4. Limitaciones y Siguientes Pasos

Aunque el modelo es funcional y de alto valor, reconocemos limitaciones actuales que se abordarán en el plan de evolución.

### Limitaciones Actuales
*   **Dependencia del input**: La precisión depende de la veracidad de los datos ingresados por el humano.
*   **Reglas Estáticas**: El modelo actual usa lógica determinista, aún no aprende automáticamente (Machine Learning).
*   **Falta de Telemetría**: Evaluación basada en reporte, no en sensores en tiempo real.

### Roadmap de Evolución
1.  **Fase 1 (Mes 1) - Piloto**: Despliegue con 10 unidades clave para calibración.
2.  **Fase 2 (Mes 3) - Integración**: Conexión con sistemas de telemetría para datos automáticos.
3.  **Fase 3 (Mes 6) - Dashboard**: Visualización centralizada de KPIs de flota en tiempo real.
4.  **Fase 4 (Mes 12) - Machine Learning**: Entrenamiento de modelos predictivos avanzados por tipo de unidad.
