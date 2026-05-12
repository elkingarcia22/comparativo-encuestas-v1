
import sys
import re

path = 'src/screens/ComparativeDashboard.tsx'
with open(path, 'r') as f:
    content = f.read()

# 1. Mute Subtitles in CardHeaders
# Target: <p className="text-sm font-bold text-text-secondary tracking-tight">
content = content.replace(
    'p className="text-sm font-bold text-text-secondary tracking-tight"',
    'p className="text-sm font-bold text-text-secondary/60 tracking-tight"'
)

# 2. Mute Table Headings (non-brand)
# Target: <TableHead className="... text-text-secondary ...">
# We want to make them text-text-secondary/50 for a cleaner look
content = content.replace(
    'text-sm font-bold text-text-secondary tracking-tight',
    'text-xs font-black uppercase tracking-widest text-text-secondary/40'
)

# 3. Mute "n=" responses labels further
# They currently use text-text-secondary/ something or just text-text-secondary
content = re.sub(
    r'text-(?:text-)?secondary(?:/\d+)? tracking-tight">n=',
    'text-text-secondary/30 tracking-widest uppercase text-[10px] font-black">n=',
    content
)

# 4. Mute Dimension descriptions in tables
# Target: <span className="text-sm font-bold text-text-secondary truncate max-w-[280px]">
content = content.replace(
    'text-sm font-bold text-text-secondary truncate max-w-[280px]',
    'text-xs font-medium text-text-secondary/70 truncate max-w-[280px]'
)

# 5. Fix Question Dimension label in Question Table
# Target: <span className="text-xs font-bold tracking-tight text-text-secondary px-2 py-0.5 rounded bg-surface-subtle border border-border/10">
content = content.replace(
    'text-xs font-bold tracking-tight text-text-secondary px-2 py-0.5 rounded bg-surface-subtle border border-border/10',
    'text-[10px] font-black uppercase tracking-wider text-text-secondary/60 px-2 py-0.5 rounded bg-surface-subtle border border-border/10'
)

with open(path, 'w') as f:
    f.write(content)

print("Applied depth and hierarchy through gray color variations")
