/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** CopyQ Path - Path to CopyQ executable */
  "copyq_path": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `view-clipboard-entries` command */
  export type ViewClipboardEntries = ExtensionPreferences & {
  /** Default Tab - Name of Default CopyQ Tab */
  "default_tab": string,
  /** Max Tabs - Max number of CopyQ tabs to display. Set to 0 for no limit. Setting the limit too high will result in a long load time. */
  "max_items": string
}
  /** Preferences accessible in the `select-tab` command */
  export type SelectTab = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `view-clipboard-entries` command */
  export type ViewClipboardEntries = {}
  /** Arguments passed to the `select-tab` command */
  export type SelectTab = {}
}


