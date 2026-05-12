/**
 * Comparative Dashboard Mock Data
 * Specifically for Phase 5A: Favorabilidad Tab
 */

import type { SurveyListItem } from './types';


export const COMPARATIVE_SURVEYS_LIST: SurveyListItem[] = [
  // Clima (Added 2025/2026)
  { id: "c2026-1", name: "Clima Organizacional - Q1 2026", type: "Clima", status: "Finalizado", statusVariant: "positive", startDate: "15 ene 2026", endDate: "30 ene 2026", participants: "520", progress: 100 },
  { id: "c2025-4", name: "Clima Organizacional - Q4 2025", type: "Clima", status: "Finalizado", statusVariant: "positive", startDate: "10 oct 2025", endDate: "25 oct 2025", participants: "505", progress: 100 },
  { id: "c2025-3", name: "Clima Organizacional - Q3 2025", type: "Clima", status: "Finalizado", statusVariant: "positive", startDate: "12 jul 2025", endDate: "28 jul 2025", participants: "495", progress: 100 },
  { id: "c2025-2", name: "Clima Organizacional - Q2 2025", type: "Clima", status: "Finalizado", statusVariant: "positive", startDate: "05 abr 2025", endDate: "20 abr 2025", participants: "480", progress: 100 },
  { id: "c2025-1", name: "Clima Organizacional - Q1 2025", type: "Clima", status: "Finalizado", statusVariant: "positive", startDate: "15 ene 2025", endDate: "30 ene 2025", participants: "470", progress: 100 },
  
  // Clima (2024 items)
  { id: "c2", name: "Clima Organizacional - Q4 2024", type: "Clima", status: "Finalizado", statusVariant: "positive", startDate: "10 oct 2024", endDate: "25 oct 2024", participants: "432", progress: 100 },
  { id: "c3", name: "Clima Organizacional - Q3 2024", type: "Clima", status: "Finalizado", statusVariant: "positive", startDate: "12 jul 2024", endDate: "28 jul 2024", participants: "415", progress: 100 },
  { id: "c4", name: "Clima Organizacional - Q2 2024", type: "Clima", status: "Finalizado", statusVariant: "positive", startDate: "05 abr 2024", endDate: "20 abr 2024", participants: "390", progress: 100 },
  { id: "c5", name: "Clima Organizacional - Q1 2024", type: "Clima", status: "Finalizado", statusVariant: "positive", startDate: "15 ene 2024", endDate: "30 ene 2024", participants: "385", progress: 100 },
  
  // Cultura (Added 2025/2026)
  { id: "cu2026", name: "Cultura y Valores UBITS 2026", type: "Cultura", status: "Finalizado", statusVariant: "positive", startDate: "01 mar 2026", endDate: "15 mar 2026", participants: "550", progress: 100 },
  { id: "cu2025", name: "Cultura y Valores UBITS 2025", type: "Cultura", status: "Finalizado", statusVariant: "positive", startDate: "01 mar 2025", endDate: "15 mar 2025", participants: "530", progress: 100 },
  { id: "cu1", name: "Cultura y Valores UBITS 2024", type: "Cultura", status: "Finalizado", statusVariant: "positive", startDate: "01 mar 2024", endDate: "15 mar 2024", participants: "510", progress: 100 },
  { id: "cu4", name: "Alineación de Propósito 2024", type: "Cultura", status: "Finalizado", statusVariant: "positive", startDate: "10 nov 2024", endDate: "25 nov 2024", participants: "445", progress: 100 },
  
  // NPS (Added 2025/2026)
  { id: "n2026-1", name: "NPS Clientes Premium Q1 2026", type: "NPS", status: "Finalizado", statusVariant: "positive", startDate: "01 feb 2026", endDate: "15 feb 2026", participants: "950", progress: 100 },
  { id: "n2025-4", name: "NPS Clientes Premium Q4 2025", type: "NPS", status: "Finalizado", statusVariant: "positive", startDate: "01 nov 2025", endDate: "15 nov 2025", participants: "920", progress: 100 },
  { id: "n2", name: "NPS Clientes Premium Q4 2024", type: "NPS", status: "Finalizado", statusVariant: "positive", startDate: "01 nov 2024", endDate: "15 nov 2024", participants: "820", progress: 100 },
  { id: "n3", name: "NPS Clientes Premium Q3 2024", type: "NPS", status: "Finalizado", statusVariant: "positive", startDate: "01 ago 2024", endDate: "15 ago 2024", participants: "780", progress: 100 },
  
  // IA (Added 2025/2026)
  { id: "ia2026-1", name: "Adopción de IA Gen - Q1 2026", type: "Evaluación y adopción de IA", status: "Finalizado", statusVariant: "positive", startDate: "20 mar 2026", endDate: "05 abr 2026", participants: "450", progress: 100 },
  { id: "ia2025-4", name: "Adopción de IA Gen - Q4 2025", type: "Evaluación y adopción de IA", status: "Finalizado", statusVariant: "positive", startDate: "20 dic 2025", endDate: "05 ene 2026", participants: "420", progress: 100 },
  { id: "ia1", name: "Adopción de IA Gen - Q1 2024", type: "Evaluación y adopción de IA", status: "Finalizado", statusVariant: "positive", startDate: "20 mar 2024", endDate: "05 abr 2024", participants: "310", progress: 100 },
  { id: "ia3", name: "Madurez Digital 2024", type: "Evaluación y adopción de IA", status: "Finalizado", statusVariant: "positive", startDate: "15 sep 2024", endDate: "30 sep 2024", participants: "320", progress: 100 },
];


