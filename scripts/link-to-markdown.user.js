// ==UserScript==
// @name        Link to Markdown
// @namespace   https://github.com/CyrusYip/userscripts
// @match       *://*/*
// @grant       GM.setClipboard
// @grant       GM.registerMenuCommand
// @version     3.1
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
      ? `<p>Link was copied.</p>
        <p>${markdownLink}</p>`
      : `<p>Failed to get link.</p>`
    messageDiv.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 10px;
      border-radius: 5px;
      z-index: 9999;
    `
    document.body.appendChild(messageDiv)
    setTimeout(() => {
      messageDiv.remove()
    }, 2000)
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
