// ==UserScript==
// @name        Link to Markdown
// @namespace   https://github.com/CyrusYip/userscripts
// @match       *://*/*
// @grant       GM.setClipboard
// @grant       GM.registerMenuCommand
// @version     4.1
// @author      Cyrus Yip
// @description Get the link and title of current page, convert them to Markdown link, and write to the clipboard. Shortcut: Shift + Alt + L . There is a button in the userscript manager's menu.
// @description:zh-CN 获取当前页面的链接与标题，将其转换为 Markdown 链接，并写入剪贴板。快捷键：Shift + Alt + L，脚本管理器菜单也有按钮。
// ==/UserScript==
(() => {
  let title, url, markdownLink
  const writeLink = () => {
    title = document.title
    url = window.location.href
    markdownLink = `[${title}](${url})`
    GM.setClipboard(markdownLink)
    console.log(`Markdown link:\n${markdownLink}`)
  }

  const showResult = () => {
    const messageDiv = document.createElement('div')
    messageDiv.innerHTML = markdownLink
      ? `<h2 style="color: inherit">✅ Link was copied.</h2>
        <p style="color: inherit">${markdownLink}</p>`
      : `<h2 style="color: inherit">❎ Failed to get link.</h2>`
    messageDiv.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      max-width: 50%;
      text-align: center;
      transform: translate(-50%, -50%);
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 10px;
      border-radius: 8px;
      z-index: 9999;
    `
    document.body.appendChild(messageDiv)
    setTimeout(() => {
      messageDiv.remove()
    }, 3000)
  }

  // keyboard shortcut
  document.addEventListener("keydown", ({ altKey, shiftKey, key }) => {
    if (altKey && shiftKey && key === 'L') {
      writeLink()
      showResult()
    }
  })

  GM.registerMenuCommand('Copy Markdown link', () => { writeLink(); showResult() })
})();
