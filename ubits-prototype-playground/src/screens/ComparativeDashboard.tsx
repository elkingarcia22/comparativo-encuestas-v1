import * as React from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Share2,
  Download,
  Settings,
  FileText,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Hash,
  Users,
  Star,
  Layers,
  MessageSquare,
  Sparkles,
  Target,
  ArrowUpRight,
  HelpCircle,
  Filter,
  ArrowUpDown,
  LayoutGrid,
  Table as TableIcon,
  X,
  PencilLine,
  SlidersHorizontal,
  Plus,
  Check,
  Search,
  ChevronDown,
  Link,
  Minus,
  Copy,
  Lock,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ResponseStackedBarGroup } from "@/components/survey-analytics/ResponseStackedBarGroup";
import { ResponseStackedBar } from "@/components/survey-analytics/ResponseStackedBar";
import { TrendMetricLineChart } from "@/components/survey-analytics/TrendMetricLineChart";
import { DeltaPill } from "@/components/survey-analytics/DeltaPill";
import { MetricComparisonFooter } from "@/components/survey-analytics/MetricComparisonFooter";
import { AIInsightCard } from "@/components/ai/AIInsightCard";
import { Badge } from "@/components/ui/badge";
import { Chip } from "@/components/ai-interaction/Chip";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import {
  COMPARATIVE_FAVORABILITY_DATA,
  COMPARATIVE_PARTICIPATION_DATA,
  COMPARATIVE_SURVEYS_LIST,
  COMPARATIVE_NPS_DATA,
  COMPARATIVE_DIMENSIONS_DATA,
  COMPARATIVE_QUESTIONS_DATA,
  CULTURA_DIMENSIONS_DATA,
  CULTURA_QUESTIONS_DATA,
  CULTURA_FAVORABILITY_DATA,
  CULTURA_PARTICIPATION_DATA,
  CULTURA_NPS_DATA,
  CULTURA_SENTIMENT_DATA,
  COMPARATIVE_SENTIMENT_DATA,
  COMPARATIVE_COMMENTS_DETAIL,
  COMPARATIVE_AI_INSIGHTS,
  CULTURA_COMMENTS_DETAIL,
  CULTURA_AI_INSIGHTS,
  DEMOGRAPHIC_OPTIONS,
  SEGMENT_CATEGORIES
} from "@/mocks/comparativeMocks";
import {
  HEATMAP_SEGMENTS,
  HEATMAP_DIMENSIONS_DATA,
  getHeatmapTone,
  formatDelta,
  getHeatmapData
} from "@/mocks/heatmapDimensions";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import { MultiSelect } from "@/components/forms/MultiSelect";
import { SingleSelect } from "@/components/forms/SingleSelect";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from '@/components/ui/separator';

// Helper function to format percentages with max 3 decimal places, removing unnecessary zeros
const formatPercentage = (value: number | string): string | number => {
  if (typeof value === 'string') {
    value = parseFloat(value);
  }
  if (isNaN(value)) return 0;

  // Round to 3 decimal places
  const rounded = Math.round(value * 1000) / 1000;

  // If the number is whole, return as integer
  if (rounded === Math.floor(rounded)) {
    return Math.floor(rounded);
  }

  // Convert to string and remove trailing zeros
  return parseFloat(rounded.toFixed(3)).toString();
};

interface ComparativeDashboardProps {
  onExit: () => void;
  onEditSelection?: (step?: number) => void;
  baseId?: string;
  comparativeIds?: string[];
  type?: string;
}

const Sparkline = ({ data }: { data: number[] }) => {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 80;
  const height = 24;
  const padding = 2;

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = padding + (height - 2 * padding) - ((val - min) / range) * (height - 2 * padding);
    return { x, y };
  });

  const pathData = points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ');
  const areaData = `${pathData} L ${width} ${height} L 0 ${height} Z`;

  return (
    <svg width={width} height={height} className="overflow-visible" style={{ filter: 'drop-shadow(0px 2px 4px hsl(var(--color-brand-hsl) / 0.1))' }}>
      <defs>
        <linearGradient id="sparkGradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaData} fill="url(#sparkGradient)" />
      <path d={pathData} fill="none" stroke="var(--color-brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const SentimentDistributionBar = ({ positive, neutral, negative, total, showTotal = true, compact = false }: { positive: number, neutral: number, negative: number, total: number, showTotal?: boolean, compact?: boolean }) => {
  const p = positive || 0;
  const n = neutral || 0;
  const neg = negative || 0;

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", compact ? "min-w-[100px]" : "min-w-[140px]")}>
      <div className={cn("w-full bg-surface-muted/50 rounded-full overflow-hidden flex shadow-inner", compact ? "h-2" : "h-3")}>
        <div
          className="h-full bg-status-positive transition-all duration-1000 shadow-[inset_0_1px_1px_var(--color-text-inverse)/0.3]"
          style={{ width: `${p}%` }}
        />
        <div
          className="h-full bg-muted-foreground/40 transition-all duration-1000"
          style={{ width: `${n}%` }}
        />
        <div
          className="h-full bg-status-negative transition-all duration-1000 shadow-[inset_0_1px_1px_var(--color-text-inverse)/0.2]"
          style={{ width: `${neg}%` }}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={cn("font-bold tracking-tight", compact ? "text-xs" : "text-xs", "text-status-positive")}>{formatPercentage(p)}%</span>
          {!compact && (
            <span className="text-sm font-bold text-text-secondary/50 tracking-tight">Favorabilidad</span>
          )}
        </div>
        {showTotal && (
          <span className={cn("font-bold text-text-secondary/40 tracking-tight", compact ? "text-xs" : "text-sm")}>n={total}</span>
        )}
      </div>
    </div>
  );
};


