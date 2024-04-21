// ==UserScript==
// @name        Link to Markdown
// @namespace   https://github.com/CyrusYip/userscripts
// @match       *://*/*
// @grant       GM.registerMenuCommand
// @grant       GM.setClipboard
// @grant       GM.getValue
// @grant       GM.setValue
// @grant       GM.notification
// @require     https://cdn.jsdelivr.net/npm/@violentmonkey/shortcut@1
// @version     9.3.0
// @author      Cyrus Yip
// @description Get the link and title of current page, convert them to Markdown link, and write it to the clipboard. To use this script, click the button in the userscript manager's menu or press Shift + Alt + L . This script can be customized in Violentmonkey (Dashboard -> Edit -> Values). To disable the shortcut, set 'disable-shortcut' as true. To disable notification, set 'disable-notification' as true. To change shortcut, set 'shortcut' (Key Definition: https://github.com/violentmonkey/vm-shortcut#key-definition). To reset, remove all values.
// ==/UserScript==
'use strict';

const defaultConfig = {
  'disable-notification': false,
  'disable-shortcut': false,
  'shortcut': 'shift-alt-l',
}
const setDefaultConfig = async (values) => {
  for (const [key, value] of Object.entries(values)) {
    await GM.getValue(key) === undefined && GM.setValue(key, value)
  }
}

let title, href, hash, markdownLink
const copyLink = () => {
  ({ title } = document);
  ({ href, hash } = window.location)
  markdownLink = `[${title}${hash}](${href})`
  GM.setClipboard(markdownLink)
}

const showResult = async () => {
  if (await GM.getValue('disable-notification') === true) { return }
  markdownLink
    ? GM.notification(`✔ Link was copied.\n${markdownLink}`)
    : GM.notification(`✘ Failed to get link.`)
}

const setShortcut = async () => {
  if (await GM.getValue('disable-shortcut') === true) { return }
  VM.shortcut.register(await GM.getValue('shortcut', 'shift-alt-l'), () => {
    copyLink()
    showResult()
  })
}

setDefaultConfig(defaultConfig)
setShortcut()
GM.registerMenuCommand('Copy Markdown link', () => { copyLink(); showResult() })