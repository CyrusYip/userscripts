// ==UserScript==
// @name        Link to Markdown
// @namespace   https://github.com/CyrusYip/userscripts
// @match       *://*/*
// @grant       GM.registerMenuCommand
// @grant       GM.setClipboard
// @grant       GM.getValue
// @grant       GM.setValue
// @require     https://cdn.jsdelivr.net/npm/@violentmonkey/shortcut@1
// @version     8.2.1
// @author      Cyrus Yip
// @description Get the link and title of current page, convert them to Markdown link, and write it to the clipboard. To use this script, click the button in the userscript manager's menu or press Shift + Alt + L . This script can be customized in Violentmonkey (Dashboard -> Edit -> Values). To disable the shortcut, set 'disable-shortcut' as true. To change shortcut, set 'shortcut' (Key Definition: https://github.com/violentmonkey/vm-shortcut#key-definition). To reset, remove all values.
// ==/UserScript==
'use strict';
let title, href, hash, markdownLink
const copyLink = () => {
  ({ title } = document);
  ({ href, hash } = window.location)
  markdownLink = `[${title}${hash}](${href})`
  GM.setClipboard(markdownLink)
}

const showResult = () => {
  if (markdownLink) {
    window.alert(`✅ Link was copied.\n\n${markdownLink}`)
  } else {
    window.alert(`❎ Failed to get link.`)
  }
}

// set default value of 'disable-shortcut' as false, 'shortcut' as 'shift-alt-l'
(async () => {
  await GM.getValue('disable-shortcut') === undefined && GM.setValue('disable-shortcut', false)
  await GM.getValue('shortcut') === undefined && GM.setValue('shortcut', 'shift-alt-l')
  if (await GM.getValue('disable-shortcut') !== true) {
    VM.shortcut.register(await GM.getValue('shortcut'), () => {
      copyLink()
      showResult()
    })
  }
})()

GM.registerMenuCommand('Copy Markdown link', () => { copyLink(); showResult() })