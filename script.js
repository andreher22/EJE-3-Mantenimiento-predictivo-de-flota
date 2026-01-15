/**
 * AutoSafe AI - Sistema de Diagnóstico Vehicular
 * Script principal con lógica de diagnóstico y generación de PDF
 */

// ============================================
// Configuración y Datos
// ============================================

const vehicleBrands = {
    toyota: "Toyota",
    honda: "Honda",
    ford: "Ford",
    chevrolet: "Chevrolet",
    nissan: "Nissan",
    volkswagen: "Volkswagen",
    bmw: "BMW",
    mercedes: "Mercedes-Benz",
    audi: "Audi",
    hyundai: "Hyundai",
    otra: "Otra"
};

const stateTexts = {
    engine: ['', 'Óptimo', 'Muy Bueno', 'Bueno', 'Atención', 'Regular', 'Deficiente', 'Malo', 'Muy Malo', 'Crítico', 'Muy Crítico'],
    brakes: ['', 'Nuevo', 'Muy Bueno', 'Bueno', 'Atención', 'Regular', 'Desgastado', 'Muy Desgastado', 'Peligroso', 'Muy Peligroso', 'Crítico'],
    tires: ['', 'Nuevo', 'Muy Bueno', 'Bueno', 'Atención', 'Regular', 'Desgastado', 'Muy Desgastado', 'Peligroso', 'Muy Peligroso', 'Crítico']
};

// Variable global para almacenar el diagnóstico actual
let currentDiagnosis = null;

// ============================================
// Inicialización
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeSliders();
    initializeForm();
    initializePdfButton();
    setMaxYear();
});

function setMaxYear() {
    const yearInput = document.getElementById('vehicle-year');
    const currentYear = new Date().getFullYear();
    yearInput.max = currentYear;
    yearInput.value = currentYear - 3;
}

// ============================================
// Sliders
// ============================================

function initializeSliders() {
    // Slider de mantenimiento
    const maintenanceSlider = document.getElementById('maintenance-slider');
    maintenanceSlider.addEventListener('input', function () {
        const value = parseInt(this.value);
        document.getElementById('maintenance-value').textContent =
            value + (value === 1 ? ' mes' : ' meses');
    });

    // Slider de motor
    const engineSlider = document.getElementById('engine-slider');
    engineSlider.addEventListener('input', function () {
        const value = parseInt(this.value);
        document.getElementById('engine-value').textContent = stateTexts.engine[value];
    });

    // Slider de frenos
    const brakesSlider = document.getElementById('brakes-slider');
    brakesSlider.addEventListener('input', function () {
        const value = parseInt(this.value);
        document.getElementById('brakes-value').textContent = stateTexts.brakes[value];
    });

    // Slider de neumáticos
    const tiresSlider = document.getElementById('tires-slider');
    tiresSlider.addEventListener('input', function () {
        const value = parseInt(this.value);
        document.getElementById('tires-value').textContent = stateTexts.tires[value];
    });

    // Disparar eventos iniciales
    maintenanceSlider.dispatchEvent(new Event('input'));
    engineSlider.dispatchEvent(new Event('input'));
    brakesSlider.dispatchEvent(new Event('input'));
    tiresSlider.dispatchEvent(new Event('input'));
}

// ============================================
// Formulario
// ============================================

function initializeForm() {
    const form = document.getElementById('diagnostic-form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        performDiagnosis();
    });
}

function getFormData() {
    return {
        brand: document.getElementById('vehicle-brand').value,
        model: document.getElementById('vehicle-model').value,
        year: parseInt(document.getElementById('vehicle-year').value),
        mileage: parseInt(document.getElementById('vehicle-mileage').value),
        owner: document.getElementById('owner-name').value,
        plate: document.getElementById('vehicle-plate').value,
        maintenanceMonths: parseInt(document.getElementById('maintenance-slider').value),
        engineState: parseInt(document.getElementById('engine-slider').value),
        brakesState: parseInt(document.getElementById('brakes-slider').value),
        tiresState: parseInt(document.getElementById('tires-slider').value),
        notes: document.getElementById('additional-notes').value
    };
}

// ============================================
// Lógica de Diagnóstico
// ============================================

