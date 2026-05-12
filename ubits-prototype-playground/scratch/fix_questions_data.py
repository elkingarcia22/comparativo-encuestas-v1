
import sys
import re

path = 'src/screens/ComparativeDashboard.tsx'
with open(path, 'r') as f:
    content = f.read()

# 1. Update filteredAndSortedQuestions logic to include all 5 periods
old_mapping = """          q4_2024: newTrend[4] || Math.max(0, Math.min(100, q.q4_2023 - factor)),
          q3_2024: newTrend[3] || Math.max(0, Math.min(100, q.q3_2024 - factor * 0.8)),
          q2_2024: newTrend[2] || Math.max(0, Math.min(100, q.q2_2024 - factor * 0.6)),
          trend: newTrend,"""

new_mapping = """          q4_2024: newTrend[4] || q.q4_2024,
          q3_2024: newTrend[3] || q.q3_2024,
          q2_2024: newTrend[2] || q.q2_2024,
          q1_2024: newTrend[1] || (q.trend ? q.trend[1] : 60),
          q4_2023: newTrend[0] || (q.trend ? q.trend[0] : 58),
          trend: newTrend,"""

content = content.replace(old_mapping, new_mapping)

# 2. Fix Questions Table UI
# This is a bit more complex. I'll use a regex to replace the entire TableBody content for Questions.
# I'll first find the start and end of the Question table mapping.

# Pattern for the Questions table body
questions_table_pattern = r'\{filteredAndSortedQuestions\.length > 0 \? \(\s+filteredAndSortedQuestions\.map\(\(item\) => \([\s\S]+?\)\s+\)\s+\) : \('

# I'll use a more direct string replacement for the rows to ensure consistency.

questions_row_content = """                                <TableCell className="text-center">
                                  <div className="flex flex-col items-center gap-1.5">
                                    <div className="flex items-center gap-2">
                                      <span className="text-base font-bold text-brand">{item.q4_2024}%</span>
                                      <DeltaPill value={Number((item.q4_2024 - item.q3_2024).toFixed(1))} size="xs" />
                                    </div>
                                    <span className="text-[10px] font-medium uppercase tracking-wider text-text-secondary/50">n={item.responses}</span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-center">
                                  <div className="flex flex-col items-center gap-1.5">
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-bold text-text-secondary">{item.q3_2024}%</span>
                                      <DeltaPill value={Number((item.q3_2024 - item.q2_2024).toFixed(1))} size="xs" />
                                    </div>
                                    <span className="text-[10px] font-medium uppercase tracking-wider text-text-secondary/50">n={Math.round(item.responses * 0.95)}</span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-center">
                                  <div className="flex flex-col items-center gap-1.5">
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-bold text-text-secondary">{item.q2_2024}%</span>
                                      <DeltaPill value={Number((item.q2_2024 - item.q1_2024).toFixed(1))} size="xs" />
                                    </div>
                                    <span className="text-[10px] font-medium uppercase tracking-wider text-text-secondary/50">n={Math.round(item.responses * 0.92)}</span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-center">
                                  <div className="flex flex-col items-center gap-1.5">
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-bold text-text-secondary">{item.q1_2024}%</span>
                                      <DeltaPill value={Number((item.q1_2024 - item.q4_2023).toFixed(1))} size="xs" />
                                    </div>
                                    <span className="text-[10px] font-medium uppercase tracking-wider text-text-secondary/50">n={Math.round(item.responses * 0.88)}</span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-center">
                                  <div className="flex flex-col items-center gap-1.5">
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-bold text-text-secondary">{item.q4_2023}%</span>
                                      <DeltaPill value={1.5} size="xs" />
                                    </div>
                                    <span className="text-[10px] font-medium uppercase tracking-wider text-text-secondary/50">n={Math.round(item.responses * 0.85)}</span>
                                  </div>
                                </TableCell>"""

# Find the start of the columns in the Questions table
# It starts after line 2330
start_marker = '<TableCell className="text-center">\n                                  <div className="flex flex-col items-center gap-1.5">\n                                    <div className="flex items-center gap-2">\n                                      <span className="text-base font-bold text-brand">{item.q4_2023}%</span>'
# Oh wait, my previous cleanup might have changed line 2334.
# Let's check the current content of the file for that area.

with open(path, 'w') as f:
    f.write(content)

print("Updated filteredAndSortedQuestions logic. Now fixing the table UI...")
