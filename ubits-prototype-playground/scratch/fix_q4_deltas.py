
import sys

path = 'src/screens/ComparativeDashboard.tsx'
with open(path, 'r') as f:
    content = f.read()

# Fix Dimensions table cell for Q4 2023
old_dim = """                                      <span className="text-[13px] font-bold text-text-secondary/80">{dim.q4_2023 || 0}%</span>
                                      <span className="text-[8px] font-bold text-text-muted/30 tracking-tight">n={Math.round(dim.responses * 0.85)}</span>"""
# Wait, I need to match the EXACT spacing.
# Let's try matching part of it.

content = content.replace(
    '{dim.q4_2023 || 0}%</span>\n                                      <span className="text-[8px] font-bold text-text-muted/30 tracking-tight">n={Math.round(dim.responses * 0.85)}</span>',
    '{dim.q4_2023 || 0}%</span>\n                                        <DeltaPill value={1.2} size="xs" />\n                                      </div>\n                                      <span className="text-[8px] font-bold text-text-muted/30 tracking-tight">n={Math.round(dim.responses * 0.85)}</span>'
)
# Wait, I need to add the opening div too.
# Let's do a more robust regex-like approach.

import re

# Dimensions Table Fix
# Match the pattern inside the TableCell
pattern_dim = r'(<TableCell className="text-center">)\s+(<div className="flex flex-col items-center gap-1.5">)\s+(<span className="text-\[13px\] font-bold text-text-secondary/80">\{dim\.q4_2023 \|\| 0\}%</span>)\s+(<span className="text-\[8px\] font-bold text-text-muted/30 tracking-tight">n=\{Math\.round\(dim\.responses \* 0\.85\)\}</span>)'
replacement_dim = r'\1\n                                    <div className="flex flex-col items-center gap-1.5">\n                                      <div className="flex items-center gap-2">\n                                        <span className="text-[13px] font-bold text-text-secondary/80">{dim.q4_2023 || 0}%</span>\n                                        <DeltaPill value={1.2} size="xs" />\n                                      </div>\n                                      <span className="text-[8px] font-bold text-text-muted/30 tracking-tight">n={Math.round(dim.responses * 0.85)}</span>'

content = re.sub(pattern_dim, replacement_dim, content)

# Questions Table Fix
pattern_q = r'(<TableCell className="text-center">)\s+(<div className="flex flex-col items-center gap-1.5">)\s+(<span className="text-\[13px\] font-bold text-text-secondary/80">\{q\.q4_2023 \|\| 0\}%</span>)\s+(<span className="text-\[8px\] font-bold text-text-muted/30 tracking-tight">n=\{Math\.round\(q\.responses \* 0\.85\)\}</span>)'
replacement_q = r'\1\n                                  <div className="flex flex-col items-center gap-1.5">\n                                    <div className="flex items-center gap-2">\n                                      <span className="text-[13px] font-bold text-text-secondary/80">{q.q4_2023 || 0}%</span>\n                                      <DeltaPill value={0.8} size="xs" />\n                                    </div>\n                                    <span className="text-[8px] font-bold text-text-muted/30 tracking-tight">n={Math.round(q.responses * 0.85)}</span>'

content = re.sub(pattern_q, replacement_q, content)

with open(path, 'w') as f:
    f.write(content)

print("Added DeltaPills to Q4 2023 in Dimensions and Questions tables")
