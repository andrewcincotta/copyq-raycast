import {
  getPreferenceValues,
  List,
  Icon,
  ActionPanel,
  Action,
  Clipboard,
  Detail,
  openExtensionPreferences,
} from "@raycast/api";
import { useState, useEffect } from "react";
import { execSync } from "child_process";

// Handle preferences
interface ExtensionPreferences {
  copyq_path: string;
  default_tab: string;
  max_entries: number;
}
const copyqPath = getPreferenceValues<ExtensionPreferences>().copyq_path;
const maxEntries = getPreferenceValues<ExtensionPreferences>().max_entries;

// Get the list of tabs from CopyQ and return an array of text
function getTabs(): string[] {
  const command = `"${copyqPath}" tab`;
  const stdout = execSync(command, { encoding: "utf8" });

  // Format list of tabs from string to array
  const lines = stdout.split("\n");
  const formattedList = lines.filter((line) => line.trim() !== "");
  // Remove & from items in the list
  formattedList.forEach((item, index) => {
    formattedList[index] = item.replace("&", "");
  });

  return formattedList;
}

// Dropdown component for selecting a tab
function TabDropdown(props: { onTabChange: (newTab: string) => void }) {
  const { onTabChange } = props;
  const tabs = getTabs();
  return (
    <List.Dropdown
      tooltip="Select a Tab"
      defaultValue={getPreferenceValues<ExtensionPreferences>().default_tab}
      storeValue={false}
      placeholder="Search Tabs"
      onChange={(newTab) => {
        onTabChange(newTab);
      }}
    >
      {tabs.map((tab) => (
        <List.Dropdown.Item key={tab} title={tab} value={tab} />
      ))}
    </List.Dropdown>
  );
}

// Gets clipboard contents for a given tab and returns an array of text
function getClipboardContents(tab: string) {
  if (maxEntries > 0) {
    // Max entries is greater than 0
    // Get the number of entries in the tab
    /*const sizeCommand = `${copyqPath} tab ${tab} count`;
    const size = parseInt(execSync(sizeCommand, { encoding: "utf8" }));
    // Check if the number of entries is less than the max entries
    if (size < maxEntries) {
      maxEntries = size;
    }*/
    const command = `${copyqPath} tab ${tab} 'separator(String.fromCharCode(0)); read.apply(this, [...Array(${maxEntries}).keys()])'`;
    const stdout = execSync(command, { encoding: "utf8" });
    return stdout.split("\0");
  } else {
    // Max entries is 0
    const command = `${copyqPath} tab ${tab} 'separator(String.fromCharCode(0)); read.apply(this, [...Array(size()).keys()])'`;
    const stdout = execSync(command, { encoding: "utf8" });
    // Return the array split by null characters
    return stdout.split("\0");
  }
}

// Selects clipboard content for a given tab and index
function selectClipboardContents(tab: string, index: number) {
  const command = `${copyqPath} tab ${tab} select ${index}`;
  execSync(command);
}

export default function Command() {
  // Error handling for missing CopyQ path and CopyQ not running
  try {
    execSync(`${copyqPath} tab`, { encoding: "utf8" });
  } catch (err) {
    return (
      <Detail
        markdown={
          "CopyQ not found, or CopyQ server not running\n\nPlease check your CopyQ path in preferences, and make sure CopyQ server is running."
        }
        actions={
          <ActionPanel>
            <Action title="Open Command Preferences" icon={Icon.Cog} onAction={openExtensionPreferences} />
            <Action.Paste title="Copy Path to Clipboard" content={copyqPath} />
          </ActionPanel>
        }
      />
    );
  }

  const [selectedTab, setSelectedTab] = useState(getPreferenceValues<ExtensionPreferences>().default_tab);
  const [clipboardContents, setClipboardContents] = useState<string[]>([]);
  const [maxEntries] = useState(getPreferenceValues<ExtensionPreferences>().max_entries);

  useEffect(() => {
    const newClipboardContents = getClipboardContents(selectedTab);
    setClipboardContents(newClipboardContents);
  }, [selectedTab, maxEntries]);

  const onTabChange = (newTab: string) => {
    setSelectedTab(newTab);
  };

  return (
    <List
      navigationTitle="Clipboard Manager"
      searchBarPlaceholder="Search Clipboard Contents"
      searchBarAccessory={<TabDropdown onTabChange={onTabChange} />}
    >
      {clipboardContents.map((text, index) => (
        <List.Item
          key={index}
          title={text}
          actions={
            <ActionPanel>
              <Action
                title="Paste"
                icon={Icon.Clipboard}
                onAction={() => {
                  selectClipboardContents(selectedTab, index);
                  Clipboard.paste({ text });
                }}
              />
            </ActionPanel>
          }
          detail={<List.Item.Detail markdown={text} />}
        />
      ))}
    </List>
  );
}
