# Input: Clipboard Entry's Tab and Index
# Output: Runs the copyq console command to copy the entry to the clipboard

import subprocess as sp
import pyperclip as pc

# Input variables
tab = 'Mac'
index = 0

# Run the copyq command
command = f"copyq tab {tab} select {index}"
try:
    output = sp.check_output(command, shell=True, text=True)
except sp.CalledProcessError as e:
    pc.copy(f'Error running command: {e}')
