// ==UserScript==
// @name        Link to Markdown
// @namespace   https://github.com/CyrusYip/userscripts
// @match       *://*/*
// @grant       GM_setClipboard
// @version     1.1
// @author      Cyrus Yip
// @description Get the link and title of current page, convert them to Markdown link, and write to the clipboard. Shortcut: Shift + Alt + L .
// @description:zh-CN 获取当前页面的链接与标题，将其转换为 Markdown 链接，并写入剪贴板。快捷键：Shift + Alt + L。
// ==/UserScript==
(function () {
  document.addEventListener("keydown", ({ altKey, shiftKey, key }) => {
    if (altKey && shiftKey && key === 'L') {
      const title = document.title
      const url = window.location.href
      const markdownLink = `[${title}](${url})`
      GM_setClipboard(markdownLink)
      console.log(`Markdown link:\n${markdownLink}`)
    }
  })
})();
