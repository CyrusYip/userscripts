// ==UserScript==
// @name        Clear localStorage
// @namespace   https://github.com/CyrusYip/userscripts
// @match       *://*/*
// @grant       GM.registerMenuCommand
// @version     3.1.1
// @author      Cyrus Yip
// @description Show localStorage of the current page and ask user whether to clear it. It's used for testing websites.
// ==/UserScript==
'use strict';
const isEmpty = () => { return localStorage.length === 0 ? true : false }
const clearLocalStorage = () => {
  if (isEmpty()) {
    alert('localStorage is empty. No need to clear.')
    return
  }
  // Remove localStorage
  const items = JSON.stringify(localStorage, null, 2)
  const answer = window.confirm(`Would you like to remove localStorage?\n\n${items}`)
  if (answer) {
    localStorage.clear()
    isEmpty() && alert('Cleared.')
  }
}
GM.registerMenuCommand('Clear localStorage', clearLocalStorage)