export const COMPARATIVE_FAVORABILITY_DATA = {
  mainMetric: {
    id: 'fav-q4-2024',
    label: 'Favorabilidad',
    value: 78.4,
    previousValue: 72.4,
    delta: 6.0,
    deltaPercentage: 8.3,
    trend: 'up' as const,
    description: 'Q4 2024 (BASE)',
    totalResponses: 450
  },
  
  // Vista Detalle: Distribution by period
  distributionByPeriod: [
    {
      period: 'Q4 2024 (BASE)',
      total: 450,
      segments: [
        { id: 'fav-1', label: 'Favorable', value: 78.4, percentage: 78.4, tone: 'positive' as const },
        { id: 'neu-1', label: 'Neutral', value: 12.6, percentage: 12.6, tone: 'neutral' as const },
        { id: 'des-1', label: 'Desfavorable', value: 9.0, percentage: 9.0, tone: 'negative' as const },
      ]
    },
    {
      period: 'Q3 2024',
      total: 430,
      segments: [
        { id: 'fav-2', label: 'Favorable', value: 72.4, percentage: 72.4, tone: 'positive' as const },
        { id: 'neu-2', label: 'Neutral', value: 15.6, percentage: 15.6, tone: 'neutral' as const },
        { id: 'des-2', label: 'Desfavorable', value: 12.0, percentage: 12.0, tone: 'negative' as const },
      ]
    },
    {
      period: 'Q2 2024',
      total: 425,
      segments: [
        { id: 'fav-3', label: 'Favorable', value: 70.8, percentage: 70.8, tone: 'positive' as const },
        { id: 'neu-3', label: 'Neutral', value: 17.2, percentage: 17.2, tone: 'neutral' as const },
        { id: 'des-3', label: 'Desfavorable', value: 12.0, percentage: 12.0, tone: 'negative' as const },
      ]
    },
    {
      period: 'Q4 2023',
      total: 410,
      segments: [
        { id: 'fav-4', label: 'Favorable', value: 68.5, percentage: 68.5, tone: 'positive' as const },
        { id: 'neu-4', label: 'Neutral', value: 19.5, percentage: 19.5, tone: 'neutral' as const },
        { id: 'des-4', label: 'Desfavorable', value: 12.0, percentage: 12.0, tone: 'negative' as const },
      ]
    },
    {
      period: 'Q1 2024',
      total: 390,
      segments: [
        { id: 'fav-5', label: 'Favorable', value: 65.2, percentage: 65.2, tone: 'positive' as const },
        { id: 'neu-5', label: 'Neutral', value: 20.8, percentage: 20.8, tone: 'neutral' as const },
        { id: 'des-5', label: 'Desfavorable', value: 14.0, percentage: 14.0, tone: 'negative' as const },
      ]
    }
  ],

  // Vista Tendencia: Evolution of favorability
  trendData: {
    id: 'fav-trend',
    label: 'Evolución de Favorabilidad',
    data: [
      { label: 'Q4 2024', value: 78.4, total: 450 },
      { label: 'Q1 2025', value: 80.2, total: 470 },
      { label: 'Q2 2025', value: 81.5, total: 480 },
      { label: 'Q3 2025', value: 83.1, total: 495 },
      { label: 'Q4 2025', value: 84.8, total: 505 },
      { label: 'Q1 2026', value: 86.5, total: 520 },
    ],
    unit: '%'
  },

  // Footer comparative deltas
  comparisons: [
    { label: 'Q1 2026 (BASE)', value: 86.5, isBase: true },
    { label: 'Q4 2025', value: 84.8, delta: 1.7, trend: 'up' as const },
    { label: 'Q3 2025', value: 83.1, delta: 3.4, trend: 'up' as const },
    { label: 'Q2 2025', value: 81.5, delta: 5.0, trend: 'up' as const },
    { label: 'Q1 2025', value: 80.2, delta: 6.3, trend: 'up' as const },
  ]
};

export const COMPARATIVE_PARTICIPATION_DATA = {
  mainMetric: {
    id: 'part-q4-2024',
    label: 'PARTICIPACIÓN',
    value: 92.1,
    previousValue: 90.1,
    delta: 2.0,
    deltaPercentage: 2.2,
    trend: 'up' as const,
    description: 'Q4 2024 (BASE)',
    totalResponses: 520
  },
  
  // Vista Detalle: Distribution by period
  distributionByPeriod: [
    {
      period: 'Q4 2024 (BASE)',
      total: 520,
      segments: [
        { id: 'part-res-1', label: 'Respondió', value: 92.1, percentage: 92.1, tone: 'positive' as const },
        { id: 'part-pen-1', label: 'Pendiente', value: 7.9, percentage: 7.9, tone: 'neutral' as const },
      ]
    },
    {
      period: 'Q3 2024',
      total: 500,
      segments: [
        { id: 'part-res-2', label: 'Respondió', value: 90.1, percentage: 90.1, tone: 'positive' as const },
        { id: 'part-pen-2', label: 'Pendiente', value: 9.9, percentage: 9.9, tone: 'neutral' as const },
      ]
    },
    {
      period: 'Q2 2024',
      total: 480,
      segments: [
        { id: 'part-res-3', label: 'Respondió', value: 88.5, percentage: 88.5, tone: 'positive' as const },
        { id: 'part-pen-3', label: 'Pendiente', value: 11.5, percentage: 11.5, tone: 'neutral' as const },
      ]
    },
    {
      period: 'Q1 2024',
      total: 450,
      segments: [
        { id: 'part-res-4', label: 'Respondió', value: 87.4, percentage: 87.4, tone: 'positive' as const },
        { id: 'part-pen-4', label: 'Pendiente', value: 12.6, percentage: 12.6, tone: 'neutral' as const },
      ]
    },
    {
      period: 'Q1 2024',
      total: 420,
      segments: [
        { id: 'part-res-5', label: 'Respondió', value: 85.0, percentage: 85.0, tone: 'positive' as const },
        { id: 'part-pen-5', label: 'Pendiente', value: 15.0, percentage: 15.0, tone: 'neutral' as const },
      ]
    }
  ],

  // Vista Tendencia: Evolution of participation
  trendData: {
    id: 'part-trend',
    label: 'Evolución de Participación',
    data: [
      { label: 'Q4 2024', value: 92.1, total: 520 },
      { label: 'Q1 2025', value: 93.0, total: 535 },
      { label: 'Q2 2025', value: 94.2, total: 540 },
      { label: 'Q3 2025', value: 94.8, total: 550 },
      { label: 'Q4 2025', value: 95.5, total: 565 },
      { label: 'Q1 2026', value: 96.2, total: 580 },
    ],
    unit: '%'
  },

  // Footer comparative deltas
  comparisons: [
    { label: 'Q1 2026 (BASE)', value: 96.2, isBase: true },
    { label: 'Q4 2025', value: 95.5, delta: 0.7, trend: 'up' as const },
    { label: 'Q3 2025', value: 94.8, delta: 1.4, trend: 'up' as const },
    { label: 'Q2 2025', value: 94.2, delta: 2.0, trend: 'up' as const },
    { label: 'Q1 2025', value: 93.0, delta: 3.2, trend: 'up' as const },
  ]
};

