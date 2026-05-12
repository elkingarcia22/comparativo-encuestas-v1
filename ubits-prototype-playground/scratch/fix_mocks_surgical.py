
import re

path = 'src/mocks/comparativeMocks.ts'
with open(path, 'r') as f:
    content = f.read()

# Fix Dimensions keys (q4_2024 as the 5th period)
# We want to change the one that follows q1_2024.
content = re.sub(r'(q1_2024: \d+),\s+q4_2024:', r'\1, q4_2023:', content)

# Fix Sentiment keys (q4_2024 as the 5th period)
# We want to change the one that follows q1_2024.
content = re.sub(r'(q1_2024: \{.*\}),\s+q4_2024:', r'\1, q4_2023:', content)

# Fix Favorability periods
content = content.replace('period: \'Q4 2024 (BASE)\'', 'period: \'Q4 2024 (BASE)\'') # no change needed if already fixed
# But wait, original was Q4 2025.
# If I have Q4 2024 (BASE) and then Q1 2024.
# I want: Q4 2024, Q3 2024, Q2 2024, Q1 2024, Q4 2023.

# Let's fix the distributionByPeriod in Favorability
content = content.replace('period: \'Q1 2024\'', 'period: \'Q4 2023\'', 1) # This is a bit risky.

# Actually, I'll just rewrite the whole file content to be absolutely sure.
# I'll use a more surgical regex for the keys.

# Dimensions
content = re.sub(r'q4_2024: (\d+),\s+delta:', r'q4_2023: \1, delta:', content)

# Sentiment
content = re.sub(r'q4_2024: (\{.*\}),\s+delta:', r'q4_2023: \1, delta:', content)

with open(path, 'w') as f:
    f.write(content)

print("Fixed q4_2023 keys in mocks")
