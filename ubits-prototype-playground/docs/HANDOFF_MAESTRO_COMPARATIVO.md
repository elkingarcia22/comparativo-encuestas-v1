# Plantilla Maestra de Handoff: Comparativo de Encuestas UBITS

Este documento es el activo definitivo de entrega (Handoff) que integra la visión de Diseño, Producto y Desarrollo.

---

## 1. Resumen Ejecutivo
El **Comparativo de Encuestas** es una herramienta analítica avanzada que permite a los administradores de Talento Humano contrastar resultados de múltiples procesos de medición (2 a 5 encuestas) en una sola interfaz. Automatiza el cálculo de variaciones (deltas) y proporciona insights generados por IA.

## 2. Contexto Funcional
Actualmente, los administradores deben descargar múltiples Excels para comparar resultados. Este módulo centraliza esa labor, permitiendo ver la evolución de la Favorabilidad, Participación y NPS a través del tiempo o entre diferentes unidades de negocio.

## 3. Alcance / No Alcance
- **Alcance**:
  - Comparación de encuestas del mismo tipo (Clima con Clima, etc.).
  - Selección de una encuesta "Base" como ancla.
  - Filtrado demográfico dinámico (Líder, Área, Rol, etc.).
  - Análisis de comentarios con IA y descarga de reportes.
- **No Alcance**:
  - Comparar encuestas de tipos distintos (ej. Clima vs NPS).
  - Comparar más de 5 encuestas simultáneamente.

## 4. Flujo End-to-End
1. **Configuración**: El usuario entra al Wizard, elige el tipo de encuesta y selecciona entre 2 y 5 procesos. Define la "Base".
2. **Visualización**: Se genera el Dashboard Comparativo con KPIs agregados.
3. **Exploración**: El usuario aplica filtros (ej: filtrar por un Líder específico).
4. **Profundización**: Clic en dimensiones para abrir el Drawer de Comentarios e IA.
5. **Salida**: El usuario descarga el reporte o comparte el enlace filtrado.

## 5. Prototipo Funcional como Fuente de Verdad
La implementación actual en la carpeta `/src/` del repositorio sirve como especificación técnica viva.
- **Pantalla de Inicio**: `EncuestasDashboard.tsx` (Wizard).
- **Dashboard Principal**: `ComparativeDashboard.tsx`.
- **Componentes**: `DeltaPill`, `Heatmap`, `AILoader`.

## 6. Reglas de Negocio
- **Cálculo de Delta**: $\Delta = \text{Valor Encuesta X} - \text{Valor Base}$.
- **Umbral de Privacidad**: El umbral de anonimato es **configurable por el usuario** (3, 5, 10, etc.). Si $n < \text{Umbral}$, el dato se protege con un icono de candado 🔒.
- **Consistencia de Tipo**: Solo se habilitan encuestas del mismo tipo para selección múltiple.

## 7. Comportamiento UI por Componente (Tooltips y Toasts)
- **Delta Pill**:
  - Hover Verde: *"Mejora significativa respecto a la encuesta base."*
  - Hover Rojo: *"Retroceso respecto a la encuesta base."*
- **KPI Cards**: Hover (i) explica la metodología de cálculo (Favorabilidad, Participación, NPS).
- **Toasts**:
  - Éxito Compartir: *"Enlace copiado al portapapeles."*
  - Éxito Descarga: *"La descarga del reporte ha iniciado."*
  - Error: *"Ocurrió un error al procesar la solicitud. Por favor, intenta de nuevo."*

## 8. Rutas de Usuario
- **Ruta Feliz**: Wizard > Selección exitosa > Visualización de Dashboard.
- **Ruta de Datos Vacíos (Escenario Juan Pérez)**: Aplicar filtro restrictivo > Ver estados "Sin respuestas" con tooltip: *"No se encontraron registros para este segmento en este proceso."*

## 9. Historias de Usuario Candidatas
- **HU1**: "Como Admin, quiero elegir una encuesta base para que todos los cálculos de mejora o retroceso se realicen contra ella."
- **HU2**: "Como Admin, quiero filtrar por Área para comparar el desempeño de diferentes departamentos en el tiempo."

## 10. Criterios de Aceptación
- El sistema debe impedir la selección de menos de 2 o más de 5 encuestas.
- El cálculo del delta debe ser exacto hasta el primer decimal.
- Los iconos de candado deben activarse inmediatamente si los filtros bajan el volumen de datos por debajo del umbral.

## 11. Insumos Técnicos para Desarrollo
- **Stack**: React, TypeScript, Lucide Icons.
- **Endpoints Requeridos**: GetSurveyResults, GetComparativeData, PostGenerateReport.
- **Variables de Estado**: `selectedSurveys`, `baseSurveyId`, `activeFilters`.

## 12. Edge Cases y Errores
- **Inconsistencia de Datos**: Si una encuesta no tiene una dimensión que la Base sí tiene, mostrar **"N/A"** con hover: *"Esta dimensión no fue evaluada en esta encuesta específica."*
- **Fallo de Red**: Toast: *"Error de conexión. No pudimos recuperar la información del comparativo."*

## 13. Analítica
- Tracking de clics en "Compartir", descargas de PDF/Excel y uso de filtros demográficos.

## 14. QA Checklist
- [ ] ¿El icono de candado respeta el umbral dinámico configurado?
- [ ] ¿Se ocultan los cards de NPS en encuestas de tipo Cultura?
- [ ] ¿El tooltip de "Sin respuestas" aparece en el hover de estados vacíos?

## 15. Riesgos y Decisiones Abiertas
- **Riesgo**: Tiempo de respuesta de IA con altos volúmenes de datos.
- **Decisión**: Uso de `AILoader` para feedback visual inmediato.

## 16. Aprobaciones Finales
- [ ] Product Manager
- [ ] Tech Lead
- [ ] QA Lead