export const ComparativeDashboard: React.FC<ComparativeDashboardProps> = ({
  onExit,
  onEditSelection,
  baseId,
  comparativeIds = [],
  type
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeViewTop, setActiveViewTop] = React.useState<'detalle' | 'tendencia'>('detalle');
  const [activeViewTopPart, setActiveViewTopPart] = React.useState<'detalle' | 'tendencia'>('detalle');
  const [activeViewTopNPS, setActiveViewTopNPS] = React.useState<'detalle' | 'tendencia'>('detalle');
  const [showTopCards, setShowTopCards] = React.useState(true);

  // Dimensions Tab State
  const [selectedDimensions, setSelectedDimensions] = React.useState<string[]>(() => {
    const data = type === 'Cultura' ? CULTURA_DIMENSIONS_DATA : COMPARATIVE_DIMENSIONS_DATA;
    return data.map(d => d.name);
  });
  const [sortCriteria, setSortCriteria] = React.useState<string>("mejora");

  const sortLabels: Record<string, string> = {
    mejora: "Mayor mejora",
    caida: "Mayor caída",
    alto: "Puntaje más alto",
    respuestas: "Más respuestas"
  };
  const [activeTab, setActiveTab] = React.useState<string>('dimensiones');
  const [dimensionsView, setDimensionsView] = React.useState<'table' | 'heatmap'>('table');
  const [selectedDimensionDetail, setSelectedDimensionDetail] = React.useState<string | null>(null);
  const [isCommentDetailOpen, setIsCommentDetailOpen] = React.useState(false);
  const [drawerSentimentTab, setDrawerSentimentTab] = React.useState('detalle');
  const [heatmapSegment, setHeatmapSegment] = React.useState<string>('Área');

  // Export Dialog State
  const [isExportDialogOpen, setIsExportDialogOpen] = React.useState(false);
  const [exportFormat, setExportFormat] = React.useState<'pdf' | 'csv'>('pdf');
  const [exportWithFilters, setExportWithFilters] = React.useState(true);

  // Share Dialog State
  const [isShareDialogOpen, setIsShareDialogOpen] = React.useState(false);
  const [shareWithFilters, setShareWithFilters] = React.useState(true);
  const [shareLink, setShareLink] = React.useState('');

  // questions Tab State
  // Questions Tab State
  const [selectedQuestionDimensions, setSelectedQuestionDimensions] = React.useState<string[]>(() => {
    const data = type === 'Cultura' ? CULTURA_DIMENSIONS_DATA : COMPARATIVE_DIMENSIONS_DATA;
    return data.map(d => d.name);
  });
  const [sortQuestionsCriteria, setSortQuestionsCriteria] = React.useState<string>("mejora");

  // Sentiment Tab State
  // Sentiment Tab State
  const [selectedSentimentDimensions, setSelectedSentimentDimensions] = React.useState<string[]>(() => {
    const data = type === 'Cultura' ? CULTURA_DIMENSIONS_DATA : COMPARATIVE_DIMENSIONS_DATA;
    return data.map(d => d.name);
  });
  const [sortSentimentCriteria, setSortSentimentCriteria] = React.useState<string>("mejora");

  // --- Helper for Chronological Sorting ---
  const getSurveyScore = React.useCallback((item: any) => {
    if (!item) return 0;
    const yearMatch = item.name.match(/202\d/);
    const year = yearMatch ? parseInt(yearMatch[0]) : 0;
    const quarterMatch = item.name.match(/Q(\d)/);
    const quarter = quarterMatch ? parseInt(quarterMatch[1]) : 0;
    const monthMap: Record<string, number> = {
      'ene': 1, 'feb': 2, 'mar': 3, 'abr': 4, 'may': 5, 'jun': 6,
      'jul': 7, 'ago': 8, 'sep': 9, 'oct': 10, 'nov': 11, 'dic': 12
    };
    const monthStr = item.startDate?.split(' ')[1]?.toLowerCase();
    const month = monthMap[monthStr] || 0;
    return year * 1000 + quarter * 100 + month;
  }, []);

  // --- Dynamic Survey Selection Logic ---
  const allSurveys = React.useMemo(() => {
    return COMPARATIVE_SURVEYS_LIST
      .filter(s => s.type === type)
      .sort((a, b) => getSurveyScore(b) - getSurveyScore(a));
  }, [type, getSurveyScore]);

  const baseSurvey = React.useMemo(() => {
    if (baseId) {
      return allSurveys.find(s => s.id === baseId) || allSurveys[0];
    }
    return allSurveys[0];
  }, [baseId, allSurveys]);

  const comparisonSurveys = React.useMemo(() => {
    const list = (comparativeIds || [])
      .filter(id => id !== baseSurvey?.id)
      .map(id => COMPARATIVE_SURVEYS_LIST.find(s => s.id === id))
      .filter(Boolean) as typeof COMPARATIVE_SURVEYS_LIST;
    return [...list].sort((a, b) => getSurveyScore(b) - getSurveyScore(a));
  }, [comparativeIds, baseSurvey, getSurveyScore]);

  const columns = React.useMemo(() => {
    if (!baseSurvey) return [];
    const allSelected = [baseSurvey, ...comparisonSurveys];

    // Count occurrences of each year/suffix to identify collisions
    const suffixCounts: Record<string, number> = {};
    allSelected.forEach(s => {
      const suffix = s.name.includes(' - ') ? s.name.split(' - ').pop() || '' : s.name;
      suffixCounts[suffix] = (suffixCounts[suffix] || 0) + 1;
    });

    const getShortLabel = (s: any) => {
      const suffix = s.name.includes(' - ') ? s.name.split(' - ').pop() || '' : s.name;
      // If there's a collision, prepend the first word of the name to differentiate
      if (suffixCounts[suffix] > 1) {
        const firstWord = s.name.split(' ')[0];
        return `${firstWord} ${suffix}`;
      }
      return suffix;
    };

    const cols = [];
    cols.push({
      id: baseSurvey.id,
      label: baseSurvey.name,
      shortLabel: getShortLabel(baseSurvey),
      isBase: true,
      dataKey: 'currentScore',
      dimKey: 'currentScore',
      quesKey: 'currentScore',
      sentKey: 'currentScore',
      responses: parseInt(baseSurvey.participants || "450")
    });

    comparisonSurveys.forEach((survey, index) => {
      const key = `p${index + 1}`;
      cols.push({
        id: survey.id,
        label: survey.name,
        shortLabel: getShortLabel(survey),
        isBase: false,
        dataKey: key,
        dimKey: key,
        quesKey: key,
        sentKey: key,
        responses: parseInt(survey.participants || "400")
      });
    });
    return cols;
  }, [baseSurvey, comparisonSurveys]);

  const baseColumn = React.useMemo(() => columns.find(c => c.isBase), [columns]);

  // --- Core Data Sources ---
  const dimensionsData = React.useMemo(() => {
    return type === 'Cultura' ? CULTURA_DIMENSIONS_DATA : COMPARATIVE_DIMENSIONS_DATA;
  }, [type]);

  const questionsData = React.useMemo(() => {
    return type === 'Cultura' ? CULTURA_QUESTIONS_DATA : COMPARATIVE_QUESTIONS_DATA;
  }, [type]);

  const sentimentSource = React.useMemo(() => {
    const raw = type === 'Cultura' ? CULTURA_SENTIMENT_DATA : COMPARATIVE_SENTIMENT_DATA;
    return raw.map(item => {
      const newItem: any = { ...item };

      columns.forEach((col, index) => {
        if (type === 'Cultura') {
          // Map Cultura keys based on column order (most recent first)
          const keys = ['currentScore', 'p1', 'p2', 'p3', 'p4', 'p5'];
          const targetKey = keys[index] || 'currentScore';
          if ((item as any)[targetKey]) {
            newItem[col.sentKey] = (item as any)[targetKey];
          }
        } else {
          // Map Clima IDs to mock keys with improved fallback
          const mockKeysMapping: Record<string, string> = {
            'c2': 'q4_2024',
            'c3': 'q3_2024',
            'c4': 'q2_2024',
            'c5': 'q1_2024',
            'base-clima': 'q4_2024'
          };

          const keys = ['q4_2024', 'q3_2024', 'q2_2024', 'q1_2024', 'q4_2023'];
          const targetKey = mockKeysMapping[col.id] || keys[index] || 'q4_2024';

          if ((item as any)[targetKey]) {
            newItem[col.sentKey] = (item as any)[targetKey];
          } else if ((item as any)[col.id]) {
            newItem[col.sentKey] = (item as any)[col.id];
          }
        }
      });

      // Safety defaults
      if (!newItem.currentScore) newItem.currentScore = { positive: 0, neutral: 0, negative: 0, total: 0 };
      return newItem;
    });
  }, [type, columns]);

  const commentsSource = React.useMemo(() => {
    return type === 'Cultura' ? CULTURA_COMMENTS_DETAIL : COMPARATIVE_COMMENTS_DETAIL;
  }, [type]);

  const aiInsightsSource = React.useMemo(() => {
    const base = type === 'Cultura' ? CULTURA_AI_INSIGHTS : COMPARATIVE_AI_INSIGHTS;
    if (selectedDimensionDetail) {
      return {
        ...base,
        summary: `Análisis de IA para ${selectedDimensionDetail}: ${base.summary}`,
        featuredInsights: Object.fromEntries(
          Object.entries(base.featuredInsights).map(([k, v]) => [k, v.replace('La cultura de UBITS', `La dimensión de ${selectedDimensionDetail}`)])),
        recurrentThemes: Object.fromEntries(
          Object.entries(base.recurrentThemes).map(([k, v]) => [k, (v as any[]).map(t => ({ ...t, desc: `${t.desc} en ${selectedDimensionDetail}` }))]))
      };
    }
    return base;
  }, [type, selectedDimensionDetail]);

  const filteredComments = React.useMemo(() => {
    if (!selectedDimensionDetail) return commentsSource;
    return commentsSource.filter(c => c.dimension === selectedDimensionDetail);
  }, [selectedDimensionDetail, commentsSource]);

  // Tab-specific Filtering State
  type TabId = 'resumen' | 'favorabilidad' | 'participacion' | 'nps' | 'dimensionesTable' | 'dimensionesHeatmap' | 'preguntas' | 'comentarios';

  interface TabFilters {
    demographics: Record<string, string[]>;
    segments: Array<{ variable: string; values: string[] }>;
  }

  const initialDemographics = {
    area: [], lider: [], rol: [], ciudad: [], pais: [],
    edad: [], sexo: [], columnaA: [], columnaB: []
  };

  const initialSegments = [{ variable: '', values: [] }];

  const [tabFilters, setTabFilters] = React.useState<Record<TabId, TabFilters>>({
    resumen: { demographics: { ...initialDemographics }, segments: [...initialSegments] },
    favorabilidad: { demographics: { ...initialDemographics }, segments: [...initialSegments] },
    participacion: { demographics: { ...initialDemographics }, segments: [...initialSegments] },
    nps: { demographics: { ...initialDemographics }, segments: [...initialSegments] },
    dimensionesTable: { demographics: { ...initialDemographics }, segments: [...initialSegments] },
    dimensionesHeatmap: { demographics: { ...initialDemographics }, segments: [...initialSegments] },
    preguntas: { demographics: { ...initialDemographics }, segments: [...initialSegments] },
    comentarios: { demographics: { ...initialDemographics }, segments: [...initialSegments] },
  });

  const [activeFilterTab, setActiveFilterTab] = React.useState<TabId>('favorabilidad');
  const [isFiltersDrawerOpen, setIsFiltersDrawerOpen] = React.useState(false);
  const [isSegmentDrawerOpen, setIsSegmentDrawerOpen] = React.useState(false);

  // Helper to get active filters count for a specific tab
  const getActiveFiltersCount = React.useCallback((tabId: TabId) => {
    const demCount = Object.values(tabFilters[tabId].demographics).reduce((acc, curr) => acc + (curr?.length || 0), 0);
    const segCount = tabFilters[tabId].segments.filter(s => s.variable && s.values.length > 0).length;
    return { demographics: demCount, segments: segCount, total: demCount + segCount };
  }, [tabFilters]);

  const updateTabDemographics = (tabId: TabId, category: string, values: string[]) => {
    setTabFilters(prev => ({
      ...prev,
      [tabId]: {
        ...prev[tabId],
        demographics: {
          ...prev[tabId].demographics,
          [category]: values
        }
      }
    }));
  };

  const updateTabSegments = (tabId: TabId, segments: any[]) => {
    setTabFilters(prev => ({
      ...prev,
      [tabId]: {
        ...prev[tabId],
        segments
      }
    }));
  };

  const clearTabFilters = (tabId: TabId) => {
    setTabFilters(prev => ({
      ...prev,
      [tabId]: {
        demographics: { ...initialDemographics },
        segments: [...initialSegments]
      }
    }));
  };

  const visibleTabId = React.useMemo(() => {
    const id = activeTab === 'dimensiones'
      ? (dimensionsView === 'heatmap' ? 'dimensionesHeatmap' : 'dimensionesTable')
      : activeTab as TabId;
    console.log('[DEBUG] visibleTabId calculated:', id, 'activeTab:', activeTab, 'dimensionsView:', dimensionsView);
    return id;
  }, [activeTab, dimensionsView]);

  const toggleDimension = (name: string) => {
    setSelectedDimensions(prev =>
      prev.includes(name)
        ? prev.filter(d => d !== name)
        : [...prev, name]
    );
  };

  const selectAllDimensions = () => {
    setSelectedDimensions(dimensionsData.map(d => d.name));
  };

  const deselectAllDimensions = () => {
    setSelectedDimensions([]);
  };

  const selectAllQuestionDimensions = () => {
    setSelectedQuestionDimensions(dimensionsData.map(d => d.name));
  };

  const deselectAllQuestionDimensions = () => {
    setSelectedQuestionDimensions([]);
  };

  const selectAllSentimentDimensions = () => {
    setSelectedSentimentDimensions(dimensionsData.map(d => d.name));
  };

  const deselectAllSentimentDimensions = () => {
    setSelectedSentimentDimensions([]);
  };

  // Filter and Sort Logic
  const filteredAndSortedDimensions = React.useMemo(() => {
    let result = dimensionsData.filter(d => selectedDimensions.includes(d.name));

    // Apply Search Filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(d =>
        d.name.toLowerCase().includes(lowerSearch) ||
        (d.description && d.description.toLowerCase().includes(lowerSearch))
      );
    }

    // Get active demographics filters for this tab
    const tabFiltersData = tabFilters[visibleTabId as TabId];
    const activeDemographics = Object.entries(tabFiltersData?.demographics || {})
      .filter(([key, values]) => values && values.length > 0)
      .map(([key, values]) => ({ category: key, values }));

    // DEBUG: Log what's happening
    if (visibleTabId === 'dimensionesTable') {
      console.log('[DEBUG] visibleTabId:', visibleTabId);
      console.log('[DEBUG] tabFiltersData:', tabFiltersData);
      console.log('[DEBUG] activeDemographics:', activeDemographics);
    }

    // Apply demographic filtering
    if (activeDemographics.length > 0) {
      result = result.map(dim => {
        let scoreAdjustment = 0;
        let responseMultiplier = 1;

        // Calculate adjustments based on selected demographics
        activeDemographics.forEach(({ category, values }) => {
          // Different impact based on demographic category
          const categoryHash = category.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
          const valuesHash = values.join('').split('').reduce((a, c) => a + c.charCodeAt(0), 0);
          const combinedHash = (categoryHash + valuesHash + dim.name.length) % 100;

          // Score adjustment: -5 to -25 based on filters
          scoreAdjustment += Math.floor((combinedHash / 100) * 20) + 5;

          // Response count changes: multiply by 0.6 to 0.95
          responseMultiplier *= (0.6 + (combinedHash % 35) / 100);
        });

        // Cap adjustments
        scoreAdjustment = Math.min(scoreAdjustment, 35);
        responseMultiplier = Math.max(responseMultiplier, 0.4);

        return {
          ...dim,
          currentScore: Math.max(0, Math.min(100, dim.currentScore - scoreAdjustment)),
          responses: Math.floor((dim.responses || 0) * responseMultiplier),
          delta: Number((dim.delta - (scoreAdjustment / 3)).toFixed(1)),
          filtered: true
        };
      });
    }

    switch (sortCriteria) {
      case "mejora":
        result.sort((a, b) => (b.delta ?? -999) - (a.delta ?? -999));
        break;
      case "caida":
        result.sort((a, b) => (a.delta ?? 999) - (b.delta ?? 999));
        break;
      case "alto":
        result.sort((a, b) => (b.currentScore ?? 0) - (a.currentScore ?? 0));
        break;
      case "respuestas":
        result.sort((a, b) => (b.responses || 0) - (a.responses || 0));
        break;
    }
    return result;
  }, [selectedDimensions, sortCriteria, tabFilters, visibleTabId, searchTerm]);

  // Questions Filter and Sort Logic
  const filteredAndSortedQuestions = React.useMemo(() => {
    let result = questionsData.filter(q => selectedQuestionDimensions.includes(q.dimension));

    // Apply Search Filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(q =>
        q.question.toLowerCase().includes(lowerSearch) ||
        q.dimension.toLowerCase().includes(lowerSearch)
      );
    }

    // Apply demographic filtering (simulation)
    const { total: filterCount } = getActiveFiltersCount('preguntas');
    if (filterCount > 0) {
      result = result.map(q => {
        const factor = (filterCount * 2.5) % 8;
        // Apply factor to currentScore and p1-p4
        const adjust = (val: number) => Math.max(0, Math.min(100, val - factor));

        return {
          ...q,
          currentScore: adjust(q.currentScore),
          p1: adjust(q.p1),
          p2: adjust(q.p2),
          p3: adjust(q.p3),
          p4: adjust(q.p4),
          delta: Number((adjust(q.currentScore) - adjust(q.p1)).toFixed(1)),
          responses: Math.floor(q.responses * (0.7 + (factor % 3) / 10))
        };
      });
    }

    // Apply Sorting
    switch (sortQuestionsCriteria) {
      case "mejora":
        result.sort((a, b) => b.delta - a.delta);
        break;
      case "caida":
        result.sort((a, b) => a.delta - b.delta);
        break;
      case "alto":
        result.sort((a, b) => b.currentScore - a.currentScore);
        break;
      case "respuestas":
        result.sort((a, b) => b.responses - a.responses);
        break;
    }
    return result;
  }, [selectedQuestionDimensions, sortQuestionsCriteria, searchTerm, getActiveFiltersCount]);


  const filteredAndSortedSentiment = React.useMemo(() => {
    let result = sentimentSource.filter(s => selectedSentimentDimensions.includes(s.dimension));

    // Apply Search Filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(s =>
        s.dimension.toLowerCase().includes(lowerSearch)
      );
    }

    // Apply demographic filtering (simulation)
    const { total: filterCount } = getActiveFiltersCount('comentarios');
    if (filterCount > 0) {
      result = result.map(s => {
        const factor = (filterCount * 3) % 10;

        // Helper to shift nested data
        const shiftData = (data: any) => {
          if (!data) return data;
          const newPos = Math.max(0, data.positive - factor);
          const newNeg = Math.min(100, data.negative + (factor / 2));
          return {
            ...data,
            positive: newPos,
            negative: newNeg,
            neutral: 100 - (newPos + newNeg),
            total: Math.floor(data.total * (0.8 + (factor % 2) / 10))
          };
        };

        const shifted_current = shiftData(s.currentScore);
        const shifted_p1 = shiftData(s.p1);
        return {
          ...s,
          currentScore: shifted_current,
          p1: shifted_p1,
          p2: shiftData(s.p2),
          p3: shiftData(s.p3),
          p4: shiftData(s.p4),
          delta: Number((shifted_current.positive - shifted_p1.positive).toFixed(1))
        };
      });
    } else {
      result = result.map(s => ({
        ...s,
        delta: Number(((s.currentScore?.positive || 0) - (s.p1?.positive || 0)).toFixed(1))
      }));
    }

    // Apply Sorting
    switch (sortSentimentCriteria) {
      case "mejora":
        result.sort((a, b) => b.delta - a.delta);
        break;
      case "caida":
        result.sort((a, b) => a.delta - b.delta);
        break;
      case "alto":
        result.sort((a, b) => b.currentScore.positive - a.currentScore.positive);
        break;
      case "respuestas":
        result.sort((a, b) => b.currentScore.total - a.currentScore.total);
        break;
    }
    return result;
  }, [selectedSentimentDimensions, sortSentimentCriteria, searchTerm, getActiveFiltersCount]);


  // Heatmap Data Logic
  const heatmapData = React.useMemo(() => {
    // 1. Determine which segments (columns) to show
    const variable = heatmapSegment;

    const filterKeyMap: Record<string, string> = {
      'Área': 'area',
      'Líder': 'lider',
      'Rol': 'rol',
      'Ciudad': 'ciudad',
      'País': 'pais',
      'Edad': 'edad',
      'Sexo': 'sexo',
      'Columna A': 'columnaA',
      'Columna B': 'columnaB',
    };

    const filterKey = filterKeyMap[variable] || 'area';
    const activeFiltersForThisVar = tabFilters.dimensionesHeatmap.demographics[filterKey] || [];
    const allPossibleValues = DEMOGRAPHIC_OPTIONS[filterKey as keyof typeof DEMOGRAPHIC_OPTIONS] || [];

    // Cross-filtering logic
    let valuesToShow = allPossibleValues;
    const currentDemographics = tabFilters.dimensionesHeatmap.demographics;
    const currentSegments = tabFilters.dimensionesHeatmap.segments;

    // Case 2: If the FILTER applied is Lider or Rol, we strictly restrict the segments shown
    // We check both the standard demographics object AND the specialized segments array used in Heatmap
    const hasRestrictedDemographic = (currentDemographics.lider?.length || 0) > 0 || (currentDemographics.rol?.length || 0) > 0;
    const hasRestrictedSegment = currentSegments.some(s => (s.variable === 'Líder' || s.variable === 'Rol') && s.values.length > 0);

    const isRestrictedFilter = hasRestrictedDemographic || hasRestrictedSegment;

    if (isRestrictedFilter) {
      // Collect all restricting values from both sources
      const restrictedLiderValues = [
        ...(currentDemographics.lider || []),
        ...currentSegments.filter(s => s.variable === 'Líder').flatMap(s => s.values)
      ];
      const restrictedRolValues = [
        ...(currentDemographics.rol || []),
        ...currentSegments.filter(s => s.variable === 'Rol').flatMap(s => s.values)
      ];

      const restrictingValues = [...restrictedLiderValues, ...restrictedRolValues];

      // If we are "Viewing by" the same thing we are filtering, the filter itself will handle it at line 570
      // Otherwise, we simulate the "belonging" relationship
      if (variable !== 'Líder' && variable !== 'Rol') {
        valuesToShow = allPossibleValues.filter(val => {
          return restrictingValues.some(filterVal => {
            const filterHash = filterVal.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const valHash = val.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            return (filterHash + valHash) % 5 === 0;
          });
        });
      }
    }


    // Explicit demographic filter for the current variable (if user manually selected specific areas to see)
    if (activeFiltersForThisVar.length > 0) {
      valuesToShow = activeFiltersForThisVar;
    }

    const segments = valuesToShow.map(v => ({
      id: v.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '_'),
      label: v
    }));

    // Filter dimensions by search term
    const visibleDimensions = dimensionsData.filter(d => {
      if (!searchTerm) return true;
      const lowerSearch = searchTerm.toLowerCase();
      return d.name.toLowerCase().includes(lowerSearch) ||
        (d.description && d.description.toLowerCase().includes(lowerSearch));
    });

    // 2. Count active heatmap segments (local filters)
    const activeHeatmapFilters = tabFilters.dimensionesHeatmap.segments.filter(s => s.variable && s.values.length > 0);
    const hasHeatmapFilters = activeHeatmapFilters.length > 0;
    const { total: totalFilters } = getActiveFiltersCount('dimensionesHeatmap');

    // 3. Build the data matrix
    const currentData = visibleDimensions.map((dimBase) => {
      const segmentsData: Record<string, any> = {};
      
      // Heuristic for "new" dimension: check if it lacks historical survey keys
      // In a real app, this would be determined by the data source
      const isNewDimension = (dimBase as any).p1 === null && (dimBase as any).p2 === null;

      if (!isNewDimension) {
        segments.forEach((seg) => {
          const filtersStr = JSON.stringify(tabFilters.dimensionesHeatmap.demographics) +
            JSON.stringify(activeHeatmapFilters) +
            heatmapSegment +
            dimBase.name +
            seg.label;

          let hash = 0;
          for (let i = 0; i < filtersStr.length; i++) {
            hash = ((hash << 5) - hash) + filtersStr.charCodeAt(i);
            hash |= 0;
          }
          hash = Math.abs(hash);

          let delta = (hash % 31) - 15; // -15 to +15
          let n = 20 + (hash % 200);

          if (totalFilters > 0 || hasHeatmapFilters) {
            const shiftFactor = (totalFilters + activeHeatmapFilters.length) * 3;
            delta = delta + (hash % 11) - 5 + (shiftFactor % 7);
          }

          segmentsData[seg.id] = {
            delta,
            n,
            status: (type === 'Cultura' && hash % 10 === 0) ? 'private' : 'active'
          };
        });
      }

      return {
        ...dimBase,
        segments: segmentsData
      };
    });

    return { segments, data: currentData };
  }, [heatmapSegment, tabFilters.dimensionesHeatmap, searchTerm, getActiveFiltersCount]);



  // Lookup survey names
  const selectedComparativeSurveys = COMPARATIVE_SURVEYS_LIST.filter(s => comparativeIds.includes(s.id));

  // 1. Simulation Helper for Demographic Filters
  const applyFilters = React.useCallback((data: any, filterCount: number, isNPS: boolean = false) => {
    // ALWAYS deep clone to avoid mutating original mock objects
    const cloned = JSON.parse(JSON.stringify(data));
    
    if (filterCount === 0) return cloned;

    const factor = (filterCount * 3.5) % 12; // deterministic shift
    const minVal = isNPS ? -100 : 0;

    // Adjust mainMetric (High level summary)
    if (cloned.mainMetric) {
      const m = cloned.mainMetric;
      // Increased impact for more visibility as requested by user
      const shift = filterCount * 4.5;
      m.value = Number((m.value - shift).toFixed(1));
      m.delta = Number((m.delta - (shift / 2.5)).toFixed(1));
      m.trend = m.delta >= 0 ? 'up' : 'down';
    }

    // Adjust comparisons (Summary Footer)
    // Skip for Cultura: comparisons are rebuilt from newDistribution in getProcessedMetricData
    if (cloned.comparisons && type !== 'Cultura') {
      cloned.comparisons = cloned.comparisons.map((c: any, idx: number) => {
        const shift = factor + (idx * 1.5);
        const newValue = Math.round(Math.max(minVal, Math.min(100, c.value - shift)));
        return {
          ...c,
          value: newValue,
          delta: Number((c.delta - (shift / 4)).toFixed(1)),
          trend: (c.delta - (shift / 4)) >= 0 ? 'up' : 'down'
        };
      });
    }

    // Adjust distributionByPeriod (Stacked Bars)
    if (cloned.distributionByPeriod) {
      cloned.distributionByPeriod = cloned.distributionByPeriod.map((p: any) => {
        const pFactor = (filterCount * 1.8) + (p.period.length % 3);
        let posAdjust = Number(pFactor.toFixed(1));

        const updatedSegments = p.segments.map((s: any) => {
          if (s.tone === 'positive' || s.tone === 'promoter') {
            const newVal = Math.max(0, s.value - posAdjust);
            const rounded = Number(formatPercentage(newVal));
            return { ...s, value: rounded, percentage: rounded };
          }
          if (s.tone === 'negative' || s.tone === 'detractor') {
            const newVal = Math.min(100, s.value + posAdjust);
            const rounded = Number(formatPercentage(newVal));
            return { ...s, value: rounded, percentage: rounded };
          }
          return s;
        });

        // Normalize to 100%
        const total = updatedSegments.reduce((acc: number, s: any) => acc + s.value, 0);
        if (total !== 100 && total > 0) {
          updatedSegments[0].value = Number(formatPercentage(updatedSegments[0].value + (100 - total)));
        }

        return { ...p, segments: updatedSegments };
      });
    }

    // Adjust trendData (Line Charts)
    if (cloned.trendData && cloned.trendData.data) {
      cloned.trendData.data = cloned.trendData.data.map((item: any, idx: number) => {
        const tShift = factor + (idx * 0.8);
        const newValue = typeof item === 'number'
          ? Math.round(Math.max(minVal, Math.min(100, item - tShift)))
          : Math.round(Math.max(minVal, Math.min(100, item.value - tShift)));

        if (typeof item === 'number') {
          return newValue;
        }
        return { ...item, value: newValue };
      });
    }

    // ADDED: Logic for "No responses" in Cultura to simulate specific demographic cases (e.g. Leader Juan Perez with 0 responses)
    if (type === 'Cultura' && filterCount > 0) {
      // For demonstration, we'll make the second survey (index 1) have no responses
      if (cloned.distributionByPeriod && cloned.distributionByPeriod.length > 1) {
        const targetIdx = 1; // Simulation: second survey has no data for this specific filter
        console.log('[DEBUG applyFilters-Cultura] Marking survey as no_responses. targetIdx:', targetIdx, 'filterCount:', filterCount);
        cloned.distributionByPeriod[targetIdx] = {
          ...cloned.distributionByPeriod[targetIdx],
          status: 'no_responses',
          total: 0,
          value: null,
          segments: cloned.distributionByPeriod[targetIdx].segments.map((s: any) => ({ 
            ...s, 
            value: 0, 
            percentage: 0 
          }))
        };
        console.log('[DEBUG applyFilters-Cultura] Updated distributionByPeriod after no_responses:', cloned.distributionByPeriod[targetIdx]);
      }
      
      // Also adjust trendData to show a gap/null
      if (cloned.trendData && cloned.trendData.data && cloned.trendData.data.length > 1) {
        if (typeof cloned.trendData.data[1] === 'number') {
          cloned.trendData.data[1] = null;
        } else {
          cloned.trendData.data[1] = { ...cloned.trendData.data[1], value: null };
        }
      }
    }

    return cloned;
  }, [type]);

  // Helper to process metric data for a specific tab
  const getProcessedMetricData = React.useCallback((tabId: TabId, mockData: any, isNPS: boolean = false) => {
    // For Cultura, use filters from resumen (global) for all tabs, not per-tab filters
    const effectiveTabId = type === 'Cultura' ? 'resumen' : tabId;
    const filterCount = getActiveFiltersCount(effectiveTabId).total;
    console.log('[DEBUG getProcessedMetricData] tabId:', tabId, 'effectiveTabId:', effectiveTabId, 'filterCount:', filterCount);
    const rawData = applyFilters(mockData, filterCount, isNPS);
    console.log('[DEBUG getProcessedMetricData] tabId:', tabId, 'filterCount:', filterCount, 'rawData.distributionByPeriod:', rawData?.distributionByPeriod);

    if (rawData?.distributionByPeriod) {
      // Build distribution based on selected columns
      const newDistribution = columns.map((col, index) => {
        const mockItem = rawData.distributionByPeriod.find((item: any) =>
          (item.surveyId && item.surveyId === col.id) ||
          item.period.includes(col.dataKey || '') || 
          (item.period.includes('BASE') && col.isBase)
        ) || rawData.distributionByPeriod[index % rawData.distributionByPeriod.length];

        const newItem = {
          ...mockItem,
          surveyId: col.id, // Explicitly pass surveyId from column
          period: col.label,
          total: col.responses,
          isBase: col.isBase,
          status: mockItem?.status // Preserve no_responses status
        };
        console.log('[DEBUG newDistribution] col:', col.label, 'mockItem.status:', mockItem?.status, 'newItem.status:', newItem.status);
        return newItem;
      });
      
      rawData.distributionByPeriod = newDistribution;

      // Calculate deltas relative to BASE
      const baseDist = newDistribution.find(d => d.isBase);

      if (isNPS) {
        const getScore = (item: any) => {
          const pos = item?.segments.find((s: any) => s.tone === 'positive')?.percentage || 0;
          const neg = item?.segments.find((s: any) => s.tone === 'negative')?.percentage || 0;
          return Math.round(pos - neg);
        };
        const baseScore = getScore(baseDist);

        // Update comparisons for footer
        rawData.comparisons = columns.map((col) => {
          const distItem = newDistribution.find(d => d.period === col.label);
          const isNoData = distItem?.status === 'no_responses';
          const currentScore = isNoData ? 0 : getScore(distItem);
          
          let delta = undefined;
          if (!col.isBase && !isNoData) {
            // Compare non-base to the base survey
            delta = Number((currentScore - baseScore).toFixed(1));
          }

          return {
            label: col.label,
            value: Math.round(currentScore),
            delta: delta,
            trend: delta !== undefined ? (delta >= 0 ? 'up' : 'down') : 'neutral',
            noData: isNoData
          };
        });

        // Ensure trendData is consistent and chronological
        if (rawData.trendData?.data) {
          const monthMap: Record<string, number> = { 'ene': 0, 'feb': 1, 'mar': 2, 'abr': 3, 'may': 4, 'jun': 5, 'jul': 6, 'ago': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dic': 11 };
          
          const trendData = [...newDistribution]
            .sort((a, b) => {
              const sA = COMPARATIVE_SURVEYS_LIST.find(s => s.id === a.surveyId);
              const sB = COMPARATIVE_SURVEYS_LIST.find(s => s.id === b.surveyId);
              if (!sA || !sB) return 0;
              
              const parseDate = (dStr: string) => {
                const parts = dStr.split(' ');
                const day = parseInt(parts[0]);
                const month = monthMap[parts[1].toLowerCase()] || 0;
                const year = parseInt(parts[2]);
                return new Date(year, month, day).getTime();
              };
              
              return parseDate(sA.startDate) - parseDate(sB.startDate);
            })
            .map((item) => {
              const score = getScore(item);
              const colInfo = columns.find(c => c.id === item.surveyId);
              return {
                label: colInfo?.shortLabel || item.period,
                value: item.status === 'no_responses' ? null : score,
                total: item.total || 0
              };
            });
            
          rawData.trendData.data = trendData;
        }
      } else {
        const baseVal = baseDist?.segments.find((s: any) => s.tone === 'positive')?.percentage || 0;

        // Update comparisons for footer
        rawData.comparisons = columns.map((col) => {
          const distItem = newDistribution.find(d => d.period === col.label);
          const isNoData = distItem?.status === 'no_responses';
          const currentVal = isNoData ? 0 : (distItem?.segments.find((s: any) => s.tone === 'positive')?.percentage || 0);
          
          let delta = undefined;
          if (!col.isBase && !isNoData) {
            // Compare non-base to the base survey
            delta = Number((currentVal - baseVal).toFixed(1));
          }

          return {
            label: col.label,
            value: Math.round(currentVal),
            delta: delta,
            trend: delta !== undefined ? (delta >= 0 ? 'up' : 'down') : 'neutral',
            noData: isNoData
          };
        });

        // Ensure trendData is consistent and chronological
        if (rawData.trendData?.data) {
          const monthMap: Record<string, number> = { 'ene': 0, 'feb': 1, 'mar': 2, 'abr': 3, 'may': 4, 'jun': 5, 'jul': 6, 'ago': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dic': 11 };
          
          const trendData = [...newDistribution]
            .sort((a, b) => {
              const sA = COMPARATIVE_SURVEYS_LIST.find(s => s.id === a.surveyId);
              const sB = COMPARATIVE_SURVEYS_LIST.find(s => s.id === b.surveyId);
              if (!sA || !sB) return 0;
              
              const parseDate = (dStr: string) => {
                const parts = dStr.split(' ');
                const day = parseInt(parts[0]);
                const month = monthMap[parts[1].toLowerCase()] || 0;
                const year = parseInt(parts[2]);
                return new Date(year, month, day).getTime();
              };
              
              return parseDate(sA.startDate) - parseDate(sB.startDate);
            })
            .map((item) => {
              const posVal = item.segments.find((s: any) => s.tone === 'positive')?.percentage || 0;
              const colInfo = columns.find(c => c.id === item.surveyId);
              return {
                label: colInfo?.shortLabel || item.period,
                value: item.status === 'no_responses' ? null : Math.round(posVal),
                total: item.total || 0
              };
            });
          
          rawData.trendData.data = trendData;
        }
      }
    }
    
    return rawData;
  }, [getActiveFiltersCount, applyFilters, columns, type]);

  const favorabilitySource = React.useMemo(() => {
    return type === 'Cultura' ? CULTURA_FAVORABILITY_DATA : COMPARATIVE_FAVORABILITY_DATA;
  }, [type]);

  const participationSource = React.useMemo(() => {
    return type === 'Cultura' ? CULTURA_PARTICIPATION_DATA : COMPARATIVE_PARTICIPATION_DATA;
  }, [type]);

  const npsSource = React.useMemo(() => {
    return type === 'Cultura' ? CULTURA_NPS_DATA : COMPARATIVE_NPS_DATA;
  }, [type]);

  const resumenFavData = React.useMemo(() => getProcessedMetricData('resumen', favorabilitySource), [tabFilters.resumen, getProcessedMetricData, favorabilitySource]);
  const resumenPartData = React.useMemo(() => getProcessedMetricData('resumen', participationSource), [tabFilters.resumen, getProcessedMetricData, participationSource]);
  const resumenNpsData = React.useMemo(() => getProcessedMetricData('resumen', npsSource, true), [tabFilters.resumen, getProcessedMetricData, npsSource]);

  const favData = React.useMemo(() => getProcessedMetricData('favorabilidad', favorabilitySource), [tabFilters.favorabilidad, getProcessedMetricData, favorabilitySource]);
  const partData = React.useMemo(() => getProcessedMetricData('participacion', participationSource), [tabFilters.participacion, getProcessedMetricData, participationSource]);
  const npsData = React.useMemo(() => getProcessedMetricData('nps', npsSource, true), [tabFilters.nps, getProcessedMetricData, npsSource]);

  // --- Favorability Prep (Resumen) ---
  const resumenFavTrendSeries = React.useMemo(() => resumenFavData?.trendData ? [{
    id: 'favorability-trend-resumen',
    label: 'Favorabilidad',
    data: resumenFavData.trendData.data || [],
    tone: 'primary' as const
  }] : [], [resumenFavData]);

  const resumenBaseFavItem = React.useMemo(() => {
    if (!baseColumn || !resumenFavData?.distributionByPeriod) return null;
    const baseDistItem = resumenFavData.distributionByPeriod.find(item => item.isBase);
    const positivePercentage = baseDistItem?.segments?.find(s => s.tone === 'positive')?.percentage || 0;
    return {
      label: baseColumn.label,
      value: formatPercentage(positivePercentage),
      isBase: true
    };
  }, [baseColumn, resumenFavData]);

  const resumenFavFooterItems = React.useMemo(() => (resumenFavData?.comparisons || []).map(c => ({
    label: c.label.charAt(0).toUpperCase() + c.label.slice(1).toLowerCase(),
    value: `${formatPercentage(c.value)}%`,
    delta: c.delta !== undefined ? `${c.delta >= 0 ? '+' : ''}${c.delta}%` : undefined,
    tone: c.trend === 'up' ? 'positive' : c.trend === 'down' ? 'negative' : 'neutral'
  })), [resumenFavData]);

  const resumenDistributionItems = React.useMemo(() => {
    const dist = resumenFavData?.distributionByPeriod || [];
    const baseItem = dist.find(item => item.isBase);
    const baseVal = baseItem?.segments.find((s: any) => s.tone === 'positive')?.percentage || 0;
    console.log('[DEBUG resumenDistributionItems] dist:', dist);
    console.log('[DEBUG resumenDistributionItems] baseVal:', baseVal);

    return dist.map((item, index) => {
      const currentVal = item.segments.find((s: any) => s.tone === 'positive')?.percentage || 0;
      const hasNoResponses = item.status === 'no_responses';
      const delta = item.isBase ? undefined : (hasNoResponses ? undefined : Number((currentVal - baseVal).toFixed(1)));
      console.log('[DEBUG resumenDistributionItems] item[', index, ']:', { period: item.period, status: item.status, hasNoResponses, currentVal, delta, total: item.total });
      return {
        id: `fav-res-period-${index}`,
        label: item.period,
        value: hasNoResponses ? 'sin respuestas' : formatPercentage(currentVal),
        total: item.total,
        delta: delta,
        deltaLabel: hasNoResponses ? 'sin respuestas' : undefined,
        deltaTone: delta === undefined ? undefined : (delta > 0 ? 'positive' as const : delta < 0 ? 'negative' as const : 'neutral' as const),
        isBase: item.isBase,
        segments: (item.segments || []).map(s => ({ ...s, percentage: formatPercentage(s.percentage), tone: s.tone as any }))
      };
    });
  }, [resumenFavData]);

  // --- Participation Prep (Resumen) ---
  const resumenPartTrendSeries = React.useMemo(() => resumenPartData?.trendData ? [{
    id: 'participation-trend-resumen',
    label: 'Participación',
    data: resumenPartData.trendData.data || [],
    tone: 'primary' as const
  }] : [], [resumenPartData]);

  const resumenBasePartItem = React.useMemo(() => {
    if (!baseColumn || !resumenPartData?.distributionByPeriod) return null;
    const baseDistItem = resumenPartData.distributionByPeriod.find(item => item.isBase);
    const positivePercentage = baseDistItem?.segments?.find(s => s.tone === 'positive')?.percentage || 0;
    return { label: baseColumn.label, value: formatPercentage(positivePercentage), isBase: true };
  }, [baseColumn, resumenPartData]);

  const resumenPartFooterItems = React.useMemo(() => (resumenPartData?.comparisons || []).map(c => ({
    label: c.label.charAt(0).toUpperCase() + c.label.slice(1).toLowerCase(),
    value: `${formatPercentage(c.value)}%`,
    delta: c.delta !== undefined ? `${c.delta >= 0 ? '+' : ''}${c.delta}%` : undefined,
    tone: c.trend === 'up' ? 'positive' : c.trend === 'down' ? 'negative' : 'neutral'
  })), [resumenPartData]);

  const resumenPartDistributionItems = React.useMemo(() => {
    const dist = resumenPartData?.distributionByPeriod || [];
    const baseItem = dist.find(item => item.isBase);
    const baseVal = baseItem?.segments.find((s: any) => s.tone === 'positive')?.percentage || 0;
    return dist.map((item, index) => {
      const currentVal = item.segments.find((s: any) => s.tone === 'positive')?.percentage || 0;
      const hasNoResponses = item.status === 'no_responses';
      const delta = item.isBase ? undefined : (hasNoResponses ? undefined : Number((currentVal - baseVal).toFixed(1)));
      console.log('[DEBUG resumenPartDistributionItems] item[', index, ']:', { period: item.period, status: item.status, hasNoResponses, currentVal, delta, total: item.total });
      return {
        id: `part-res-period-${index}`,
        label: item.period,
        value: hasNoResponses ? 'sin respuestas' : formatPercentage(currentVal),
        total: item.total,
        delta,
        deltaLabel: hasNoResponses ? 'sin respuestas' : undefined,
        deltaTone: delta === undefined ? undefined : (delta > 0 ? 'positive' as const : delta < 0 ? 'negative' as const : 'neutral' as const),
        isBase: item.isBase,
        segments: (item.segments || []).map(s => ({ ...s, percentage: formatPercentage(s.percentage), tone: s.tone as any }))
      };
    });
  }, [resumenPartData]);

  // --- NPS Prep (Resumen) ---
  const resumenBaseNpsItem = React.useMemo(() => {
    if (!baseColumn || !resumenNpsData?.distributionByPeriod) return null;
    const baseDistItem = resumenNpsData.distributionByPeriod.find(item => item.isBase);
    const pPos = baseDistItem?.segments?.find(s => s.tone === 'positive')?.percentage || 0;
    const pNeg = baseDistItem?.segments?.find(s => s.tone === 'negative')?.percentage || 0;
    return { label: baseColumn.label, value: formatPercentage(pPos - pNeg), isBase: true };
  }, [baseColumn, resumenNpsData]);

  const resumenNpsTrendSeries = React.useMemo(() => resumenNpsData?.trendData ? [{
    id: 'nps-trend-resumen',
    label: 'NPS',
    data: resumenNpsData.trendData.data || [],
    tone: 'primary' as const
  }] : [], [resumenNpsData]);

  const resumenNpsDistributionItems = React.useMemo(() => {
    const dist = resumenNpsData?.distributionByPeriod || [];
    const baseItem = dist.find(item => item.isBase);
    let baseScore = 0;
    if (baseItem) {
      const pPos = baseItem.segments.find((s: any) => s.tone === 'positive')?.percentage || 0;
      const pNeg = baseItem.segments.find((s: any) => s.tone === 'negative')?.percentage || 0;
      baseScore = Math.round(pPos - pNeg);
    }
    return dist.map((item, index) => {
      const cp = item.segments.find((s: any) => s.tone === 'positive')?.percentage || 0;
      const cn = item.segments.find((s: any) => s.tone === 'negative')?.percentage || 0;
      const cs = Math.round(cp - cn);
      const delta = item.isBase ? undefined : Number((cs - baseScore).toFixed(1));
      return {
        id: `nps-res-period-${index}`,
        label: item.period,
        value: formatPercentage(cs),
        total: item.total,
        delta,
        deltaTone: delta === undefined ? undefined : (delta > 0 ? 'positive' as const : delta < 0 ? 'negative' as const : 'neutral' as const),
        isBase: item.isBase,
        segments: (item.segments || []).map(s => ({ ...s, percentage: formatPercentage(s.percentage), tone: s.tone as any }))
      };
    });
  }, [resumenNpsData]);

  const resumenNpsFooterItems = React.useMemo(() => (resumenNpsData?.comparisons || []).map(c => ({
    label: c.label.charAt(0).toUpperCase() + c.label.slice(1).toLowerCase(),
    value: Math.round(c.value).toString(),
    delta: c.delta !== undefined ? `${c.delta >= 0 ? '+' : ''}${c.delta}%` : undefined,
    tone: c.trend === 'up' ? 'positive' : c.trend === 'down' ? 'negative' : 'neutral'
  })), [resumenNpsData]);

  // --- Favorability Prep (Tab) ---
  const favTrendSeries = React.useMemo(() => favData?.trendData ? [{
    id: 'favorability-trend',
    label: 'Favorabilidad',
    data: favData.trendData.data || [],
    tone: 'primary' as const
  }] : [], [favData]);

  const baseFavItem = React.useMemo(() => {
    if (!baseColumn || !favData?.distributionByPeriod) return null;
    const baseDistItem = favData.distributionByPeriod.find(item => item.isBase);
    const positivePercentage = baseDistItem?.segments?.find(s => s.tone === 'positive')?.percentage || 0;
    return { label: baseColumn.label, value: Math.round(positivePercentage), isBase: true };
  }, [baseColumn, favData]);

  const favFooterItems = React.useMemo(() => {
    console.log('[DEBUG favFooterItems] comparisons:', JSON.stringify(favData?.comparisons?.map((c: any) => ({ label: c.label, value: c.value, noData: c.noData, status: c.status }))));
    return (favData?.comparisons || []).map((c: any) => ({
      label: c.label,
      value: c.noData ? 'Sin respuestas' : `${formatPercentage(c.value)}%`,
      delta: c.noData ? undefined : (c.delta !== undefined ? `${c.delta >= 0 ? '+' : ''}${c.delta}%` : undefined),
      tone: c.noData ? 'neutral' : (c.trend === 'up' ? 'positive' : c.trend === 'down' ? 'negative' : 'neutral')
    }));
  }, [favData]);

  const distributionItems = React.useMemo(() => {
    const dist = favData?.distributionByPeriod || [];
    const baseItem = dist.find(item => item.isBase);
    const baseVal = baseItem?.segments.find((s: any) => s.tone === 'positive')?.percentage || 0;
    return dist.map((item, index) => {
      const currentVal = item.segments.find((s: any) => s.tone === 'positive')?.percentage || 0;
      const hasNoResponses = item.status === 'no_responses';
      const delta = item.isBase ? undefined : (hasNoResponses ? undefined : Number((currentVal - baseVal).toFixed(1)));
      console.log('[DEBUG distributionItems-favorabilidad] item[', index, ']:', { period: item.period, status: item.status, hasNoResponses, currentVal, delta });
      return {
        id: `fav-period-${index}`,
        label: item.period,
        value: hasNoResponses ? 'sin respuestas' : formatPercentage(currentVal),
        total: item.total,
        delta,
        deltaLabel: hasNoResponses ? 'sin respuestas' : undefined,
        deltaTone: delta === undefined ? undefined : (delta > 0 ? 'positive' as const : delta < 0 ? 'negative' as const : 'neutral' as const),
        isBase: item.isBase,
        segments: (item.segments || []).map(s => ({ ...s, percentage: formatPercentage(s.percentage), tone: s.tone as any }))
      };
    });
  }, [favData]);

  // --- Participation Prep (Tab) ---
  const partTrendSeries = React.useMemo(() => partData?.trendData ? [{
    id: 'participation-trend',
    label: 'Participación',
    data: partData.trendData.data || [],
    tone: 'primary' as const
  }] : [], [partData]);

  const basePartItem = React.useMemo(() => {
    if (!baseColumn || !partData?.distributionByPeriod) return null;
    const baseDistItem = partData.distributionByPeriod.find(item => item.isBase);
    const positivePercentage = baseDistItem?.segments?.find(s => s.tone === 'positive')?.percentage || 0;
    return { label: baseColumn.label, value: Math.round(positivePercentage), isBase: true };
  }, [baseColumn, partData]);

  const partFooterItems = React.useMemo(() => (partData?.comparisons || []).map(c => ({
    label: c.label,
    value: `${formatPercentage(c.value)}%`,
    delta: c.delta !== undefined ? `${c.delta >= 0 ? '+' : ''}${c.delta}%` : undefined,
    tone: c.trend === 'up' ? 'positive' : c.trend === 'down' ? 'negative' : 'neutral'
  })), [partData]);

  const partDistributionItems = React.useMemo(() => {
    const dist = partData?.distributionByPeriod || [];
    const baseItem = dist.find(item => item.isBase);
    const baseVal = baseItem?.segments.find((s: any) => s.tone === 'positive')?.percentage || 0;
    return dist.map((item, index) => {
      const currentVal = item.segments.find((s: any) => s.tone === 'positive')?.percentage || 0;
      const hasNoResponses = item.status === 'no_responses';
      const delta = item.isBase ? undefined : (hasNoResponses ? undefined : Number((currentVal - baseVal).toFixed(1)));
      console.log('[DEBUG partDistributionItems-participacion] item[', index, ']:', { period: item.period, status: item.status, hasNoResponses, currentVal, delta });
      return {
        id: `part-period-${index}`,
        label: item.period,
        value: hasNoResponses ? 'sin respuestas' : formatPercentage(currentVal),
        total: item.total,
        delta,
        deltaLabel: hasNoResponses ? 'sin respuestas' : undefined,
        deltaTone: delta === undefined ? undefined : (delta > 0 ? 'positive' as const : delta < 0 ? 'negative' as const : 'neutral' as const),
        isBase: item.isBase,
        segments: (item.segments || []).map(s => ({ ...s, percentage: formatPercentage(s.percentage), tone: s.tone as any }))
      };
    });
  }, [partData]);

  // --- NPS Prep (Tab) ---
  const npsTrendSeries = React.useMemo(() => npsData?.trendData ? [{
    id: 'nps-trend',
    label: 'NPS',
    data: npsData.trendData.data || [],
    tone: 'primary' as const
  }] : [], [npsData]);

  const npsDistributionItems = React.useMemo(() => {
    const dist = npsData?.distributionByPeriod || [];
    const baseItem = dist.find(item => item.isBase);
    let baseScore = 0;
    if (baseItem) {
      const pPos = baseItem.segments.find((s: any) => s.tone === 'positive')?.percentage || 0;
      const pNeg = baseItem.segments.find((s: any) => s.tone === 'negative')?.percentage || 0;
      baseScore = Math.round(pPos - pNeg);
    }
    return dist.map((item, index) => {
      const cp = item.segments.find((s: any) => s.tone === 'positive')?.percentage || 0;
      const cn = item.segments.find((s: any) => s.tone === 'negative')?.percentage || 0;
      const cs = Math.round(cp - cn);
      const delta = item.isBase ? undefined : Number((cs - baseScore).toFixed(1));
      return {
        id: `nps-period-${index}`,
        label: item.period,
        value: formatPercentage(cs),
        total: item.total,
        delta,
        deltaTone: delta === undefined ? undefined : (delta > 0 ? 'positive' as const : delta < 0 ? 'negative' as const : 'neutral' as const),
        isBase: item.isBase,
        segments: (item.segments || []).map(s => ({ ...s, percentage: formatPercentage(s.percentage), tone: s.tone as any }))
      };
    });
  }, [npsData]);

  const npsFooterItems = React.useMemo(() => (npsData?.comparisons || []).map(c => ({
    label: c.label,
    value: `${formatPercentage(Number(c.value))}%`,
    delta: c.delta !== undefined ? `${c.delta >= 0 ? '+' : ''}${c.delta}%` : undefined,
    tone: c.trend === 'up' ? 'positive' : c.trend === 'down' ? 'negative' : 'neutral'
  })), [npsData]);

  // --- Sentiment Prep for Drawer ---
  const sentimentDistributionItems = React.useMemo(() => {
    if (!selectedDimensionDetail || columns.length === 0) {
      return [];
    }

    const sentimentData = sentimentSource.find(s => s.dimension === selectedDimensionDetail);
    if (!sentimentData) {
      return [];
    }

    // Build items from selected surveys in columns
    const items = columns.map((col, index) => {
      const data = (sentimentData as any)[col.sentKey];

      if (!data) {
        return null;
      }

      // Calculate delta vs previous survey
      let delta = 0;
      if (index > 0) {
        const prevCol = columns[index - 1];
        const prevData = (sentimentData as any)[prevCol.sentKey];
        if (prevData) {
          delta = data.positive - prevData.positive;
        }
      }

      const item = {
        id: `sent-survey-${col.id}`,
        label: col.shortLabel + (col.isBase ? ' (BASE)' : ''),
        value: formatPercentage(data.positive),
        segments: [
          { id: `pos-${col.id}`, label: 'Positivo', value: formatPercentage(data.positive), percentage: formatPercentage(data.positive), tone: 'positive' as const },
          { id: `neu-${col.id}`, label: 'Neutral', value: formatPercentage(data.neutral), percentage: formatPercentage(data.neutral), tone: 'neutral' as const },
          { id: `neg-${col.id}`, label: 'Negativo', value: formatPercentage(data.negative), percentage: formatPercentage(data.negative), tone: 'negative' as const },
        ],
        total: data.total,
        delta: index > 0 ? delta : undefined,
        deltaTone: delta >= 0 ? 'positive' as const : 'negative' as const
      };
      return item;
    }).filter(Boolean);

    return items;
  }, [selectedDimensionDetail, columns, sentimentSource]);

  // Get filters specific to each section/tab
  const getSectionFilters = React.useCallback((tabId: string) => {
    const filters: Record<string, string[]> = {};

    // Get the tab filters for this TabId
    const tabData = tabFilters[tabId as keyof typeof tabFilters];
    if (!tabData) {
      return filters;
    }

    // Add section-specific filters first
    if (tabId === 'resumen') {
      if (selectedDimensions.length > 0) {
        filters['Dimensiones'] = selectedDimensions;
      }
    } else if (tabId === 'dimensionesTable') {
      if (selectedDimensions.length > 0) {
        filters['Dimensiones'] = selectedDimensions;
      }
    } else if (tabId === 'dimensionesHeatmap') {
      if (selectedDimensions.length > 0) {
        filters['Dimensiones'] = selectedDimensions;
      }
      if (heatmapSegment) {
        filters['Vista'] = [heatmapSegment];
      }
    } else if (tabId === 'preguntas') {
      if (selectedQuestionDimensions.length > 0) {
        const allQuestionDims = Array.from(new Set(questionsData.map((q: any) => q.dimension)));
        if (selectedQuestionDimensions.length < allQuestionDims.length) {
          filters['Dimensiones'] = selectedQuestionDimensions;
        }
      }
    }

    // Add demographics filters
    Object.entries(tabData.demographics || {}).forEach(([category, values]: any) => {
      if (values && values.length > 0) {
        filters[`Demográfico: ${category}`] = values;
      }
    });

    // Add segments filters
    if (tabData.segments && tabData.segments.length > 0) {
      const activeSegments = tabData.segments
        .filter((s: any) => s.variable && s.values.length > 0)
        .map((s: any) => `${s.variable}: ${s.values.join(', ')}`);
      if (activeSegments.length > 0) {
        filters['Segmentación'] = activeSegments;
      }
    }

    return filters;
  }, [
    baseSurvey,
    comparisonSurveys,
    selectedDimensions,
    selectedQuestionDimensions,
    selectedSentimentDimensions,
    heatmapSegment,
    dimensionsView,
    tabFilters,
  ]);

  // Export Handlers
  const handleExport = React.useCallback(() => {
    if (type === 'Cultura') {
      toast.error("¡Vaya! Hubo un problema al generar tu reporte de Cultura. Estamos trabajando para solucionarlo, por favor intenta descargarlo más tarde.");
      setIsExportDialogOpen(false);
      return;
    }

    if (exportFormat === 'pdf') {
      exportToPDF();
    } else {
      exportToCSV();
    }
  }, [exportFormat, type]);

  const exportToPDF = () => {
    // Create CSV content for PDF (simplified - in production, use a PDF library like jsPDF)
    const fileName = `dashboard-comparativo-${new Date().toISOString().split('T')[0]}.pdf`;

    // For now, we'll create a text-based summary that can be printed to PDF
    const surveyLabels = [baseSurvey, ...comparisonSurveys].map(s => getDisplayLabel(s)).join(', ');

    let content = 'DASHBOARD COMPARATIVO\n';
    content += `Encuestas: ${surveyLabels}\n`;
    content += `Fecha de exportación: ${new Date().toLocaleDateString('es-ES')}\n\n`;

    // Add dimensions data
    if (dimensionsView === 'table' && filteredAndSortedDimensions.length > 0) {
      content += 'DIMENSIONES\n';
      content += '─'.repeat(80) + '\n';
      filteredAndSortedDimensions.forEach(dim => {
        const values = columns.map(col => `${(dim as any)[col.dimKey] || 0}%`).join(' → ');
        content += `${dim.name}: ${values}\n`;
      });
    }

    // Add NPS data
    if (npsDistributionItems.length > 0) {
      content += '\n\nNPS (NET PROMOTER SCORE)\n';
      content += '─'.repeat(80) + '\n';
      npsDistributionItems.forEach(item => {
        content += `${item.label}: ${item.value}${item.delta ? ` (${item.delta > 0 ? '+' : ''}${item.delta})` : ''}\n`;
      });
    }

    // Add filters if applicable
    if (exportWithFilters) {
      const dimTabId = dimensionsView === 'heatmap' ? 'dimensionesHeatmap' : 'dimensionesTable';
      const tabIdMap: Record<string, string> = {
        'resumen': 'resumen',
        'dimensiones': dimTabId,
        'preguntas': 'preguntas',
        'sentimiento': 'participacion',
        'comentarios': 'comentarios'
      };
      const currentTabId = tabIdMap[activeTab] || 'resumen';
      const sectionFilters = getSectionFilters(currentTabId);

      content += '\n\nFILTROS APLICADOS\n';
      content += '─'.repeat(80) + '\n';
      Object.entries(sectionFilters).forEach(([category, values]: any) => {
        content += `${category}: ${Array.isArray(values) ? values.join(', ') : values}\n`;
      });
    }

    // Create blob and download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success(`¡${exportFormat.toUpperCase()} descargado correctamente!`);
    setIsExportDialogOpen(false);
  };

  const exportToCSV = () => {
    const fileName = `dashboard-comparativo-${new Date().toISOString().split('T')[0]}.csv`;

    const surveyLabels = [baseSurvey, ...comparisonSurveys].map(s => getDisplayLabel(s));

    let csv = 'Encuestas,' + surveyLabels.join(',') + '\n';
    csv += `Fecha de exportación,${new Date().toLocaleDateString('es-ES')}\n\n`;

    // Add dimensions data as CSV
    if (dimensionsView === 'table' && filteredAndSortedDimensions.length > 0) {
      csv += 'DIMENSIONES\n';
      csv += 'Dimensión,' + columns.map(c => c.dataKey).join(',') + '\n';

      filteredAndSortedDimensions.forEach(dim => {
        const values = columns.map(col => `${(dim as any)[col.dimKey] || 0}`).join(',');
        csv += `"${dim.name}",${values}\n`;
      });
      csv += '\n';
    }

    // Add NPS data
    if (npsDistributionItems.length > 0) {
      csv += '\n\nNPS (NET PROMOTER SCORE)\n';
      csv += 'Período,NPS,Delta\n';
      npsDistributionItems.forEach(item => {
        csv += `"${item.label}","${item.value}","${item.delta || 'N/A'}"\n`;
      });
    }

    // Add filter info if applicable
    if (exportWithFilters) {
      const dimTabId = dimensionsView === 'heatmap' ? 'dimensionesHeatmap' : 'dimensionesTable';
      const tabIdMap: Record<string, string> = {
        'resumen': 'resumen',
        'dimensiones': dimTabId,
        'preguntas': 'preguntas',
        'sentimiento': 'participacion',
        'comentarios': 'comentarios'
      };
      const currentTabId = tabIdMap[activeTab] || 'resumen';
      const sectionFilters = getSectionFilters(currentTabId);
      csv += '\n\nFILTROS APLICADOS\n';
      Object.entries(sectionFilters).forEach(([category, values]: any) => {
        const filterValue = Array.isArray(values) ? values.join(', ') : values;
        csv += `"${category}","${filterValue}"\n`;
      });
    }

    // Create blob and download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success(`¡${exportFormat.toUpperCase()} descargado correctamente!`);
    setIsExportDialogOpen(false);
  };

  // Generate share link with filters
  const generateShareLink = React.useCallback(() => {
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();

    // Add surveys
    params.set('baseId', baseId);
    if (comparativeIds && comparativeIds.length > 0) {
      params.set('comparativeIds', comparativeIds.join(','));
    }

    // Add current tab
    params.set('tab', activeTab);

    // Add filters if applicable
    if (shareWithFilters) {
      const dimTabId = dimensionsView === 'heatmap' ? 'dimensionesHeatmap' : 'dimensionesTable';
      const tabIdMap: Record<string, string> = {
        'resumen': 'resumen',
        'dimensiones': dimTabId,
        'preguntas': 'preguntas',
        'sentimiento': 'participacion',
        'comentarios': 'comentarios'
      };
      const currentTabId = tabIdMap[activeTab] || 'resumen';

      // Get filters for all sections
      const allTabIds = ['resumen', 'dimensionesTable', 'dimensionesHeatmap', 'preguntas', 'comentarios'];
      allTabIds.forEach((tabId) => {
        const sectionFilters = getSectionFilters(tabId);
        if (Object.keys(sectionFilters).length > 0) {
          params.set(`filters_${tabId}`, JSON.stringify(sectionFilters));
        }
      });
    }

    const fullUrl = `${baseUrl}?${params.toString()}`;
    return fullUrl;
  }, [baseId, comparativeIds, activeTab, shareWithFilters, dimensionsView, getSectionFilters]);

  const renderTableLegend = (context: 'dimension' | 'question' | 'sentiment' = 'dimension') => (
    <div className="flex items-center gap-5 py-4 border-b border-border/20 mb-6 flex-wrap">
      <span className="text-[10px] font-bold tracking-widest text-text-secondary/40 uppercase mr-1">Leyenda:</span>
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-status-positive" />
        <span className="text-[11px] font-bold text-text-secondary">Mejora significativa</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-text-secondary/20" />
        <span className="text-[11px] font-bold text-text-secondary">Sin variación relevante</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-destructive" />
        <span className="text-[11px] font-bold text-text-secondary">Caída significativa</span>
      </div>
      {type === 'Cultura' && (
        <>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-muted/20 px-2 py-0.5 rounded border border-border/5">
              <Minus className="h-2.5 w-2.5 text-text-secondary/40" />
              <span className="text-[9px] font-extrabold text-text-secondary/40 uppercase tracking-tighter">
                {context === 'dimension' ? 'Sin Dimensión' : context === 'question' ? 'Sin Pregunta' : 'Sin Dato'}
              </span>
            </div>
            <span className="text-[11px] font-medium text-text-secondary/60 italic">No evaluada</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-muted/20 px-2 py-0.5 rounded border border-border/5">
              <Lock className="h-2.5 w-2.5 text-text-secondary/40" />
              <span className="text-[9px] font-extrabold text-text-secondary/40 uppercase tracking-tighter">Privado</span>
            </div>
            <span className="text-[11px] font-medium text-text-secondary/60 italic">Dato protegido</span>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden animate-in fade-in duration-700">
      {/* Heatmap Styles - Defined here to avoid modifying tokens.css */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .heatmap-negative-strong { background-color: hsl(var(--color-negative-hsl) / 0.18); color: hsl(var(--color-negative-hsl)); }
          .heatmap-negative-light  { background-color: hsl(var(--color-negative-hsl) / 0.09); color: hsl(var(--color-negative-hsl) / 0.85); }
          .heatmap-neutral         { background-color: hsl(var(--color-surface-subtle-hsl)); color: var(--color-text-text-secondary); }
          .heatmap-positive-light  { background-color: hsl(var(--color-positive-hsl) / 0.09); color: hsl(var(--color-positive-hsl) / 0.85); }
          .heatmap-positive-strong { background-color: hsl(var(--color-positive-hsl) / 0.18); color: hsl(var(--color-positive-hsl)); }
          .heatmap-private         { background-color: hsl(var(--color-surface-nav-hsl) / 0.04); color: var(--color-text-text-secondary); }
          .heatmap-low-n           { background-color: hsl(var(--color-warning-hsl) / 0.09); color: hsl(var(--color-warning-hsl)); }
        `
      }} />


      {/* 1. Sleek Dashboard Header */}
      {/* 1. Refined Premium Header */}
      <header className="h-24 px-4 sm:px-10 bg-surface border-b border-border/60 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-8 h-full">
          <div className="flex items-center gap-5">
            <Button
              variant="ghost"
              size="icon"
              onClick={onExit}
              className="h-10 w-10 rounded-xl hover:bg-muted/5 text-text-secondary transition-all active:scale-95"
            >
              <X className="h-6 w-6" />
            </Button>

            <div className="h-8 w-[1px] bg-border/40" />

            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-text-brand leading-none tracking-tight">
                Dashboard Comparativo
              </h1>
              <p className="text-xs font-semibold text-text-secondary/60 tracking-tight">
                Análisis de tendencias multi-periodo
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => {
              if (type === 'Cultura') {
                toast.error("¡Ups! Tuvimos un pequeño problema al generar el enlace de compartir. Por favor, intenta de nuevo en unos minutos.");
              } else {
                setShareWithFilters(true);
                setShareLink('');
                setIsShareDialogOpen(true);
              }
            }}
            variant="ghost"
            size="sm"
            className="h-11 px-6 gap-2.5 text-xs font-bold tracking-tight text-text-secondary hover:bg-muted/5 rounded-xl transition-all"
          >
            <Share2 className="h-4 w-4" />
            <span>Compartir</span>
          </Button>
          <Button
            onClick={() => setIsExportDialogOpen(true)}
            variant="outline"
            size="sm"
            className="h-11 px-6 gap-2.5 text-xs font-bold tracking-tight text-brand border-brand/20 hover:bg-primary/5 rounded-xl shadow-sm transition-all active:scale-95"
          >
            <Download className="h-4 w-4" />
            <span>Exportar Informe</span>
          </Button>
        </div>
      </header>

      <main className="flex-1 overflow-auto scrollbar-hide bg-background">
        <Sheet open={isFiltersDrawerOpen} onOpenChange={setIsFiltersDrawerOpen}>
          <SheetContent
            showCloseButton={false}
            side="right"
            className="w-[460px] sm:max-w-[460px] h-full p-0 border-l border-border/10 bg-background overflow-hidden flex flex-col shadow-2xl"
            aria-describedby={undefined}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-6 pb-4 bg-white border-b border-border/10 shrink-0">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-0.5 flex-1">
                    <SheetTitle className="text-lg font-bold tracking-tight text-text-primary">
                      {activeFilterTab === 'dimensionesHeatmap' ? 'Segmentación' : 'Filtros Demográficos'}
                    </SheetTitle>
                    <SheetDescription className="text-sm font-bold text-text-secondary-foreground">
                      {activeFilterTab === 'dimensionesHeatmap'
                        ? 'Define múltiples niveles de segmentación para análisis granular'
                        : 'Filtra por características demográficas de los participantes'
                      }
                    </SheetDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsFiltersDrawerOpen(false)}
                    className="rounded-xl hover:bg-muted/10 h-10 w-10 transition-all shrink-0"
                  >
                    <X className="h-5 w-5 text-text-secondary-foreground" />
                  </Button>
                </div>
              </div>

              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto bg-background min-h-0">
                <div className="p-6 space-y-6 pb-32">
                  <section className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="flex flex-col gap-6">
                      {activeFilterTab === 'dimensionesHeatmap' ? (
                        /* Simplified Heatmap Segmentation Logic */
                        <div className="flex flex-col gap-5">
                          {tabFilters[activeFilterTab].segments.map((seg, idx) => {
                            const availableValues = seg.variable
                              ? (DEMOGRAPHIC_OPTIONS[SEGMENT_CATEGORIES.find(c => c.label === seg.variable)?.id as keyof typeof DEMOGRAPHIC_OPTIONS] || [])
                              : [];

                            return (
                              <div key={idx} className="flex flex-col gap-5 p-6 rounded-2xl border border-border/20 bg-surface-subtle relative group/segitem transition-all hover:border-border/40 hover:bg-surface-subtle/80 shadow-sm">
                                {tabFilters[activeFilterTab].segments.length > 1 && (
                                  <button
                                    onClick={() => updateTabSegments(activeFilterTab, tabFilters[activeFilterTab].segments.filter((_, i) => i !== idx))}
                                    className="absolute top-4 right-4 h-7 w-7 rounded-full bg-surface border border-border/20 shadow-sm hover:bg-negative/10 hover:text-negative flex items-center justify-center transition-all opacity-0 group-hover/segitem:opacity-100 z-10"
                                  >
                                    <X className="h-3.5 w-3.5" />
                                  </button>
                                )}

                                <div className="flex flex-col gap-3">
                                  <Label className="text-sm font-bold text-text-primary tracking-tight leading-none">Seleccionar Demográfico</Label>
                                  <SingleSelect
                                    value={seg.variable}
                                    onValueChange={(val) => updateTabSegments(activeFilterTab,
                                      tabFilters[activeFilterTab].segments.map((s, i) => i === idx ? { variable: val, values: [] } : s)
                                    )}
                                    options={SEGMENT_CATEGORIES.map(c => ({ label: c.label, value: c.label }))}
                                    placeholder="Seleccionar demográfico..."
                                  />
                                </div>

                                {seg.variable && (
                                  <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-top-1 duration-300 pt-2 border-t border-border/10">
                                    <Label className="text-sm font-bold text-text-primary tracking-tight leading-none">Valores</Label>
                                    <MultiSelect
                                      options={availableValues.map(v => ({ label: v, value: v }))}
                                      value={seg.values}
                                      onValueChange={(vals) => updateTabSegments(activeFilterTab,
                                        tabFilters[activeFilterTab].segments.map((s, i) => i === idx ? { ...s, values: vals } : s)
                                      )}
                                      placeholder={`Elegir valores de ${seg.variable}...`}
                                    />
                                  </div>
                                )}
                              </div>
                            );
                          })}

                          {tabFilters[activeFilterTab].segments.length < 6 && (
                            <Button
                              variant="outline"
                              onClick={() => updateTabSegments(activeFilterTab, [...tabFilters[activeFilterTab].segments, { variable: '', values: [] }])}
                              className="w-full h-12 flex items-center justify-center gap-3 border-2 border-dashed border-border/30 rounded-2xl text-sm font-bold tracking-tight text-text-secondary-foreground hover:border-brand/40 hover:text-brand hover:bg-brand/5 transition-all shadow-sm group"
                            >
                              <Plus className="h-4 w-4 group-hover:scale-110 transition-transform" />
                              Agregar Segmentación
                            </Button>
                          )}
                        </div>
                      ) : (
                        /* Standard Demographic Filters for other tabs */
                        <div className="flex flex-col gap-6">
                          {SEGMENT_CATEGORIES.map((field) => (
                            <div key={field.id} className="flex flex-col gap-4 pb-6 border-b border-border/15 last:border-b-0 last:pb-0">
                              <div className="flex flex-col gap-2">
                                <Label className="text-[10px] font-semibold text-text-secondary/60 tracking-tight leading-none">{field.label}</Label>
                                <p className="text-xs text-text-secondary-foreground font-medium">Selecciona los valores que deseas filtrar</p>
                              </div>
                              <MultiSelect
                                options={(DEMOGRAPHIC_OPTIONS[field.id as keyof typeof DEMOGRAPHIC_OPTIONS] || []).map(v => ({ label: v, value: v }))}
                                value={tabFilters[activeFilterTab].demographics[field.id] || []}
                                onValueChange={(vals) => updateTabDemographics(activeFilterTab, field.id, vals)}
                                placeholder={`Seleccionar ${field.label}...`}
                                className="w-full"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </section>
                </div>
              </div>

              {/* Drawer Footer - Fixed at bottom */}
              <div className="absolute bottom-0 left-0 right-0 px-8 py-6 border-t border-border/10 bg-surface/90 backdrop-blur-md flex flex-col gap-3 z-20 shadow-premium">
                <SheetClose asChild>
                  <Button
                    className="w-full bg-brand hover:bg-brand-hover text-text-inverse h-12 text-sm font-bold tracking-tight rounded-2xl shadow-lg shadow-brand/20 transition-all active:scale-[0.98]"
                  >
                    Aplicar Cambios
                  </Button>
                </SheetClose>

                <Button
                  onClick={() => clearTabFilters(activeFilterTab)}
                  disabled={getActiveFiltersCount(activeFilterTab).total === 0}
                  variant="ghost"
                  className="w-full h-11 text-xs font-bold tracking-tight text-text-secondary-foreground/70 hover:text-brand hover:bg-brand/5 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Restablecer Filtros
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <TooltipProvider delayDuration={400}>
          <div className="w-full bg-surface border-b border-border shadow-sm sticky top-0 z-40">
            <div className="flex items-center h-auto min-h-[5rem] px-4">

              {/* Item 1: Categoría (Step 1) */}
              <button
                onClick={() => onEditSelection?.(1)}
                className="flex items-center gap-4 px-8 h-full border-r border-border/30 hover:bg-muted/5 transition-all group shrink-0"
              >
                <div className="flex items-center gap-3">
                  <Layers className="h-4 w-4 text-text-secondary group-hover:text-brand transition-colors" />
                  <div className="flex flex-col items-start">
                    <span className="text-[11px] font-bold tracking-tight text-text-secondary/50 mb-0.5 flex items-center gap-1.5">
                      Categoría
                      <PencilLine className="h-2 w-2 opacity-0 group-hover:opacity-100 transition-all text-brand" />
                    </span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-sm font-bold text-text-primary tracking-tight group-hover:text-brand transition-colors max-w-[120px] truncate cursor-default">
                          {type || 'Clima'}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" sideOffset={10} className="tooltip-premium">
                        <div className="flex flex-col">
                          <span className="tooltip-label">Categoría</span>
                          <span className="tooltip-value">{type || 'Clima'}</span>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                <ChevronRight className="h-3 w-3 text-text-secondary/20 group-hover:text-brand group-hover:translate-x-0.5 transition-all" />
              </button>

              {/* Item 2: Referencia Base (Step 3) */}
              <button
                onClick={() => onEditSelection?.(3)}
                className="flex items-center gap-4 px-8 h-full border-r border-border/30 hover:bg-muted/5 transition-all group shrink-0"
              >
                <div className="flex items-center gap-3">
                  <Target className="h-4 w-4 text-brand group-hover:text-brand-hover transition-colors" />
                  <div className="flex flex-col items-start">
                    <span className="text-[11px] font-bold tracking-tight text-text-secondary/50 mb-0.5 flex items-center gap-1.5">
                      Referencia Base
                      <PencilLine className="h-2 w-2 opacity-0 group-hover:opacity-100 transition-all text-brand" />
                    </span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-sm font-bold text-text-primary tracking-tight group-hover:text-brand transition-colors truncate max-w-[150px] cursor-default">
                          {baseSurvey?.name || 'Q4 2024'}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" sideOffset={10} className="tooltip-premium">
                        <div className="flex flex-col">
                          <span className="tooltip-label">Referencia Base</span>
                          <span className="tooltip-value">{baseSurvey?.name || 'Q4 2024'}</span>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                <ChevronRight className="h-3 w-3 text-text-secondary/20 group-hover:text-brand group-hover:translate-x-0.5 transition-all" />
              </button>

              {/* Item 3: Comparativa Activa (Step 2) */}
              <button
                onClick={() => onEditSelection?.(2)}
                className="flex items-center gap-6 px-8 h-full hover:bg-muted/5 transition-all group min-w-0"
              >
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <TrendingUp className="h-4 w-4 text-text-secondary group-hover:text-brand transition-colors shrink-0" />
                  <div className="flex flex-col items-start min-w-0 flex-1">
                    <span className="text-[11px] font-bold tracking-tight text-text-secondary/50 mb-0.5 flex items-center gap-1.5 whitespace-nowrap">
                      Comparativas Activas ({selectedComparativeSurveys.length})
                      <PencilLine className="h-2 w-2 opacity-0 group-hover:opacity-100 transition-all text-brand" />
                    </span>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 py-0.5 min-w-0 max-w-full">
                      {(selectedComparativeSurveys.length > 0 ? selectedComparativeSurveys : [{ id: "1", name: "Q3 2024" }]).map((s, i, arr) => (
                        <div key={s.id} className="flex items-center gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="text-[13px] font-bold text-text-primary tracking-tight group-hover:text-brand transition-colors whitespace-nowrap cursor-default">
                                {s.name}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" sideOffset={10} className="tooltip-premium">
                              <div className="flex flex-col">
                                <span className="tooltip-label">Comparativa {i + 1}</span>
                                <span className="tooltip-value">{s.name}</span>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                          {i < arr.length - 1 && <div className="h-2.5 w-[1px] bg-border/40 shrink-0" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-3 w-3 text-text-secondary/20 group-hover:text-brand group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>

              <div className="flex-1" />
            </div>
          </div>
        </TooltipProvider>

        {/* 2.5 Top Summary Cards Grid - High Density side-by-side */}
        <div className="px-4 sm:px-10 pt-8 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-1 bg-brand rounded-full" />
            <h2 className="text-xl font-bold text-text-primary tracking-tight">Resumen Ejecutivo</h2>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setActiveFilterTab('resumen');
              setIsFiltersDrawerOpen(true);
            }}
            className={cn(
              "h-10 px-6 gap-2.5 text-sm font-bold tracking-tight rounded-xl transition-all shadow-sm border border-border/10",
              getActiveFiltersCount('resumen').total > 0
                ? "bg-brand text-text-inverse shadow-brand/20 border-brand"
                : "bg-surface text-text-secondary hover:bg-surface-muted"
            )}
          >
            <Filter className="h-4 w-4" />
            <span>Demográficos</span>
            {getActiveFiltersCount('resumen').total > 0 && (
              <span className="flex items-center justify-center bg-surface text-brand text-[10px] font-bold h-5 min-w-[20px] px-1 rounded-full ml-1">
                {getActiveFiltersCount('resumen').total}
              </span>
            )}
          </Button>
        </div>

        <div className={cn(
          "px-4 sm:px-10 pt-2 grid grid-cols-1 gap-8",
          type === 'Cultura' ? "lg:grid-cols-2" : "lg:grid-cols-3"
        )}>
          {/* Favorability Card */}
          <Card className="border border-border/40 bg-surface shadow-sm rounded-[40px] overflow-hidden group hover:shadow-xl hover:border-border/60 transition-all duration-500 flex flex-col min-h-[600px]">
            <CardHeader className="px-8 pt-8 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-brand group-hover:scale-110 transition-transform shadow-inner">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-base font-bold text-text-primary tracking-tight">Favorabilidad</h3>
                    <span className="text-xs font-bold text-text-secondary tracking-tight">Resumen comparativo</span>
                  </div>
                </div>

                {/* Segmented Control Toggle */}
                <div className="bg-muted/30 p-1.5 rounded-xl border border-border/5 flex items-center gap-1">
                  <button
                    onClick={() => setActiveViewTop('detalle')}
                    className={cn(
                      "px-4 py-2 text-xs font-bold tracking-tight rounded-lg transition-all",
                      activeViewTop === 'detalle' ? "bg-surface text-brand shadow-sm" : "text-text-secondary/40 hover:text-text-secondary"
                    )}
                  >
                    Detalle
                  </button>
                  <button
                    onClick={() => setActiveViewTop('tendencia')}
                    className={cn(
                      "px-4 py-2 text-xs font-bold tracking-tight rounded-lg transition-all",
                      activeViewTop === 'tendencia' ? "bg-surface text-brand shadow-sm" : "text-text-secondary/40 hover:text-text-secondary"
                    )}
                  >
                    Tendencia
                  </button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 px-8 pb-6">
              <div className="h-full flex flex-col justify-center relative">
                {activeViewTop === 'detalle' ? (
                  <div className="animate-in fade-in slide-in-from-left-2 duration-500 h-full flex flex-col justify-center space-y-8">
                    {resumenBaseFavItem ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm font-bold text-text-primary">{resumenBaseFavItem.label}</span>
                          <span className="px-2 py-1 bg-brand/10 text-brand text-xs font-bold rounded-lg">BASE</span>
                        </div>
                        <div className="text-3xl font-bold text-brand">{resumenBaseFavItem.value}%</div>
                      </div>
                    ) : null}
                    <ResponseStackedBarGroup
                      items={resumenDistributionItems}
                      showLegend={false}
                      showPercentages
                      size="md"
                      compact
                      className="space-y-8"
                    />
                  </div>
                ) : (
                  <div className="animate-in fade-in slide-in-from-right-2 duration-500 h-full flex flex-col justify-center">
                    <TrendMetricLineChart
                      series={resumenFavTrendSeries}
                      height={280}
                      showLegend={false}
                      showComparison={false}
                      standalone
                    />
                  </div>
                )}
              </div>
            </CardContent>

            {activeViewTop === 'tendencia' && (
              <div className="mt-auto bg-muted/5 border-t border-border/10 px-8 py-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <MetricComparisonFooter
                  items={resumenFavFooterItems}
                  columns={resumenFavFooterItems.length}
                  className="border-none p-0 bg-transparent"
                />
              </div>
            )}
          </Card>

          {/* Participation Card */}
          <Card className="border border-border/40 bg-surface shadow-sm rounded-[40px] overflow-hidden group hover:shadow-xl hover:border-border/60 transition-all duration-500 flex flex-col min-h-[600px]">
            <CardHeader className="px-8 pt-8 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-brand group-hover:scale-110 transition-transform shadow-inner">
                    <Users className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-base font-bold text-text-primary tracking-tight">Participación</h3>
                    <span className="text-xs font-bold text-text-secondary tracking-tight">Tasa de respuesta</span>
                  </div>
                </div>

                {/* Segmented Control Toggle */}
                <div className="bg-muted/30 p-1.5 rounded-xl border border-border/5 flex items-center gap-1">
                  <button
                    onClick={() => setActiveViewTopPart('detalle')}
                    className={cn(
                      "px-4 py-2 text-xs font-bold tracking-tight rounded-lg transition-all",
                      activeViewTopPart === 'detalle' ? "bg-surface text-brand shadow-sm" : "text-text-secondary/40 hover:text-text-secondary"
                    )}
                  >
                    Detalle
                  </button>
                  <button
                    onClick={() => setActiveViewTopPart('tendencia')}
                    className={cn(
                      "px-4 py-2 text-xs font-bold tracking-tight rounded-lg transition-all",
                      activeViewTopPart === 'tendencia' ? "bg-surface text-brand shadow-sm" : "text-text-secondary/40 hover:text-text-secondary"
                    )}
                  >
                    Tendencia
                  </button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 px-8 pb-6">
              <div className="h-full flex flex-col justify-center relative">
                {activeViewTopPart === 'detalle' ? (
                  <div className="animate-in fade-in slide-in-from-left-2 duration-500 h-full flex flex-col justify-center space-y-8">
                    {resumenBasePartItem ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm font-bold text-text-primary">{resumenBasePartItem.label}</span>
                          <span className="px-2 py-1 bg-brand/10 text-brand text-xs font-bold rounded-lg">BASE</span>
                        </div>
                        <div className="text-3xl font-bold text-brand">{resumenBasePartItem.value}%</div>
                      </div>
                    ) : null}
                    <ResponseStackedBarGroup
                      items={resumenPartDistributionItems}
                      showLegend={false}
                      showPercentages
                      size="md"
                      compact
                      className="space-y-8"
                    />
                  </div>
                ) : (
                  <div className="animate-in fade-in slide-in-from-right-2 duration-500 h-full flex flex-col justify-center">
                    <TrendMetricLineChart
                      series={resumenPartTrendSeries}
                      height={280}
                      showLegend={false}
                      showComparison={false}
                      standalone
                    />
                  </div>
                )}
              </div>
            </CardContent>

            {activeViewTopPart === 'tendencia' && (
              <div className="mt-auto bg-muted/5 border-t border-border/10 px-8 py-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <MetricComparisonFooter
                  items={resumenPartFooterItems}
                  columns={resumenPartFooterItems.length}
                  className="border-none p-0 bg-transparent"
                />
              </div>
            )}
          </Card>

          {/* NPS Card */}
          {type !== 'Cultura' && (
            <Card className="border border-border/40 bg-surface shadow-sm rounded-[40px] overflow-hidden group hover:shadow-xl hover:border-border/60 transition-all duration-500 flex flex-col min-h-[600px]">
              <CardHeader className="px-8 pt-8 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-brand group-hover:scale-110 transition-transform shadow-inner">
                      <Star className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-base font-bold text-text-primary tracking-tight">NPS</h3>
                      <span className="text-xs font-bold text-text-secondary tracking-tight">Net Promoter Score</span>
                    </div>
                  </div>

                  {/* Segmented Control Toggle */}
                  <div className="bg-muted/30 p-1.5 rounded-xl border border-border/5 flex items-center gap-1">
                    <button
                      onClick={() => setActiveViewTopNPS('detalle')}
                      className={cn(
                        "px-4 py-2 text-xs font-bold tracking-tight rounded-lg transition-all",
                        activeViewTopNPS === 'detalle' ? "bg-surface text-brand shadow-sm" : "text-text-secondary/40 hover:text-text-secondary"
                      )}
                    >
                      Detalle
                    </button>
                    <button
                      onClick={() => setActiveViewTopNPS('tendencia')}
                      className={cn(
                        "px-4 py-2 text-xs font-bold tracking-tight rounded-lg transition-all",
                        activeViewTopNPS === 'tendencia' ? "bg-surface text-brand shadow-sm" : "text-text-secondary/40 hover:text-text-secondary"
                      )}
                    >
                      Tendencia
                    </button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 px-8 pb-6">
                <div className="h-full flex flex-col justify-center relative">
                  {activeViewTopNPS === 'detalle' ? (
                    <div className="animate-in fade-in slide-in-from-left-2 duration-500 h-full flex flex-col justify-center space-y-8">
                      {resumenBaseNpsItem ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm font-bold text-text-primary">{resumenBaseNpsItem.label}</span>
                            <span className="px-2 py-1 bg-brand/10 text-brand text-xs font-bold rounded-lg">BASE</span>
                          </div>
                          <div className="text-3xl font-bold text-brand">{resumenBaseNpsItem.value}%</div>
                        </div>
                      ) : null}
                      <ResponseStackedBarGroup
                        items={resumenNpsDistributionItems}
                        showLegend={false}
                        showPercentages
                        size="md"
                        compact
                        className="space-y-8"
                      />
                    </div>
                  ) : (
                    <div className="animate-in fade-in slide-in-from-right-2 duration-500 h-full flex flex-col justify-center">
                      <TrendMetricLineChart
                        series={resumenNpsTrendSeries}
                        height={280}
                        showLegend={false}
                        showComparison={false}
                        standalone
                      />
                    </div>
                  )}
                </div>
              </CardContent>

              {activeViewTopNPS === 'tendencia' && (
                <div className="mt-auto bg-muted/5 border-t border-border/10 px-8 py-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <MetricComparisonFooter
                    items={resumenNpsFooterItems}
                    columns={resumenNpsFooterItems.length}
                    className="border-none p-0 bg-transparent"
                  />
                </div>
              )}
            </Card>
          )}
        </div>

        {/* 3. Functional Content Area */}
        <div className="px-4 sm:px-8 py-8 min-h-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between mb-10 overflow-x-auto scrollbar-hide py-2">
              <TabsList className="bg-surface-muted/40 p-1.5 rounded-full border border-border/30 h-auto gap-1">
                <TabsTrigger
                  value="dimensiones"
                  className="rounded-full px-6 py-2.5 text-xs font-semibold tracking-tight transition-all duration-300 data-[state=active]:bg-brand data-[state=active]:text-text-inverse data-[state=active]:shadow-lg shadow-brand/20 text-text-secondary/60 hover:text-text-primary hover:bg-white/40 gap-2"
                >
                  <Layers className="h-3.5 w-3.5" />
                  Dimensiones
                </TabsTrigger>
                <TabsTrigger
                  value="preguntas"
                  className="rounded-full px-6 py-2.5 text-xs font-semibold tracking-tight transition-all duration-300 data-[state=active]:bg-brand data-[state=active]:text-text-inverse data-[state=active]:shadow-lg shadow-brand/20 text-text-secondary/60 hover:text-text-primary hover:bg-white/40 gap-2"
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                  Preguntas
                </TabsTrigger>
                <TabsTrigger
                  value="comentarios"
                  className="rounded-full px-6 py-2.5 text-xs font-semibold tracking-tight transition-all duration-300 data-[state=active]:bg-brand data-[state=active]:text-text-inverse data-[state=active]:shadow-lg shadow-brand/20 text-text-secondary/60 hover:text-text-primary hover:bg-white/40 gap-2"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  Comentarios
                </TabsTrigger>
                <TabsTrigger
                  value="insights"
                  className="rounded-full px-6 py-2.5 text-xs font-semibold tracking-tight transition-all duration-300 data-[state=active]:bg-brand data-[state=active]:text-text-inverse data-[state=active]:shadow-lg shadow-brand/20 text-text-secondary/60 hover:text-text-primary hover:bg-white/40 gap-2"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Insights IA
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="favorabilidad" className="mt-0 focus-visible:outline-none animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex flex-col gap-8 pb-12 px-1">
                <Card className="border border-border/40 bg-surface shadow-xl shadow-border/[0.02] rounded-[40px] overflow-hidden min-h-[600px]">
                  <CardHeader className="px-10 pt-10 pb-6 border-b border-border/40 bg-surface/50 backdrop-blur-sm sticky top-0 z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex flex-col gap-1">
                        <h2 className="text-2xl font-bold text-text-primary tracking-tight">Análisis de Favorabilidad</h2>
                        <p className="text-xs text-text-secondary font-semibold tracking-tight opacity-60">Percepción de clima y cultura organizacional</p>
                      </div>

                      <div className="flex items-center p-1 bg-surface-subtle rounded-xl border border-border/20">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setActiveFilterTab('favorabilidad');
                            setIsFiltersDrawerOpen(true);
                          }}
                          className={cn(
                            "h-9 px-6 gap-2.5 text-sm font-bold tracking-tight rounded-lg transition-all shadow-sm",
                            getActiveFiltersCount('favorabilidad').total > 0
                              ? "bg-brand text-text-inverse shadow-brand/20"
                              : "bg-surface border-border/10 text-text-secondary hover:bg-surface-muted"
                          )}
                        >
                          <Filter className="h-3.5 w-3.5" />
                          <span>Demográficos</span>
                          {getActiveFiltersCount('favorabilidad').total > 0 && (
                            <span className="flex items-center justify-center bg-surface text-brand text-xs font-bold h-5 min-w-[20px] px-1 rounded-full ml-1">
                              {getActiveFiltersCount('favorabilidad').total}
                            </span>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 xl:grid-cols-2">
                      {/* Distribution Panel */}
                      <div className="p-10 border-b xl:border-b-0 xl:border-r border-border/40 flex flex-col gap-8 group hover:bg-muted/5 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-text-secondary/30 tracking-tight">Desglose de Respuestas</span>
                            <h4 className="text-xl font-bold text-text-brand tracking-tight">Distribución por Periodo</h4>
                          </div>

                          <div className="h-10 w-10 rounded-xl bg-muted/30 flex items-center justify-center text-text-secondary/40">
                            <Layers className="h-5 w-5" />
                          </div>
                        </div>

                        <div className="flex-1 min-h-[400px] flex flex-col justify-center bg-muted/5 rounded-[2rem] p-8 border border-border/5">
                          <ResponseStackedBarGroup
                            items={distributionItems}
                            showLegend
                            showPercentages
                            size="md"
                            className="space-y-8"
                          />
                        </div>
                      </div>

                      {/* Trend Panel */}
                      <div className="p-10 flex flex-col gap-8 group hover:bg-muted/5 transition-colors min-h-[600px]">
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-text-secondary/30 tracking-tight">Evolución Temporal</span>
                            <h4 className="text-xl font-bold text-text-brand tracking-tight">Tendencia de Favorabilidad</h4>
                          </div>
                          <div className="h-10 w-10 rounded-xl bg-muted/30 flex items-center justify-center text-text-secondary/40">
                            <TrendingUp className="h-5 w-5" />
                          </div>
                        </div>

                        <div className="flex-1 min-h-[400px]">
                          <TrendMetricLineChart
                            series={favTrendSeries}
                            height={400}
                            showLegend={false}
                            showComparison={false}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Variation Summary Basement */}
                    <div className="border-t border-border/40 bg-muted/5 relative overflow-hidden">
                      <div className="px-10 py-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                          <span className="text-xs font-bold text-text-secondary tracking-tight">Variaciones contra Referencia Base</span>
                        </div>
                      </div>

                      <div className="px-10 pb-10">
                        <MetricComparisonFooter
                          items={favFooterItems}
                          columns={favFooterItems.length}
                          className="border-none p-0 bg-transparent"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="participacion" className="mt-0 outline-none">
              <div className="flex flex-col gap-8 pb-12 px-1">
                <Card className="border border-border/40 bg-surface shadow-xl shadow-border/[0.02] rounded-[40px] overflow-hidden min-h-[600px]">
                  <CardHeader className="px-10 pt-10 pb-6 border-b border-border/40 bg-surface/50 backdrop-blur-sm sticky top-0 z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex flex-col gap-1">
                        <h2 className="text-2xl font-bold text-text-primary tracking-tight">Métricas de Participación</h2>
                        <p className="text-xs text-text-secondary font-semibold tracking-tight opacity-60">Nivel de compromiso y respuesta por periodo</p>
                      </div>

                      <div className="flex items-center p-1 bg-surface-subtle rounded-xl border border-border/20">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setActiveFilterTab('participacion');
                            setIsFiltersDrawerOpen(true);
                          }}
                          className={cn(
                            "h-9 px-6 gap-2.5 text-sm font-bold tracking-tight rounded-lg transition-all shadow-sm",
                            getActiveFiltersCount('participacion').total > 0
                              ? "bg-brand text-text-inverse shadow-brand/20"
                              : "bg-surface border-border/10 text-text-secondary hover:bg-surface-muted"
                          )}
                        >
                          <Filter className="h-3.5 w-3.5" />
                          <span>Demográficos</span>
                          {getActiveFiltersCount('participacion').total > 0 && (
                            <span className="flex items-center justify-center bg-surface text-brand text-xs font-bold h-5 min-w-[20px] px-1 rounded-full ml-1">
                              {getActiveFiltersCount('participacion').total}
                            </span>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 xl:grid-cols-2">
                      {/* Distribution Panel */}
                      <div className="p-10 border-b xl:border-b-0 xl:border-r border-border/40 flex flex-col gap-8 group hover:bg-muted/5 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-text-secondary/30 tracking-tight">Métricas de Cobertura</span>
                            <h4 className="text-xl font-bold text-text-brand tracking-tight">Participación por Periodo</h4>
                          </div>

                          <div className="h-10 w-10 rounded-xl bg-muted/30 flex items-center justify-center text-text-secondary/40">
                            <Users className="h-5 w-5" />
                          </div>
                        </div>

                        <div className="flex-1 min-h-[400px] flex flex-col justify-center bg-muted/5 rounded-[2rem] p-8 border border-border/5">
                          <ResponseStackedBarGroup
                            items={partDistributionItems}
                            showLegend
                            showPercentages
                            size="md"
                            className="space-y-8"
                          />
                        </div>
                      </div>

                      {/* Trend Panel */}
                      <div className="p-10 flex flex-col gap-8 group hover:bg-muted/5 transition-colors min-h-[600px]">
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-text-secondary/30 tracking-tight">Evolución Temporal</span>
                            <h4 className="text-xl font-bold text-text-brand tracking-tight">Tendencia de Respuesta</h4>
                          </div>
                          <div className="h-10 w-10 rounded-xl bg-muted/30 flex items-center justify-center text-text-secondary/40">
                            <TrendingUp className="h-5 w-5" />
                          </div>
                        </div>

                        <div className="flex-1 min-h-[400px]">
                          <TrendMetricLineChart
                            series={partTrendSeries}
                            height={400}
                            showLegend={false}
                            showComparison={false}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Variation Summary Basement */}
                    <div className="border-t border-border/40 bg-muted/5 relative overflow-hidden">
                      <div className="px-10 py-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                          <span className="text-xs font-bold text-text-secondary tracking-tight">Variación contra Referente Sectorial</span>
                        </div>
                      </div>

                      <div className="px-10 pb-10">
                        <MetricComparisonFooter
                          items={partFooterItems}
                          columns={partFooterItems.length}
                          className="border-none p-0 bg-transparent"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="nps" className="mt-0 outline-none">
              <div className="flex flex-col gap-8 pb-12 px-1">
                <Card className="border border-border/40 bg-surface shadow-xl shadow-border/[0.02] rounded-[40px] overflow-hidden min-h-[600px]">
                  <CardHeader className="px-10 pt-10 pb-6 border-b border-border/40 bg-surface/50 backdrop-blur-sm sticky top-0 z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex flex-col gap-1">
                        <h2 className="text-2xl font-bold text-text-primary tracking-tight">Net Promoter Score (NPS)</h2>
                        <p className="text-xs text-text-secondary font-semibold tracking-tight opacity-60">Lealtad y recomendación de los colaboradores</p>
                      </div>

                      <div className="flex items-center p-1 bg-surface-subtle rounded-xl border border-border/20">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setActiveFilterTab('nps');
                            setIsFiltersDrawerOpen(true);
                          }}
                          className={cn(
                            "h-9 px-6 gap-2.5 text-sm font-bold tracking-tight rounded-lg transition-all shadow-sm",
                            getActiveFiltersCount('nps').total > 0
                              ? "bg-brand text-text-inverse shadow-brand/20"
                              : "bg-surface border-border/10 text-text-secondary hover:bg-surface-muted"
                          )}
                        >
                          <Filter className="h-3.5 w-3.5" />
                          <span>Demográficos</span>
                          {getActiveFiltersCount('nps').total > 0 && (
                            <span className="flex items-center justify-center bg-surface text-brand text-xs font-bold h-5 min-w-[20px] px-1 rounded-full ml-1">
                              {getActiveFiltersCount('nps').total}
                            </span>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 xl:grid-cols-2">
                      {/* Distribution Panel */}
                      <div className="p-10 border-b xl:border-b-0 xl:border-r border-border/40 flex flex-col gap-8 group hover:bg-muted/5 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-text-secondary/30 tracking-tight">Distribución NPS por Periodo</span>
                            <h4 className="text-xl font-bold text-text-brand tracking-tight">Análisis NPS por Periodo</h4>
                          </div>

                          <div className="h-10 w-10 rounded-xl bg-muted/30 flex items-center justify-center text-text-secondary/40">
                            <Target className="h-5 w-5" />
                          </div>
                        </div>

                        <div className="flex-1 min-h-[400px] flex flex-col justify-center bg-muted/5 rounded-[2rem] p-8 border border-border/5">
                          <ResponseStackedBarGroup
                            items={npsDistributionItems}
                            showLegend
                            showPercentages
                            size="md"
                            className="space-y-8"
                          />
                        </div>
                      </div>

                      {/* Trend Panel */}
                      <div className="p-10 flex flex-col gap-8 group hover:bg-muted/5 transition-colors min-h-[600px]">
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-text-secondary/30 tracking-tight">Tendencia de Lealtad</span>
                            <h4 className="text-xl font-bold text-text-brand tracking-tight">Evolución del NPS</h4>
                          </div>
                          <div className="h-10 w-10 rounded-xl bg-muted/30 flex items-center justify-center text-text-secondary/40">
                            <TrendingUp className="h-5 w-5" />
                          </div>
                        </div>

                        <div className="flex-1 h-[400px]">
                          <TrendMetricLineChart
                            series={npsTrendSeries}
                            height={400}
                            showLegend={false}
                            showComparison={false}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Variation Summary Basement */}
                    <div className="border-t border-border/40 bg-muted/5 relative overflow-hidden">
                      <div className="px-10 py-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-2 rounded-full bg-warning animate-pulse" />
                          <span className="text-xs font-bold text-text-secondary tracking-tight">Resumen de Lealtad vs Referente</span>
                        </div>
                      </div>

                      <div className="px-10 pb-10">
                        <MetricComparisonFooter
                          items={npsFooterItems}
                          columns={npsFooterItems.length}
                          className="border-none p-0 bg-transparent"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="dimensiones" className="mt-0 focus-visible:outline-none animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex flex-col gap-8 pb-12 px-1">
                <Card className="border border-border/40 bg-surface shadow-xl shadow-border/[0.02] rounded-[40px] overflow-hidden min-h-[600px]">
                  <CardHeader className="px-10 pt-10 pb-6 border-b border-border/40 bg-surface/50 backdrop-blur-sm sticky top-0 z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="h-11 w-11 rounded-2xl bg-brand/5 border border-brand/10 flex items-center justify-center shadow-sm">
                          <Layers className="h-5 w-5 text-brand" />
                        </div>
                        <div className="flex flex-col">
                          <h3 className="text-xl font-bold text-text-primary tracking-tight leading-none mb-1">
                            Dimensiones
                          </h3>
                          <p className="text-sm font-medium text-text-secondary/50 tracking-tight">
                            Visualización detallada por eje temático y comparativa histórica
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 ml-auto">
                        <div className="flex items-center p-1 bg-surface-subtle rounded-xl border border-border/20">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDimensionsView('table')}
                            className={cn("h-9 rounded-lg font-semibold text-xs gap-2 px-4 border transition-all", dimensionsView === 'table' ? "bg-surface shadow-sm text-brand border-border/10" : "text-text-secondary border-transparent hover:bg-surface/50")}
                          >
                            <TableIcon className="h-3.5 w-3.5" />
                            Tabla
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDimensionsView('heatmap')}
                            className={cn("h-9 rounded-lg font-semibold text-xs gap-2 px-4 border transition-all", dimensionsView === 'heatmap' ? "bg-surface shadow-sm text-brand border-border/10" : "text-text-secondary border-transparent hover:bg-surface/50")}
                          >
                            <LayoutGrid className="h-3.5 w-3.5" />
                            Heatmap
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Filtro por Dimensión */}
                        <div className="flex items-center p-1 bg-surface-subtle rounded-xl border border-border/20">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-9 px-4 gap-2 text-xs font-bold tracking-tight rounded-lg transition-all bg-surface border-border/10 text-text-secondary hover:bg-surface-muted"
                              >
                                <Layers className="h-3.5 w-3.5" />
                                <span>Dimensión ({selectedDimensions.length})</span>
                                <ChevronDown className="h-3 w-3 opacity-40" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-64 bg-surface border border-border/40 shadow-drawer rounded-lg p-2 max-h-[400px] overflow-y-auto">
                              <DropdownMenuLabel className="text-xs font-bold tracking-tight text-text-secondary px-2 py-1.5">Seleccionar Dimensiones</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <div className="flex flex-col gap-1 p-1">
                                <DropdownMenuItem onClick={selectAllDimensions} className="text-xs font-bold tracking-tight p-2 rounded-md focus:bg-brand/5 focus:text-brand cursor-pointer">
                                  Seleccionar todas
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={deselectAllDimensions} className="text-xs font-bold tracking-tight p-2 rounded-md focus:bg-brand/5 focus:text-brand cursor-pointer">
                                  Limpiar selección
                                </DropdownMenuItem>
                              </div>
                              <DropdownMenuSeparator />
                              <div className="space-y-1 mt-1">
                                {dimensionsData.map(dim => (
                                  <DropdownMenuCheckboxItem
                                    key={dim.id}
                                    checked={selectedDimensions.includes(dim.name)}
                                    onCheckedChange={() => toggleDimension(dim.name)}
                                    className="text-xs font-bold tracking-tight p-2 rounded-md focus:bg-brand/5 focus:text-brand cursor-pointer"
                                  >
                                    {dim.name}
                                  </DropdownMenuCheckboxItem>
                                ))}
                              </div>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {/* Filtro por Orden */}
                        <div className="flex items-center p-1 bg-surface-subtle rounded-xl border border-border/20">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-9 px-4 gap-2 text-xs font-bold tracking-tight rounded-lg transition-all bg-surface border-border/10 text-text-secondary hover:bg-surface-muted"
                              >
                                <ArrowUpDown className="h-3.5 w-3.5" />
                                <span>Orden: {sortLabels[sortCriteria]}</span>
                                <ChevronDown className="h-3 w-3 opacity-40" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 bg-surface border border-border/40 shadow-drawer rounded-lg p-2">
                              <DropdownMenuLabel className="text-xs font-bold tracking-tight text-text-secondary px-2 py-1.5">Ordenar por</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuRadioGroup value={sortCriteria} onValueChange={setSortCriteria}>
                                <DropdownMenuRadioItem value="mejora" className="text-xs font-bold tracking-tight p-3 rounded-md focus:bg-brand/5 focus:text-brand cursor-pointer">
                                  Mayor mejora
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="caida" className="text-xs font-bold tracking-tight p-3 rounded-md focus:bg-brand/5 focus:text-brand cursor-pointer">
                                  Mayor caída
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="alto" className="text-xs font-bold tracking-tight p-3 rounded-md focus:bg-brand/5 focus:text-brand cursor-pointer">
                                  Puntaje más alto
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="respuestas" className="text-xs font-bold tracking-tight p-3 rounded-md focus:bg-brand/5 focus:text-brand cursor-pointer">
                                  Más respuestas
                                </DropdownMenuRadioItem>
                              </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {/* Heatmap specific controls */}
                        {dimensionsView === 'heatmap' && (
                          <>
                            <div className="flex items-center p-1 bg-surface-subtle rounded-xl border border-border/20">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className={cn(
                                      "h-9 px-6 gap-2.5 text-xs font-bold tracking-tight rounded-lg transition-all shadow-sm",
                                      heatmapSegment !== 'Área'
                                        ? "bg-brand text-text-inverse shadow-md shadow-brand/20"
                                        : "bg-surface border-border/10 text-text-secondary hover:bg-surface-muted"
                                    )}
                                  >
                                    <SlidersHorizontal className="h-3.5 w-3.5" />
                                    <span>VER POR: {heatmapSegment}</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-52 bg-surface border border-border/40 shadow-drawer rounded-lg p-2">
                                  <DropdownMenuRadioGroup value={heatmapSegment} onValueChange={setHeatmapSegment}>
                                    {[
                                      'Área', 'Líder', 'Rol', 'Ciudad', 'País', 'Edad', 'Sexo', 'Antigüedad', 'Tipo de Contrato'
                                    ].map(v => (
                                      <DropdownMenuRadioItem key={v} value={v} className="text-sm font-semibold tracking-tight p-3 rounded-md focus:bg-brand/5 focus:text-brand cursor-pointer">
                                        {v}
                                      </DropdownMenuRadioItem>
                                    ))}
                                  </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>

                            <div className="flex items-center p-1 bg-surface-subtle rounded-xl border border-border/20">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setActiveFilterTab('dimensionesHeatmap');
                                  setIsFiltersDrawerOpen(true);
                                }}
                                className={cn(
                                  "h-9 px-4 gap-2 text-xs font-bold tracking-tight rounded-lg transition-all",
                                  getActiveFiltersCount('dimensionesHeatmap').total > 0
                                    ? "bg-brand text-text-inverse shadow-md shadow-brand/20"
                                    : "bg-surface border-border/10 text-text-secondary hover:bg-surface-muted"
                                )}
                              >
                                <Filter className="h-3.5 w-3.5" />
                                <span>Segmentación</span>
                                {getActiveFiltersCount('dimensionesHeatmap').total > 0 && (
                                  <span className="flex items-center justify-center bg-surface text-brand text-xs font-bold h-5 min-w-[20px] px-1 rounded-full ml-1">
                                    {getActiveFiltersCount('dimensionesHeatmap').total}
                                  </span>
                                )}
                              </Button>
                            </div>
                          </>
                        )}

                        {/* Table specific controls */}
                        {dimensionsView === 'table' && (
                          <div className="flex items-center p-1 bg-surface-subtle rounded-xl border border-border/20">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setActiveFilterTab('dimensionesTable');
                                setIsFiltersDrawerOpen(true);
                              }}
                              className={cn(
                                "h-9 px-4 gap-2 text-xs font-bold tracking-tight rounded-lg transition-all",
                                getActiveFiltersCount('dimensionesTable').total > 0
                                  ? "bg-brand text-text-inverse shadow-md shadow-brand/20"
                                  : "bg-surface border-border/10 text-text-secondary hover:bg-surface-muted"
                              )}
                            >
                              <Filter className="h-3.5 w-3.5" />
                              <span>Demográficos</span>
                              {getActiveFiltersCount('dimensionesTable').total > 0 && (
                                <span className="flex items-center justify-center bg-surface text-brand text-xs font-bold h-5 min-w-[20px] px-1 rounded-full ml-1">
                                  {getActiveFiltersCount('dimensionesTable').total}
                                </span>
                              )}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="px-8 pb-8">
                    {dimensionsView === 'table' ? (
                      <>
                        {renderTableLegend('dimension')}
                        <Table>
                        <TableHeader className="[&_tr]:border-b-0">
                          <TableRow className="hover:bg-transparent border-b border-border/40">
                            <TableHead className="h-14 text-[11px] font-bold tracking-tight text-text-secondary/50 pl-0 w-[30%]">Dimensión</TableHead>
                            {columns.map((col) => (
                              <TableHead
                                key={col.id}
                                className={cn(
                                  "h-14 text-center tracking-tight",
                                  col.isBase ? "text-sm font-bold text-brand" : "text-[11px] font-bold text-text-secondary/50"
                                )}
                              >
                                <div className="flex flex-col items-center leading-tight">
                                  <span>{col.shortLabel}</span>
                                  {col.isBase && <span className="text-[9px] opacity-70 tracking-widest mt-0.5">(Referencia base)</span>}
                                </div>
                              </TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredAndSortedDimensions.length > 0 ? (
                            filteredAndSortedDimensions.map((dim) => (
                              <TableRow key={dim.id} className="group hover:bg-surface-muted/30 transition-colors border-b border-border/20">
                                <TableCell className="py-6 pl-0">
                                  <div className="flex flex-col gap-0.5">
                                    <span className="text-sm font-bold text-text-primary tracking-tight group-hover:text-brand transition-colors">{dim.name}</span>
                                    <span className="text-xs font-medium text-text-secondary/70 truncate max-w-[280px]">{dim.description}</span>
                                  </div>
                                </TableCell>
                                {columns.map((col) => {
                                  const rawScore = (dim as any)[col.dimKey];
                                  const score = rawScore !== null && rawScore !== undefined ? rawScore : null;
                                  const baseCol = columns.find(c => c.isBase);
                                  const rawBaseScore = baseCol ? (dim as any)[baseCol.dimKey] : dim.currentScore;
                                  const baseScore = rawBaseScore !== null && rawBaseScore !== undefined ? rawBaseScore : null;

                                  return (
                                    <TableCell key={col.id} className="text-center">
                                      <div className="flex flex-col items-center gap-1.5">
                                        <div className="flex items-center gap-2">
                                          {(type === 'Cultura' && (dim.id + col.id).length % 12 === 0 && (dim as any)[col.dimKey] !== undefined) ? (
                                            <TooltipProvider delayDuration={0}>
                                              <Tooltip>
                                                <TooltipTrigger asChild>
                                                  <span className="text-[10px] font-bold text-text-secondary/50 uppercase tracking-wider cursor-help bg-muted/30 px-1.5 py-0.5 rounded border border-border/10 transition-colors hover:bg-muted/50">
                                                    Privado
                                                  </span>
                                                </TooltipTrigger>
                                                <TooltipContent className="bg-surface border border-border/40 shadow-premium p-3 rounded-xl max-w-[220px]">
                                                  <p className="text-xs font-semibold leading-relaxed text-text-secondary">
                                                    Esta información es privada porque no se alcanzó el umbral mínimo de respuestas necesarias para garantizar el anonimato.
                                                  </p>
                                                </TooltipContent>
                                              </Tooltip>
                                            </TooltipProvider>
                                          ) : (
                                            <>
                                              <span className={cn(
                                                "font-bold",
                                                col.isBase ? "text-base text-brand" : "text-sm text-text-secondary"
                                              )}>
                                                {score !== null ? (
                                                  `${score}%`
                                                ) : (
                                                  <TooltipProvider delayDuration={0}>
                                                    <Tooltip>
                                                      <TooltipTrigger asChild>
                                                        {type === 'Cultura' && (dim as any)[col.dimKey] === undefined ? (
                                                          <span className="flex items-center gap-1 text-[10px] font-bold text-text-secondary/40 uppercase tracking-tight bg-muted/20 px-1.5 py-0.5 rounded border border-border/5 cursor-help transition-colors hover:bg-muted/30">
                                                            <Minus className="h-2.5 w-2.5" />
                                                            Sin Dimensión
                                                          </span>
                                                        ) : (
                                                          <span className="text-sm font-bold text-text-secondary/30 cursor-help underline decoration-dotted decoration-text-secondary/10 underline-offset-4">
                                                            —
                                                          </span>
                                                        )}
                                                      </TooltipTrigger>
                                                      <TooltipContent className="bg-surface border border-border/40 shadow-premium p-3 rounded-xl max-w-[220px]">
                                                        <p className="text-xs font-semibold leading-relaxed text-text-secondary">
                                                          {(dim as any)[col.dimKey] === undefined 
                                                            ? "Esta dimensión no formaba parte del diseño de esta medición específica."
                                                            : "No se registraron respuestas suficientes para esta dimensión en este periodo."}
                                                        </p>
                                                      </TooltipContent>
                                                    </Tooltip>
                                                  </TooltipProvider>
                                                )}
                                              </span>
                                              {!col.isBase && score !== null && baseScore !== null && (
                                                <DeltaPill value={Number((score - baseScore).toFixed(1))} size="xs" />
                                              )}
                                            </>
                                          )}
                                        </div>
                                        <span className="text-[10px] font-bold tracking-tight text-text-secondary/40">n={col.responses}</span>
                                      </div>
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={6} className="h-32 text-center text-text-secondary/40 font-medium">
                                No hay dimensiones que coincidan con la selección
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </>
                  ) : (
                      <div className="space-y-6">
                        {/* Heatmap Legend */}
                        <div className="flex items-center gap-4 py-4 border-y border-border/20 flex-wrap">
                          <span className="text-xs font-bold tracking-tight text-text-secondary/60 mr-4">Leyenda:</span>
                          <div className="flex items-center gap-2">
                            <div className={cn("w-6 h-6 rounded-md border border-border/20", "heatmap-negative-strong")} />
                            <span className="text-xs font-bold text-text-secondary">&lt; -5pp</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={cn("w-6 h-6 rounded-md border border-border/20", "heatmap-negative-light")} />
                            <span className="text-xs font-bold text-text-secondary">-4 a -1pp</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={cn("w-6 h-6 rounded-md border border-border/20", "heatmap-neutral")} />
                            <span className="text-xs font-bold text-text-secondary">0pp</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={cn("w-6 h-6 rounded-md border border-border/20", "heatmap-positive-light")} />
                            <span className="text-xs font-bold text-text-secondary">+1 a +4pp</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={cn("w-6 h-6 rounded-md border border-border/20", "heatmap-positive-strong")} />
                            <span className="text-xs font-bold text-text-secondary">&gt; +5pp</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-md bg-muted/30 border border-border/20 flex items-center justify-center">
                              <span className="text-xs font-bold text-text-secondary">P</span>
                            </div>
                            <span className="text-xs font-bold text-text-secondary">Privado</span>
                          </div>
                        </div>

                        {/* Heatmap Matrix */}
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="border-b border-border/40">
                                <th className="h-14 text-left text-sm font-bold text-text-secondary tracking-tight pl-0 min-w-[150px]">Dimensión</th>
                                {heatmapData.segments.map((seg) => (
                                  <th key={seg.id} className="h-14 text-center text-[11px] font-bold tracking-tight text-text-secondary/50 min-w-[100px]">{seg.label}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {filteredAndSortedDimensions.map((dimBase) => {
                                const dim = heatmapData.data.find(d => d.name === dimBase.name);
                                if (!dim) return null;
                                return (
                                  <tr key={dim.id} className="border-b border-border/20 hover:bg-surface-muted/30 transition-colors">
                                    <td className="py-4 pl-0">
                                      <span className="text-sm font-semibold text-text-primary">{dim.name}</span>
                                    </td>
                                    {heatmapData.segments.map((seg) => {
                                      const cell = dim.segments[seg.id];
                                      if (!cell) {
                                        const isNewInBase = (dimBase as any).p1 === undefined || (dimBase as any).p1 === null;
                                        return (
                                          <td key={seg.id} className="p-2 text-center">
                                            <TooltipProvider delayDuration={0}>
                                              <Tooltip>
                                                <TooltipTrigger asChild>
                                                  <span className="text-xs font-bold text-text-secondary/30 cursor-help underline decoration-dotted decoration-text-secondary/10 underline-offset-4">
                                                    —
                                                  </span>
                                                </TooltipTrigger>
                                                <TooltipContent className="bg-surface border border-border/40 shadow-premium p-3 rounded-xl max-w-[220px]">
                                                  <p className="text-xs font-semibold leading-relaxed text-text-secondary">
                                                    {isNewInBase 
                                                      ? "Esta dimensión solo forma parte de la encuesta base. Las otras encuestas de comparación no cuentan con esta dimensión, por lo que no existen variaciones (deltas) para comparar."
                                                      : "No hay datos suficientes para este segmento demográfico en esta dimensión."}
                                                  </p>
                                                </TooltipContent>
                                              </Tooltip>
                                            </TooltipProvider>
                                          </td>
                                        );
                                      }

                                      if (cell.status === 'private') {
                                        return (
                                          <td key={seg.id} className="p-2 text-center">
                                            <TooltipProvider delayDuration={0}>
                                              <Tooltip>
                                                <TooltipTrigger asChild>
                                                  <div className="w-full h-12 rounded-lg bg-muted/30 border border-border/20 flex flex-col items-center justify-center gap-1 cursor-help transition-all hover:bg-muted/40">
                                                    <div className="w-3.5 h-3.5 rounded-full bg-text-secondary/10 flex items-center justify-center">
                                                      <svg className="w-2 h-2 text-text-secondary/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                      </svg>
                                                    </div>
                                                    <span className="text-[9px] font-bold text-text-secondary/60 uppercase tracking-wider">Privado</span>
                                                  </div>
                                                </TooltipTrigger>
                                                <TooltipContent className="bg-surface border border-border/40 shadow-premium p-3 rounded-xl max-w-[220px]">
                                                  <p className="text-xs font-semibold leading-relaxed text-text-secondary">
                                                    Esta información es privada porque no se alcanzó el umbral mínimo de respuestas necesarias para garantizar el anonimato.
                                                  </p>
                                                </TooltipContent>
                                              </Tooltip>
                                            </TooltipProvider>
                                          </td>
                                        );
                                      }

                                      return (
                                        <td key={seg.id} className="p-2 text-center">
                                          <div className={cn(
                                            "w-full h-12 rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all hover:scale-105",
                                            getHeatmapTone(cell.delta, cell.status)
                                          )}>
                                            <span className="text-sm font-bold">{formatDelta(cell.delta)}</span>
                                            <span className="text-xs font-medium opacity-60">n={cell.n}</span>
                                          </div>
                                        </td>
                                      );
                                    })}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="preguntas" className="mt-6 focus-visible:outline-none outline-none">
              <div className="space-y-6">
                <Card className="border-none shadow-premium overflow-hidden bg-surface rounded-2xl">
                  <CardHeader className="bg-surface border-b border-border/10 py-8 px-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="h-11 w-11 rounded-2xl bg-brand/5 border border-brand/10 flex items-center justify-center shadow-sm">
                          <HelpCircle className="h-5 w-5 text-brand" />
                        </div>
                        <div className="flex flex-col">
                          <h3 className="text-xl font-bold text-text-primary tracking-tight leading-none mb-1">
                            Preguntas
                          </h3>
                          <p className="text-sm font-medium text-text-secondary/50 tracking-tight">
                            Análisis detallado por reactivo y comparación de cinco periodos • Mostrando {filteredAndSortedQuestions.length} pregunta(s)
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 ml-auto">
                        {/* Filtro por Dimensión */}
                        <div className="flex items-center p-1 bg-surface-subtle rounded-xl border border-border/20">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-9 px-4 gap-2 text-xs font-bold tracking-tight rounded-lg transition-all bg-surface border-border/10 text-text-secondary hover:bg-surface-muted"
                              >
                                <Layers className="h-3.5 w-3.5" />
                                <span>Dimensión ({selectedQuestionDimensions.length})</span>
                                <ChevronDown className="h-3 w-3 opacity-40" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-64 bg-surface border border-border/40 shadow-drawer rounded-lg p-2 max-h-[400px] overflow-y-auto">
                              <DropdownMenuLabel className="text-xs font-bold tracking-tight text-text-secondary px-2 py-1.5">Seleccionar Dimensiones</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <div className="flex flex-col gap-1 p-1">
                                <DropdownMenuItem
                                  onClick={selectAllQuestionDimensions}
                                  className="text-xs font-bold tracking-tight p-2 rounded-md focus:bg-brand/5 focus:text-brand cursor-pointer"
                                >
                                  Seleccionar todas
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={deselectAllQuestionDimensions}
                                  className="text-xs font-bold tracking-tight p-2 rounded-md focus:bg-brand/5 focus:text-brand cursor-pointer"
                                >
                                  Limpiar selección
                                </DropdownMenuItem>
                              </div>
                              <DropdownMenuSeparator />
                              <div className="space-y-1 mt-1">
                                {dimensionsData.map(dim => (
                                  <DropdownMenuCheckboxItem
                                    key={dim.id}
                                    checked={selectedQuestionDimensions.includes(dim.name)}
                                    onCheckedChange={() => {
                                      setSelectedQuestionDimensions(prev =>
                                        prev.includes(dim.name)
                                          ? prev.filter(d => d !== dim.name)
                                          : [...prev, dim.name]
                                      );
                                    }}
                                    className="text-xs font-bold tracking-tight p-2 rounded-md focus:bg-brand/5 focus:text-brand cursor-pointer"
                                  >
                                    {dim.name}
                                  </DropdownMenuCheckboxItem>
                                ))}
                              </div>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {/* Filtro por Orden */}
                        <div className="flex items-center p-1 bg-surface-subtle rounded-xl border border-border/20">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-9 px-4 gap-2 text-xs font-bold tracking-tight rounded-lg transition-all bg-surface border-border/10 text-text-secondary hover:bg-surface-muted"
                              >
                                <ArrowUpDown className="h-3.5 w-3.5" />
                                <span>Orden: {sortLabels[sortQuestionsCriteria]}</span>
                                <ChevronDown className="h-3 w-3 opacity-40" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 bg-surface border border-border/40 shadow-drawer rounded-lg p-2">
                              <DropdownMenuLabel className="text-xs font-bold tracking-tight text-text-secondary px-2 py-1.5">Ordenar por</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuRadioGroup value={sortQuestionsCriteria} onValueChange={setSortQuestionsCriteria}>
                                <DropdownMenuRadioItem value="mejora" className="text-xs font-bold tracking-tight p-3 rounded-md focus:bg-brand/5 focus:text-brand cursor-pointer">
                                  Mayor mejora
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="caida" className="text-xs font-bold tracking-tight p-3 rounded-md focus:bg-brand/5 focus:text-brand cursor-pointer">
                                  Mayor caída
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="alto" className="text-xs font-bold tracking-tight p-3 rounded-md focus:bg-brand/5 focus:text-brand cursor-pointer">
                                  Puntaje más alto
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="respuestas" className="text-xs font-bold tracking-tight p-3 rounded-md focus:bg-brand/5 focus:text-brand cursor-pointer">
                                  Más respuestas
                                </DropdownMenuRadioItem>
                              </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="flex items-center p-1 bg-surface-subtle rounded-xl border border-border/20">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setActiveFilterTab('preguntas');
                              setIsFiltersDrawerOpen(true);
                            }}
                            className={cn(
                              "h-9 px-6 gap-2.5 text-sm font-bold tracking-tight rounded-lg transition-all shadow-sm",
                              getActiveFiltersCount('preguntas').total > 0
                                ? "bg-brand text-text-inverse shadow-brand/20"
                                : "bg-surface border-border/10 text-text-secondary hover:bg-surface-muted"
                            )}
                          >
                            <Filter className="h-3.5 w-3.5" />
                            <span>Demográficos</span>
                            {getActiveFiltersCount('preguntas').total > 0 && (
                              <span className="flex items-center justify-center bg-surface text-brand text-xs font-bold h-5 min-w-[20px] px-1 rounded-full ml-1">
                                {getActiveFiltersCount('preguntas').total}
                              </span>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="px-8 pb-8">
                    {renderTableLegend('question')}
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader className="[&_tr]:border-b-0">
                          <TableRow className="hover:bg-transparent border-b border-border/40">
                            <TableHead className="h-14 text-[11px] font-bold tracking-tight text-text-secondary/50 pl-0 w-[30%]">Pregunta y Dimensión</TableHead>
                            {columns.map((col) => (
                              <TableHead
                                key={col.id}
                                className={cn(
                                  "h-14 text-center tracking-tight",
                                  col.isBase ? "text-sm font-bold text-brand" : "text-[11px] font-bold text-text-secondary/50"
                                )}
                              >
                                <div className="flex flex-col items-center leading-tight">
                                  <span>{col.shortLabel}</span>
                                  {col.isBase && <span className="text-[9px] opacity-70 tracking-widest mt-0.5">(Referencia base)</span>}
                                </div>
                              </TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredAndSortedQuestions.length > 0 ? (
                            filteredAndSortedQuestions.map((item) => (
                              <TableRow key={item.id} className="group hover:bg-surface-muted/30 transition-colors border-b border-border/20">
                                <TableCell className="py-6 pl-0">
                                  <div className="flex flex-col gap-1.5">
                                    <span className="text-sm font-bold text-text-primary tracking-tight group-hover:text-brand transition-colors leading-snug">
                                      {item.question}
                                    </span>
                                    <div className="flex items-center gap-2">
                                      <span className="text-[10px] font-bold tracking-tight text-text-secondary/60 px-2 py-0.5 rounded bg-surface-subtle border border-border/10">
                                        {item.dimension}
                                      </span>
                                      <span className="text-[10px] font-bold tracking-tight text-text-secondary/40">n={item.responses}</span>
                                    </div>
                                  </div>
                                </TableCell>
                                {columns.map((col) => {
                                  const rawScore = (item as any)[col.quesKey];
                                  const score = rawScore !== null && rawScore !== undefined ? rawScore : null;
                                  const baseCol = columns.find(c => c.isBase);
                                  const rawBaseScore = baseCol ? (item as any)[baseCol.quesKey] : (item as any).q4_2024;
                                  const baseScore = rawBaseScore !== null && rawBaseScore !== undefined ? rawBaseScore : null;

                                  return (
                                    <TableCell key={col.id} className="text-center">
                                      <div className="flex flex-col items-center gap-1.5">
                                        <div className="flex items-center gap-2">
                                          {(type === 'Cultura' && (item.id + col.id).length % 14 === 0 && (item as any)[col.quesKey] !== undefined) ? (
                                            <TooltipProvider delayDuration={0}>
                                              <Tooltip>
                                                <TooltipTrigger asChild>
                                                  <span className="text-[10px] font-bold text-text-secondary/50 uppercase tracking-wider cursor-help bg-muted/30 px-1.5 py-0.5 rounded border border-border/10 transition-colors hover:bg-muted/50">
                                                    Privado
                                                  </span>
                                                </TooltipTrigger>
                                                <TooltipContent className="bg-surface border border-border/40 shadow-premium p-3 rounded-xl max-w-[220px]">
                                                  <p className="text-xs font-semibold leading-relaxed text-text-secondary">
                                                    Esta información es privada porque no se alcanzó el umbral mínimo de respuestas necesarias para garantizar el anonimato.
                                                  </p>
                                                </TooltipContent>
                                              </Tooltip>
                                            </TooltipProvider>
                                          ) : (
                                            <>
                                              <span className={cn(
                                                "font-bold",
                                                col.isBase ? "text-base text-brand" : "text-sm text-text-secondary"
                                              )}>
                                                {score !== null ? (
                                                  `${score}%`
                                                ) : (
                                                  <TooltipProvider delayDuration={0}>
                                                    <Tooltip>
                                                      <TooltipTrigger asChild>
                                                        {type === 'Cultura' && (item as any)[col.quesKey] === undefined ? (
                                                          <span className="flex items-center gap-1 text-[10px] font-bold text-text-secondary/40 uppercase tracking-tight bg-muted/20 px-1.5 py-0.5 rounded border border-border/5 cursor-help transition-colors hover:bg-muted/30">
                                                            <Minus className="h-2.5 w-2.5" />
                                                            Sin Pregunta
                                                          </span>
                                                        ) : (
                                                          <span className="text-sm font-bold text-text-secondary/30 cursor-help underline decoration-dotted decoration-text-secondary/10 underline-offset-4">
                                                            —
                                                          </span>
                                                        )}
                                                      </TooltipTrigger>
                                                      <TooltipContent className="bg-surface border border-border/40 shadow-premium p-3 rounded-xl max-w-[220px]">
                                                        <p className="text-xs font-semibold leading-relaxed text-text-secondary">
                                                          {(item as any)[col.quesKey] === undefined
                                                            ? "Esta pregunta no fue incluida en el diseño de esta medición específica."
                                                            : "No se registraron respuestas suficientes para esta pregunta en este periodo."}
                                                        </p>
                                                      </TooltipContent>
                                                    </Tooltip>
                                                  </TooltipProvider>
                                                )}
                                              </span>
                                              {!col.isBase && score !== null && baseScore !== null && (
                                                <DeltaPill value={Number((score - baseScore).toFixed(1))} size="xs" />
                                              )}
                                            </>
                                          )}
                                        </div>
                                        <span className="text-[10px] font-bold tracking-tight text-text-secondary/40">n={col.responses}</span>
                                      </div>
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={5} className="h-32 text-center text-text-secondary/40 font-medium">
                                No hay preguntas que coincidan con la selección
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>

                </Card>
              </div>
            </TabsContent>
            <TabsContent value="comentarios" className="mt-6 focus-visible:outline-none outline-none">
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <Card className="border-none shadow-premium bg-surface overflow-hidden rounded-[2.5rem]">
                  <CardHeader className="p-8 border-b border-border/40 bg-surface">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="h-11 w-11 rounded-2xl bg-brand/5 border border-brand/10 flex items-center justify-center shadow-sm">
                          <MessageSquare className="h-5 w-5 text-brand" />
                        </div>
                        <div className="flex flex-col">
                          <h3 className="text-xl font-bold text-text-primary tracking-tight leading-none mb-1">
                            Análisis de Sentimiento
                          </h3>
                          <p className="text-sm font-medium text-text-secondary/50 tracking-tight">
                            Distribución de opiniones y volumen de comentarios por eje temático
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center p-1 bg-surface-subtle rounded-xl border border-border/20">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-9 px-4 gap-2 text-xs font-bold tracking-tight rounded-lg transition-all bg-surface border-border/10 text-text-secondary hover:bg-surface-muted"
                              >
                                <Layers className="h-3.5 w-3.5" />
                                <span>Dimensión ({selectedSentimentDimensions.length})</span>
                                <ChevronDown className="h-3 w-3 opacity-40" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-64 bg-surface border border-border/40 shadow-drawer rounded-lg p-2 max-h-[400px] overflow-y-auto">
                              <DropdownMenuLabel className="text-xs font-bold tracking-tight text-text-secondary px-2 py-1.5">Seleccionar Dimensiones</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <div className="flex flex-col gap-1 p-1">
                                <DropdownMenuItem
                                  onClick={selectAllSentimentDimensions}
                                  className="text-xs font-bold tracking-tight p-2 rounded-md focus:bg-brand/5 focus:text-brand cursor-pointer"
                                >
                                  Seleccionar todas
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={deselectAllSentimentDimensions}
                                  className="text-xs font-bold tracking-tight p-2 rounded-md focus:bg-brand/5 focus:text-brand cursor-pointer"
                                >
                                  Limpiar selección
                                </DropdownMenuItem>
                              </div>
                              <DropdownMenuSeparator />
                              <div className="space-y-1 mt-1">
                                {dimensionsData.map(dim => (
                                  <DropdownMenuCheckboxItem
                                    key={dim.id}
                                    checked={selectedSentimentDimensions.includes(dim.name)}
                                    onCheckedChange={() => {
                                      setSelectedSentimentDimensions(prev =>
                                        prev.includes(dim.name)
                                          ? prev.filter(d => d !== dim.name)
                                          : [...prev, dim.name]
                                      );
                                    }}
                                    className="text-xs font-bold tracking-tight p-2 rounded-md focus:bg-brand/5 focus:text-brand cursor-pointer"
                                  >
                                    {dim.name}
                                  </DropdownMenuCheckboxItem>
                                ))}
                              </div>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="flex items-center p-1 bg-surface-subtle rounded-xl border border-border/20">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-9 px-4 gap-2 text-xs font-bold tracking-tight rounded-lg transition-all bg-surface border-border/10 text-text-secondary hover:bg-surface-muted shadow-sm"
                              >
                                <ArrowUpDown className="h-3.5 w-3.5" />
                                <span>Orden: {sortLabels[sortSentimentCriteria]}</span>
                                <ChevronDown className="h-3 w-3 opacity-40" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 rounded-xl border-border/40 shadow-premium p-2">
                              <DropdownMenuLabel className="text-[10px] font-semibold text-text-secondary/50 tracking-tight px-3 py-2">Criterio de orden</DropdownMenuLabel>
                              <DropdownMenuSeparator className="bg-border/40" />
                              <DropdownMenuRadioGroup value={sortSentimentCriteria} onValueChange={setSortSentimentCriteria}>
                                <DropdownMenuRadioItem value="mejora" className="text-xs font-bold tracking-tight rounded-lg py-2.5">Mayor Positividad</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="respuestas" className="text-xs font-bold tracking-tight rounded-lg py-2.5">Más Comentarios</DropdownMenuRadioItem>
                              </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>

                          <div className="w-[1px] h-4 bg-border/40 mx-1" />

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setActiveFilterTab('comentarios');
                              setIsFiltersDrawerOpen(true);
                            }}
                            className={cn(
                              "h-9 px-6 gap-2.5 text-sm font-bold tracking-tight rounded-lg transition-all shadow-sm",
                              getActiveFiltersCount('comentarios').total > 0
                                ? "bg-brand text-text-inverse shadow-brand/20"
                                : "bg-surface border-border/10 text-text-secondary hover:bg-surface-muted"
                            )}
                          >
                            <Filter className="h-3.5 w-3.5" />
                            <span>Demográficos</span>
                            {getActiveFiltersCount('comentarios').total > 0 && (
                              <span className="flex items-center justify-center bg-surface text-brand text-xs font-bold h-5 min-w-[20px] px-1 rounded-full ml-1">
                                {getActiveFiltersCount('comentarios').total}
                              </span>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="px-8 pb-8">
                    {renderTableLegend('sentiment')}
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="hover:bg-transparent border-b border-border/40">
                            <TableHead className="h-14 text-[11px] font-bold tracking-tight text-text-secondary/50 pl-0 w-[20%]">Dimensión</TableHead>
                            {columns.map((col) => (
                              <TableHead
                                key={col.id}
                                className={cn(
                                  "h-14 text-center tracking-tight",
                                  col.isBase ? "text-sm font-bold text-brand" : "text-[11px] font-bold text-text-secondary/50"
                                )}
                              >
                                <div className="flex flex-col items-center leading-tight">
                                  <span>{col.shortLabel}</span>
                                  {col.isBase && <span className="text-[9px] opacity-70 tracking-widest mt-0.5">(Referencia base)</span>}
                                </div>
                              </TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredAndSortedSentiment.length > 0 ? (
                            filteredAndSortedSentiment.map((item) => (
                              <TableRow
                                key={item.id}
                                className="group hover:bg-surface-muted/30 transition-colors border-b border-border/20 cursor-pointer"
                                onClick={() => {
                                  setSelectedDimensionDetail(item.dimension);
                                  setIsCommentDetailOpen(true);
                                }}
                              >
                                <TableCell className="py-6 pl-0">
                                  <div className="flex flex-col gap-1">
                                    <span className="text-sm font-bold text-text-primary tracking-tight group-hover:text-brand transition-colors">
                                      {item.dimension}
                                    </span>
                                    <span className="text-xs font-bold text-text-secondary/40 tracking-tight flex items-center gap-2">
                                      <TrendingUp className="h-3 w-3" />
                                      Ver análisis detallado
                                    </span>
                                  </div>
                                </TableCell>
                                {columns.map((col) => {
                                  const rawData = (item as any)[col.sentKey];
                                  const data = rawData && typeof rawData === 'object' ? rawData : null;

                                  const baseCol = columns.find(c => c.isBase);
                                  const rawBaseData = baseCol ? (item as any)[baseCol.sentKey] : null;
                                  const baseData = rawBaseData && typeof rawBaseData === 'object' ? rawBaseData : null;

                                  return (
                                    <TableCell key={col.id} className="text-center">
                                      <div className="flex flex-col items-center gap-1.5">
                                        <div className="flex items-center gap-2">
                                          {(type === 'Cultura' && (item.id + col.id).length % 16 === 0 && (item as any)[col.sentKey] !== undefined) ? (
                                            <TooltipProvider delayDuration={0}>
                                              <Tooltip>
                                                <TooltipTrigger asChild>
                                                  <span className="text-[10px] font-bold text-text-secondary/50 uppercase tracking-wider cursor-help bg-muted/30 px-1.5 py-0.5 rounded border border-border/10 transition-colors hover:bg-muted/50">
                                                    Privado
                                                  </span>
                                                </TooltipTrigger>
                                                <TooltipContent className="bg-surface border border-border/40 shadow-premium p-3 rounded-xl max-w-[220px]">
                                                  <p className="text-xs font-semibold leading-relaxed text-text-secondary">
                                                    Esta información es privada porque no se alcanzó el umbral mínimo de respuestas necesarias para garantizar el anonimato.
                                                  </p>
                                                </TooltipContent>
                                              </Tooltip>
                                            </TooltipProvider>
                                          ) : (
                                            <>
                                              <span className={cn(
                                                "font-bold",
                                                col.isBase ? "text-base text-brand" : "text-sm text-text-secondary"
                                              )}>
                                                {data !== null ? (
                                                  `${data.positive}%`
                                                ) : (
                                                  <TooltipProvider delayDuration={0}>
                                                    <Tooltip>
                                                      <TooltipTrigger asChild>
                                                        {type === 'Cultura' && (item as any)[col.sentKey] === undefined ? (
                                                          <span className="flex items-center gap-1 text-[10px] font-bold text-text-secondary/40 uppercase tracking-tight bg-muted/20 px-1.5 py-0.5 rounded border border-border/5 cursor-help transition-colors hover:bg-muted/30">
                                                            <Minus className="h-2.5 w-2.5" />
                                                            Sin Dimensión
                                                          </span>
                                                        ) : (
                                                          <span className="text-sm font-bold text-text-secondary/30 cursor-help underline decoration-dotted decoration-text-secondary/10 underline-offset-4">
                                                            —
                                                          </span>
                                                        )}
                                                      </TooltipTrigger>
                                                      <TooltipContent className="bg-surface border border-border/40 shadow-premium p-3 rounded-xl max-w-[220px]">
                                                        <p className="text-xs font-semibold leading-relaxed text-text-secondary">
                                                          {(item as any)[col.sentKey] === undefined
                                                            ? "Esta dimensión no fue evaluada en esta encuesta, por lo que no existen comentarios."
                                                            : "No se encontraron comentarios abiertos para esta dimensión en este periodo."}
                                                        </p>
                                                      </TooltipContent>
                                                    </Tooltip>
                                                  </TooltipProvider>
                                                )}
                                              </span>
                                              {!col.isBase && data !== null && baseData !== null && (
                                                <DeltaPill value={Number((data.positive - baseData.positive).toFixed(1))} size="xs" />
                                              )}
                                            </>
                                          )}
                                        </div>
                                        <span className="text-[10px] font-bold tracking-tight text-text-secondary/40">
                                          {data !== null ? `n=${data.total}` : 'n=0'}
                                        </span>
                                      </div>
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={7} className="h-32 text-center text-text-secondary/40 font-medium">
                                No hay datos de sentimiento que coincidan con la selección
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>


                </Card>
              </div>
            </TabsContent>
            <TabsContent value="insights" className="mt-0 focus-visible:outline-none animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex flex-col gap-8 pb-12 px-1">
                {/* Resumen Ejecutivo */}
                <Card className="border border-border/40 bg-surface shadow-xl shadow-border/[0.02] rounded-[40px] overflow-hidden">
                  <CardHeader className="pb-4 bg-gradient-to-r from-brand/5 to-transparent border-b border-border/20">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-brand/10">
                        <Sparkles className="h-4 w-4 text-brand" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-text-brand tracking-tight">Resumen Ejecutivo</h2>
                        <p className="text-xs text-text-secondary/60 font-medium mt-0.5">Análisis integrado basado en IA</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-sm leading-relaxed text-text-secondary font-medium">
                      {aiInsightsSource.summary}
                    </p>
                  </CardContent>
                </Card>

                {/* Hallazgos de Alto Impacto */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 px-1">
                    <div className="h-4 w-1 bg-brand rounded-full" />
                    <h3 className="text-sm font-bold text-text-brand tracking-tight">Hallazgos de Alto Impacto</h3>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {aiInsightsSource.highImpactFindings.map((finding) => (
                      <AIInsightCard
                        key={finding.id}
                        title={finding.title}
                        description={finding.description}
                        type={finding.type as any}
                        confidence={finding.confidence as any}
                        evidence={finding.evidence}
                        impact={finding.impact}
                      />
                    ))}
                  </div>
                </div>

                {/* Predicción y Tendencias */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 px-1">
                    <div className="h-4 w-1 bg-brand rounded-full" />
                    <h3 className="text-sm font-bold text-text-brand tracking-tight">Predicción y Tendencias</h3>
                  </div>
                  <Card className="border border-border/40 bg-surface shadow-xl shadow-border/[0.02] rounded-[40px] overflow-hidden">
                    <CardHeader className="pb-3 bg-gradient-to-r from-brand/5 to-transparent border-b border-border/20">
                      <div className="space-y-1">
                        <h4 className="text-base font-bold text-text-brand tracking-tight">Evolución Proyectada</h4>
                        <p className="text-xs text-text-secondary/60 font-medium">{aiInsightsSource.predictions?.summary || "Cargando predicciones..."}</p>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <TrendMetricLineChart
                        series={[
                          {
                            label: "Favorabilidad Proyectada",
                            data: (aiInsightsSource.predictions?.scenarios || []).map(s => ({
                              label: s.label,
                              value: s.predicted,
                              total: 0
                            })),
                            strokeColor: "var(--color-brand)",
                            lineWidth: 3
                          }
                        ]}
                        height={300}
                        showLegend={true}
                        showComparison={false}
                      />
                    </CardContent>
                  </Card>
                </div>

                {/* Probabilidades de Crecimiento y Decrecimiento */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 px-1">
                    <div className="h-4 w-1 bg-brand rounded-full" />
                    <h3 className="text-sm font-bold text-text-brand tracking-tight">Probabilidades por Escenario</h3>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {(aiInsightsSource.predictions?.scenarios || []).map((scenario) => (
                      <Card key={scenario.label} className="border border-border/40 bg-surface shadow-sm rounded-[2rem] overflow-hidden">
                        <CardHeader className="pb-4">
                          <h4 className="font-semibold text-text-brand">{scenario.label}</h4>
                          <p className="text-2xl font-bold text-text-primary mt-2">{(scenario.predicted || 0).toFixed(1)}%</p>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-positive">Crecimiento</span>
                              <span className="text-sm font-bold text-positive">{scenario.probabilityGrowth}%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-positive rounded-full" style={{ width: `${scenario.probabilityGrowth}%` }} />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-muted-foreground">Estable</span>
                              <span className="text-sm font-bold text-muted-foreground">{scenario.probabilityStable}%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-muted rounded-full" style={{ width: `${scenario.probabilityStable}%` }} />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-destructive">Decrecimiento</span>
                              <span className="text-sm font-bold text-destructive">{scenario.probabilityDecline}%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-destructive rounded-full" style={{ width: `${scenario.probabilityDecline}%` }} />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

          </Tabs>
        </div>
      </main>

      <Sheet open={isCommentDetailOpen} onOpenChange={setIsCommentDetailOpen}>
        <SheetContent
          showCloseButton={false}
          side="right"
          className="!w-[40%] !max-w-none h-full p-0 border-l border-border/10 bg-background overflow-hidden flex flex-col shadow-2xl"
          aria-describedby={undefined}
        >
          {/* Drawer Header - Elevated for accessibility and hierarchy */}
          <SheetHeader className="p-6 pb-4 bg-white shrink-0 border-b border-border/10 text-left relative flex flex-row items-center justify-between">
            <div className="space-y-0.5">
              <SheetTitle className="text-lg font-bold text-text-primary leading-none tracking-tight">
                {selectedDimensionDetail || "Cargando..."}
              </SheetTitle>
              <SheetDescription className="text-sm font-semibold text-text-secondary-foreground tracking-tight opacity-60">
                Análisis cualitativo
              </SheetDescription>
            </div>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-muted/5 border border-transparent hover:border-border/10 transition-all">
                <X className="h-5 w-5 text-text-secondary" />
              </Button>
            </SheetClose>
          </SheetHeader>

          {/* Scrollable Content Area */}
          <div className="flex-1 min-h-0 overflow-y-auto bg-background">
            <div className="p-6 space-y-6 pb-24">
              <Tabs value={drawerSentimentTab} onValueChange={setDrawerSentimentTab} className="w-full">
                <div className="flex items-center mb-6 overflow-x-auto scrollbar-hide py-1 sticky top-0 bg-background z-20 -mx-6 px-6">
                  <TabsList className="bg-surface-muted/40 p-1.5 rounded-full border border-border/30 h-auto gap-1">
                    <TabsTrigger
                      value="detalle"
                      className="rounded-full px-6 py-2.5 text-xs font-semibold tracking-tight transition-all duration-300 data-[state=active]:bg-brand data-[state=active]:text-text-inverse data-[state=active]:shadow-lg shadow-brand/20 text-text-secondary/60 hover:text-text-primary hover:bg-white/40 gap-2"
                    >
                      <BarChart3 className="h-3.5 w-3.5" />
                      Detalle
                    </TabsTrigger>
                    <TabsTrigger
                      value="positive"
                      className="rounded-full px-6 py-2.5 text-xs font-semibold tracking-tight transition-all duration-300 data-[state=active]:bg-brand data-[state=active]:text-text-inverse data-[state=active]:shadow-lg shadow-brand/20 text-text-secondary/60 hover:text-text-primary hover:bg-white/40 gap-2"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      Positivos
                    </TabsTrigger>
                    <TabsTrigger
                      value="neutral"
                      className="rounded-full px-6 py-2.5 text-xs font-semibold tracking-tight transition-all duration-300 data-[state=active]:bg-brand data-[state=active]:text-text-inverse data-[state=active]:shadow-lg shadow-brand/20 text-text-secondary/60 hover:text-text-primary hover:bg-white/40 gap-2"
                    >
                      <Hash className="h-3.5 w-3.5" />
                      Neutrales
                    </TabsTrigger>
                    <TabsTrigger
                      value="negative"
                      className="rounded-full px-6 py-2.5 text-xs font-semibold tracking-tight transition-all duration-300 data-[state=active]:bg-brand data-[state=active]:text-text-inverse data-[state=active]:shadow-lg shadow-brand/20 text-text-secondary/60 hover:text-text-primary hover:bg-white/40 gap-2"
                    >
                      <TrendingDown className="h-3.5 w-3.5" />
                      Negativos
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="space-y-12">
                  {/* Detalle Tab Content */}
                  <TabsContent value="detalle" className="mt-0">
                    {selectedDimensionDetail && sentimentDistributionItems.length > 0 && (
                      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center justify-between px-1">
                          <div className="flex items-center gap-3">
                            <div className="h-4 w-1 bg-brand rounded-full" />
                            <h3 className="text-sm font-bold text-text-brand tracking-tight">Distribución Histórica de Sentimiento</h3>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1 bg-surface border border-border/10 rounded-full shadow-sm">
                            <Users className="h-3 w-3 text-brand" />
                            <span className="text-xs font-bold text-text-brand tracking-tight">
                              Total Respuestas: {(() => {
                                const sentimentData = sentimentSource.find(s => s.dimension === selectedDimensionDetail);
                                if (!sentimentData || !baseColumn) return 0;
                                return (sentimentData as any)[baseColumn.sentKey]?.total || 0;
                              })()}
                            </span>
                          </div>
                        </div>

                        <div className="p-10 rounded-[3rem] bg-surface border border-border/10 shadow-sm">
                          <ResponseStackedBarGroup
                            items={sentimentDistributionItems}
                            showLegend
                            showPercentages
                            size="md"
                            className="space-y-8"
                          />
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  {/* Sentiment Specific Content */}
                  {['positive', 'neutral', 'negative'].map((sentiment) => (
                    <TabsContent key={sentiment} value={sentiment} className="mt-0 outline-none">
                      <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        {/* Qualitative Insights Row */}
                        <div className="flex flex-col gap-12">
                          {/* Keywords Section */}
                          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                            <div className="flex items-center justify-between px-2">
                              <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-2xl bg-brand/10 flex items-center justify-center shadow-inner">
                                  <Link className="h-4 w-4 text-brand" />
                                </div>
                                <div className="space-y-1">
                                  <h4 className="text-sm font-bold text-text-brand tracking-tight">Palabras clave en común</h4>
                                  <p className="text-xs text-text-secondary/60 font-medium">Términos más recurrentes en las respuestas abiertas</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2.5 px-4 py-2 bg-brand/5 border border-brand/10 rounded-2xl shadow-sm backdrop-blur-sm group-hover:bg-brand/10 transition-colors">
                                <Sparkles className="h-3 w-3 text-brand animate-pulse" />
                                <span className="text-sm font-bold text-brand tracking-tight">Análisis IA</span>
                              </div>
                            </div>

                            <div className="p-10 rounded-[3rem] bg-surface border border-border/10 shadow-sm relative group overflow-hidden hover:border-brand/10 transition-all duration-700">
                              <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-all duration-1000 group-hover:scale-110">
                                <Hash className="h-40 w-40 text-brand" />
                              </div>
                              <div className="relative z-10 flex flex-col gap-4">
                                {(aiInsightsSource.topKeywords?.[sentiment as keyof typeof aiInsightsSource.topKeywords] || []
                                ).map((item, idx, arr) => {
                                  const maxCount = arr[0].count;
                                  const percentage = (item.count / maxCount) * 100;

                                  return (
                                    <div
                                      key={item.word}
                                      className="group/row flex items-center gap-6 p-4 rounded-2xl bg-surface-subtle/30 border border-border/5 hover:border-brand/20 hover:bg-surface-subtle/50 transition-all duration-300"
                                    >
                                      <div className="flex-none w-32">
                                        <Chip
                                          label={item.word}
                                          tone={idx < 2 ? "ai" : "default"}
                                          size="md"
                                          className="w-full justify-start font-bold tracking-tight"
                                        />
                                      </div>

                                      <div className="flex-1 space-y-2">
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-2">
                                            <div className={cn(
                                              "h-1.5 w-1.5 rounded-full",
                                              idx < 2 ? "bg-brand animate-pulse" : "bg-text-text-secondary/20"
                                            )} />
                                            <span className="text-xs font-bold text-text-secondary/60 tracking-tight">Frecuencia Relativa</span>
                                          </div>
                                          <span className="text-sm font-bold text-brand">{formatPercentage(percentage)}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-surface-subtle rounded-full overflow-hidden border border-border/5">
                                          <div
                                            className={cn(
                                              "h-full rounded-full transition-all duration-1000 ease-out",
                                              idx < 2
                                                ? "bg-gradient-to-r from-brand to-brand-light shadow-[0_0_8px_rgba(12,91,239,0.3)]"
                                                : "bg-brand/20"
                                            )}
                                            style={{ width: `${percentage}%` }}
                                          />
                                        </div>
                                      </div>

                                      <div className="flex-none flex flex-col items-end gap-0.5 min-w-[60px]">
                                        <span className="text-xs font-bold text-text-secondary/40 tracking-tight">Menciones</span>
                                        <span className="text-sm font-semibold text-text-primary tabular-nums">n={item.count}</span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          {/* Comparative Themes Section */}
                          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                            <div className="flex items-center gap-4 px-2">
                              <div className="h-10 w-10 rounded-2xl bg-brand/5 flex items-center justify-center border border-brand/5">
                                <Target className="h-4 w-4 text-brand" />
                              </div>
                              <div className="space-y-1">
                                <h4 className="text-sm font-bold text-text-brand tracking-tight">Temas Comparativos</h4>
                                <p className="text-xs text-text-secondary/60 font-medium">Análisis de consistencia y relevancia histórica</p>
                              </div>
                              <div className="h-px flex-1 bg-brand/10 mx-4" />
                            </div>

                            <div className="grid grid-cols-1 gap-6 p-12 rounded-[3.5rem] bg-surface border border-border/10 shadow-sm relative group overflow-hidden hover:border-brand/10 transition-all duration-700">
                              <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-all duration-1000 group-hover:scale-110">
                                <Target className="h-40 w-40 text-brand" />
                              </div>
                              <div className="relative z-10 flex flex-col gap-6">
                                {(aiInsightsSource.recurrentThemes?.[sentiment as keyof typeof aiInsightsSource.recurrentThemes] || []
                                ).map((item, idx) => (
                                  <div key={idx} className="p-6 rounded-3xl bg-surface-subtle/50 border border-border/5 hover:border-brand/20 transition-all duration-500 group/item relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-brand/[0.02] to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                    <div className="relative z-10 space-y-4">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                          <div className="h-2 w-2 rounded-full bg-brand" />
                                          <div className="space-y-0.5">
                                            <span className="text-[12px] font-semibold text-text-primary tracking-tight">{item.text}</span>
                                            <p className="text-xs text-text-secondary/60 font-medium">{item.desc}</p>
                                          </div>
                                          {item.recurrent && (
                                            <Badge variant="ghost" className="h-5 px-2 bg-brand/5 text-brand border-brand/10 text-xs font-bold tracking-tight rounded-md ml-2">Recurrente</Badge>
                                          )}
                                        </div>
                                        <div className="flex items-center gap-4">
                                          <div className="flex flex-col items-end gap-0.5">
                                            <span className="text-sm font-bold text-brand tracking-tight leading-none">Volumen</span>
                                            <span className="text-[12px] font-bold text-text-brand tabular-nums">n={item.count}</span>
                                          </div>
                                          <div className="h-8 w-px bg-border/10" />
                                          <div className="flex flex-col items-end gap-1">
                                            <span className="text-sm font-bold text-brand tracking-tight leading-none">Tendencia</span>
                                            {item.trend === 'up' && <TrendingUp className="h-4 w-4 text-status-positive" />}
                                            {item.trend === 'down' && <TrendingDown className="h-4 w-4 text-status-negative" />}
                                            {item.trend === 'stable' && <Minus className="h-4 w-4 text-text-secondary/40" />}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm font-bold text-text-secondary tracking-tight">
                                          <span>Nivel de Relevancia</span>
                                          <span className="text-brand">{formatPercentage(item.relevance * 100)}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-surface-subtle rounded-full overflow-hidden shadow-inner border border-border/5">
                                          <div
                                            className="h-full bg-gradient-to-r from-brand to-brand-light rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(12,91,239,0.3)]"
                                            style={{ width: `${item.relevance * 100}%` }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Featured AI Highlight */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 px-1">
                            <h4 className="text-xs font-bold text-text-brand tracking-tight">Sintetización IA Avanzada</h4>
                            <div className="h-px flex-1 bg-border/20" />
                          </div>
                          <div className="p-8 rounded-[2rem] bg-brand/[0.03] border border-brand/10 relative overflow-hidden group hover:border-brand/30 transition-all duration-700 shadow-ai-premium">
                            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-brand/5 rounded-full blur-[100px] group-hover:bg-brand/10 transition-colors duration-700" />
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand/5 rounded-full blur-[60px] opacity-50" />

                            <div className="absolute top-6 right-6 p-2.5 bg-surface/50 backdrop-blur-md rounded-xl border border-border/10 shadow-sm opacity-50 group-hover:opacity-100 transition-all duration-700 group-hover:rotate-12">
                              <Sparkles className="h-4 w-4 text-brand animate-pulse" />
                            </div>

                            <div className="relative z-10 space-y-6">
                              <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                  <div className="h-1 w-6 bg-brand rounded-full" />
                                  <span className="text-[10px] font-bold text-brand tracking-tight">IA Focus Insight</span>
                                </div>
                                <p className="text-base font-bold text-text-brand leading-[1.6] tracking-tight">
                                  {aiInsightsSource.featuredInsights?.[sentiment as keyof typeof aiInsightsSource.featuredInsights]}
                                </p>
                              </div>

                              <div className="flex items-center justify-between pt-5 border-t border-brand/5">
                                <div className="flex items-center gap-3">
                                  <div className="h-9 w-9 rounded-xl bg-brand text-text-inverse flex items-center justify-center shadow-lg shadow-brand/20 group-hover:scale-110 transition-transform duration-500">
                                    <Sparkles className="h-4 w-4" />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-text-brand tracking-tight">Análisis Predictivo UBITS</span>
                                    <span className="text-[10px] font-medium text-text-tertiary">Basado en {sentiment === 'positive' ? '24' : sentiment === 'negative' ? '18' : '15'} voces auténticas</span>
                                  </div>
                                </div>
                                <Button variant="ghost" className="h-9 px-4 rounded-full text-[11px] font-bold text-brand tracking-tight hover:bg-brand/5 border border-transparent hover:border-brand/10 transition-all">
                                  Explorar contexto completo
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Recurrent Comments Section */}
                        <div className="space-y-6">
                          <div className="flex items-center justify-between px-1">
                            <div className="flex items-center gap-3">
                              <ArrowUpDown className="h-4 w-4 text-brand rotate-90" />
                              <h3 className="text-xs font-bold text-text-brand tracking-[0.1em]">Comentarios recurrentes</h3>
                            </div>
                            <Badge variant="ghost" className="h-6 px-3 bg-brand/5 text-brand border-brand/10 text-[10px] font-bold tracking-tight rounded-md">
                              Consistencia IA
                            </Badge>
                          </div>

                          <div className="space-y-5">
                            {(aiInsightsSource.recurrentComments?.[sentiment as keyof typeof aiInsightsSource.recurrentComments] || []
                            ).map((item, idx) => (
                              <div key={idx} className="rounded-2xl border border-border/10 bg-surface overflow-hidden shadow-sm hover:border-brand/20 transition-all duration-300 group">
                                {/* Top Bar */}
                                <div className="px-6 py-4 flex items-center justify-between border-b border-border/5">
                                  <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-status-positive" />
                                    <span className="text-[11px] font-bold text-text-primary tracking-tight">{item.title}</span>
                                  </div>
                                  <div className="flex items-center gap-8">
                                    <div className="flex flex-col items-end">
                                      <span className="text-[10px] font-bold text-brand tracking-tight">{item.frequency}</span>
                                      <span className="text-[9px] font-medium text-text-secondary/40">{item.confidence}</span>
                                    </div>
                                    <div className="flex items-baseline gap-1 border-l border-border/10 pl-8">
                                      <span className="text-sm font-bold text-text-primary">{item.total}</span>
                                      <span className="text-[9px] font-bold text-text-secondary/30 tracking-tighter">total</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-8 bg-surface-subtle/30">
                                  <p className="text-sm font-medium text-text-secondary italic leading-relaxed tracking-tight">
                                    "{item.text}"
                                  </p>
                                </div>

                                {/* Bottom Bar */}
                                <div className="px-6 py-4 bg-surface flex items-center justify-between border-t border-border/5">
                                  <div className="flex items-center gap-1.5">
                                    {item.periods?.map(p => (
                                      <div key={p} className={cn(
                                        "h-6 w-6 rounded-full flex items-center justify-center text-[9px] font-bold border transition-colors",
                                        p === 'Q4' ? "bg-brand text-text-inverse border-brand" : "bg-surface-subtle text-text-secondary/40 border-border/20"
                                      )}>
                                        {p}
                                      </div>
                                    ))}
                                  </div>
                                  <span className="text-[9px] font-bold text-text-secondary/20 tracking-widest">
                                    {item.detected}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </div>
              </Tabs>
            </div>
          </div>

          {/* Drawer Footer Actions - Fixed at bottom */}
          <div className="px-8 py-6 bg-white border-t border-border/10 shrink-0 shadow-[0_-12px_40px_rgba(0,0,0,0.12)] relative z-30">
            <Button className="w-full h-12 bg-brand hover:bg-brand/90 text-text-inverse font-bold tracking-tight rounded-2xl shadow-lg shadow-brand/20 transition-all flex items-center justify-center gap-4 group">
              <Download className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
              Descargar reporte detallado
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Export Dialog */}
      <Sheet open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <SheetContent aria-describedby={undefined} showCloseButton={false} side="right" className="w-[460px] sm:max-w-[460px] h-full p-0 border-l border-border/10 bg-background overflow-hidden flex flex-col shadow-2xl">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-6 pb-4 bg-white border-b border-border/10 shrink-0">
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-0.5 flex-1">
                  <SheetTitle className="text-lg font-bold tracking-tight text-text-primary">
                    Exportar Informe
                  </SheetTitle>
                  <SheetDescription className="text-sm font-bold text-text-secondary-foreground">
                    Elige el formato y opciones de exportación
                  </SheetDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsExportDialogOpen(false)}
                  className="rounded-xl hover:bg-muted/10 h-10 w-10 transition-all shrink-0"
                >
                  <X className="h-5 w-5 text-text-secondary-foreground" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <ScrollArea className="flex-1">
              <div className="p-6 space-y-6">
                {/* Format Selection */}
                <div className="space-y-3">
                  <p className="text-sm font-bold text-text-primary">Formato de exportación</p>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 border border-border/20 rounded-xl cursor-pointer hover:bg-muted/5 transition-all" htmlFor="format-pdf">
                      <input
                        type="radio"
                        id="format-pdf"
                        name="exportFormat"
                        value="pdf"
                        checked={exportFormat === 'pdf'}
                        onChange={(e) => setExportFormat(e.target.value as 'pdf' | 'csv')}
                        className="h-4 w-4 accent-brand"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-text-primary">PDF</p>
                        <p className="text-xs text-text-secondary">Documento formateado con gráficos y tablas</p>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-border/20 rounded-xl cursor-pointer hover:bg-muted/5 transition-all" htmlFor="format-csv">
                      <input
                        type="radio"
                        id="format-csv"
                        name="exportFormat"
                        value="csv"
                        checked={exportFormat === 'csv'}
                        onChange={(e) => setExportFormat(e.target.value as 'pdf' | 'csv')}
                        className="h-4 w-4 accent-brand"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-text-primary">CSV</p>
                        <p className="text-xs text-text-secondary">Datos en formato de tabla para análisis</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Filter Application */}
                <div className="space-y-3 pb-4 border-b border-border/10">
                  <p className="text-sm font-bold text-text-primary">Opciones adicionales</p>
                  <label className="flex items-center gap-3 p-3 border border-border/20 rounded-xl cursor-pointer hover:bg-muted/5 transition-all" htmlFor="apply-filters">
                    <input
                      type="checkbox"
                      id="apply-filters"
                      checked={exportWithFilters}
                      onChange={(e) => setExportWithFilters(e.target.checked)}
                      className="h-4 w-4 accent-brand rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-text-primary">Aplicar filtros actuales</p>
                      <p className="text-xs text-text-secondary">Incluye los filtros demográficos y segmentaciones aplicadas</p>
                    </div>
                  </label>
                </div>

                {/* Active Filters Info - All Sections */}
                {exportWithFilters && (() => {
                  const allTabIds: Array<{ id: string; label: string }> = [
                    { id: 'resumen', label: 'Resumen Ejecutivo' },
                    { id: 'dimensionesTable', label: 'Dimensiones Tabla' },
                    { id: 'dimensionesHeatmap', label: 'Dimensiones Heatmap' },
                    { id: 'preguntas', label: 'Preguntas' },
                    { id: 'comentarios', label: 'Comentarios' }
                  ];

                  return (
                    <div className="p-4 bg-brand/5 border border-brand/20 rounded-xl space-y-3 flex flex-col">
                      <p className="text-xs font-bold text-brand">Filtros activos por sección:</p>
                      <p className="text-[10px] text-text-secondary/60">Se aplicarán estos filtros al exportar</p>

                      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                        {allTabIds.map(({ id, label }) => {
                          const sectionFilters = getSectionFilters(id);
                          const hasFilters = Object.keys(sectionFilters).length > 0;

                          return (
                            <div key={id} className="space-y-1.5">
                              <p className="text-xs font-semibold text-text-primary">{label}:</p>
                              {hasFilters ? (
                                <div className="ml-3 space-y-1 text-xs text-text-secondary">
                                  {Object.entries(sectionFilters).map(([category, values]) => (
                                    <div key={category} className="flex flex-col gap-0.5">
                                      <p className="text-text-secondary-foreground">{category}:</p>
                                      <p className="ml-2 text-text-secondary/80">
                                        {Array.isArray(values) ? values.join(', ') : values}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="ml-3 text-[10px] text-text-secondary/60 italic">Sin filtros aplicados</p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}

              </div>
            </ScrollArea>

            {/* Footer Actions */}
            <div className="px-6 py-6 bg-white border-t border-border/10 shrink-0 shadow-[0_-12px_40px_rgba(0,0,0,0.12)] relative z-30 space-y-3">
              <Button
                onClick={() => handleExport()}
                className="w-full h-12 bg-brand hover:bg-brand/90 text-text-inverse font-bold tracking-tight rounded-2xl shadow-lg shadow-brand/20 transition-all flex items-center justify-center gap-2"
              >
                <Download className="h-4 w-4" />
                Descargar {exportFormat.toUpperCase()}
              </Button>
              <Button
                onClick={() => setIsExportDialogOpen(false)}
                variant="outline"
                className="w-full h-12 border-border/20 text-text-primary font-bold tracking-tight rounded-2xl transition-all"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Share Dialog */}
      <Sheet open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <SheetContent aria-describedby={undefined} showCloseButton={false} side="right" className="w-[460px] sm:max-w-[460px] h-full p-0 border-l border-border/10 bg-background overflow-hidden flex flex-col shadow-2xl">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-6 pb-4 bg-white border-b border-border/10 shrink-0">
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-0.5 flex-1">
                  <SheetTitle className="text-lg font-bold tracking-tight text-text-primary">
                    Compartir Análisis
                  </SheetTitle>
                  <SheetDescription className="text-sm font-bold text-text-secondary-foreground">
                    Copia el enlace para compartir con tu equipo
                  </SheetDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsShareDialogOpen(false)}
                  className="rounded-xl hover:bg-muted/10 h-10 w-10 transition-all shrink-0"
                >
                  <X className="h-5 w-5 text-text-secondary-foreground" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <ScrollArea className="flex-1">
              <div className="p-6 space-y-6">
                {/* Filter Option */}
                <div className="space-y-3 pb-4 border-b border-border/10">
                  <p className="text-sm font-bold text-text-primary">Opciones de compartir</p>
                  <label className="flex items-center gap-3 p-3 border border-border/20 rounded-xl cursor-pointer hover:bg-muted/5 transition-all" htmlFor="share-filters">
                    <input
                      type="checkbox"
                      id="share-filters"
                      checked={shareWithFilters}
                      onChange={(e) => {
                        setShareWithFilters(e.target.checked);
                        setShareLink('');
                      }}
                      className="h-4 w-4 accent-brand rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-text-primary">Incluir filtros actuales</p>
                      <p className="text-xs text-text-secondary">El enlace tendrá los mismos filtros aplicados</p>
                    </div>
                  </label>
                </div>

                {/* Active Filters Info */}
                {shareWithFilters && (() => {
                  const allTabIds: Array<{ id: string; label: string }> = [
                    { id: 'resumen', label: 'Resumen Ejecutivo' },
                    { id: 'dimensionesTable', label: 'Dimensiones Tabla' },
                    { id: 'dimensionesHeatmap', label: 'Dimensiones Heatmap' },
                    { id: 'preguntas', label: 'Preguntas' },
                    { id: 'comentarios', label: 'Comentarios' }
                  ];

                  return (
                    <div className="p-4 bg-brand/5 border border-brand/20 rounded-xl space-y-3 flex flex-col">
                      <p className="text-xs font-bold text-brand">Filtros que se compartirán:</p>
                      <p className="text-[10px] text-text-secondary/60">Quienes reciban el enlace verán estos filtros aplicados</p>

                      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                        {allTabIds.map(({ id, label }) => {
                          const sectionFilters = getSectionFilters(id);
                          const hasFilters = Object.keys(sectionFilters).length > 0;

                          return (
                            <div key={id} className="space-y-1.5">
                              <p className="text-xs font-semibold text-text-primary">{label}:</p>
                              {hasFilters ? (
                                <div className="ml-3 space-y-1 text-xs text-text-secondary">
                                  {Object.entries(sectionFilters).map(([category, values]) => (
                                    <div key={category} className="flex flex-col gap-0.5">
                                      <p className="text-text-secondary-foreground">{category}:</p>
                                      <p className="ml-2 text-text-secondary/80">
                                        {Array.isArray(values) ? values.join(', ') : values}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="ml-3 text-[10px] text-text-secondary/60 italic">Sin filtros aplicados</p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}

                {/* Link Display */}
                <div className="space-y-3">
                  <p className="text-sm font-bold text-text-primary">Enlace para compartir</p>
                  <div className="space-y-2 relative">
                    <div className="p-3 bg-surface-subtle border border-border/20 rounded-xl flex items-center gap-2">
                      <input
                        type="text"
                        value={shareLink || generateShareLink()}
                        readOnly
                        className="flex-1 bg-transparent text-xs text-text-secondary outline-none truncate"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          const link = shareLink || generateShareLink();
                          navigator.clipboard.writeText(link).then(() => {
                            toast.success("¡Enlace copiado al portapapeles!");
                            setIsShareDialogOpen(false);
                          });
                        }}
                        className="px-3 h-8 text-xs font-bold text-brand hover:bg-brand/10 rounded-lg transition-all"
                      >
                        Copiar
                      </Button>
                    </div>
                    <p className="text-[10px] text-text-secondary/60">
                      Clic en Copiar para copiar el enlace
                    </p>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ComparativeDashboard;