export const COMPARATIVE_NPS_DATA = {
  mainMetric: {
    id: 'nps-q4-2024',
    label: 'NPS',
    value: 42,
    previousValue: 40,
    delta: 2,
    trend: 'up' as const,
    description: 'Q4 2024 (BASE)',
    totalResponses: 450
  },
  
  // Vista Detalle: Distribution by period
  distributionByPeriod: [
    {
      period: 'Q4 2024 (BASE)',
      total: 450,
      segments: [
        { id: 'prom-1', label: 'PROM.', value: 60, percentage: 60, tone: 'positive' as const },
        { id: 'neu-1', label: 'NEUT.', value: 22, percentage: 22, tone: 'neutral' as const },
        { id: 'det-1', label: 'DET.', value: 18, percentage: 18, tone: 'negative' as const },
      ]
    },
    {
      period: 'Q3 2024',
      total: 440,
      segments: [
        { id: 'prom-2', label: 'PROM.', value: 59, percentage: 59, tone: 'positive' as const },
        { id: 'neu-2', label: 'NEUT.', value: 22, percentage: 22, tone: 'neutral' as const },
        { id: 'det-2', label: 'DET.', value: 19, percentage: 19, tone: 'negative' as const },
      ]
    },
    {
      period: 'Q2 2024',
      total: 430,
      segments: [
        { id: 'prom-3', label: 'PROM.', value: 62, percentage: 62, tone: 'positive' as const },
        { id: 'neu-3', label: 'NEUT.', value: 21, percentage: 21, tone: 'neutral' as const },
        { id: 'det-3', label: 'DET.', value: 17, percentage: 17, tone: 'negative' as const },
      ]
    },
    {
      period: 'Q1 2024',
      total: 400,
      segments: [
        { id: 'prom-4', label: 'PROM.', value: 58, percentage: 58, tone: 'positive' as const },
        { id: 'neu-4', label: 'NEUT.', value: 27, percentage: 27, tone: 'neutral' as const },
        { id: 'det-4', label: 'DET.', value: 15, percentage: 15, tone: 'negative' as const },
      ]
    },
    {
      period: 'Q1 2024',
      total: 380,
      segments: [
        { id: 'prom-5', label: 'PROM.', value: 55, percentage: 55, tone: 'positive' as const },
        { id: 'neu-5', label: 'NEUT.', value: 28, percentage: 28, tone: 'neutral' as const },
        { id: 'det-5', label: 'DET.', value: 17, percentage: 17, tone: 'negative' as const },
      ]
    }
  ],

  // Vista Tendencia: Evolution of NPS
  trendData: {
    id: 'nps-trend',
    label: 'Evolución de NPS',
    data: [
      { label: 'Q4 2024', value: 42, total: 450 },
      { label: 'Q1 2025', value: 45, total: 470 },
      { label: 'Q2 2025', value: 48, total: 485 },
      { label: 'Q3 2025', value: 50, total: 500 },
      { label: 'Q4 2025', value: 52, total: 515 },
      { label: 'Q1 2026', value: 55, total: 530 },
    ],
    unit: ''
  },

  // Footer comparative deltas
  comparisons: [
    { label: 'Q1 2026 (BASE)', value: 55, isBase: true, total: 530 },
    { label: 'Q4 2025', value: 52, delta: 3, trend: 'up' as const, total: 515 },
    { label: 'Q3 2025', value: 50, delta: 5, trend: 'up' as const, total: 500 },
    { label: 'Q2 2025', value: 48, delta: 7, trend: 'up' as const, total: 485 },
    { label: 'Q1 2025', value: 45, delta: 10, trend: 'up' as const, total: 470 },
  ]
};

// Generic Keys for dynamic mapping:
// currentScore = latest selected
// p1 = second latest
// p2 = third latest
// p3 = fourth latest
// p4 = fifth latest

export const COMPARATIVE_DIMENSIONS_DATA = [
  {
    id: "dim-1",
    name: "Liderazgo",
    description: "Confianza y efectividad en el liderazgo",
    currentScore: 82,
    p1: 68,
    p2: 66,
    p3: 64, 
    p4: 60,
    delta: 14,
    trend: 'up' as const,
    responses: 1240
  },
  {
    id: "dim-2",
    name: "Reconocimiento",
    description: "Valoración del trabajo y logros",
    currentScore: 76,
    p1: 64,
    p2: 62,
    p3: 60, 
    p4: 58,
    delta: 12,
    trend: 'up' as const,
    responses: 1150
  },
  {
    id: "dim-3",
    name: "Comunicación",
    description: "Claridad y transparencia interna",
    currentScore: 74,
    p1: 65,
    p2: 64,
    p3: 64, 
    p4: 62,
    delta: 9,
    trend: 'up' as const,
    responses: 1100
  },
  {
    id: "dim-4",
    name: "Cultura",
    description: "Valores y ambiente organizacional",
    currentScore: 79,
    p1: 71,
    p2: 70,
    p3: 69, 
    p4: 68,
    delta: 8,
    trend: 'up' as const,
    responses: 1180
  },
  {
    id: "dim-5",
    name: "Desarrollo",
    description: "Oportunidades de crecimiento",
    currentScore: 72,
    p1: 75,
    p2: 75,
    p3: 74, 
    p4: 72,
    delta: -3,
    trend: 'down' as const,
    responses: 980
  },
  {
    id: "dim-6",
    name: "Bienestar",
    description: "Salud física y mental",
    currentScore: 85,
    p1: 82,
    p2: 81,
    p3: 80, 
    p4: 78,
    delta: 3,
    trend: 'up' as const,
    responses: 1200
  },
  {
    id: "dim-7",
    name: "Carga laboral",
    description: "Distribución de tareas y tiempos",
    currentScore: 68,
    p1: 70,
    p2: 71,
    p3: 72, 
    p4: 74,
    delta: -2,
    trend: 'down' as const,
    responses: 1050
  },
  {
    id: "dim-8",
    name: "Pertenencia",
    description: "Identificación con la empresa",
    currentScore: 90,
    p1: 88,
    p2: 86,
    p3: 85, 
    p4: 82,
    delta: 2,
    trend: 'up' as const,
    responses: 1300
  },
  {
    id: "dim-9",
    name: "Innovación",
    description: "Capacidad de generar nuevas ideas y procesos (Nueva en 2026)",
    currentScore: 88,
    p1: null,
    p2: null,
    p3: null, 
    p4: null,
    delta: null,
    trend: 'up' as const,
    responses: 520
  },
  {
    id: "dim-10",
    name: "Infraestructura",
    description: "Calidad de las instalaciones y herramientas físicas",
    currentScore: 75,
    p1: 72,
    p2: 70,
    p3: 68, 
    p4: 65,
    delta: 3,
    trend: 'up' as const,
    responses: 1100
  }
];

export const CULTURA_DIMENSIONS_DATA = [
  {
    id: "cdim-1",
    name: "Valores Vivenciados",
    description: "Grado en que se practican los valores",
    currentScore: 88,
    p1: 82,
    p2: 80,
    p3: 78, 
    p4: 75,
    delta: 6,
    trend: 'up' as const,
    responses: 1100
  },
  {
    id: "cdim-2",
    name: "Alineación Estratégica",
    description: "Conexión con el propósito",
    currentScore: 84,
    p1: 78,
    p2: 76,
    p3: 75, 
    p4: 72,
    delta: 6,
    trend: 'up' as const,
    responses: 1050
  },
  {
    id: "cdim-3",
    name: "Innovación y Agilidad",
    description: "Capacidad de adaptación (Sin historial en Sentimiento)",
    currentScore: 72,
    p1: 74,
    p2: 75,
    p3: 73, 
    p4: 70,
    delta: -2,
    trend: 'down' as const,
    responses: 980
  },
  {
    id: "cdim-4",
    name: "Empoderamiento",
    description: "Autonomía en la toma de decisiones",
    currentScore: 79,
    p1: 72,
    p2: 70,
    p3: 68, 
    p4: 65,
    delta: 7,
    trend: 'up' as const,
    responses: 1020
  },
  {
    id: "cdim-5",
    name: "Colaboración Transversal",
    description: "Silo vs Trabajo en equipo",
    currentScore: 76,
    p1: 70,
    p2: 68,
    p3: 65, 
    p4: 62,
    delta: 6,
    trend: 'up' as const,
    responses: 950
  },
  {
    id: "cdim-6",
    name: "Liderazgo Inspirador",
    description: "Visión y capacidad de guiar de los líderes (Sin historial previo)",
    currentScore: 85,
    p1: null,
    p2: null,
    p3: null, 
    p4: null,
    delta: null,
    trend: 'up' as const,
    responses: 480
  },
  {
    id: "cdim-7",
    name: "Recursos y Herramientas",
    description: "Disponibilidad de elementos para el trabajo diario (Sin datos actuales)",
    currentScore: null,
    p1: 75,
    p2: 72,
    p3: 70, 
    p4: 68,
    delta: null,
    trend: 'up' as const,
    responses: 0
  },
  {
    id: "cdim-8",
    name: "Bienestar y Equilibrio",
    description: "Equilibrio vida-trabajo (Solo datos históricos antiguos)",
    currentScore: null,
    p1: null,
    p2: 65,
    p3: 60, 
    p4: null,
    delta: null,
    trend: 'up' as const,
    responses: 0
  }
];



