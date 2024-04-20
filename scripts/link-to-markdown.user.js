// ==UserScript==
// @name        Link to Markdown
// @namespace   https://github.com/CyrusYip/userscripts
// @match       *://*/*
// @grant       GM.registerMenuCommand
// @grant       GM.setClipboard
// @grant       GM_getValue
// @grant       GM_setValue
// @version     7.0.1
// @author      Cyrus Yip
// @description Get the link and title of current page, convert them to Markdown link, and write it to the clipboard. To use this script, click the button in the userscript manager's menu or press Shift + Alt + L . In Violentmonkey, you can disable the shortcut by setting 'disable-shortcut' as true.
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

// set default value of 'disable-shortcut' as false
if (GM_getValue('disable-shortcut') === undefined) {
  GM_setValue('disable-shortcut', false)
}
// keyboard shortcut: Shift + Alt + L
// to disable shortcut, set 'disable-shortcut' as true
if (GM_getValue('disable-shortcut') !== true) {
  document.addEventListener("keydown", ({ altKey, shiftKey, ctrlKey, key }) => {
    if (ctrlKey === false && altKey && shiftKey && key === 'L') {
      copyLink()
      showResult()
    }
  })
}

GM.registerMenuCommand('Copy Markdown link', () => { copyLink(); showResult() })