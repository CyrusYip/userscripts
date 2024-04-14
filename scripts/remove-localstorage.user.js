// ==UserScript==
// @name        Remove localStorage
// @namespace   https://github.com/CyrusYip/userscripts
// @match       *://*/*
// @grant       GM.registerMenuCommand
// @version     2.0
// @author      Cyrus Yip
// @description Remove localStorage of the current page. It's used for testing websites.
// ==/UserScript==
'use strict';
const isEmpty = () => { return localStorage.length === 0 ? true : false }
const removeLocalStorage = () => {
  if (isEmpty()) {
    alert('localStorage is empty. No need to clear.')
    return
  }
  // Remove localStorage
  const items = JSON.stringify(localStorage, null, 2)
  const message = `Would you like to remove localStorage?\n\n${items}`
  if (window.confirm(message)) {
    localStorage.clear()
    if (isEmpty()) { alert('Cleared.') }
  }
}
GM.registerMenuCommand('Remove localStorage', removeLocalStorage)