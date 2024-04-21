// ==UserScript==
// @name        Link to Markdown
// @namespace   https://github.com/CyrusYip/userscripts
// @match       *://*/*
// @require     https://cdn.jsdelivr.net/npm/@violentmonkey/shortcut@1
// @require     https://cdn.jsdelivr.net/gh/sizzlemctwizzle/GM_config@06f2015c04db3aaab9717298394ca4f025802873/gm_config.js
// @grant       GM.getValue
// @grant       GM.notification
// @grant       GM.registerMenuCommand
// @grant       GM.setClipboard
// @grant       GM.setValue
// @grant       GM_getValue
// @grant       GM_setValue
// @version     10.0.0
// @author      Cyrus Yip
// @description Get the link and title of current page, convert them to Markdown link, and write it to the clipboard. To use this script, click "Copy Markdown link" in the userscript manager's menu or press Shift + Alt + L . To change settings, click "Link to Markdown Settings" in the menu. Key Definition: https://github.com/violentmonkey/vm-shortcut#key-definition .
// ==/UserScript==
'use strict';

let title, href, hash, markdownLink, enableShortcut, enableNotification, shortcutDefinition

const loadConfig = function () {
  enableShortcut = this.get('enableShortcut')
  enableNotification = this.get('enableNotification')
  shortcutDefinition = this.get('shortcutDefinition')
  setShortcut()
}

let config = new GM_config({
  'id': 'Config',
  'title': 'Link to Markdown Settings',
  'fields': {
    'enableShortcut': {
      'label': 'Enable shortcut',
      'type': 'checkbox',
      'default': true,
    },
    'enableNotification': {
      'label': 'Enable notification',
      'type': 'checkbox',
      'default': true,
    },
    'shortcutDefinition': {
      'label': 'Shortcut definition',
      'type': 'text',
      'default': 'shift-alt-l',
    },
  },
  'events': {
    'init': loadConfig,
    'save': loadConfig,
  }
})

const copyLink = () => {
  ({ title } = document);
  ({ href, hash } = window.location)
  markdownLink = `[${title}${hash}](${href})`
  GM.setClipboard(markdownLink)
}

const showResult = () => {
  if (enableNotification === false) { return }
  markdownLink
    ? GM.notification(`✔ Link was copied.\n${markdownLink}`)
    : GM.notification(`✘ Failed to get link.`)
}

const setShortcut = () => {
  if (enableShortcut === false) { return }
  VM.shortcut.register(shortcutDefinition, () => {
    copyLink()
    showResult()
  })
}

GM.registerMenuCommand('Copy Markdown link', () => { copyLink(); showResult() })
GM.registerMenuCommand('Link to Markdown Settings', () => { config.open() })