# Plantilla Maestra de Handoff: Comparativo de Encuestas UBITS

Este documento es el activo definitivo de entrega (Handoff) que integra la visión de Diseño, Producto y Desarrollo. Es la evolución final del manual técnico y funcional.

---

## 1. Resumen Ejecutivo
El **Comparativo de Encuestas** es una herramienta analítica avanzada que permite a los administradores de Talento Humano contrastar resultados de múltiples procesos de medición (2 a 5 encuestas) en una sola interfaz. Automatiza el cálculo de variaciones (deltas) y proporciona insights generados por IA.

## 2. Contexto Funcional
Facilita la toma de decisiones basada en datos históricos. Elimina la necesidad de cruces manuales en Excel, permitiendo ver la evolución de métricas críticas (Favorabilidad, Participación, NPS) y el detalle por dimensiones/preguntas entre diferentes momentos del tiempo o campañas.

## 3. Alcance / No Alcance
- **Alcance**:
  - Encuestas de tipo **Clima, Cultura y NPS**.
  - Comparación de 2 a 5 encuestas del mismo tipo.
  - Selección de una encuesta "Base" como ancla de comparación.
  - Filtrado demográfico completo (Líder, Área, Rol, Ciudad, País, etc.).
- **No Alcance**:
  - Comparación de tipos mixtos (ej. Clima vs Cultura).
  - Selección de más de 5 encuestas (por densidad de información en UI).

## 4. Flujo End-to-End
1. **Configuración (Wizard)**:
   - **Paso 1**: Elegir Tipo de Encuesta.
   - **Paso 2**: Seleccionar encuestas del listado (mín. 2, máx. 5).
   - **Paso 3**: Definir cuál es la **Base** (Tooltip: *"Punto de referencia para calcular mejoras o caídas"*).
2. **Dashboard**: Visualización de Cards de KPI y Tabla de Dimensiones.
3. **Filtros**: Aplicación de filtros demográficos que actualizan todo el sistema.
4. **Análisis**: Apertura de Drawer para ver comentarios e insights de IA.
5. **Reportes**: Exportación a Excel/PDF o copia de enlace compartido.

## 5. Prototipo Funcional como Fuente de Verdad
La implementación en `/src/` es el referente técnico:
- **`EncuestasDashboard.tsx`**: Lógica de entrada y wizard.
- **`ComparativeDashboard.tsx`**: Núcleo del dashboard y filtros.
- **`comparativeMocks.ts`**: Estructura de datos y contratos de API simulados.

## 6. Reglas de Negocio (Core Logic)
- **Cálculo de Delta**: $\Delta = \text{Valor Encuesta X} - \text{Valor Base}$.
  - *Interpretación*: Positivo = Mejora (Verde). Negativo = Retroceso (Rojo).
- **Privacy Wall (Configurable)**: 
  - Regla: Si $n < \text{Umbral}$ (ej: 3, 5, 10), se muestra el candado 🔒.
  - Tooltip: *"Datos protegidos por umbral de anonimato (Umbral: X)."*
- **Estado Sin Datos ($n=0$)**: Se muestra el texto **"Sin respuestas"** o guion "—".

## 7. Comportamiento UI por Componente
### Matriz de Estados y Tooltips
| Componente | Escenario | Visualización | Tooltip (Hover) |
| :--- | :--- | :--- | :--- |
| **Cards KPI** | $n=0$ | "Sin respuestas" | "No hay datos para los filtros seleccionados." |
| **Delta Pill** | Mejora | Píldora Verde | "Mejora significativa respecto a la encuesta base." |
| **Delta Pill** | Caída | Píldora Roja | "Retroceso respecto a la encuesta base." |
| **Heatmap** | Sin respuestas | Celda Gris | "Puntaje promedio del segmento [X] en la dimensión [Y]." |
| **N/A en Tablas** | Faltante | "N/A" | "Esta dimensión no fue evaluada en esta encuesta específica." |

## 8. Rutas de Usuario Detalladas
### RUTA 1: Filtros (Escenario "Juan Pérez")
- El usuario selecciona un líder en el Header.
- **Hover en Header (i)**: *"Los filtros aplicados afectan a todos los componentes del dashboard."*
- Si el líder no tiene respuestas: Tooltip: *"No se encontraron registros para este segmento en este proceso."*

### RUTA 2: Análisis IA y Comentarios
- **Tooltip Icono IA**: *"Análisis generado automáticamente por inteligencia artificial."*
- **Hovers de Sentimiento**:
  - Positivo: *"Comentarios que expresan satisfacción."*
  - Negativo: *"Comentarios con áreas de mejora o descontento."*

### RUTA 3: Acciones de Header
- **Compartir (🔗)**: Tooltip: *"Copiar enlace del comparativo con filtros actuales."* -> Toast: *"Enlace copiado al portapapeles."*
- **Descargar (📥)**: Tooltip: *"Exportar resultados a Excel o PDF."* -> Toast: *"La descarga del reporte ha iniciado."*

## 9. Historias de Usuario Candidatas
- **HU1 (Base)**: "Como usuario, quiero marcar una encuesta como base para que el sistema calcule automáticamente los deltas contra ella."
- **HU2 (Filtros)**: "Como usuario, quiero filtrar por 'País' para ver si la cultura organizacional varía geográficamente."

## 10. Criterios de Aceptación
- Bloqueo de navegación si no se seleccionan al menos 2 encuestas.
- Ocultación dinámica de Cards (NPS en Cultura, Favorabilidad en NPS).
- Activación inmediata del candado de privacidad al cambiar filtros.

## 11. Insumos Técnicos para Desarrollo
- **Iconografía**: 🌱 (Clima), ❤️ (Cultura), ⏱️ (NPS).
- **Manejo de Errores**:
  - Toast Error: *"Ocurrió un error al procesar la solicitud. Por favor, intenta de nuevo."*
  - Error Carga: *"Error de conexión. No pudimos recuperar la información."*

## 12. Edge Cases
- **Dimensiones Inconsistentes**: Manejo de "N/A" sin romper el layout.
- **Comentarios Escasos**: IA dirá: *"Se requieren más comentarios para el análisis."*

## 13. Analítica
- Eventos: `compare_start`, `filter_apply`, `report_download`, `share_link_copy`.

## 14. QA Checklist
- [x] ¿El candado aparece según el umbral dinámico?
- [x] ¿Los deltas son correctos respecto a la Base?
- [x] ¿Todos los hovers muestran el texto especificado en la Sección 7?

## 15. Riesgos y Decisiones
- **Decisión**: Se priorizó la encuesta Base como ancla fija para evitar confusión en el cálculo de deltas transversales.

## 16. Aprobaciones
- [ ] Product Manager | [ ] Tech Lead | [ ] QA Lead