export const COMPARATIVE_QUESTIONS_DATA = [
  {
    id: "q-1",
    question: "Mi líder directo se preocupa por mi bienestar",
    dimension: "Liderazgo",
    currentScore: 85,
    p1: 72,
    p2: 70,
    trend: [65, 68, 70, 72, 85],
    delta: 13,
    responses: 450
  },
  {
    id: "q-2",
    question: "Recibo feedback constructivo regularmente de mi manager",
    dimension: "Liderazgo",
    currentScore: 78,
    p1: 65,
    p2: 62,
    trend: [58, 60, 62, 65, 78],
    delta: 13,
    responses: 445
  },
  {
    id: "q-3",
    question: "Tengo las herramientas necesarias para mi trabajo",
    dimension: "Desarrollo",
    currentScore: 92,
    p1: 90,
    p2: 88,
    trend: [85, 87, 88, 90, 92],
    delta: 2,
    responses: 452
  },
  {
    id: "q-4",
    question: "Me siento valorado por mis compañeros de equipo",
    dimension: "Cultura",
    currentScore: 81,
    p1: 82,
    p2: 80,
    trend: [78, 79, 80, 82, 81],
    delta: -1,
    responses: 448
  },
  {
    id: "q-5",
    question: "Entiendo cómo mi trabajo contribuye a los objetivos",
    dimension: "Comunicación",
    currentScore: 88,
    p1: 85,
    p2: 84,
    trend: [80, 82, 84, 85, 88],
    delta: 3,
    responses: 450
  },
  {
    id: "q-6",
    question: "Existe un ambiente de respeto y colaboración",
    dimension: "Cultura",
    currentScore: 76,
    p1: 70,
    p2: 68,
    trend: [60, 65, 68, 70, 76],
    delta: 6,
    responses: 430
  }
];

export const CULTURA_QUESTIONS_DATA = [
  {
    id: "cq-1",
    question: "Los líderes de UBITS actúan de acuerdo con nuestros valores",
    dimension: "Valores Vivenciados",
    currentScore: 90,
    p1: 82,
    p2: 78,
    trend: [70, 75, 78, 82, 90],
    delta: 8,
    responses: 1100
  },
  {
    id: "cq-2",
    question: "Me siento inspirado por el propósito de la compañía",
    dimension: "Alineación Estratégica",
    currentScore: 85,
    p1: 78,
    p2: 75,
    trend: [65, 70, 75, 78, 85],
    delta: 7,
    responses: 1050
  },
  {
    id: "cq-3",
    question: "En mi equipo se fomenta la experimentación y el aprendizaje",
    dimension: "Innovación y Agilidad",
    currentScore: 75,
    p1: 78,
    p2: 76,
    trend: [70, 72, 76, 78, 75],
    delta: -3,
    responses: 980
  },
  {
    id: "cq-4",
    question: "Siento que tengo autonomía para tomar decisiones en mi rol",
    dimension: "Empoderamiento",
    currentScore: 82,
    p1: 74,
    p2: 70,
    trend: [60, 65, 70, 74, 82],
    delta: 8,
    responses: 1020
  },
  {
    id: "cq-5",
    question: "Los líderes tienen una visión clara del futuro",
    dimension: "Liderazgo Inspirador",
    currentScore: 85,
    p1: null,
    p2: null,
    trend: [],
    delta: null,
    responses: 480
  },
  {
    id: "cq-6",
    question: "Tengo los recursos necesarios para hacer mi trabajo",
    dimension: "Recursos y Herramientas",
    currentScore: null,
    p1: 75,
    p2: 72,
    trend: [68, 70, 72, 75],
    delta: null,
    responses: 0
  },
  {
    id: "cq-7",
    question: "La empresa se preocupa por mi bienestar personal",
    dimension: "Bienestar y Equilibrio",
    currentScore: null,
    p1: null,
    p2: 65,
    trend: [60, 65],
    delta: null,
    responses: 0
  }
];

export const CULTURA_FAVORABILITY_DATA = {
  mainMetric: {
    id: 'cu-fav-2026',
    label: 'Favorabilidad',
    value: 86.5,
    previousValue: 84.8,
    delta: 1.7,
    deltaPercentage: 2.0,
    trend: 'up' as const,
    description: 'Cultura 2026 (BASE)',
    totalResponses: 550
  },
  distributionByPeriod: [
    {
      period: 'Cultura 2026 (BASE)',
      total: 550,
      segments: [
        { id: 'cu-fav-1', label: 'Favorable', value: 86.5, percentage: 86.5, tone: 'positive' as const },
        { id: 'cu-neu-1', label: 'Neutral', value: 8.5, percentage: 8.5, tone: 'neutral' as const },
        { id: 'cu-des-1', label: 'Desfavorable', value: 5.0, percentage: 5.0, tone: 'negative' as const },
      ]
    },
    {
      period: 'Cultura 2025',
      total: 530,
      segments: [
        { id: 'cu-fav-2', label: 'Favorable', value: 84.8, percentage: 84.8, tone: 'positive' as const },
        { id: 'cu-neu-2', label: 'Neutral', value: 10.2, percentage: 10.2, tone: 'neutral' as const },
        { id: 'cu-des-2', label: 'Desfavorable', value: 5.0, percentage: 5.0, tone: 'negative' as const },
      ]
    },
    {
      period: 'Cultura 2024',
      total: 510,
      segments: [
        { id: 'cu-fav-3', label: 'Favorable', value: 82.0, percentage: 82.0, tone: 'positive' as const },
        { id: 'cu-neu-3', label: 'Neutral', value: 12.0, percentage: 12.0, tone: 'neutral' as const },
        { id: 'cu-des-3', label: 'Desfavorable', value: 6.0, percentage: 6.0, tone: 'negative' as const },
      ]
    }
  ],
  trendData: {
    id: 'cu-fav-trend',
    label: 'Evolución de Favorabilidad Cultura',
    data: [
      { label: '2024', value: 82.0, total: 510 },
      { label: '2025', value: 84.8, total: 530 },
      { label: '2026', value: 86.5, total: 550 },
    ],
    unit: '%'
  },
  comparisons: [
    { label: '2026 (BASE)', value: 86.5, isBase: true },
    { label: '2025', value: 84.8, delta: 1.7, trend: 'up' as const },
    { label: '2024', value: 82.0, delta: 4.5, trend: 'up' as const },
  ]
};

