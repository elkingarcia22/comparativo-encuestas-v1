
import sys
import re

path = 'src/screens/ComparativeDashboard.tsx'
with open(path, 'r') as f:
    content = f.read()

# 1. Soften Table Headers (reduce weight from font-black to font-semibold)
content = content.replace(
    'text-xs font-black uppercase tracking-widest text-text-secondary/40',
    'text-[10px] font-semibold uppercase tracking-[0.15em] text-text-secondary/50'
)

# 2. Soften "n=" labels (reduce weight from font-black to font-medium)
content = content.replace(
    'text-[10px] font-black uppercase tracking-widest text-text-secondary/30',
    'text-[10px] font-medium uppercase tracking-wider text-text-secondary/50'
)

# 3. Soften Dimension category tag in Questions
content = content.replace(
    'text-[10px] font-black uppercase tracking-wider text-text-secondary/60',
    'text-[10px] font-semibold uppercase tracking-wider text-text-secondary/50'
)

# 4. Soften Tab Header Subtitles
content = content.replace(
    'p className="text-sm font-bold text-text-secondary/60 tracking-tight"',
    'p className="text-sm font-medium text-text-secondary/50 tracking-tight"'
)

# 5. Soften main titles (from font-black to font-bold for a less aggressive look if they were black)
# The user might find text-xl font-black too much. Let's try font-bold for titles.
content = content.replace(
    'h3 className="text-xl font-black text-text-primary',
    'h3 className="text-xl font-bold text-text-primary'
)

# 6. Soften dimension names in table (if font-black)
content = content.replace(
    'span className="text-sm font-black text-text-primary',
    'span className="text-sm font-bold text-text-primary'
)

# 7. Soften the brand score (percentage) weights
content = content.replace(
    'text-base font-black text-brand',
    'text-base font-bold text-brand'
)

with open(path, 'w') as f:
    f.write(content)

print("Softened typography and refined color shades")
