// ==UserScript==
// @name        Show keydown event
// @namespace   https://github.com/CyrusYip/userscripts
// @match       *://*/*
// @grant       GM.registerMenuCommand
// @version     1.0
// @author      Cyrus Yip
// @description Show keydown event in Console of DevTools
// ==/UserScript==
'use strict';
const showKeydown = () => {
  document.addEventListener("keydown", event => {
    console.log(event)
  })
}
GM.registerMenuCommand('Show keydown event', showKeydown)