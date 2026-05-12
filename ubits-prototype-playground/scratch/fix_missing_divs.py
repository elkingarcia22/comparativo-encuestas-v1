
import sys

path = 'src/screens/ComparativeDashboard.tsx'
with open(path, 'r') as f:
    lines = f.readlines()

# Fix Dimensions Table (lines around 2043)
for i in range(2000, 2100):
    if i < len(lines) and '{dim.q4_2023 || 0}%</span>' in lines[i] and 'flex items-center gap-2' not in lines[i-1]:
        lines[i] = '                                      <div className="flex items-center gap-2">\n' + lines[i]

# Fix Questions Table (lines around 2350)
for i in range(2300, 2400):
    if i < len(lines) and '{q.q4_2023 || 0}%</span>' in lines[i] and 'flex items-center gap-2' not in lines[i-1]:
        lines[i] = '                                    <div className="flex items-center gap-2">\n' + lines[i]

with open(path, 'w') as f:
    f.writelines(lines)

print("Fixed missing opening divs for Q4 2023 deltas")