export const CULTURA_PARTICIPATION_DATA = {
  mainMetric: {
    id: 'cu-part-2026',
    label: 'PARTICIPACIÓN',
    value: 94.5,
    previousValue: 92.5,
    delta: 2.0,
    deltaPercentage: 2.1,
    trend: 'up' as const,
    description: 'Cultura 2026 (BASE)',
    totalResponses: 550
  },
  distributionByPeriod: [
    {
      period: 'Cultura 2026 (BASE)',
      total: 550,
      segments: [
        { id: 'cu-part-res-1', label: 'Respondió', value: 94.5, percentage: 94.5, tone: 'positive' as const },
        { id: 'cu-part-pen-1', label: 'Pendiente', value: 5.5, percentage: 5.5, tone: 'neutral' as const },
      ]
    },
    {
      period: 'Cultura 2025',
      total: 530,
      segments: [
        { id: 'cu-part-res-2', label: 'Respondió', value: 92.5, percentage: 92.5, tone: 'positive' as const },
        { id: 'cu-part-pen-2', label: 'Pendiente', value: 7.5, percentage: 7.5, tone: 'neutral' as const },
      ]
    }
  ],
  trendData: {
    id: 'cu-part-trend',
    label: 'Evolución de Participación Cultura',
    data: [
      { label: '2024', value: 90.5, total: 510 },
      { label: '2025', value: 92.5, total: 530 },
      { label: '2026', value: 94.5, total: 550 },
    ],
    unit: '%'
  },
  comparisons: [
    { label: '2026 (BASE)', value: 94.5, isBase: true },
    { label: '2025', value: 92.5, delta: 2.0, trend: 'up' as const },
    { label: '2024', value: 90.5, delta: 4.0, trend: 'up' as const },
  ]
};

export const CULTURA_NPS_DATA = {
  mainMetric: {
    id: 'cu-nps-2026',
    label: 'NPS',
    value: 58,
    previousValue: 54,
    delta: 4,
    trend: 'up' as const,
    description: 'Cultura 2026 (BASE)',
    totalResponses: 550
  },
  distributionByPeriod: [
    {
      period: 'Cultura 2026 (BASE)',
      total: 550,
      segments: [
        { id: 'cu-prom-1', label: 'PROM.', value: 68, percentage: 68, tone: 'positive' as const },
        { id: 'cu-neu-1', label: 'NEUT.', value: 22, percentage: 22, tone: 'neutral' as const },
        { id: 'cu-det-1', label: 'DET.', value: 10, percentage: 10, tone: 'negative' as const },
      ]
    },
    {
      period: 'Cultura 2025',
      total: 530,
      segments: [
        { id: 'cu-prom-2', label: 'PROM.', value: 65, percentage: 65, tone: 'positive' as const },
        { id: 'cu-neu-2', label: 'NEUT.', value: 24, percentage: 24, tone: 'neutral' as const },
        { id: 'cu-det-2', label: 'DET.', value: 11, percentage: 11, tone: 'negative' as const },
      ]
    }
  ],
  trendData: {
    id: 'cu-nps-trend',
    label: 'Evolución de NPS Cultura',
    data: [
      { label: '2024', value: 50, total: 510 },
      { label: '2025', value: 54, total: 530 },
      { label: '2026', value: 58, total: 550 },
    ],
    unit: ''
  },
  comparisons: [
    { label: '2026 (BASE)', value: 58, isBase: true },
    { label: '2025', value: 54, delta: 4, trend: 'up' as const },
    { label: '2024', value: 50, delta: 8, trend: 'up' as const },
  ]
};

export const CULTURA_SENTIMENT_DATA = [
  {
    id: "csent-1",
    dimension: "Valores Vivenciados",
    currentScore: { positive: 75, neutral: 15, negative: 10, total: 400 },
    p1: { positive: 70, neutral: 18, negative: 12, total: 380 },
    p2: { positive: 65, neutral: 20, negative: 15, total: 350 },
    delta: 5
  },
  {
    id: "csent-2",
    dimension: "Alineación Estratégica",
    currentScore: { positive: 70, neutral: 20, negative: 10, total: 380 },
    p1: { positive: 65, neutral: 22, negative: 13, total: 360 },
    p2: { positive: 60, neutral: 25, negative: 15, total: 340 },
    delta: 5
  },
  {
    id: "csent-3",
    dimension: "Innovación y Agilidad",
    currentScore: { positive: 45, neutral: 35, negative: 20, total: 320 },
    p1: null,
    p2: null,
    delta: null
  },
  {
    id: "csent-4",
    dimension: "Liderazgo Inspirador",
    currentScore: { positive: 88, neutral: 8, negative: 4, total: 450 },
    p1: null,
    p2: null,
    delta: null
  },
  {
    id: "csent-5",
    dimension: "Recursos y Herramientas",
    currentScore: null,
    p1: { positive: 60, neutral: 30, negative: 10, total: 400 },
    p2: null,
    delta: null
  },
  {
    id: "csent-6",
    dimension: "Bienestar y Equilibrio",
    currentScore: null,
    p1: null,
    p2: { positive: 50, neutral: 30, negative: 20, total: 200 },
    delta: null
  }
];

export const DEMOGRAPHIC_OPTIONS = {
  area: ["Tecnología", "Ventas", "Marketing", "Recursos Humanos", "Operaciones", "Finanzas", "Producto", "Soporte", "Legal", "I+D"],
  lider: ["Juan Pérez", "María García", "Carlos Rodríguez", "Ana Martínez", "Luis Sánchez", "Elena Gómez", "Roberto Díaz", "Patricia Sosa", "Ricardo Luna"],
  rol: ["Individual Contributor", "Manager", "Senior Manager", "Director", "VP", "Intern", "Contractor", "Team Lead"],
  ciudad: ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena", "Pereira", "Bucaramanga", "Manizales", "Montería"],
  pais: ["Colombia", "México", "Perú", "Chile", "Argentina", "Brasil", "Ecuador", "Panamá", "España"],
  edad: ["18-25", "26-35", "36-45", "46-55", "56+"],
  sexo: ["Masculino", "Femenino", "No binario", "Prefiero no decirlo"],
  antiguedad: ["0-6 meses", "6-12 meses", "1-2 años", "2-5 años", "5+ años"],
  contrato: ["Término Fijo", "Término Indefinido", "Prestación de Servicios", "Aprendizaje", "Temporal"]
};

