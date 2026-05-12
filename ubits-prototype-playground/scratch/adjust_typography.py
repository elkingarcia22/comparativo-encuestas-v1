
import sys

path = 'src/screens/ComparativeDashboard.tsx'
with open(path, 'r') as f:
    content = f.read()

# Typography Scale Adjustments
replacements = [
    ('text-[8px]', 'text-[10px]'),
    ('text-[9px]', 'text-[11px]'),
    ('text-[10px]', 'text-xs'), # 12px
    ('text-[10.5px]', 'text-xs'),
    ('text-[11px]', 'text-[13px]'),
    ('text-[13px]', 'text-sm'), # 14px
    ('text-[15px]', 'text-base'), # 16px
    # Headers and Titles
    ('text-sm font-bold text-text-brand tracking-wider', 'text-base font-bold text-text-brand tracking-tight'),
    ('text-xl font-bold text-text-brand', 'text-2xl font-black text-text-brand'),
    ('text-lg font-bold text-text-brand', 'text-xl font-bold text-text-brand'),
]

for old, new in replacements:
    content = content.replace(old, new)

with open(path, 'w') as f:
    f.write(content)

print("Successfully adjusted typography scale across the dashboard")
