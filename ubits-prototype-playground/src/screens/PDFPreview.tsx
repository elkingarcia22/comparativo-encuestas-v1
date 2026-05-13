import * as React from "react";
import { 
  COMPARATIVE_SURVEYS_LIST, 
  COMPARATIVE_FAVORABILITY_DATA,
  COMPARATIVE_PARTICIPATION_DATA,
  COMPARATIVE_NPS_DATA,
  COMPARATIVE_DIMENSIONS_DATA,
  CULTURA_FAVORABILITY_DATA,
  CULTURA_PARTICIPATION_DATA,
  CULTURA_DIMENSIONS_DATA,
  CULTURA_NPS_DATA
} from "@/mocks/comparativeMocks";
import { ResponseStackedBarGroup } from "@/components/survey-analytics/ResponseStackedBarGroup";
import { TrendMetricLineChart } from "@/components/survey-analytics/TrendMetricLineChart";
import { MetricComparisonFooter } from "@/components/survey-analytics/MetricComparisonFooter";
import { DeltaPill } from "@/components/survey-analytics/DeltaPill";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { BarChart3, Users, Star, FileText, TrendingUp, Layers, Info, Printer, ChevronUp, ChevronDown, Plus, Minus, Download } from "lucide-react";

interface PDFPreviewProps {
  baseId?: string;
  comparativeIds?: string[];
  type?: string;
}

