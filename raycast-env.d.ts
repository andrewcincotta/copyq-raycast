/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `view-clipboard-entries` command */
  export type ViewClipboardEntries = ExtensionPreferences & {
  /** CopyQ Path - Path to CopyQ executable */
  "copyq_path": string,
  /** Default Tab - Name of Default CopyQ Tab */
  "default_tab": string,
  /** Default Number of Items - Default Number of Items to Display */
  "default_num_items": string
}
}

declare namespace Arguments {
  /** Arguments passed to the `view-clipboard-entries` command */
  export type ViewClipboardEntries = {}
}


