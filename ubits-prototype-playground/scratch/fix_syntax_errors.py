
import sys

path = 'src/screens/ComparativeDashboard.tsx'
with open(path, 'r') as f:
    lines = f.readlines()

# Fix Dimensions (Remove extra div around 1991)
# 1991 is index 1990
if '</div>' in lines[1990] and '</div>' in lines[1989] and '</div>' in lines[1988]:
    # Actually, I'll just look for the specific pattern.
    pass

# Better approach: find the lines by content
# Dimensions
for i in range(1980, 2000):
    if i < len(lines) and '</div>' in lines[i] and '</div>' in lines[i+1] and '</div>' in lines[i+2] and '</CardHeader>' in lines[i+3]:
        # Found the 3 divs. Remove the middle one? 
        # Actually, let's see. 1785 and 1823 are the opens. So we need 2 closes.
        # We have 3.
        del lines[i+2]
        break

# Questions
for i in range(2290, 2310):
    if i < len(lines) and '</div>' in lines[i] and '</CardHeader>' in lines[i+1]:
        # Found 1 div. We need 2 (for 2170 and 2185).
        lines.insert(i+1, '                      </div>\n')
        break

with open(path, 'w') as f:
    f.writelines(lines)

print("Fixed JSX syntax errors in card headers via script")
