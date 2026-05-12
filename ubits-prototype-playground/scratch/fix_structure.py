
import sys

path = 'src/screens/ComparativeDashboard.tsx'
with open(path, 'r') as f:
    lines = f.readlines()

# Find the NPS Card end (around 1425)
for i in range(1410, 1450):
    if i < len(lines) and '</Card>' in lines[i] and '</div>' in lines[i+1] and ')}' in lines[i+2]:
        # Keep the div (which closes the grid), remove the )}
        # Actually, let's look at the structure I added.
        # <div className="px-4 sm:px-10 pt-2 grid grid-cols-1 lg:grid-cols-3 gap-8">
        # So I need one </div> to close it.
        # Lines[i+1] is a </div>. Lines[i+2] is )}.
        del lines[i+2]
        break

with open(path, 'w') as f:
    f.writelines(lines)

print("Fixed JSX structure for permanent cards")