export const PDFPreview: React.FC<PDFPreviewProps> = ({
  baseId,
  comparativeIds = [],
  type = 'Clima'
}) => {
  // --- Data Setup ---
  const allSurveys = React.useMemo(() => {
    return COMPARATIVE_SURVEYS_LIST.filter(s => s.type === type);
  }, [type]);

  const baseSurvey = React.useMemo(() => {
    return allSurveys.find(s => s.id === baseId) || allSurveys[0];
  }, [baseId, allSurveys]);

  const comparisonSurveys = React.useMemo(() => {
    return (comparativeIds || [])
      .filter(id => id !== baseSurvey?.id)
      .map(id => allSurveys.find(s => s.id === id))
      .filter(Boolean) as typeof COMPARATIVE_SURVEYS_LIST;
  }, [comparativeIds, baseSurvey, allSurveys]);

  const columns = React.useMemo(() => {
    const cols = [];
    if (baseSurvey) {
      cols.push({
        id: baseSurvey.id,
        label: baseSurvey.name,
        shortLabel: baseSurvey.name.split('-')[1]?.trim() || baseSurvey.name,
        isBase: true,
        dataKey: 'currentScore'
      });
    }
    comparisonSurveys.forEach((s, i) => {
      cols.push({
        id: s.id,
        label: s.name,
        shortLabel: s.name.split('-')[1]?.trim() || s.name,
        isBase: false,
        dataKey: `p${i + 1}`
      });
    });
    return cols;
  }, [baseSurvey, comparisonSurveys]);

  // --- KPI Data preparation ---
  const favData: any = type === 'Cultura' ? CULTURA_FAVORABILITY_DATA : COMPARATIVE_FAVORABILITY_DATA;
  const partData: any = type === 'Cultura' ? CULTURA_PARTICIPATION_DATA : COMPARATIVE_PARTICIPATION_DATA;
  const npsData: any = type === 'Cultura' ? CULTURA_NPS_DATA : COMPARATIVE_NPS_DATA;
  const dimData: any[] = type === 'Cultura' ? CULTURA_DIMENSIONS_DATA : COMPARATIVE_DIMENSIONS_DATA;

  const getKPIItems = (data: any) => {
    if (!data || !data.comparisons) return [];
    
    return columns.map((col, index) => {
      // Try to find by ID/surveyId first, then by index as fallback to ensure deltas and variety
      const comp = data.comparisons.find((c: any) => c.id === col.id || c.surveyId === col.id) || data.comparisons[index] || data.comparisons[0];
      const dist = data.distributionByPeriod.find((d: any) => d.surveyId === col.id || d.period.includes(col.label) || d.period.includes(comp.label)) || data.distributionByPeriod[index] || data.distributionByPeriod[0];
      
      const pos = dist.segments.find((s: any) => s.tone === 'positive')?.percentage || 0;
      const neu = dist.segments.find((s: any) => s.tone === 'neutral')?.percentage || 0;
      const neg = dist.segments.find((s: any) => s.tone === 'negative')?.percentage || 0;

      return {
        id: col.id,
        label: col.label,
        value: comp.value,
        delta: col.isBase ? undefined : comp.delta,
        isBase: col.isBase,
        segments: [
          { id: `${col.id}-pos`, label: 'Favorable', value: pos, percentage: pos, tone: 'positive' },
          { id: `${col.id}-neu`, label: 'Neutral', value: neu, percentage: neu, tone: 'neutral' },
          { id: `${col.id}-neg`, label: 'Desfavorable', value: neg, percentage: neg, tone: 'negative' }
        ],
        total: dist.total
      };
    });
  };

  const favItems = getKPIItems(favData);
  const partItems = getKPIItems(partData);
  const npsItems = getKPIItems(npsData);

  const getTrendSeries = (items: any[], id: string) => {
    // Reverse items to show chronological order (Past -> Present)
    const chronologicalItems = [...items].reverse();
    
    return [{
      id,
      label: 'Resultado',
      data: chronologicalItems.map(item => ({
        label: item.label.split('-')[1]?.trim() || item.label,
        value: item.value,
        total: item.total
      }))
    }];
  };

  const favTrend = getTrendSeries(favItems, 'fav-trend');
  const partTrend = getTrendSeries(partItems, 'part-trend');
  const npsTrend = getTrendSeries(npsItems, 'nps-trend');

  return (
    <div className="h-screen bg-[#525659] flex flex-col font-sans overflow-hidden">
      {/* Adobe Acrobat Style Toolbar */}
      <div className="h-12 bg-[#323639] border-b border-black/20 flex items-center justify-between px-4 text-white/90 shadow-lg z-50 shrink-0">
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 bg-[#D32F2F] rounded flex items-center justify-center shadow-inner">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <span className="text-sm font-medium tracking-tight truncate max-w-[300px]">
            reporte-comparativo-{type.toLowerCase()}-{new Date().toISOString().split('T')[0]}.pdf
          </span>
        </div>

        {/* Middle: Page Controls */}
        <div className="flex items-center gap-3 bg-black/20 px-3 py-1 rounded-md border border-white/5">
          <button className="p-1 hover:bg-white/10 rounded transition-colors disabled:opacity-30" disabled>
            <ChevronUp className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-white/10 px-2 py-0.5 rounded">1</span>
            <span className="text-[10px] font-bold text-white/40 ">/ 1</span>
          </div>
          <button className="p-1 hover:bg-white/10 rounded transition-colors disabled:opacity-30" disabled>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border-r border-white/10 pr-4 mr-2">
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Minus className="h-4 w-4" />
            </button>
            <span className="text-xs font-bold w-10 text-center">100%</span>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => window.print()}
              className="p-2 hover:bg-white/10 rounded-full transition-colors title='Imprimir'"
            >
              <Printer className="h-4 w-4" />
            </button>
            <button 
              onClick={() => window.print()}
              className="p-2 hover:bg-white/10 rounded-full transition-colors title='Guardar'"
            >
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* PDF Workspace */}
      <div className="flex-1 overflow-y-auto p-8 sm:p-12 flex flex-col items-center">
        <div className="w-full max-w-[1200px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-sm p-16 space-y-12 animate-in fade-in zoom-in-95 duration-700 print:p-0 print:shadow-none print:w-full print:max-w-none print:m-0">
          
          {/* PDF Content Header */}
          <div className="flex justify-between items-end border-b border-slate-200 pb-8">
            <div className="flex items-center gap-3 text-brand">
              <div className="h-12 w-12 rounded-2xl bg-brand/5 flex items-center justify-center">
                <FileText className="h-7 w-7" />
              </div>
              <h1 className="text-4xl font-[900] tracking-tighter text-slate-900">Comparativo Encuestas</h1>
            </div>
            <p className="text-slate-500 font-bold text-sm mb-1.5">
              Reporte Generado el {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          {/* New Dashboard-style Filter Bar Legend - Reorganized */}
          <div className="bg-[#F8FAFC] border border-slate-100 rounded-2xl p-8 space-y-8">
            <div className="flex items-center gap-16">
              {/* Categoría */}
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 border border-slate-50 shrink-0">
                  <Layers className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-slate-400  leading-none mb-1.5">Categoría</span>
                  <span className="text-base font-black text-slate-800 leading-none">{type}</span>
                </div>
              </div>

              <div className="h-8 w-px bg-slate-200" />

              {/* Referencia Base */}
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 border border-slate-50 shrink-0">
                  <Info className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-brand  leading-none mb-1.5">Referencia Base</span>
                  <span className="text-base font-black text-slate-800 leading-none">{columns.find(c => c.isBase)?.label}</span>
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-slate-100" />

            {/* Comparativas Activas (Now below) */}
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 border border-slate-50 shrink-0">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-400  leading-none mb-1.5">Comparativas Activas ({columns.length})</span>
                <div className="flex items-center gap-x-3 gap-y-2 flex-wrap">
                  {columns.map((col, idx) => (
                    <React.Fragment key={col.id}>
                      <span className={cn(
                        "text-sm font-black leading-none",
                        col.isBase ? "text-brand" : "text-slate-600"
                      )}>
                        {col.label}
                      </span>
                      {idx < columns.length - 1 && <span className="text-slate-300 mx-0.5">|</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sections Grid */}
          <div className="space-y-20 pt-4">
            
            {/* Favorability Section */}
            {type !== 'NPS' && (
              <Card className="border border-slate-200 bg-white shadow-none rounded-[40px] overflow-hidden flex flex-col">
                <CardHeader className="px-10 pt-10 pb-6 border-b border-slate-50">
                  <div className="flex items-center gap-5">
                    <div className="h-14 w-14 rounded-2xl bg-brand/5 flex items-center justify-center text-brand shadow-inner">
                      <BarChart3 className="h-7 w-7" />
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight">Favorabilidad</h2>
                      <span className="text-xs font-bold text-slate-400 tracking-tight ">Resumen comparativo por periodo</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Distribution Panel */}
                    <div className="p-10 border-b lg:border-b-0 lg:border-r border-slate-100 bg-slate-50/20">
                      <div className="mb-8">
                        <span className="text-[10px] font-black text-slate-400">Distribución de Respuestas</span>
                      </div>
                      <ResponseStackedBarGroup
                        items={favItems}
                        showLegend={true}
                        showPercentages={true}
                        showIndividualLegends={true}
                        size="md"
                        compact
                        className="space-y-10"
                      />
                    </div>

                    {/* Trend Panel */}
                    <div className="p-10 flex flex-col">
                      <div className="mb-8">
                        <span className="text-[10px] font-black text-slate-400">Favorabilidad</span>
                      </div>
                      <div className="flex-1 min-h-[300px]">
                        <TrendMetricLineChart
                          series={favTrend}
                          height={300}
                          showLegend={false}
                          standalone
                          showLabels={true}
                          disableHover={true}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Variation Footer */}
                  <div className="bg-slate-50 border-t border-slate-100 p-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-2 w-2 rounded-full bg-brand animate-pulse" />
                      <span className="text-[10px] font-black text-slate-400">Variaciones contra Referencia</span>
                    </div>
                    <MetricComparisonFooter
                      items={favItems.map(item => ({
                        label: item.label,
                        value: `${item.value}%`,
                        delta: item.delta,
                        isBase: item.isBase
                      }))}
                      columns={favItems.length}
                      className="border-none p-0 bg-transparent"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Participation Section */}
            <Card className="border border-slate-200 bg-white shadow-none rounded-[40px] overflow-hidden flex flex-col">
              <CardHeader className="px-10 pt-10 pb-6 border-b border-slate-50">
                <div className="flex items-center gap-5">
                  <div className="h-14 w-14 rounded-2xl bg-brand/5 flex items-center justify-center text-brand shadow-inner">
                    <Users className="h-7 w-7" />
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Participación</h2>
                    <span className="text-xs font-bold text-slate-400 tracking-tight ">Compromiso y alcance de la muestra</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-10 border-b lg:border-b-0 lg:border-r border-slate-100 bg-slate-50/20">
                    <div className="mb-8">
                      <span className="text-[10px] font-black text-slate-400">Distribución de Respuesta</span>
                    </div>
                    <ResponseStackedBarGroup
                      items={partItems}
                      showLegend={true}
                      showPercentages={true}
                      showIndividualLegends={true}
                      size="md"
                      compact
                      className="space-y-10"
                    />
                  </div>
                  <div className="p-10 flex flex-col">
                    <div className="mb-8">
                      <span className="text-[10px] font-black text-slate-400">Tendencia de Participación</span>
                    </div>
                    <div className="flex-1 min-h-[300px]">
                      <TrendMetricLineChart
                        series={partTrend}
                        height={300}
                        showLegend={false}
                        standalone
                        showLabels={true}
                        disableHover={true}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 border-t border-slate-100 p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-2 w-2 rounded-full bg-brand animate-pulse" />
                    <span className="text-[10px] font-black text-slate-400">Variaciones contra Referencia</span>
                  </div>
                  <MetricComparisonFooter
                    items={partItems.map(item => ({
                      label: item.label,
                      value: `${item.value}%`,
                      delta: item.delta,
                      isBase: item.isBase
                    }))}
                    columns={partItems.length}
                    className="border-none p-0 bg-transparent"
                  />
                </div>
              </CardContent>
            </Card>

            {/* NPS Section */}
            {(type === 'Clima' || type === 'NPS') && (
              <Card className="border border-slate-200 bg-white shadow-none rounded-[40px] overflow-hidden flex flex-col">
                <CardHeader className="px-10 pt-10 pb-6 border-b border-slate-50">
                  <div className="flex items-center gap-5">
                    <div className="h-14 w-14 rounded-2xl bg-brand/5 flex items-center justify-center text-brand shadow-inner">
                      <Star className="h-7 w-7" />
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight">NPS (Net Promoter Score)</h2>
                      <span className="text-xs font-bold text-slate-400 tracking-tight ">Lealtad y recomendación</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="p-10 border-b lg:border-b-0 lg:border-r border-slate-100 bg-slate-50/20">
                      <div className="mb-8">
                        <span className="text-[10px] font-black text-slate-400">Distribución NPS</span>
                      </div>
                      <ResponseStackedBarGroup
                        items={npsItems}
                        showLegend={true}
                        showPercentages={true}
                        showIndividualLegends={true}
                        size="md"
                        compact
                        className="space-y-10"
                      />
                    </div>
                    <div className="p-10 flex flex-col">
                      <div className="mb-8">
                        <span className="text-[10px] font-black text-slate-400">Tendencia NPS</span>
                      </div>
                      <div className="flex-1 min-h-[300px]">
                        <TrendMetricLineChart
                          series={npsTrend}
                          height={300}
                          showLegend={false}
                          standalone
                          showLabels={true}
                          disableHover={true}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 border-t border-slate-100 p-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-2 w-2 rounded-full bg-brand animate-pulse" />
                      <span className="text-[10px] font-black text-slate-400">Variaciones contra Referencia</span>
                    </div>
                    <MetricComparisonFooter
                      items={npsItems.map(item => ({
                        label: item.label,
                        value: item.value.toString(),
                        delta: item.delta,
                        isBase: item.isBase
                      }))}
                      columns={npsItems.length}
                      className="border-none p-0 bg-transparent"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Dimensions Table Section */}
            <div className="space-y-10">
              <div className="flex items-center gap-4 border-l-4 border-brand pl-6 py-2">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Comparativa por Dimensiones</h2>
              </div>

              <Card className="border border-slate-200 bg-white shadow-none rounded-[40px] overflow-hidden">
                <CardContent className="p-10">
              <Table className="table-fixed w-full">
                <TableHeader className="[&_tr]:border-b-0">
                  <TableRow className="hover:bg-transparent border-b border-slate-100">
                    <TableHead className="h-16 text-[10px] font-black  text-slate-400 pl-0 w-[280px]">Dimensión</TableHead>
                    {columns.map((col) => (
                      <TableHead
                        key={col.id}
                        className={cn(
                          "h-16 text-center tracking-tight",
                          col.isBase ? "text-sm font-black text-brand bg-brand/[0.02]" : "text-[10px] font-black text-slate-400"
                        )}
                      >
                        <div className="flex flex-col items-center leading-tight">
                          <span className="whitespace-nowrap">{col.shortLabel}</span>
                          {col.isBase && <span className="text-[9px] opacity-70  mt-0.5 ">(Base)</span>}
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dimData.map((dim) => (
                    <TableRow key={dim.name} className="group hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-0">
                      <TableCell className="py-8 pl-0 w-[280px]">
                        <div className="flex flex-col gap-1.5 pr-8">
                          <span className="text-base font-black text-slate-800 tracking-tight group-hover:text-brand transition-colors block leading-tight">
                            {dim.name}
                          </span>
                          <p className="text-[10px] font-bold text-slate-400 leading-[1.5] break-words">
                            {dim.description}
                          </p>
                        </div>
                      </TableCell>
                          {columns.map((col) => {
                            const val = col.isBase ? dim.currentScore : (dim as any)[col.dataKey] || dim.currentScore - 5;
                            const baseVal = dim.currentScore;
                            const delta = col.isBase ? undefined : (val - baseVal);
                            const survey = allSurveys.find(s => s.id === col.id);
                            const participants = survey?.participants || "0";

                            return (
                              <TableCell key={col.id} className={cn(
                                "text-center py-6",
                                col.isBase && "bg-brand/[0.01]"
                              )}>
                                <div className="flex flex-col items-center gap-1">
                                  <span className={cn(
                                    "font-black tracking-tight",
                                    col.isBase ? "text-lg text-brand" : "text-base text-slate-600"
                                  )}>
                                    {val !== null ? `${val}%` : '—'}
                                  </span>
                                  
                                  {!col.isBase && delta !== undefined && (
                                    <div className="py-0.5">
                                      <DeltaPill value={Number(delta.toFixed(1))} size="xs" />
                                    </div>
                                  )}

                                  <span className="text-[9px] font-bold tracking-tight text-slate-400/50  mt-0.5">
                                    n={participants}
                                  </span>
                                </div>
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
          </div>
        </div>
      </div>
    </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        html, body {
          margin: 0;
          padding: 0;
          height: 100vh;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        @media print {
          .bg-[#525659] { background: white !important; }
          .h-12, .toolbar { display: none !important; }
          .h-screen { height: auto !important; overflow: visible !important; }
          .overflow-y-auto { overflow: visible !important; display: block !important; }
          .p-8, .sm\\:p-12 { padding: 0 !important; }
          .shadow-[0_20px_50px_rgba(0,0,0,0.3)] { box-shadow: none !important; border: none !important; }
          .w-full { width: 100% !important; margin: 0 !important; }
          .max-w-\\[1200px\\] { max-width: none !important; }
          .animate-in { animation: none !important; }
          @page { margin: 1cm; }
        }

        /* Acrobat-style scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 12px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #3c4043;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #5f6368;
          border: 3px solid #3c4043;
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #9aa0a6;
        }
      ` }} />
    </div>
  );
};