export const COMPARATIVE_SENTIMENT_DATA = [
  {
    id: "sent-1",
    dimension: "Liderazgo",
    q4_2024: { positive: 65, neutral: 20, negative: 15, total: 320 },
    q3_2024: { positive: 62, neutral: 22, negative: 16, total: 310 },
    q2_2024: { positive: 60, neutral: 25, negative: 15, total: 290 },
    q1_2024: { positive: 58, neutral: 24, negative: 18, total: 280 },
    q4_2023: { positive: 55, neutral: 25, negative: 20, total: 250 },
    delta: 3
  },
  {
    id: "sent-2",
    dimension: "Reconocimiento",
    q4_2024: { positive: 45, neutral: 35, negative: 20, total: 210 },
    q3_2024: { positive: 43, neutral: 37, negative: 20, total: 205 },
    q2_2024: { positive: 44, neutral: 36, negative: 20, total: 190 },
    q1_2024: { positive: 42, neutral: 38, negative: 20, total: 180 },
    q4_2023: { positive: 40, neutral: 40, negative: 20, total: 150 },
    delta: 2
  },
  {
    id: "sent-3",
    dimension: "Comunicación",
    q4_2024: { positive: 55, neutral: 25, negative: 20, total: 280 },
    q3_2024: { positive: 54, neutral: 26, negative: 20, total: 275 },
    q2_2024: { positive: 53, neutral: 27, negative: 20, total: 260 },
    q1_2024: { positive: 52, neutral: 28, negative: 20, total: 250 },
    q4_2023: { positive: 50, neutral: 30, negative: 20, total: 220 },
    delta: 1
  },
  {
    id: "sent-4",
    dimension: "Cultura",
    q4_2024: { positive: 72, neutral: 18, negative: 10, total: 350 },
    q3_2024: { positive: 71, neutral: 19, negative: 10, total: 340 },
    q2_2024: { positive: 70, neutral: 20, negative: 10, total: 320 },
    q1_2024: { positive: 69, neutral: 21, negative: 10, total: 310 },
    q4_2023: { positive: 68, neutral: 22, negative: 10, total: 280 },
    delta: 1
  },
  {
    id: "sent-5",
    dimension: "Desarrollo",
    q4_2024: { positive: 38, neutral: 40, negative: 22, total: 195 },
    q3_2024: { positive: 39, neutral: 39, negative: 22, total: 190 },
    q2_2024: { positive: 40, neutral: 38, negative: 22, total: 180 },
    q1_2024: { positive: 42, neutral: 36, negative: 22, total: 175 },
    q4_2023: { positive: 45, neutral: 33, negative: 22, total: 160 },
    delta: -1
  },
  {
    id: "sent-6",
    dimension: "Bienestar",
    q4_2024: { positive: 60, neutral: 25, negative: 15, total: 240 },
    q3_2024: { positive: 61, neutral: 24, negative: 15, total: 235 },
    q2_2024: { positive: 60, neutral: 25, negative: 15, total: 220 },
    q1_2024: { positive: 59, neutral: 26, negative: 15, total: 210 },
    q4_2023: { positive: 58, neutral: 27, negative: 15, total: 190 },
    delta: -1
  },
  {
    id: "sent-7",
    dimension: "Carga laboral",
    q4_2024: { positive: 25, neutral: 35, negative: 40, total: 180 },
    q3_2024: { positive: 28, neutral: 32, negative: 40, total: 175 },
    q2_2024: { positive: 30, neutral: 30, negative: 40, total: 160 },
    q1_2024: { positive: 32, neutral: 28, negative: 40, total: 155 },
    q4_2023: { positive: 35, neutral: 25, negative: 40, total: 140 },
    delta: -3
  },
  {
    id: "sent-8",
    dimension: "Pertenencia",
    q4_2024: { positive: 78, neutral: 15, negative: 7, total: 310 },
    q3_2024: { positive: 76, neutral: 17, negative: 7, total: 300 },
    q2_2024: { positive: 75, neutral: 18, negative: 7, total: 290 },
    q1_2024: { positive: 74, neutral: 19, negative: 7, total: 280 },
    q4_2023: { positive: 72, neutral: 20, negative: 8, total: 260 },
    delta: 2
  }
];

export const COMPARATIVE_COMMENTS_DETAIL = [
  {
    id: "com-1",
    text: "Mi líder siempre está dispuesto a escuchar mis propuestas y me apoya en mi crecimiento profesional.",
    dimension: "Liderazgo",
    sentiment: "positive",
    date: "24 Oct 2024",
    demographics: { area: "Tecnología", rol: "Senior Manager", pais: "Colombia" }
  },
  {
    id: "com-2",
    text: "Siento que la comunicación de los cambios estructurales podría ser más clara y oportuna.",
    dimension: "Comunicación",
    sentiment: "neutral",
    date: "20 Oct 2024",
    demographics: { area: "Ventas", rol: "Individual Contributor", pais: "México" }
  },
  {
    id: "com-3",
    text: "La carga de trabajo en este último trimestre ha sido excesiva y está afectando mi vida personal.",
    dimension: "Carga laboral",
    sentiment: "negative",
    date: "15 Oct 2024",
    demographics: { area: "Operaciones", rol: "Manager", pais: "Perú" }
  },
  {
    id: "com-4",
    text: "Me encanta la cultura de colaboración que tenemos en el equipo, siempre nos ayudamos.",
    dimension: "Cultura",
    sentiment: "positive",
    date: "12 Oct 2024",
    demographics: { area: "Producto", rol: "Senior Manager", pais: "Chile" }
  },
  {
    id: "com-5",
    text: "No veo oportunidades claras de crecimiento dentro de mi área actual.",
    dimension: "Desarrollo",
    sentiment: "negative",
    date: "10 Oct 2024",
    demographics: { area: "Finanzas", rol: "Individual Contributor", pais: "Argentina" }
  },
  {
    id: "com-6",
    text: "El reconocimiento por los logros alcanzados es justo y motivador.",
    dimension: "Reconocimiento",
    sentiment: "positive",
    date: "05 Oct 2024",
    demographics: { area: "Marketing", rol: "Individual Contributor", pais: "Colombia" }
  },
  {
    id: "com-7",
    text: "A veces las reuniones se extienden demasiado sin llegar a conclusiones claras.",
    dimension: "Comunicación",
    sentiment: "neutral",
    date: "02 Oct 2024",
    demographics: { area: "Soporte", rol: "Team Lead", pais: "México" }
  },
  {
    id: "com-8",
    text: "Siento un fuerte sentido de pertenencia a UBITS, comparto plenamente sus valores.",
    dimension: "Pertenencia",
    sentiment: "positive",
    date: "30 Sep 2024",
    demographics: { area: "I+D", rol: "Director", pais: "Colombia" }
  }
];

