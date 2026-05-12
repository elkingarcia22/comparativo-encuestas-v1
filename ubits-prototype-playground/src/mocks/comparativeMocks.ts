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

export const COMPARATIVE_DIMENSIONS_DATA = [
  {
    id: "dim-1",
    name: "Liderazgo",
    description: "Confianza y efectividad en el liderazgo",
    currentScore: 82,
    q3_2024: 68,
    q2_2024: 66,
    q1_2024: 64, q4_2023: 60,
    delta: 14,
    trend: 'up' as const,
    responses: 1240
  },
  {
    id: "dim-2",
    name: "Reconocimiento",
    description: "Valoración del trabajo y logros",
    currentScore: 76,
    q3_2024: 64,
    q2_2024: 62,
    q1_2024: 60, q4_2023: 58,
    delta: 12,
    trend: 'up' as const,
    responses: 1150
  },
  {
    id: "dim-3",
    name: "Comunicación",
    description: "Claridad y transparencia interna",
    currentScore: 74,
    q3_2024: 65,
    q2_2024: 64,
    q1_2024: 64, q4_2023: 62,
    delta: 9,
    trend: 'up' as const,
    responses: 1100
  },
  {
    id: "dim-4",
    name: "Cultura",
    description: "Valores y ambiente organizacional",
    currentScore: 79,
    q3_2024: 71,
    q2_2024: 70,
    q1_2024: 69, q4_2023: 68,
    delta: 8,
    trend: 'up' as const,
    responses: 1180
  },
  {
    id: "dim-5",
    name: "Desarrollo",
    description: "Oportunidades de crecimiento",
    currentScore: 72,
    q3_2024: 75,
    q2_2024: 75,
    q1_2024: 74, q4_2023: 72,
    delta: -3,
    trend: 'down' as const,
    responses: 980
  },
  {
    id: "dim-6",
    name: "Bienestar",
    description: "Salud física y mental",
    currentScore: 85,
    q3_2024: 82,
    q2_2024: 81,
    q1_2024: 80, q4_2023: 78,
    delta: 3,
    trend: 'up' as const,
    responses: 1200
  },
  {
    id: "dim-7",
    name: "Carga laboral",
    description: "Distribución de tareas y tiempos",
    currentScore: 68,
    q3_2024: 70,
    q2_2024: 71,
    q1_2024: 72, q4_2023: 74,
    delta: -2,
    trend: 'down' as const,
    responses: 1050
  },
  {
    id: "dim-8",
    name: "Pertenencia",
    description: "Identificación con la empresa",
    currentScore: 90,
    q3_2024: 88,
    q2_2024: 86,
    q1_2024: 85, q4_2023: 82,
    delta: 2,
    trend: 'up' as const,
    responses: 1300
  }
];



export const COMPARATIVE_QUESTIONS_DATA = [
  {
    id: "q-1",
    question: "Mi líder directo se preocupa por mi bienestar",
    dimension: "Liderazgo",
    q4_2024: 85,
    q3_2024: 72,
    q2_2024: 70,
    trend: [65, 68, 70, 72, 85],
    delta: 13,
    responses: 450
  },
  {
    id: "q-2",
    question: "Recibo feedback constructivo regularmente de mi manager",
    dimension: "Liderazgo",
    q4_2024: 78,
    q3_2024: 65,
    q2_2024: 62,
    trend: [58, 60, 62, 65, 78],
    delta: 13,
    responses: 445
  },
  {
    id: "q-3",
    question: "Tengo las herramientas necesarias para mi trabajo",
    dimension: "Desarrollo",
    q4_2024: 92,
    q3_2024: 90,
    q2_2024: 88,
    trend: [85, 87, 88, 90, 92],
    delta: 2,
    responses: 452
  },
  {
    id: "q-4",
    question: "Me siento valorado por mis compañeros de equipo",
    dimension: "Cultura",
    q4_2024: 81,
    q3_2024: 82,
    q2_2024: 80,
    trend: [78, 79, 80, 82, 81],
    delta: -1,
    responses: 448
  },
  {
    id: "q-5",
    question: "Entiendo cómo mi trabajo contribuye a los objetivos",
    dimension: "Comunicación",
    q4_2024: 88,
    q3_2024: 85,
    q2_2024: 84,
    trend: [80, 82, 84, 85, 88],
    delta: 3,
    responses: 450
  },
  {
    id: "q-6",
    question: "Existe un ambiente de respeto y colaboración",
    dimension: "Cultura",
    q4_2024: 76,
    q3_2024: 70,
    q2_2024: 68,
    trend: [60, 65, 68, 70, 76],
    delta: 6,
    responses: 430
  },
  {
    id: "q-7",
    question: "Mi carga de trabajo es razonable la mayor parte del tiempo",
    dimension: "Bienestar",
    q4_2024: 65,
    q3_2024: 68,
    q2_2024: 70,
    trend: [75, 72, 70, 68, 65],
    delta: -3,
    responses: 420
  },
  {
    id: "q-8",
    question: "Siento que puedo ser yo mismo en mi lugar de trabajo",
    dimension: "Pertenencia",
    q4_2024: 84,
    q3_2024: 80,
    q2_2024: 78,
    trend: [70, 75, 78, 80, 84],
    delta: 4,
    responses: 440
  },
  {
    id: "q-9",
    question: "Las decisiones se comunican de manera transparente",
    dimension: "Comunicación",
    q4_2024: 72,
    q3_2024: 65,
    q2_2024: 60,
    trend: [50, 55, 60, 65, 72],
    delta: 7,
    responses: 410
  },
  {
    id: "q-10",
    question: "Estoy satisfecho con las oportunidades de crecimiento",
    dimension: "Desarrollo",
    q4_2024: 68,
    q3_2024: 70,
    q2_2024: 72,
    trend: [78, 75, 72, 70, 68],
    delta: -2,
    responses: 405
  },
  {
    id: "q-11",
    question: "Mi manager apoya mi desarrollo profesional",
    dimension: "Liderazgo",
    q4_2024: 82,
    q3_2024: 78,
    q2_2024: 75,
    trend: [70, 72, 75, 78, 82],
    delta: 4,
    responses: 440
  },
  {
    id: "q-12",
    question: "La empresa se preocupa por la salud mental",
    dimension: "Bienestar",
    q4_2024: 79,
    q3_2024: 75,
    q2_2024: 72,
    trend: [65, 68, 72, 75, 79],
    delta: 4,
    responses: 435
  },
  {
    id: "q-13",
    question: "Recomendaría trabajar aquí a mis amigos",
    dimension: "Pertenencia",
    q4_2024: 90,
    q3_2024: 85,
    q2_2024: 82,
    trend: [75, 80, 82, 85, 90],
    delta: 5,
    responses: 450
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