function calculateRiskScore(data) {
    let riskScore = 0;
    const currentYear = new Date().getFullYear();
    const vehicleAge = currentYear - data.year;

    // Edad del vehículo (hasta 20 puntos)
    riskScore += Math.min(20, (vehicleAge / 20) * 20);

    // Kilometraje (hasta 25 puntos)
    riskScore += Math.min(25, (data.mileage / 300000) * 25);

    // Tiempo desde último mantenimiento (hasta 25 puntos)
    riskScore += (data.maintenanceMonths / 24) * 25;

    // Estado del motor (hasta 15 puntos)
    riskScore += ((data.engineState - 1) / 9) * 15;

    // Estado de frenos (hasta 10 puntos)
    riskScore += ((data.brakesState - 1) / 9) * 10;

    // Estado de neumáticos (hasta 5 puntos)
    riskScore += ((data.tiresState - 1) / 9) * 5;

    return { riskScore, vehicleAge };
}

function determineStatus(riskScore) {
    if (riskScore <= 30) {
        return {
            status: 'ÓPTIMO',
            statusText: 'El vehículo se encuentra en excelente estado',
            statusColor: '#10b981',
            activeLight: 'green',
            riskLevel: 'BAJO'
        };
    } else if (riskScore <= 70) {
        return {
            status: 'ATENCIÓN',
            statusText: 'El vehículo requiere revisión preventiva',
            statusColor: '#f59e0b',
            activeLight: 'yellow',
            riskLevel: 'MEDIO'
        };
    } else {
        return {
            status: 'RIESGO',
            statusText: 'El vehículo necesita mantenimiento inmediato',
            statusColor: '#ef4444',
            activeLight: 'red',
            riskLevel: 'ALTO'
        };
    }
}