export const CULTURA_COMMENTS_DETAIL = [
  {
    id: "cc-1",
    text: "Los valores de UBITS no son solo palabras en una pared, realmente los vivimos en el día a día.",
    dimension: "Valores Vivenciados",
    sentiment: "positive",
    date: "15 Mar 2026",
    demographics: { area: "RRHH", rol: "Manager", pais: "Colombia" }
  },
  {
    id: "cc-2",
    text: "Siento que el propósito de democratizar el aprendizaje nos une a todos como equipo.",
    dimension: "Alineación Estratégica",
    sentiment: "positive",
    date: "10 Mar 2026",
    demographics: { area: "Producto", rol: "Senior Manager", pais: "México" }
  },
  {
    id: "cc-3",
    text: "La agilidad a veces se confunde con desorden; necesitamos procesos más robustos para innovar.",
    dimension: "Innovación y Agilidad",
    sentiment: "neutral",
    date: "05 Mar 2026",
    demographics: { area: "Tecnología", rol: "Senior Dev", pais: "Colombia" }
  },
  {
    id: "cc-4",
    text: "Me siento empoderado para tomar decisiones, pero a veces falta feedback sobre el impacto.",
    dimension: "Empoderamiento",
    sentiment: "positive",
    date: "01 Mar 2026",
    demographics: { area: "Ventas", rol: "Individual Contributor", pais: "Chile" }
  },
  {
    id: "cc-5",
    text: "La transparencia en la comunicación de resultados financieros nos da mucha seguridad.",
    dimension: "Alineación Estratégica",
    sentiment: "positive",
    date: "28 Feb 2026",
    demographics: { area: "Finanzas", rol: "Director", pais: "Colombia" }
  }
];

export const COMPARATIVE_AI_INSIGHTS = {
  summary: "El análisis comparativo de 5 períodos reveló tendencias positivas en engagement y preocupaciones en carga de trabajo. La satisfacción general ha aumentado 8.2% impulsada por mejoras en liderazgo y cultura.",

  highImpactFindings: [
    {
      id: "insight-1",
      title: "Crecimiento sostenido en Favorabilidad",
      description: "Aumento de 8.2% en favorabilidad general en los últimos 5 períodos",
      type: "insight",
      confidence: "high",
      evidence: "Favorabilidad: 78.4% (Q4 2024 BASE) → Tendencia ascendente consistente",
      impact: "Mejora directa en retención de talento y engagement"
    },
    {
      id: "insight-2",
      title: "Riesgo crítico: Carga de trabajo insostenible",
      description: "El factor 'Carga laboral' muestra deterioro del 10% en satisfacción",
      type: "risk",
      confidence: "high",
      evidence: "Carga laboral: Positividad bajó de 35% (Q4 2023) a 25% (Q4 2024)",
      impact: "Riesgo de rotación y burnout en áreas operativas"
    },
    {
      id: "insight-3",
      title: "Oportunidad: Capitalizar momentum en Cultura",
      description: "El sentimiento positivo en Cultura aumentó 4.7% - momento ideal para inversión",
      type: "opportunity",
      confidence: "high",
      evidence: "Cultura: Positividad en 72% (Q4 2024) con tendencia ascendente",
      impact: "Potencial para iniciativas de valores corporativos"
    },
    {
      id: "insight-4",
      title: "Mejora detectada en Desarrollo profesional",
      description: "Inversión en capacitación comienza a mostrar resultados positivos",
      type: "recommendation",
      confidence: "medium",
      evidence: "Desarrollo: Reversión de tendencia negativa en últimos 2 períodos",
      impact: "Aumento de 2-3% esperado en satisfacción en próximos trimestres"
    }
  ],
  topKeywords: {
    positive: [
      { word: 'Feedback', count: 42 },
      { word: 'Cercanía', count: 35 },
      { word: 'Comunicación', count: 28 },
      { word: 'Procesos', count: 24 },
      { word: 'Confianza', count: 18 }
    ],
    negative: [
      { word: 'Carga', count: 56 },
      { word: 'Estrés', count: 48 },
      { word: 'Salarios', count: 32 },
      { word: 'Reconocimiento', count: 25 },
      { word: 'Burocracia', count: 20 }
    ],
    neutral: [
      { word: 'Estabilidad', count: 38 },
      { word: 'Seguimiento', count: 30 },
      { word: 'Herramientas', count: 25 },
      { word: 'Comunicación', count: 22 },
      { word: 'Horarios', count: 18 }
    ]
  },
  recurrentThemes: {
    positive: [
      { text: 'Acompañamiento del líder', count: 12, trend: 'up', relevance: 0.95, recurrent: true, desc: 'Percepción alta de soporte directo' },
      { text: 'Plan de carrera claro', count: 8, trend: 'stable', relevance: 0.82, recurrent: true, desc: 'Visibilidad de crecimiento interno' }
    ],
    negative: [
      { text: 'Exceso de reuniones', count: 18, trend: 'up', relevance: 0.98, recurrent: true, desc: 'Impacto directo en la productividad' },
      { text: 'Falta de feedback', count: 14, trend: 'down', relevance: 0.88, recurrent: true, desc: 'Necesidad de mayor retroalimentación' }
    ],
    neutral: [
      { text: 'Procesos estables', count: 15, trend: 'stable', relevance: 0.90, recurrent: true, desc: 'Consistencia operativa detectada' },
      { text: 'Herramientas de trabajo', count: 10, trend: 'up', relevance: 0.85, recurrent: true, desc: 'Adopción de nuevas plataformas' }
    ]
  },
  featuredInsights: {
    positive: '«El liderazgo actual se percibe como el motor principal del compromiso, destacando la empatía y la claridad en la dirección estratégica como factores clave de éxito.»',
    negative: '«Se identifica una correlación crítica entre la carga laboral y la rotación potencial. El equipo manifiesta fatiga por procesos burocráticos que dilatan las entregas.»',
    neutral: '«La estabilidad es la nota dominante, sugiriendo un periodo de consolidación operativa donde el foco está en la optimización de las herramientas actuales.»'
  },
  recurrentComments: {
    positive: [
      { title: 'CLARIDAD EN OBJETIVOS', total: 36, text: 'Existe una mejora notable en cómo los líderes definen los OKRs.', confidence: '92%' },
      { title: 'SOPORTE DEL LÍDER', total: 24, text: 'Los colaboradores valoran la cercanía y el apoyo constante.', confidence: '88%' }
    ],
    negative: [
      { title: 'SOBRECARGA LABORAL', total: 42, text: 'Se reporta una fatiga acumulada por jornadas extensas.', confidence: '95%' },
      { title: 'LENTITUD EN PROCESOS', total: 28, text: 'La burocracia interna afecta la velocidad de ejecución.', confidence: '84%' }
    ],
    neutral: [
      { title: 'ESTABILIDAD OPERATIVA', total: 30, text: 'Los procesos se mantienen estables pero sin grandes innovaciones.', confidence: '85%' }
    ]
  },

  sentiment: {
    currentScore: { positive: 82, neutral: 12, negative: 6, total: 580 },
    p1: { positive: 74, neutral: 18, negative: 8, total: 565 },
    p2: { positive: 70, neutral: 20, negative: 10, total: 550 },
    p3: { positive: 68, neutral: 22, negative: 10, total: 540 },
    p4: { positive: 65, neutral: 25, negative: 10, total: 535 },
  },
  predictions: {
    summary: "Basado en análisis de series temporales y machine learning",
    scenarios: [
      {
        label: "Q1 2026",
        actual: 86.5,
        predicted: 88.2,
        probabilityGrowth: 78,
        probabilityDecline: 12,
        probabilityStable: 10
      },
      {
        label: "Q2 2026",
        predicted: 89.1,
        probabilityGrowth: 72,
        probabilityDecline: 15,
        probabilityStable: 13
      },
      {
        label: "Q3 2026",
        predicted: 89.8,
        probabilityGrowth: 68,
        probabilityDecline: 18,
        probabilityStable: 14
      },
      {
        label: "Q4 2026",
        predicted: 90.2,
        probabilityGrowth: 65,
        probabilityDecline: 20,
        probabilityStable: 15
      }
    ]
  }
};

