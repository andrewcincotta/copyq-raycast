import json
import subprocess as sp

# Path to userConfig.json
userConfig = 'User Config.json'

# Load the data from the JSON file
with open(userConfig, 'r') as file:
    loaded_data = json.load(file)

# Retrieve the variables from the JSON file
defaultTab = loaded_data['defaultTab']
amountOfItems = loaded_data['amountOfItems']


# Function to list the items in a tab
def listItems(tab, numItems):
    clipboardContent = []
    for i in range(numItems):
        command = f"copyq tab {tab} read {i}"

        try:
            output = sp.check_output(command, shell=True, text=True)
            clipboardContent.append(output)
        except sp.CalledProcessError as e:
            print(f"Error running command: {e}")

    return clipboardContent


items = listItems(defaultTab, amountOfItems)
for item in items:
    print(item)
