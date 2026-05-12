
import sys

def fix_keys(path):
    with open(path, 'r') as f:
        content = f.read()
    
    # In the tables, we have mapping like:
    # Q4 2024 (Base) -> uses currentScore/q4_2024
    # Q3 2024        -> uses q3_2024
    # Q2 2024        -> uses q2_2024
    # Q1 2024        -> uses q1_2024
    # Q4 2023        -> SHOULD use q4_2023
    
    # We need to change the usages of the 5th period key.
    # Currently it might be using q4_2024 (which we want to be q4_2023).
    
    # Replace the specific patterns in the tables
    # Dimensions
    content = content.replace('dim.q4_2024', 'dim.q4_2023')
    
    # Questions
    content = content.replace('q.q4_2024', 'q.q4_2023')
    
    # Sentiment
    content = content.replace('item.q4_2024', 'item.q4_2023')
    content = content.replace('s.q4_2024', 's.q4_2023')
    
    with open(path, 'w') as f:
        f.write(content)

fix_keys('src/screens/ComparativeDashboard.tsx')
print("Fixed keys in dashboard to match new labels (q4_2024 -> q4_2023)")
