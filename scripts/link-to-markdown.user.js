// ==UserScript==
// @name        Link to Markdown
// @namespace   https://github.com/CyrusYip/userscripts
// @match       *://*/*
// @grant       GM.registerMenuCommand
// @grant       GM.setClipboard
// @grant       GM_getValue
// @grant       GM_setValue
// @version     7.0.0
// @author      Cyrus Yip
// @description Get the link and title of current page, convert them to Markdown link, and write to the clipboard. Shortcut: Shift + Alt + L . There is a button in the userscript manager's menu.
// @description:zh-CN 获取当前页面的链接与标题，将其转换为 Markdown 链接，并写入剪贴板。快捷键：Shift + Alt + L，脚本管理器菜单也有按钮。
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