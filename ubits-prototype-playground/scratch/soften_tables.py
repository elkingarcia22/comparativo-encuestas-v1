
import re

path = 'src/screens/ComparativeDashboard.tsx'
with open(path, 'r') as f:
    content = f.read()

# 1. Remove uppercase and high tracking from TableHead
# Example: text-[10px] font-semibold uppercase tracking-[0.15em] text-text-secondary/50
content = re.sub(r'text-\[10px\] font-semibold uppercase tracking-\[0\.15em\] text-text-secondary/50', 
                 'text-[11px] font-bold tracking-tight text-text-secondary/50', content)

# 2. Remove uppercase and tracking-widest/wider from other spans
# Example: text-sm font-bold text-text-secondary/40 uppercase tracking-widest
content = re.sub(r'text-sm font-bold text-text-secondary/40 uppercase tracking-widest', 
                 'text-sm font-bold text-text-secondary/50 tracking-tight', content)

# Example: text-[10px] font-semibold uppercase tracking-[0.15em] text-text-secondary/60
content = re.sub(r'text-\[10px\] font-semibold uppercase tracking-\[0\.15em\] text-text-secondary/60', 
                 'text-[11px] font-bold tracking-tight text-text-secondary/60', content)

# 3. Handle 'n={...}' labels
# Example: text-[10px] font-medium uppercase tracking-wider text-text-secondary/50
content = re.sub(r'text-\[10px\] font-medium uppercase tracking-wider text-text-secondary/50', 
                 'text-[10px] font-bold tracking-tight text-text-secondary/40', content)

# 4. Handle Dimension badges in rows
# Example: text-[10px] font-semibold uppercase tracking-wider text-text-secondary/50
content = re.sub(r'text-\[10px\] font-semibold uppercase tracking-wider text-text-secondary/50', 
                 'text-[10px] font-bold tracking-tight text-text-secondary/60', content)

# 5. Handle AI Analysis labels
# Example: text-sm font-bold text-brand uppercase tracking-widest
content = re.sub(r'text-sm font-bold text-brand uppercase tracking-widest', 
                 'text-sm font-bold text-brand tracking-tight', content)

# 6. Specific case for line 2128 (th instead of TableHead)
content = re.sub(r'text-sm font-black text-text-secondary uppercase tracking-wider', 
                 'text-sm font-bold text-text-secondary tracking-tight', content)

# 7. Generic uppercase removal for tracking-[0.15em]
content = content.replace('uppercase tracking-[0.15em]', 'tracking-tight')
content = content.replace('uppercase tracking-widest', 'tracking-tight')
content = content.replace('uppercase tracking-wider', 'tracking-tight')
content = content.replace('uppercase tracking-wide', 'tracking-tight')
content = content.replace('font-black uppercase', 'font-bold')

with open(path, 'w') as f:
    f.write(content)

print("Softened table and label typography in ComparativeDashboard.tsx")
