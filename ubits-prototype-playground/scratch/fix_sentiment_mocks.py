
import re

path = 'src/mocks/comparativeMocks.ts'
with open(path, 'r') as f:
    lines = f.readlines()

# We need to find the blocks of data and fix the keys sequentially.
# For each object in COMPARATIVE_DIMENSIONS_DATA, COMPARATIVE_QUESTIONS_DATA, COMPARATIVE_SENTIMENT_DATA
# The order is: current, q3, q2, q1, prev_year_q4

# I'll use a simpler approach: 
# Since we know the sequence of keys in each object, I'll just find all qX_20XX and replace them in a round-robin way.
# Or better, I'll search for specific line patterns.

new_lines = []
for line in lines:
    # Fix keys in comparativeMocks.ts
    # If a line has "q4_2024" followed by "q3_2024", "q2_2024", "q1_2024", "q4_2024" (duplicate)
    # we need to fix the duplicate.
    
    # Wait, I'll just rewrite the keys based on the fact that they appear in a fixed order.
    new_line = line
    # I'll use a state machine or just sequential replacement for known patterns.
    
    # Actually, I'll just fix the Sentiment data which is clearly broken.
    if '"sent-' in line or 'dimension:' in line:
        pass # reset or something
    
    new_lines.append(new_line)

# I'll just use a direct string replacement for the most obvious cases.
content = "".join(lines)

# Fix Sentiment Mocks
# The keys appear in this order: q4_2024, q3_2024, q2_2024, q1_2024, q4_2024 (duplicate)
# We want the last one to be q4_2023.
# However, they might have been changed to something else.

# I'll use a regex that matches the whole object and replaces the keys.
import re

# Fix for Sentiment Data
sentiment_pattern = r'(\s+)q4_2024: (\{.*\}),\s+q3_2024: (\{.*\}),\s+q2_2024: (\{.*\}),\s+q1_2024: (\{.*\}),\s+q4_2024: (\{.*\})'
# Wait, this is too specific.

# I'll just use a simple find and replace for the 5th occurrence in each object.
# But that's hard with regex.

# I'll use a line-by-line approach for COMPARATIVE_SENTIMENT_DATA (lines 559-640)
for i in range(559, 640):
    if i < len(lines):
        line = lines[i]
        # If it's the 5th key in the block, it's original Q4 2024.
        # Original keys: q4_2025, q3_2025, q2_2025, q1_2025, q4_2024.
        # After my mess: q4_2024, q3_2024, q2_2024, q1_2024, q4_2024.
        
        # I'll look for the last occurrence of q4_2024 before the next ID or delta.
        # Actually, it's easier to just match the specific line content.
        if 'q4_2024' in line and (i-560) % 10 == 7: # Approximate index
            pass

# Let's just do a global replace of the specific sequence.
# I'll use a simpler script.
with open(path, 'w') as f:
    f.write(content.replace('q4_2024: { positive: 55, neutral: 25, negative: 20, total: 250 }', 'q4_2023: { positive: 55, neutral: 25, negative: 20, total: 250 }')
                  .replace('q4_2024: { positive: 40, neutral: 40, negative: 20, total: 150 }', 'q4_2023: { positive: 40, neutral: 40, negative: 20, total: 150 }')
                  .replace('q4_2024: { positive: 50, neutral: 30, negative: 20, total: 220 }', 'q4_2023: { positive: 50, neutral: 30, negative: 20, total: 220 }')
                  .replace('q4_2024: { positive: 68, neutral: 22, negative: 10, total: 280 }', 'q4_2023: { positive: 68, neutral: 22, negative: 10, total: 280 }')
                  .replace('q4_2024: { positive: 45, neutral: 33, negative: 22, total: 160 }', 'q4_2023: { positive: 45, neutral: 33, negative: 22, total: 160 }')
                  .replace('q4_2024: { positive: 58, neutral: 27, negative: 15, total: 190 }', 'q4_2023: { positive: 58, neutral: 27, negative: 15, total: 190 }')
                  .replace('q4_2024: { positive: 35, neutral: 25, negative: 40, total: 140 }', 'q4_2023: { positive: 35, neutral: 25, negative: 40, total: 140 }')
                  .replace('q4_2024: { positive: 72, neutral: 20, negative: 8, total: 260 }', 'q4_2023: { positive: 72, neutral: 20, negative: 8, total: 260 }'))

print("Fixed sentiment keys in mocks")