export const CULTURA_AI_INSIGHTS = {
  summary: "La cultura de UBITS se mantiene sólida con un alto nivel de alineación al propósito. Se observa una mejora significativa en la vivencia de valores en comparación con el año anterior.",

  highImpactFindings: [
    {
      id: "cu-insight-1",
      title: "Fuerte Alineación Estratégica",
      description: "El 85% de los colaboradores se siente inspirado por el propósito corporativo.",
      type: "insight",
      confidence: "high",
      evidence: "Cultura: Puntaje de 85 en Alineación Estratégica",
      impact: "Mayor compromiso a largo plazo y coherencia en la ejecución"
    },
    {
      id: "cu-insight-2",
      title: "Valores Vivenciados en aumento",
      description: "Mejora de 8 puntos en la percepción de que los líderes actúan según los valores.",
      type: "insight",
      confidence: "high",
      evidence: "Valores Vivenciados: 82% (2025) → 90% (2026)",
      impact: "Fortalecimiento de la confianza y el liderazgo ejemplar"
    },
    {
      id: "cu-insight-3",
      title: "Barrera: Exceso de perfeccionismo",
      description: "La agilidad se ve limitada por una baja tolerancia al error en algunos equipos.",
      type: "risk",
      confidence: "medium",
      evidence: "Innovación y Agilidad: Satisfacción del 75%",
      impact: "Reducción en la velocidad de experimentación"
    }
  ],
  topKeywords: {
    positive: [
      { word: 'Propósito', count: 52 },
      { word: 'Valores', count: 48 },
      { word: 'Alineación', count: 45 },
      { word: 'Orgullo', count: 38 },
      { word: 'Identidad', count: 32 }
    ],
    negative: [
      { word: 'Lentitud', count: 28 },
      { word: 'Error', count: 24 },
      { word: 'Miedo', count: 22 },
      { word: 'Silencio', count: 18 },
      { word: 'Aislamiento', count: 15 }
    ],
    neutral: [
      { word: 'Continuidad', count: 35 },
      { word: 'Tradición', count: 28 },
      { word: 'Manuales', count: 22 },
      { word: 'Normas', count: 18 },
      { word: 'Flujos', count: 15 }
    ]
  },
  recurrentThemes: {
    positive: [
      { text: 'Conexión con el Propósito', count: 25, trend: 'up', relevance: 0.98, recurrent: true, desc: 'Alta identificación con la misión' },
      { text: 'Vivencia de Valores', count: 18, trend: 'up', relevance: 0.92, recurrent: true, desc: 'Los líderes son ejemplo de cultura' }
    ],
    negative: [
      { text: 'Miedo al error', count: 15, trend: 'stable', relevance: 0.85, recurrent: true, desc: 'Barrera para la innovación abierta' },
      { text: 'Silos culturales', count: 10, trend: 'up', relevance: 0.78, recurrent: false, desc: 'Diferencias marcadas entre áreas' }
    ],
    neutral: [
      { text: 'Rituales corporativos', count: 20, trend: 'stable', relevance: 0.88, recurrent: true, desc: 'Participación constante en eventos' },
      { text: 'Código de ética', count: 12, trend: 'stable', relevance: 0.82, recurrent: false, desc: 'Conocimiento general de normas' }
    ]
  },
  featuredInsights: {
    positive: '«La cultura de UBITS se ha convertido en una ventaja competitiva, donde la alineación al propósito impulsa un compromiso extraordinario.»',
    negative: '«Detectamos una oportunidad crítica en la seguridad psicológica; la aversión al riesgo está frenando la capacidad de aprendizaje del equipo.»',
    neutral: '«La cultura organizacional es percibida como estable y protectora, brindando un marco de seguridad claro para la ejecución diaria.»'
  },
  recurrentComments: {
    positive: [
      { title: 'ORGULLO DE PERTENENCIA', total: 45, text: 'Me siento orgulloso de trabajar en una empresa con valores claros.', confidence: '98%', frequency: 'Alta frecuencia', periods: ['Q4', 'Q3', 'Q2'], detected: 'Detectado en 15 áreas' },
      { title: 'COHERENCIA LIDERAZGO', total: 32, text: 'Mis líderes actúan de acuerdo a lo que la empresa predica.', confidence: '94%', frequency: 'Tendencia estable', periods: ['Q4', 'Q3'], detected: 'Detectado en 12 áreas' }
    ],
    negative: [
      { title: 'AVERSIÓN AL RIESGO', total: 25, text: 'A veces preferimos no proponer para no equivocarnos.', confidence: '82%', frequency: 'Riesgo emergente', periods: ['Q4'], detected: 'Detectado en 8 áreas' },
      { title: 'DESCONEXIÓN INTER-ÁREAS', total: 18, text: 'Cada área tiene su propia "cultura" y cuesta colaborar.', confidence: '78%', frequency: 'Persistente', periods: ['Q4', 'Q3', 'Q2', 'Q1'], detected: 'Detectado en 10 áreas' }
    ],
    neutral: [
      { title: 'CONOCIMIENTO DE NORMAS', total: 40, text: 'Tengo claro qué se espera de mí según el manual de cultura.', confidence: '90%', frequency: 'Consistencia alta', periods: ['Q4', 'Q3', 'Q2', 'Q1'], detected: 'Detectado en 20 áreas' }
    ]
  },

  predictions: {
    summary: "Proyecciones de madurez cultural",
    scenarios: [
      {
        label: "2027",
        predicted: 92.5,
        probabilityGrowth: 80,
        probabilityDecline: 5,
        probabilityStable: 15
      }
    ]
  }
};

export const SEGMENT_CATEGORIES = [
  { id: 'area', label: 'Área' },
  { id: 'lider', label: 'Líder' },
  { id: 'rol', label: 'Rol' },
  { id: 'ciudad', label: 'Ciudad' },
  { id: 'pais', label: 'País' },
  { id: 'edad', label: 'Edad' },
  { id: 'sexo', label: 'Sexo' },
  { id: 'antiguedad', label: 'Antigüedad' },
  { id: 'contrato', label: 'Tipo de Contrato' }
];
