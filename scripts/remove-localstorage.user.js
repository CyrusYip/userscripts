// ==UserScript==
// @name        Remove localStorage
// @namespace   https://github.com/CyrusYip/userscripts
// @match       *://*/*
// @grant       GM.registerMenuCommand
// @version     1.2
// @author      Cyrus Yip
// @description Remove localStorage of the current page. It's used for testing websites.
// ==/UserScript==
'use strict';
(() => {
  const main = () => {
    // Check emptiness
    if (localStorage.length === 0) {
      alert('localStorage is empty now.')
      return
    }
    // Remove localStorage
    const items = JSON.stringify(localStorage, null, 2)
    const message = `Would you like to remove localStorage?\n\n${items}`
    if (window.confirm(message)) {
      localStorage.clear()
      main() // Check emptiness again
    }
  }
  GM.registerMenuCommand('Remove localStorage', main)
})()
