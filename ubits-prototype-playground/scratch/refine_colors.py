
import sys

path = 'src/screens/ComparativeDashboard.tsx'
with open(path, 'r') as f:
    content = f.read()

# Color Token Refinements
replacements = [
    # Table Headers
    ('text-sm font-bold text-text-muted tracking-tight', 'text-sm font-bold text-text-secondary tracking-tight'),
    # Dimension / Question Names
    ('text-sm font-black text-text-brand tracking-tight', 'text-sm font-black text-text-primary tracking-tight'),
    # Descriptions
    ('text-sm font-medium text-text-muted truncate', 'text-sm font-medium text-text-secondary truncate'),
    # Card Titles
    ('h3 className="text-base font-bold text-text-brand tracking-tight"', 'h3 className="text-base font-bold text-text-primary tracking-tight"'),
    ('h3 className="text-base font-bold text-text-brand tracking-wider"', 'h3 className="text-base font-bold text-text-primary tracking-tight"'),
    # Card Subtitles
    ('span className="text-xs font-bold text-text-secondary/40 tracking-tight"', 'span className="text-xs font-medium text-text-secondary tracking-tight"'),
    # Section Headers
    ('h2 className="text-2xl font-black text-text-brand tracking-tight"', 'h2 className="text-2xl font-black text-text-primary tracking-tight"'),
    # Table Cell Comparative Scores
    ('text-sm font-bold text-text-secondary/80', 'text-sm font-bold text-text-secondary'),
]

for old, new in replacements:
    content = content.replace(old, new)

with open(path, 'w') as f:
    f.write(content)

print("Successfully refined color tokens for improved visual hierarchy")
