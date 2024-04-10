// ==UserScript==
// @name        Link to Markdown
// @namespace   https://github.com/CyrusYip/userscripts
// @match       *://*/*
// @grant       GM.setClipboard
// @grant       GM.registerMenuCommand
// @version     5.2
// @author      Cyrus Yip
// @description Get the link and title of current page, convert them to Markdown link, and write to the clipboard. Shortcut: Shift + Alt + L . There is a button in the userscript manager's menu.
// @description:zh-CN 获取当前页面的链接与标题，将其转换为 Markdown 链接，并写入剪贴板。快捷键：Shift + Alt + L，脚本管理器菜单也有按钮。
// ==/UserScript==
'use strict';
(() => {
  let title, url, markdownLink
  const copyLink = () => {
    title = document.title
    url = window.location.href
    markdownLink = `[${title}](${url})`
    GM.setClipboard(markdownLink)
  }

  const showResult = () => {
    if (markdownLink) {
      window.alert(`✅ Link was copied.\n\n${markdownLink}`)
    } else {
      window.alert(`❎ Failed to get link.`)
    }
  }

  // keyboard shortcut: Shift + Alt + L
  document.addEventListener("keydown", ({ altKey, shiftKey, key }) => {
    if (altKey && shiftKey && key === 'L') {
      copyLink()
      showResult()
    }
  })

  GM.registerMenuCommand('Copy Markdown link', () => { copyLink(); showResult() })
})();