function performDiagnosis() {
    const data = getFormData();

    // Validar datos requeridos
    if (!data.brand || !data.model || !data.owner || !data.plate) {
        alert("Por favor completa todos los campos requeridos.");
        return;
    }

    // Calcular riesgo
    const { riskScore, vehicleAge } = calculateRiskScore(data);
    const statusInfo = determineStatus(riskScore);

    // Guardar diagnóstico actual
    currentDiagnosis = {
        ...data,
        brandName: vehicleBrands[data.brand] || data.brand,
        vehicleAge,
        riskScore,
        ...statusInfo,
        date: new Date().toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };

    // Actualizar UI
    updateTrafficLight(statusInfo.activeLight);
    updateStatusBadge(statusInfo.status, statusInfo.statusColor);
    updateVehicleSummary(currentDiagnosis);
    generateRecommendations(currentDiagnosis);
    showResults();

    // Scroll a resultados
    document.getElementById('result-card').scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// Actualización de UI
// ============================================

function updateTrafficLight(activeLight) {
    // Remover clase active de todas las luces
    document.getElementById('red-light').classList.remove('active');
    document.getElementById('yellow-light').classList.remove('active');
    document.getElementById('green-light').classList.remove('active');

    // Activar la luz correspondiente
    document.getElementById(`${activeLight}-light`).classList.add('active');
}

function updateStatusBadge(status, color) {
    const statusText = document.getElementById('status-text');
    statusText.textContent = `ESTADO: ${status}`;
    statusText.style.color = color;
}

function updateVehicleSummary(diagnosis) {
    document.getElementById('summary-vehicle').textContent =
        `${diagnosis.brandName} ${diagnosis.model} ${diagnosis.year}`;
    document.getElementById('summary-owner').textContent = diagnosis.owner;
    document.getElementById('summary-mileage').textContent =
        diagnosis.mileage.toLocaleString() + ' km';
    document.getElementById('summary-age').textContent =
        diagnosis.vehicleAge + (diagnosis.vehicleAge === 1 ? ' año' : ' años');

    const riskElement = document.getElementById('summary-risk');
    riskElement.textContent = diagnosis.riskLevel;
    riskElement.style.color = diagnosis.statusColor;
}

function generateRecommendations(diagnosis) {
    const container = document.getElementById('recommendations-content');
    let html = '';

    if (diagnosis.activeLight === 'green') {
        html = `
            <div class="recommendation-item">
                <div class="recommendation-icon">
                    <i class="fas fa-check-circle" style="color: #10b981;"></i>
                </div>
                <div class="recommendation-text">
                    <p><strong>Estado óptimo:</strong> Tu vehículo está en excelentes condiciones. No se requiere acción inmediata.</p>
                </div>
            </div>
            <div class="recommendation-item">
                <div class="recommendation-icon">
                    <i class="fas fa-calendar-check" style="color: #1e40af;"></i>
                </div>
                <div class="recommendation-text">
                    <p><strong>Próximo mantenimiento:</strong> Recomendado en ${Math.max(1, 12 - diagnosis.maintenanceMonths)} meses.</p>
                </div>
            </div>
            <div class="recommendation-item">
                <div class="recommendation-icon">
                    <i class="fas fa-clipboard-list" style="color: #64748b;"></i>
                </div>
                <div class="recommendation-text">
                    <p><strong>Monitoreo:</strong> Continúa con las revisiones periódicas según el manual del fabricante.</p>
                </div>
            </div>
        `;
    } else if (diagnosis.activeLight === 'yellow') {
        const criticalComponent = diagnosis.brakesState > 5 ? 'sistema de frenos' :
            diagnosis.engineState > 5 ? 'motor' :
                diagnosis.tiresState > 5 ? 'neumáticos' : 'componentes generales';
        html = `
            <div class="recommendation-item">
                <div class="recommendation-icon">
                    <i class="fas fa-exclamation-triangle" style="color: #f59e0b;"></i>
                </div>
                <div class="recommendation-text">
                    <p><strong>Revisión preventiva:</strong> Se recomienda llevar el vehículo a revisión en los próximos 15 días.</p>
                </div>
            </div>
            <div class="recommendation-item">
                <div class="recommendation-icon">
                    <i class="fas fa-tools" style="color: #1e40af;"></i>
                </div>
                <div class="recommendation-text">
                    <p><strong>Atención prioritaria:</strong> Verificar especialmente el ${criticalComponent}.</p>
                </div>
            </div>
            <div class="recommendation-item">
                <div class="recommendation-icon">
                    <i class="fas fa-route" style="color: #ef4444;"></i>
                </div>
                <div class="recommendation-text">
                    <p><strong>Precaución:</strong> Evitar viajes largos hasta completar la revisión preventiva.</p>
                </div>
            </div>
        `;
    } else {
        const criticalComponent = diagnosis.engineState > 7 ? 'motor' :
            diagnosis.brakesState > 7 ? 'frenos' : 'componentes críticos';
        html = `
            <div class="recommendation-item">
                <div class="recommendation-icon">
                    <i class="fas fa-skull-crossbones" style="color: #ef4444;"></i>
                </div>
                <div class="recommendation-text">
                    <p><strong>¡MANTENIMIENTO INMEDIATO!</strong> No utilizar el vehículo hasta realizar reparaciones.</p>
                </div>
            </div>
            <div class="recommendation-item">
                <div class="recommendation-icon">
                    <i class="fas fa-ambulance" style="color: #ef4444;"></i>
                </div>
                <div class="recommendation-text">
                    <p><strong>Taller especializado:</strong> Llevar inmediatamente. Problemas detectados en: ${criticalComponent}.</p>
                </div>
            </div>
            <div class="recommendation-item">
                <div class="recommendation-icon">
                    <i class="fas fa-phone-alt" style="color: #1e40af;"></i>
                </div>
                <div class="recommendation-text">
                    <p><strong>Asistencia:</strong> Si presenta fallos, contactar servicio de grúa para traslado seguro.</p>
                </div>
            </div>
        `;
    }

    // Agregar notas del propietario si existen
    if (diagnosis.notes && diagnosis.notes.trim()) {
        html += `
            <div class="recommendation-item">
                <div class="recommendation-icon">
                    <i class="fas fa-sticky-note" style="color: #8b5cf6;"></i>
                </div>
                <div class="recommendation-text">
                    <p><strong>Nota del propietario:</strong> ${diagnosis.notes}</p>
                </div>
            </div>
        `;
    }

    container.innerHTML = html;
}

function showResults() {
    // Ocultar placeholder
    document.getElementById('placeholder-text').classList.add('hidden');

    // Mostrar elementos de resultado
    document.getElementById('traffic-light-wrapper').classList.remove('hidden');
    document.getElementById('vehicle-summary').classList.remove('hidden');
    document.getElementById('recommendations-card').classList.remove('hidden');
    document.getElementById('pdf-card').classList.remove('hidden');
}

// ============================================
// Generación de PDF
// ============================================

function initializePdfButton() {
    document.getElementById('download-pdf-btn').addEventListener('click', generatePDF);
}

function generatePDF() {
    if (!currentDiagnosis) {
        alert("Primero debes realizar un diagnóstico.");
        return;
    }

    // Crear contenedor temporal para el PDF
    const pdfContent = document.createElement('div');
    pdfContent.style.cssText = `
        padding: 40px;
        background: white;
        font-family: Arial, sans-serif;
        max-width: 800px;
        margin: 0 auto;
        color: #333;
    `;

    pdfContent.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 3px solid #1e40af; padding-bottom: 20px;">
            <h1 style="color: #1e40af; margin: 0 0 10px 0; font-size: 28px;">
                🚗 AutoSafe AI
            </h1>
            <h2 style="color: #333; font-size: 20px; margin: 0 0 10px 0;">
                Diagnóstico de Mantenimiento Vehicular
            </h2>
            <p style="color: #666; font-size: 14px; margin: 0;">
                Fecha: ${currentDiagnosis.date}
            </p>
        </div>

        <div style="display: flex; gap: 30px; margin-bottom: 30px; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 250px;">
                <h3 style="color: #1e40af; font-size: 16px; border-bottom: 1px solid #eee; padding-bottom: 8px;">
                    Datos del Vehículo
                </h3>
                <p><strong>Vehículo:</strong> ${currentDiagnosis.brandName} ${currentDiagnosis.model} ${currentDiagnosis.year}</p>
                <p><strong>Propietario:</strong> ${currentDiagnosis.owner}</p>
                <p><strong>Placas:</strong> ${currentDiagnosis.plate}</p>
                <p><strong>Kilometraje:</strong> ${currentDiagnosis.mileage.toLocaleString()} km</p>
                <p><strong>Antigüedad:</strong> ${currentDiagnosis.vehicleAge} años</p>
            </div>
            <div style="flex: 1; min-width: 250px;">
                <h3 style="color: #1e40af; font-size: 16px; border-bottom: 1px solid #eee; padding-bottom: 8px;">
                    Estado Actual
                </h3>
                <p><strong>Último mantenimiento:</strong> Hace ${currentDiagnosis.maintenanceMonths} meses</p>
                <p><strong>Motor:</strong> ${stateTexts.engine[currentDiagnosis.engineState]}</p>
                <p><strong>Frenos:</strong> ${stateTexts.brakes[currentDiagnosis.brakesState]}</p>
                <p><strong>Neumáticos:</strong> ${stateTexts.tires[currentDiagnosis.tiresState]}</p>
            </div>
        </div>

        <div style="text-align: center; margin: 30px 0; padding: 25px; background: #f8fafc; border-radius: 10px;">
            <h3 style="color: #1e40af; margin-bottom: 15px;">Resultado del Diagnóstico</h3>
            <div style="font-size: 48px; margin: 15px 0;">
                ${currentDiagnosis.activeLight === 'green' ? '🟢' : currentDiagnosis.activeLight === 'yellow' ? '🟡' : '🔴'}
            </div>
            <h2 style="color: ${currentDiagnosis.statusColor}; margin: 10px 0; font-size: 24px;">
                ESTADO: ${currentDiagnosis.status}
            </h2>
            <p style="color: #666; margin: 0;">${currentDiagnosis.statusText}</p>
            <p style="margin-top: 10px;"><strong>Nivel de Riesgo:</strong> 
                <span style="color: ${currentDiagnosis.statusColor}; font-weight: bold;">${currentDiagnosis.riskLevel}</span>
            </p>
        </div>

        <div style="margin-top: 30px;">
            <h3 style="color: #1e40af; font-size: 16px; border-bottom: 1px solid #eee; padding-bottom: 8px;">
                Recomendaciones
            </h3>
            ${document.getElementById('recommendations-content').innerHTML}
        </div>

        ${currentDiagnosis.notes ? `
            <div style="margin-top: 25px; padding: 15px; background: #f0f9ff; border-radius: 8px; border-left: 4px solid #06b6d4;">
                <h4 style="color: #06b6d4; margin: 0 0 8px 0;">Notas del Propietario</h4>
                <p style="margin: 0; color: #333;">${currentDiagnosis.notes}</p>
            </div>
        ` : ''}

        <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px;">
            <p>Este diagnóstico fue generado por AutoSafe AI</p>
            <p>ID: ${Date.now().toString(36).toUpperCase()}</p>
        </div>
    `;

    // Generar PDF
    html2canvas(pdfContent, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
        const imgWidth = 190;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        pdf.save(`Diagnostico_${currentDiagnosis.brandName}_${currentDiagnosis.model}_${currentDiagnosis.plate}.pdf`);

        alert("✅ PDF generado exitosamente!");
    }).catch(error => {
        console.error("Error generando PDF:", error);
        alert("Error al generar el PDF. Intenta de nuevo.");
    });
}
