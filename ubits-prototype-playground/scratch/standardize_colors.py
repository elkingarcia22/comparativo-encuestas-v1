
import sys
import re

path = 'src/screens/ComparativeDashboard.tsx'
with open(path, 'r') as f:
    content = f.read()

# Standardize all "muted" text colors to "secondary" for labels
# We replace both text-text-muted and text-muted
content = content.replace('text-text-muted', 'text-text-secondary')
content = content.replace('text-muted', 'text-text-secondary')

# Fix cases where we might have double "text-text"
content = content.replace('text-text-text-secondary', 'text-text-secondary')

# Ensure consistency in font weights for secondary labels
content = content.replace('font-medium text-text-secondary', 'font-bold text-text-secondary')

with open(path, 'w') as f:
    f.write(content)

print("Standardized all secondary text colors across the dashboard")
