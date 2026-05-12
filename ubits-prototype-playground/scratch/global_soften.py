
import re

path = 'src/screens/ComparativeDashboard.tsx'
with open(path, 'r') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    # Remove uppercase class
    line = line.replace(' uppercase', '')
    line = line.replace('"uppercase', '"')
    
    # Soften tracking
    line = re.sub(r'tracking-\[0\.\d+em\]', 'tracking-tight', line)
    line = line.replace('tracking-widest', 'tracking-tight')
    line = line.replace('tracking-wider', 'tracking-tight')
    line = line.replace('tracking-wide', 'tracking-tight')
    
    # Soften font weight
    line = line.replace('font-black', 'font-bold')
    
    new_lines.append(line)

with open(path, 'w') as f:
    f.writelines(new_lines)

print("Globally softened typography in ComparativeDashboard.tsx")
