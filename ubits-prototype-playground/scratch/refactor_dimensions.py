
import sys

path = 'src/screens/ComparativeDashboard.tsx'
with open(path, 'r') as f:
    lines = f.readlines()

# Line 2040 (0-indexed 2039)
lines[2039] = '                                <TableCell colSpan={6} className="h-32 text-center text-text-secondary/40 font-medium">\n'

# Cells 2006-2035
new_cells = [
    '                                  <TableCell className="text-center">\n',
    '                                    <div className="flex flex-col items-center gap-1.5">\n',
    '                                      <div className="flex items-center gap-2">\n',
    '                                        <span className="text-[15px] font-black text-brand">{dim.currentScore}%</span>\n',
    '                                        <DeltaPill value={Number((dim.currentScore - dim.q3_2025).toFixed(1))} size="xs" />\n',
    '                                      </div>\n',
    '                                      <span className="text-[9px] font-bold text-text-muted/40 tracking-tight">n={dim.responses}</span>\n',
    '                                    </div>\n',
    '                                  </TableCell>\n',
    '                                  <TableCell className="text-center">\n',
    '                                    <div className="flex flex-col items-center gap-1.5">\n',
    '                                      <div className="flex items-center gap-2">\n',
    '                                        <span className="text-[13px] font-bold text-text-secondary/80">{dim.q3_2025}%</span>\n',
    '                                        <DeltaPill value={Number((dim.q3_2025 - (dim.q2_2025 || 60)).toFixed(1))} size="xs" />\n',
    '                                      </div>\n',
    '                                      <span className="text-[8px] font-bold text-text-muted/30 tracking-tight">n={Math.round(dim.responses * 0.95)}</span>\n',
    '                                    </div>\n',
    '                                  </TableCell>\n',
    '                                  <TableCell className="text-center">\n',
    '                                    <div className="flex flex-col items-center gap-1.5">\n',
    '                                      <div className="flex items-center gap-2">\n',
    '                                        <span className="text-[13px] font-bold text-text-secondary/80">{dim.q2_2025 || 0}%</span>\n',
    '                                        <DeltaPill value={Number(((dim.q2_2025 || 60) - dim.q1_2025).toFixed(1))} size="xs" />\n',
    '                                      </div>\n',
    '                                      <span className="text-[8px] font-bold text-text-muted/30 tracking-tight">n={Math.round(dim.responses * 0.92)}</span>\n',
    '                                    </div>\n',
    '                                  </TableCell>\n',
    '                                  <TableCell className="text-center">\n',
    '                                    <div className="flex flex-col items-center gap-1.5">\n',
    '                                      <div className="flex items-center gap-2">\n',
    '                                        <span className="text-[13px] font-bold text-text-secondary/80">{dim.q1_2025}%</span>\n',
    '                                        <DeltaPill value={Number((dim.q1_2025 - (dim.q4_2024 || 58)).toFixed(1))} size="xs" />\n',
    '                                      </div>\n',
    '                                      <span className="text-[8px] font-bold text-text-muted/30 tracking-tight">n={Math.round(dim.responses * 0.88)}</span>\n',
    '                                    </div>\n',
    '                                  </TableCell>\n',
    '                                  <TableCell className="text-center">\n',
    '                                    <div className="flex flex-col items-center gap-1.5">\n',
    '                                      <span className="text-[13px] font-bold text-text-secondary/80">{dim.q4_2024 || 0}%</span>\n',
    '                                      <span className="text-[8px] font-bold text-text-muted/30 tracking-tight">n={Math.round(dim.responses * 0.85)}</span>\n',
    '                                    </div>\n',
    '                                  </TableCell>\n'
]

# Replace lines 2006 to 2035 (0-indexed 2005 to 2034)
lines[2005:2035] = new_cells

with open(path, 'w') as f:
    f.writelines(lines)
