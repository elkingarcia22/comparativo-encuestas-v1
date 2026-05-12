
import sys

path = 'src/screens/ComparativeDashboard.tsx'
with open(path, 'r') as f:
    content = f.read()

# Cleanup duplicate font/size classes in n= labels
content = content.replace(
    'text-xs font-bold text-text-secondary/30 tracking-widest uppercase text-[10px] font-black',
    'text-[10px] font-black uppercase tracking-widest text-text-secondary/30'
)
content = content.replace(
    'text-sm font-bold text-text-secondary/30 tracking-widest uppercase text-[10px] font-black',
    'text-[10px] font-black uppercase tracking-widest text-text-secondary/30'
)

with open(path, 'w') as f:
    f.write(content)

print("Cleaned up redundant classes in labels")
